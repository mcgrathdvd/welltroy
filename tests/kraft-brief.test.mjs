import {test} from 'node:test';
import assert from 'node:assert/strict';
import {normalizeBrief,briefQuoteFields,saveBrief,readBrief,fieldsAfterProductChange} from '../src/quote-brief.mjs';
import {sanitizeEvent} from '../src/analytics-core.mjs';
import {selectionGuidance} from '../src/quote-options.mjs';
const product='yellow-kraft-bubble-mailers';
const memory=()=>{const data=new Map();return{getItem:key=>data.get(key)??null,setItem:(key,value)=>data.set(key,value),removeItem:key=>data.delete(key)};};

test('kraft requests cannot adopt a poly catalogue model or an unsupported fit calculation',()=>{
  for(const model of ['BM08','Exterior','__proto__']){
    const b=normalizeBrief({product,sizeMode:'catalogue',model,packedSize:'20 × 24 × 3 cm (packed width × length × thickness)',comparison:{unit:'cm',width:20,length:24,thickness:3,allowance:1,model}});
    assert.equal(b.sizeMode,'help');assert.equal(b.model,'');assert.equal(b.comparison,undefined);
    const fields=briefQuoteFields(b,{[product]:[['Exterior','Yellow kraft paper']]});
    assert.equal(fields.size,'Please help choose a size');assert.ok(!fields.message.includes('catalogue outer size'));assert.ok(!fields.message.includes('Outer-size comparison:'));
  }
  assert.equal(briefQuoteFields({product,sizeMode:'custom',customSize:'Usable inner 25 × 32 cm; please confirm flap'}).size,'Usable inner 25 × 32 cm; please confirm flap');
});

test('kraft paper, liner, photo and delivery requests arrive through the editable form contract',()=>{
  const b={product,sizeMode:'custom',customSize:'Usable inner 25 × 32 cm',packedSize:'Box 20 × 24 × 3 cm',material:'Please quote kraft paper weight and liner structure',innerSize:'Confirm clear opening',liner:'Please advise on cushioning',closure:'Peel-and-seal flap',packout:'Please quote pieces per carton',detailPhotos:true,printing:'one-color',sides:'one-side',quantity:'500 pieces',destination:'United States',postalCode:'10001',alternativeQuantities:'500 and 1,000 pieces',itemizedQuote:true,deliveryScope:'separate',sample:'existing',notes:'Keep the front logo requirement.'};
  const fields=briefQuoteFields(b);
  assert.equal(fields.product,product);assert.equal(fields.quantity,'500 pieces');assert.equal(fields.sample,'Existing product sample');assert.equal(fields.destination,'United States');
  for(const text of ['Packaging brief: Kraft Bubble Mailers',b.material,b.innerSize,b.liner,b.closure,b.packout,b.notes,b.postalCode,'kraft-paper exterior and bubble lining','Please itemize product amounts'])assert.ok(fields.message.includes(text),text);
  assert.ok(!fields.message.includes('outer film and lining'));
  assert.match(selectionGuidance(product).quantityHelp,/MOQ: 500 pieces/);
  const changed=fieldsAfterProductChange({...fields,product:'poly-mailers',message:'Buyer edit kept'},fields);
  assert.equal(changed.size,'');assert.equal(changed.quantity,'');assert.equal(changed.message,'Buyer edit kept');
});

test('kraft drafts are isolated, restored for 24 hours and exclude contact data from storage and analytics',()=>{
  const storage=memory();const draft={product,quantity:'500 pieces',innerSize:'Please confirm inner size',detailPhotos:true,email:'not-stored@example.com',files:['private.pdf']};
  assert.equal(saveBrief(storage,draft,100),true);const restored=readBrief(storage,product,101);
  assert.equal(restored.innerSize,draft.innerSize);assert.equal(restored.detailPhotos,true);assert.equal(restored.email,undefined);assert.equal(restored.files,undefined);
  assert.equal(readBrief(storage,'poly-bubble-mailers',101),null);assert.equal(readBrief(storage,product,100+24*3600000),null);
  const event=sanitizeEvent('quote_brief_continue',{product_slug:product,...draft},'/products/'+product+'/');
  assert.equal(event.product_slug,product);assert.deepEqual(Object.keys(event).sort(),['page_path','page_location','page_title','product_slug'].sort());
});

test('bounded kraft requests stay within the existing 5,000-character enquiry limit',()=>{
  const b={product,sizeMode:'custom',customSize:'s'.repeat(500),material:'m'.repeat(500),innerSize:'i'.repeat(500),liner:'l'.repeat(500),closure:'  Review\n closure  ',packout:'p'.repeat(500),goods:'g'.repeat(500),packedSize:'d'.repeat(500),destination:'c'.repeat(500),quantity:'q'.repeat(500),alternativeQuantities:'a'.repeat(500),postalCode:'z'.repeat(500),timing:'t'.repeat(500),notes:'n'.repeat(1000),detailPhotos:true,itemizedQuote:true};
  const normalized=normalizeBrief(b);assert.equal(normalized.innerSize.length,160);assert.equal(normalized.closure,'Review closure');assert.equal(normalized.postalCode.length,32);assert.ok(briefQuoteFields(b).message.length<=5000);
});
