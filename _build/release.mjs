/* Выкладка сайта из исходника (RU в HTML) в папку сайта: корень на английском, остальные языки в /ru/ /id/ /fr/ …
   Текст вписывается в HTML сразу на нужном языке, у каждой страницы свои canonical и hreflang,
   title и description всегда английские. Язык попадает в выкладку, когда для него есть словарь js/i18n-<код>.js.
   Запуск из site/:  node _build/release.mjs ../_wt-main/v2 [https://unit.furniture/] */
import fs from 'fs';
import path from 'path';
import vm from 'vm';
import { createHash } from 'crypto';
import { fileURLToPath } from 'url';

const SRC = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const OUT = path.resolve(process.argv[2] || '');
const SITE = (process.argv[3] || 'https://unit.furniture/').replace(/\/?$/, '/');
if (!process.argv[2] || !fs.existsSync(OUT)) throw new Error('папка выкладки не найдена: ' + OUT);

const ALL = ['en', 'ru', 'id', 'fr', 'es', 'uk', 'it', 'tr', 'nl'];
const LOCALE = { en: 'en_US', ru: 'ru_RU', id: 'id_ID', fr: 'fr_FR', es: 'es_ES', uk: 'uk_UA', it: 'it_IT', tr: 'tr_TR', nl: 'nl_NL' };
const LANGS = ALL.filter(l => l === 'en' || l === 'ru' || fs.existsSync(path.join(SRC, 'js', 'i18n-' + l + '.js')));

/* словари: те же файлы, что грузит браузер */
const win = {};
const ctx = vm.createContext({ window: win });
vm.runInContext(fs.readFileSync(path.join(SRC, 'js/i18n.js'), 'utf8'), ctx);
LANGS.filter(l => l !== 'en' && l !== 'ru').forEach(l => vm.runInContext(fs.readFileSync(path.join(SRC, 'js/i18n-' + l + '.js'), 'utf8'), ctx));
const NATIVE = Object.fromEntries(win.UF_LANGS);
const dictOf = l => Object.assign({}, win.I18N.en, win.I18N[l]);
const glue = (s, l) => win.glueShort(s, l);

const PAGES = {
  index: { t: 'Hi-tech furniture and interiors in Bali | UNIT.FURNITURE', d: 'Hi-tech furniture made in our own workshop in Bali: beds, sofas, armchairs, outdoor. From a single piece to furnishing a whole villa, hotel or restaurant.' },
  catalog: { t: 'Furniture catalog: beds, sofas, armchairs, outdoor | UNIT.FURNITURE', crumb: 'nav.catalog', d: 'UNIT.FURNITURE catalog: beds, sofas, armchairs and chairs, outdoor, sun loungers, poufs, textiles. Price on request, customized for your property.' },
  solutions: { t: 'Ready-made interior solutions | UNIT.FURNITURE', crumb: 'nav.solutions', d: 'Ready-made UNIT.FURNITURE solutions: bedroom, living room, terrace, outdoor lounge, reception, restaurant and turnkey furnishing in Bali.' },
  customization: { t: 'Custom furniture for your property | UNIT.FURNITURE', crumb: 'nav.custom', d: 'Furniture customized for your property: sizes, fabrics, colors, wood tones, configuration and full sets for villas, homes, hotels and restaurants in Bali.' },
  materials: { t: 'Materials and production in Bali | UNIT.FURNITURE', crumb: 'nav.materials', d: 'UNIT.FURNITURE materials: teak and other wood, fabrics, fillings, hardware. Made in Bali with tropical humidity and climate in mind.' },
  projects: { t: 'Our furniture in real projects | UNIT.FURNITURE', crumb: 'nav.projects', d: 'UNIT.FURNITURE in real interiors: villas, outdoor areas and commercial spaces by UNIT in Bali.' },
  designers: { t: 'For interior designers and architects | UNIT.FURNITURE', crumb: 'nav.designers', d: 'UNIT.FURNITURE is a production partner for interior designers and architects in Bali: furniture from our catalog, your references, drawings and specs.' },
  contacts: { t: 'Contacts | UNIT.FURNITURE', crumb: 'nav.contacts', d: 'Contact UNIT.FURNITURE: WhatsApp, email, Instagram, request form. Bali, Indonesia.' },
  product: { t: 'Model | UNIT.FURNITURE', d: 'UNIT.FURNITURE furniture model: specifications, materials, customization. Price on request.', product: true },
  legal: { t: 'Legal information | UNIT.FURNITURE', noindex: true, legal: true },
  consent: { t: 'Personal data processing consent | UNIT.FURNITURE', noindex: true, legal: true }
};
const PHONE = '+62 813 3917 731', MAIL = 'hello@unit.furniture', IG = 'https://www.instagram.com/unit.furniture/';
const OG = SITE + 'og.jpg';
const pageUrl = (l, p) => SITE + (l === 'en' ? '' : l + '/') + (p === 'index' ? '' : p);
const attr = s => String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
const plain = s => String(s).replace(/<[^>]+>/g, '').replace(/&nbsp;| /g, ' ').replace(/\s+/g, ' ').trim();

/* ---------- текст на язык: то же, что делает setLang в браузере ---------- */
function closeOf(s, tag, from) {
  const re = new RegExp(`<(/?)${tag}(?=[\\s>/])[^>]*>`, 'gi');
  re.lastIndex = from;
  let depth = 1, m;
  while ((m = re.exec(s))) { depth += m[1] ? -1 : 1; if (!depth) return m.index; }
  throw new Error('не закрыт <' + tag + '>');
}
function translate(html, l) {
  const dict = dictOf(l);
  // с конца: вложенные ключи заменяются раньше внешних
  const hits = [...html.matchAll(/<([a-z][a-z0-9]*)\b[^>]*\sdata-i18n="([^"]+)"[^>]*>/gi)].reverse();
  for (const m of hits) {
    const v = dict[m[2]];
    if (v == null) continue;
    const start = m.index + m[0].length, end = closeOf(html, m[1], start);
    html = html.slice(0, start) + glue(v, l) + html.slice(end);
  }
  html = html.replace(/<[a-z][^>]*\sdata-i18n-ph="([^"]+)"[^>]*>/gi, (tag, k) => dict[k] == null ? tag
    : / placeholder="/.test(tag) ? tag.replace(/ placeholder="[^"]*"/, ` placeholder="${attr(dict[k])}"`) : tag.replace(/>$/, ` placeholder="${attr(dict[k])}">`));
  html = html.replace(/<img\b[^>]*\sdata-i18n-alt="([^"]+)"[^>]*>/gi, (tag, k) => dict[k] == null ? tag : tag.replace(/ alt="[^"]*"/, ` alt="${attr(plain(dict[k]))}"`));
  if (l !== 'ru') {
    const AT = Object.assign({}, win.ATTR_TR.en, win.ATTR_TR[l]);
    html = html.replace(/<[a-z][^>]*>/gi, tag => tag.replace(/ (aria-label|alt)="([^"]*)"/g, (a, n, v) =>
      (n === 'alt' && /data-i18n-alt=/.test(tag)) || !AT[v] ? a : ` ${n}="${attr(AT[v])}"`));
  }
  return html;
}

/* ---------- выбор языка в шапке ---------- */
const fileOf = p => p === 'index' ? '' : p + '.html';
function langMenu(p, l, R) {
  const dict = dictOf(l);
  const href = x => (R + (x === 'en' ? '' : x + '/') + fileOf(p)) || './';
  return `<div class="lang-dd">
        <button type="button" class="lang-dd-btn" aria-expanded="false" aria-controls="langList" aria-label="${attr(dict['lang.label'])}: ${attr(NATIVE[l])}"><span>${l.toUpperCase()}</span><svg viewBox="0 0 12 12" aria-hidden="true"><path d="M2.5 4.5 6 8l3.5-3.5"/></svg></button>
        <ul class="lang-dd-list" id="langList" hidden>
${LANGS.map(x => `          <li><a href="${href(x)}" hreflang="${x}" lang="${x}"${x === l ? ' aria-current="true"' : ''}>${NATIVE[x]}</a></li>`).join('\n')}
        </ul>
      </div>`;
}

/* язык по ссылке ?lang= и по куки (только на английском корне), ботов не уводим */
const redirect = `<script>(function(){var d=document.documentElement,R=d.getAttribute('data-root')||'',L=/^(${LANGS.join('|')})$/;if(/bot|crawl|spider|slurp|lighthouse|headless|preview/i.test(navigator.userAgent))return;var w=(location.search.match(/[?&]lang=([a-z]{2})/)||[])[1];if(!w&&!R){var m=document.cookie.match(/(?:^|;\\s*)uf_lang=([a-z]{2})/);w=m&&m[1]}if(!w||w===d.lang||!L.test(w))return;var p=location.pathname,i=p.lastIndexOf('/'),dir=p.slice(0,i+1),f=p.slice(i+1);if(R)dir=dir.replace(/[^\\/]+\\/$/,'');var s=location.search.replace(/([?&])lang=[a-z]{2}&?/,'$1').replace(/[?&]$/,'');location.replace(dir+(w==='en'?'':w+'/')+f+s+location.hash)})();</script>`;

function seoBlock(p, l, nl) {
  const m = PAGES[p], dict = dictOf(l), url = pageUrl(l, p);
  const ld = p === 'index'
    ? { '@context': 'https://schema.org', '@graph': [
        { '@type': 'FurnitureStore', '@id': SITE + '#org', name: 'UNIT.FURNITURE', url: SITE, logo: SITE + 'favicon.svg', image: OG, telephone: PHONE, email: MAIL, sameAs: [IG], areaServed: 'Bali, Indonesia',
          address: { '@type': 'PostalAddress', streetAddress: 'Jalan Pantai Nyanyi, Beraban', addressLocality: 'Kediri, Tabanan', addressRegion: 'Bali', postalCode: '80351', addressCountry: 'ID' },
          parentOrganization: { '@type': 'Organization', name: 'UNIT.DEVELOPER', url: 'https://unitdeveloper.com/' } },
        { '@type': 'WebSite', '@id': SITE + '#site', name: 'UNIT.FURNITURE', url: SITE, inLanguage: LANGS, publisher: { '@id': SITE + '#org' } }] }
    : m.crumb ? { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [
        { '@type': 'ListItem', position: 1, name: plain(dict['crumb.home']), item: pageUrl(l, 'index') },
        { '@type': 'ListItem', position: 2, name: plain(dict[m.crumb]), item: url }] } : null;
  return ['<!-- seo -->',
    `<link rel="canonical" href="${url}">`,
    ...LANGS.map(x => `<link rel="alternate" hreflang="${x}" href="${pageUrl(x, p)}">`),
    `<link rel="alternate" hreflang="x-default" href="${pageUrl('en', p)}">`,
    `<meta name="theme-color" content="#ffffff">`,
    `<meta property="og:type" content="${m.product ? 'product' : 'website'}">`,
    `<meta property="og:site_name" content="UNIT.FURNITURE">`,
    `<meta property="og:locale" content="${LOCALE[l]}">`,
    `<meta property="og:url" content="${url}">`,
    `<meta property="og:title" content="${attr(m.t.replace(/ \| UNIT\.FURNITURE$/, ''))}">`,
    `<meta property="og:description" content="${attr(m.d)}">`,
    `<meta property="og:image" content="${OG}">`,
    `<meta property="og:image:width" content="1200">`,
    `<meta property="og:image:height" content="630">`,
    `<meta name="twitter:card" content="summary_large_image">`,
    ld ? `<script type="application/ld+json">${JSON.stringify(ld)}</script>` : '',
    '<!-- /seo -->'].filter(Boolean).join(nl);
}

/* юр. страницы: на адресе один язык; тексты языков кроме RU/EN лежат в _build/legal/<страница>.<код>.html */
function legalFor(s, p, l) {
  const ru = s.indexOf('<div class="lang-block" data-lang-block="ru">'), en = s.indexOf('<div class="lang-block" data-lang-block="en"'), end = s.indexOf('</main>');
  if (ru < 0 || en < 0 || end < 0) throw new Error('нет языковых блоков: ' + p);
  const enBlock = s.slice(en, end).trim().replace(' hidden>', '>');
  const frag = path.join(SRC, '_build', 'legal', `${p}.${l}.html`);
  const block = l === 'ru' ? s.slice(ru, en).trim() : l === 'en' ? enBlock
    : fs.existsSync(frag) ? `<div class="lang-block" data-lang-block="${l}">\n  ${fs.readFileSync(frag, 'utf8').trim().replace(/>([^<]+)</g, (m, t) => '>' + glue(t, l) + '<')}\n</div>` : enBlock;
  s = s.slice(0, ru) + block.replace(/ id="en"/, '') + '\n' + s.slice(end);
  // прежние скрипты переключали блоки по ?lang= и localStorage, теперь язык задан адресом
  return s.replace(/<script>\r?\n\(function \(\) \{\r?\n  var params[\s\S]*?<\/script>\r?\n/, '').replace(/<script>\r?\nwindow\.__uf_onLangChangePage[\s\S]*?<\/script>\r?\n/, '');
}

/* пути: в исходнике часть файлов лежит в v2/, на сайте всё от корня */
const flatten = s => s.replace(/(["'(|])(?:\.\.\/)?v2\/(assets|fonts|favicon\.svg)/g, (m, q, w) => q + (m.includes('../') ? '../' : '') + w);
const subdir = s => s
  .replace(/(\s(?:href|src|poster)=")(?!https?:|mailto:|tel:|#|data:|\/\/|javascript:|\.\.\/)((?:css|js|assets|fonts)\/|favicon\.svg|og\.jpg)/g, '$1../$2')
  .replace(/url\((['"]?)(assets\/)/g, 'url($1../$2')
  .replace(/(data-slides=")([^"]+)/g, (m, a, v) => a + v.split('|').map(x => /^(https?:|\.\.\/)/.test(x) ? x : '../' + x).join('|'));

/* ---------- сборка ---------- */
let pagesOut = 0;
LANGS.filter(l => l !== 'en').forEach(l => fs.rmSync(path.join(OUT, l), { recursive: true, force: true }));
ALL.filter(l => !LANGS.includes(l)).forEach(l => fs.rmSync(path.join(OUT, l), { recursive: true, force: true }));
for (const p of Object.keys(PAGES)) {
  const raw = flatten(fs.readFileSync(path.join(SRC, p + '.html'), 'utf8'));
  const nl = raw.includes('\r\n') ? '\r\n' : '\n';
  for (const l of LANGS) {
    const R = l === 'en' ? '' : '../';
    let s = PAGES[p].legal ? legalFor(raw, p, l) : raw;
    s = translate(s, l);
    s = s.replace(/<html lang="[^"]*"[^>]*>/, `<html lang="${l}"${R ? ` data-root="${R}"` : ''}>`);
    s = s.replace(/<title[^>]*>[\s\S]*?<\/title>/, `<title>${PAGES[p].t}</title>`);
    s = s.replace(/<meta name="description"[^>]*>/, PAGES[p].d ? `<meta name="description" content="${attr(PAGES[p].d)}">` : '');
    s = s.replace(/[ \t]*<!-- seo -->[\s\S]*?<!-- \/seo -->\r?\n?/, '');
    // замены функциями: в скриптах есть $1, строкой их бы съел replace
    if (!PAGES[p].noindex) s = s.replace(/(<link rel="icon"[^>]*>)\r?\n/, (m, a) => a + nl + seoBlock(p, l, nl) + nl);
    s = s.replace(/<meta name="viewport"[^>]*>/, m => m + nl + redirect);
    s = s.replace('<!--lang-->', () => langMenu(p, l, R));
    if (l !== 'en' && l !== 'ru') s = s.replace(/(<script src="js\/i18n\.js[^"]*"><\/script>)/, `$1${nl}<script src="js/i18n-${l}.js"></script>`);
    if (R) s = subdir(s);
    const dir = path.join(OUT, R ? l : '');
    fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(path.join(dir, p + '.html'), s);
    pagesOut++;
  }
}

/* стили и скрипты */
fs.mkdirSync(path.join(OUT, 'js'), { recursive: true });
fs.mkdirSync(path.join(OUT, 'css'), { recursive: true });
for (const f of fs.readdirSync(path.join(SRC, 'js')).filter(f => f.endsWith('.js') && f !== 'mix.js'))
  fs.writeFileSync(path.join(OUT, 'js', f), flatten(fs.readFileSync(path.join(SRC, 'js', f), 'utf8')));
fs.writeFileSync(path.join(OUT, 'css/styles.css'), flatten(fs.readFileSync(path.join(SRC, 'css/styles.css'), 'utf8')));

/* картинки: новые докладываем, существующие не трогаем (в исходнике есть assets/ и v2/assets/ с одинаковыми именами) */
let added = 0;
const copyNew = (from, to) => {
  if (!fs.existsSync(from)) return;
  for (const e of fs.readdirSync(from, { withFileTypes: true })) {
    const a = path.join(from, e.name), b = path.join(to, e.name);
    if (e.isDirectory()) { fs.mkdirSync(b, { recursive: true }); copyNew(a, b); }
    else if (!fs.existsSync(b)) { fs.copyFileSync(a, b); added++; }
  }
};
copyNew(path.join(SRC, 'v2/assets'), path.join(OUT, 'assets'));
copyNew(path.join(SRC, 'assets'), path.join(OUT, 'assets'));

/* версия в адресе css/js/QR по содержимому: после выкладки браузер не берёт старый файл из кеша */
const ver = {};
const v = p => ver[p] ??= createHash('md5').update(fs.readFileSync(path.join(OUT, p))).digest('hex').slice(0, 8);
for (const dir of ['', ...LANGS.filter(l => l !== 'en')]) for (const f of fs.readdirSync(path.join(OUT, dir)).filter(f => f.endsWith('.html'))) {
  const fp = path.join(OUT, dir, f);
  fs.writeFileSync(fp, fs.readFileSync(fp, 'utf8').replace(/((?:href|src)=")((?:\.\.\/)?)((?:css|js)\/[\w.-]+\.(?:css|js)|assets\/qr-wa\.png)(?:\?v=\w+)?"/g, (m, a, up, p) => a + up + p + '?v=' + v(p) + '"'));
}

/* карта сайта и robots */
const pv = {};
vm.runInNewContext(fs.readFileSync(path.join(SRC, 'js/data.js'), 'utf8'), { window: pv });
const xml = u => u.replace(/&/g, '&amp;');
const entries = Object.entries(PAGES).filter(([, m]) => !m.noindex && !m.product).map(([p]) => l => pageUrl(l, p))
  .concat((pv.PRODUCTS || []).map(pr => l => pageUrl(l, 'product') + '?id=' + pr.id));
const alts = f => LANGS.map(x => `<xhtml:link rel="alternate" hreflang="${x}" href="${xml(f(x))}"/>`).join('') + `<xhtml:link rel="alternate" hreflang="x-default" href="${xml(f('en'))}"/>`;
fs.writeFileSync(path.join(OUT, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${entries.flatMap(f => LANGS.map(l => `  <url><loc>${xml(f(l))}</loc>${alts(f)}</url>`)).join('\n')}
</urlset>
`);
fs.writeFileSync(path.join(OUT, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${SITE}sitemap.xml\n`);
console.log(`release: языки ${LANGS.join(' ')}, страниц ${pagesOut}, новых картинок ${added}, в карте сайта ${entries.length * LANGS.length}, сайт ${SITE}`);
