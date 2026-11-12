import { test } from 'node:test';
import assert from 'node:assert/strict';
import { failedQuoteAttempt, initializeQuoteRecovery } from '../src/quote-recovery.mjs';

const reference = 'WT-261112-234AB-CDEFG';
const response = { status: 502, ok: false };
const failure = code => ({ ok: false, code, reference });

test('only the two server delivery failures expose a strictly formatted attempt reference', () => {
  assert.deepEqual(failedQuoteAttempt(response, failure('EMAIL_SERVICE_UNAVAILABLE')), {
    reference, status: 'Not sent: email service unavailable.'
  });
  assert.match(failedQuoteAttempt(response, failure('DELIVERY_UNCONFIRMED')).status, /not confirmed.*before resubmitting/);
  const wrongEnvelopes = [
    [{ status: 200, ok: true }, failure('DELIVERY_UNCONFIRMED')],
    [{ status: 400, ok: false }, failure('DELIVERY_UNCONFIRMED')],
    [{ status: 403, ok: false }, failure('DELIVERY_UNCONFIRMED')],
    [{ status: 503, ok: false }, failure('DELIVERY_UNCONFIRMED')],
    [response, { ...failure('DELIVERY_UNCONFIRMED'), ok: true }],
    [response, failure('UNKNOWN')], [response, null]
  ];
  for (const args of wrongEnvelopes) assert.equal(failedQuoteAttempt(...args), null);
  for (const invalid of [undefined, '', 'WT-261112-234AB-CDEFI', reference.toLowerCase(), ` ${reference}`, `${reference}\n`, `${reference}<script>`, `WT-261112-234AB-CDEFG?to=other@example.test`]) {
    assert.equal(failedQuoteAttempt(response, { ...failure('DELIVERY_UNCONFIRMED'), reference: invalid }), null);
  }
});

// A small DOM adapter exercises the actual recovery controller and event wiring.
function fixture() {
  const listeners = new Map();
  const nodes = Object.fromEntries(['attempt-recovery', 'attempt-reference', 'attempt-status', 'recovery-email', 'copy-status', 'copy-text'].map(key => [key, {
    hidden: false, textContent: '', value: '', attributes: { href: 'mailto:info@welltroy.com' },
    getAttribute(name) { return this.attributes[name]; },
    setAttribute(name, value) { this.attributes[name] = value; }
  }]));
  const form = {
    querySelector(selector) { return nodes[selector.slice(6, -1)]; },
    addEventListener(type, listener) { if (!listeners.has(type)) listeners.set(type, []); listeners.get(type).push(listener); },
    emit(type, name) { for (const listener of listeners.get(type) || []) listener({ target: { name } }); }
  };
  return { nodes, form, recovery: initializeQuoteRecovery(form) };
}

test('failed attempt stays distinct from receipt and travels with copied details and the email subject', () => {
  const { nodes, recovery } = fixture();
  recovery.setFailure(response, failure('DELIVERY_UNCONFIRMED'));
  assert.equal(nodes['attempt-recovery'].hidden, false);
  assert.equal(nodes['attempt-reference'].textContent, reference);
  assert.match(nodes['attempt-status'].textContent, /Delivery not confirmed/);
  assert.deepEqual(recovery.copyLines(), [`Submission attempt reference: ${reference}`, `Online submission status: ${nodes['attempt-status'].textContent}`]);
  const email = new URL(nodes['recovery-email'].attributes.href);
  assert.equal(email.pathname, 'info@welltroy.com');
  assert.equal(email.searchParams.get('subject'), `Please check submission attempt: ${reference}`);
  recovery.setFailure(response, failure('EMAIL_SERVICE_UNAVAILABLE'));
  assert.match(nodes['attempt-status'].textContent, /^Not sent:/);
});

test('edits, imported briefs, reset and completion remove stale references and stale manual-copy text', () => {
  for (const [event, name] of [['input', 'message'], ['input', 'email'], ['change', 'product'], ['change', 'sample'], ['welltroy:brief-applied'], ['reset'], ['welltroy:quote-sent'], ['welltroy:new-enquiry']]) {
    const { nodes, form, recovery } = fixture();
    recovery.setFailure(response, failure('DELIVERY_UNCONFIRMED'));
    nodes['copy-text'].hidden = false;
    nodes['copy-text'].value = 'Previously copied requirements';
    nodes['copy-status'].textContent = 'Select and copy';
    form.emit(event, name);
    assert.deepEqual(recovery.copyLines(), [], event);
    assert.equal(nodes['attempt-recovery'].hidden, true, event);
    assert.equal(nodes['attempt-reference'].textContent, '', event);
    assert.equal(nodes['recovery-email'].attributes.href, 'mailto:info@welltroy.com', event);
    assert.equal(nodes['copy-text'].hidden, true, event);
    assert.equal(nodes['copy-text'].value, '', event);
    assert.equal(nodes['copy-status'].textContent, '', event);
  }
});

test('security verification alone keeps the reference; a new request or unusable response does not reuse it', () => {
  const { nodes, form, recovery } = fixture();
  recovery.setFailure(response, failure('DELIVERY_UNCONFIRMED'));
  form.emit('change', 'cf-turnstile-response');
  assert.equal(nodes['attempt-reference'].textContent, reference);
  recovery.clear(); // Used before a new POST and when selected attachments change.
  assert.deepEqual(recovery.copyLines(), []);
  recovery.setFailure(response, { ...failure('DELIVERY_UNCONFIRMED'), reference: '<b>unsafe</b>' });
  assert.equal(nodes['attempt-recovery'].hidden, true);
  assert.equal(nodes['recovery-email'].attributes.href, 'mailto:info@welltroy.com');
});
