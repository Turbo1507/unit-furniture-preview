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

renderSolutionModels();
window.__uf_onLangChangePage = renderSolutionModels;
