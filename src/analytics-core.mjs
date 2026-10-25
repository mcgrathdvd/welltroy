import {catalogueModels} from './catalogue-models.mjs';

export const productSlugs = new Set([
  'poly-mailers','biodegradable-mailers','poly-bubble-mailers','metallic-bubble-mailers',
  'zipper-bags','kraft-paper-bags','paper-gift-bags','stand-up-pouches','thermal-labels',
  'honeycomb-paper-rolls','die-cut-handle-shipping-bags','pink-handle-mailers',
  'yellow-kraft-bubble-mailers','printed-snack-pouches','custom-stand-up-pouches','custom-paper-hang-tags',
  'kraft-padded-mailers','colored-honeycomb-paper-rolls','white-nut-pouches'
]);
const formProducts = new Set([...productSlugs,'multiple-products','not-sure']);
const fixedPaths = new Set(['/', '/products/','/quote/','/industries/','/why-welltroy/',
  '/about/','/faq/','/reviews/','/ordering/','/privacy/','/catalogue/','/guides/',
  '/guides/choose-a-mailer/','/guides/mailer-size-for-clothing/',
  '/guides/logo-artwork-checklist/',
  '/guides/kraft-vs-poly-bubble-mailers/',
  '/guides/custom-paper-bag-size-handles-printing/',
  '/guides/honeycomb-paper-wrap-bottles-gifts/',
  '/guides/custom-stand-up-pouch-specification/',
  '/guides/custom-packaging-500-pieces/']);
const names = new Set(['page_view','view_product','quote_start','quote_submit_success',
  'quote_submit_error','whatsapp_click','email_click','quote_cta_click','select_size','download_catalogue','sample_interest']);
const errors = new Set(['request_rejected','service_unavailable','delivery_unconfirmed']);
const placements = new Set(['header','hero','product-hero','product-size','product-details','product-bottom','footer','sticky-desktop','sticky-mobile','content']);
const sampleTypes = new Set(['existing','custom','none']);

export function safeTitle(value) {
  return typeof value === 'string' && /^[A-Za-z0-9 &|():,.?\u2013\u2014'/-]{1,160}$/.test(value) ? value : 'Welltroy';
}

export function safePath(path) {
  const bare = typeof path === 'string' ? path.split(/[?#]/)[0] : '';
  if (fixedPaths.has(bare)) return bare;
  const slug = bare.match(/^\/products\/([^/]+)\/$/)?.[1];
  return productSlugs.has(slug) ? `/products/${slug}/` : null;
}
export function safeProduct(value) { return formProducts.has(value) ? value : 'unknown'; }
export function validMeasurementId(value) { return typeof value === 'string' && /^G-[A-Z0-9]{5,20}$/.test(value); }

export function sourceInfo(referrer, currentOrigin) {
  // Only known public search/social/AI origins go to GA. Never send conversation
  // paths, search terms or arbitrary private referrer URLs.
  try {
    const u = new URL(referrer);
    if (!['https:','http:'].includes(u.protocol)) throw Error();
    if (u.origin === currentOrigin) return { entry_source:'internal', page_referrer:'' };
    const h = u.hostname.replace(/^www\./,'');
    const ai = /(^|\.)(chatgpt\.com|chat\.openai\.com|perplexity\.ai|copilot\.microsoft\.com|claude\.ai|gemini\.google\.com)$/.test(h);
    const search = /(^|\.)(google\.(com|co\.uk|com\.au|ca|de|fr|cn)|bing\.com|duckduckgo\.com|search\.yahoo\.com)$/.test(h);
    const social = /(^|\.)(linkedin\.com|pinterest\.com|facebook\.com|instagram\.com|youtube\.com|t\.co)$/.test(h);
    return {entry_source:ai ? 'ai_referral' : search ? 'organic_search' : social ? 'social' : 'referral',page_referrer:ai || search || social ? u.origin : ''};
  } catch { return {entry_source:'direct_or_unknown',page_referrer:''}; }
}

export function sanitizeEvent(name, details, path, title) {
  const cleanPath = safePath(path);
  if (!names.has(name) || !cleanPath) return null;
  const result = {page_path:cleanPath, page_location:`https://welltroy.com${cleanPath}`, page_title:safeTitle(title)};
  if (name === 'view_product') {
    if (!productSlugs.has(details?.product_slug)) return null;
    result.product_slug = details.product_slug;
  } else if (name.startsWith('quote_')) result.product_slug = safeProduct(details?.product_slug);
  if (name === 'quote_submit_error') result.error_category = errors.has(details?.error_category) ? details.error_category : 'delivery_unconfirmed';
  if (name === 'whatsapp_click') result.contact_stage = 'outbound';
  if (name === 'quote_cta_click') result.placement = placements.has(details?.placement) ? details.placement : 'content';
  if (name === 'select_size') {
    if (!productSlugs.has(details?.product_slug) || !catalogueModels[details?.product_slug]?.includes(details?.model)) return null;
    result.product_slug = details.product_slug;
    result.model = details.model;
  }
  if (name === 'download_catalogue') {
    if (!['2025-pdf','current-guide-print'].includes(details?.document)) return null;
    result.document = details.document;
  }
  if (name === 'sample_interest') {
    if (!sampleTypes.has(details?.sample_type)) return null;
    result.product_slug = safeProduct(details?.product_slug);
    result.sample_type = details.sample_type;
  }
  return result;
}

export function createTracker({canSend,send,getPath,getTitle = () => 'Welltroy'}) {
  return (name, details = {}) => {
    try {
      if (!canSend()) return false;
      const payload = sanitizeEvent(name,details,getPath(),getTitle());
      if (!payload) return false;
      send(name,payload);
      return true;
    } catch { return false; } // Analytics must never break enquiries or navigation.
  };
}

export function confirmedQuote(response, result) {
  return response?.ok === true && result?.ok === true && typeof result.reference === 'string'
    && result.reference.length > 0 && result.reference.length <= 100;
}
export function errorCategory(status) {
  return status >= 400 && status < 500 ? 'request_rejected' : status === 503 ? 'service_unavailable' : 'delivery_unconfirmed';
}

export function readChoice(storage, now = Date.now()) {
  try {
    const value = JSON.parse(storage.getItem('welltroy-analytics-choice-v1'));
    if (['granted','denied'].includes(value?.choice) && Number.isFinite(value?.expires) && value.expires > now) return value.choice;
  } catch { /* unavailable storage means ask again, never imply consent */ }
  return 'unknown';
}
export function saveChoice(storage, choice, now = Date.now()) {
  if (!['granted','denied'].includes(choice)) return;
  try { storage.setItem('welltroy-analytics-choice-v1', JSON.stringify({choice,expires:now + 180 * 86400000})); } catch { /* consent still works in memory */ }
}
