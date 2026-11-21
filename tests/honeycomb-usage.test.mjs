import test from 'node:test';
import assert from 'node:assert/strict';
import { calculateHoneycombUsage as plan } from '../src/honeycomb-usage.mjs';
import { honeycombQuoteQuantity } from '../src/quote-options.mjs';

const inputs = { rollMetres: 50, drawCentimetres: 80, allowancePercent: 0, packs: 125 };

test('only valid whole roll estimates can prefill a honeycomb paper quote', () => {
  const product = 'honeycomb-paper-rolls';
  assert.equal(honeycombQuoteQuantity(product, '1'), '1 roll');
  assert.equal(honeycombQuoteQuantity(product, '3'), '3 rolls');
  assert.equal(honeycombQuoteQuantity(product, '10000000'), '10000000 rolls');
  for (const bad of [null, '', '0', '-1', '1.5', '001', '10000001', '3 rolls', '1e2']) {
    assert.equal(honeycombQuoteQuantity(product, bad), '');
  }
  assert.equal(honeycombQuoteQuantity('kraft-padded-mailers', '3'), '');
});

test('does not pool leftover cuts across rolls', () => {
  assert.deepEqual(plan(inputs), { allowedDrawCentimetres: 80, packsPerRoll: 62, rollsNeeded: 3 });
  assert.equal(plan({ ...inputs, packs: 124 }).rollsNeeded, 2);
});

test('adds the allowance to measured consumption', () => {
  assert.deepEqual(plan({ ...inputs, allowancePercent: 10, packs: 120 }), { allowedDrawCentimetres: 88, packsPerRoll: 56, rollsNeeded: 3 });
  assert.equal(plan({ ...inputs, allowancePercent: 100 }).packsPerRoll, 31);
});

test('preserves whole-pack boundaries with decimal input', () => {
  assert.equal(plan({ rollMetres: .3, drawCentimetres: 10, allowancePercent: 0, packs: 3 }).packsPerRoll, 3);
  assert.equal(plan({ rollMetres: .3, drawCentimetres: 20, allowancePercent: 50, packs: 1 }).rollsNeeded, 1);
});

test('rejects invalid inputs and a roll too short for one complete pack', () => {
  for (const invalid of [{rollMetres:0},{rollMetres:Infinity},{drawCentimetres:-1},{drawCentimetres:NaN},{allowancePercent:-1},{allowancePercent:101},{packs:0},{packs:1.5},{packs:10000001},{rollMetres:.1}]) assert.throws(() => plan({...inputs,...invalid}), RangeError);
});

test('plans enough capacity with the minimum whole-roll count across 450 scenarios', () => {
  for (const length of [1,30,50,100,250]) for (const draw of [10,33,80]) for (const extra of [0,5,10,25,100]) for (const packs of [1,56,62,124,125,1000]) {
    if (draw*(1+extra/100)>length*100) {
      assert.throws(() => plan({rollMetres:length,drawCentimetres:draw,allowancePercent:extra,packs}), RangeError);
      continue;
    }
    const result=plan({rollMetres:length,drawCentimetres:draw,allowancePercent:extra,packs});
    assert.ok(result.rollsNeeded*result.packsPerRoll>=packs);
    assert.ok((result.rollsNeeded-1)*result.packsPerRoll<packs);
    assert.ok(result.packsPerRoll*result.allowedDrawCentimetres<=length*100+1e-8);
  }
});
