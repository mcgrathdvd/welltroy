import {documentProducts, normalizeDocumentRequest, documentRequestReady, documentRequestText, documentQuoteFields, saveDocumentRequest, readDocumentRequest, clearDocumentRequest} from './document-request.mjs';
import {fieldsAfterProductChange, quoteFieldsAreEmpty} from './quote-brief.mjs';
import {track} from './analytics.js';
const session = () => {try {return window.sessionStorage;} catch {return null;}};

export function initializeDocumentRequests() {
  const root=document.querySelector('[data-document-builder]');
  if (root) initializeBuilder(root);
  const form=document.querySelector('[data-quote-form]');
  if (form) initializeImport(form);
}
function initializeBuilder(root) {
  const form=root.querySelector('[data-document-form]');
  const summary=root.querySelector('[data-document-summary]');
  const status=root.querySelector('[data-document-status]');
  const next=root.querySelector('[data-document-continue]');
  const fallback=root.querySelector('[data-document-fallback]');
  const storage=session();
  const saved=readDocumentRequest(storage);
  if (saved) {
    for (const [name,value] of Object.entries(saved)) {
      if (name==='categories') form.querySelectorAll('[name="categories"]').forEach(field=>field.checked=value.includes(field.value));
      else if (form.elements.namedItem(name)) form.elements.namedItem(name).value=value;
    }
    status.textContent='Your document request from this tab has been restored. Review or change it before continuing.';
  }
  const params=new URLSearchParams(window.location.search);
  const preferred=params.get('product');
  if (Object.hasOwn(documentProducts,preferred)) {
    form.elements.product.value=preferred;
    if (saved && preferred!==saved.product) status.textContent='Product updated from your link. Review the document scope for this packaging.';
  }
  const current=()=>{
    const data=new FormData(form);
    return normalizeDocumentRequest({...Object.fromEntries(data.entries()),categories:data.getAll('categories')});
  };
  const render=()=>{
    const request=current();
    summary.value=documentRequestText(request);
    next.disabled=!documentRequestReady(request);
    fallback.href=`/quote/?product=${request.product}#quote-form`;
  };
  let started=false;
  form.addEventListener('input',event=>{
    render();
    saveDocumentRequest(storage,current());
    status.textContent='Review the request below. Nothing has been sent.';
    if (event.isTrusted && !started) started=track('quote_brief_start',{product_slug:current().product});
  });
  form.addEventListener('submit',event=>{
    event.preventDefault();
    const request=current();
    if (!documentRequestReady(request)) {status.textContent='Choose a document category or describe your requirement first.';return;}
    if (!saveDocumentRequest(storage,request)) {
      status.textContent='Your browser could not carry this request. Copy it below, then paste it into a blank enquiry.';
      fallback.hidden=false;
      summary.focus();summary.select();return;
    }
    if (event.isTrusted) track('quote_brief_continue',{product_slug:request.product});
    window.location.assign(`/quote/?product=${request.product}&document=1#quote-form`);
  });
  root.querySelector('[data-document-copy]').addEventListener('click',async()=>{
    try {await navigator.clipboard.writeText(summary.value);status.textContent='Request copied. Paste it into your email or enquiry.';}
    catch {summary.focus();summary.select();status.textContent='Select and copy the request, then paste it into your enquiry.';}
  });
  root.querySelector('[data-document-clear]').addEventListener('click',()=>{
    form.reset();clearDocumentRequest(storage);fallback.hidden=true;started=false;render();
    status.textContent='Document request cleared in this tab.';
  });
  render();root.querySelector('[data-document-ui]').hidden=false;
}
function initializeImport(form) {
  const params=new URLSearchParams(window.location.search);
  const product=params.get('product');
  if (params.get('document')!=='1' || params.get('brief')==='1' || !Object.hasOwn(documentProducts,product)) return;
  const panel=form.querySelector('[data-document-import]');
  if (!panel) return;
  panel.hidden=false;
  const status=panel.querySelector('[data-document-import-status]');
  const applyButton=panel.querySelector('[data-document-apply]');
  panel.querySelector('[data-document-return]').href=`/materials-and-documents/?product=${product}#document-request-builder`;
  const storage=session();
  const saved=readDocumentRequest(storage);
  const fields=saved?.product===product ? documentQuoteFields(saved) : null;
  if (!fields) {status.textContent='No matching saved document request is available. Enter your requirements below or return to prepare a request.';return;}
  const values=()=>Object.fromEntries(Object.keys(fields).map(key=>[key,form.elements.namedItem(key).value]));
  let applied=false;
  const apply=()=>{
    if (form.elements.product.value!==product) return;
    for (const [key,value] of Object.entries(fields)) form.elements.namedItem(key).value=value;
    applied=true;applyButton.hidden=true;
    form.dispatchEvent(new Event('welltroy:brief-applied'));
    status.textContent='Your document request is in the editable fields below. Add contact details and review before sending. Nothing has been sent yet.';
  };
  if (form.elements.product.value===product && quoteFieldsAreEmpty(values())) apply();
  else {status.textContent='This enquiry already has specifications. Keep your edits, or apply the saved document request to replace the specification fields. Contact details and attachments are kept.';applyButton.hidden=form.elements.product.value!==product;}
  applyButton.addEventListener('click',apply);
  form.elements.product.addEventListener('change',()=>{
    if (form.elements.product.value===product) {status.textContent='Enter new requirements or apply your saved document request again.';applyButton.hidden=false;return;}
    if (applied) for (const [key,value] of Object.entries(fieldsAfterProductChange(values(),fields))) form.elements.namedItem(key).value=value;
    applied=false;applyButton.hidden=true;
    status.textContent='Product changed. Unedited imported specifications were cleared; your edits were kept. Review the document scope for the new product.';
  });
  const clear=()=>{clearDocumentRequest(storage);applied=false;panel.hidden=true;};
  form.addEventListener('welltroy:quote-sent',clear);
  form.addEventListener('welltroy:new-enquiry',clear);
}
