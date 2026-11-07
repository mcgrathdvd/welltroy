import {test} from 'node:test';
import assert from 'node:assert/strict';
import {selectionGuidance} from '../src/quote-options.mjs';
import {briefQuoteFields, saveBrief, readBrief} from '../src/quote-brief.mjs';

test('core product guidance preserves optional enquiries while giving product-specific specification prompts', () => {
  for (const slug of ['poly-mailers','poly-bubble-mailers','zipper-bags','yellow-kraft-bubble-mailers']) {
    const guidance=selectionGuidance(slug);
    assert.equal(guidance.required,false);
    assert.match(guidance.quantityHelp,/MOQ: 500 pieces/);
    assert.match(guidance.quantityHelp,/size, color and design/);
  }
  assert.match(selectionGuidance('zipper-bags').help,/inner|outer mailer/);
  assert.match(selectionGuidance('zipper-bags').placeholder,/folded|Folded/);
  assert.match(selectionGuidance('poly-bubble-mailers').placeholder,/measurement method/);
  assert.equal(selectionGuidance('multiple-products').required,true);
  assert.equal(selectionGuidance('not-sure').required,true);
  assert.match(selectionGuidance('honeycomb-paper-rolls').quantityHelp,/1 roll/);
});

test('garment options survive the product draft and arrive as editable enquiry requests without contact data', () => {
  const data=new Map();
  const storage={getItem:key=>data.get(key)??null,setItem:(key,value)=>data.set(key,value),removeItem:key=>data.delete(key)};
  const brief={product:'zipper-bags',sizeMode:'help',appearance:'Compare frosted and clear samples',closure:'Slider zipper',material:'PE — please advise on single-wall thickness',packedSize:'25 x 30 x 4 cm',quantity:'500 pieces',destination:'United States',notes:'Check barcode visibility with the folded garment.',email:'not-stored@example.com'};
  assert.equal(saveBrief(storage,brief,100),true);
  const saved=readBrief(storage,'zipper-bags',101);
  assert.equal(saved.appearance,brief.appearance);
  assert.equal(saved.closure,brief.closure);
  assert.equal(saved.material,brief.material);
  assert.equal(Object.hasOwn(saved,'email'),false);
  const fields=briefQuoteFields(saved);
  assert.equal(fields.product,'zipper-bags');
  assert.equal(fields.quantity,'500 pieces');
  for(const value of [brief.appearance,brief.closure,brief.material,brief.packedSize,brief.notes]) assert.ok(fields.message.includes(value));
  assert.match(fields.message,/Please confirm current availability/);
  assert.ok(!fields.message.includes(brief.email));
});
