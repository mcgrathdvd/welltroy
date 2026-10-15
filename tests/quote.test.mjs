import { test } from 'node:test';
import assert from 'node:assert/strict';
import nodemailer from 'nodemailer';
import { onRequest } from '../functions/api/quote.js';

// Local contract tests: no SMTP connection, CAPTCHA solving or production request.
const env = { SMTP_USER:'test@example.com', SMTP_PASSWORD:'local-test', TURNSTILE_SITE_KEY:'test', TURNSTILE_SECRET_KEY:'local-test' };
const valid = { name:'QA', email:'qa@example.com', product:'poly-mailers', quantity:'500 pieces', destination:'Test destination', 'cf-turnstile-response':'test-token' };
const url = 'https://welltroy.example/api/quote';
function request(body = valid, origin = 'https://welltroy.example') {
 return new Request(url,{method:'POST',headers:{Origin:origin,'Content-Type':'application/json'},body:JSON.stringify(body)});
}
test('quote delivery and validation contract',async t=>{
 let messages=[], verify={success:true,hostname:'welltroy.example',action:'quote'}, mailError=false;
 const originalFetch=globalThis.fetch, originalTransport=nodemailer.createTransport;
 globalThis.fetch=async()=>Response.json(verify);
 nodemailer.createTransport=()=>({sendMail:async message=>{if(mailError)throw new Error('Simulated SMTP failure');messages.push(message);return {accepted:['info@welltroy.com']};},close(){}});
 try {
  await t.test('availability does not claim delivery and never exposes server secrets',async()=>{
   const response=await onRequest({request:new Request(url),env});const data=await response.json();
   assert.deepEqual(data,{ready:true,siteKey:'test'});assert.equal(messages.length,0);
  });
  await t.test('missing server configuration fails closed',async()=>{assert.equal((await onRequest({request:request(),env:{}})).status,503)});
  await t.test('cross-origin request is rejected before sending',async()=>{assert.equal((await onRequest({request:request(valid,'https://other.example'),env})).status,403);assert.equal(messages.length,0)});
  await t.test('missing security token does not send',async()=>{assert.equal((await onRequest({request:request({...valid,'cf-turnstile-response':''}),env})).status,400);assert.equal(messages.length,0)});
  await t.test('invalid verification host does not send',async()=>{verify.hostname='other.example';assert.equal((await onRequest({request:request(),env})).status,403);assert.equal(messages.length,0);verify.hostname='welltroy.example'});
  await t.test('assisted enquiry needs description',async()=>{assert.equal((await onRequest({request:request({...valid,product:'multiple-products'}),env})).status,400)});
  await t.test('valid enquiry delivers selected model and reply address',async()=>{
   const response=await onRequest({request:request({...valid,size:'P03 — 25 × 30 + 5 cm'}),env});const data=await response.json();
   assert.equal(response.status,200);assert.equal(data.ok,true);assert.ok(data.reference);
   assert.equal(messages.at(-1).replyTo,'qa@example.com');assert.match(messages.at(-1).text,/P03 — 25 × 30 \+ 5 cm/);
  });
  await t.test('multipart attachment bytes and name reach mail transport',async()=>{
   const form=new FormData();Object.entries(valid).forEach(([key,value])=>form.set(key,value));form.append('files',new File(['QA artwork notes'],'notes.txt',{type:'text/plain'}));
   const response=await onRequest({request:new Request(url,{method:'POST',headers:{Origin:'https://welltroy.example'},body:form}),env});
   assert.equal(response.status,200);assert.equal(messages.at(-1).attachments[0].content.toString(),'QA artwork notes');assert.equal(messages.at(-1).attachments[0].filename,'notes.txt');
  });
  await t.test('SMTP failure does not show a false success',async()=>{mailError=true;const response=await onRequest({request:request(),env});assert.equal(response.status,502);assert.equal((await response.json()).ok,false)});
 } finally {globalThis.fetch=originalFetch;nodemailer.createTransport=originalTransport}
});
