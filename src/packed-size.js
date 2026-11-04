import { comparePackedSizes, comparisonMeasurements, convertMeasurement, dimensionText } from './packed-size.mjs';
import { track } from './analytics.js';

export function initializePackedSize(root, { product, catalogue, saved, choose }) {
  const panel = root.querySelector('[data-size-comparison]');
  if (!panel) return;
  const form = panel.querySelector('[data-size-form]');
  const field = name => form.elements.namedItem(name);
  const results = panel.querySelector('[data-size-results]');
  const cards = panel.querySelector('[data-size-candidates]');
  const status = panel.querySelector('[data-size-status]');
  const application = panel.querySelector('[data-size-application]');
  let previousUnit = 'cm';
  let calculation = null;
  const values = () => Object.fromEntries(new FormData(form).entries());
  const bounds = () => {
    const factor = field('unit').value === 'in' ? 2.54 : 1;
    for (const key of ['width', 'length', 'thickness', 'allowance']) {
      field(key).max = String((key === 'allowance' ? 20 : 1000) / factor);
      field(key).min = key === 'allowance' ? '0' : String(0.001 / factor);
    }
    for (const [key, value] of [['width', '24'], ['length', '30'], ['thickness', '4']]) field(key).placeholder = `e.g. ${dimensionText(Number(convertMeasurement(value, 'cm', field('unit').value)))}`;
  };
  const invalidate = () => {
    if (calculation) status.textContent = 'Measurements changed. Compare again for new candidates; your existing brief below stays as shown.';
    calculation = null;
    results.hidden = true;
    cards.replaceChildren();
    application.textContent = '';
  };
  const select = (candidate, event) => {
    if (!calculation) return;
    choose({ ...calculation.input, model: candidate?.model || '' }, event.isTrusted);
    application.textContent = candidate ? `${candidate.model} and these measurements were added to your brief below. Review the selections before continuing.` : 'Measurements added to your brief for manual sizing advice. Review the selections below.';
  };
  const compare = value => {
    calculation = comparePackedSizes(product, catalogue, value);
    cards.replaceChildren();
    application.textContent = '';
    if (!calculation) {
      results.hidden = true;
      status.textContent = 'Enter positive packed dimensions and an allowance from 0 to 20 cm (0 to about 7.87 in), using the selected unit. Packed dimensions must be no more than 1,000 cm each.';
      return false;
    }
    const { reference, candidates, compared, input } = calculation;
    results.hidden = false;
    const scale = input.unit === 'in' ? 2.54 : 1;
    panel.querySelector('[data-size-reference]').textContent = `As-entered screening reference: ${dimensionText(reference.width / scale)} × ${dimensionText(reference.length / scale)} ${input.unit}, with full packed thickness and ${dimensionText(input.allowance)} ${input.unit} extra allowance on each flat dimension. A 90° width/length rotation is also checked.`;
    status.textContent = candidates.length ? `${candidates.length} of ${compared} catalogue models meet this outer-size screen. Showing the ${Math.min(3, candidates.length)} smallest by outer area for review.` : `None of the ${compared} catalogue models meets this outer-size screen. Send the measurements for a custom-size or packing review.`;
    for (const candidate of candidates.slice(0, 3)) {
      const card = document.createElement('article');
      const title = document.createElement('h4'); title.textContent = candidate.model;
      const size = document.createElement('p'); size.textContent = `Catalogue outer size: ${candidate.size}`;
      const orientation = document.createElement('p'); orientation.textContent = candidate.rotated ? 'Packed width and length rotated 90°.' : 'Packed width and length as entered.';
      const note = document.createElement('p'); note.textContent = 'Candidate for sample review; usable space and availability need confirmation.';
      const button = document.createElement('button'); button.type = 'button'; button.className = 'button button-secondary'; button.textContent = `Use ${candidate.model} in My Brief`;
      button.addEventListener('click', event => select(candidate, event));
      card.append(title, size, orientation, note, button); cards.append(card);
    }
    return true;
  };
  form.addEventListener('input', event => { if (event.target.name !== 'unit') invalidate(); });
  form.addEventListener('change', event => {
    if (event.target.name === 'unit') {
      const next = field('unit').value;
      for (const key of ['width', 'length', 'thickness', 'allowance']) field(key).value = convertMeasurement(field(key).value, previousUnit, next);
      previousUnit = next;
      bounds();
    }
    invalidate();
  });
  form.addEventListener('submit', event => {
    event.preventDefault();
    if (compare(values()) && event.isTrusted) track('size_comparison', { product_slug: product });
  });
  panel.querySelector('[data-size-help]').addEventListener('click', event => select(null, event));
  const restored = comparisonMeasurements(saved);
  if (restored) {
    for (const [key, value] of Object.entries(restored)) field(key).value = value;
    previousUnit = restored.unit;
    compare(restored);
  }
  root.addEventListener('welltroy:brief-cleared', () => {
    form.reset(); previousUnit = 'cm'; bounds(); invalidate(); status.textContent = '';
  });
  bounds();
  panel.hidden = false;
  const openFromHash = () => { if (location.hash === '#size-comparison') panel.open = true; };
  window.addEventListener('hashchange', openFromHash);
  openFromHash();
}
