import {test} from 'node:test';
import assert from 'node:assert/strict';
import {onRequest} from '../functions/_middleware.js';
test('www redirects to HTTPS apex and preserves path and query',async()=>{
 const response=await onRequest({request:new Request('https://www.welltroy.com/quote/?product=poly-mailers&size=P03'),next(){throw new Error('Must redirect')}});
 assert.equal(response.status,301);
 assert.equal(response.headers.get('location'),'https://welltroy.com/quote/?product=poly-mailers&size=P03');
});
test('apex and preview hosts continue to their original routes',async()=>{
 for(const host of ['welltroy.com','welltroy.pages.dev','localhost']){
  const response=await onRequest({request:new Request(`https://${host}/quote/`),next:()=>new Response('static content')});
  assert.equal(await response.text(),'static content');
 }
});

test('retired catalogue and company pages redirect once to their matching current content',async()=>{
 const routes = {
  '/product-catelog':'/catalogue/',
  '/web-agency-gb-contact-us':'/about/#contact',
  '/web-agency-gb-about-us':'/about/'
 };
 for(const [path,destination] of Object.entries(routes)){
  for(const host of ['welltroy.com','www.welltroy.com']){
   for(const suffix of ['', '/']){
    for(const method of ['GET','HEAD']){
     const response=await onRequest({request:new Request(`https://${host}${path}${suffix}?utm_source=old-link`,{method}),next(){throw new Error('Expected direct redirect');}});
     const target=new URL(destination,'https://welltroy.com');target.search='?utm_source=old-link';
     assert.equal(response.status,301);
     assert.equal(response.headers.get('location'),target.href);
     assert.equal(response.headers.get('strict-transport-security'),'max-age=15768000');
    }
   }
  }
 }
});

test('unknown legacy products, similar paths and POST requests are not redirected to unrelated content',async()=>{
 for(const [path,method] of [['/product/double-tape-kraft-paper-envelope-bag/','GET'],['/product-catelog-extra/','GET'],['/web-agency-gb-contact-us/','POST']]){
  const response=await onRequest({request:new Request(`https://welltroy.com${path}`,{method}),next:()=>new Response('original route',{status:404})});
  assert.equal(response.status,404);assert.equal(await response.text(),'original route');
 }
});
