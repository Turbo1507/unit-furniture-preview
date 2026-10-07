/* UNIT.FURNITURE — песочница mix.html: направления + ряды каталога, два варианта */

const MIX_ROWS = [
  { dir: 1, img: 'assets/n/dir-home.jpg', href: 'catalog.html', ids: ['sofaAna', 'bed3', 'sofaObs', 'ch7', 'bed1', 'ch8', 'sofaA', 'ch4'] },
  { dir: 2, img: 'assets/n/dir-outdoor.jpg', href: 'catalog.html?env=outdoor', ids: ['out4', 'out5', 'out3', 'out1', 'out2', 'pilOut'] },
  { dir: 3, img: 'assets/n/dir-commercial.jpg', href: 'catalog.html?cat=commercial', ids: ['sofaRec', 'ch6', 'ch1', 'ch2', 'ch3', 'ch9', 'ch5'] },
];
const mixCards = (ids, n) => ids.map(productById).filter(Boolean).slice(0, n).map(p => productCard(p, { studio: true })).join('');

/* А: заголовок направления, короткое описание, сетка из 4 моделей */
function renderMixA() {
  const el = document.getElementById('mixRowsA');
  if (!el) return;
  el.innerHTML = MIX_ROWS.map(r => `
    <div class="feat-row">
      <div class="feat-head mixa-head">
        <div>
          <h3>${t('dir.' + r.dir + '.t')}</h3>
          <p>${glueShort(t('dir.' + r.dir + '.p'))}</p>
        </div>
        <a class="feat-more" href="${r.href}">${t('feat.more')}</a>
      </div>
      <div class="products feat-grid">${mixCards(r.ids, 4)}</div>
    </div>`).join('');
}

/* Б: фото направления + ряд моделей той же высоты, стрелки листают на одну карточку */
function renderMixB() {
  const el = document.getElementById('mixRowsB');
  if (!el) return;
  el.innerHTML = MIX_ROWS.map(r => `
    <div class="mixb-row">
      <a class="dir-card mixb-photo" href="${r.href}">
        <img src="${r.img}" alt="" loading="lazy">
        <div class="dir-in">
          <h3>${t('dir.' + r.dir + '.t')}</h3>
          <p>${glueShort(t('dir.' + r.dir + '.p'))}</p>
        </div>
      </a>
      <div class="mixb-rail">
        <div class="products mixb-track">${mixCards(r.ids, 8)}</div>
        <button class="mixb-arr is-prev" type="button" aria-label="←" disabled><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M15 5l-7 7 7 7"/></svg></button>
        <button class="mixb-arr is-next" type="button" aria-label="→"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M9 5l7 7-7 7"/></svg></button>
      </div>
    </div>`).join('');
  el.querySelectorAll('.mixb-rail').forEach(rail => {
    const track = rail.querySelector('.mixb-track');
    const prev = rail.querySelector('.is-prev'), next = rail.querySelector('.is-next');
    const step = () => { const c = track.querySelector('.product'); return c ? c.getBoundingClientRect().width + parseFloat(getComputedStyle(track).columnGap || 0) : track.clientWidth; };
    const sync = () => {
      prev.disabled = track.scrollLeft < 4;
      next.disabled = track.scrollLeft + track.clientWidth > track.scrollWidth - 4;
    };
    prev.addEventListener('click', () => track.scrollBy({ left: -step(), behavior: 'smooth' }));
    next.addEventListener('click', () => track.scrollBy({ left: step(), behavior: 'smooth' }));
    track.addEventListener('scroll', sync, { passive: true });
    window.addEventListener('resize', sync);
    sync();
  });
}

function renderMix() { renderMixA(); renderMixB(); syncAddButtons(); }
renderMix();
window.__uf_onLangChangePage = renderMix;
