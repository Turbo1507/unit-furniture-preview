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
  right: '<svg class="ic" viewBox="0 0 24 24" aria-hidden="true"><path d="m9 6 6 6-6 6"/></svg>',
};
const WM = '<i class="u5">UNIT.</i>FURNITURE';
const NAV = [['collections', '#collections'], ['catalog', 'catalog.html'], ['production', '#production'], ['custom', '#custom'], ['how', '#how'], ['faq', '#faq']];

function top(home) {
  const h = (x) => (x.startsWith('#') && !home ? 'index.html' + x : x);
  const links = NAV.map(([k, x]) => `<a href="${h(x)}" data-i18n="nav.${k}"></a>`).join('');
  const cta = home ? '#lead' : 'index.html#lead';
  return `
<a class="skip" href="#main" data-i18n="skip"></a>
<header class="site-header" id="hdr">
  <div class="container">
    <a class="wordmark" href="index.html">${WM}</a>
    <nav class="site-nav" aria-label="Main">${links}</nav>
    <div class="hdr-right">
      <div class="lang" role="group" aria-label="Language"><button type="button" data-lang="ru" lang="ru">RU</button><button type="button" data-lang="en" lang="en">EN</button></div>
      <button type="button" class="cart-btn" data-cart-open data-i18n-attr="aria-label:hdr.cart">${IC.bag}<span class="cart-count" hidden>0</span></button>
      <a class="btn btn-primary btn-sm" href="${cta}" data-i18n="hdr.cta"></a>
      <button type="button" class="burger" aria-expanded="false" aria-controls="mmenu" data-i18n-attr="aria-label:hdr.menu"><span></span></button>
    </div>
  </div>
</header>
<div class="mmenu" id="mmenu" role="dialog" aria-modal="true" data-i18n-attr="aria-label:hdr.menu" aria-hidden="true" inert>
  <div class="mmenu-top"><a class="wordmark" href="index.html">${WM}</a><button type="button" class="mmenu-close" data-i18n-attr="aria-label:hdr.close">${IC.x}</button></div>
  <nav aria-label="Mobile">${links}</nav>
  <div class="mmenu-foot">
    <div class="lang" role="group" aria-label="Language"><button type="button" data-lang="ru" lang="ru">RU</button><button type="button" data-lang="en" lang="en">EN</button></div>
    <a class="btn btn-primary btn-block" href="${cta}" data-i18n="hdr.cta"></a>
  </div>
</div>
`;
}

function bottom(home) {
  const h = (x) => (x.startsWith('#') && !home ? 'index.html' + x : x);
  const links = NAV.map(([k, x]) => `<li><a href="${h(x)}" data-i18n="nav.${k}"></a></li>`).join('');
  return `
<footer class="site-footer">
  <div class="container">
    <div class="ft-grid">
      <div class="ft-brand"><a class="wordmark" href="index.html">${WM}</a><p class="ft-about" data-i18n="ft.about"></p></div>
      <div class="ft-col"><h2 class="ft-h" data-i18n="ft.nav"></h2><ul>${links}</ul></div>
      <div class="ft-col"><h2 class="ft-h" data-i18n="ft.contacts"></h2><ul>
        <li><a href="mailto:hello@unit.furniture">hello@unit.furniture</a></li>
        <li><a href="https://www.instagram.com/unit.furniture/" target="_blank" rel="noopener">Instagram @unit.furniture</a></li>
      </ul></div>
    </div>
    <div class="ft-bottom">
      <p>© 2026 ${WM}. <span data-i18n="ft.part"></span></p>
      <div class="ft-legal"><a href="legal.html" data-i18n="ft.legal"></a><a href="consent.html" data-i18n="ft.consent"></a></div>
    </div>
  </div>
</footer>
<div class="scrim" data-cart-close></div>
<aside class="drawer" id="drawer" role="dialog" aria-modal="true" aria-labelledby="drawer-h" aria-hidden="true" inert>
  <div class="drawer-head"><h2 id="drawer-h" data-i18n="cart.h"></h2><button type="button" class="drawer-close" data-cart-close data-i18n-attr="aria-label:proj.close">${IC.x}</button></div>
  <div class="drawer-body" id="drawer-body"></div>
  <div class="drawer-foot">
    <p class="tot tnum" id="drawer-tot"></p>
    <a class="btn btn-primary btn-block" id="drawer-go" href="${home ? '#lead' : 'index.html#lead'}" data-i18n="cart.go"></a>
    <a class="btn btn-outline btn-block" id="drawer-browse" href="catalog.html" data-i18n="cart.browse"></a>
    <p class="form-note" data-i18n="cart.note"></p>
  </div>
</aside>
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
  s = fill(s);
  // юр. страницы: статический текст через типограф, связка UNIT. с весом 500
  s = s.replace(/(<div class="legal"[\s\S]*?)(<\/div><\/div><\/main>)/, (m, body, end) =>
    body.replace(/(^|>)([^<]+)/g, (x, a, txt) => a + nbText(txt)).replace(/(?<!u5">)UNIT\.(?=[A-Z])/g, '<i class="u5">UNIT.</i>') + end);
  fs.writeFileSync(p, s);
  console.log('ok', f, (s.match(/data-i18n="/g) || []).length, 'ключей');
}
