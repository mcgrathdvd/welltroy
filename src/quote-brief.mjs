import { catalogueModels } from './catalogue-models.mjs';
import { comparisonMeasurements, packedDimensionsText, comparisonBriefText } from './packed-size.mjs';
import { specificationFields, specificationLabels, detailPhotoRequest } from './bag-specification.mjs';

export const briefProducts = {
  'poly-mailers': 'Poly Mailers',
  'poly-bubble-mailers': 'Poly Bubble Mailers',
  'zipper-bags': 'Zipper Bags',
  'metallic-bubble-mailers': 'Metallic & Holographic Bubble Mailers'
};
export const finishChoices = {
  'not-sure': 'Please advise on the finish',
  metallic: 'Metallic reflective finish',
  holographic: 'Holographic finish',
  compare: 'Compare metallic and holographic samples'
};
export const printChoices = {
  'not-sure': 'Please advise on printing',
  'unprinted': 'Unprinted',
  'one-color': 'One-color artwork',
  'multi-color': 'Multiple colors / full-color artwork'
};
export const sideChoices = {
  'not-sure': 'Please advise',
  'one-side': 'One side',
  'two-sides': 'Both sides'
};
export const sampleChoices = {
  'not-sure': 'Please advise on samples',
  'existing': 'Existing product sample',
  'custom': 'Custom printed sample',
  'none': 'No sample needed'
};
const prefix = 'welltroy-quote-brief-v1:';
const lifetime = 24 * 60 * 60 * 1000;
const textLimits = { customSize: 160, packedSize: 160, goods: 160, material: 160, quantity: 100, destination: 160, timing: 100, notes: 600 };
const cleanText = (value, max) => typeof value === 'string'
  ? value.replace(/[\u0000-\u001f\u007f]/g, ' ').replace(/\s+/g, ' ').trim().slice(0, max) : '';

export function normalizeBrief(value) {
  if (!value || !Object.hasOwn(briefProducts, value.product)) return null;
  const result = { product: value.product };
  result.sizeMode = ['catalogue', 'custom', 'help'].includes(value.sizeMode) ? value.sizeMode : 'help';
  result.model = result.sizeMode === 'catalogue' && catalogueModels[value.product].includes(value.model) ? value.model : '';
  for (const [key, max] of Object.entries(textLimits)) result[key] = cleanText(value[key], max);
  for (const key of specificationFields[result.product] || []) result[key] = cleanText(value[key], 160);
  if (specificationFields[result.product]) result.detailPhotos = value.detailPhotos === true || value.detailPhotos === 'yes';
  // Hidden options must not leak into the brief after the buyer changes size mode.
  if (result.sizeMode !== 'custom') result.customSize = '';
  if (result.product === 'metallic-bubble-mailers') {
    result.finish = Object.hasOwn(finishChoices, value.finish) ? value.finish : 'not-sure';
    result.finishReference = cleanText(value.finishReference, 160);
  }
  result.printing = Object.hasOwn(printChoices, value.printing) ? value.printing : 'not-sure';
  result.sides = result.printing !== 'unprinted' && Object.hasOwn(sideChoices, value.sides) ? value.sides : 'not-sure';
  result.sample = Object.hasOwn(sampleChoices, value.sample) ? value.sample : 'not-sure';
  const measurement = comparisonMeasurements(value.comparison);
  if (measurement && result.packedSize === packedDimensionsText(measurement)
    && ((result.sizeMode === 'catalogue' && result.model && value.comparison.model === result.model)
      || (result.sizeMode === 'help' && !value.comparison.model))) {
    result.comparison = { ...measurement, model: result.model };
  }
  return result;
}

export function catalogueSize(brief, catalogue = {}) {
  const normalized = normalizeBrief(brief);
  return normalized?.model ? catalogue[normalized.product]?.find(([model]) => model === normalized.model)?.[1] || '' : '';
}

export function briefSize(brief, catalogue = {}) {
  const b = normalizeBrief(brief);
  if (!b) return '';
  if (b.sizeMode === 'custom') return b.customSize || 'Custom size — please advise';
  if (b.model) {
    const size = catalogueSize(b, catalogue);
    return `${b.model}${size ? ` — ${size}` : ''} (catalogue outer size)`.slice(0, 160);
  }
  return 'Please help choose a size';
}

export function briefText(brief, catalogue = {}) {
  const b = normalizeBrief(brief);
  if (!b) return '';
  return [
    `Packaging brief: ${briefProducts[b.product]}`,
    `Size / model: ${briefSize(b, catalogue)}`,
    `Packed item dimensions: ${b.packedSize || 'To be confirmed'}`,
    `Contents / packing use: ${b.goods || 'To be confirmed'}`,
    `Material / thickness / structure preference: ${b.material || 'Please advise'}`,
    ...(specificationFields[b.product] || []).filter(key => b[key]).map(key => `${specificationLabels[key]}: ${b[key]}`),
    ...(b.product === 'metallic-bubble-mailers' ? [`Requested surface effect: ${finishChoices[b.finish]}`, `Finish reference / sample checks: ${b.finishReference || 'Please advise; confirm the actual surface on a sample'}`] : []),
    `Printing: ${printChoices[b.printing]}`,
    ...(b.printing === 'unprinted' ? [] : [`Printed sides: ${sideChoices[b.sides]}`]),
    `Quantity for this size and design: ${b.quantity || 'Not sure yet'}`,
    `Destination country / port: ${b.destination || 'To be confirmed'}`,
    `Target timing: ${b.timing || 'To be discussed'}`,
    `Sample preference: ${sampleChoices[b.sample]}`,
    ...(b.detailPhotos ? [detailPhotoRequest(b.product)] : []),
    ...(b.comparison && comparisonBriefText(b.product, catalogue[b.product], b.comparison) ? [comparisonBriefText(b.product, catalogue[b.product], b.comparison)] : []),
    ...(b.notes ? [`Additional requirements: ${b.notes}`] : []),
    'Please confirm current availability, usable inner dimensions, material, minimum quantity, pricing and delivery before ordering.'
  ].join('\n');
}

export function briefQuoteFields(brief, catalogue = {}) {
  const b = normalizeBrief(brief);
  if (!b) return null;
  return {
    product: b.product,
    quantity: b.quantity || 'Not sure yet',
    size: briefSize(b, catalogue),
    destination: b.destination,
    sample: b.sample === 'not-sure' ? '' : sampleChoices[b.sample],
    message: briefText(b, catalogue)
  };
}

export function saveBrief(storage, brief, now = Date.now()) {
  const b = normalizeBrief(brief);
  if (!b || !Number.isFinite(now)) return false;
  try {
    const value = JSON.stringify({ version: 1, expires: now + lifetime, brief: b });
    storage.setItem(prefix + b.product, value);
    return storage.getItem(prefix + b.product) === value;
  } catch { return false; }
}

export function readBrief(storage, product, now = Date.now()) {
  if (!Object.hasOwn(briefProducts, product)) return null;
  try {
    const saved = JSON.parse(storage.getItem(prefix + product));
    if (saved?.version !== 1 || !Number.isFinite(saved.expires) || saved.expires <= now || saved.expires > now + lifetime) {
      storage.removeItem(prefix + product);
      return null;
    }
    const b = normalizeBrief(saved.brief);
    return b?.product === product ? b : null;
  } catch { return null; }
}

export function clearBrief(storage, product) {
  if (!Object.hasOwn(briefProducts, product)) return;
  try { storage.removeItem(prefix + product); } catch { /* optional browser storage */ }
}

// Preserve user edits if a buyer changes product on the final enquiry form.
export function fieldsAfterProductChange(current, imported) {
  return Object.fromEntries(Object.keys(imported).filter(key => key !== 'product').map(key => [
    key, current[key] === imported[key] ? '' : current[key]
  ]));
}

export function quoteFieldsAreEmpty(current) {
  return ['quantity', 'size', 'destination', 'sample', 'message'].every(key => !current[key]?.trim());
}
