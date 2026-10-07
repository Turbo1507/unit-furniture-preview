/* UNIT.FURNITURE — каталог: фильтры категория, indoor/outdoor и назначение.
   Понимает ?cat= и ?env= из ссылок с главной. */

const productsEl = document.getElementById('products');
const emptyEl = document.getElementById('catalogEmpty');
const fltCat = document.getElementById('fltCat');
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
  renderProductsInto(productsEl, list, { studio: true });
  emptyEl.hidden = list.length > 0;
}
function activateTab(cat) {
  currentCat = cat;
  fltCat.value = cat;
  refreshCustomSelectLabels();
  applyFilters();
}
fltCat.addEventListener('change', () => activateTab(fltCat.value));
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
  if (cat && [...fltCat.options].some(o => o.value === cat)) currentCat = cat;
  fltCat.value = currentCat;
  refreshCustomSelectLabels();
  activateTab(currentCat);
})();

window.__uf_onLangChangePage = applyFilters;
