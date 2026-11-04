import { test } from 'node:test';
import assert from 'node:assert/strict';
import { comparePackedSizes, comparisonMeasurements, parseOuterSize, convertMeasurement, packedDimensionsText } from '../src/packed-size.mjs';
import { products } from '../src/product-data.mjs';
import { normalizeBrief, briefText, briefQuoteFields, saveBrief, readBrief } from '../src/quote-brief.mjs';
import { sanitizeEvent, createTracker } from '../src/analytics-core.mjs';
import { initializePackedSize } from '../src/packed-size.js';
const catalogue = Object.fromEntries(products.map(p => [p.slug, p.sizes]));
const measurement = { unit: 'cm', width: 24, length: 30, thickness: 4, allowance: 2 };
const ids = result => result.candidates.map(c => c.model);

test('length input works with the native controls-collection length property and deep links open the tool', () => {
  const originalWindow = globalThis.window, originalLocation = globalThis.location;
  const inputs = Object.fromEntries(['unit', 'width', 'length', 'thickness', 'allowance'].map(key => [key, { value: key === 'unit' ? 'cm' : key === 'allowance' ? '2' : '' }]));
  const events = new Map();
  const form = { elements: { length: 6, namedItem: name => inputs[name] }, addEventListener: (name, handler) => events.set(name, handler) };
  const nodes = {
    '[data-size-form]': form, '[data-size-results]': {}, '[data-size-candidates]': { replaceChildren() {} },
    '[data-size-status]': {}, '[data-size-application]': {}, '[data-size-help]': { addEventListener() {} }
  };
  const panel = { hidden: true, open: false, querySelector: selector => nodes[selector] };
  const root = { querySelector: () => panel, addEventListener() {} };
  try {
    globalThis.window = { addEventListener() {} }; globalThis.location = { hash: '#size-comparison' };
    assert.doesNotThrow(() => initializePackedSize(root, { product: 'poly-mailers', catalogue: catalogue['poly-mailers'], choose() {} }));
    assert.equal(panel.open, true); assert.equal(panel.hidden, false); assert.equal(inputs.length.max, '1000');
    Object.assign(inputs.width, { value: '24' }); Object.assign(inputs.length, { value: '30' }); Object.assign(inputs.thickness, { value: '4' }); inputs.unit.value = 'in';
    events.get('change')({ target: { name: 'unit' } });
    assert.ok(Math.abs(Number(inputs.length.value) * 2.54 - 30) < 1e-8);
    assert.ok(Number(inputs.length.max) < 394);
  } finally { globalThis.window = originalWindow; globalThis.location = originalLocation; }
});

test('real poly mailers are screened using thickness and allowance on each dimension', () => {
  const result = comparePackedSizes('poly-mailers', catalogue['poly-mailers'], measurement);
  assert.deepEqual(result.reference, { width: 30, length: 36 });
  assert.equal(result.compared, 13);
  assert.equal(result.candidates[0].model, 'P05');
  assert.ok(!ids(result).includes('P03'));
  assert.ok(!ids(result).includes('P04'));
  assert.ok(result.candidates.every((candidate, index, list) => !index || candidate.area >= list[index - 1].area));
});
test('a long flap cannot make an undersized body pass the screen', () => {
  assert.deepEqual(parseOuterSize('25 × 30 + 100 cm'), { width: 25, length: 30, flap: 100 });
  const result = comparePackedSizes('poly-mailers', [['X', '25 × 30 + 100 cm']], { unit: 'cm', width: 20, length: 31, thickness: 1, allowance: 0 });
  assert.equal(result.candidates.length, 0);
});
test('rotation swaps only the two flat dimensions and is labelled in the result', () => {
  const result = comparePackedSizes('zipper-bags', [['Z', '40 × 25 cm']], { unit: 'cm', width: 20, length: 30, thickness: 2, allowance: 1 });
  assert.equal(result.candidates.length, 1);
  assert.equal(result.candidates[0].rotated, true);
  assert.deepEqual(result.reference, { width: 23, length: 33 });
});
test('centimeter and inch inputs produce equivalent candidates, including boundary dimensions', () => {
  const inches = { unit: 'in', ...Object.fromEntries(Object.entries(measurement).filter(([key]) => key !== 'unit').map(([key, value]) => [key, convertMeasurement(String(value), 'cm', 'in')])) };
  assert.deepEqual(ids(comparePackedSizes('poly-mailers', catalogue['poly-mailers'], inches)), ids(comparePackedSizes('poly-mailers', catalogue['poly-mailers'], measurement)));
  assert.equal(convertMeasurement('', 'cm', 'in'), '');
  assert.equal(convertMeasurement('0', 'cm', 'in'), '0');
  let roundTrip = '24';
  for (let i = 0; i < 50; i++) roundTrip = convertMeasurement(convertMeasurement(roundTrip, 'cm', 'in'), 'in', 'cm');
  assert.ok(Math.abs(Number(roundTrip) - 24) < 1e-8);
  assert.equal(convertMeasurement('1', 'mm', 'in'), '');
});
test('invalid dimensions, units and unsupported products do not create candidate results', () => {
  for (const bad of [{ width: '' }, { width: -1 }, { thickness: 0 }, { length: Infinity }, { length: '0x20' }, { allowance: 21 }, { unit: 'mm' }, { width: '1e999' }]) assert.equal(comparisonMeasurements({ ...measurement, ...bad }), null);
  assert.equal(comparePackedSizes('thermal-labels', [], measurement), null);
  for (const text of ['25 × 30 in', '20 x 30 cm', '0 × 30 cm', '25 × 30 + flap cm']) assert.equal(parseOuterSize(text), null);
});
test('all three actual catalogues parse, and oversized packs produce no forced recommendation', () => {
  for (const product of ['poly-mailers', 'poly-bubble-mailers', 'zipper-bags']) {
    assert.ok(catalogue[product].every(([, size]) => parseOuterSize(size)));
    const result = comparePackedSizes(product, catalogue[product], { ...measurement, width: 500, length: 500 });
    assert.equal(result.compared, catalogue[product].length);
    assert.equal(result.candidates.length, 0);
  }
});
test('increasing thickness or allowance can only remove candidates', () => {
  const baseline = new Set(ids(comparePackedSizes('poly-mailers', catalogue['poly-mailers'], measurement)));
  for (const changed of [{ thickness: 8 }, { allowance: 6 }]) {
    const result = comparePackedSizes('poly-mailers', catalogue['poly-mailers'], { ...measurement, ...changed });
    assert.ok(result.candidates.every(c => baseline.has(c.model)));
  }
});
test('selected candidate and screening assumptions survive draft restoration and reach enquiry text', () => {
  const brief = { product: 'poly-mailers', sizeMode: 'catalogue', model: 'P05', packedSize: packedDimensionsText(measurement), comparison: { ...measurement, model: 'P05' }, quantity: '1,000 pieces' };
  let saved;
  const storage = { setItem: (_, value) => { saved = value; }, getItem: () => saved, removeItem: () => { saved = null; } };
  assert.equal(saveBrief(storage, brief, 100), true);
  const restored = readBrief(storage, 'poly-mailers', 101);
  assert.deepEqual(restored.comparison, { ...measurement, model: 'P05' });
  const fields = briefQuoteFields(restored, catalogue);
  assert.match(fields.message, /Outer-size comparison: P05/);
  assert.match(fields.message, /Screening reference 30 × 36 cm/);
  assert.match(fields.message, /extra allowance 2 cm/);
  assert.ok(fields.message.length < 5000);
  assert.equal(normalizeBrief({ ...brief, model: 'P06' }).comparison, undefined);
  assert.equal(normalizeBrief({ ...brief, packedSize: 'My edited measurements' }).comparison, undefined);
  assert.equal(normalizeBrief({ ...brief, sizeMode: 'custom', customSize: 'Custom 40 × 50 cm' }).comparison, undefined);
});
test('manual advice carries a no-candidate result without inventing a catalogue model', () => {
  const huge = { ...measurement, width: 500, length: 500 };
  const brief = { product: 'zipper-bags', sizeMode: 'help', packedSize: packedDimensionsText(huge), comparison: { ...huge, model: '' } };
  const text = briefText(brief, catalogue);
  assert.match(text, /No catalogue candidate under these assumptions/);
  assert.match(text, /Please help choose a size/);
  assert.equal(normalizeBrief({ product: 'poly-mailers' }).comparison, undefined);
});
test('comparison measurement analytics discard all dimensions and private data and require consent', () => {
  const details = { product_slug: 'poly-mailers', ...measurement, email: 'buyer@example.com', message: 'private' };
  const clean = sanitizeEvent('size_comparison', details, '/products/poly-mailers/?private=yes');
  assert.deepEqual(Object.keys(clean).sort(), ['page_path', 'page_location', 'page_title', 'product_slug'].sort());
  assert.equal(sanitizeEvent('size_comparison', { product_slug: 'thermal-labels' }, '/products/thermal-labels/'), null);
  let consent = false; const sent = [];
  const tracker = createTracker({ canSend: () => consent, send: (...args) => sent.push(args), getPath: () => '/products/poly-mailers/' });
  assert.equal(tracker('size_comparison', details), false);
  consent = true; assert.equal(tracker('size_comparison', details), true);
  consent = false; assert.equal(tracker('size_comparison', details), false);
  assert.equal(sent.length, 1);
});
