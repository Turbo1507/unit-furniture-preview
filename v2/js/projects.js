/* UNIT.FURNITURE — проекты: полная галерея + фильтр */

const projGrid = document.getElementById('projGrid');
const projFilter = document.getElementById('projFilter');
let projFilterVal = 'all';

// кадры раскладываются по рядам: сначала верхние кадры трёх колонок, последней идёт терраса
const PROJ_ORDER = ['pr1', 'pr4', 'pr7', 'pr2', 'pr5', 'pr8', 'pr3', 'pr6'];
const projSorted = () => (window.PROJECTS || []).slice().sort((x, y) => PROJ_ORDER.indexOf(x.id) - PROJ_ORDER.indexOf(y.id));
const projCols = () => getComputedStyle(projGrid).gridTemplateColumns.split(' ').length;
function markWide() {
  const vis = [...projGrid.querySelectorAll('.proj-card:not(.hide)')], n = projCols();
  projGrid.querySelectorAll('.is-wide').forEach(c => c.classList.remove('is-wide'));
  // одна пустая клетка в последнем ряду: последний кадр на две колонки
  const rest = vis.length % n;
  if (n > 1 && rest && n - rest === 1) vis[vis.length - 1].classList.add('is-wide');
}
addEventListener('resize', markWide);
function renderProjects() {
  projGrid.innerHTML = projSorted().map(pr => {
    const hidden = projFilterVal !== 'all' && pr.type !== projFilterVal && pr.place !== projFilterVal;
    return `<div class="proj-card${hidden ? ' hide' : ''}">
      <img src="${pr.img}" alt="${escapeHtml(t('proj.' + pr.id + '.t'))}" loading="lazy">
      <div class="proj-in"><h3>${t('proj.' + pr.id + '.t')}</h3><p>${t('proj.' + pr.id + '.p')}</p></div>
    </div>`;
  }).join('');
  markWide();
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
