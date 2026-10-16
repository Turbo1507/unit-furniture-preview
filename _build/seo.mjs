// Мета для поисковиков и превью ссылок (Telegram, WhatsApp, Instagram): title RU/EN, canonical, hreflang, og, JSON-LD, sitemap.xml, robots.txt.
// Адрес сайта один на всё: при переезде на домен запустить заново с новым адресом.
//   node _build/seo.mjs https://unit.furniture/
import fs from 'fs';
import vm from 'vm';
import path from 'path';
import { fileURLToPath } from 'url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..') + '/';
const SITE = (process.argv[2] || 'https://turbo1507.github.io/unit-furniture-preview/v2/').replace(/\/?$/, '/');
const OG = SITE + 'og.jpg';
const PHONE = '+62 813 3917 731', MAIL = 'info@unitdeveloper.com', IG = 'https://www.instagram.com/unit.developer/';

const PAGES = {
  index: {
    ru: 'Хай-тек мебель и интерьеры на Бали | UNIT.FURNITURE', en: 'Hi-tech furniture and interiors in Bali | UNIT.FURNITURE',
    dru: 'Хай-тек мебель собственного производства на Бали: кровати, диваны, кресла, outdoor. От одной модели до комплектации виллы, отеля или ресторана под ключ.',
    den: 'Hi-tech furniture made in our own workshop in Bali: beds, sofas, armchairs, outdoor. From a single piece to furnishing a whole villa, hotel or restaurant.'
  },
  catalog: {
    ru: 'Каталог мебели: кровати, диваны, кресла, outdoor | UNIT.FURNITURE', en: 'Furniture catalog: beds, sofas, armchairs, outdoor | UNIT.FURNITURE',
    crumb: ['Каталог', 'Catalog'],
    den: 'UNIT.FURNITURE catalog: beds, sofas, armchairs and chairs, outdoor, sun loungers, poufs, textiles. Price on request, customized for your property.'
  },
  solutions: {
    ru: 'Готовые интерьерные решения | UNIT.FURNITURE', en: 'Ready-made interior solutions | UNIT.FURNITURE', crumb: ['Решения', 'Solutions'],
    den: 'Ready-made UNIT.FURNITURE solutions: bedroom, living room, terrace, outdoor lounge, reception, restaurant and turnkey furnishing in Bali.'
  },
  customization: {
    ru: 'Кастомизация мебели под ваш объект | UNIT.FURNITURE', en: 'Custom furniture for your property | UNIT.FURNITURE', crumb: ['Кастомизация', 'Customization'],
    den: 'Furniture customized for your property: sizes, fabrics, colors, wood tones, configuration and full sets for villas, homes, hotels and restaurants in Bali.'
  },
  materials: {
    ru: 'Материалы и производство на Бали | UNIT.FURNITURE', en: 'Materials and production in Bali | UNIT.FURNITURE', crumb: ['Материалы', 'Materials'],
    den: 'UNIT.FURNITURE materials: teak and other wood, fabrics, fillings, hardware. Made in Bali with tropical humidity and climate in mind.'
  },
  projects: {
    ru: 'Мебель в реальных объектах | UNIT.FURNITURE', en: 'Our furniture in real projects | UNIT.FURNITURE', crumb: ['Проекты', 'Projects'],
    den: 'UNIT.FURNITURE in real interiors: villas, outdoor areas and commercial spaces by UNIT in Bali.'
  },
  designers: {
    ru: 'Для дизайнеров и архитекторов | UNIT.FURNITURE', en: 'For interior designers and architects | UNIT.FURNITURE', crumb: ['Дизайнерам', 'For designers'],
    den: 'UNIT.FURNITURE is a production partner for interior designers and architects in Bali: furniture from our catalog, your references, drawings and specs.'
  },
  contacts: {
    ru: 'Контакты | UNIT.FURNITURE', en: 'Contacts | UNIT.FURNITURE', crumb: ['Контакты', 'Contacts'],
    den: 'Contact UNIT.FURNITURE: WhatsApp, email, Instagram, request form. Bali, Indonesia.'
  },
  product: { ru: 'Модель | UNIT.FURNITURE', product: true },
  legal: { ru: 'Юридическая информация | UNIT.FURNITURE', en: 'Legal information | UNIT.FURNITURE', noindex: true },
  consent: { ru: 'Согласие на обработку персональных данных | UNIT.FURNITURE', en: 'Personal data processing consent | UNIT.FURNITURE', noindex: true }
};

const attr = s => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
// nginx на домене отдаёт страницы без .html (с .html уводит 301), canonical сразу чистый
const urlOf = p => SITE + (p === 'index' ? '' : p);
const enUrl = u => u + (u.includes('?') ? '&' : '?') + 'lang=en';

const ORG = {
  '@type': 'FurnitureStore', '@id': SITE + '#org', name: 'UNIT.FURNITURE', url: SITE, logo: SITE + 'favicon.svg', image: OG,
  telephone: PHONE, email: MAIL, sameAs: [IG], areaServed: 'Bali, Indonesia',
  address: { '@type': 'PostalAddress', streetAddress: 'Jalan Pantai Nyanyi, Beraban', addressLocality: 'Kediri, Tabanan', addressRegion: 'Bali', postalCode: '80351', addressCountry: 'ID' },
  parentOrganization: { '@type': 'Organization', name: 'UNIT.DEVELOPER', url: 'https://unitdeveloper.com/' }
};

for (const [p, m] of Object.entries(PAGES)) {
  const f = ROOT + p + '.html';
  let s = fs.readFileSync(f, 'utf8');
  const nl = s.includes('\r\n') ? '\r\n' : '\n';
  s = s.replace(/<title[^>]*>[\s\S]*?<\/title>/, `<title${m.en ? ` data-en="${attr(m.en)}"` : ''}>${m.ru}</title>`);
  s = s.replace(/[ \t]*<!-- seo -->[\s\S]*?<!-- \/seo -->\r?\n?/, '');
  if (m.noindex) { fs.writeFileSync(f, s); continue; }

  const dm = s.match(/<meta name="description" content="([^"]*)"[^>]*>/);
  const dru = m.dru || (dm ? dm[1] : '');
  if (dm) s = s.replace(dm[0], `<meta name="description" content="${attr(dru)}"${m.den ? ` data-en="${attr(m.den)}"` : ''}>`);
  const url = urlOf(p);
  const ld = p === 'index'
    ? { '@context': 'https://schema.org', '@graph': [ORG, { '@type': 'WebSite', '@id': SITE + '#site', name: 'UNIT.FURNITURE', url: SITE, inLanguage: ['ru', 'en'], publisher: { '@id': SITE + '#org' } }] }
    : m.crumb ? { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Главная', item: SITE },
        { '@type': 'ListItem', position: 2, name: m.crumb[0], item: url }] } : null;
  const head = [
    '<!-- seo -->',
    `<link rel="canonical" href="${url}">`,
    `<link rel="alternate" hreflang="ru" href="${url}">`,
    `<link rel="alternate" hreflang="en" href="${enUrl(url)}">`,
    `<link rel="alternate" hreflang="x-default" href="${url}">`,
    `<meta name="theme-color" content="#ffffff">`,
    `<meta property="og:type" content="${m.product ? 'product' : 'website'}">`,
    `<meta property="og:site_name" content="UNIT.FURNITURE">`,
    `<meta property="og:locale" content="ru_RU">`,
    `<meta property="og:locale:alternate" content="en_US">`,
    `<meta property="og:url" content="${url}">`,
    `<meta property="og:title" content="${attr(m.ru.replace(/ \| UNIT\.FURNITURE$/, ''))}">`,
    `<meta property="og:description" content="${attr(dru)}">`,
    `<meta property="og:image" content="${OG}">`,
    `<meta property="og:image:width" content="1200">`,
    `<meta property="og:image:height" content="630">`,
    `<meta name="twitter:card" content="summary_large_image">`,
    ld ? `<script type="application/ld+json">${JSON.stringify(ld)}</script>` : '',
    '<!-- /seo -->'
  ].filter(Boolean).join(nl);
  s = s.replace(/(<link rel="icon"[^>]*>)\r?\n/, `$1${nl}${head}${nl}`);
  if (!s.includes('<!-- seo -->')) throw new Error('нет места под мета: ' + p);
  fs.writeFileSync(f, s);
}

// карта сайта: страницы + все модели каталога, у каждой адрес RU и EN
const win = {};
vm.runInNewContext(fs.readFileSync(ROOT + 'js/data.js', 'utf8'), { window: win });
const urls = Object.entries(PAGES).filter(([, m]) => !m.noindex && !m.product).map(([p]) => urlOf(p))
  .concat((win.PRODUCTS || []).map(p => SITE + 'product?id=' + p.id));
const xml = u => u.replace(/&/g, '&amp;');
fs.writeFileSync(ROOT + 'sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls.map(u => `  <url><loc>${xml(u)}</loc><xhtml:link rel="alternate" hreflang="ru" href="${xml(u)}"/><xhtml:link rel="alternate" hreflang="en" href="${xml(enUrl(u))}"/></url>`).join('\n')}
</urlset>
`);
fs.writeFileSync(ROOT + 'robots.txt', `User-agent: *\nAllow: /\nDisallow: /mix.html\n\nSitemap: ${SITE}sitemap.xml\n`);
console.log('seo:', Object.keys(PAGES).length, 'страниц, в карте сайта', urls.length, 'адресов, сайт', SITE);
