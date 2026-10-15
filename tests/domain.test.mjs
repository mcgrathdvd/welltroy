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
