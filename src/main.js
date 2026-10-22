import { selectionGuidance } from "./quote-options.mjs";
import { initializeAnalytics, track } from "./analytics.js";
import { confirmedQuote, errorCategory } from "./analytics-core.mjs";
initializeAnalytics();

const emailDialog = document.querySelector('[data-email-dialog]');
if (emailDialog && typeof emailDialog.showModal === 'function') {
  const address = emailDialog.querySelector('[data-email-address]');
  const copyStatus = emailDialog.querySelector('[data-email-copy-status]');
  document.addEventListener('click', (event) => {
    const link = event.target.closest?.('a[href]');
    if (!link || link.hasAttribute('data-native-email') || event.defaultPrevented || event.button !== 0 || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
    let url, recipient;
    try { url = new URL(link.href); recipient = decodeURIComponent(url.pathname).toLowerCase(); } catch { return; }
    if (url.protocol !== 'mailto:' || recipient !== 'info@welltroy.com') return;
    event.preventDefault();
    emailDialog.querySelector('[data-native-email]').href = url.href;
    const subject = url.searchParams.get('subject') || '';
    emailDialog.querySelector('[data-email-subject]').value = subject;
    emailDialog.querySelector('[data-email-subject-wrap]').hidden = !subject;
    copyStatus.textContent = '';
    if (!emailDialog.open) emailDialog.showModal();
  });
  emailDialog.querySelector('[data-email-close]').addEventListener('click', () => emailDialog.close());
  emailDialog.querySelector('[data-email-form]').addEventListener('click', () => {
    emailDialog.close();
    document.querySelector('[data-whatsapp-dialog][open]')?.close();
  });
  emailDialog.addEventListener('click', (event) => {
    const rect = emailDialog.getBoundingClientRect();
    if (event.target === emailDialog && (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom)) emailDialog.close();
  });
  emailDialog.querySelector('[data-copy-email]').addEventListener('click', async () => {
    track('email_click');
    try {
      await navigator.clipboard.writeText(address.value);
      copyStatus.textContent = 'Email address copied. Paste it into your email service.';
    } catch {
      address.focus(); address.select();
      copyStatus.textContent = 'Select and copy the email address above.';
    }
  });
}

const toggle = document.querySelector('[data-menu-toggle]');
const nav = document.querySelector('[data-nav]');
const desktopNavigation = window.matchMedia('(min-width: 981px)');
const dropdowns = [...document.querySelectorAll('[data-dropdown]')];
let dropdownCloseTimer;
const closeDropdowns = (restoreFocus = false) => {
  window.clearTimeout(dropdownCloseTimer);
  dropdowns.forEach((item) => {
    const button = item.querySelector('[data-dropdown-toggle]');
    const panel = document.getElementById(button.getAttribute('aria-controls'));
    const wasOpen = button.getAttribute('aria-expanded') === 'true';
    button.setAttribute('aria-expanded', 'false');
    panel.hidden = true;
    if (wasOpen && restoreFocus) button.focus();
  });
};
dropdowns.forEach((item) => {
  const button = item.querySelector('[data-dropdown-toggle]');
  const panel = document.getElementById(button.getAttribute('aria-controls'));
  const openDropdown = (focusFirst = false) => {
    if (!desktopNavigation.matches) return;
    closeDropdowns();
    button.setAttribute('aria-expanded', 'true');
    panel.hidden = false;
    if (focusFirst) panel.querySelector('a')?.focus();
  };
  const cancelClose = () => window.clearTimeout(dropdownCloseTimer);
  const scheduleClose = (event) => {
    if (event.pointerType !== 'mouse' || !desktopNavigation.matches) return;
    cancelClose();
    dropdownCloseTimer = window.setTimeout(() => {
      if (!item.matches(':hover') && !panel.matches(':hover')) closeDropdowns();
    }, 180);
  };
  item.addEventListener('pointerenter', (event) => {
    if (event.pointerType === 'mouse' && desktopNavigation.matches) openDropdown();
  });
  item.addEventListener('pointerleave', scheduleClose);
  panel.addEventListener('pointerenter', cancelClose);
  panel.addEventListener('pointerleave', scheduleClose);
  button.addEventListener('click', () => {
    if (button.getAttribute('aria-expanded') === 'true') closeDropdowns();
    else openDropdown();
  });
  button.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowDown') { event.preventDefault(); openDropdown(true); }
  });
  panel.addEventListener('click', (event) => {
    if (event.target.closest('a')) closeDropdowns();
  });
});
document.addEventListener('pointerdown', (event) => {
  if (!event.target.closest('[data-dropdown]')) closeDropdowns();
});
document.addEventListener('focusin', (event) => {
  const opened = dropdowns.find((item) => item.querySelector('[data-dropdown-toggle]').getAttribute('aria-expanded') === 'true');
  if (opened && !opened.contains(event.target)) closeDropdowns();
});
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && dropdowns.some((item) => item.querySelector('[data-dropdown-toggle]').getAttribute('aria-expanded') === 'true')) {
    event.preventDefault();
    closeDropdowns(true);
  }
});
desktopNavigation.addEventListener('change', () => closeDropdowns());
if (toggle && nav) {
  const background = [...document.querySelectorAll('main, .site-footer, .mobile-actions, .desktop-actions')];
  const setMenu = (open, restoreFocus = false) => {
    document.documentElement.style.setProperty('--header-height', `${document.querySelector('.site-header').getBoundingClientRect().height}px`);
    nav.classList.toggle('open', open);
    document.body.classList.toggle('menu-open', open);
    toggle.setAttribute('aria-expanded', String(open));
    toggle.textContent = open ? 'Close menu' : 'Menu';
    background.forEach((element) => { element.inert = open; });
    if (open) {
      closeDropdowns();
      [...nav.querySelectorAll('a')].find((link) => link.getClientRects().length)?.focus();
    }
    else if (restoreFocus) toggle.focus();
  };
  toggle.addEventListener('click', () => setMenu(!nav.classList.contains('open')));
  nav.addEventListener('click', (event) => {
    if (event.target.closest('a') && nav.classList.contains('open')) setMenu(false);
  });
  document.addEventListener('pointerdown', (event) => {
    if (nav.classList.contains('open') && !event.target.closest('.site-header')) setMenu(false, true);
  });
  document.addEventListener('keydown', (event) => {
    if (!nav.classList.contains('open')) return;
    if (event.key === 'Escape') { event.preventDefault(); setMenu(false, true); }
    if (event.key === 'Tab') {
      const items = [toggle, ...[...nav.querySelectorAll('a')].filter((link) => link.getClientRects().length)];
      const index = items.indexOf(document.activeElement);
      event.preventDefault();
      items[(index + (event.shiftKey ? -1 : 1) + items.length) % items.length].focus();
    }
  });
  desktopNavigation.addEventListener('change', (event) => {
    if (event.matches) setMenu(false);
  });
}

const quoteForm = document.querySelector('[data-quote-form]');
if (quoteForm) {
  const quoteParams = new URLSearchParams(window.location.search);
  const requestedProduct = quoteParams.get('product');
  const productSelect = quoteForm.querySelector('[name="product"]');
  if (requestedProduct && [...productSelect.options].some((option) => option.value === requestedProduct)) productSelect.value = requestedProduct;
  const requestedSize = quoteParams.get('size');
  if (productSelect.value && requestedSize) quoteForm.querySelector('[name="size"]').value = requestedSize.slice(0, 160);
  const quantityInput = quoteForm.querySelector('[name="quantity"]');
  const messageInput = quoteForm.querySelector('[name="message"]');
  const updateGuidance = () => {
    const guidance = selectionGuidance(productSelect.value);
    quoteForm.querySelector('[data-product-help]').textContent = guidance.help;
    quoteForm.querySelector('[data-quantity-help]').textContent = guidance.quantityHelp;
    quoteForm.querySelector('[data-message-label]').textContent = guidance.message;
    quantityInput.placeholder = guidance.quantity;
    messageInput.placeholder = guidance.placeholder;
    messageInput.required = guidance.required;
  };
  productSelect.addEventListener('change', updateGuidance);
  updateGuidance();
  const formFields = quoteForm.querySelector('[data-form-fields]');
  const successPanel = quoteForm.querySelector('[data-success]');
  const fallback = quoteForm.querySelector('[data-enquiry-fallback]');
  const submitHint = quoteForm.querySelector('[data-submit-hint]');
  let completed = false;
  let hasSubmissionError = false;
  const status = document.querySelector('[data-form-status]');
  const submit = quoteForm.querySelector('[type="submit"]');
  const fileInput = quoteForm.querySelector('[data-upload-input]');
  const dropzone = quoteForm.querySelector('[data-upload-zone]');
  const fileList = quoteForm.querySelector('[data-upload-list]');
  const fileStatus = quoteForm.querySelector('[data-upload-status]');
  const fileExtensions = new Set(['png', 'jpg', 'jpeg', 'webp', 'pdf', 'ai', 'psd', 'docx', 'xlsx', 'txt', 'csv']);
  const maxFileBytes = 10 * 1024 * 1024;
  let selectedFiles = [];
  const formatBytes = (bytes) => bytes < 1024 * 1024 ? `${Math.max(1, Math.round(bytes / 1024))} KB` : `${(bytes / 1024 / 1024).toFixed(1)} MB`;
  const renderFiles = () => {
    fileList.replaceChildren();
    selectedFiles.forEach((file, index) => {
      const item = document.createElement('li');
      const details = document.createElement('span');
      const name = document.createElement('strong');
      name.textContent = file.name;
      const size = document.createElement('small');
      size.textContent = formatBytes(file.size);
      details.append(name, size);
      const remove = document.createElement('button');
      remove.type = 'button';
      remove.textContent = 'Remove';
      remove.setAttribute('aria-label', `Remove ${file.name}`);
      remove.addEventListener('click', () => {
        selectedFiles.splice(index, 1);
        renderFiles();
        fileInput.focus();
      });
      item.append(details, remove);
      fileList.append(item);
    });
    const total = selectedFiles.reduce((sum, file) => sum + file.size, 0);
    fileStatus.textContent = selectedFiles.length ? `${selectedFiles.length} file${selectedFiles.length > 1 ? 's' : ''} selected · ${formatBytes(total)} total` : 'No files selected';
    fileStatus.dataset.state = 'ready';
  };
  const addFiles = (files) => {
    const next = [...selectedFiles];
    let error;
    for (const file of files) {
      const extension = file.name.split('.').pop().toLowerCase();
      if (!fileExtensions.has(extension)) { error = 'Please use PNG, JPG, WEBP, PDF, AI, PSD, DOCX, XLSX, TXT or CSV files.'; break; }
      if (!file.size || file.size > maxFileBytes) { error = 'Choose a non-empty file of 10 MB or less.'; break; }
      if (!next.some((item) => item.name === file.name && item.size === file.size && item.lastModified === file.lastModified)) next.push(file);
    }
    if (!error && next.length > 3) error = 'You can attach up to 3 files. Remove a file to choose another.';
    if (!error && next.reduce((sum, file) => sum + file.size, 0) > maxFileBytes) error = 'The combined file size must be 10 MB or less.';
    if (error) {
      fileStatus.textContent = error;
      fileStatus.dataset.state = 'error';
    } else {
      selectedFiles = next;
      renderFiles();
    }
    fileInput.value = '';
  };
  fileInput.addEventListener('change', () => addFiles([...fileInput.files]));
  let dragDepth = 0;
  dropzone.addEventListener('dragenter', (event) => { event.preventDefault(); dragDepth++; dropzone.classList.add('is-dragging'); });
  dropzone.addEventListener('dragover', (event) => { event.preventDefault(); event.dataTransfer.dropEffect = 'copy'; });
  dropzone.addEventListener('dragleave', () => { if (--dragDepth <= 0) { dragDepth = 0; dropzone.classList.remove('is-dragging'); } });
  dropzone.addEventListener('drop', (event) => {
    event.preventDefault();
    dragDepth = 0;
    dropzone.classList.remove('is-dragging');
    addFiles([...event.dataTransfer.files]);
  });
  const showStatus = (message, state = 'error') => {
    status.textContent = message;
    status.dataset.state = state;
    status.classList.add('show');
    status.focus();
  };
  const servicePanel = quoteForm.querySelector('[data-service-panel]');
  const serviceStatus = quoteForm.querySelector('[data-service-status]');
  const serviceActions = quoteForm.querySelector('[data-service-actions]');
  const retryService = quoteForm.querySelector('[data-service-retry]');
  let widget;
  let ready = false;
  let sending = false;
  let initializing = false;
  const showService = (message, state, canRetry = false) => {
    serviceStatus.textContent = message;
    servicePanel.dataset.state = state;
    quoteForm.querySelector('[data-check-verification]').hidden = state === 'ready';
    serviceActions.hidden = !canRetry;
    retryService.disabled = initializing;
    const needsHelp = state === 'error' || state === 'expired';
    fallback.hidden = false;
    if (needsHelp || hasSubmissionError) fallback.open = true;
    submitHint.textContent = state === 'ready' ? '' : needsHelp ? 'Submission is unavailable until the connection and security check are ready. Use the contact options below or check the status in this form.' : 'Complete the security check in this form before sending.';
  };
  const loadVerification = () => {
    if (window.turnstile?.render) return Promise.resolve();
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      const timer = window.setTimeout(() => {
        script.remove();
        reject(new Error('Verification timeout'));
      }, 15000);
      script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';
      script.async = true;
      script.onload = () => {
        window.clearTimeout(timer);
        if (window.turnstile?.render) resolve();
        else { script.remove(); reject(new Error('Verification unavailable')); }
      };
      script.onerror = () => {
        window.clearTimeout(timer);
        script.remove();
        reject(new Error('Verification unavailable'));
      };
      document.head.append(script);
    });
  };
  const initializeService = async () => {
    if (initializing || sending || completed) return;
    initializing = true;
    ready = false;
    submit.disabled = true;
    showService('Checking online enquiry availability…', 'loading');
    try {
      if (widget !== undefined) {
        window.turnstile.remove(widget);
        widget = undefined;
      }
      const response = await fetch('/api/quote', {
        headers: { Accept: 'application/json' },
        cache: 'no-store', signal: AbortSignal.timeout(10000)
      });
      if (!response.ok) throw new Error();
      const config = await response.json();
      if (!config.ready || !config.siteKey) throw new Error();
      await loadVerification();
      showService('Complete the security check to enable online submission. You can fill in your details below.', 'waiting');
      widget = window.turnstile.render('[data-turnstile]', {
        // Compact fits 320px screens and stays safe when a desktop window is narrowed.
        sitekey: config.siteKey, action: 'quote', size: 'compact', theme: 'light',
        callback: () => {
          if (completed) return;
          ready = true;
          submit.disabled = sending;
          showService('Online enquiry is ready. Fill in your details below and send when ready.', 'ready');
        },
        'expired-callback': () => {
          if (completed) return;
          ready = false;
          submit.disabled = true;
          showService('The security check has expired. Select Try again to verify. Your details and files remain on this page.', 'expired', true);
        },
        'timeout-callback': () => {
          if (completed) return;
          ready = false;
          submit.disabled = true;
          showService('The security check timed out. Try again, or use email or WhatsApp below. Your details and files remain on this page.', 'expired', true);
        },
        'unsupported-callback': () => {
          if (completed) return;
          ready = false;
          submit.disabled = true;
          showService('This browser could not complete the security check. Open this page in an up-to-date browser, or copy your enquiry below to contact us.', 'error', true);
        },
        'error-callback': () => {
          if (completed) return;
          ready = false;
          submit.disabled = true;
          showService('The security check could not load. Try again, or contact us by email or WhatsApp. Your details and files remain on this page.', 'error', true);
        }
      });
    } catch {
      showService('Online submission is currently unavailable. Please email us or contact us on WhatsApp, or try again. Your details and files remain on this page.', 'error', true);
    } finally {
      initializing = false;
      retryService.disabled = false;
    }
  };
  retryService.addEventListener('click', initializeService);
  initializeService();
  quoteForm.querySelector('[data-check-verification]').addEventListener('click', () => {
    // Let the CSS scroll-behavior follow the user's reduced-motion preference.
    servicePanel.scrollIntoView({ block: 'start' });
    servicePanel.focus({ preventScroll: true });
  });
  document.querySelectorAll('a[href="#quote-form"]').forEach((link) => {
    link.addEventListener('click', () => quoteForm.querySelector('input[name="name"]')?.focus({ preventScroll: true }));
  });
  quoteForm.querySelector('[data-copy-enquiry]').addEventListener('click', async () => {
    const labels = { name: 'Name', company: 'Company', email: 'Email', whatsapp: 'WhatsApp', product: 'Product', quantity: 'Estimated quantity', size: 'Size / model', destination: 'Destination', sample: 'Sample', message: 'Requirements' };
    const lines = Object.entries(labels).map(([key, label]) => {
      const input = quoteForm.elements.namedItem(key);
      const value = key === 'product' ? (productSelect.value ? productSelect.selectedOptions[0].textContent : '') : input.value.trim();
      return `${label}: ${value || 'Not specified'}`;
    });
    lines.push(`Files to attach separately: ${selectedFiles.map((file) => file.name).join(', ') || 'None'}`);
    const text = lines.join('\n');
    const copyStatus = quoteForm.querySelector('[data-copy-status]');
    const copyText = quoteForm.querySelector('[data-copy-text]');
    try {
      await navigator.clipboard.writeText(text);
      copyText.hidden = true;
      copyStatus.textContent = 'Copied. Paste these details into your email or WhatsApp message and attach your files separately.';
    } catch {
      copyText.hidden = false;
      copyText.value = text;
      copyText.focus();
      copyText.select();
      copyStatus.textContent = 'Select and copy the details below, then attach your files separately.';
    }
  });
  quoteForm.querySelector('[data-copy-reference]').addEventListener('click', async () => {
    const referenceInput = quoteForm.querySelector('[data-enquiry-reference]');
    const copyStatus = quoteForm.querySelector('[data-reference-status]');
    try {
      await navigator.clipboard.writeText(referenceInput.value);
      copyStatus.textContent = 'Reference copied.';
    } catch {
      referenceInput.focus();
      referenceInput.select();
      copyStatus.textContent = 'Select and copy the reference above.';
    }
  });
  quoteForm.querySelector('[data-new-enquiry]').addEventListener('click', () => {
    if (!completed) return;
    completed = false;
    quoteForm.dispatchEvent(new Event("welltroy:new-enquiry"));
    hasSubmissionError = false;
    quoteForm.reset();
    selectedFiles = [];
    renderFiles();
    updateGuidance();
    status.textContent = '';
    status.classList.remove('show');
    quoteForm.querySelector('[data-copy-status]').textContent = '';
    quoteForm.querySelector('[data-copy-text]').hidden = true;
    successPanel.hidden = true;
    formFields.hidden = false;
    initializeService();
    quoteForm.querySelector('[name="name"]').focus();
  });
  quoteForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    if (!ready || sending || completed || !quoteForm.reportValidity()) return;
    sending = true;
    hasSubmissionError = false;
    fallback.open = false;
    status.classList.remove('show');
    submit.disabled = true;
    submit.textContent = selectedFiles.length ? 'Sending enquiry and files…' : 'Sending…';
    quoteForm.setAttribute('aria-busy', 'true');
    formFields.inert = true;
    const submittedProductSlug = productSelect.value;
    const submittedProduct = productSelect.selectedOptions[0].textContent;
    const submittedEmail = quoteForm.elements.namedItem('email').value.trim();
    let analyticsFailure = 'delivery_unconfirmed';
    let failureMessage = 'We could not confirm whether your enquiry was sent. Please contact us before resubmitting to avoid a duplicate.';
    let emailUnavailable = false;
    try {
      const payload = new FormData(quoteForm);
      payload.delete('files');
      selectedFiles.forEach((file) => payload.append('files', file, file.name));
      const response = await fetch('/api/quote', {
        method: 'POST', headers: { Accept: 'application/json' },
        body: payload,
        signal: AbortSignal.timeout(90000)
      });
      analyticsFailure = errorCategory(response.status);
      const result = await response.json();
      if (!response.ok || !result.ok) {
        emailUnavailable = result.code === 'EMAIL_SERVICE_UNAVAILABLE';
        failureMessage = result.message || (response.status < 500 ? 'Your enquiry could not be submitted. Check your details and complete a new security check.' : failureMessage);
        throw new Error();
      }
      if (!confirmedQuote(response,result)) throw new Error();
      completed = true;
      track('quote_submit_success',{product_slug:submittedProductSlug});
      quoteForm.querySelector('[data-enquiry-reference]').value = result.reference;
      quoteForm.querySelector('[data-reference-status]').textContent = '';
      quoteForm.querySelector('.success-reference').open = true;
      quoteForm.querySelector('[data-success-summary]').textContent = `Your ${submittedProduct} enquiry has been sent. We’ll reply to ${submittedEmail}.`;
      quoteForm.querySelector('[data-success-quantity]').textContent = quoteForm.elements.namedItem('quantity').value.trim();
      quoteForm.querySelector('[data-success-destination]').textContent = quoteForm.elements.namedItem('destination').value.trim();
      quoteForm.querySelector('[data-success-files]').textContent = selectedFiles.length ? `${selectedFiles.length} ${selectedFiles.length === 1 ? 'file' : 'files'}` : 'None';
      quoteForm.querySelector('[data-follow-up]').href = `mailto:info@welltroy.com?subject=${encodeURIComponent(`Follow-up: ${result.reference}`)}`;
      formFields.hidden = true;
      successPanel.hidden = false;
      quoteForm.querySelector('#enquiry-success-title').focus();
      if (widget !== undefined) {
        window.turnstile.remove(widget);
        widget = undefined;
      }
    } catch {
      if (!completed) track("quote_submit_error",{product_slug:submittedProductSlug,error_category:analyticsFailure});
      hasSubmissionError = true;
      fallback.hidden = false;
      fallback.open = true;
      formFields.inert = false;
      showStatus(`${failureMessage} Your details and selected files have been kept on this page. You can copy your requirements below to contact us.`);
    } finally {
      ready = false;
      sending = false;
      formFields.inert = false;
      submit.disabled = true;
      submit.textContent = 'Send My Enquiry';
      quoteForm.removeAttribute('aria-busy');
      if (!completed && widget !== undefined) {
        showService(emailUnavailable
          ? 'Your enquiry was not sent because our email service could not connect. Please use email or WhatsApp below. Your details and files remain on this page.'
          : 'Complete a new security check before trying again. Your details and files remain on this page.', 'waiting', true);
        window.turnstile.reset(widget);
      }
    }
  });
}
