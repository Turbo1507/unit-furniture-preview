/* UNIT.FURNITURE — проекты: полная галерея + фильтр */

const projGrid = document.getElementById('projGrid');
const projFilter = document.getElementById('projFilter');
let projFilterVal = 'all';

function renderProjects() {
  projGrid.innerHTML = (window.PROJECTS || []).map(pr => {
    const hidden = projFilterVal !== 'all' && pr.type !== projFilterVal && pr.place !== projFilterVal;
    return `<div class="proj-card${hidden ? ' hide' : ''}">
      <img src="${pr.img}" alt="${escapeHtml(t('proj.' + pr.id + '.t'))}" loading="lazy">
      <div class="proj-in"><h3>${t('proj.' + pr.id + '.t')}</h3><p>${t('proj.' + pr.id + '.p')}</p></div>
    </div>`;
  }).join('');
}
projFilter.addEventListener('click', e => {
  const b = e.target.closest('[data-pf]');
  if (!b) return;
  projFilterVal = b.dataset.pf;
  projFilter.querySelectorAll('.tab').forEach(tb => tb.classList.toggle('active', tb === b));
  renderProjects();
});
renderProjects();
window.__uf_onLangChangePage = renderProjects;
