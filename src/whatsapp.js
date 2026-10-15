const dialog = document.querySelector('[data-whatsapp-dialog]');
if (dialog && typeof dialog.showModal === 'function') {
  const number = '8619864656856';
  const message = dialog.querySelector('[data-whatsapp-message]');
  const continueLink = dialog.querySelector('[data-whatsapp-continue]');
  const include = dialog.querySelector('[data-whatsapp-include]');
  const includeWrap = dialog.querySelector('[data-whatsapp-include-wrap]');
  const status = dialog.querySelector('[data-whatsapp-status]');
  let baseMessage = '';
  const updateLink = () => { continueLink.href = `https://wa.me/${number}?text=${encodeURIComponent(message.value)}`; };
  const enquiryLines = () => {
    const form = document.querySelector('[data-quote-form]');
    if (!form) return '';
    return ['product','quantity','size','destination'].map((name) => {
      const input = form.elements.namedItem(name);
      const value = name === 'product' ? (input.value ? input.selectedOptions[0].textContent : '') : input.value.trim();
      const label = {product:'Product',quantity:'Quantity',size:'Size / model',destination:'Destination'}[name];
      return value ? `${label}: ${value}` : '';
    }).filter(Boolean).join('\n');
  };
  document.addEventListener('click', (event) => {
    const link = event.target.closest('a[href]');
    if (!link || dialog.contains(link) || event.defaultPrevented || event.button !== 0 || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
    const url = new URL(link.href);
    if (url.hostname !== 'wa.me' || url.pathname !== `/${number}`) return;
    event.preventDefault();
    baseMessage = url.searchParams.get('text') || `Hi Welltroy, I would like a quote for custom packaging.\nProduct:\nQuantity:\nSize:\nDestination:`;
    message.value = baseMessage;
    include.checked = false;
    includeWrap.hidden = !document.querySelector('[data-quote-form]');
    status.textContent = '';
    updateLink();
    dialog.showModal();
  });
  include.addEventListener('change', () => {
    message.value = include.checked ? `Hi Welltroy, could you quote for this packaging enquiry?\n${enquiryLines()}` : baseMessage;
    updateLink();
  });
  message.addEventListener('input', updateLink);
  dialog.querySelector('[data-whatsapp-close]').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', (event) => {
    const rect = dialog.getBoundingClientRect();
    if (event.target === dialog && (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom)) dialog.close();
  });
  const copy = async (text, success) => {
    try { await navigator.clipboard.writeText(text); status.textContent = success; }
    catch { message.focus(); message.select(); status.textContent = 'Select and copy the message above. The WhatsApp number is +86 198 6465 6856.'; }
  };
  dialog.querySelector('[data-copy-whatsapp]').addEventListener('click', () => copy('+8619864656856','WhatsApp number copied.'));
  dialog.querySelector('[data-copy-whatsapp-message]').addEventListener('click', () => copy(message.value,'Message copied. Paste it into WhatsApp or email and attach your files separately.'));
}
