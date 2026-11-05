import {test} from 'node:test';
import assert from 'node:assert/strict';
import {normalizeBrief,briefQuoteFields,saveBrief,readBrief,itemizedQuoteRequest} from '../src/quote-brief.mjs';
import {products} from '../src/product-data.mjs';
import {sanitizeEvent} from '../src/analytics-core.mjs';
const catalogue=Object.fromEntries(products.map(p=>[p.slug,p.sizes]));
const base={product:'poly-mailers',sizeMode:'catalogue',model:'P03',quantity:'1,000 pieces',destination:'United States',alternativeQuantities:'500, 1,000 and 3,000 pieces',postalCode:'10001',deliveryScope:'separate',itemizedQuote:'yes',notes:'Keep our artwork placement request.'};
test('alternative quantities and destination cost questions reach every supported product enquiry without replacing the main quantity',()=>{
 for(const [product,model] of [['poly-mailers','P03'],['poly-bubble-mailers','BM02'],['zipper-bags','Z04'],['metallic-bubble-mailers','MB06']]){
  const f=briefQuoteFields({...base,product,model},catalogue);
  assert.equal(f.quantity,base.quantity);assert.equal(f.destination,base.destination);assert.ok(f.size.startsWith(model));
  for(const text of [base.alternativeQuantities,'Destination ZIP / postal code: 10001','Show bag price and shipping separately',itemizedQuoteRequest,base.notes])assert.ok(f.message.includes(text));
 }
});
test('legacy drafts have no additional requests and invalid delivery options do not become an offer',()=>{
 const b=normalizeBrief({product:'poly-mailers'});
 assert.equal(b.deliveryScope,'not-sure');assert.equal(b.itemizedQuote,false);assert.equal(b.postalCode,'');
 const f=briefQuoteFields({...base,deliveryScope:'guaranteed-free-shipping',itemizedQuote:'false',postalCode:'',alternativeQuantities:''},catalogue);
 for(const text of ['guaranteed-free-shipping',itemizedQuoteRequest,'Requested delivery quote scope:','Destination ZIP / postal code:','Alternative quantities to compare'])assert.ok(!f.message.includes(text));
});
test('quotation preferences and checkbox survive scoped restoration and can be removed without deleting notes',()=>{
 const data=new Map();const store={getItem:k=>data.get(k),setItem:(k,v)=>data.set(k,v),removeItem:k=>data.delete(k)};
 assert.equal(saveBrief(store,base,100),true);const saved=readBrief(store,base.product,101);
 assert.equal(saved.itemizedQuote,true);assert.equal(saved.postalCode,base.postalCode);assert.equal(saved.alternativeQuantities,base.alternativeQuantities);assert.equal(readBrief(store,'zipper-bags',101),null);
 const f=briefQuoteFields({...saved,itemizedQuote:false},catalogue);assert.ok(!f.message.includes(itemizedQuoteRequest));assert.ok(f.message.includes(base.notes));
});
test('quotation text is bounded and a long valid brief remains within the final enquiry limit',()=>{
 const large={...base,sizeMode:'custom',customSize:'c'.repeat(200),packedSize:'p'.repeat(200),goods:'g'.repeat(200),material:'m'.repeat(200),quantity:'q'.repeat(200),destination:'d'.repeat(200),timing:'t'.repeat(200),notes:'n'.repeat(900),alternativeQuantities:'a'.repeat(200),postalCode:'z'.repeat(100),innerSize:'i'.repeat(200),closure:'c'.repeat(200),liner:'l'.repeat(200),appearance:'a'.repeat(200),packout:'p'.repeat(200),detailPhotos:true,finish:'holographic',finishReference:'r'.repeat(200)};
 for(const product of ['poly-mailers','poly-bubble-mailers','zipper-bags','metallic-bubble-mailers'])assert.ok(briefQuoteFields({...large,product},catalogue).message.length<=5000);
 const clean=normalizeBrief({...base,alternativeQuantities:'  500\n and 1000  ',postalCode:'  AB1\n 2CD  '});
 assert.equal(clean.alternativeQuantities,'500 and 1000');assert.equal(clean.postalCode,'AB1 2CD');
 assert.equal(normalizeBrief(large).alternativeQuantities.length,100);assert.equal(normalizeBrief(large).postalCode.length,32);
});
test('postal code, alternative quantities and delivery questions never enter the existing analytics payload',()=>{
 const event=sanitizeEvent('quote_brief_continue',{...base,product_slug:base.product},'/products/poly-mailers/');
 assert.deepEqual(Object.keys(event).sort(),['page_path','page_location','page_title','product_slug'].sort());
});
