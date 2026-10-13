const browser = document.querySelector('[data-product-browser]');
if (browser) {
  const form = browser.querySelector('form');
  const search = form.elements.namedItem('q');
  const category = form.elements.namedItem('category');
  const range = form.elements.namedItem('range');
  const sections = [...document.querySelectorAll('[data-product-section]')];
  const cards = sections.flatMap(section => [...section.querySelectorAll('[data-product-card]')]);
  const count = browser.querySelector('[data-result-count]');
  const empty = browser.querySelector('[data-no-results]');
  const reset = browser.querySelector('[data-clear-filters]');
  const validValue = (select, value) => [...select.options].some(option => option.value === value) ? value : '';
  const apply = (save = true) => {
    const words = search.value.trim().toLowerCase().split(/\s+/).filter(Boolean);
    let visible = 0;
    cards.forEach(card => {
      card.hidden = !(words.every(word => card.dataset.search.includes(word)) &&
        (!category.value || card.dataset.group === category.value) &&
        (!range.value || card.dataset.new === String(range.value === 'new')));
      if (!card.hidden) visible++;
    });
    sections.forEach(section => { section.hidden = ![...section.querySelectorAll('[data-product-card]')].some(card => !card.hidden); });
    count.textContent = `${visible} of ${cards.length} products shown`;
    empty.hidden = visible !== 0;
    reset.disabled = !search.value && !category.value && !range.value;
    if (save) {
      const url = new URL(location.href);
      for (const [key, value] of [['q', search.value.trim()], ['category', category.value], ['range', range.value]]) {
        if (value) url.searchParams.set(key, value); else url.searchParams.delete(key);
      }
      url.hash = 'product-browser';
      history.replaceState(null, '', url);
    }
  };
  const restore = () => {
    const params = new URLSearchParams(location.search);
    search.value = params.get('q') || '';
    category.value = validValue(category, params.get('category'));
    range.value = validValue(range, params.get('range'));
    const match = location.hash.match(/^#group-(\d)$/);
    if (match) { category.value = category.options[Number(match[1])]?.value || ''; range.value = ''; }
    if (location.hash === '#new-products') { category.value = ''; range.value = 'new'; }
    apply(false);
    if (match || location.hash === '#new-products' || location.hash === '#product-browser') browser.scrollIntoView({block:'start', behavior:'instant'});
  };
  form.addEventListener('submit', event => { event.preventDefault(); apply(); });
  search.addEventListener('input', () => apply());
  category.addEventListener('change', () => apply());
  range.addEventListener('change', () => apply());
  reset.addEventListener('click', () => { form.reset(); apply(); search.focus(); });
  window.addEventListener('hashchange', restore);
  window.addEventListener('popstate', restore);
  browser.hidden = false;
  document.querySelector('[data-product-jumps]').hidden = true;
  restore();
}
