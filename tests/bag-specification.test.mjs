import { test } from 'node:test';
import assert from 'node:assert/strict';
import { normalizeBrief, briefQuoteFields, briefText, saveBrief, readBrief } from '../src/quote-brief.mjs';
import { products } from '../src/product-data.mjs';
import { sanitizeEvent } from '../src/analytics-core.mjs';
const catalogue = Object.fromEntries(products.map(p => [p.slug, p.sizes]));
const base = { product: 'poly-bubble-mailers', sizeMode: 'catalogue', model: 'BM02', quantity: '1,000 pieces', destination: 'Germany', notes: 'Keep my existing artwork request.' };
const memory = () => { const data = new Map(); return { getItem: key => data.get(key) ?? null, setItem: (key, value) => data.set(key, value), removeItem: key => data.delete(key) }; };

test('bubble buyer targets and a photo availability question reach the editable enquiry without replacing existing notes', () => {
  const fields = briefQuoteFields({ ...base, innerSize: 'Please confirm usable opening', closure: 'Review closure around our retail box', liner: 'Please advise on the liner', packout: 'Please quote pieces per carton', detailPhotos: 'yes' }, catalogue);
  assert.equal(fields.product, 'poly-bubble-mailers'); assert.equal(fields.quantity, base.quantity);
  for (const text of ['Requested usable inner size / opening: Please confirm usable opening', 'Requested closure: Review closure', 'Requested bubble liner / cushioning: Please advise', 'Requested bundle / carton packing: Please quote', base.notes, 'Please advise which detail photos are available']) assert.ok(fields.message.includes(text));
  assert.ok(fields.message.includes('outer film and lining'));
  assert.equal((fields.message.match(/Please advise which detail photos/g) || []).length, 1);
});
test('clothing zipper bags carry finish requests and closure questions without importing a bubble-liner field', () => {
  const b = { ...base, product: 'zipper-bags', model: 'Z04', appearance: 'Frosted appearance for review', closure: 'Check loading and reclosure', liner: 'Wrong product field', detailPhotos: true };
  const normalized = normalizeBrief(b);
  assert.equal(normalized.liner, undefined);
  const message = briefText(b, catalogue);
  assert.ok(message.includes('Requested finish / visibility: Frosted appearance for review'));
  assert.ok(message.includes('usable space below the closure'));
  assert.ok(!message.includes('Wrong product field'));
  assert.ok(!message.includes('outer film and lining'));
});
test('unsupported specification fields never leak into the plain poly mailer brief', () => {
  const b = normalizeBrief({ ...base, product: 'poly-mailers', model: 'P03', innerSize: 'Private target', appearance: 'Wrong appearance field', detailPhotos: true });
  assert.equal(b.innerSize, undefined); assert.equal(b.detailPhotos, undefined);
  assert.ok(!briefText(b, catalogue).includes('detail photos'));
});
test('photo request requires the actual checkbox value and remains optional for legacy drafts', () => {
  for (const value of [undefined, false, 'false', 'true', 1, 0, null, {}]) assert.equal(normalizeBrief({ ...base, detailPhotos: value }).detailPhotos, false);
  assert.equal(normalizeBrief({ ...base, detailPhotos: 'yes' }).detailPhotos, true);
  assert.equal(normalizeBrief({ ...base, detailPhotos: true }).detailPhotos, true);
  assert.ok(!briefText(base, catalogue).includes('detail photos'));
});
test('order-specific fields and checkbox survive restoration while old draft values remain intact', () => {
  const storage = memory();
  const b = { ...base, innerSize: 'Inner space to confirm', packout: 'Carton packing to confirm', detailPhotos: true };
  assert.equal(saveBrief(storage, b, 100), true);
  const restored = readBrief(storage, base.product, 101);
  assert.equal(restored.detailPhotos, true); assert.equal(restored.innerSize, b.innerSize); assert.equal(restored.packout, b.packout); assert.equal(restored.notes, base.notes);
  assert.equal(readBrief(storage, 'zipper-bags', 101), null);
});
test('long requests remain within the enquiry message contract and lose control characters', () => {
  const b = { ...base, innerSize: 'x'.repeat(400), closure: '  Check\n reclosure  ', liner: 'l'.repeat(300), packout: 'p'.repeat(300), material: 'm'.repeat(300), goods: 'g'.repeat(300), packedSize: 's'.repeat(300), destination: 'd'.repeat(300), quantity: 'q'.repeat(200), notes: 'n'.repeat(1000), timing: 't'.repeat(300), detailPhotos: true };
  const normalized = normalizeBrief(b);
  assert.equal(normalized.innerSize.length, 160); assert.equal(normalized.closure, 'Check reclosure');
  assert.ok(briefQuoteFields(b, catalogue).message.length <= 5000);
});
test('specification details and photo requests stay out of consented analytics payloads', () => {
  const payload = sanitizeEvent('quote_brief_start', { product_slug: 'zipper-bags', innerSize: 'private', closure: 'private', detailPhotos: true, email: 'buyer@example.com' }, '/products/zipper-bags/');
  assert.deepEqual(Object.keys(payload).sort(), ['page_path', 'page_location', 'page_title', 'product_slug'].sort());
});
