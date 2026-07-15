/* UNIT.FURNITURE — страница товара: рендер по ?id= из data.js */

const params = new URLSearchParams(location.search);
const product = productById(params.get('id')) || window.PRODUCTS[0];

const ppMain = document.getElementById('ppMain');
const ppImg = document.getElementById('ppImg');
const ppThumbs = document.getElementById('ppThumbs');

/* галерея: студийное фото + интерьерное, если есть */
const photos = [{ src: product.img, life: false }];
if (product.life) photos.push({ src: product.life, life: true });

function showPhoto(i) {
  ppImg.src = photos[i].src;
  ppImg.alt = trName(product.name);
  ppMain.classList.toggle('is-life', photos[i].life);
  ppThumbs.querySelectorAll('button').forEach((b, bi) => b.classList.toggle('on', bi === i));
}
ppThumbs.innerHTML = photos.map((ph, i) =>
  `<button type="button" data-i="${i}"${i === 0 ? ' class="on"' : ''}><img src="${ph.src}" alt=""></button>`).join('');
ppThumbs.addEventListener('click', e => {
  const b = e.target.closest('button');
  if (b) showPhoto(+b.dataset.i);
});
if (photos.length < 2) ppThumbs.style.display = 'none';
showPhoto(0);

function renderInfo() {
  document.title = trName(product.name) + ' — UNIT.FURNITURE';
  document.getElementById('crumbs').innerHTML =
    `<a href="index.html">${t('crumb.home')}</a><span>/</span>` +
    `<a href="catalog.html">${t('nav.catalog')}</a><span>/</span>` +
    `<a href="catalog.html?cat=${product.cat}">${catLabel(product.cat)}</a><span>/</span>` +
    `<span>${escapeHtml(trName(product.name))}</span>`;
  document.getElementById('ppCat').textContent = catLabel(product.cat);
  document.getElementById('ppName').textContent = trName(product.name);
  document.getElementById('ppDesc').innerHTML = t('d.' + product.cat);
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
}

document.getElementById('ppRequest').addEventListener('click', () => {
  addRequest(product.id);
  openCart();
});

/* похожие модели: та же категория, потом та же среда */
const similar = window.PRODUCTS
  .filter(p => p.id !== product.id)
  .sort((a, b) => (b.cat === product.cat) - (a.cat === product.cat) || (b.env === product.env) - (a.env === product.env))
  .slice(0, 3);
renderProductsInto(document.getElementById('similarGrid'), similar);

renderInfo();
window.__uf_onLangChangePage = function () {
  renderInfo();
  renderProductsInto(document.getElementById('similarGrid'), similar);
};
