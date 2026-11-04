export const comparisonProducts = ['poly-mailers', 'poly-bubble-mailers', 'zipper-bags'];
const factor = unit => unit === 'in' ? 2.54 : 1;
const epsilon = 1e-8;
const number = value => {
  if (typeof value === 'number') return Number.isFinite(value) ? value : NaN;
  return typeof value === 'string' && /^\+?(?:\d+(?:\.\d*)?|\.\d+)(?:e[+-]?\d+)?$/i.test(value.trim()) ? Number(value) : NaN;
};
export const dimensionText = value => Number(value.toFixed(4)).toString();

export function comparisonMeasurements(value) {
  if (!value || !['cm', 'in'].includes(value.unit)) return null;
  const clean = { unit: value.unit };
  for (const key of ['width', 'length', 'thickness', 'allowance']) {
    const n = number(value[key]);
    const cm = n * factor(value.unit);
    if (!Number.isFinite(cm) || cm < 0 || (key !== 'allowance' && cm === 0) || cm > (key === 'allowance' ? 20 : 1000)) return null;
    clean[key] = n;
  }
  return clean;
}

export function convertMeasurement(value, from, to) {
  if (!['cm', 'in'].includes(from) || !['cm', 'in'].includes(to)) return '';
  if (typeof value === 'string' && !value.trim()) return '';
  const n = number(value);
  return Number.isFinite(n) ? Number((n * factor(from) / factor(to)).toFixed(12)).toString() : '';
}

export function parseOuterSize(size) {
  if (typeof size !== 'string') return null;
  const match = /^(\d+(?:\.\d+)?)\s*×\s*(\d+(?:\.\d+)?)(?:\s*\+\s*(\d+(?:\.\d+)?))?\s*cm$/.exec(size.trim());
  if (!match) return null;
  const [width, length, flap] = [Number(match[1]), Number(match[2]), Number(match[3] || 0)];
  return width > 0 && length > 0 ? { width, length, flap } : null;
}

// This is an outer-dimension screening assumption, not a verified fit formula.
// Both flat dimensions receive the full packed thickness and the buyer's allowance.
export function comparePackedSizes(product, catalogue, value) {
  const input = comparisonMeasurements(value);
  if (!comparisonProducts.includes(product) || !Array.isArray(catalogue) || !input) return null;
  const cm = Object.fromEntries(['width', 'length', 'thickness', 'allowance'].map(key => [key, input[key] * factor(input.unit)]));
  const reference = { width: cm.width + cm.thickness + cm.allowance, length: cm.length + cm.thickness + cm.allowance };
  const models = catalogue.flatMap(([model, size]) => {
    const outer = parseOuterSize(size);
    if (!outer || typeof model !== 'string') return [];
    const direct = outer.width + epsilon >= reference.width && outer.length + epsilon >= reference.length;
    const rotated = outer.width + epsilon >= reference.length && outer.length + epsilon >= reference.width;
    if (!direct && !rotated) return [];
    return [{ model, size, ...outer, rotated: !direct, area: outer.width * outer.length }];
  }).sort((a, b) => a.area - b.area || a.width - b.width || a.length - b.length || a.model.localeCompare(b.model));
  return { input, reference, candidates: models, compared: catalogue.filter(([, size]) => parseOuterSize(size)).length };
}

export function packedDimensionsText(value) {
  const m = comparisonMeasurements(value);
  return m ? `${dimensionText(m.width)} × ${dimensionText(m.length)} × ${dimensionText(m.thickness)} ${m.unit} (packed width × length × thickness)` : '';
}

export function comparisonBriefText(product, catalogue, value) {
  const result = comparePackedSizes(product, catalogue, value);
  if (!result) return '';
  const selected = value.model ? result.candidates.find(c => c.model === value.model) : null;
  if (value.model && !selected) return '';
  const unit = result.input.unit;
  const scale = factor(unit);
  const width = selected?.rotated ? result.reference.length : result.reference.width;
  const length = selected?.rotated ? result.reference.width : result.reference.length;
  const label = selected ? `${selected.model}; ${selected.rotated ? 'packed width and length rotated 90 degrees' : 'as-entered orientation'}`
    : result.candidates.length ? 'Manual size review requested' : 'No catalogue candidate under these assumptions; please review custom options';
  return `Outer-size comparison: ${label}. Screening reference ${dimensionText(width / scale)} × ${dimensionText(length / scale)} ${unit}; extra allowance ${dimensionText(result.input.allowance)} ${unit} on each flat dimension, plus full packed thickness on both. Catalogue outer measurements only; usable space, lining, seams, opening and closure require confirmation with a sample.`;
}
