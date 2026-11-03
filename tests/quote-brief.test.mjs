import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  normalizeBrief, briefText, briefQuoteFields, readBrief, saveBrief,
  clearBrief, fieldsAfterProductChange, quoteFieldsAreEmpty
} from '../src/quote-brief.mjs';
import { products } from '../src/product-data.mjs';
import { sanitizeEvent, createTracker } from '../src/analytics-core.mjs';

const catalogue = Object.fromEntries(products.map(p => [p.slug, p.sizes]));
const base = { product: 'poly-mailers', sizeMode: 'catalogue', model: 'P03', quantity: '1,000 pieces', destination: 'United States', printing: 'one-color', sides: 'one-side', sample: 'custom' };
const memory = () => {
  const data = new Map();
  return { getItem: key => data.get(key) ?? null, setItem: (key, value) => data.set(key, value), removeItem: key => data.delete(key), data };
};

test('each family carries a real catalogue model and outer dimensions into the existing form contract', () => {
  for (const [product, model] of [['poly-mailers', 'P03'], ['poly-bubble-mailers', 'BM02'], ['zipper-bags', 'Z04']]) {
    const fields = briefQuoteFields({ ...base, product, model }, catalogue);
    const size = catalogue[product].find(([id]) => id === model)[1];
    assert.equal(fields.product, product);
    assert.equal(fields.size, `${model} — ${size} (catalogue outer size)`);
    assert.equal(fields.quantity, base.quantity);
    assert.equal(fields.destination, base.destination);
    assert.equal(fields.sample, 'Custom printed sample');
    assert.match(fields.message, /not|confirm/i);
    assert.ok(fields.message.includes(size));
    assert.ok(fields.message.length <= 5000);
  }
});

test('product switches and size mode switches cannot retain a hidden or mismatched model', () => {
  assert.equal(normalizeBrief({ ...base, product: 'zipper-bags' }).model, '');
  assert.equal(normalizeBrief({ ...base, sizeMode: 'help', customSize: 'old custom size' }).model, '');
  assert.equal(normalizeBrief({ ...base, sizeMode: 'help', customSize: 'old custom size' }).customSize, '');
  const fields = briefQuoteFields({ ...base, sizeMode: 'custom', customSize: 'Outer 26 × 35 + 5 cm' }, catalogue);
  assert.equal(fields.size, 'Outer 26 × 35 + 5 cm');
  assert.ok(!fields.message.includes('P03'));
  assert.equal(normalizeBrief({ product: '__proto__' }), null);
  assert.equal(normalizeBrief({ product: 'thermal-labels' }), null);
});

test('unknown preferences stay requests for advice and unprinted selection removes stale printed sides', () => {
  const fields = briefQuoteFields({ product: 'zipper-bags' }, catalogue);
  assert.equal(fields.size, 'Please help choose a size');
  assert.equal(fields.quantity, 'Not sure yet');
  assert.equal(fields.destination, '');
  assert.equal(fields.sample, '');
  assert.match(fields.message, /Please advise/);
  assert.ok(!briefText({ ...base, printing: 'unprinted', sides: 'two-sides' }, catalogue).includes('Printed sides'));
});

test('brief normalization bounds free text and excludes unrelated contact details and files', () => {
  const b = normalizeBrief({ ...base, quantity: '  1000\n pieces  ', notes: 'n'.repeat(900), email: 'buyer@example.com', files: ['private.ai'] });
  assert.equal(b.quantity, '1000 pieces');
  assert.equal(b.notes.length, 600);
  assert.ok(!Object.hasOwn(b, 'email'));
  assert.ok(!Object.hasOwn(b, 'files'));
});

test('separate product drafts survive return navigation, expire after 24 hours and clear independently', () => {
  const storage = memory();
  assert.equal(saveBrief(storage, base, 100), true);
  assert.equal(saveBrief(storage, { ...base, product: 'zipper-bags', model: 'Z02' }, 100), true);
  assert.equal(readBrief(storage, 'poly-mailers', 101).model, 'P03');
  assert.equal(readBrief(storage, 'zipper-bags', 101).model, 'Z02');
  clearBrief(storage, 'poly-mailers');
  assert.equal(readBrief(storage, 'poly-mailers', 101), null);
  assert.equal(readBrief(storage, 'zipper-bags', 101).model, 'Z02');
  assert.equal(readBrief(storage, 'zipper-bags', 100 + 24 * 3600000), null);
});

test('storage rejection, malformed data and mismatched drafts are handled without losing normal navigation', () => {
  const blocked = { getItem() { throw Error('blocked'); }, setItem() { throw Error('blocked'); } };
  assert.equal(saveBrief(blocked, base), false);
  assert.equal(readBrief(blocked, 'poly-mailers'), null);
  assert.doesNotThrow(() => clearBrief(blocked, 'poly-mailers'));
  const storage = memory();
  const key = 'welltroy-quote-brief-v1:poly-mailers';
  storage.setItem(key, 'broken json');
  assert.equal(readBrief(storage, 'poly-mailers', 100), null);
  storage.setItem(key, JSON.stringify({ version: 1, expires: 200, brief: { ...base, product: 'zipper-bags', model: 'Z02' } }));
  assert.equal(readBrief(storage, 'poly-mailers', 100), null);
  storage.setItem(key, JSON.stringify({ version: 1, expires: 100 + 25 * 3600000, brief: base }));
  assert.equal(readBrief(storage, 'poly-mailers', 100), null);
});

test('final form import does not overwrite existing edits, and product changes clear only untouched imports', () => {
  const imported = briefQuoteFields(base, catalogue);
  assert.equal(quoteFieldsAreEmpty({ quantity: '', size: '', destination: '', sample: '', message: '' }), true);
  assert.equal(quoteFieldsAreEmpty({ message: 'Buyer has already edited this' }), false);
  const current = { ...imported, product: 'zipper-bags', message: 'My revised requirements', destination: 'Canada' };
  const next = fieldsAfterProductChange(current, imported);
  assert.equal(next.size, '');
  assert.equal(next.quantity, '');
  assert.equal(next.message, 'My revised requirements');
  assert.equal(next.destination, 'Canada');
});

test('brief analytics share only the fixed product identifier and obey existing consent gating', () => {
  const sensitive = { ...base, product_slug: base.product, email: 'buyer@example.com', message: 'private artwork', destination: 'private destination' };
  for (const event of ['quote_brief_start', 'quote_brief_continue']) {
    const payload = sanitizeEvent(event, sensitive, '/products/poly-mailers/');
    assert.deepEqual(Object.keys(payload).sort(), ['page_path', 'page_location', 'page_title', 'product_slug'].sort());
    assert.equal(payload.product_slug, 'poly-mailers');
  }
  const sent = [];
  let consent = false;
  const track = createTracker({ canSend: () => consent, getPath: () => '/products/poly-mailers/', send: (...args) => sent.push(args) });
  assert.equal(track('quote_brief_start', sensitive), false);
  consent = true;
  assert.equal(track('quote_brief_continue', sensitive), true);
  assert.equal(sent.length, 1);
  consent = false;
  assert.equal(track('quote_brief_continue', sensitive), false);
});
