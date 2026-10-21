import {createTracker,validMeasurementId,safePath,safeTitle,productSlugs,sourceInfo,readChoice,saveChoice} from './analytics-core.mjs';
import {campaignForVisit,clearCampaign} from './campaigns.mjs';

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
    const title = safeTitle(config.dataset.pageTitle);
    let campaign = {};
    const canSend = () => choice === 'granted' && loaded;
    tracker = createTracker({canSend,getPath:() => location.pathname,getTitle:() => title,send:(name,params) => {
      gtag('event',name,{...params,...campaign,entry_source:campaign.campaign_source ? 'campaign' : source.entry_source,page_referrer:source.page_referrer,send_to:id});
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
      let session;
      try { session = window.sessionStorage; } catch { session = null; }
      campaign = campaignForVisit(location.search || '',session,{referrer:document.referrer,origin:location.origin});
      window.dataLayer = window.dataLayer || [];
      gtag = function () { window.dataLayer.push(arguments); };
      gtag('consent','default',allDenied);
      gtag('consent','update',{...allDenied,analytics_storage:'granted'});
      // Set sanitized context before config/session events. No raw URL, query or form text.
      gtag('set',{page_location:`https://welltroy.com${safePath(location.pathname) || '/'}`,page_referrer:source.page_referrer,page_title:title,...campaign});
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
        campaign = {};
        try { clearCampaign(window.sessionStorage); } catch { /* optional storage */ }
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
      if (event.target.closest?.('[data-print-guide]')) track('download_catalogue',{document:'current-guide-print'});
      const link = event.target.closest?.('a[href]');
      if (!link) return;
      // Other listeners can intercept the link to open a dialog. Check after bubbling.
      queueMicrotask(() => {
        if (event.defaultPrevented) return;
        try {
          const url = new URL(link.href);
          if (url.protocol === 'mailto:') track('email_click');
          if (url.hostname === 'wa.me') track('whatsapp_click');
          if (url.origin === location.origin && url.pathname === '/quote/') {
            const slug = url.searchParams.get('product') || location.pathname.match(/^\/products\/([^/]+)\/$/)?.[1];
            track('quote_cta_click',{product_slug:slug,placement:link.dataset.quotePlacement});
            if (link.dataset.model) track('select_size',{product_slug:slug,model:link.dataset.model});
          }
          if (url.origin === location.origin && url.pathname === '/catalog/Welltroy-Product-Catalog-2025.pdf') track('download_catalogue',{document:'2025-pdf'});
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
    form?.addEventListener('change',(event) => {
      if (!event.isTrusted || event.target.name !== 'sample') return;
      const types = {'Existing product sample':'existing','Custom printed sample':'custom','No sample needed':'none'};
      track('sample_interest',{product_slug:form.elements.namedItem('product')?.value,sample_type:types[event.target.value]});
    });
    form?.addEventListener('welltroy:new-enquiry',() => {started = false;});
  } catch { tracker = () => false; }
}
