/* UNIT.FURNITURE — песочница mix.html: направления + ряды каталога, варианты блока 3 */

/* В: карточка категории стоит в ленте среди моделей и листается вместе с ними */
const MIXC_POS = [0, 2, 1];
const MIXC_HREF = { 1: 'catalog.html?env=indoor' };
const MIXC_GO = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M7 17L17 7M9 7h8v8"/></svg>';
const MIXC_ARR = (cls, d, lbl) => `<button class="mixb-arr ${cls}" type="button" aria-label="${lbl}"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="${d}"/></svg></button>`;
function renderMixC() {
  const el = document.getElementById('mixRowsC');
  if (!el) return;
  el.innerHTML = MIX_ROWS.map((r, k) => {
    const cards = r.ids.map(productById).filter(Boolean).slice(0, 8).map(p => productCard(p, { studio: true }));
    cards.splice(MIXC_POS[k] || 0, 0, `
        <a class="dir-card mixc-cat" href="${MIXC_HREF[r.dir] || r.href}" aria-label="${t('dir.' + r.dir + '.t')}">
          <img src="${r.img}" alt="">
          <span class="mixc-go" aria-hidden="true">${MIXC_GO}</span>
          <div class="dir-in">
            <p>${glueShort(t('dir.' + r.dir + '.p'))}</p>
          </div>
        </a>`);
    return `
    <div class="mixc-row">
      <h3 class="mixc-sep">${t('dir.' + r.dir + '.t')}</h3>
      <div class="mixb-rail mixc-rail">
        <div class="products mixc-track">${cards.join('')}</div>
        ${MIXC_ARR('is-prev', 'M15 5l-7 7 7 7', '←')}
        ${MIXC_ARR('is-next', 'M9 5l7 7-7 7', '→')}
      </div>
    </div>`;
  }).join('');
  el.querySelectorAll('.mixc-rail').forEach(rail => {
    const track = rail.querySelector('.mixc-track');
    track.querySelectorAll('img[loading]').forEach(i => i.removeAttribute('loading'));
    const prev = rail.querySelector('.is-prev'), next = rail.querySelector('.is-next');
    const step = () => { const c = track.querySelector(".product"); return c ? c.getBoundingClientRect().width + parseFloat(getComputedStyle(track).columnGap || 0) : track.clientWidth; };
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

function renderMix() { renderMixA(); renderMixB(); renderMixC(); syncAddButtons(); }
renderMix();
window.__uf_onLangChangePage = renderMix;
