// Сборка оболочки UNIT.FURNITURE: вставляет шапку/меню/корзину/футер между маркерами
// <!--@top-->…<!--@/top--> и <!--@bottom-->…<!--@/bottom--> и заполняет элементы
// data-i18n русским текстом из js/dict.js (с тем же типографом, что и app.js),
// чтобы страница была полной без JS и для поисковиков.
// Запуск: node tools/build.mjs   (из папки site)
import fs from 'node:fs';
import vm from 'node:vm';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const ctx = { window: {} };
vm.createContext(ctx);
vm.runInContext(fs.readFileSync(path.join(ROOT, 'js/dict.js'), 'utf8'), ctx);
const RU = ctx.window.DICT.ru;

const SHORT = /(^|[\s («“"])([A-Za-zА-Яа-яЁё0-9]{1,3})[ ](?=\S)/g;
function nbText(s) {
  let prev;
  do { prev = s; s = s.replace(SHORT, '$1$2 '); } while (s !== prev);
  return s.replace(/(\d)[ ](?=[A-Za-zА-Яа-яЁё×%])/g, '$1 ').replace(/ × /g, ' × ');
}
const typo = (html) => String(html).replace(/(^|>)([^<]+)/g, (m, a, b) => a + nbText(b));
const plain = (html) => String(html).replace(/<[^>]+>/g, '');
const t = (k) => { if (RU[k] == null) throw new Error('нет ключа ' + k); return RU[k]; };

const IC = {
  bag: '<svg class="ic" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 8h14l-1 12H6L5 8Z"/><path d="M9 8V6a3 3 0 0 1 6 0v2"/></svg>',
  x: '<svg class="ic" viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18"/></svg>',
  left: '<svg class="ic" viewBox="0 0 24 24" aria-hidden="true"><path d="m15 6-6 6 6 6"/></svg>',
  clip: '<svg class="ic" viewBox="0 0 24 24" aria-hidden="true"><path d="m20 11-8.5 8.5a5 5 0 0 1-7-7L13 4a3.3 3.3 0 0 1 4.7 4.7l-8.6 8.6a1.7 1.7 0 0 1-2.4-2.4L14.5 7"/></svg>',
  right: '<svg class="ic" viewBox="0 0 24 24" aria-hidden="true"><path d="m9 6 6 6-6 6"/></svg>',
};
const WM = '<i class="u5">UNIT.</i>FURNITURE';
// шапка компактная, как в ТЗ; в футере все разделы
const NAV = [['catalog', 'catalog.html'], ['solutions', '#solutions'], ['custom', '#custom'], ['projects', '#projects'], ['contacts', '#lead']];
const FOOT = [['catalog', 'catalog.html'], ['collections', '#collections'], ['solutions', '#solutions'], ['custom', '#custom'], ['production', '#production'],
  ['materials', '#materials'], ['projects', '#projects'], ['how', '#how'], ['faq', '#faq'], ['contacts', '#lead']];
// поле «прикрепить файл»: одно на обе формы, p — префикс id
const files = (p) => `
    <div class="field field-files">
      <p class="lbl"><span data-i18n="f.files"></span> <span class="opt">(<span data-i18n="f.opt"></span>)</span></p>
      <input type="file" class="file-in sr-only" id="${p}-files" name="files" multiple accept="image/*,.pdf,.dwg,.dxf,.skp" aria-describedby="${p}-files-h ${p}-files-e">
      <label class="btn btn-outline btn-sm file-btn" for="${p}-files">${IC.clip}<span data-i18n="f.files.btn"></span></label>
      <p class="hint" id="${p}-files-h" data-i18n="f.files.hint"></p>
      <ul class="file-list"></ul>
      <p class="err" id="${p}-files-e" role="status"></p>
    </div>`;

function top(home) {
  const h = (x) => (x.startsWith('#') && !home ? 'index.html' + x : x);
  const links = NAV.map(([k, x]) => `<a href="${h(x)}" data-i18n="nav.${k}"></a>`).join('');
  const cta = (home ? '#lead' : 'index.html#lead') + '" data-quote="';
  return `
<a class="skip" href="#main" data-i18n="skip"></a>
<header class="site-header" id="hdr">
  <div class="container">
    <a class="wordmark" href="index.html">${WM}</a>
    <nav class="site-nav" aria-label="Main">${links}</nav>
    <div class="hdr-right">
      <div class="lang" role="group" aria-label="Language"><button type="button" data-lang="ru" lang="ru">RU</button><button type="button" data-lang="en" lang="en">EN</button></div>
      <button type="button" class="cart-btn" data-cart-open data-i18n-attr="aria-label:hdr.cart">${IC.bag}<span class="cart-count" hidden>0</span></button>
      <a class="btn btn-primary btn-sm" href="${cta}" data-i18n="cta.quote"></a>
      <button type="button" class="burger" aria-expanded="false" aria-controls="mmenu" data-i18n-attr="aria-label:hdr.menu"><span></span></button>
    </div>
  </div>
</header>
<div class="mmenu" id="mmenu" role="dialog" aria-modal="true" data-i18n-attr="aria-label:hdr.menu" aria-hidden="true" inert>
  <div class="mmenu-top"><a class="wordmark" href="index.html">${WM}</a><button type="button" class="mmenu-close" data-i18n-attr="aria-label:hdr.close">${IC.x}</button></div>
  <nav aria-label="Mobile">${links}</nav>
  <div class="mmenu-foot">
    <div class="lang" role="group" aria-label="Language"><button type="button" data-lang="ru" lang="ru">RU</button><button type="button" data-lang="en" lang="en">EN</button></div>
    <a class="btn btn-primary btn-block" href="${cta}" data-i18n="cta.quote"></a>
  </div>
</div>
`;
}

function bottom(home) {
  const h = (x) => (x.startsWith('#') && !home ? 'index.html' + x : x);
  const links = FOOT.map(([k, x]) => `<li><a href="${h(x)}" data-i18n="nav.${k}"></a></li>`).join('');
  return `
<footer class="site-footer">
  <div class="container">
    <div class="ft-grid">
      <div class="ft-brand"><a class="wordmark" href="index.html">${WM}</a><p class="ft-slogan" lang="en">Designed for living. Built to last.</p><p class="ft-about" data-i18n="ft.about"></p></div>
      <div class="ft-col"><h2 class="ft-h" data-i18n="ft.nav"></h2><ul>${links}</ul></div>
      <div class="ft-col"><h2 class="ft-h" data-i18n="ft.contacts"></h2><ul>
        <li><a href="mailto:hello@unit.furniture">hello@unit.furniture</a></li>
        <li><a href="https://www.instagram.com/unit.furniture/" target="_blank" rel="noopener">Instagram @unit.furniture</a></li>
        <li><a href="assets/UNIT-FURNITURE-catalog-2026-RU.pdf" download data-i18n-attr="href:pdf.href" data-i18n="pdf.ft"></a></li>
      </ul></div>
    </div>
    <div class="ft-bottom">
      <p>© 2026 ${WM}. <span data-i18n="ft.part"></span></p>
      <div class="ft-legal"><a href="legal.html" data-i18n="ft.legal"></a><a href="consent.html" data-i18n="ft.consent"></a></div>
    </div>
  </div>
</footer>
<div class="scrim" data-cart-close></div>
<aside class="drawer" id="drawer" role="dialog" aria-modal="true" aria-labelledby="drawer-h" aria-hidden="true" inert data-step="list">
  <div class="drawer-head">
    <button type="button" class="d-back" data-step-to="list" hidden>${IC.left}<span data-i18n="cart.back"></span></button>
    <h2 id="drawer-h" data-i18n="cart.h"></h2>
    <button type="button" class="drawer-close" data-cart-close data-i18n-attr="aria-label:proj.close">${IC.x}</button>
  </div>
  <div class="drawer-body" id="drawer-body"></div>
  <div class="drawer-foot" id="drawer-foot">
    <p class="tot tnum" id="drawer-tot"></p>
    <button type="button" class="btn btn-primary btn-block" id="drawer-go" data-step-to="form" data-i18n="cta.quote"></button>
    <a class="btn btn-outline btn-block" id="drawer-browse" href="catalog.html" data-i18n="cart.browse"></a>
    <p class="form-note" data-i18n="cart.note"></p>
  </div>
  <form class="form d-form" id="d-form" novalidate hidden>
    <p class="tot tnum" id="d-sum"></p>
    <div class="form-err" role="alert" tabindex="-1"></div>
    <div class="field">
      <label for="d-name" data-i18n="f.name"></label>
      <input class="inp" id="d-name" name="name" autocomplete="name" aria-describedby="de-name" required>
      <p class="err" id="de-name" data-i18n="f.err.name"></p>
    </div>
    <div class="field">
      <label for="d-contact" data-i18n="f.contact"></label>
      <input class="inp" id="d-contact" name="contact" autocomplete="tel" inputmode="email" aria-describedby="dh-contact de-contact" required>
      <p class="hint" id="dh-contact" data-i18n="f.contact.hint"></p>
      <p class="err" id="de-contact" data-i18n="f.err.contact"></p>
    </div>
    <div class="field">
      <label for="d-msg"><span data-i18n="f.msg"></span> <span class="opt">(<span data-i18n="f.opt"></span>)</span></label>
      <textarea class="inp" id="d-msg" name="msg" rows="3" data-i18n-attr="placeholder:f.msg.ph"></textarea>
    </div>${files('d')}
    <div class="field">
      <label class="chk" for="d-agree"><input type="checkbox" id="d-agree" name="agree" aria-describedby="de-agree" required><span data-i18n="f.agree"></span></label>
      <p class="err" id="de-agree" data-i18n="f.err.agree"></p>
    </div>
    <button type="submit" class="btn btn-primary btn-block" data-i18n="f.submit"></button>
    <p class="form-note" data-i18n="f.note"></p>
  </form>
  <div class="form-ok d-ok" id="d-ok" hidden>
    <div class="ok-mark" aria-hidden="true"><svg class="ic" viewBox="0 0 24 24"><path d="m5 12 5 5 9-10"/></svg></div>
    <h3 class="t-h3" tabindex="-1" data-i18n="ok.h"></h3>
    <p data-ok-p></p>
    <div data-ok-list></div>
    <div class="cta-row"><a class="btn btn-outline" href="catalog.html" data-i18n="ok.more"></a><button type="button" class="btn btn-outline" data-cart-close data-i18n="cart.closeBtn"></button></div>
  </div>
</aside>
<div class="mbar" id="mbar" aria-hidden="true" inert><a class="btn btn-primary btn-block" href="${home ? '#lead' : 'index.html#lead'}" data-quote data-i18n="cta.quote"></a></div>
<div class="toast" id="toast" role="status" aria-live="polite"><span></span><button type="button" data-i18n="toast.open"></button></div>
`;
}

function fill(html) {
  // текст элементов data-i18n (вложенных одноимённых тегов в словаре нет)
  html = html.replace(/<(\w+)([^>]*?\sdata-i18n="([^"]+)"[^>]*)>([\s\S]*?)<\/\1>/g,
    (m, tag, attrs, key) => `<${tag}${attrs}>${typo(t(key))}</${tag}>`);
  // атрибуты data-i18n-attr="aria-label:key;placeholder:key"
  html = html.replace(/<[^>]*\sdata-i18n-attr="([^"]+)"[^>]*>/g, (tagStr, spec) => {
    for (const pair of spec.split(';')) {
      const i = pair.indexOf(':'); if (i < 0) continue;
      const a = pair.slice(0, i).trim(), v = plain(t(pair.slice(i + 1).trim())).replace(/"/g, '&quot;');
      const re = new RegExp(`\\s${a}="[^"]*"`);
      tagStr = re.test(tagStr) ? tagStr.replace(re, ` ${a}="${v}"`) : tagStr.replace(/\s*\/?>$/, (e) => ` ${a}="${v}"${e}`);
    }
    return tagStr;
  });
  return html;
}

const pages = process.argv.slice(2).length ? process.argv.slice(2) : ['index.html', 'catalog.html', 'product.html', 'legal.html', 'consent.html'];
for (const f of pages) {
  const p = path.join(ROOT, f);
  if (!fs.existsSync(p)) { console.log('нет', f); continue; }
  let s = fs.readFileSync(p, 'utf8');
  const home = /data-page="home"/.test(s);
  s = s.replace(/<!--@top-->[\s\S]*?<!--@\/top-->/, `<!--@top-->${top(home)}<!--@/top-->`)
       .replace(/<!--@bottom-->[\s\S]*?<!--@\/bottom-->/, `<!--@bottom-->${bottom(home)}<!--@/bottom-->`);
  s = s.replace(/<!--@files:(\w+)-->[\s\S]*?<!--@\/files-->/g, (m, p) => `<!--@files:${p}-->${files(p)}<!--@/files-->`);
  s = fill(s);
  // юр. страницы: статический текст через типограф, связка UNIT. с весом 500
  s = s.replace(/(<div class="legal"[\s\S]*?)(<\/div><\/div><\/main>)/, (m, body, end) =>
    body.replace(/(^|>)([^<]+)/g, (x, a, txt) => a + nbText(txt)).replace(/(?<!u5">)UNIT\.(?=[A-Z])/g, '<i class="u5">UNIT.</i>') + end);
  fs.writeFileSync(p, s);
  console.log('ok', f, (s.match(/data-i18n="/g) || []).length, 'ключей');
}
