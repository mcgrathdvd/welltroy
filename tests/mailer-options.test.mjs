import { test } from 'node:test';
import assert from 'node:assert/strict';
import { approximateInches } from '../src/mailer-options.mjs';
import { catalogueProducts } from '../src/product-data.mjs';

test('catalogue body and flap convert independently without changing source dimensions', () => {
  assert.equal(approximateInches('25 × 30 + 5 cm'), '9.84 × 11.81 + 1.97 in');
  assert.equal(approximateInches('11 × 13 + 4 cm'), '4.33 × 5.12 + 1.57 in');
  assert.equal(approximateInches('custom dimensions'), null);
  const mailers = catalogueProducts.filter(p => ['poly-mailers', 'poly-bubble-mailers', 'metallic-bubble-mailers'].includes(p.slug));
  assert.equal(mailers.flatMap(p => p.sizes).length, 37);
  for (const product of mailers) for (const [, size] of product.sizes) {
    const converted = approximateInches(size);
    assert.ok(converted, `${product.slug}: ${size}`);
    const cm = size.match(/[\d.]+/g).map(Number);
    const inches = converted.match(/[\d.]+/g).map(Number);
    inches.forEach((value, index) => assert.ok(Math.abs(value * 2.54 - cm[index]) < 0.013));
  }
});
