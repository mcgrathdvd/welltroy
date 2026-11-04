import {test} from 'node:test';
import assert from 'node:assert/strict';
import {normalizeBrief, briefQuoteFields, saveBrief, readBrief} from '../src/quote-brief.mjs';
import {products} from '../src/product-data.mjs';
import {sanitizeEvent} from '../src/analytics-core.mjs';
const catalogue=Object.fromEntries(products.map(p=>[p.slug,p.sizes]));
const base={product:'metallic-bubble-mailers',sizeMode:'catalogue',model:'MB06',finish:'holographic',finishReference:'Rainbow effect; confirm label and logo on sample',sample:'custom',notes:'Keep our logo placement'};
test('metallic catalogue model, finish and sample requirements reach the editable enquiry',()=>{
 const f=briefQuoteFields(base,catalogue);
 assert.equal(f.size,'MB06 — 20 × 28 + 4 cm (catalogue outer size)');
 for(const text of ['Requested surface effect: Holographic finish',base.finishReference,base.notes,'Custom printed sample'])assert.ok(f.message.includes(text));
 assert.equal(catalogue[base.product].length,9);
});
test('finish choices stay requests and unknown choices cannot claim available effects',()=>{
 assert.equal(normalizeBrief({...base,finish:'guaranteed-custom-effect'}).finish,'not-sure');
 assert.ok(briefQuoteFields({...base,finish:'compare'},catalogue).message.includes('Compare metallic and holographic samples'));
 assert.equal(normalizeBrief({...base,model:'BM06'}).model,'');
 assert.ok(briefQuoteFields({...base,sizeMode:'custom',customSize:'Outer 8 × 10 + 1.5 in'},catalogue).size.includes('8 × 10'));
});
test('metallic draft restoration preserves finish and leaves other product drafts separate',()=>{
 const data=new Map();const store={getItem:k=>data.get(k),setItem:(k,v)=>data.set(k,v),removeItem:k=>data.delete(k)};
 assert.equal(saveBrief(store,base,100),true);
 assert.equal(readBrief(store,base.product,101).finishReference,base.finishReference);
 assert.equal(readBrief(store,'poly-mailers',101),null);
 assert.equal(normalizeBrief({...base,product:'poly-mailers',model:'P03'}).finish,undefined);
});
test('finish references are bounded and do not enter analytics',()=>{
 assert.equal(normalizeBrief({...base,finishReference:'x'.repeat(300)}).finishReference.length,160);
 const payload=sanitizeEvent('quote_brief_continue',{product_slug:base.product,finish:base.finish,finishReference:base.finishReference},'/products/metallic-bubble-mailers/');
 assert.equal(payload.product_slug,base.product);assert.equal(payload.finishReference,undefined);assert.equal(payload.finish,undefined);
 assert.ok(briefQuoteFields({...base,finishReference:'x'.repeat(300),notes:'n'.repeat(900)},catalogue).message.length<=5000);
});
