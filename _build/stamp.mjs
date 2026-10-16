/* Версия в адресе css/js и QR по содержимому файла: после выкладки браузер берёт новый файл, а не недельный кеш.
   Запуск: node _build/stamp.mjs (из папки site/), после правок css/js */
import { readFileSync, writeFileSync, readdirSync } from 'fs';
import { createHash } from 'crypto';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const site = join(dirname(fileURLToPath(import.meta.url)), '..');
const ver = {};
const v = p => ver[p] ??= createHash('md5').update(readFileSync(join(site, p))).digest('hex').slice(0, 8);
let n = 0;
for (const f of readdirSync(site).filter(f => f.endsWith('.html'))) {
  const src = readFileSync(join(site, f), 'utf8');
  const out = src.replace(/((?:href|src)=")((?:css|js)\/[\w.-]+\.(?:css|js)|assets\/qr-wa\.png)(?:\?v=\w+)?"/g, (m, a, p) => a + p + '?v=' + v(p) + '"');
  if (out !== src) { writeFileSync(join(site, f), out); n++; }
}
console.log('stamp: ' + n + ' стр., файлов ' + Object.keys(ver).length);
