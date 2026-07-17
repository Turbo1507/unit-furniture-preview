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
  return (window.__uf_lang || 'ru') === 'en' ? d.replace(' мм', ' mm') : d;
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

function persistCart() {
  try { localStorage.setItem('uf_cart', JSON.stringify([...reqIds])); } catch (e) {}
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
      return `<button type="button" class="chip" data-del="${p.id}">${escapeHtml(trName(p.name))}<span>✕</span></button>`;
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
  if (reqIds.size === 0) {
    cartList.innerHTML = `<p class="cart-empty">${t('cart.empty')}</p>`;
    return;
  }
  cartList.innerHTML = [...reqIds].map(id => {
    const p = productById(id);
    return `<div class="cart-item">
      <img src="${p.img}" alt="${escapeHtml(trName(p.name))}">
      <div><div class="cart-item-name">${escapeHtml(trName(p.name))}</div><div class="cart-item-cat">${escapeHtml(catLabel(p.cat))}</div></div>
      <button type="button" class="cart-item-del" data-del="${p.id}" aria-label="✕">✕</button>
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
  });
  document.body.style.overflow = 'hidden';
}
function closeCart() {
  if (!cartEl) return;
  cartOverlay.classList.remove('show');
  cartEl.classList.remove('open');
  cartEl.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
  setTimeout(() => { cartOverlay.hidden = true; }, 320);
}
if (cartEl) {
  const cartBtn = document.getElementById('cartBtn');
  if (cartBtn) cartBtn.addEventListener('click', openCart);
  document.getElementById('cartClose').addEventListener('click', closeCart);
  cartOverlay.addEventListener('click', closeCart);
  cartList.addEventListener('click', e => {
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
function productCard(p) {
  const photo = p.life || p.img;
  const teak = Object.values(p.specs).some(v => /тик/i.test(v));
  const tags = [
    `<span class="p-tag">${t(p.env === 'outdoor' ? 'tag.outdoor' : 'tag.indoor')}</span>`,
    `<span class="p-tag">${t('tag.custom')}</span>`,
    p.fabric ? `<span class="p-tag">${t('tag.fabric')}</span>` : ''
  ].join('');
  return `
  <article class="product" data-id="${p.id}">
    <a class="p-media" href="product.html?id=${p.id}" aria-label="${escapeHtml(trName(p.name))}">
      <img class="p-photo" src="${photo}" alt="${escapeHtml(trName(p.name))}" loading="lazy">
      ${teak ? `<span class="p-badge">${escapeHtml(t('badge.teak'))}</span>` : ''}
      <button class="p-add" data-add="${p.id}" aria-label="+" type="button">+</button>
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
function renderProductsInto(el, list) {
  el.innerHTML = list.map(productCard).join('');
  syncAddButtons();
}
document.addEventListener('click', e => {
  const add = e.target.closest('.p-add');
  if (add) { e.preventDefault(); e.stopPropagation(); toggleRequest(add.dataset.add); }
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
  nav.classList.remove('open');
  document.body.style.overflow = '';
  if (window.__uf_syncHeaderTransparency) window.__uf_syncHeaderTransparency();
}
if (burger && nav) {
  burger.addEventListener('click', () => {
    const opening = !nav.classList.contains('open');
    burger.classList.toggle('open', opening);
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

/* ---------- language switch (шапка + футер) ---------- */
window.__uf_onLangChange = function () {
  syncRequestUI();
  syncLegalLinks();
  refreshCustomSelectLabels();
  if (window.__uf_onLangChangePage) window.__uf_onLangChangePage();
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
  const urlLang = new URLSearchParams(location.search).get('lang');
  window.setLang(urlLang === 'en' || urlLang === 'ru' ? urlLang : saved);
})();
syncRequestUI();

/* ---------- форма заявки (index + contacts) ---------- */
const form = document.getElementById('leadForm');
if (form) {
  /* подстановка «Что нужно подобрать» из последнего «Запросить стоимость» на странице товара */
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
  form.addEventListener('submit', e => {
    e.preventDefault();
    const name = document.getElementById('fName');
    const phone = document.getElementById('fPhone');
    const agree = document.getElementById('fAgree');
    let ok = true;
    [name, phone].forEach(f => {
      f.classList.toggle('err', !f.value.trim());
      if (!f.value.trim()) ok = false;
    });
    if (!agree.checked) { ok = false; agree.focus(); }
    if (!ok) return;
    /* TODO: сюда AJAX → Telegram Bot API, как в unit-bali functions.php */
    form.querySelector('.btn-submit').disabled = true;
    document.getElementById('formDone').hidden = false;
  });
}
