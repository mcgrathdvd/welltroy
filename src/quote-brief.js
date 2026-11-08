import {
  briefProducts, normalizeBrief, briefText, briefQuoteFields,
  readBrief, saveBrief, clearBrief, fieldsAfterProductChange, quoteFieldsAreEmpty
} from './quote-brief.mjs';
import { track } from './analytics.js';
import { initializePackedSize } from './packed-size.js';
import { packedDimensionsText } from './packed-size.mjs';

function session() {
  try { return window.sessionStorage; } catch { return null; }
}
function catalogueFor(root) {
  try { return JSON.parse(root.querySelector('[data-brief-catalogue]')?.textContent || '{}'); }
  catch { return {}; }
}
const formValues = form => Object.fromEntries(new FormData(form).entries());

export function initializeQuoteBrief() {
  const root = document.querySelector('[data-quote-brief]');
  if (root) initializeBuilder(root);
  const form = document.querySelector('[data-quote-form]');
  if (form) initializeImport(form);
}

function initializeBuilder(root) {
  const product = root.dataset.product;
  if (!Object.hasOwn(briefProducts, product)) return;
  const form = root.querySelector('[data-brief-form]');
  const catalogue = catalogueFor(root);
  const summary = root.querySelector('[data-brief-summary]');
  const status = root.querySelector('[data-brief-status]');
  const fallback = root.querySelector('[data-brief-fallback]');
  const storage = session();
  let started = false;
  let selectedComparison = null;
  const current = () => normalizeBrief({ ...formValues(form), product, comparison: selectedComparison });
  const render = () => {
    const mode = form.elements.sizeMode.value;
    for (const [value, selector, field] of [
      ['catalogue', '[data-brief-catalogue-field]', 'model'],
      ['custom', '[data-brief-custom-field]', 'customSize']
    ]) {
      root.querySelector(selector).hidden = mode !== value;
      form.elements[field].disabled = mode !== value;
      form.elements[field].required = mode === value;
    }
    const unprinted = form.elements.printing.value === 'unprinted';
    root.querySelector('[data-brief-sides-field]').hidden = unprinted;
    form.elements.sides.disabled = unprinted;
    summary.value = briefText(current(), catalogue);
  };
  const saved = readBrief(storage, product);
  if (saved) {
    selectedComparison = saved.comparison || null;
    for (const [name, value] of Object.entries(saved)) {
      const field = form.elements.namedItem(name);
      if (field?.type === 'checkbox') field.checked = value === true;
      else if (field) field.value = value;
    }
    status.textContent = 'Your selections from this tab have been restored. Review or change them before continuing.';
    if (saved.material || saved.finishReference || saved.innerSize || saved.closure || saved.liner || saved.appearance || saved.packout || saved.detailPhotos || saved.timing || saved.notes || saved.sample !== 'not-sure') root.querySelector('.brief-more').open = true;
  }
  if (saved && (saved.alternativeQuantities || saved.postalCode || saved.deliveryScope !== 'not-sure' || saved.itemizedQuote)) root.querySelector('[data-brief-delivery]').open = true;
  render();
  root.querySelector('[data-brief-ui]').hidden = false;
  initializePackedSize(root, { product, catalogue: catalogue[product], saved: selectedComparison, choose: (comparison, trusted) => {
    selectedComparison = comparison;
    form.elements.sizeMode.value = comparison.model ? 'catalogue' : 'help';
    form.elements.model.value = comparison.model;
    form.elements.packedSize.value = packedDimensionsText(comparison);
    render();
    saveBrief(storage, current());
    status.textContent = comparison.model ? `${comparison.model} and comparison assumptions added. Review before continuing.` : 'Packed measurements added for sizing advice.';
    if (trusted && !started) started = track('quote_brief_start', { product_slug: product, brief_type: 'product' });
    if (trusted && comparison.model) track('select_size', { product_slug: product, model: comparison.model });
  }});
  const changed = event => {
    if (['sizeMode', 'model', 'packedSize'].includes(event.target.name)) selectedComparison = null;
    render();
    saveBrief(storage, current());
    status.textContent = '';
    fallback.hidden = true;
    if (event.isTrusted && !started) started = track('quote_brief_start', { product_slug: product, brief_type: 'product' });
    if (event.isTrusted && event.type === 'change' && event.target.name === 'model' && current().model) {
      track('select_size', { product_slug: product, model: current().model });
    }
  };
  form.addEventListener('input', changed);
  form.addEventListener('change', changed);
  const openSpecificationFields = () => {
    if (['#brief-specification-checks', '#brief-sample'].includes(location.hash)) root.querySelector('.brief-more').open = true;
    if (location.hash === '#quote-delivery-checks') {
      const delivery = root.querySelector('[data-brief-delivery]');
      delivery.open = true;
      // Native fragment/scroll restoration may run while the brief is still hidden.
      const revealDelivery = () => requestAnimationFrame(() => delivery.scrollIntoView({ block: 'start', behavior: 'instant' }));
      if (document.readyState === 'complete') revealDelivery();
      else window.addEventListener('load', revealDelivery, { once: true });
    }
  };
  window.addEventListener('hashchange', openSpecificationFields);
  openSpecificationFields();
  document.querySelectorAll('[data-open-spec-brief]').forEach(link => link.addEventListener('click', event => {
    root.querySelector('.brief-more').open = true;
    const photoRequest = form.elements.namedItem('detailPhotos');
    if (link.hasAttribute('data-request-detail-photos') && photoRequest) {
      photoRequest.checked = true;
      render(); saveBrief(storage, current());
      status.textContent = 'A request about available detail photos was added to your brief. Review the specifications before continuing.';
      if (event.isTrusted && !started) started = track('quote_brief_start', { product_slug: product, brief_type: 'product' });
    }
  }));
  document.querySelectorAll('[data-add-brief-model]').forEach(link => {
    link.addEventListener('click', event => {
      selectedComparison = null;
      form.elements.sizeMode.value = 'catalogue';
      form.elements.model.value = link.dataset.addBriefModel;
      render();
      saveBrief(storage, current());
      status.textContent = `${current().model} added. Check the remaining selections before continuing.`;
      if (event.isTrusted && !started) started = track('quote_brief_start', { product_slug: product, brief_type: 'product' });
      if (event.isTrusted) track('select_size', { product_slug: product, model: current().model });
      form.elements.model.focus({ preventScroll: true });
    });
  });
  form.addEventListener('submit', event => {
    event.preventDefault();
    if (!saveBrief(storage, current())) {
      status.textContent = 'Your browser could not carry these selections to the next page. Copy the brief below, then paste it into the enquiry form requirements.';
      fallback.hidden = false;
      summary.focus();
      summary.select();
      return;
    }
    if (event.isTrusted) track('quote_brief_continue', { product_slug: product, brief_type: 'product' });
    // Carry only fixed routing labels in the URL. Measurements and free text stay in this tab.
    window.location.assign(`/quote/?product=${product}&brief=1#quote-form`);
  });
  root.querySelector('[data-brief-copy]').addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(summary.value);
      status.textContent = 'Brief copied. You can paste it into an enquiry or message.';
    } catch {
      summary.focus(); summary.select();
      status.textContent = 'Select and copy the brief shown above.';
    }
  });
  root.querySelector('[data-brief-clear]').addEventListener('click', () => {
    form.reset();
    selectedComparison = null;
    root.dispatchEvent(new Event('welltroy:brief-cleared'));
    clearBrief(storage, product);
    render();
    fallback.hidden = true;
    status.textContent = 'Selections cleared for this product.';
    started = false;
    form.elements.sizeMode.focus({ preventScroll: true });
  });
}

function initializeImport(form) {
  const params = new URLSearchParams(window.location.search);
  const product = params.get('product');
  if (params.get('brief') !== '1' || !Object.hasOwn(briefProducts, product)) return;
  const panel = form.querySelector('[data-brief-import]');
  if (!panel) return;
  panel.hidden = false;
  const status = panel.querySelector('[data-brief-import-status]');
  const applyButton = panel.querySelector('[data-brief-apply]');
  panel.querySelector('[data-brief-return]').href = `/products/${product}/#quote-brief`;
  const storage = session();
  const saved = readBrief(storage, product);
  if (!saved) {
    status.textContent = 'No saved brief is available in this tab. Enter your requirements below, or return to the product page to build your selections.';
    return;
  }
  const fields = briefQuoteFields(saved, catalogueFor(form));
  const values = () => Object.fromEntries(Object.keys(fields).map(key => [key, form.elements.namedItem(key).value]));
  let applied = false;
  const apply = () => {
    if (form.elements.product.value !== product) return;
    for (const [key, value] of Object.entries(fields)) form.elements.namedItem(key).value = value;
    applied = true;
    applyButton.hidden = true;
    form.dispatchEvent(new Event('welltroy:brief-applied'));
    status.textContent = 'Your selections are in the fields below. Review and edit them, add your name, email and destination, then send when ready. Nothing has been sent yet.';
  };
  if (form.elements.product.value === product && quoteFieldsAreEmpty(values())) apply();
  else {
    status.textContent = 'This form already contains specifications. You can keep editing them, or apply your product brief to replace quantity, size, destination, sample and requirements. Contact details and files are kept.';
    applyButton.hidden = form.elements.product.value !== product;
  }
  applyButton.addEventListener('click', apply);
  form.elements.product.addEventListener('change', () => {
    if (form.elements.product.value === product) {
      status.textContent = 'You can enter new specifications or apply your saved product selections again.';
      applyButton.hidden = false;
      return;
    }
    if (applied) {
      const next = fieldsAfterProductChange(values(), fields);
      for (const [key, value] of Object.entries(next)) form.elements.namedItem(key).value = value;
    }
    applied = false;
    applyButton.hidden = true;
    status.textContent = 'Product changed. Unedited fields imported from the previous product were cleared. Details you edited were kept; review them for the new product.';
  });
  const clear = () => {
    clearBrief(storage, product);
    applied = false;
    panel.hidden = true;
  };
  form.addEventListener('welltroy:quote-sent', clear);
  form.addEventListener('welltroy:new-enquiry', clear);
}
