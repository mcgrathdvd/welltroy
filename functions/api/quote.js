import nodemailer from 'nodemailer';
import { Buffer } from 'node:buffer';
import { smtpHost, openSmtpSocket } from '../../src/quote-smtp.mjs';
import { products } from '../../src/product-data.mjs';
import { assistedChoices } from '../../src/quote-options.mjs';
import { uploadLimits, uploadTypes, validateUploadFiles, attachmentName } from '../../src/quote-upload.mjs';

const reply = (status, data) => Response.json(data, {
  status, headers: { 'Cache-Control': 'no-store', 'X-Content-Type-Options': 'nosniff' }
});
const configured = (env) => Boolean(env.SMTP_USER && env.SMTP_PASSWORD && env.TURNSTILE_SITE_KEY && env.TURNSTILE_SECRET_KEY);

export async function onRequest({ request, env }) {
  if (request.method === 'GET') return reply(200, { ready: configured(env), siteKey: env.TURNSTILE_SITE_KEY || '' });
  if (request.method !== 'POST') return reply(405, { ok: false });
  const origin = new URL(request.url).origin;
  if (request.headers.get('Origin') !== origin) return reply(403, { ok: false });
  if (!configured(env)) return reply(503, { ok: false, message: 'Please contact info@welltroy.com.' });
  const contentType = request.headers.get('Content-Type') || '';
  const multipart = contentType.toLowerCase().startsWith('multipart/form-data');
  const json = contentType.toLowerCase().startsWith('application/json');
  if (!multipart && !json) return reply(415, { ok: false });
  const bodyLimit = multipart ? uploadLimits.maxBodyBytes : 24000;
  // Bound the streamed body as well as the declared length.
  if (Number(request.headers.get('Content-Length')) > bodyLimit) return reply(413, { ok: false, message: 'The combined attachment size must be 10 MB or less.' });
  let payload;
  let files = [];
  try {
    const reader = request.body.getReader();
    const chunks = []; let length = 0;
    while (true) {
      const { value, done } = await reader.read();
      if (done) break;
      length += value.byteLength;
      if (length > bodyLimit) { await reader.cancel(); return reply(413, { ok: false, message: 'The combined attachment size must be 10 MB or less.' }); }
      chunks.push(value);
    }
    const bytes = new Uint8Array(length); let offset = 0;
    for (const chunk of chunks) { bytes.set(chunk, offset); offset += chunk.length; }
    if (multipart) {
      const form = await new Response(bytes, { headers: { 'Content-Type': contentType } }).formData();
      payload = Object.create(null);
      for (const [key, value] of form) {
        if (key === 'files') { files.push(value); continue; }
        if (typeof value !== 'string' || Object.hasOwn(payload, key)) return reply(400, { ok: false });
        payload[key] = value;
      }
    } else payload = JSON.parse(new TextDecoder().decode(bytes));
    if (!payload || Array.isArray(payload) || typeof payload !== 'object') throw new Error();
  } catch { return reply(400, { ok: false }); }
  if (payload.website) return reply(400, { ok: false });
  const uploadError = validateUploadFiles(files);
  if (uploadError) return reply(400, { ok: false, message: uploadError });
  const limits = { name: 100, company: 160, email: 254, whatsapp: 50, product: 80, quantity: 100, size: 160, destination: 160, sample: 80, message: 5000 };
  const fields = {};
  for (const [key, max] of Object.entries(limits)) {
    const value = payload[key] ?? '';
    if (typeof value !== 'string' || value.length > max || (key !== 'message' && /[\r\n\x00]/.test(value))) return reply(400, { ok: false });
    fields[key] = value.trim();
  }
  if (['name', 'email', 'product', 'quantity', 'destination'].some((key) => !fields[key]) || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email)) return reply(400, { ok: false });
  const product = [...products, ...assistedChoices].find((item) => item.slug === fields.product);
  if (!product) return reply(400, { ok: false, message: 'Please choose a product or an assisted enquiry option.' });
  if (assistedChoices.some((item) => item.slug === fields.product) && !fields.message) {
    return reply(400, { ok: false, message: 'Please describe your products or what you need to pack in the requirements field.' });
  }
  const token = payload['cf-turnstile-response'];
  if (typeof token !== 'string' || !token || token.length > 2048) return reply(400, { ok: false, message: 'Complete the security check, then send your enquiry.' });
  try {
    const verification = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST', body: new URLSearchParams({ secret: env.TURNSTILE_SECRET_KEY, response: token }),
      signal: AbortSignal.timeout(10000)
    });
    const result = await verification.json();
    if (!result.success || result.hostname !== new URL(request.url).hostname || result.action !== 'quote') {
      const knownErrors = ['missing-input-secret', 'invalid-input-secret', 'missing-input-response', 'invalid-input-response', 'bad-request', 'timeout-or-duplicate', 'internal-error'];
      console.error('quote_verification_failed', JSON.stringify({
        success: result.success === true,
        hostnameMatches: result.hostname === new URL(request.url).hostname,
        actionMatches: result.action === 'quote',
        errorCodes: Array.isArray(result['error-codes']) ? result['error-codes'].filter(code => knownErrors.includes(code)) : []
      }));
      return reply(403, { ok: false, message: 'The security check could not be verified. Complete a new check and try again.' });
    }
  } catch { return reply(503, { ok: false, message: 'The security service could not be reached. Please try again or contact us by email or WhatsApp.' }); }

  // China business date plus 50 random bits, grouped for phone notes and records.
  const referenceDate = new Date(Date.now() + 8 * 60 * 60 * 1000).toISOString().slice(2, 10).replaceAll('-', '');
  const alphabet = '23456789ABCDEFGHJKLMNPQRSTUVWXYZ';
  const suffix = [...crypto.getRandomValues(new Uint8Array(10))].map(byte => alphabet[byte & 31]).join('');
  const reference = `WT-${referenceDate}-${suffix.slice(0, 5)}-${suffix.slice(5)}`;
  let transport;
  let deliveryStarted = false;
  try {
    transport = nodemailer.createTransport({
      host: smtpHost, port: 465, secure: true,
      auth: { user: env.SMTP_USER, pass: env.SMTP_PASSWORD },
      connectionTimeout: 15000, greetingTimeout: 15000, socketTimeout: 45000,
      disableFileAccess: true, disableUrlAccess: true,
      // Let the Workers TLS socket resolve the host. Nodemailer's separate
      // Node DNS lookup can fail before the SMTP connection is opened.
      getSocket(_options, callback) {
        openSmtpSocket(callback);
      }
    });
    const attachments = await Promise.all(files.map(async (file) => ({
      filename: attachmentName(file.name),
      content: Buffer.from(await file.arrayBuffer()),
      contentType: uploadTypes[file.name.split('.').pop().toLowerCase()],
      contentDisposition: 'attachment'
    })));
    deliveryStarted = true;
    const result = await transport.sendMail({
      from: { name: 'Welltroy Website', address: env.SMTP_USER },
      to: 'info@welltroy.com', replyTo: fields.email,
      subject: `Packaging enquiry — ${product.name} — ${reference}`,
      text: `Reference: ${reference}\n\n${Object.entries(fields).map(([key, value]) => `${key}: ${key === 'product' ? product.name : value}`).join('\n')}\n\nAttachments: ${files.length ? files.map((file) => `${attachmentName(file.name)} (${file.size} bytes)`).join(', ') : 'None'}`,
      attachments
    });
    if (!result.accepted?.length) throw Object.assign(new Error('No recipient accepted'), { code: 'EENVELOPE', command: 'RCPT' });
    return reply(200, { ok: true, reference });
  } catch (error) {
    // Log only bounded error identifiers, never the SMTP response/message,
    // credentials, buyer fields or attachments.
    const code = /^[A-Z0-9_]{1,40}$/.test(error?.code || '') ? error.code : 'UNKNOWN';
    const command = String(error?.command || '').split(' ')[0];
    const safeCommand = ['CONN', 'AUTH', 'EHLO', 'HELO', 'MAIL', 'RCPT', 'DATA'].includes(command) ? command : 'UNKNOWN';
    console.error('quote_delivery_failed', JSON.stringify({
      reference, code, command: safeCommand,
      responseCode: Number.isInteger(error?.responseCode) ? error.responseCode : undefined
    }));
    const notSent = !deliveryStarted || ['CONN', 'AUTH', 'EHLO', 'HELO', 'MAIL', 'RCPT'].includes(safeCommand) || ['EDNS', 'EAUTH'].includes(code);
    return reply(502, {
      ok: false, reference,
      code: notSent ? 'EMAIL_SERVICE_UNAVAILABLE' : 'DELIVERY_UNCONFIRMED',
      message: notSent
        ? 'We could not send your enquiry because our email service is unavailable. Please email info@welltroy.com or contact us on WhatsApp.'
        : 'We could not confirm whether your enquiry was sent. Please contact us before resubmitting to avoid a duplicate.'
    });
  } finally { transport?.close(); }
}
