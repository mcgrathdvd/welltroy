import {test} from 'node:test';
import assert from 'node:assert/strict';
import {createTracker,sanitizeEvent,safePath,confirmedQuote,errorCategory,readChoice,saveChoice,sourceInfo,productSlugs} from '../src/analytics-core.mjs';
import {products} from '../src/product-data.mjs';
import {buyerLinkAction,projectForQuote} from '../src/buyer-actions.mjs';

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

test('recognised AI referrals retain only public origins and reject lookalike domains',()=>{
 for(const origin of ['https://chatgpt.com','https://chat.openai.com','https://www.perplexity.ai','https://copilot.microsoft.com','https://claude.ai','https://gemini.google.com']){
  assert.deepEqual(sourceInfo(`${origin}/conversation/private-id?q=buyer@example.com#private`,'https://welltroy.com'),{entry_source:'ai_referral',page_referrer:origin});
 }
 for(const referrer of ['https://chatgpt.com.evil.invalid/conversation','https://fakeperplexity.ai/private','https://copilot.microsoft.com.evil.invalid/']){
  assert.deepEqual(sourceInfo(referrer,'https://welltroy.com'),{entry_source:'referral',page_referrer:''});
 }
 assert.deepEqual(sourceInfo('javascript:alert(1)','https://welltroy.com'),{entry_source:'direct_or_unknown',page_referrer:''});
 assert.deepEqual(sourceInfo('https://welltroy.com/products/poly-mailers/','https://welltroy.com'),{entry_source:'internal',page_referrer:''});
});

async function environment({id='G-TEST12345',hostname='welltroy.com',choice=null,search='',pathname='/quote/',referrer='https://www.google.com/search?q=private'}={}) {
 const saved={window:globalThis.window,document:globalThis.document,location:globalThis.location};
 const node=()=>({hidden:true,listeners:{},addEventListener(name,fn){this.listeners[name]=fn;},focus(){this.focused=true;}});
 const accept=node(),reject=node(),settings=node(),banner=node();
 banner.querySelector=(s)=>s==='[data-analytics-accept]'?accept:s==='[data-analytics-reject]'?reject:reject;
 const scripts=[],deletedCookies=[],sessionReads=[],session=new Map(),listeners={};let stored=choice?JSON.stringify({choice,expires:Date.now()+100000}):null;
 globalThis.window={localStorage:{getItem:()=>stored,setItem:(k,v)=>{stored=v;}},get sessionStorage(){sessionReads.push(true);return {getItem:k=>session.get(k),setItem:(k,v)=>session.set(k,v),removeItem:k=>session.delete(k)};}};
 globalThis.location={hostname,origin:`https://${hostname}`,pathname,search,reload(){this.reloaded=true;}};
 globalThis.document={referrer,
  querySelector:(s)=>s==='[data-analytics-config]'?{dataset:{measurementId:id,pageTitle:'Request a Packaging Quote | Welltroy'}}:s==='[data-analytics-banner]'?banner:s==='[data-analytics-settings]'?settings:null,
  createElement:()=>({}),head:{append(s){scripts.push(s);}},addEventListener(name,fn){listeners[name]=fn;},
  get cookie(){return '_ga=abc; _ga_TEST12345=xyz';},set cookie(v){deletedCookies.push(v);}
 };
 const mod=await import(`../src/analytics.js?test=${Math.random()}`);
 mod.initializeAnalytics();
 return {mod,scripts,accept,reject,banner,settings,deletedCookies,sessionReads,session,listeners,restore(){for(const [key,val] of Object.entries(saved)){if(val===undefined)delete globalThis[key];else globalThis[key]=val;}}};
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

test('runtime AI attribution waits for consent and never includes conversation paths',async()=>{
 const env=await environment({referrer:'https://chatgpt.com/c/private-conversation?email=buyer@example.com#private'});
 try {
  assert.equal(env.scripts.length,0);
  assert.equal(env.mod.track('quote_start'),false);
  env.accept.listeners.click();
  const queue=window.dataLayer.map(x=>Array.from(x));
  const page=queue.find(x=>x[0]==='event'&&x[1]==='page_view')[2];
  assert.equal(page.entry_source,'ai_referral');
  assert.equal(page.page_referrer,'https://chatgpt.com');
  assert.equal(JSON.stringify(queue).includes('private-conversation'),false);
  assert.equal(JSON.stringify(queue).includes('buyer@example.com'),false);
  env.reject.listeners.click();
  assert.equal(env.mod.track('quote_start'),false);
 } finally {env.restore();}
});

test('runtime reads campaign storage only after consent and configures public attribution before events',async()=>{
 const env=await environment({search:'?utm_source=google&utm_medium=cpc&utm_campaign=poly-mailers&email=buyer@example.com&gclid=private'});
 try {
  assert.equal(env.sessionReads.length,0);assert.equal(env.session.size,0);
  env.accept.listeners.click();
  assert.ok(env.sessionReads.length>0);assert.equal(env.session.size,1);
  const queue=window.dataLayer.map(x=>Array.from(x));
  const set=queue.findIndex(x=>x[0]==='set'),config=queue.findIndex(x=>x[0]==='config');
  assert.ok(set<config);assert.equal(queue[set][1].campaign_source,'google');
  const page=queue.find(x=>x[0]==='event'&&x[1]==='page_view')[2];
  assert.equal(page.campaign_name,'poly-mailers');assert.equal(page.entry_source,'campaign');
  assert.equal(page.page_title,'Request a Packaging Quote | Welltroy');
  assert.equal(page.page_location,'https://welltroy.com/quote/');
  assert.equal(JSON.stringify(queue).includes('buyer@example.com'),false);
  assert.equal(JSON.stringify(queue).includes('gclid'),false);
  env.reject.listeners.click();assert.equal(env.session.size,0);
 } finally {env.restore();}
});

test('runtime size and catalogue clicks produce filtered funnel events without breaking navigation',async()=>{
 const env=await environment({choice:'granted',pathname:'/products/poly-mailers/'});
 try {
  const link={href:'https://welltroy.com/quote/?product=poly-mailers&size=P03%20private',dataset:{quotePlacement:'product-size',model:'P03'}};
  const click=()=>({isTrusted:true,button:0,defaultPrevented:false,target:{closest:selector=>selector==='a[href]'?link:null}});
  const event=click();env.listeners.click(event);await Promise.resolve();
  const sent=window.dataLayer.map(x=>Array.from(x)).filter(x=>x[0]==='event');
  assert.equal(sent.filter(x=>x[1]==='quote_cta_click').length,1);
  const model=sent.find(x=>x[1]==='select_size')[2];assert.equal(model.model,'P03');
  assert.equal(JSON.stringify(sent).includes('private'),false);assert.equal(event.defaultPrevented,false);
  link.href='https://welltroy.com/catalog/Welltroy-Product-Catalog-2025.pdf';link.dataset={};
  env.listeners.click(click());await Promise.resolve();
  assert.equal(window.dataLayer.map(x=>Array.from(x)).filter(x=>x[0]==='event'&&x[1]==='download_catalogue').length,1);
 } finally {env.restore();}
});

test('new buying guides track only public paths and still require consent',()=>{
  for(const path of ['/guides/','/materials-and-documents/','/guides/verify-packaging-bag-factory/','/guides/custom-mailer-sample-approval/','/guides/compare-custom-mailer-quotes/','/guides/metallic-vs-holographic-bubble-mailers/']) {
    const events=[]; let consent=false;
    const track=createTracker({canSend:()=>consent,send:(name,data)=>events.push({name,data}),getPath:()=>`${path}?email=buyer@example.com#private-approval`});
    assert.equal(track('page_view'),false);
    assert.equal(events.length,0);
    consent=true;
    assert.equal(track('page_view'),true);
    assert.deepEqual(events,[{name:'page_view',data:{page_path:path,page_location:`https://welltroy.com${path}`,page_title:'Welltroy'}}]);
    consent=false;
    assert.equal(track('quote_cta_click'),false);
    assert.equal(events.length,1);
  }
  assert.equal(sanitizeEvent('page_view',{},'/guides/private-buyer-approval/'),null);
});

test('buyer actions recognise only exact same-origin public destinations',()=>{
  const origin='https://welltroy.com';
  assert.deepEqual(buyerLinkAction(`${origin}/products/poly-mailers/?email=private#poly-mailer-case`,origin),{name:'customer_project_open',details:{project_id:'strawberry-apparel'}});
  assert.deepEqual(buyerLinkAction('/products/poly-bubble-mailers/#lumiere-case',origin),{name:'customer_project_open',details:{project_id:'lumiere'}});
  assert.deepEqual(buyerLinkAction('/products/poly-bubble-mailers/#verdant-case',origin),{name:'customer_project_open',details:{project_id:'verdant-studio'}});
  for(const href of [
    'https://welltroy.com.evil.invalid/products/poly-mailers/#poly-mailer-case',
    'https://other.invalid/downloads/clothing-mailer-fit-record.txt',
    '/products/poly-mailers/#lumiere-case','/products/poly-mailers/#poly-mailer-printing',
    '/products/poly-mailers/','/downloads/private-buyer-file.txt',
    'mailto:buyer@example.com','javascript:alert(1)','https://['
  ]) assert.equal(buyerLinkAction(href,origin),null);
  assert.deepEqual(buyerLinkAction('/downloads/clothing-mailer-fit-record.txt?email=private#private',origin),{name:'buyer_resource_download',details:{resource_id:'clothing-fit-record'}});
  assert.equal(projectForQuote('lumiere-case','poly-bubble-mailers'),'lumiere');
  assert.equal(projectForQuote('lumiere-case','poly-mailers'),null);
});

test('project and resource events derive public products and discard private metadata',()=>{
  const privateData={product_slug:'buyer@example.com',email:'buyer@example.com',href:'https://private.invalid/file',filename:'buyer-logo.ai',message:'private'};
  assert.deepEqual(sanitizeEvent('customer_project_open',{...privateData,project_id:'lumiere'},'/?email=private#private'),{
    page_path:'/',page_location:'https://welltroy.com/',page_title:'Welltroy',project_id:'lumiere',product_slug:'poly-bubble-mailers'
  });
  assert.deepEqual(sanitizeEvent('buyer_resource_download',{...privateData,resource_id:'clothing-fit-record'},'/guides/?email=private#private'),{
    page_path:'/guides/',page_location:'https://welltroy.com/guides/',page_title:'Welltroy',resource_id:'clothing-fit-record',product_slug:'poly-mailers'
  });
  for(const id of ['buyer@example.com','constructor','toString','',null]){
    assert.equal(sanitizeEvent('customer_project_open',{project_id:id},'/'),null);
    assert.equal(sanitizeEvent('buyer_resource_download',{resource_id:id},'/'),null);
  }
  const quote=sanitizeEvent('quote_cta_click',{product_slug:'poly-mailers',placement:'customer-project',project_id:'strawberry-apparel',...{email:'private'}},'/products/poly-mailers/');
  assert.equal(quote.placement,'customer-project');assert.equal(quote.project_id,'strawberry-apparel');assert.equal(quote.email,undefined);
  const mismatch=sanitizeEvent('quote_cta_click',{product_slug:'poly-mailers',placement:'customer-project',project_id:'lumiere'},'/products/poly-mailers/');
  assert.equal(mismatch.placement,'content');assert.equal(mismatch.project_id,undefined);
});

test('runtime buyer link events require consent and trusted uncancelled clicks',async()=>{
  const env=await environment({pathname:'/'});
  try {
    const link={href:'https://welltroy.com/products/poly-mailers/#poly-mailer-case',dataset:{}};
    const click=(overrides={})=>({isTrusted:true,button:0,defaultPrevented:false,target:{closest:s=>s==='a[href]'?link:null},...overrides});
    env.listeners.click(click());await Promise.resolve();assert.equal(env.scripts.length,0);assert.equal(window.dataLayer,undefined);
    env.accept.listeners.click();
    env.listeners.click(click({isTrusted:false}));
    env.listeners.click(click({button:2}));
    const cancelled=click();env.listeners.click(cancelled);cancelled.defaultPrevented=true;
    await Promise.resolve();
    const sent=()=>window.dataLayer.map(x=>Array.from(x)).filter(x=>x[0]==='event');
    assert.equal(sent().filter(x=>x[1]==='customer_project_open').length,0);
    const active=click();env.listeners.click(active);await Promise.resolve();
    assert.equal(active.defaultPrevented,false);
    assert.equal(sent().filter(x=>x[1]==='customer_project_open').length,1);
    link.href='https://welltroy.com/downloads/poly-mailer-logo-quote-brief.txt?email=private';
    env.listeners.click(click());await Promise.resolve();
    const download=sent().find(x=>x[1]==='buyer_resource_download')[2];
    assert.equal(download.resource_id,'poly-mailer-logo-brief');assert.equal(download.product_slug,'poly-mailers');
    assert.equal(JSON.stringify(sent()).includes('email=private'),false);
    link.href='https://other.invalid/downloads/poly-mailer-logo-quote-brief.txt';
    env.listeners.click(click());await Promise.resolve();
    assert.equal(sent().filter(x=>x[1]==='buyer_resource_download').length,1);
    env.reject.listeners.click();
    env.listeners.click(click());await Promise.resolve();assert.equal(window.dataLayer.length,0);
  } finally {env.restore();}
});

test('runtime identifies quote buttons inside a matching case without duplicate events',async()=>{
  const env=await environment({choice:'granted',pathname:'/products/poly-bubble-mailers/'});
  try {
    let section='lumiere-case';
    const link={href:'https://welltroy.com/quote/?product=poly-bubble-mailers&email=private',dataset:{quotePlacement:'product-details'},closest:()=>({id:section})};
    const click=()=>({isTrusted:true,button:0,defaultPrevented:false,target:{closest:s=>s==='a[href]'?link:null}});
    env.listeners.click(click());await Promise.resolve();
    const quotes=()=>window.dataLayer.map(x=>Array.from(x)).filter(x=>x[0]==='event'&&x[1]==='quote_cta_click');
    assert.equal(quotes().length,1);assert.equal(quotes()[0][2].placement,'customer-project');assert.equal(quotes()[0][2].project_id,'lumiere');
    assert.equal(JSON.stringify(quotes()).includes('email=private'),false);
    section='buyer-project';env.listeners.click(click());await Promise.resolve();
    assert.equal(quotes().length,2);assert.equal(quotes()[1][2].placement,'product-details');assert.equal(quotes()[1][2].project_id,undefined);
  } finally {env.restore();}
});
