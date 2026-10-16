/* Проверка словарей языков: все ключи на месте, разметка цела, нет кириллицы, нет английского вместо перевода.
   Запуск из site/: node _build/i18n-check.mjs [код…] */
import fs from 'fs';
import vm from 'vm';
const w = {};
const ctx = vm.createContext({ window: w });
vm.runInContext(fs.readFileSync('js/i18n.js', 'utf8'), ctx);
const codes = process.argv.slice(2).length ? process.argv.slice(2) : fs.readdirSync('js').map(f => (f.match(/^i18n-([a-z]{2})\.js$/) || [])[1]).filter(Boolean);
codes.forEach(l => vm.runInContext(fs.readFileSync(`js/i18n-${l}.js`, 'utf8'), ctx));
const tags = s => (String(s).match(/<\/?[a-z][^>]*>|\{n\}/gi) || []).map(t => t.replace(/\s+(alt|title|aria-label)="[^"]*"/g, '')).join('');
// одинаковые с английским допустимы: имена, бренды, единицы, слова, которые так и пишутся
const SAME_OK = /^(Instagram|Email|E-mail|Menu|Outdoor|Indoor|Hotel|Sofa|Model|Brief|Bali|Stepan Fedoseev|Anna Orlova|Indoor \/ Outdoor|Indoor & Outdoor|Catalog|Restaurant|Villa|Puf|Contract|Kontrak|.{0,4})$/i;
let bad = 0;
for (const l of codes) {
  const en = w.I18N.en, d = w.I18N[l] || {}, out = [];
  const miss = Object.keys(en).filter(k => d[k] == null), extra = Object.keys(d).filter(k => en[k] == null);
  if (miss.length) out.push('нет ключей: ' + miss.join(', '));
  if (extra.length) out.push('лишние ключи: ' + extra.join(', '));
  for (const k of Object.keys(d)) {
    const v = String(d[k]);
    if (tags(v) !== tags(en[k])) out.push(`разметка ${k}: ${tags(en[k])} → ${tags(v)}`);
    if (l !== 'uk' && /[А-Яа-яЁёІіЇїЄєҐґ]/.test(v)) out.push('кириллица ' + k);
    if (v === en[k] && !SAME_OK.test(v.replace(/<[^>]+>/g, ''))) out.push(`как в EN ${k}: ${v.slice(0, 50)}`);
    if (/\s—\s/.test(v) && !/—/.test(en[k])) out.push('тире ' + k);
  }
  for (const [T, sub] of [['SPEC_TR', 'keys'], ['SPEC_TR', 'values'], ['NAME_SUFFIX_TR'], ['ATTR_TR']]) {
    const e = sub ? w[T].en[sub] : w[T].en, x = sub ? (w[T][l] || {})[sub] || {} : w[T][l] || {};
    const m = Object.keys(e).filter(k => x[k] == null);
    if (m.length) out.push(`${T}${sub ? '.' + sub : ''} нет: ${m.join(', ')}`);
  }
  for (const p of ['legal', 'consent']) {
    const f = `_build/legal/${p}.${l}.html`;
    if (!fs.existsSync(f)) { out.push('нет ' + f); continue; }
    const s = fs.readFileSync(f, 'utf8');
    if (l !== 'uk' && /[А-Яа-яЁё]/.test(s)) out.push('кириллица в ' + f);
  }
  bad += out.length;
  console.log(`${l}: ${out.length ? '\n  ' + out.join('\n  ') : 'ок'}`);
}
process.exitCode = bad ? 1 : 0;
