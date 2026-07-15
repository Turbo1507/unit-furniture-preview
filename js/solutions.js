/* UNIT.FURNITURE — решения: чипы подходящих моделей из data.js */

function renderSolutionModels() {
  document.querySelectorAll('[data-sol]').forEach(box => {
    const sol = (window.SOLUTIONS || []).find(s => s.id === box.dataset.sol);
    if (!sol || !sol.products.length) { box.remove(); return; }
    box.innerHTML = sol.products.map(id => {
      const p = productById(id);
      return p ? `<a class="pill-tag" href="product.html?id=${p.id}">${escapeHtml(trName(p.name))}</a>` : '';
    }).join('');
  });
}
renderSolutionModels();
window.__uf_onLangChangePage = renderSolutionModels;
