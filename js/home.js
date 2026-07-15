/* UNIT.FURNITURE — главная: hero-карусель, каскад заголовка, marquee, проекты */

const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ---------- hero: word cascade + slideshow ---------- */
const heroTitle = document.getElementById('heroTitle');
function cascadeTitle() {
  if (!heroTitle) return;
  heroTitle.innerHTML = heroTitle.innerHTML.split(' ').map((w, i) =>
    `<span class="w" style="transition-delay:${60 + i * 70}ms">${w}</span>`).join(' ');
  heroTitle.classList.remove('in');
  requestAnimationFrame(() => requestAnimationFrame(() => heroTitle.classList.add('in')));
}

const heroSlides = document.querySelectorAll('.hero-slide');
const heroDots = document.getElementById('heroDots');
if (heroSlides.length > 1 && heroDots) {
  heroDots.innerHTML = [...heroSlides].map((_, i) => `<button type="button" data-i="${i}"${i === 0 ? ' class="on"' : ''}></button>`).join('');
  let heroIdx = 0;
  function showHeroSlide(i) {
    heroIdx = i;
    heroSlides.forEach((s, si) => s.classList.toggle('on', si === i));
    heroDots.querySelectorAll('button').forEach((b, bi) => b.classList.toggle('on', bi === i));
  }
  heroDots.addEventListener('click', e => {
    const b = e.target.closest('button');
    if (b) { showHeroSlide(+b.dataset.i); restartHeroTimer(); }
  });
  let heroTimer;
  function restartHeroTimer() {
    clearInterval(heroTimer);
    if (reduceMotion) return;
    heroTimer = setInterval(() => showHeroSlide((heroIdx + 1) % heroSlides.length), 5500);
  }
  restartHeroTimer();
}

/* ---------- marquee duplicate ---------- */
const mt = document.getElementById('marqueeTrack');
if (mt) mt.innerHTML += mt.innerHTML;

/* ---------- проекты: masonry + фильтр (первые 6 на главной) ---------- */
const projGrid = document.getElementById('projGrid');
let projFilterVal = 'all';
function renderProjects() {
  if (!projGrid) return;
  const list = (window.PROJECTS || []).slice(0, 6);
  projGrid.innerHTML = list.map(pr => {
    const hidden = projFilterVal !== 'all' && pr.type !== projFilterVal && pr.place !== projFilterVal;
    return `<a class="proj-card${hidden ? ' hide' : ''}" href="projects.html">
      <img src="${pr.img}" alt="${escapeHtml(t('proj.' + pr.id + '.t'))}" loading="lazy">
      <div class="proj-in"><h3>${t('proj.' + pr.id + '.t')}</h3><p>${t('proj.' + pr.id + '.p')}</p></div>
    </a>`;
  }).join('');
}
const projFilter = document.getElementById('projFilter');
if (projFilter) projFilter.addEventListener('click', e => {
  const b = e.target.closest('[data-pf]');
  if (!b) return;
  projFilterVal = b.dataset.pf;
  projFilter.querySelectorAll('.tab').forEach(tb => tb.classList.toggle('active', tb === b));
  renderProjects();
});
renderProjects();

/* ---------- перерисовка при смене языка ---------- */
window.__uf_onLangChangePage = function () {
  cascadeTitle();
  renderProjects();
};
