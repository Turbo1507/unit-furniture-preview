/* UNIT.FURNITURE — песочница mix.html: направления + ряды каталога, варианты блока 3 */

/* В: заголовок направления со стрелками, фото направления первой плиткой ленты */
function renderMixC() {
  const el = document.getElementById('mixRowsC');
  if (!el) return;
  el.innerHTML = MIX_ROWS.map(r => `
    <div class="mixc-row">
      <div class="mixc-head">
        <h3>${t('dir.' + r.dir + '.t')}</h3>
        <div class="mixc-nav">
          <a class="feat-more" href="${r.href}">${t('feat.more')}</a>
          <button class="mixb-arr mixc-arr is-prev" type="button" aria-label="←"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M15 5l-7 7 7 7"/></svg></button>
          <button class="mixb-arr mixc-arr is-next" type="button" aria-label="→"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M9 5l7 7-7 7"/></svg></button>
        </div>
      </div>
      <div class="products mixc-track">
        <a class="dir-card mixc-photo" href="${r.href}">
          <img src="${r.img}" alt="">
          <div class="dir-in"><p>${glueShort(t('dir.' + r.dir + '.p'))}</p></div>
        </a>
        ${mixCards(r.ids, 8)}
      </div>
    </div>`).join('');
  el.querySelectorAll('.mixc-row').forEach(row => {
    const track = row.querySelector('.mixc-track');
    track.querySelectorAll('img[loading]').forEach(i => i.removeAttribute('loading'));
    const prev = row.querySelector('.is-prev'), next = row.querySelector('.is-next');
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

function renderMix() { renderMixA(); renderMixB(); renderMixC(); syncAddButtons(); }
renderMix();
window.__uf_onLangChangePage = renderMix;
