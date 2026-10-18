import {test} from 'node:test';
import assert from 'node:assert/strict';
import {createTracker,sanitizeEvent,safePath,confirmedQuote,errorCategory,readChoice,saveChoice,sourceInfo,productSlugs} from '../src/analytics-core.mjs';
import {products} from '../src/product-data.mjs';

test('product allowlist matches all actual catalogue pages',()=>{
  assert.deepEqual([...productSlugs].sort(),products.map(p=>p.slug).sort());
});
test('events discard arbitrary personal data, query strings, fragments and enquiry references',()=>{
  const data=sanitizeEvent('quote_submit_success',{product_slug:'poly-mailers',email:'buyer@example.com',phone:'123',message:'private',files:['logo.ai'],reference:'internal-id',page_location:'https://evil.invalid/?email=buyer'},'/quote/?email=buyer@example.com#secret');
  assert.deepEqual(data,{page_path:'/quote/',page_location:'https://welltroy.com/quote/',page_title:'Welltroy',product_slug:'poly-mailers'});
});
test('unrecognised events, paths and product identifiers never enter analytics',()=>{
  assert.equal(sanitizeEvent('upload_personal_file',{},'/quote/'),null);
  assert.equal(sanitizeEvent('page_view',{},'/customer/buyer@example.com/'),null);
  assert.equal(sanitizeEvent('view_product',{product_slug:'buyer@example.com'},'/products/poly-mailers/'),null);
  assert.equal(sanitizeEvent('quote_start',{product_slug:'buyer@example.com'},'/quote/').product_slug,'unknown');
  assert.equal(safePath('/quote/?token=secret'),'/quote/');
});
test('no consent means no provider call; withdrawal immediately blocks later events',()=>{
 let granted=false;const events=[];
 const track=createTracker({canSend:()=>granted,send:(...args)=>events.push(args),getPath:()=>'/quote/'});
 assert.equal(track('quote_start'),false);assert.equal(events.length,0);
 granted=true;assert.equal(track('quote_start'),true);assert.equal(events.length,1);
 granted=false;assert.equal(track('quote_submit_success'),false);assert.equal(events.length,1);
});
test('provider exceptions are contained and do not propagate into the form',()=>{
 const track=createTracker({canSend:()=>true,send:()=>{throw Error('blocked provider');},getPath:()=>'/quote/'});
 assert.doesNotThrow(()=>assert.equal(track('quote_submit_success'),false));
});
test('success requires HTTP success, exact ok=true and a bounded nonempty server reference',()=>{
 assert.equal(confirmedQuote({ok:true},{ok:true,reference:'abc123'}),true);
 for(const result of [{ok:false,reference:'abc'},{ok:1,reference:'abc'},{ok:true},{ok:true,reference:''},{ok:true,reference:'x'.repeat(101)}])assert.equal(confirmedQuote({ok:true},result),false);
 assert.equal(confirmedQuote({ok:false},{ok:true,reference:'abc123'}),false);
 assert.equal(confirmedQuote({ok:true},{ready:true}),false);
});
test('errors use categories without raw service messages',()=>{
 assert.equal(errorCategory(403),'request_rejected');assert.equal(errorCategory(503),'service_unavailable');
 assert.equal(errorCategory(502),'delivery_unconfirmed');assert.equal(errorCategory(undefined),'delivery_unconfirmed');
 assert.equal(sanitizeEvent('quote_submit_error',{error_category:'SMTP private details'},'/quote/').error_category,'delivery_unconfirmed');
});
test('no stored choice defaults to unknown; choices expire and storage errors do not grant consent',()=>{
 let stored=null;const storage={getItem:()=>stored,setItem:(k,v)=>{stored=v;}};
 assert.equal(readChoice(storage,100),'unknown');saveChoice(storage,'granted',100);
 assert.equal(readChoice(storage,101),'granted');assert.equal(readChoice(storage,181*86400000),'unknown');
 assert.equal(readChoice({getItem(){throw Error();}}),'unknown');
 assert.doesNotThrow(()=>saveChoice({setItem(){throw Error();}},'denied'));
});
test('referrers lose search terms; arbitrary private referrer paths and hosts are withheld',()=>{
 assert.deepEqual(sourceInfo('https://www.google.com/search?q=buyer@example.com','https://welltroy.com'),{entry_source:'organic_search',page_referrer:'https://www.google.com'});
 assert.deepEqual(sourceInfo('https://private.example/client/buyer?token=secret','https://welltroy.com'),{entry_source:'referral',page_referrer:''});
 assert.equal(sourceInfo('https://google.com.evil.invalid/search','https://welltroy.com').entry_source,'referral');
});

async function environment({id='G-TEST12345',hostname='welltroy.com',choice=null}={}) {
 const saved={window:globalThis.window,document:globalThis.document,location:globalThis.location};
 const node=()=>({hidden:true,listeners:{},addEventListener(name,fn){this.listeners[name]=fn;},focus(){this.focused=true;}});
 const accept=node(),reject=node(),settings=node(),banner=node();
 banner.querySelector=(s)=>s==='[data-analytics-accept]'?accept:s==='[data-analytics-reject]'?reject:reject;
 const scripts=[],deletedCookies=[];let stored=choice?JSON.stringify({choice,expires:Date.now()+100000}):null;
 globalThis.window={localStorage:{getItem:()=>stored,setItem:(k,v)=>{stored=v;}}};
 globalThis.location={hostname,origin:`https://${hostname}`,pathname:'/quote/',reload(){this.reloaded=true;}};
 globalThis.document={referrer:'https://www.google.com/search?q=private',
  querySelector:(s)=>s==='[data-analytics-config]'?{dataset:{measurementId:id}}:s==='[data-analytics-banner]'?banner:s==='[data-analytics-settings]'?settings:null,
  createElement:()=>({}),head:{append(s){scripts.push(s);}},addEventListener(){},
  get cookie(){return '_ga=abc; _ga_TEST12345=xyz';},set cookie(v){deletedCookies.push(v);}
 };
 const mod=await import(`../src/analytics.js?test=${Math.random()}`);
 mod.initializeAnalytics();
 return {mod,scripts,accept,reject,banner,settings,deletedCookies,restore(){for(const [key,val] of Object.entries(saved)){if(val===undefined)delete globalThis[key];else globalThis[key]=val;}}};
}
test('runtime loads no script with missing ID or on a preview host',async()=>{
 for(const input of [{id:''},{hostname:'preview.welltroy.pages.dev'}]){
  const env=await environment(input);try{assert.equal(env.scripts.length,0);assert.equal(env.settings.hidden,true);}finally{env.restore();}
 }
});
test('runtime waits for explicit acceptance, queues one page view, and never duplicates the script',async()=>{
 const env=await environment();try{
  assert.equal(env.scripts.length,0);assert.equal(env.banner.hidden,false);
  assert.equal(env.mod.track('quote_start'),false);
  env.accept.listeners.click();assert.equal(env.scripts.length,1);
  env.accept.listeners.click();assert.equal(env.scripts.length,1);
  const queue=window.dataLayer.map(x=>Array.from(x));
  assert.equal(queue.filter(x=>x[0]==='event'&&x[1]==='page_view').length,1);
  assert.equal(JSON.stringify(queue).includes('q=private'),false);
  assert.equal(queue.find(x=>x[0]==='config')[2].send_page_view,false);
 }finally{env.restore();}
});
test('runtime rejection never loads GA; revocation stops events and reloads with cleared GA cookies',async()=>{
 let env=await environment();try{env.reject.listeners.click();assert.equal(env.scripts.length,0);assert.equal(env.mod.track('page_view'),false);}finally{env.restore();}
 env=await environment({choice:'granted'});try{
  assert.equal(env.scripts.length,1);env.reject.listeners.click();
  assert.equal(window['ga-disable-G-TEST12345'],true);assert.equal(location.reloaded,true);
  assert.equal(env.mod.track('quote_start'),false);assert.equal(window.dataLayer.length,0);
  assert.ok(env.deletedCookies.every(x=>x.includes('Max-Age=0')));
 }finally{env.restore();}
});
