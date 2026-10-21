import {test} from 'node:test';
import assert from 'node:assert/strict';
import {onRequest} from '../functions/_middleware.js';

const request = (url, upstream, method = 'GET') => onRequest({
  request:new Request(url, {method}), next:async()=>upstream
});

test('HTML security policy preserves streaming response, cache and verification compatibility',async()=>{
  const original = new Response('<h1>Packaging</h1>', {status:200, headers:{
    'Content-Type':'text/html; charset=utf-8', 'Cache-Control':'public, max-age=0, must-revalidate', ETag:'"build-1"'
  }});
  const response = await request('https://welltroy.com/quote/', original);
  assert.equal(await response.text(), '<h1>Packaging</h1>');
  assert.equal(response.status, 200);
  assert.equal(response.headers.get('ETag'), '"build-1"');
  assert.equal(response.headers.get('Cache-Control'), 'public, max-age=0, must-revalidate');
  assert.equal(original.headers.get('X-Frame-Options'), null);
  assert.equal(response.headers.get('X-Frame-Options'), 'DENY');
  assert.equal(response.headers.get('Content-Security-Policy'), "frame-ancestors 'none'; object-src 'none'; base-uri 'self'; form-action 'self'");
  assert.equal(response.headers.get('Strict-Transport-Security'), 'max-age=15768000');
  assert.equal(response.headers.get('X-Robots-Tag'), null);
});

test('API errors and availability retain JSON, status and no-store; assets retain immutable caching',async()=>{
  for (const status of [200,403,413,502,503]) {
    const response = await request('https://welltroy.com/api/quote', Response.json({ok:false},{status,headers:{'Cache-Control':'no-store'}}));
    assert.equal(response.status, status);
    assert.equal(response.headers.get('Cache-Control'), 'no-store');
    assert.equal(response.headers.get('X-Content-Type-Options'), 'nosniff');
    assert.equal(response.headers.get('Content-Security-Policy'), null);
    assert.deepEqual(await response.json(), {ok:false});
  }
  const response = await request('https://welltroy.com/_astro/image.hash.webp', new Response('bytes',{headers:{'Content-Type':'image/webp','Cache-Control':'public, max-age=31536000, immutable'}}));
  assert.equal(response.headers.get('Cache-Control'), 'public, max-age=31536000, immutable');
  assert.equal(response.headers.get('X-Frame-Options'), null);
});

test('only project previews receive noindex, and HSTS is limited to production HTTPS hosts',async()=>{
  for (const host of ['welltroy.pages.dev','release-123.welltroy.pages.dev']) {
    const response = await request(`https://${host}/products/`, new Response('preview'));
    assert.equal(response.headers.get('X-Robots-Tag'), 'noindex, nofollow');
    assert.equal(response.headers.get('Strict-Transport-Security'), null);
  }
  for (const url of ['http://localhost/','http://welltroy.com/','https://unrelated.example/']) {
    const response = await request(url, new Response('test'));
    assert.equal(response.headers.get('X-Robots-Tag'), null);
    assert.equal(response.headers.get('Strict-Transport-Security'), null);
  }
});

test('existing CSP remains enforced, and HTML 404 retains its status',async()=>{
  const response = await request('https://welltroy.com/missing/', new Response('Missing',{status:404, headers:{'Content-Type':'text/html','Content-Security-Policy':"img-src 'self'"}}));
  assert.equal(response.status,404);
  assert.equal(response.headers.get('Content-Security-Policy'), "img-src 'self', frame-ancestors 'none'; object-src 'none'; base-uri 'self'; form-action 'self'");
});

test('immutable www and legacy redirects retain targets, queries and method semantics',async()=>{
  for (const [url,method,status,target] of [
    ['https://www.welltroy.com/quote/?product=poly-mailers','POST',308,'https://welltroy.com/quote/?product=poly-mailers'],
    ['https://www.welltroy.com/quote/?product=poly-mailers','GET',301,'https://welltroy.com/quote/?product=poly-mailers'],
    ['https://welltroy.com/product-category/mailer-shipping-bags/?ref=guide','GET',301,'https://welltroy.com/products/?ref=guide#group-1']
  ]) {
    const response = await request(url, null, method);
    assert.equal(response.status,status);
    assert.equal(response.headers.get('Location'),target);
    assert.equal(response.headers.get('Strict-Transport-Security'),'max-age=15768000');
  }
});
