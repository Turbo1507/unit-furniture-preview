/* UNIT.FURNITURE — решения: к пунктам «Может включать» модели из каталога */

function renderSolutionModels() {
  document.querySelectorAll('[data-sol]').forEach(list => {
    const sol = (window.SOLUTIONS || []).find(s => s.id === list.dataset.sol);
    if (!sol || !sol.items) return;
    list.querySelectorAll(':scope > li').forEach((li, k) => {
      const ids = sol.items[k];
      const links = Array.isArray(ids) ? ids.map(productById).filter(Boolean)
        .map(p => `<a href="product.html?id=${p.id}">${escapeHtml(trName(p.name))}</a>`) : [];
      let b = li.querySelector(':scope > b');
      if (!b) { b = document.createElement('b'); li.appendChild(b); }
      b.innerHTML = links.length ? links.join(', ') : t(ids === 'drawing' ? 'sl.drawing' : 'sl.custom');
      b.classList.toggle('is-muted', !links.length);
      b.classList.toggle('is-multi', links.length > 1);
    });
  });
  if (window.addLeaders) addLeaders();
  // после смены языка словарь ещё клеит короткие слова, поэтому меряем на следующем кадре
  requestAnimationFrame(fitLeaders);
}

/* точки тянутся до текста: перенесённое значение ужимаем до самой длинной строки */
function fitLeaders() {
  document.querySelectorAll('.leaders > li > b').forEach(b => {
    b.style.width = '';
    const r = document.createRange(); r.selectNodeContents(b);
    let l = Infinity, rt = -Infinity; const tops = new Set();
    for (const x of r.getClientRects()) if (x.width) { l = Math.min(l, x.left); rt = Math.max(rt, x.right); tops.add(Math.round(x.top)); }
    if (tops.size > 1) b.style.width = Math.ceil(rt - l + 1) + 'px';
  });
}
let fitT;
addEventListener('resize', () => { cancelAnimationFrame(fitT); fitT = requestAnimationFrame(fitLeaders); });
if (document.fonts && document.fonts.ready) document.fonts.ready.then(fitLeaders);
renderSolutionModels();
window.__uf_onLangChangePage = renderSolutionModels;
