import {test} from 'node:test';
import assert from 'node:assert/strict';
import {normalizeDocumentRequest,documentRequestReady,documentRequestText,documentQuoteFields,saveDocumentRequest,readDocumentRequest,clearDocumentRequest} from '../src/document-request.mjs';
import {fieldsAfterProductChange,quoteFieldsAreEmpty} from '../src/quote-brief.mjs';
import {sanitizeEvent} from '../src/analytics-core.mjs';
const base={product:'zipper-bags',categories:['material','inspection'],requirement:'Confirm the material and inspection record for our proposed frosted slider bag.',destination:'United States',intendedUse:'Inner packaging for folded clothing'};
const memory=()=>{const data=new Map();return {data,getItem:key=>data.get(key)??null,setItem:(key,value)=>data.set(key,value),removeItem:key=>data.delete(key)};};

test('document requests reject unknown products and filter categories while bounding scope text',()=>{
 assert.equal(normalizeDocumentRequest({...base,product:'__proto__'}),null);
 assert.equal(normalizeDocumentRequest({...base,product:'unknown-bag'}),null);
 const request=normalizeDocumentRequest({...base,categories:['material','unknown','material','__proto__'],requirement:'x'.repeat(900),size:' A\nB\u0000 ',email:'private@example.com',files:['private.pdf']});
 assert.deepEqual(request.categories,['material']);assert.equal(request.requirement.length,600);assert.equal(request.size,'A B');
 assert.equal(Object.hasOwn(request,'email'),false);assert.equal(Object.hasOwn(request,'files'),false);
 assert.ok(documentRequestText(request).length<5000);
});
test('a category or a described requirement can start a request without inventing a chosen product or quantity',()=>{
 assert.equal(documentRequestReady({product:'not-sure'}),false);
 assert.equal(documentQuoteFields({product:'not-sure'}),null);
 const fields=documentQuoteFields({product:'not-sure',categories:['advice']});
 assert.equal(fields.product,'not-sure');assert.equal(fields.quantity,'Not sure yet');assert.equal(fields.destination,'');
 assert.ok(fields.message.includes('not confirmation that a document is available'));
 assert.ok(documentRequestReady({product:'poly-mailers',requirement:'Please advise on film evidence.'}));
});
test('selected document categories and scope reach the existing editable quote field contract',()=>{
 const fields=documentQuoteFields({...base,size:'Z08 — please confirm usable space',quantity:'500 pieces'});
 assert.deepEqual(Object.keys(fields).sort(),['destination','message','product','quantity','sample','size']);
 assert.equal(fields.product,'zipper-bags');assert.equal(fields.quantity,'500 pieces');
 for(const text of ['Material or specification confirmation','Sample or order inspection record',base.requirement,base.intendedUse,base.destination])assert.ok(fields.message.includes(text));
 assert.equal(quoteFieldsAreEmpty({quantity:'',size:'',destination:'',sample:'',message:''}),true);
 assert.equal(quoteFieldsAreEmpty({...fields,message:'Existing buyer edit'}),false);
});
test('product changes clear only unchanged imported specifications and preserve buyer edits',()=>{
 const imported=documentQuoteFields(base);
 const current={...imported,message:'My edited requirement',size:'My edited size'};
 const changed=fieldsAfterProductChange(current,imported);
 assert.equal(changed.message,current.message);assert.equal(changed.size,current.size);assert.equal(changed.destination,'');assert.equal(changed.quantity,'');
 assert.equal(Object.hasOwn(changed,'product'),false);
});
test('request drafts survive return navigation and are cleared when expired or explicitly removed',()=>{
 const storage=memory();assert.equal(saveDocumentRequest(storage,base,100),true);
 assert.deepEqual(readDocumentRequest(storage,101),normalizeDocumentRequest(base));
 assert.equal(readDocumentRequest(storage,100+24*60*60*1000),null);assert.equal(storage.data.size,0);
 saveDocumentRequest(storage,base,200);clearDocumentRequest(storage);assert.equal(readDocumentRequest(storage,201),null);
 assert.equal(saveDocumentRequest(null,base),false);assert.equal(readDocumentRequest(null),null);
});
test('tampered, corrupt and future-version records do not populate an enquiry',()=>{
 for(const record of ['{broken',JSON.stringify({version:2,expires:200,request:base}),JSON.stringify({version:1,expires:Infinity,request:base}),JSON.stringify({version:1,expires:1e15,request:base}),JSON.stringify({version:1,expires:200,request:{...base,product:'__proto__'}})]){
  const storage=memory();storage.setItem('welltroy-document-request-v1',record);assert.equal(readDocumentRequest(storage,101),null);assert.equal(storage.data.size,0);
 }
});
test('document requirements and categories never become custom analytics payload fields',()=>{
 const event=sanitizeEvent('quote_brief_continue',{product_slug:'zipper-bags',requirement:base.requirement,categories:base.categories,email:'private@example.com'},'/materials-and-documents/');
 assert.equal(event.product_slug,'zipper-bags');
 for(const key of ['requirement','categories','email','destination'])assert.equal(Object.hasOwn(event,key),false);
});
