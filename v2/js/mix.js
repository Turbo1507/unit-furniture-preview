/* UNIT.FURNITURE — песочница mix.html: направления + ряды каталога, варианты блока 3 */

function renderMixC() { renderMixRows('mixRowsC', 'sep'); renderMixRows('mixRowsD', 'lines'); renderMixRows('mixRowsE', 'heads'); renderMixRows('mixRowsF', 'bare'); }

function renderMix() { renderMixA(); renderMixB(); renderMixC(); syncAddButtons(); }
renderMix();
window.__uf_onLangChangePage = renderMix;
