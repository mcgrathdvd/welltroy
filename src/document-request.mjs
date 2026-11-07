import {coreOrderProducts} from './core-order-policy.mjs';

export const documentProducts = Object.fromEntries([
  ['not-sure', 'Not sure / other packaging — please advise'],
  ...coreOrderProducts.map(product => [product.slug, product.name])
]);
export const documentCategories = {
  material: 'Material or specification confirmation',
  report: 'Product or material test report',
  system: 'Management-system certificate scope',
  claim: 'Evidence for a specific material or environmental claim',
  inspection: 'Sample or order inspection record',
  advice: 'Not sure — help identify the relevant documents'
};
const key = 'welltroy-document-request-v1';
const lifetime = 24 * 60 * 60 * 1000;
const limits = {size:160, quantity:100, destination:160, intendedUse:200, requirement:600, timing:100};
const clean = (value, limit) => typeof value === 'string' ? value.replace(/[\u0000-\u001f\u007f]/g, ' ').trim().slice(0, limit) : '';

export function normalizeDocumentRequest(input) {
  if (!input || typeof input !== 'object' || Array.isArray(input) || !Object.hasOwn(documentProducts, input.product)) return null;
  const request = {product:input.product, categories:[...new Set(Array.isArray(input.categories) ? input.categories.filter(value => Object.hasOwn(documentCategories, value)) : [])]};
  for (const [field, limit] of Object.entries(limits)) request[field] = clean(input[field], limit);
  return request;
}
export function documentRequestReady(input) {
  const request=normalizeDocumentRequest(input);
  return !!request && (request.categories.length > 0 || !!request.requirement);
}
export function documentRequestText(input) {
  const request=normalizeDocumentRequest(input);
  if (!request) return '';
  return [
    `Supporting document request: ${documentProducts[request.product]}`,
    `Requested evidence: ${request.categories.map(category=>documentCategories[category]).join('; ') || 'Please advise on the relevant documents'}`,
    `Product size / model: ${request.size || 'To be confirmed'}`,
    `Estimated quantity: ${request.quantity || 'Not sure yet'}`,
    `Contents / intended use: ${request.intendedUse || 'To be confirmed'}`,
    `Destination market: ${request.destination || 'To be confirmed'}`,
    `Requirement, claim or scope to address: ${request.requirement || 'Please advise on the available scope'}`,
    `Required timing: ${request.timing || 'To be discussed'}`,
    'Please confirm document availability, holder or issuer, covered product/material/site, date, scope and any limitations before we rely on a record.',
    'This is a request for review, not confirmation that a document is available or that the proposed packaging meets a requirement.'
  ].join('\n');
}
export function documentQuoteFields(input) {
  const request=normalizeDocumentRequest(input);
  if (!documentRequestReady(request)) return null;
  return {product:request.product, quantity:request.quantity || 'Not sure yet', size:request.size || 'To be confirmed', destination:request.destination, sample:'', message:documentRequestText(request)};
}
export function saveDocumentRequest(storage, input, now=Date.now()) {
  const request=normalizeDocumentRequest(input);
  if (!request || !Number.isFinite(now)) return false;
  try {
    const value=JSON.stringify({version:1, expires:now+lifetime, request});
    storage.setItem(key,value);
    return storage.getItem(key)===value;
  } catch {return false;}
}
export function clearDocumentRequest(storage) {
  try {storage.removeItem(key);} catch {}
}
export function readDocumentRequest(storage, now=Date.now()) {
  try {
    const raw=storage.getItem(key);
    if (!raw) return null;
    if (raw.length>12000 || !Number.isFinite(now)) {clearDocumentRequest(storage);return null;}
    const saved=JSON.parse(raw);
    if (saved?.version!==1 || !Number.isFinite(saved.expires) || saved.expires<=now || saved.expires>now+lifetime) {clearDocumentRequest(storage);return null;}
    const request=normalizeDocumentRequest(saved.request);
    if (!request) clearDocumentRequest(storage);
    return request;
  } catch {clearDocumentRequest(storage);return null;}
}
