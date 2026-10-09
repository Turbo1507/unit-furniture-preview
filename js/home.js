/* UNIT.FURNITURE — главная: hero-карусель, каскад заголовка, marquee, проекты */

const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ---------- прозрачный хедер поверх hero, сплошной после скролла ---------- */
(function () {
  const hero = document.querySelector('.hero');
  const header = document.querySelector('.site-header');
  const nav = document.getElementById('nav');
  if (!hero || !header) return;
  function sync() {
    if (nav && nav.classList.contains('open')) return; /* меню открыто — хедер остаётся сплошным */
    header.classList.toggle('is-transparent', scrollY < 8);
  }
  sync();
  addEventListener('scroll', sync, { passive: true });
  addEventListener('resize', sync);
  window.__uf_syncHeaderTransparency = sync;
})();

/* ---------- hero: слайдшоу ---------- */

const heroSlides = document.querySelectorAll('.hero-slide');
const heroDots = document.getElementById('heroDots');
if (heroSlides.length > 1 && heroDots) {
  heroDots.innerHTML = [...heroSlides].map((_, i) => `<button type="button" data-i="${i}" aria-label="${i + 1} / ${heroSlides.length}"${i === 0 ? ' class="on"' : ''}></button>`).join('');
  const heroCap = document.querySelector('.hero-cap');
  let heroIdx = 0;
  function showHeroSlide(i) {
    heroIdx = i;
    heroSlides.forEach((s, si) => s.classList.toggle('on', si === i));
    heroDots.querySelectorAll('button').forEach((b, bi) => b.classList.toggle('on', bi === i));
    const key = heroSlides[i].dataset.cap;
    const dict = window.I18N && window.I18N[window.__uf_lang || 'ru'];
    if (heroCap && key && dict && dict[key]) { heroCap.setAttribute('data-i18n', key); heroCap.innerHTML = dict[key]; }
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

/* ---------- каталог по комнатам: ряд = заголовок + 4 модели на предметном фото ---------- */
const featRows = document.getElementById('featRows');
function renderFeatured() {
  if (!featRows) return;
  featRows.innerHTML = (window.FEATURED || []).map(r => `
    <div class="feat-row">
      <div class="feat-head">
        <h3>${t('feat.' + r.room)}</h3>
        <a class="feat-more" href="catalog.html?cat=${r.cat}">${t('feat.more')}</a>
      </div>
      <div class="products feat-grid">${r.ids.map(productById).filter(Boolean).map(p => productCard(p, { studio: true })).join('')}</div>
    </div>`).join('');
  syncAddButtons();
}
renderFeatured();
renderMixB(); syncAddButtons();

/* ---------- проекты: masonry, первые 6 ---------- */
const projGrid = document.getElementById('projGrid');
function renderProjects() {
  if (!projGrid) return;
  const list = (window.PROJECTS || []).slice(0, 6);
  projGrid.innerHTML = list.map(pr => {
    return `<a class="proj-card" href="projects.html"><span class="tile-go" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M7 17L17 7M9 7h8v8"/></svg></span>
      <img src="${pr.img}" alt="${escapeHtml(t('proj.' + pr.id + '.t'))}">
      <div class="proj-in"><h3>${t('proj.' + pr.id + '.t')}</h3><p>${t('proj.' + pr.id + '.p')}</p></div>
    </a>`;
  }).join('');
}
renderProjects();

/* ---------- перерисовка при смене языка ---------- */
window.__uf_onLangChangePage = function () {
  renderFeatured();
  renderMixB(); syncAddButtons();
  renderProjects();
};

/* мобильная планка с кнопкой не нужна, пока видно хиро, форму или футер */
const mobCta = document.querySelector('.mob-cta');
if (mobCta && 'IntersectionObserver' in window) {
  const seen = new Set();
  const mo = new IntersectionObserver(es => {
    es.forEach(e => (e.isIntersecting ? seen.add(e.target) : seen.delete(e.target)));
    document.body.classList.toggle('mobcta-off', seen.size > 0);
  });
  [document.getElementById('top-hero'), document.getElementById('final'), document.querySelector('.site-footer')].forEach(el => el && mo.observe(el));
}
