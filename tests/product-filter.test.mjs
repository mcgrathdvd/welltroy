import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {runInNewContext} from 'node:vm';
import {products, productGroups} from '../src/product-data.mjs';

const script = await readFile(new URL('../src/product-filter.js', import.meta.url), 'utf8');
const element = (extra = {}) => ({hidden:false, events:{}, addEventListener(name, fn) { this.events[name] = fn; }, ...extra});
function page(url) {
  const location = new URL(url);
  const search = element({value:'', focus() {this.focused = true;}});
  const category = element({value:'', options:[{value:''}, ...productGroups.map(group => ({value:group.name}))]});
  const range = element({value:'', options:['','new','catalogue'].map(value => ({value}))});
  const controls = {q:search, category, range};
  const form = element({elements:{namedItem:name => controls[name]}, reset() {Object.values(controls).forEach(control => {control.value = '';});}});
  const count = element(); const empty = element(); const reset = element(); const jumps = element();
  const cards = products.map(product => element({dataset:{
    group:product.group, new:String(Boolean(product.isNew)),
    search:[product.name,product.group,product.intro,...product.applications].join(' ').toLowerCase()
  }}));
  const section = element({querySelectorAll:() => cards});
  const browser = element({querySelector:selector => ({form,'[data-result-count]':count,'[data-no-results]':empty,'[data-clear-filters]':reset})[selector], scrollIntoView() {this.scrolled = true;}});
  const window = element();
  runInNewContext(script, {URL, URLSearchParams, location, window,
    document:{querySelector:selector => selector === '[data-product-browser]' ? browser : jumps, querySelectorAll:() => [section]},
    history:{replaceState(_state,_title,url) {location.href = url.href;}}
  });
  return {location,search,category,range,cards,empty,reset,window,count};
}

test('category navigation clears a stale search and range, and saves a shareable selection', () => {
  const p = page('https://welltroy.com/products/?q=does-not-exist&range=new&utm_source=buyer#group-2');
  assert.equal(p.search.value, '');
  assert.equal(p.range.value, '');
  assert.equal(p.category.value, productGroups[1].name);
  assert.ok(p.cards.some(card => !card.hidden));
  assert.ok(p.cards.filter(card => !card.hidden).every(card => card.dataset.group === productGroups[1].name));
  assert.equal(p.location.searchParams.has('q'), false);
  assert.equal(p.location.searchParams.get('category'), productGroups[1].name);
  assert.equal(p.location.searchParams.get('utm_source'), 'buyer');
  assert.equal(p.location.hash, '#product-browser');
});

test('new product navigation clears previous search and category', () => {
  const p = page('https://welltroy.com/products/?q=does-not-exist&category=old&range=catalogue#new-products');
  assert.equal(p.search.value, '');
  assert.equal(p.category.value, '');
  assert.equal(p.range.value, 'new');
  assert.equal(p.cards.filter(card => !card.hidden).length, products.filter(product => product.isNew).length);
  assert.equal(p.location.searchParams.has('q'), false);
  assert.equal(p.location.searchParams.has('category'), false);
});

test('shared filter URLs and browser history restore the intended search', () => {
  const p = page('https://welltroy.com/products/?q=bubble#product-browser');
  assert.equal(p.search.value, 'bubble');
  assert.ok(p.cards.some(card => !card.hidden));
  assert.ok(p.cards.filter(card => !card.hidden).every(card => card.dataset.search.includes('bubble')));
  p.location.href = 'https://welltroy.com/products/?q=paper#product-browser';
  p.window.events.popstate();
  assert.equal(p.search.value, 'paper');
  assert.ok(p.cards.filter(card => !card.hidden).every(card => card.dataset.search.includes('paper')));
});

test('hash navigation after a live search resets stale filters; clear restores all products', () => {
  const p = page('https://welltroy.com/products/');
  p.search.value = 'does-not-exist'; p.search.events.input();
  assert.equal(p.empty.hidden, false);
  p.location.hash = '#group-1'; p.window.events.hashchange();
  assert.equal(p.search.value, '');
  assert.equal(p.empty.hidden, true);
  p.reset.events.click();
  assert.equal(p.cards.filter(card => !card.hidden).length, products.length);
  assert.equal(p.search.focused, true);
  assert.equal(p.reset.disabled, true);
});

test('an unknown group anchor does not discard a shared search', () => {
  const p = page('https://welltroy.com/products/?q=bubble#group-9');
  assert.equal(p.search.value, 'bubble');
  assert.equal(p.location.hash, '#group-9');
});
