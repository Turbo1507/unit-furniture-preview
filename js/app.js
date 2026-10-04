/* UNIT.FURNITURE: поведение сайта (редизайн 03.10.2026).
   Разметка шапки, меню, корзины и футера статическая (tools/build.mjs вставляет её
   в страницы и заполняет RU-тексты), здесь только язык, заявка и рендер каталога. */
(function () {
  'use strict';
  var D = window.DICT, P = window.PRODUCTS || [], TR = window.SPEC_TR || { keys: {}, values: {} };
  var byId = {}; P.forEach(function (p) { byId[p.id] = p; });
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var LS = {
    get: function (k, d) { try { var v = localStorage.getItem(k); return v == null ? d : JSON.parse(v); } catch (e) { return d; } },
    set: function (k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} }
  };
  var page = document.body.dataset.page || '';
  var lang = LS.get('uf_lang', null) || ((navigator.language || 'ru').toLowerCase().indexOf('ru') === 0 ? 'ru' : 'en');

  /* дополнения к переводу характеристик */
  Object.assign(TR.keys, { 'Назначение': 'Purpose', 'Тип': 'Type' });
  Object.assign(TR.values, { 'Ресепшн, ресторан': 'Reception, restaurant', 'Угловой, модульный': 'Corner, modular', 'Угловой': 'Corner' });

  /* ---------- типограф: nbsp после слов до 3 букв и между числом и единицей ---------- */
  var SHORT = /(^|[\s («“"])([A-Za-zА-Яа-яЁё0-9]{1,3})[ ](?=\S)/g;
  function nbText(s) {
    var prev;
    do { prev = s; s = s.replace(SHORT, '$1$2 '); } while (s !== prev);
    return s.replace(/(\d)[ ](?=[A-Za-zА-Яа-яЁё×%])/g, '$1 ').replace(/ × /g, ' × ');
  }
  function typo(html) { return String(html).replace(/(^|>)([^<]+)/g, function (m, a, b) { return a + nbText(b); }); }
  function esc(s) { return String(s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }

  function t(k, v) {
    var s = D[lang] && D[lang][k];
    if (s == null) s = D.ru[k] != null ? D.ru[k] : k;
    if (v) s = s.replace(/\{(\w+)\}/g, function (m, n) { return v[n] != null ? v[n] : m; });
    return s;
  }
  function T(k, v) { return typo(t(k, v)); }
  function plain(html) { var d = document.createElement('div'); d.innerHTML = html; return d.textContent; }
  function nModels(n) {
    var e;
    if (lang === 'ru') { var a = n % 10, b = n % 100; e = (a === 1 && b !== 11) ? 'ь' : (a >= 2 && a <= 4 && (b < 10 || b >= 20)) ? 'и' : 'ей'; }
    else e = n === 1 ? '' : 's';
    return t('n.models', { n: n, e: e });
  }
  function pname(p) { return p.name; }
  function dims(p) {
    if (!p.dims || p.dims === '—') return t('cat.noDims');
    return lang === 'ru' ? p.dims : p.dims.replace('мм', 'mm');
  }
  function specVal(v) { return lang === 'en' ? (TR.values[v] || v) : v.replace(/ — /g, ': '); }
  function specKey(k) { return lang === 'en' ? (TR.keys[k] || k) : k; }
  function catName(c) { return t('cat.' + c); }
  function url(id) { return 'product.html?id=' + encodeURIComponent(id); }

  function applyDict(root) {
    $$('[data-i18n]', root).forEach(function (el) { el.innerHTML = T(el.dataset.i18n); });
    $$('[data-i18n-attr]', root).forEach(function (el) {
      el.dataset.i18nAttr.split(';').forEach(function (pair) {
        var i = pair.indexOf(':'); if (i < 0) return;
        el.setAttribute(pair.slice(0, i).trim(), plain(t(pair.slice(i + 1).trim())));
      });
    });
  }

  var renderers = [];
  function onRender(fn) { renderers.push(fn); fn(); }

  function setLang(l) {
    lang = l === 'en' ? 'en' : 'ru';
    LS.set('uf_lang', lang);
    document.documentElement.lang = lang;
    applyDict();
    $$('[data-lang]').forEach(function (b) {
      var on = b.dataset.lang === lang;
      b.classList.toggle('is-active', on); b.setAttribute('aria-pressed', on);
    });
    $$('[data-lang-block]').forEach(function (b) { b.hidden = b.dataset.langBlock !== lang; });
    renderers.forEach(function (fn) { fn(); });
    setTitle();
  }
  window.setLang = setLang;
  function setTitle() {
    var k = document.body.dataset.title;
    if (page === 'product' && cur) document.title = pname(cur) + ' · UNIT.FURNITURE';
    else if (k) document.title = plain(t(k)) + (k === 'meta.title' ? '' : ' · UNIT.FURNITURE');
  }

  /* ---------- шапка ---------- */
  var hdr = $('#hdr'), hero = $('.hero');
  function onScroll() { if (hdr) hdr.classList.toggle('is-over', !!hero && window.scrollY < 40); }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* модальные слои: всё вне слоя получает inert */
  var outside = function () { return $$('.skip, #hdr, main, footer'); };
  var layer = null;
  function openLayer(el, focusEl) {
    if (layer && layer !== el) closeLayer(false);
    layer = el; el.inert = false; el.removeAttribute('aria-hidden'); el.classList.add('open');
    $('#toast') && $('#toast').classList.remove('show');
    outside().forEach(function (o) { o.inert = true; });
    document.body.classList.add('no-scroll');
    if (el.id === 'drawer') $('.scrim').classList.add('open');
    if (el.id === 'mmenu') $$('.burger').forEach(function (b) { b.setAttribute('aria-expanded', 'true'); });
    var f = focusEl || el.querySelector('button, a');
    f.focus();
  }
  var returnFocus = null;
  function closeLayer(restore) {
    if (!layer) return;
    var el = layer; layer = null;
    el.classList.remove('open'); el.inert = true; el.setAttribute('aria-hidden', 'true');
    outside().forEach(function (o) { o.inert = false; });
    document.body.classList.remove('no-scroll');
    $('.scrim') && $('.scrim').classList.remove('open');
    if (el.id === 'mmenu') $$('.burger').forEach(function (b) { b.setAttribute('aria-expanded', 'false'); });
    if (restore !== false && returnFocus && document.contains(returnFocus)) returnFocus.focus();
  }
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && layer) closeLayer(); });

  var mm = $('#mmenu');
  $$('.burger').forEach(function (b) { b.addEventListener('click', function () { returnFocus = b; openLayer(mm, $('.mmenu-close')); }); });
  $('.mmenu-close') && $('.mmenu-close').addEventListener('click', function () { closeLayer(); });
  mm && $$('a', mm).forEach(function (a) { a.addEventListener('click', function () { closeLayer(false); }); });
  $$('[data-lang]').forEach(function (b) { b.addEventListener('click', function () { setLang(b.dataset.lang); }); });

  /* ---------- заявка (корзина) ---------- */
  var cart = LS.get('uf_cart', []);
  if (!Array.isArray(cart)) cart = [];
  cart = cart.filter(function (i) { return i && byId[i.id] && i.q > 0; });
  function qtyOf(id) { for (var i = 0; i < cart.length; i++) if (cart[i].id === id) return cart[i].q; return 0; }
  function setQty(id, q) {
    q = Math.max(0, Math.min(999, q | 0));
    var it = null; cart.forEach(function (x) { if (x.id === id) it = x; });
    if (!q) cart = cart.filter(function (x) { return x.id !== id; });
    else if (it) it.q = q; else cart.push({ id: id, q: q });
    LS.set('uf_cart', cart);
    renderCart();
  }
  function totals() { var q = 0; cart.forEach(function (i) { q += i.q; }); return { n: cart.length, q: q }; }

  function ctl(id, v) {
    var q = qtyOf(id), p = byId[id];
    if (!q) {
      var cls = v === 'pp' ? 'btn btn-primary' : 'btn btn-outline btn-sm';
      return '<button type="button" class="' + cls + '" data-add="' + id + '" aria-label="' + esc(plain(t(v === 'pp' ? 'add.more' : 'add')) + ': ' + pname(p)) + '">' + T(v === 'pp' ? 'add.more' : 'add') + '</button>';
    }
    return '<div class="qty" role="group" aria-label="' + esc(t('qty') + ': ' + pname(p)) + '">' +
      '<button type="button" data-dec="' + id + '" aria-label="' + esc(t('qty.minus')) + '">−</button>' +
      '<input type="text" inputmode="numeric" pattern="[0-9]*" maxlength="3" value="' + q + '" data-qty="' + id + '" aria-label="' + esc(t('qty') + ': ' + pname(p)) + '">' +
      '<button type="button" data-inc="' + id + '" aria-label="' + esc(t('qty.plus')) + '">+</button></div>';
  }
  function refreshCtl() {
    var a = document.activeElement, host = a && a.closest ? a.closest('[data-ctl]') : null, sel = null;
    if (host) ['data-dec', 'data-inc', 'data-add', 'data-qty'].forEach(function (k) { if (a.hasAttribute(k)) sel = '[' + k + ']'; });
    $$('[data-ctl]').forEach(function (el) { el.innerHTML = ctl(el.dataset.ctl, el.dataset.v); });
    if (host && document.contains(host)) { var f = (sel && host.querySelector(sel)) || host.querySelector('button'); f && f.focus(); }
    else if (host && layer) { var c = layer.querySelector('.drawer-close, .mmenu-close'); c && c.focus(); }
  }

  var drawerKey = null;
  function renderCart() {
    var tt = totals();
    $$('.cart-count').forEach(function (b) { b.textContent = tt.n; b.hidden = tt.n === 0; });
    $$('[data-cart-open]').forEach(function (b) { b.setAttribute('aria-label', plain(t('hdr.cart')) + (tt.q ? ': ' + plain(t('cart.total', tt)) : '')); });
    var body = $('#drawer-body');
    if (body) {
      var key = lang + '|' + cart.map(function (i) { return i.id; }).join(',');
      if (key !== drawerKey) {
        drawerKey = key;
        body.innerHTML = cart.length ? cart.map(function (i) {
          var p = byId[i.id];
          return '<div class="d-item"><img src="' + p.img + '" alt="" width="72" height="72">' +
            '<div><a href="' + url(p.id) + '"><b>' + esc(pname(p)) + '</b></a><small>' + esc(catName(p.cat)) + (p.collection ? ', ' + p.collection : '') + '</small>' +
            '<div class="d-row"><div data-ctl="' + p.id + '" data-v="drawer"></div>' +
            '<button type="button" class="d-rm" data-rm="' + p.id + '">' + T('cart.remove') + '</button></div></div></div>';
        }).join('') : '<p class="empty">' + T('cart.empty') + '</p>';
      }
      $('#drawer-tot').textContent = tt.n ? plain(t('cart.total', tt)) : '';
      var br = $('#drawer-browse');
      if (br) br.hidden = !!tt.n;
      if ($('#d-sum')) $('#d-sum').textContent = plain(tt.n ? t('cart.sum', tt) : t('cart.sum0'));
    }
    refreshCtl();
    renderReqList();
    renderLineAdd();
  }

  var toastTimer;
  function toast(name) {
    var el = $('#toast'); if (!el) return;
    $('span', el).textContent = plain(t('toast.added', { name: name }));
    el.classList.add('show');
    clearTimeout(toastTimer); toastTimer = setTimeout(function () { el.classList.remove('show'); }, 4500);
  }
  /* шаги корзины: list (модели) → form (отправка) → ok */
  var drawer = $('#drawer');
  function drawerStep(s) {
    if (!drawer) return;
    drawer.dataset.step = s;
    $('#drawer-body').hidden = $('#drawer-foot').hidden = s !== 'list';
    $('#d-form').hidden = s !== 'form';
    $('#d-ok').hidden = s !== 'ok';
    $('.d-back').hidden = s !== 'form';
    if (!layer) return;
    if (s === 'form') $('#d-name').focus();
    else if (s === 'ok') $('h3', $('#d-ok')).focus();
    else $('.drawer-close').focus();
  }
  function openCart(from, step) {
    returnFocus = from || document.activeElement;
    if (drawer && drawer.dataset.step === 'ok') resetForm($('#d-form'));
    drawerStep(step || 'list');
    openLayer(drawer, step === 'form' ? $('#d-name') : $('.drawer-close'));
  }
  function rmLine(l) {
    cart = cart.filter(function (i) { return byId[i.id].collection !== l; });
    LS.set('uf_cart', cart); renderCart();
  }

  document.addEventListener('change', function (e) {
    var el = e.target.closest && e.target.closest('[data-qty]'); if (!el) return;
    var v = parseInt(el.value.replace(/\D/g, ''), 10);
    setQty(el.dataset.qty, isNaN(v) ? qtyOf(el.dataset.qty) : v);
  });
  document.addEventListener('focusin', function (e) { if (e.target.matches && e.target.matches('[data-qty]')) e.target.select(); });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Enter' && e.target.matches && e.target.matches('[data-qty]')) { e.preventDefault(); e.target.blur(); }
  });

  document.addEventListener('click', function (e) {
    var b = e.target.closest('[data-add],[data-inc],[data-dec],[data-rm],[data-cart-open],[data-cart-close],[data-addline],[data-rmline],[data-quote],[data-step-to],#toast button');
    if (!b) return;
    if (b.hasAttribute('data-quote')) { e.preventDefault(); if (layer && layer !== drawer) closeLayer(false); openCart(b, 'form'); }
    else if (b.hasAttribute('data-step-to')) drawerStep(b.dataset.stepTo);
    else if (b.hasAttribute('data-rmline')) { rmLine(b.dataset.rmline); var nb = $('[data-lineadd-btn="' + b.dataset.rmline + '"]'); nb && nb.focus(); }
    else if (b.hasAttribute('data-add')) { setQty(b.dataset.add, 1); toast(pname(byId[b.dataset.add])); }
    else if (b.hasAttribute('data-inc')) setQty(b.dataset.inc, qtyOf(b.dataset.inc) + 1);
    else if (b.hasAttribute('data-dec')) setQty(b.dataset.dec, qtyOf(b.dataset.dec) - 1);
    else if (b.hasAttribute('data-rm')) setQty(b.dataset.rm, 0);
    else if (b.hasAttribute('data-cart-open')) { e.preventDefault(); openCart(b); }
    else if (b.hasAttribute('data-cart-close')) closeLayer();
    else if (b.hasAttribute('data-addline')) {
      var ln = b.dataset.addline, ids = P.filter(function (p) { return p.collection === ln; });
      ids.forEach(function (p) { if (!qtyOf(p.id)) cart.push({ id: p.id, q: 1 }); });
      LS.set('uf_cart', cart); renderCart(); toast(ln + ', ' + nModels(ids.length));
    }
    else { $('#toast').classList.remove('show'); openCart(b); }
  });

  /* ---------- главная: линейки ---------- */
  var LINES = { Awan: 'assets/c26/life-awan-sofa.jpg', Axis: 'assets/c26/life-axis-bed.jpg', Reason: 'assets/c26/life-beds.jpg' };
  var curLine = 'Awan';
  function lineItems(l) { return P.filter(function (p) { return p.collection === l; }); }
  function renderLine() {
    var host = $('#line-panel'); if (!host) return;
    var items = lineItems(curLine), cats = [], frames = [];
    items.forEach(function (p) {
      if (cats.indexOf(p.cat) < 0) cats.push(p.cat);
      var f = p.specs && p.specs['Каркас']; if (f && frames.indexOf(f) < 0) frames.push(f);
    });
    host.setAttribute('aria-labelledby', 'tab-' + curLine);
    host.innerHTML =
      '<div class="line-media"><img class="main" src="' + LINES[curLine] + '" alt="' + esc(curLine) + '" width="1200" height="800">' +
      '<div class="line-thumbs">' + items.map(function (p) {
        return '<a href="' + url(p.id) + '" title="' + esc(pname(p)) + '"><img src="' + p.img + '" alt="' + esc(pname(p)) + '" width="88" height="88" loading="lazy"></a>';
      }).join('') + '</div></div>' +
      '<div class="line-info"><h3 class="t-h3">' + curLine + '</h3>' +
      '<dl class="kv">' +
      kv(t('col.count'), nModels(items.length)) +
      kv(t('col.cats'), cats.map(catName).join(', ')) +
      kv(t('col.frame'), frames.map(function (f) { return specVal(f); }).join(', ').toLowerCase().replace(/^./, function (c) { return c.toUpperCase(); })) +
      '</dl>' +
      '<p class="t-small muted">' + typo(items.map(pname).join(', ')) + '</p>' +
      '<div class="cta-row"><span data-lineadd="' + curLine + '"></span>' +
      '<a class="btn btn-outline" href="catalog.html?line=' + curLine + '">' + T('col.go') + '</a></div></div>';
    renderLineAdd();
  }
  function kv(k, v) { return '<div><dt>' + typo(esc(k)) + '</dt><span class="lead-dots" aria-hidden="true"></span><dd>' + typo(esc(v)) + '</dd></div>'; }
  function renderLineAdd() {
    $$('[data-lineadd]').forEach(function (el) {
      var l = el.dataset.lineadd, all = lineItems(l).every(function (p) { return qtyOf(p.id) > 0; });
      el.outerHTML = all
        ? '<button type="button" class="btn btn-outline" data-cart-open data-lineadd-done="' + l + '">' + T('col.added') + '</button>' +
          '<button type="button" class="btn btn-ghost" data-rmline="' + l + '" data-lineadd-rm="' + l + '">' + T('col.remove') + '</button>'
        : '<button type="button" class="btn btn-primary" data-addline="' + l + '" data-lineadd-btn="' + l + '">' + T('col.addall') + '</button>';
    });
    $$('[data-lineadd-done],[data-lineadd-btn]').forEach(function (b) {
      var l = b.dataset.lineaddDone || b.dataset.lineaddBtn, all = lineItems(l).every(function (p) { return qtyOf(p.id) > 0; });
      if (all === b.hasAttribute('data-lineadd-done')) return;
      var span = document.createElement('span'); span.dataset.lineadd = l;
      var rm = b.parentNode.querySelector('[data-lineadd-rm="' + l + '"]'); rm && rm.remove();
      var had = document.activeElement === b; b.replaceWith(span); renderLineAdd();
      if (had) { var nb = $('[data-lineadd-done="' + l + '"],[data-lineadd-btn="' + l + '"]'); nb && nb.focus(); }
    });
  }
  var tabs = $$('[data-line]');
  tabs.forEach(function (b, i) {
    b.addEventListener('click', function () { selectLine(b.dataset.line); });
    b.addEventListener('keydown', function (e) {
      var d = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0; if (!d) return;
      e.preventDefault(); var n = tabs[(i + d + tabs.length) % tabs.length]; selectLine(n.dataset.line); n.focus();
    });
  });
  function selectLine(l) {
    curLine = l;
    tabs.forEach(function (b) { var on = b.dataset.line === l; b.setAttribute('aria-selected', on); b.tabIndex = on ? 0 : -1; });
    renderLine();
  }
  if (tabs.length) { selectLine(curLine); renderers.push(renderLine); }

  /* категории с числом моделей */
  onRender(function () {
    $$('[data-catcount]').forEach(function (el) {
      el.textContent = nModels(P.filter(function (p) { return p.cat === el.dataset.catcount; }).length);
    });
  });

  /* ---------- проекты: лайтбокс ---------- */
  /* ---------- проекты: бенто-коллаж как у Спейса. Блоки 4 колонки × 2 ряда из модулей T (1×2), SS, B (2×2), WW, WSS, SSW;
     фото раскладываются по плиткам сортированным сопоставлением пропорций (data-ar), чтобы кадр не резался до непонятного.
     Первый блок — видимые 6 фото, «Показать все фото» докладывает остальные тем же ритмом. На ≤800 — лента. ---------- */
  var UNITS = {                                  // [сдвиг колонки, ширина, ряд, высота, тип]
    T: { w: 1, s: [[0, 1, 0, 2, 'T']] },
    SS: { w: 1, s: [[0, 1, 0, 1, 'S'], [0, 1, 1, 1, 'S']] },
    B: { w: 2, s: [[0, 2, 0, 2, 'B']] },
    WW: { w: 2, s: [[0, 2, 0, 1, 'W'], [0, 2, 1, 1, 'W']] },
    WSS: { w: 2, s: [[0, 2, 0, 1, 'W'], [0, 1, 1, 1, 'S'], [1, 1, 1, 1, 'S']] },
    SSW: { w: 2, s: [[0, 1, 0, 1, 'S'], [1, 1, 0, 1, 'S'], [0, 2, 1, 1, 'W']] }
  };
  var COMBOS = (function () {
    var out = [];
    (function rec(seq, cols) {
      if (cols === 4) { out.push(seq); return; }
      Object.keys(UNITS).forEach(function (u) { if (cols + UNITS[u].w <= 4) rec(seq.concat(u), cols + UNITS[u].w); });
    })([], 0);
    return out.map(function (seq) {
      var slots = [], col = 1;
      seq.forEach(function (u) { UNITS[u].s.forEach(function (s) { slots.push([col + s[0], s[1], s[2], s[3], s[4]]); }); col += UNITS[u].w; });
      return { key: seq.join('+'), slots: slots, kinds: slots.reduce(function (a, s) { if (a.indexOf(s[4]) < 0) a.push(s[4]); return a; }, []).length };
    });
  })();
  function fitBlock(combo, ars, AR) {
    var sl = combo.slots.map(function (s, i) { return { i: i, a: AR[s[4]] }; }).sort(function (x, y) { return x.a - y.a; });
    var ph = ars.map(function (a, i) { return { i: i, a: a }; }).sort(function (x, y) { return x.a - y.a; });
    var map = [], vis = [];
    sl.forEach(function (s, k) { map[s.i] = ph[k].i; vis.push(Math.min(s.a, ph[k].a) / Math.max(s.a, ph[k].a)); });
    var min = Math.min.apply(null, vis), mean = vis.reduce(function (a, v) { return a + v; }, 0) / vis.length;
    return { map: map, score: min * 0.6 + mean * 0.4 };
  }
  function layoutCollage(g) {
    var figs = $$('button', g);
    if (window.innerWidth <= 800) { figs.forEach(function (f) { f.style.gridColumn = f.style.gridRow = ''; }); g.style.gridAutoRows = ''; return; }
    var gap = parseFloat(getComputedStyle(g).columnGap) || 0, c = (g.clientWidth - 3 * gap) / 4, r = Math.round(c);
    g.style.gridAutoRows = r + 'px';            // высота ряда = ширина колонки: форма плиток не зависит от ширины экрана
    var AR = { T: c / (2 * r + gap), S: c / r, W: (2 * c + gap) / r, B: (2 * c + gap) / (2 * r + gap) };
    var first = figs.filter(function (f) { return !f.classList.contains('tile-more'); }).length, i = 0, row = 1, prev = '';
    function bestFor(part) {
      var ars = part.map(function (f) { return parseFloat(f.getAttribute('data-ar')) || 1.5; }), best = null;
      COMBOS.forEach(function (cb) {
        if (cb.slots.length !== part.length || cb.kinds < (part.length > 4 ? 3 : 2)) return;
        var fit = fitBlock(cb, ars, AR), sc = fit.score - (cb.key === prev ? 0.05 : 0);
        if (!best || sc > best.sc) best = { c: cb, fit: fit, sc: sc };
      });
      return best;
    }
    while (i < figs.length) {
      var left = figs.length - i, pick = null;
      (i === 0 ? [first] : [6, 5, 4, 3]).forEach(function (k) {
        if (k > left || (i > 0 && left - k > 0 && left - k < 3)) return;
        var b = bestFor(figs.slice(i, i + k));
        if (b && (!pick || b.sc + 0.015 * k > pick.b.sc + 0.015 * pick.k)) pick = { k: k, b: b };
      });
      if (!pick && left <= 2) pick = { k: left, b: bestFor(figs.slice(i)) };
      if (!pick || !pick.b) break;
      var part = figs.slice(i, i + pick.k), mirror = (row - 1) / 2 % 2 === 1; // блоки через один зеркально
      pick.b.c.slots.forEach(function (s, si) {
        var f = part[pick.b.fit.map[si]];
        f.style.gridColumn = (mirror ? 6 - s[0] - s[1] : s[0]) + ' / span ' + s[1];
        f.style.gridRow = (row + s[2]) + ' / span ' + s[3];
      });
      prev = pick.b.c.key; i += pick.k; row += 2;
    }
  }
  var collage = $('#proj-grid');
  if (collage) {
    layoutCollage(collage);
    var colT;
    window.addEventListener('resize', function () { clearTimeout(colT); colT = setTimeout(function () { layoutCollage(collage); }, 150); });
    var more = $('#proj-more');
    if (more) more.addEventListener('click', function () {
      var open = collage.classList.toggle('is-expanded'), k = open ? 'proj.less' : 'proj.more';
      more.setAttribute('data-i18n', k); more.textContent = plain(T(k));
      more.setAttribute('aria-expanded', open ? 'true' : 'false');
      if (!open) { var top = collage.getBoundingClientRect().top, off = $('#hdr').offsetHeight + 16; if (top < off) window.scrollBy(0, top - off); }
    });
  }

  var lb = $('#lb');
  if (lb) {
    var shots = $$('[data-shot]'), li = 0;
    /* «В этом кадре»: модели с фото → ссылки на карточки и кнопка «в заявку» */
    var SI = window.SHOT_ITEMS || {}, bar = $('.lb-bar', lb);
    var shotIds = function () {
      var m = /proj-([\w]+)\.jpg/.exec(shots[li].dataset.shot);
      return ((m && SI[m[1]]) || []).filter(function (id) { return byId[id]; });
    };
    var renderAct = function () {
      var ids = shotIds(), host = $('.lb-act', lb); if (!host || !ids.length) return;
      var had = host.contains(document.activeElement);
      host.innerHTML = ids.every(function (id) { return qtyOf(id) > 0; })
        ? '<button type="button" class="btn btn-light btn-sm" data-lb-cart>' + T('proj.inreq') + '</button>'
        : '<button type="button" class="btn btn-primary btn-sm" data-lb-add>' + T(ids.length > 1 ? 'proj.addshot2' : 'proj.addshot') + '</button>';
      if (had) $('button', host).focus();
    };
    var renderBar = function () {
      var ids = shotIds();
      bar.hidden = !ids.length; if (!ids.length) return;
      $('.lb-items', lb).innerHTML = ids.map(function (id) {
        var p = byId[id];
        return '<a class="lb-it" href="' + url(id) + '"><img src="' + p.img + '" alt="" width="56" height="56"><span>' + typo(esc(pname(p))) + '</span></a>';
      }).join('');
      renderAct();
    };
    var show = function (i) {
      li = (i + shots.length) % shots.length;
      $('img', lb).src = shots[li].dataset.shot;
      $('.lb-count', lb).textContent = plain(t('pp.photo', { n: li + 1, m: shots.length }));
      if (bar) renderBar();
    };
    if (bar) {
      lb.addEventListener('click', function (e) {
        if (e.target.closest('[data-lb-add]')) {
          shotIds().forEach(function (id) { if (!qtyOf(id)) cart.push({ id: id, q: 1 }); });
          LS.set('uf_cart', cart); renderCart(); renderAct();
        } else if (e.target.closest('[data-lb-cart]')) { lb.close(); openCart(shots[li]); }
      });
      onRender(function () { if (lb.open) renderBar(); });
    }
    shots.forEach(function (s, i) { s.addEventListener('click', function () { show(i); lb.showModal(); }); });
    $('.lb-prev', lb).addEventListener('click', function () { show(li - 1); });
    $('.lb-next', lb).addEventListener('click', function () { show(li + 1); });
    $('.lb-close', lb).addEventListener('click', function () { lb.close(); });
    lb.addEventListener('click', function (e) { if (e.target === lb) lb.close(); });
    lb.addEventListener('keydown', function (e) { if (e.key === 'ArrowRight') show(li + 1); if (e.key === 'ArrowLeft') show(li - 1); });
    lb.addEventListener('close', function () { shots[li] && shots[li].focus(); });
  }

  /* ---------- форма заявки ---------- */
  function renderReqList() {
    var host = $('#req-list'); if (!host) return;
    host.innerHTML = cart.length ? cart.map(function (i) {
      var p = byId[i.id];
      return '<div class="req-item"><img src="' + p.img + '" alt="" width="48" height="48"><div><b>' + esc(pname(p)) + '</b><small>' + esc(catName(p.cat)) + '</small></div><span class="t-small tnum">× ' + i.q + '</span></div>';
    }).join('') + '<button type="button" class="link t-small" data-cart-open style="border:0;background:none;padding:12px 0;justify-self:start">' + T('f.models.edit') + '</button>'
      : '<p class="empty">' + T('f.models.empty') + '</p>';
  }
  /* одна логика на две формы: внизу главной (#lead-form) и в корзине (#d-form) */
  var RULES = {
    name: function (v) { return v.trim().length >= 2; },
    contact: function (v) { v = v.trim(); return /\S+@\S+\.\S+/.test(v) || v.replace(/\D/g, '').length >= 6; },
    agree: function (v, el) { return el.checked; }
  };
  function resetForm(form) {
    if (!form) return;
    form.reset(); form._tried = false;
    $$('.field', form).forEach(function (f) { f.classList.remove('has-err'); });
    $$('[aria-invalid]', form).forEach(function (el) { el.removeAttribute('aria-invalid'); });
    form._summary();
  }
  function initForm(form, ok, onDone) {
    if (!form) return;
    var check = function (name) {
      var el = form.elements[name], good = RULES[name](el.value, el), f = el.closest('.field');
      f.classList.toggle('has-err', !good);
      el.setAttribute('aria-invalid', !good);
      return good;
    };
    var summary = form._summary = function () {
      var bad = Object.keys(RULES).filter(function (n) { return form.elements[n].closest('.field').classList.contains('has-err'); });
      var box = $('.form-err', form);
      box.classList.toggle('show', bad.length > 0);
      box.innerHTML = bad.length ? '<b>' + T('f.err.title') + '</b><ul>' + bad.map(function (n) {
        return '<li><a href="#' + form.elements[n].id + '">' + T('f.err.' + n) + '</a></li>';
      }).join('') + '</ul>' : '';
      return bad;
    };
    Object.keys(RULES).forEach(function (n) {
      var el = form.elements[n];
      el.addEventListener(el.type === 'checkbox' ? 'change' : 'input', function () { if (form._tried) { check(n); summary(); } });
    });
    form.addEventListener('submit', function (e) {
      e.preventDefault(); form._tried = true;
      Object.keys(RULES).forEach(check);
      var bad = summary();
      if (bad.length) { form.elements[bad[0]].focus(); return; }
      var data = {
        name: form.elements.name.value.trim(), contact: form.elements.contact.value.trim(),
        type: form.elements.type ? form.elements.type.value : '', msg: form.elements.msg.value.trim(),
        items: cart.map(function (i) { return { id: i.id, name: byId[i.id].name, q: i.q }; }), lang: lang, at: new Date().toISOString()
      };
      /* TODO (Босс 03.10: бот позже): отправка в Telegram через REST unitdeveloper, как у Спейса.
         До подключения заявка сохраняется только в браузере посетителя. */
      LS.set('uf_last_request', data);
      $('[data-ok-p]', ok).innerHTML = typo(esc(t('ok.p', { c: '\u0001' }))).replace('\u0001', '<b>' + esc(data.contact) + '</b>');
      $('[data-ok-list]', ok).innerHTML = data.items.length
        ? '<p class="t-small">' + T('ok.list') + '</p><ul>' + data.items.map(function (i) { return '<li>' + esc(pname(byId[i.id])) + ' × ' + i.q + '</li>'; }).join('') + '</ul>'
        : '<p class="t-small muted">' + T('ok.none') + '</p>';
      onDone();
      cart = []; LS.set('uf_cart', cart); renderCart();
    });
    renderers.push(function () { if (form._tried) summary(); });
  }
  var form = $('#lead-form');
  initForm(form, $('#form-ok'), function () { form.hidden = true; $('#form-ok').hidden = false; $('h3', $('#form-ok')).focus(); });
  $('[data-ok-new]') && $('[data-ok-new]').addEventListener('click', function () {
    resetForm(form); $('#form-ok').hidden = true; form.hidden = false; form.elements.name.focus();
  });
  initForm($('#d-form'), $('#d-ok'), function () { drawerStep('ok'); resetForm($('#d-form')); });

  /* ---------- каталог ---------- */
  var CATS = ['beds', 'sofas', 'chairs', 'armchairs', 'nightstands', 'outdoor', 'sunbeds', 'textile'];
  var LNS = ['Awan', 'Axis', 'Reason'];
  function card(p) {
    return '<article class="p-card"><a class="ph" href="' + url(p.id) + '" tabindex="-1" aria-hidden="true"><img src="' + p.img + '" alt="" width="400" height="400" loading="lazy"></a>' +
      '<div class="tx"><h3><a href="' + url(p.id) + '">' + typo(esc(pname(p))) + '</a></h3>' +
      '<p class="sub">' + esc(catName(p.cat)) + (p.collection ? ', ' + p.collection : '') + '</p>' +
      '<p class="dims tnum">' + typo(esc(dims(p))) + '</p>' +
      '<div class="act" data-ctl="' + p.id + '" data-v="card"></div></div></article>';
  }
  var grid = $('#p-grid');
  if (grid && page === 'catalog') {
    var qs = new URLSearchParams(location.search);
    var st = { cat: CATS.indexOf(qs.get('cat')) >= 0 ? qs.get('cat') : '', line: LNS.indexOf(qs.get('line')) >= 0 ? qs.get('line') : '' };
    var renderCatalog = function () {
      var inCat = function (c) { return P.filter(function (p) { return (!c || p.cat === c) && (!st.line || p.collection === st.line); }).length; };
      var inLine = function (l) { return P.filter(function (p) { return (!st.cat || p.cat === st.cat) && (!l || p.collection === l); }).length; };
      var off = function (n, on) { return !n && !on ? ' aria-disabled="true"' : ''; };
      $('#chips-cat').innerHTML = [''].concat(CATS).map(function (c) {
        var n = inCat(c);
        return '<button type="button" data-fcat="' + c + '" aria-pressed="' + (st.cat === c) + '"' + off(n, st.cat === c) + '>' + (c ? esc(catName(c)) : T('cat.all')) + '<small>' + n + '</small></button>';
      }).join('');
      $('#chips-line').innerHTML = [''].concat(LNS).map(function (l) {
        return '<button type="button" data-fline="' + l + '" aria-pressed="' + (st.line === l) + '"' + off(inLine(l), st.line === l) + '>' + (l || T('cat.lineAll')) + '</button>';
      }).join('');
      var list = P.filter(function (p) { return (!st.cat || p.cat === st.cat) && (!st.line || p.collection === st.line); });
      grid.innerHTML = list.map(card).join('');
      $('#cat-count').textContent = plain(t('cat.shown', { n: list.length }));
      $('#cat-empty').hidden = list.length > 0;
      refreshCtl();
    };
    var sync = function () {
      var q = new URLSearchParams(); if (st.cat) q.set('cat', st.cat); if (st.line) q.set('line', st.line);
      history.replaceState(null, '', location.pathname + (q.toString() ? '?' + q : ''));
    };
    document.addEventListener('click', function (e) {
      var b = e.target.closest('[data-fcat],[data-fline],[data-freset]'); if (!b || b.getAttribute('aria-disabled') === 'true') return;
      if (b.hasAttribute('data-fcat')) st.cat = b.dataset.fcat;
      else if (b.hasAttribute('data-fline')) st.line = b.dataset.fline;
      else st = { cat: '', line: '' };
      var attr = b.hasAttribute('data-fcat') ? 'data-fcat' : b.hasAttribute('data-fline') ? 'data-fline' : null, val = attr && b.getAttribute(attr);
      sync(); renderCatalog();
      if (attr) { var nb = $('[' + attr + '="' + val + '"]'); nb && nb.focus(); }
    });
    onRender(renderCatalog);
  }

  /* ---------- товар ---------- */
  var cur = null;
  if (page === 'product') {
    cur = byId[new URLSearchParams(location.search).get('id')] || P[0];
    var gi = 0;
    var shotsOf = function (p) {
      var a = [];
      if (p.life) a.push({ src: p.life, life: true });
      if (p.variants) Object.keys(p.variants).forEach(function (k) { a.push({ src: p.variants[k], v: k }); });
      else a.push({ src: p.img });
      /* кадры проектов, где стоит модель (SHOT_ITEMS) */
      var SI = window.SHOT_ITEMS || {};
      Object.keys(SI).forEach(function (k) { if (SI[k].indexOf(p.id) >= 0) a.push({ src: 'assets/c26/proj-' + k + '.jpg', life: true }); });
      return a;
    };
    var renderPP = function () {
      var p = cur, sh = shotsOf(p);
      gi = Math.min(gi, sh.length - 1);
      $('#pp-crumb').textContent = pname(p);
      $('#pp-h1').innerHTML = typo(esc(pname(p)));
      $('#pp-sub').innerHTML = '<a class="link" href="catalog.html?cat=' + p.cat + '">' + esc(catName(p.cat)) + '</a>' +
        (p.collection ? ', ' + T('pp.line').toLowerCase() + ' <a class="link" href="catalog.html?line=' + p.collection + '">' + p.collection + '</a>' : '');
      $('#pp-desc').innerHTML = T('d.' + p.cat);
      var rows = kv(t('pp.dims'), dims(p));
      Object.keys(p.specs || {}).forEach(function (k) { rows += kv(specKey(k), specVal(p.specs[k])); });
      $('#pp-specs').innerHTML = rows;
      var main = $('#pp-main');
      main.classList.toggle('is-life', !!sh[gi].life);
      main.innerHTML = '<img src="' + sh[gi].src + '" alt="' + esc(pname(p)) + (sh[gi].v ? ', ' + sh[gi].v : '') + '" width="1200" height="900">';
      $('#pp-thumbs').innerHTML = sh.length > 1 ? sh.map(function (s, i) {
        return '<button type="button" data-gi="' + i + '" aria-current="' + (i === gi) + '" aria-label="' + esc(plain(t('pp.photo', { n: i + 1, m: sh.length }))) + '"><img src="' + s.src + '" alt=""' + (s.life ? '' : ' class="studio"') + ' width="88" height="72"></button>';
      }).join('') : '';
      var more = P.filter(function (x) { return x.id !== p.id && p.collection && x.collection === p.collection; });
      var hd = p.collection ? t('pp.more', { c: p.collection }) : t('pp.similar');
      if (!more.length) { more = P.filter(function (x) { return x.id !== p.id && x.cat === p.cat; }); hd = t('pp.similar'); }
      if (more.length < 4) more = more.concat(P.filter(function (x) { return x.id !== p.id && x.cat === p.cat && more.indexOf(x) < 0; }));
      $('#pp-more-h').innerHTML = typo(esc(hd));
      var all = $('#pp-more-all'), nLine = p.collection ? lineItems(p.collection).length : 0;
      if (all) {
        all.hidden = !p.collection;
        all.href = 'catalog.html?line=' + encodeURIComponent(p.collection || '');
        all.innerHTML = p.collection ? T('pp.lineall', { c: p.collection, n: nModels(nLine) }) : '';
      }
      $('#pp-more').innerHTML = more.slice(0, 4).map(card).join('');
      refreshCtl(); setTitle();
    };
    $('[data-ctl="pp"]') && ($('[data-ctl="pp"]').dataset.ctl = cur.id);
    document.addEventListener('click', function (e) {
      var b = e.target.closest('[data-gi]'); if (!b) return;
      gi = +b.dataset.gi; renderPP(); var f = $('[data-gi="' + gi + '"]'); f && f.focus();
    });
    onRender(renderPP);
  }

  /* ---------- активный пункт меню и reveal ---------- */
  if ('IntersectionObserver' in window) {
    var links = $$('.site-nav a[href^="#"], .mmenu nav a[href^="#"]');
    if (links.length) {
      var io = new IntersectionObserver(function (es) {
        es.forEach(function (en) {
          if (!en.isIntersecting) return;
          links.forEach(function (a) { a.classList.toggle('is-active', a.getAttribute('href') === '#' + en.target.id); });
        });
      }, { rootMargin: '-45% 0px -50% 0px' });
      links.map(function (a) { return $(a.getAttribute('href')); }).filter(Boolean).forEach(function (s) { io.observe(s); });
    }
    var ro = new IntersectionObserver(function (es) {
      es.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add('in'); ro.unobserve(en.target); } });
    }, { rootMargin: '0px 0px -8% 0px' });
    $$('.rv').forEach(function (el) { ro.observe(el); });
  } else $$('.rv').forEach(function (el) { el.classList.add('in'); });

  renderers.push(renderCart);
  setLang(lang);
})();
