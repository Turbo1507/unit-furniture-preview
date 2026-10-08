/* UNIT.FURNITURE — песочница mix.html: направления + ряды каталога, варианты блока 3 */

/* В: карточка категории стоит в ленте среди моделей и листается вместе с ними */
const MIXC_POS = [0, 2, 1];
const MIXC_HREF = { 1: 'catalog.html?env=indoor' };
const MIXC_GO = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M7 17L17 7M9 7h8v8"/></svg>';
const MIXC_ARR = (cls, d, lbl) => `<button class="mixb-arr ${cls}" type="button" aria-label="${lbl}"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="${d}"/></svg></button>`;
/* sep: названия над рядами и линии между рядами; lines: название в карточке, только линии; heads: названия над рядами без линий */
const MIXC_WIDE = matchMedia('(min-width: 721px)');
function renderMixRows(id, mode) {
  const el = document.getElementById(id);
  if (!el) return;
  if (!el.dataset.mq) { el.dataset.mq = 1; MIXC_WIDE.addEventListener('change', () => { renderMixRows(id, mode); syncAddButtons(); }); }
  el.innerHTML = MIX_ROWS.map((r, k) => {
    const title = t('dir.' + r.dir + '.t');
    const cards = r.ids.map(productById).filter(Boolean).slice(0, 8).map(p => productCard(p, { studio: true }));
    // на телефоне карточка категории всегда первая
    cards.splice(MIXC_WIDE.matches ? MIXC_POS[k] || 0 : 0, 0, `
        <a class="dir-card mixc-cat" href="${MIXC_HREF[r.dir] || r.href}"${mode === 'lines' ? '' : ` aria-label="${title}"`}>
          <img src="${r.img}" alt="">
          <span class="mixc-go" aria-hidden="true">${MIXC_GO}</span>
          <div class="dir-in">
            ${mode === 'lines' ? `<h3>${title}</h3>` : ''}
            <p>${glueShort(t('dir.' + r.dir + '.p'))}</p>
          </div>
        </a>`);
    return `
    <div class="mixc-row">
      ${mode === 'lines' ? '' : `<h3 class="mixc-sep">${title}</h3>`}
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
    const step = () => { const c = track.querySelector('.product'); return c ? c.getBoundingClientRect().width + parseFloat(getComputedStyle(track).columnGap || 0) : track.clientWidth; };
    const sync = () => {
      prev.disabled = track.scrollLeft < 4;
      next.disabled = track.scrollLeft + track.clientWidth > track.scrollWidth - 4;
    };
    prev.addEventListener('click', () => track.scrollBy({ left: -step(), behavior: 'smooth' }));
    next.addEventListener('click', () => track.scrollBy({ left: step(), behavior: 'smooth' }));
    track.addEventListener('scroll', sync, { passive: true });
    sync();
  });
}
function renderMixC() { renderMixRows('mixRowsC', 'sep'); renderMixRows('mixRowsD', 'lines'); renderMixRows('mixRowsE', 'heads'); }

function renderMix() { renderMixA(); renderMixB(); renderMixC(); syncAddButtons(); }
renderMix();
window.__uf_onLangChangePage = renderMix;
