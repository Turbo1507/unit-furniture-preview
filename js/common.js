/* UNIT.FURNITURE — общий слой всех страниц:
   i18n-хелперы, корзина заявки (localStorage — живёт между страницами),
   рендер карточек товара, шапка, reveal, мобильная CTA-планка. */

/* защита от XSS при переходе данных на CMS/API в будущем */
function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}

/* QA-режим: headless-скриншоты без промежуточных состояний анимаций */
const QA = navigator.webdriver || /[?&]qa=1/.test(location.search);
if (QA) document.documentElement.classList.add('qa');

/* ---------- i18n helpers ---------- */
function t(key) {
  const lang = window.__uf_lang || 'ru';
  const dict = (window.I18N && window.I18N[lang]) || {};
  return dict[key] != null ? dict[key] : key;
}
function catLabel(cat) { return t(window.CAT_LABEL_KEY[cat] || cat); }

/* иконки-заглушки для карточек без готового фото (студийные снимки ещё не сделаны) */
const CAT_ICON_PATHS = {
  beds:    '<path d="M3 18v-4a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v4"/><path d="M3 18v2M21 18v2"/><path d="M3 12v-1a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v1"/>',
  sofas:   '<path d="M5 11V8a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v3"/><rect x="3" y="11" width="18" height="6" rx="1.5"/><path d="M4 17v1.5M20 17v1.5"/>',
  chairs:  '<path d="M6 12V8a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v4"/><path d="M4 12h16v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1z"/><path d="M6 18v1.5M18 18v1.5"/>',
  outdoor: '<path d="M2 16h5l3-5h9a2 2 0 0 1 2 2v1"/><path d="M2 16v2M21 14v4"/><circle cx="6" cy="9" r="1.5"/>',
  textile: '<rect x="5" y="5" width="14" height="14" rx="4"/><path d="M9 9l6 6M15 9l-6 6"/>'
};
function catIcon(cat) {
  const path = CAT_ICON_PATHS[cat] || CAT_ICON_PATHS.sofas;
  return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.3">${path}</svg>`;
}
function photoPlaceholder(cat) {
  return `<div class="p-placeholder">${catIcon(cat)}<span>${t('ph.soon')}</span></div>`;
}
function trSpecKey(k) {
  if ((window.__uf_lang || 'ru') === 'ru') return k;
  return (window.SPEC_TR.keys[k]) || k;
}
function trSpecVal(v) {
  if ((window.__uf_lang || 'ru') === 'ru') return v;
  return (window.SPEC_TR.values[v]) || v;
}
function trDims(d) {
  if (d === '—') return t('p.dims_unknown');
  return (window.__uf_lang || 'ru') === 'en' ? d.replace(' мм', '\u00a0mm') : d.replace(' мм', '\u00a0мм');
}
function trName(name) {
  if ((window.__uf_lang || 'ru') !== 'en') return name;
  let out = name;
  Object.entries(window.NAME_SUFFIX_TR).forEach(([ru, en]) => { out = out.replace(ru, en); });
  return out;
}
function productById(id) { return (window.PRODUCTS || []).find(p => p.id === id); }

/* куда ведёт «оформить заявку» с этой страницы (index: #request, остальные: contacts.html#form) */
const REQUEST_URL = document.body.dataset.requestUrl || 'contacts.html#form';

/* ---------- корзина заявки: persist в localStorage, работает на всех страницах ---------- */
const reqIds = new Set();
try { JSON.parse(localStorage.getItem('uf_cart') || '[]').forEach(id => { if (productById(id)) reqIds.add(id); }); } catch (e) {}

const reqQty = {};
try { Object.assign(reqQty, JSON.parse(localStorage.getItem('uf_cart_qty') || '{}')); } catch (e) {}
const qtyOf = id => Math.max(1, Math.min(99, parseInt(reqQty[id], 10) || 1));
function persistCart() {
  Object.keys(reqQty).forEach(id => { if (!reqIds.has(id)) delete reqQty[id]; });
  try { localStorage.setItem('uf_cart', JSON.stringify([...reqIds])); localStorage.setItem('uf_cart_qty', JSON.stringify(reqQty)); } catch (e) {}
}
function setQty(id, n) {
  if (n < 1) { reqIds.delete(id); } else { reqQty[id] = Math.min(99, n); }
  persistCart(); syncRequestUI();
}
/* список для заявки: то, что лежит в корзине, с количеством */
function cartLines() {
  return [...reqIds].map(id => { const p = productById(id); return { id, name: p.name, cat: p.cat, qty: qtyOf(id) }; });
}
function cartText() {
  return cartLines().map(l => l.name + ' × ' + l.qty).join('\n');
}
function plural(n, one, few, many) {
  const m10 = n % 10, m100 = n % 100;
  return m10 === 1 && m100 !== 11 ? one : m10 >= 2 && m10 <= 4 && (m100 < 12 || m100 > 14) ? few : many;
}
function cartCountLabel() {
  const n = cartLines().reduce((s, l) => s + l.qty, 0);
  return (document.documentElement.lang === 'en') ? n + (n === 1 ? ' item' : ' items') : n + ' ' + plural(n, 'позиция', 'позиции', 'позиций');
}
function toggleRequest(id) {
  reqIds.has(id) ? reqIds.delete(id) : reqIds.add(id);
  persistCart();
  syncRequestUI();
}
function addRequest(id) {
  if (!reqIds.has(id)) { reqIds.add(id); persistCart(); syncRequestUI(); }
}
function syncAddButtons() {
  document.querySelectorAll('.p-add').forEach(b => {
    const on = reqIds.has(b.dataset.add);
    b.classList.toggle('added', on);
    b.textContent = on ? '✓' : '+';
    const pr = productById(b.dataset.add);
    b.setAttribute('aria-label', t(on ? 'p.del.aria' : 'p.add.aria') + (pr ? ': ' + trName(pr.name) : ''));
    b.setAttribute('aria-pressed', on ? 'true' : 'false');
  });
  document.querySelectorAll('[data-req]').forEach(b => {
    const on = reqIds.has(b.dataset.req);
    b.classList.toggle('added', on);
    b.textContent = on ? t('p.in_request') : t('p.request');
  });
}
function syncRequestUI() {
  syncAddButtons();
  const reqCountIcon = document.getElementById('reqCountIcon');
  if (reqCountIcon) {
    reqCountIcon.hidden = reqIds.size === 0;
    reqCountIcon.textContent = reqIds.size;
  }
  const reqChips = document.getElementById('reqChips');
  if (reqChips) {
    reqChips.innerHTML = [...reqIds].map(id => {
      const p = productById(id);
      const q = qtyOf(id);
      return `<button type="button" class="chip" data-del="${p.id}">${escapeHtml(trName(p.name))}${q > 1 ? ' × ' + q : ''}<span>✕</span></button>`;
    }).join('');
    const prev = document.getElementById('reqCartPreview');
    if (prev) prev.hidden = reqIds.size === 0;
  }
  renderCart();
}

/* ---------- cart drawer ---------- */
const cartEl = document.getElementById('cart');
const cartOverlay = document.getElementById('cartOverlay');
const cartList = document.getElementById('cartList');

function renderCart() {
  if (!cartList) return;
  const empty = reqIds.size === 0;
  if (cartEl) cartEl.classList.toggle('is-empty', empty);
  const cnt = document.getElementById('cartCount');
  if (cnt) cnt.textContent = empty ? '' : cartCountLabel();
  if (empty) {
    cartList.innerHTML = `<div class="cart-empty">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 11V8a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v3"/><rect x="3" y="11" width="18" height="6" rx="1.5"/><path d="M4 17v1.5M20 17v1.5"/></svg>
      <h4>${t('cart.empty_t')}</h4>
      <p>${t('cart.empty')}</p>
      <a class="btn btn-line" href="catalog.html">${t('cart.to_catalog')}</a>
    </div>`;
    return;
  }
  cartList.innerHTML = [...reqIds].map(id => {
    const p = productById(id);
    const nm = escapeHtml(trName(p.name)), q = qtyOf(id);
    const thumb = p.img
      ? `<img src="${p.img}" alt="${nm}">`
      : `<div class="cart-item-ph">${catIcon(p.cat)}</div>`;
    return `<div class="cart-item">
      <a class="cart-item-img" href="product.html?id=${p.id}">${thumb}</a>
      <div class="cart-item-main">
        <a class="cart-item-name" href="product.html?id=${p.id}">${nm}</a>
        <div class="cart-item-cat">${escapeHtml(catLabel(p.cat))}</div>
        <div class="cart-item-row">
          <div class="qty" role="group" aria-label="${escapeHtml(t('cart.qty'))}">
            <button type="button" data-qty="${p.id}" data-d="-1" aria-label="${escapeHtml(t('cart.minus'))}">−</button>
            <span>${q}</span>
            <button type="button" data-qty="${p.id}" data-d="1" aria-label="${escapeHtml(t('cart.plus'))}">+</button>
          </div>
          <button type="button" class="cart-item-del" data-del="${p.id}" aria-label="${escapeHtml(t('p.del.aria') + ': ' + trName(p.name))}">${t('cart.remove')}</button>
        </div>
      </div>
    </div>`;
  }).join('');
}
function openCart() {
  if (!cartEl) return;
  renderCart();
  cartOverlay.hidden = false;
  requestAnimationFrame(() => {
    cartOverlay.classList.add('show');
    cartEl.classList.add('open');
    cartEl.setAttribute('aria-hidden', 'false');
    const x = document.getElementById('cartClose');
    if (x) x.focus();
  });
  document.body.style.overflow = 'hidden';
}
function closeCart() {
  if (!cartEl) return;
  cartOverlay.classList.remove('show');
  cartEl.classList.remove('open');
  const back = cartEl.contains(document.activeElement);
  cartEl.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
  if (back) { const b = document.getElementById('cartBtn'); if (b) b.focus(); }
  setTimeout(() => { cartOverlay.hidden = true; }, 320);
}
if (cartEl) {
  const cartBtn = document.getElementById('cartBtn');
  if (cartBtn) cartBtn.addEventListener('click', openCart);
  document.getElementById('cartClose').addEventListener('click', closeCart);
  cartOverlay.addEventListener('click', closeCart);
  cartList.addEventListener('click', e => {
    const qb = e.target.closest('[data-qty]');
    if (qb) { setQty(qb.dataset.qty, qtyOf(qb.dataset.qty) + Number(qb.dataset.d)); return; }
    const del = e.target.closest('[data-del]');
    if (del) toggleRequest(del.dataset.del);
  });
  document.getElementById('cartCheckout').addEventListener('click', () => {
    closeCart();
    if (REQUEST_URL.startsWith('#')) {
      const target = document.querySelector(REQUEST_URL);
      if (target) { target.scrollIntoView({ behavior: 'smooth' }); return; }
    }
    location.href = REQUEST_URL;
  });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeCart(); });
}

/* ---------- рендер карточек товара (каталог, витрины, «похожие модели») ---------- */
function productCard(p, opt = {}) {
  const studio = opt.studio || !p.life;
  const photo = studio ? p.img : p.life;
  const teak = Object.values(p.specs).some(v => /тик/i.test(v));
  const tags = [
    `<span class="p-tag">${t(p.env === 'outdoor' ? 'tag.outdoor' : 'tag.indoor')}</span>`,
    `<span class="p-tag">${t('tag.custom')}</span>`,
    p.fabric ? `<span class="p-tag">${t('tag.fabric')}</span>` : ''
  ].join('');
  return `
  <article class="product" data-id="${p.id}">
    <a class="p-media${photo && studio ? ' is-studio-bg' : ''}" href="product.html?id=${p.id}" aria-label="${escapeHtml(trName(p.name))}">
      ${photo
        ? `<img class="p-photo${studio ? ' is-studio' : ''}${p.cat === 'textile' ? ' is-small' : ''}" src="${photo}" alt="${escapeHtml(trName(p.name))}" loading="lazy">`
        : photoPlaceholder(p.cat)}
      ${teak ? `<span class="p-badge">${escapeHtml(t('badge.teak'))}</span>` : ''}
      <button class="p-add" data-add="${p.id}" type="button">+</button>
    </a>
    <div class="p-meta">
      <div class="p-cat-row"><span class="p-cat">${escapeHtml(catLabel(p.cat))}</span></div>
      <h3 class="p-name"><a href="product.html?id=${p.id}">${escapeHtml(trName(p.name))}</a></h3>
      <p class="p-dims">${escapeHtml(trDims(p.dims))}</p>
      <div class="p-tags">${tags}</div>
      <div class="p-foot">
        <span class="p-price">${t('p.price')}</span>
        <a class="p-link" href="product.html?id=${p.id}">${t('p.more')}</a>
      </div>
    </div>
  </article>`;
}
function renderProductsInto(el, list, opt) {
  el.innerHTML = list.map(p => productCard(p, opt)).join('');
  syncAddButtons();
}
let toastT;
function cartToast(on) {
  let el = document.getElementById('cartToast');
  if (!el) {
    el = document.createElement('div');
    el.id = 'cartToast'; el.className = 'cart-toast'; el.setAttribute('role', 'status');
    document.body.appendChild(el);
    el.addEventListener('click', e => { if (e.target.closest('button')) { el.classList.remove('show'); openCart(); } });
  }
  el.innerHTML = `<span>${t(on ? 'cart.added' : 'cart.removed')}: ${reqIds.size}</span><button type="button">${t('cart.open')}</button>`;
  el.classList.add('show');
  clearTimeout(toastT);
  toastT = setTimeout(() => el.classList.remove('show'), 4000);
}
document.addEventListener('click', e => {
  const add = e.target.closest('.p-add');
  if (add) { e.preventDefault(); e.stopPropagation(); toggleRequest(add.dataset.add); cartToast(reqIds.has(add.dataset.add)); }
});

/* ---------- scroll progress ---------- */
const bar = document.getElementById('scrollBar');
if (bar) {
  let scrollTicking = false;
  addEventListener('scroll', () => {
    if (scrollTicking) return;
    scrollTicking = true;
    requestAnimationFrame(() => {
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      bar.style.width = (max > 0 ? (h.scrollTop / max) * 100 : 0) + '%';
      scrollTicking = false;
    });
  }, { passive: true });
}

/* ---------- reveal on scroll ---------- */
const io = new IntersectionObserver(entries => {
  entries.forEach(en => {
    if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
  });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

/* ---------- burger ---------- */
const burger = document.getElementById('burger');
const nav = document.getElementById('nav');
const siteHeader = document.querySelector('.site-header');
function closeNav() {
  burger.classList.remove('open');
  burger.setAttribute('aria-expanded', 'false');
  nav.classList.remove('open');
  document.body.style.overflow = '';
  if (window.__uf_syncHeaderTransparency) window.__uf_syncHeaderTransparency();
}
if (burger && nav) {
  burger.addEventListener('click', () => {
    const opening = !nav.classList.contains('open');
    burger.classList.toggle('open', opening);
    burger.setAttribute('aria-expanded', String(opening));
    nav.classList.toggle('open', opening);
    if (opening) {
      /* хедер всегда сплошной, пока меню открыто — прозрачность поверх hero тут неуместна */
      if (siteHeader) siteHeader.classList.remove('is-transparent');
      document.body.style.overflow = 'hidden';
    } else {
      closeNav();
    }
  });
  nav.addEventListener('click', e => { if (e.target.tagName === 'A') closeNav(); });
}

/* подсветка текущего раздела в меню */
(function markActiveNav() {
  const page = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav a').forEach(a => {
    const href = a.getAttribute('href') || '';
    if (href.split('#')[0] === page) a.classList.add('is-here');
  });
})();

/* ---------- spotlight on product cards ---------- */
document.addEventListener('mousemove', e => {
  const card = e.target.closest && e.target.closest('.product');
  if (!card) return;
  const r = card.getBoundingClientRect();
  card.style.setProperty('--mx', (e.clientX - r.left) + 'px');
  card.style.setProperty('--my', (e.clientY - r.top) + 'px');
}, { passive: true });

/* ---------- кастомный дропдаун: оборачивает нативный <select>, держит его в синхроне ---------- */
function buildCustomSelect(select) {
  if (select.closest('.csel')) return;
  const wrap = document.createElement('div');
  wrap.className = 'csel';
  select.parentNode.insertBefore(wrap, select);
  select.classList.add('csel-native');
  wrap.appendChild(select);

  const btn = document.createElement('button');
  btn.type = 'button';
  btn.className = 'csel-btn';
  btn.innerHTML = `<span class="csel-label"></span><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9l6 6 6-6"/></svg>`;
  wrap.appendChild(btn);

  const list = document.createElement('ul');
  list.className = 'csel-list';
  wrap.appendChild(list);

  function render() {
    list.innerHTML = '';
    [...select.options].forEach(o => {
      const li = document.createElement('li');
      li.className = 'csel-opt' + (o.value === select.value ? ' is-sel' : '');
      li.textContent = o.textContent;
      li.dataset.value = o.value;
      list.appendChild(li);
    });
    const sel = select.options[select.selectedIndex];
    btn.querySelector('.csel-label').textContent = sel ? sel.textContent : '';
  }
  render();
  wrap._render = render;

  btn.addEventListener('click', () => {
    document.querySelectorAll('.csel.open').forEach(o => { if (o !== wrap) o.classList.remove('open'); });
    wrap.classList.toggle('open');
  });
  list.addEventListener('click', e => {
    const li = e.target.closest('.csel-opt');
    if (!li) return;
    select.value = li.dataset.value;
    select.dispatchEvent(new Event('change', { bubbles: true }));
    render();
    wrap.classList.remove('open');
  });
  document.addEventListener('click', e => { if (!wrap.contains(e.target)) wrap.classList.remove('open'); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') wrap.classList.remove('open'); });
}
function initCustomSelects() { document.querySelectorAll('.filters select, .form select').forEach(buildCustomSelect); }
function refreshCustomSelectLabels() { document.querySelectorAll('.csel').forEach(w => w._render && w._render()); }
initCustomSelects();

/* ---------- ссылки на юр.страницы: открывать на текущем языке сайта ---------- */
function syncLegalLinks() {
  const lang = window.__uf_lang || 'ru';
  document.querySelectorAll('a[href^="consent.html"], a[href^="legal.html"]').forEach(a => {
    const [path, hash] = a.getAttribute('href').split('#');
    const file = path.split('?')[0];
    a.setAttribute('href', `${file}?lang=${lang}${hash ? '#' + hash : ''}`);
  });
}

/* ---------- кастомная кнопка загрузки файла: браузер не переводит "Выбрать файлы" по lang сайта ---------- */
function refreshFileLabel() {
  const input = document.getElementById('fFile');
  const label = document.getElementById('fFileName');
  if (!input || !label) return;
  const n = input.files ? input.files.length : 0;
  label.textContent = n === 0 ? t('f.file_none') : n === 1 ? t('f.file_one') : t('f.file_many').replace('{n}', n);
}
document.getElementById('fFile') && document.getElementById('fFile').addEventListener('change', refreshFileLabel);
refreshFileLabel();

/* ---------- language switch (шапка + футер) ---------- */
window.__uf_onLangChange = function () {
  syncRequestUI();
  syncLegalLinks();
  refreshCustomSelectLabels();
  refreshFileLabel();
  if (window.__uf_onLangChangePage) window.__uf_onLangChangePage();
  fitBento();
  initDots();
  rebuildDots();
};
document.querySelectorAll('.lang-switch').forEach(sw => {
  sw.addEventListener('click', e => {
    const b = e.target.closest('[data-lang]');
    if (b) window.setLang(b.dataset.lang);
  });
});
(function initLang() {
  let saved = 'ru';
  try { saved = localStorage.getItem('uf_lang') || 'ru'; } catch (e) {}
  // прошлая версия на этом адресе хранила язык в кавычках ("ru"), без чистки словарь не находится
  saved = String(saved).replace(/"/g, '');
  if (saved !== 'en') saved = 'ru';
  const urlLang = new URLSearchParams(location.search).get('lang');
  window.setLang(urlLang === 'en' || urlLang === 'ru' ? urlLang : saved);
})();
syncRequestUI();

/* ---------- форма заявки (index + contacts) ---------- */
const form = document.getElementById('leadForm');
if (form) {
  /* подстановка «Что нужно подобрать» из последней модели, положенной в корзину на странице товара */
  const fTopic = document.getElementById('fTopic');
  if (fTopic) {
    let lastCat = null;
    try { lastCat = localStorage.getItem('uf_last_topic'); } catch (e) {}
    if (lastCat && window.CAT_LABEL_KEY && window.CAT_LABEL_KEY[lastCat]) {
      const opt = fTopic.querySelector(`[data-i18n="${window.CAT_LABEL_KEY[lastCat]}"]`);
      if (opt) opt.selected = true;
      try { localStorage.removeItem('uf_last_topic'); } catch (e) {}
    }
  }
  const scopeSel = document.getElementById('fScope');
  const bulkNote = document.getElementById('bulkNote');
  if (scopeSel && bulkNote) {
    const syncBulkNote = () => { bulkNote.hidden = scopeSel.value !== scopeSel.options[scopeSel.options.length - 1].value; };
    scopeSel.addEventListener('change', syncBulkNote);
    syncBulkNote();
  }
  const dl = document.getElementById('fDeadline');
  if (dl) { const d = new Date(); d.setMinutes(d.getMinutes() - d.getTimezoneOffset()); dl.min = d.toISOString().slice(0, 10); }
  const setErr = (f, bad) => {
    f.classList.toggle('err', bad);
    f.setAttribute('aria-invalid', bad ? 'true' : 'false');
    const msg = document.getElementById(f.id + 'Err');
    if (msg) msg.hidden = !bad;
  };
  /* ошибка гаснет, как только поле поправили */
  form.addEventListener('input', e => { if (e.target.classList.contains('err') && (e.target.type === 'checkbox' ? e.target.checked : e.target.value.trim())) setErr(e.target, false); });
  form.addEventListener('change', e => { if (e.target.type === 'checkbox' && e.target.checked) setErr(e.target, false); });
  form.addEventListener('submit', e => {
    e.preventDefault();
    const name = document.getElementById('fName');
    const phone = document.getElementById('fPhone');
    const email = document.getElementById('fEmail');
    const agree = document.getElementById('fAgree');
    const bad = [];
    { const b = !name.value.trim(); setErr(name, b); if (b) bad.push(name); }
    {
      const v = phone.value.trim();
      const ok = (v.replace(/\D/g, '').length >= 7) || /^@?[A-Za-z][\w.]{3,}$/.test(v);
      const msg = document.getElementById('fPhoneErr');
      if (msg) msg.textContent = t(v ? 'f.err.phone2' : 'f.err.phone');
      setErr(phone, !ok); if (!ok) bad.push(phone);
    }
    if (email) { const b = !!email.value.trim() && !email.checkValidity(); setErr(email, b); if (b) bad.push(email); }
    if (dl && dl.value && dl.value < dl.min) { dl.value = dl.min; }
    setErr(agree, !agree.checked); if (!agree.checked) bad.push(agree);
    if (bad.length) { bad[0].focus(); return; }
    const items = form.querySelector('[name="items"]');
    if (items) items.value = cartText();
    const fd = new FormData(form);
    const lead = { items: cartLines(), page: location.pathname.split('/').pop() || 'index.html', lang: document.documentElement.lang };
    fd.forEach((v, k) => { if (k !== 'items') lead[k] = typeof v === 'string' ? v.trim() : v; });
    window.__ufLead = lead;
    /* TODO: отправка в бот через unitdeveloper.com (как форма Спейса), включить после «да» */
    form.querySelector('.btn-submit').disabled = true;
    document.getElementById('formDone').hidden = false;
  });
}

// ссылка вида contacts.html?object=villa сразу выбирает тип объекта в форме
(() => {
  const sel = document.getElementById('fObject'), v = new URLSearchParams(location.search).get('object');
  const o = sel && v && sel.querySelector('option[data-i18n="f.o.' + v + '"]');
  if (o) o.selected = true;
})();

// бенто на телефоне: рядом только плитки с одинаковым числом строк, остальные во всю ширину
/* точки между пунктом и значением: отдельный элемент, а не ::after */
function addLeaders() {
  document.querySelectorAll('.leaders > li, .mt-spec > div').forEach(r => {
    if (r.querySelector(':scope > .ldr')) return;
    const i = document.createElement('i'); i.className = 'ldr'; i.setAttribute('aria-hidden', 'true'); r.appendChild(i);
  });
}
addLeaders();

function fitBento() {
  document.querySelectorAll('.cz-bento').forEach(ul => {
    const tiles = [...ul.querySelectorAll('.cz-tile')];
    tiles.forEach(t => { t.classList.remove('m-full'); t.style.order = ''; });
    ul.querySelectorAll('.cz-photo').forEach(p => { p.style.order = ''; });
    if (!matchMedia('(max-width: 720px)').matches) return;
    const lines = tiles.map(t => { const s = t.lastElementChild; return Math.round(s.getBoundingClientRect().height / parseFloat(getComputedStyle(s).lineHeight)); });
    // пару берём ближайшую дальше по списку, порядок меняем через order; фото коллажа остаются первым и последним
    const used = new Set();
    let n = 0;
    tiles.forEach((t, i) => {
      if (used.has(i)) return;
      used.add(i); t.style.order = ++n;
      const j = tiles.findIndex((u, k) => k > i && !used.has(k) && lines[k] === lines[i]);
      if (j < 0) { t.classList.add('m-full'); return; }
      used.add(j); tiles[j].style.order = ++n;
    });
    const ph = ul.querySelectorAll('.cz-photo');
    if (ph.length) { ph[0].style.order = 0; ph[ph.length - 1].style.order = n + 1; }
  });
}
addEventListener('resize', fitBento);
document.fonts && document.fonts.ready.then(fitBento);
fitBento();

/* ---------- направления + ряды моделей (главная, mix.html) ---------- */
const MIX_ROWS = [
  { dir: 1, img: 'assets/n/dir-home.jpg', href: 'catalog.html', ids: ['sofaAna', 'bed3', 'sofaObs', 'ch7', 'bed1', 'ch8', 'sofaA', 'ch4'] },
  { dir: 2, rev: true, img: 'assets/n/dir-outdoor.jpg', href: 'catalog.html?env=outdoor', ids: ['out4', 'out5', 'out3', 'out1', 'out2', 'pilOut'] },
  { dir: 3, img: 'assets/n/dir-commercial.jpg', href: 'catalog.html?cat=commercial', ids: ['sofaRec', 'ch6', 'ch1', 'ch2', 'ch3', 'ch9', 'ch5'] },
];
const mixCards = (ids, n) => ids.map(productById).filter(Boolean).slice(0, n).map(p => productCard(p, { studio: true })).join('');

/* А: заголовок направления, короткое описание, сетка из 4 моделей */
function renderMixA() {
  const el = document.getElementById('mixRowsA');
  if (!el) return;
  el.innerHTML = MIX_ROWS.map(r => `
    <div class="feat-row">
      <div class="feat-head mixa-head">
        <div>
          <h3>${t('dir.' + r.dir + '.t')}</h3>
          <p>${glueShort(t('dir.' + r.dir + '.p'))}</p>
        </div>
        <a class="feat-more" href="${r.href}">${t('feat.more')}</a>
      </div>
      <div class="products feat-grid">${mixCards(r.ids, 4)}</div>
    </div>`).join('');
}

/* В: карточка категории стоит в ленте среди моделей и листается вместе с ними */
const MIXC_POS = [0, 2, 1];
const MIXC_HREF = { 1: 'catalog.html?env=indoor' };
const MIXC_GO = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M7 17L17 7M9 7h8v8"/></svg>';
const MIXC_ARR = (cls, d, lbl) => `<button class="mixb-arr ${cls}" type="button" aria-label="${lbl}"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="${d}"/></svg></button>`;
/* sep: названия над рядами и линии между рядами; lines: название в карточке, только линии; heads: названия над рядами без линий */
const MIXC_WIDE = matchMedia('(min-width: 721px)');
function renderMixRows(id, mode) {
  const el = document.getElementById(id);
  if (!el) return;
  if (!el.dataset.mq) { el.dataset.mq = 1; MIXC_WIDE.addEventListener('change', () => { renderMixRows(id, mode); syncAddButtons(); }); }
  el.innerHTML = MIX_ROWS.map((r, k) => {
    const title = t('dir.' + r.dir + '.t');
    const cards = r.ids.map(productById).filter(Boolean).slice(0, 8).map(p => productCard(p, { studio: true }));
    // на телефоне карточка категории всегда первая
    cards.splice(MIXC_WIDE.matches ? MIXC_POS[k] || 0 : 0, 0, `
        <a class="dir-card mixc-cat" href="${MIXC_HREF[r.dir] || r.href}"${mode === 'lines' ? '' : ` aria-label="${title}"`}>
          <img src="${r.img}" alt="">
          <span class="mixc-go" aria-hidden="true">${MIXC_GO}</span>
          <div class="dir-in">
            ${mode === 'lines' ? `<h3>${title}</h3>` : ''}
            <p>${glueShort(t('dir.' + r.dir + '.p'))}</p>
          </div>
        </a>`);
    return `
    <div class="mixc-row">
      ${mode === 'lines' ? '' : `<h3 class="mixc-sep">${title}</h3>`}
      <div class="mixb-rail mixc-rail">
        <div class="products mixc-track">${cards.join('')}</div>
        ${MIXC_ARR('is-prev', 'M15 5l-7 7 7 7', '←')}
        ${MIXC_ARR('is-next', 'M9 5l7 7-7 7', '→')}
      </div>
    </div>`;
  }).join('');
  el.querySelectorAll('.mixc-rail').forEach(rail => {
    const track = rail.querySelector('.mixc-track');
    track.querySelectorAll('img[loading]').forEach(i => i.removeAttribute('loading'));
    const prev = rail.querySelector('.is-prev'), next = rail.querySelector('.is-next');
    const step = () => { const c = track.querySelector('.product'); return c ? c.getBoundingClientRect().width + parseFloat(getComputedStyle(track).columnGap || 0) : track.clientWidth; };
    const sync = () => {
      prev.disabled = track.scrollLeft < 4;
      next.disabled = track.scrollLeft + track.clientWidth > track.scrollWidth - 4;
    };
    prev.addEventListener('click', () => track.scrollBy({ left: -step(), behavior: 'smooth' }));
    next.addEventListener('click', () => track.scrollBy({ left: step(), behavior: 'smooth' }));
    track.addEventListener('scroll', sync, { passive: true });
    sync();
  });
}

/* Б: фото направления + ряд моделей той же высоты, стрелки листают на одну карточку */
const MIXB_WIDE = matchMedia('(min-width: 721px)');
function renderMixB() {
  const el = document.getElementById('mixRowsB');
  if (!el) return;
  if (!el.dataset.mq) { el.dataset.mq = 1; MIXB_WIDE.addEventListener('change', () => { renderMixB(); syncAddButtons(); }); }
  // на главной на ПК вариант В (названия над рядами), на телефоне Б
  const wide = el.dataset.wide && MIXB_WIDE.matches;
  el.className = wide ? 'mixc-rows is-' + el.dataset.wide : 'mixb-rows';
  if (wide) return renderMixRows(el.id, el.dataset.wide);
  el.innerHTML = MIX_ROWS.map(r => {
    // в зеркальном ряду лента справа налево: первые карточки у фото, остальные уходят влево
    const rev = r.rev && MIXB_WIDE.matches;
    const ids = rev ? r.ids.slice(0, 3).reverse().concat(r.ids.slice(3)) : r.ids;
    return `
    <div class="mixb-row${rev ? ' is-rev' : ''}">
      <a class="dir-card mixb-photo" href="${r.href}"><span class="tile-go" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M7 17L17 7M9 7h8v8"/></svg></span>
        <img src="${r.img}" alt="" loading="lazy">
        <div class="dir-in">
          <h3>${t('dir.' + r.dir + '.t')}</h3>
          <p>${glueShort(t('dir.' + r.dir + '.p'))}</p>
        </div>
      </a>
      <div class="mixb-rail">
        <div class="products mixb-track">${mixCards(ids, 8)}</div>
        <button class="mixb-arr is-prev" type="button" aria-label="←" disabled><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M15 5l-7 7 7 7"/></svg></button>
        <button class="mixb-arr is-next" type="button" aria-label="→"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M9 5l7 7-7 7"/></svg></button>
      </div>
    </div>`; }).join('');
  el.querySelectorAll('.mixb-rail').forEach(rail => {
    const track = rail.querySelector('.mixb-track');
    track.querySelectorAll('img[loading]').forEach(i => i.removeAttribute('loading'));
    const prev = rail.querySelector('.is-prev'), next = rail.querySelector('.is-next');
    const dir = rail.closest('.is-rev') ? -1 : 1;
    const step = () => { const c = track.querySelector('.product'); return c ? c.getBoundingClientRect().width + parseFloat(getComputedStyle(track).columnGap || 0) : track.clientWidth; };
    const sync = () => {
      const x = Math.abs(track.scrollLeft);
      (dir > 0 ? prev : next).disabled = x < 4;
      (dir > 0 ? next : prev).disabled = x + track.clientWidth > track.scrollWidth - 4;
    };
    prev.addEventListener('click', () => track.scrollBy({ left: -step(), behavior: 'smooth' }));
    next.addEventListener('click', () => track.scrollBy({ left: step(), behavior: 'smooth' }));
    track.addEventListener('scroll', sync, { passive: true });
    window.addEventListener('resize', sync);
    sync();
  });
}


/* ---------- точки под лентами и фото-слайдерами ---------- */
function addDots(track, mobOnly) {
  if (!track || track.__dots) return;
  const box = document.createElement('div');
  box.className = 'dots' + (mobOnly ? ' dots-mob' : '');
  track.after(box);
  track.__dots = box;
  let stops = [];
  const measure = () => {
    const tr = track.getBoundingClientRect(), pad = parseFloat(getComputedStyle(track).scrollPaddingLeft) || 0;
    const max = track.scrollWidth - track.clientWidth, out = [];
    if (max < 2) return [0];
    [...track.children].forEach(c => {
      if (!c.getClientRects().length) return;
      const x = Math.max(0, Math.min(max, c.getBoundingClientRect().left - tr.left + track.scrollLeft - pad));
      if (!out.length || x - out[out.length - 1] > 8) out.push(x);
    });
    return out;
  };
  const sync = () => {
    const x = track.scrollLeft;
    let k = 0;
    stops.forEach((s, i) => { if (Math.abs(s - x) < Math.abs(stops[k] - x)) k = i; });
    box.querySelectorAll('button').forEach((b, i) => b.setAttribute('aria-current', i === k ? 'true' : 'false'));
    if (track.__onSlide) track.__onSlide(k);
  };
  track.__rebuild = () => {
    stops = measure();
    box.hidden = stops.length < 2;
    box.innerHTML = stops.length < 2 ? '' : stops.map((_, i) => `<button type="button" aria-label="${i + 1} / ${stops.length}"><i></i></button>`).join('');
    sync();
  };
  track.__goTo = i => track.scrollTo({ left: stops[i] || 0, behavior: 'smooth' });
  box.addEventListener('click', e => {
    const b = e.target.closest('button');
    if (b) track.__goTo([...box.children].indexOf(b));
  });
  let raf = 0;
  track.addEventListener('scroll', () => { cancelAnimationFrame(raf); raf = requestAnimationFrame(sync); }, { passive: true });
  track.__rebuild();
}
// var, а не const: initDots зовётся из setLang раньше, чем сюда дойдёт файл
var DOT_TRACKS = [['.sl-track', 0], ['.home .mat-strip', 1], ['.co-grid', 1], ['.home #projGrid', 1], ['.mixb-track', 1], ['.mixc-track', 1]];
function initDots() {
  if (!DOT_TRACKS) return;
  DOT_TRACKS.forEach(([sel, mob]) => document.querySelectorAll(sel).forEach(tr => addDots(tr, mob)));
}
function rebuildDots() {
  if (!DOT_TRACKS) return;
  DOT_TRACKS.forEach(([sel]) => document.querySelectorAll(sel).forEach(tr => tr.__rebuild && tr.__rebuild()));
}

/* фото-слайдер из рамки с data-slides="a.jpg|b.jpg": первый кадр уже в разметке, остальные грузим, когда рамка близко */
function initPhotoSliders() {
  document.querySelectorAll('[data-slides]').forEach(box => {
    if (box.querySelector('.sl-track')) return;
    const first = box.querySelector('img');
    if (!first) return;
    const track = document.createElement('div');
    track.className = 'sl-track';
    const slide = img => { const s = document.createElement('div'); s.className = 'sl-slide'; s.appendChild(img); track.appendChild(s); };
    slide(first);
    box.dataset.slides.split('|').filter(Boolean).forEach(src => {
      const im = document.createElement('img');
      im.dataset.src = src; im.alt = first.alt; im.decoding = 'async';
      slide(im);
    });
    box.appendChild(track);
    const load = () => track.querySelectorAll('img[data-src]').forEach(im => { im.src = im.dataset.src; im.removeAttribute('data-src'); });
    if ('IntersectionObserver' in window) {
      const io = new IntersectionObserver(es => { if (es.some(e => e.isIntersecting)) { load(); io.disconnect(); } }, { rootMargin: '400px' });
      io.observe(box);
    } else load();
  });
}
initPhotoSliders();
window.addEventListener('DOMContentLoaded', initDots);
window.addEventListener('load', rebuildDots);
let dotsTimer = 0;
window.addEventListener('resize', () => { clearTimeout(dotsTimer); dotsTimer = setTimeout(rebuildDots, 150); });

/* ссылка с #якорем: после догрузки фото и шрифтов страница могла уехать, ставим блок на место ещё раз */
if (location.hash.length > 1) {
  let touched = false;
  ['wheel', 'touchstart', 'keydown', 'mousedown'].forEach(ev => window.addEventListener(ev, () => { touched = true; }, { once: true, passive: true }));
  const reAnchor = () => {
    if (touched) return;
    let el = null;
    try { el = document.getElementById(decodeURIComponent(location.hash.slice(1))); } catch (e) {}
    if (!el) return;
    const html = document.documentElement, sb = html.style.scrollBehavior;
    html.style.scrollBehavior = 'auto';
    el.scrollIntoView({ block: 'start' });
    html.style.scrollBehavior = sb;
  };
  window.addEventListener('load', () => { reAnchor(); setTimeout(reAnchor, 500); });
}
