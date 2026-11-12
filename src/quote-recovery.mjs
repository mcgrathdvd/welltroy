const referencePattern = /^WT-\d{6}-[2-9A-HJ-NP-Z]{5}-[2-9A-HJ-NP-Z]{5}$/;
const deliveryStates = {
  EMAIL_SERVICE_UNAVAILABLE: 'Not sent: email service unavailable.',
  DELIVERY_UNCONFIRMED: 'Delivery not confirmed. Contact us before resubmitting to avoid a duplicate.'
};
const buyerFields = new Set(['name', 'company', 'email', 'whatsapp', 'product', 'quantity', 'size', 'destination', 'sample', 'message']);

export function failedQuoteAttempt(response, result) {
  if (response?.status !== 502 || response.ok !== false || result?.ok !== false
    || !Object.hasOwn(deliveryStates, result.code) || typeof result.reference !== 'string' || result.reference.length !== 21
    || !referencePattern.test(result.reference)) return null;
  return { reference: result.reference, status: deliveryStates[result.code] };
}

export function initializeQuoteRecovery(form) {
  const panel = form.querySelector('[data-attempt-recovery]');
  const reference = form.querySelector('[data-attempt-reference]');
  const status = form.querySelector('[data-attempt-status]');
  const email = form.querySelector('[data-recovery-email]');
  const copyStatus = form.querySelector('[data-copy-status]');
  const copyText = form.querySelector('[data-copy-text]');
  const defaultEmail = email.getAttribute('href');
  let attempt = null;

  const clear = () => {
    attempt = null;
    panel.hidden = true;
    reference.textContent = '';
    status.textContent = '';
    email.setAttribute('href', defaultEmail);
    copyStatus.textContent = '';
    copyText.hidden = true;
    copyText.value = '';
  };
  const setFailure = (response, result) => {
    clear();
    attempt = failedQuoteAttempt(response, result);
    if (!attempt) return;
    reference.textContent = attempt.reference;
    status.textContent = attempt.status;
    email.setAttribute('href', `mailto:info@welltroy.com?subject=${encodeURIComponent(`Please check submission attempt: ${attempt.reference}`)}`);
    panel.hidden = false;
  };
  const copyLines = () => attempt ? [
    `Submission attempt reference: ${attempt.reference}`,
    `Online submission status: ${attempt.status}`
  ] : [];

  // A reference belongs to the submitted version, never to later edits.
  const edited = event => { if (buyerFields.has(event.target?.name)) clear(); };
  form.addEventListener('input', edited);
  form.addEventListener('change', edited);
  for (const event of ['reset', 'welltroy:brief-applied', 'welltroy:quote-sent', 'welltroy:new-enquiry']) {
    form.addEventListener(event, clear);
  }
  clear();
  return { clear, setFailure, copyLines };
}
