import {test} from 'node:test';
import assert from 'node:assert/strict';
import {campaignInfo,campaignForVisit,clearCampaign} from '../src/campaigns.mjs';
import {sanitizeEvent,createTracker} from '../src/analytics-core.mjs';
import {catalogueModels} from '../src/catalogue-models.mjs';
import {catalogueProducts} from '../src/product-data.mjs';

const landing = '?utm_source=google&utm_medium=cpc&utm_campaign=poly-mailers';
const expected = {campaign_source:'google',campaign_medium:'cpc',campaign_name:'poly-mailers'};
function memory() {
  const items=new Map();
  return {getItem:k=>items.get(k),setItem:(k,v)=>items.set(k,v),removeItem:k=>items.delete(k),items};
}

test('only registered public campaign fields survive; no raw query or free-text fields',()=>{
  assert.deepEqual(campaignInfo(landing+'&email=buyer@example.com&utm_term=private&utm_content=logo.ai&gclid=private'),expected);
  for(const query of [
    '?utm_source=buyer@example.com&utm_medium=email&utm_campaign=samples',
    '?utm_source=newsletter&utm_medium=email&utm_campaign=alice-smith',
    landing+'&utm_source=buyer@example.com',
    '?utm_source=google&utm_medium=cpc&utm_campaign=poly-mailers%0Aprivate',
    '?utm_source=google&utm_medium=cpc',
    '?utm_source=GOOGLE&utm_medium=cpc&utm_campaign=poly-mailers'
  ]) assert.deepEqual(campaignInfo(query),{});
});

test('consented campaign persists across internal navigation, expires and is removed on withdrawal',()=>{
  const storage=memory();
  assert.deepEqual(campaignForVisit(landing,storage,{now:100}),expected);
  assert.deepEqual(campaignForVisit('',storage,{now:101,referrer:'https://welltroy.com/products/poly-mailers/'}),expected);
  assert.deepEqual(campaignForVisit('',storage,{now:100+30*60*1000}),{});
  campaignForVisit(landing,storage,{now:100});clearCampaign(storage);
  assert.equal(storage.items.size,0);
});

test('new external visits or unrecognised explicit campaigns cannot inherit an old campaign',()=>{
  for(const input of [{referrer:'https://www.google.com/search'}, {search:'?utm_source=private&email=buyer@example.com'}]) {
    const storage=memory();campaignForVisit(landing,storage,{now:100});
    assert.deepEqual(campaignForVisit(input.search || '',storage,{now:101,referrer:input.referrer || ''}),{});
    assert.equal(storage.items.size,0);
  }
});

test('tampered, future-dated and blocked campaign storage do not expose free text or break navigation',()=>{
  const storage=memory();
  for(const saved of [
    {campaign:{...expected,campaign_name:'buyer@example.com'},expires:200},
    {campaign:expected,expires:99999999999},
    {campaign:expected,expires:'tomorrow'}
  ]) {
    storage.setItem('welltroy-public-campaign-v1',JSON.stringify(saved));
    assert.deepEqual(campaignForVisit('',storage,{now:100}),{});
  }
  const blocked={getItem(){throw Error();},setItem(){throw Error();},removeItem(){throw Error();}};
  assert.deepEqual(campaignForVisit(landing,blocked),expected);
  assert.deepEqual(campaignForVisit('',blocked),{});
  assert.doesNotThrow(()=>clearCampaign(blocked));
});

test('catalogue telemetry accepts only actual product-model pairs',()=>{
  assert.deepEqual(catalogueModels,Object.fromEntries(catalogueProducts.map(p=>[p.slug,p.sizes.map(([model])=>model)])));
  for(const p of catalogueProducts) for(const [model] of p.sizes) {
    const event=sanitizeEvent('select_size',{product_slug:p.slug,model,message:'private'},`/products/${p.slug}/`);
    assert.equal(event.model,model);assert.equal(event.message,undefined);
  }
  assert.equal(sanitizeEvent('select_size',{product_slug:'poly-mailers',model:'BPM01'},'/products/poly-mailers/'),null);
  assert.equal(sanitizeEvent('select_size',{product_slug:'poly-mailers',model:'buyer@example.com'},'/products/poly-mailers/'),null);
  for(const slug of ['__proto__','constructor','toString']) assert.equal(sanitizeEvent('select_size',{product_slug:slug,model:'P03'},'/products/poly-mailers/'),null);
});

test('new funnel events filter arbitrary data and retain only bounded public categories',()=>{
  const click=sanitizeEvent('quote_cta_click',{product_slug:'poly-mailers',placement:'product-hero',email:'private'},'/products/poly-mailers/','Poly Mailers | Custom Packaging | Welltroy');
  assert.equal(click.placement,'product-hero');assert.equal(click.email,undefined);assert.equal(click.page_title,'Poly Mailers | Custom Packaging | Welltroy');
  assert.equal(sanitizeEvent('quote_cta_click',{placement:'buyer@example.com'},'/').placement,'content');
  assert.equal(sanitizeEvent('page_view',{},'/','buyer@example.com').page_title,'Welltroy');
  assert.equal(sanitizeEvent('download_catalogue',{document:'private-file.ai'},'/'),null);
  assert.equal(sanitizeEvent('sample_interest',{sample_type:'private'},'/quote/'),null);
  assert.equal(sanitizeEvent('sample_interest',{sample_type:'custom',product_slug:'poly-mailers'},'/quote/').sample_type,'custom');
});

test('new events do not bypass consent or provider-error isolation',()=>{
  let sent=0;
  const track=createTracker({canSend:()=>false,getPath:()=>'/products/poly-mailers/',send:()=>sent++});
  for(const name of ['quote_cta_click','select_size','download_catalogue','sample_interest']) assert.equal(track(name,{product_slug:'poly-mailers',model:'P03',document:'2025-pdf',sample_type:'custom'}),false);
  assert.equal(sent,0);
});
