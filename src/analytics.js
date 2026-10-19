import {createTracker,validMeasurementId,safePath,productSlugs,sourceInfo,readChoice,saveChoice} from './analytics-core.mjs';

let tracker = () => false;
let initialized = false;
export const track = (name,details) => tracker(name,details);
const allDenied = {analytics_storage:'denied',ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied'};

export function initializeAnalytics() {
  if (initialized) return;
  initialized = true;
  try {
    const config = document.querySelector('[data-analytics-config]');
    const id = config?.dataset.measurementId;
    // No ID, previews and unrelated hosts: do not show an unusable banner or load GA.
    if (!validMeasurementId(id) || location.hostname !== 'welltroy.com') return;
    const banner = document.querySelector('[data-analytics-banner]');
    const settings = document.querySelector('[data-analytics-settings]');
    if (!banner || !settings) return;
    let storage;
    try { storage = window.localStorage; } catch { storage = null; }
    let choice = readChoice(storage);
    let loaded = false;
    let viewed = false;
    let started = false;
    let gtag;
    const source = sourceInfo(document.referrer,location.origin);
    const canSend = () => choice === 'granted' && loaded;
    tracker = createTracker({canSend,getPath:() => location.pathname,send:(name,params) => {
      gtag('event',name,{...params,entry_source:source.entry_source,page_referrer:source.page_referrer,send_to:id});
    }});
    const view = () => {
      if (viewed || !safePath(location.pathname) || !canSend()) return;
      viewed = true;
      track('page_view');
      const slug = location.pathname.match(/^\/products\/([^/]+)\/$/)?.[1];
      if (productSlugs.has(slug)) track('view_product',{product_slug:slug});
    };
    const load = () => {
      if (loaded) { view(); return; }
      window.dataLayer = window.dataLayer || [];
      gtag = function () { window.dataLayer.push(arguments); };
      gtag('consent','default',allDenied);
      gtag('consent','update',{...allDenied,analytics_storage:'granted'});
      // Set sanitized context before config/session events. No raw URL, query or form text.
      gtag('set',{page_location:`https://welltroy.com${safePath(location.pathname) || '/'}`,page_referrer:source.page_referrer,page_title:'Welltroy'});
      gtag('js',new Date());
      gtag('config',id,{send_page_view:false,allow_google_signals:false,allow_ad_personalization_signals:false,cookie_domain:'welltroy.com',cookie_flags:'SameSite=Lax;Secure'});
      const script = document.createElement('script');
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtag/js?id=${id}`;
      document.head.append(script);
      loaded = true;
      view();
    };
    const clearCookies = () => {
      for (const pair of document.cookie.split(';')) {
        const name = pair.trim().split('=')[0];
        if (!/^_ga(?:_|$)/.test(name)) continue;
        for (const domain of ['',`; Domain=${location.hostname}`,'; Domain=.welltroy.com']) {
          document.cookie = `${name}=; Max-Age=0; Path=/${domain}; SameSite=Lax; Secure`;
        }
      }
    };
    const choose = (next) => {
      choice = next;
      saveChoice(storage,next);
      banner.hidden = true;
      if (next === 'granted') {
        window[`ga-disable-${id}`] = false;
        if (loaded) gtag('consent','update',{...allDenied,analytics_storage:'granted'});
        load();
      } else {
        // Stop transmission immediately, then clear known first-party GA cookies.
        window[`ga-disable-${id}`] = true;
        window.dataLayer = [];
        clearCookies();
        // A loaded third-party script cannot be unloaded. Reload into the blocked state.
        if (loaded) location.reload();
      }
      if (next === 'granted' || !loaded) settings.focus({preventScroll:true});
    };
    settings.hidden = false;
    settings.addEventListener('click',() => {banner.hidden = false;banner.querySelector('button')?.focus();});
    banner.querySelector('[data-analytics-accept]').addEventListener('click',() => choose('granted'));
    banner.querySelector('[data-analytics-reject]').addEventListener('click',() => choose('denied'));
    banner.hidden = choice !== 'unknown';
    if (choice === 'granted') load();
    else window[`ga-disable-${id}`] = true;
    document.addEventListener('click',(event) => {
      if (!event.isTrusted || (event.button !== undefined && event.button !== 0)) return;
      const link = event.target.closest?.('a[href]');
      if (!link) return;
      // Other listeners can intercept the link to open a dialog. Check after bubbling.
      queueMicrotask(() => {
        if (event.defaultPrevented) return;
        try {
          const url = new URL(link.href);
          if (url.protocol === 'mailto:') track('email_click');
          if (url.hostname === 'wa.me') track('whatsapp_click');
        } catch { /* no analytics for invalid links */ }
      });
    });
    const form = document.querySelector('[data-quote-form]');
    const start = (event) => {
      if (started || !event.isTrusted || !canSend() || !event.target.matches('input:not([type=hidden]):not([name=website]),select,textarea')) return;
      started = true;
      track('quote_start',{product_slug:form.elements.namedItem('product')?.value});
    };
    form?.addEventListener('input',start);
    form?.addEventListener('change',start);
    form?.addEventListener('welltroy:new-enquiry',() => {started = false;});
  } catch { tracker = () => false; }
}
