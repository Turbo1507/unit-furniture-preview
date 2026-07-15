/* UNIT.FURNITURE — каталог: категории + фильтры indoor/outdoor и назначение.
   Понимает ?cat= и ?env= из ссылок с главной. */

const productsEl = document.getElementById('products');
const emptyEl = document.getElementById('catalogEmpty');
const tabs = document.querySelectorAll('#tabs .tab');
const fltEnv = document.getElementById('fltEnv');
const fltUse = document.getElementById('fltUse');

let currentCat = 'all';

function matchesCat(p, cat) {
  if (cat === 'all') return true;
  return p.cat === cat || (p.tags || []).includes(cat);
}
function applyFilters() {
  const env = fltEnv.value;
  const use = fltUse.value;
  const list = window.PRODUCTS.filter(p =>
    matchesCat(p, currentCat) &&
    (env === 'all' || p.env === env) &&
    (use === 'all' || (p.use || []).includes(use))
  );
  renderProductsInto(productsEl, list);
  emptyEl.hidden = list.length > 0;
}
function activateTab(cat) {
  currentCat = cat;
  tabs.forEach(tb => tb.classList.toggle('active', tb.dataset.cat === cat));
  applyFilters();
}
tabs.forEach(tb => tb.addEventListener('click', () => activateTab(tb.dataset.cat)));
fltEnv.addEventListener('change', applyFilters);
fltUse.addEventListener('change', applyFilters);

/* сброс фильтров из пустого состояния каталога */
const resetBtn = document.getElementById('catalogResetFilters');
if (resetBtn) resetBtn.addEventListener('click', () => {
  fltEnv.value = 'all';
  fltUse.value = 'all';
  refreshCustomSelectLabels();
  activateTab('all');
});

/* стартовые фильтры из URL */
(function initFromURL() {
  const q = new URLSearchParams(location.search);
  const cat = q.get('cat');
  const env = q.get('env');
  if (env === 'indoor' || env === 'outdoor') fltEnv.value = env;
  if (cat && [...tabs].some(tb => tb.dataset.cat === cat)) currentCat = cat;
  refreshCustomSelectLabels();
  activateTab(currentCat);
})();

window.__uf_onLangChangePage = applyFilters;
