/* UNIT.FURNITURE — страница товара: рендер по ?id= из data.js */

const params = new URLSearchParams(location.search);
// у статичной страницы модели id вписан при сборке, старые ссылки product?id= ведут на неё
const pid = window.UF_PID || params.get('id');
const product = productById(pid) || window.PRODUCTS[0];
// по битой ссылке не подсовываем первую модель: говорим, что её нет, и ведём в каталог
const missing = !productById(pid);
if (!window.UF_PID && !missing && document.documentElement.hasAttribute('data-static')) {
  params.delete('id');
  const q = params.toString();
  location.replace(prodHref(product) + (q ? '?' + q : '') + location.hash);
}
document.querySelectorAll('.pp-custom-link').forEach(a => { a.href = 'customization.html?model=' + product.id + '#form'; });

const ppMain = document.getElementById('ppMain');
const ppImg = document.getElementById('ppImg');
const ppThumbs = document.getElementById('ppThumbs');

/* галерея как в v2: интерьер, предметный снимок, кадры проектов с этой моделью */
const photos = (() => {
  const a = [];
  if (product.life) a.push({ src: product.life, life: true });
  if (product.img) a.push({ src: product.img });
  const key = (product.img || '').replace(/^.*\/p-|\.jpg$/g, '');
  const SI = window.SHOT_ITEMS || {};
  Object.keys(SI).forEach(k => { if (SI[k].includes(key)) a.push({ src: UF_ROOT + 'v2/assets/c26/proj-' + k + '.jpg', life: true }); });
  return a;
})();

const ppTrack = document.createElement('div');
ppTrack.className = 'sl-track pp-track';
function markThumb(i) {
  ppThumbs.querySelectorAll('button').forEach((b, bi) => b.classList.toggle('on', bi === i));
}
if (photos.length) {
  ppMain.innerHTML = '';
  ppTrack.innerHTML = photos.map(ph => `<div class="sl-slide ${ph.life ? 'is-life' : 'is-studio'}"><img src="${ph.src}" alt=""></div>`).join('');
  ppMain.appendChild(ppTrack);
  ppTrack.__onSlide = markThumb;
  ppThumbs.innerHTML = photos.map((ph, i) =>
    `<button type="button" data-i="${i}"${i === 0 ? ' class="on"' : ''} aria-label="${i + 1} / ${photos.length}"><img src="${ph.src}" alt=""${ph.life ? '' : ' class="studio"'}></button>`).join('');
  ppThumbs.addEventListener('click', e => {
    const b = e.target.closest('button');
    if (!b) return;
    markThumb(+b.dataset.i);
    if (ppTrack.__goTo) ppTrack.__goTo(+b.dataset.i);
    else ppTrack.scrollTo({ left: +b.dataset.i * ppTrack.clientWidth, behavior: 'smooth' });
  });
  if (photos.length < 2) ppThumbs.style.display = 'none';
} else {
  ppImg.hidden = true;
  ppThumbs.style.display = 'none';
  ppMain.insertAdjacentHTML('beforeend', photoPlaceholder(product.cat));
}

/* для поисковиков и превью ссылки: адрес, описание и разметка этой модели */
function seoProduct() {
  const can = document.querySelector('link[rel="canonical"]');
  if (!can || window.UF_PID) return;
  const base = can.href.replace(/[^/]*$/, ''), url = base + 'products/' + product.slug;
  const xd = document.querySelector('link[hreflang="x-default"]');
  const root = (xd ? xd.href : base).replace(/[^/]*$/, '');
  const abs = src => root + src.replace(/^(\.\.\/)+/, '').replace(/^v2\//, '');
  const name = trName(product.name, 'en');
  const desc = (t(window.CAT_LABEL_KEY[product.cat], 'en') + '. ' + t('d.' + product.cat, 'en')).replace(/<[^>]+>/g, '').replace(/\s+/g, ' ');
  const set = (sel, v) => { const m = document.querySelector(sel); if (m) m.setAttribute(sel.startsWith('link') ? 'href' : 'content', v); };
  can.href = url;
  document.querySelectorAll('link[hreflang]').forEach(l => { l.href = l.href.replace(/product(\?.*)?$/, 'products/' + product.slug); });
  set('meta[name="description"]', desc);
  set('meta[property="og:url"]', url); set('meta[property="og:title"]', name); set('meta[property="og:description"]', desc);
  if (photos.length) set('meta[property="og:image"]', abs(photos[0].src));
  let ld = document.getElementById('ldProduct');
  if (!ld) { ld = document.createElement('script'); ld.type = 'application/ld+json'; ld.id = 'ldProduct'; document.head.appendChild(ld); }
  ld.textContent = JSON.stringify({ '@context': 'https://schema.org', '@graph': [
    { '@type': 'Product', name, description: desc, url, category: catLabel(product.cat), image: photos.map(p => abs(p.src)),
      brand: { '@type': 'Brand', name: 'UNIT.FURNITURE' }, manufacturer: { '@id': base + '#org' } },
    { '@type': 'BreadcrumbList', itemListElement: [
      { '@type': 'ListItem', position: 1, name: t('crumb.home'), item: base },
      { '@type': 'ListItem', position: 2, name: t('nav.catalog'), item: base + 'catalog' },
      { '@type': 'ListItem', position: 3, name: catLabel(product.cat), item: base + 'catalog?cat=' + product.cat },
      { '@type': 'ListItem', position: 4, name, item: url }] }] });
}

function renderInfo() {
  document.title = trName(product.name, 'en') + ' | UNIT.FURNITURE';
  ppTrack.querySelectorAll('img').forEach(im => { im.alt = trName(product.name); });
  document.getElementById('crumbs').innerHTML =
    `<a href="index.html">${t('crumb.home')}</a><span>/</span>` +
    `<a href="catalog.html">${t('nav.catalog')}</a><span>/</span>` +
    `<a href="catalog.html?cat=${product.cat}">${catLabel(product.cat)}</a><span>/</span>` +
    `<span>${escapeHtml(trName(product.name))}</span>`;
  document.getElementById('ppCat').textContent = catLabel(product.cat);
  document.getElementById('ppName').textContent = trName(product.name);
  document.getElementById('ppDesc').innerHTML = glueShort(t('d.' + product.cat));
  document.getElementById('ppPrice').innerHTML = t('pp.price');

  const tags = [
    `<span class="p-tag">${t(product.env === 'outdoor' ? 'tag.outdoor' : 'tag.indoor')}</span>`,
    `<span class="p-tag">${t('tag.custom')}</span>`,
    product.fabric ? `<span class="p-tag">${t('tag.fabric')}</span>` : '',
    ...(product.use || []).map(u => `<span class="p-tag">${t('use.' + u)}</span>`)
  ].join('');
  document.getElementById('ppTags').innerHTML = tags;

  const rows = Object.entries(product.specs).map(([k, v]) =>
    `<tr><td>${escapeHtml(trSpecKey(k))}</td><td>${escapeHtml(trSpecVal(v))}</td></tr>`);
  rows.unshift(`<tr><td>${escapeHtml(t('qv.dims'))}</td><td>${escapeHtml(trDims(product.dims))}</td></tr>`);
  document.getElementById('ppSpecs').innerHTML = rows.join('');

  const reqBtn = document.getElementById('ppRequest');
  reqBtn.dataset.req = product.id;
  syncAddButtons();
  seoProduct();
}

document.getElementById('ppRequest').addEventListener('click', () => {
  addRequest(product.id);
  openCart();
});

/* похожие модели: та же категория, потом та же среда */
const similar = window.PRODUCTS
  .filter(p => p.id !== product.id)
  .sort((a, b) => (b.cat === product.cat) - (a.cat === product.cat) || (b.env === product.env) - (a.env === product.env))
  .slice(0, 4);
renderProductsInto(document.getElementById('similarGrid'), similar, { studio: true });

renderInfo();
window.__uf_onLangChangePage = function () {
  renderInfo();
  renderProductsInto(document.getElementById('similarGrid'), similar, { studio: true });
};

if (missing) {
  const grid = document.querySelector('#product .pp-grid');
  grid.style.display = 'none';
  const box = document.createElement('div');
  box.className = 'pp-missing';
  grid.after(box);
  const draw = () => {
    box.innerHTML = `<h1>${t('pp.missing.t')}</h1><p>${t('pp.missing.p')}</p><a class="btn btn-blue" href="catalog.html">${t('pp.missing.cta')}</a>`;
    document.title = t('pp.missing.t', 'en') + ' | UNIT.FURNITURE';
    const c = document.getElementById('crumbs'); if (c) c.style.display = 'none';
  };
  draw();
  const prev = window.__uf_onLangChangePage;
  window.__uf_onLangChangePage = function () { prev(); draw(); };
  const m = document.createElement('meta'); m.name = 'robots'; m.content = 'noindex'; document.head.appendChild(m);
}
