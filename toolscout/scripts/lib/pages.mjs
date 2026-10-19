// Page renderers.
import { esc, fmtDate, t } from './util.mjs';
import { S } from './strings.mjs';
import { icon, logoTile, page, crumbs } from './layout.mjs';
import { guides, comparePresets, legal } from './content.mjs';

const byId = (data) => Object.fromEntries(data.tools.map((x) => [x.id, x]));
const cat = (data, id) => data.categories.find((c) => c.id === id);
const priceName = (data, id, lang) => data.pricing.find((p) => p.id === id)[lang];
const useName = (data, id, lang) => data.uses.find((u) => u.id === id)[lang];
const platName = (data, id, lang) => data.platforms.find((p) => p.id === id)[lang];
const ext = (lang) => `<span class="sr-only"> ${esc(S[lang].card.newTab)}</span>`;

const OWNER_TODO = {
  he: 'להשלמה: שם בעל האתר או העסק, כתובת למשלוח דואר ואימייל ליצירת קשר.',
  en: 'To be completed: site owner or business name, postal address and a contact email.'
};
const A11Y_TODO = {
  he: 'להשלמה: שם רכז/ת הנגישות, טלפון ואימייל. עד שיתווספו הפרטים, אין ערוץ פנייה פעיל.',
  en: 'To be completed: accessibility coordinator name, phone and email. Until these are added, there is no live contact channel.'
};
function ownerBlock(site, L) {
  const o = (site && site.owner) || {};
  if (!o.name || !o.email) return `<p class="todo">${esc(OWNER_TODO[L])}</p>`;
  const parts = [esc(o.name), `<a href="mailto:${esc(o.email)}">${esc(o.email)}</a>`];
  if (o.postalAddress) parts.push(esc(o.postalAddress));
  if (o.businessId) parts.push(esc((L === 'he' ? 'מספר עוסק: ' : 'Business ID: ') + o.businessId));
  return `<p class="owner">${parts.join(' · ')}</p>`;
}
function a11yBlock(site, L) {
  const a = (site && site.owner && site.owner.accessibilityCoordinator) || {};
  if (!a.name || !(a.email || a.phone)) return `<p class="todo">${esc(A11Y_TODO[L])}</p>`;
  const parts = [esc(a.name)];
  if (a.email) parts.push(`<a href="mailto:${esc(a.email)}">${esc(a.email)}</a>`);
  if (a.phone) parts.push(`<a href="tel:${esc(a.phone.replace(/[^+\d]/g, ''))}">${esc(a.phone)}</a>`);
  return `<p class="owner">${parts.join(' · ')}</p>`;
}
// Blocks: [tag, text, condition?]. Special tags: 'todo', 'owner', 'a11yContact'.
// condition 'analytics' / 'ads' renders the block only when that feature is enabled AND configured.
function richText(blocks, site = null, L = 'he') {
  const on = {
    analytics: !!(site && site.analyticsOn),
    ads: !!(site && site.features && site.features.ads && site.google && site.google.adsensePublisherId)
  };
  return blocks.filter((b) => !b[2] || on[b[2]]).map(([tag, text]) => {
    if (tag === 'owner') return ownerBlock(site, L);
    if (tag === 'a11yContact') return a11yBlock(site, L);
    if (tag === 'todo') return `<p class="todo">${esc(text)}</p>`;
    return `<${tag}>${esc(text).replace(/\b(ts-(?:theme|favs|compare|consent))\b/g, '<code class="key" dir="ltr">$1</code>')}</${tag}>`;
  }).join('\n');
}

// Outbound link: approved affiliate URL only when affiliate.status === 'approved' (validator enforces).
export function outLink(tool) {
  const a = tool.affiliate || {};
  const paid = a.status === 'approved' && !!a.url;
  return { href: paid ? a.url : tool.url, rel: paid ? 'sponsored noopener' : 'noopener', paid };
}
function paidNote(tool, lang) {
  return outLink(tool).paid ? `<span class="tag tag-paid" title="${esc(S[lang].card.paidLink)}">${esc(S[lang].card.paidShort)}<span class="sr-only">: ${esc(S[lang].card.paidLink)}</span></span>` : '';
}

export function priceBadge(tool, data, lang) {
  const s = S[lang].card;
  const verified = tool.verification.pricing === 'verified';
  return `<span class="price" data-price="${tool.pricing}">${esc(priceName(data, tool.pricing, lang))}</span>${verified
    ? `<span class="vbadge" title="${esc(s.verified)}">${icon('ok')}<span class="sr-only">${esc(s.verified)}</span></span>` : ''}`;
}

// ---------- Tool card ----------
export function card(tool, data, c, { headingLevel = 3 } = {}) {
  const s = S[c.lang].card;
  const L = c.lang;
  const h = `h${headingLevel}`;
  const search = [tool.name, tool.maker, tool.description.he, tool.description.en, cat(data, tool.category).he, cat(data, tool.category).en,
    ...tool.uses.flatMap((u) => { const x = data.uses.find((y) => y.id === u); return [x.he, x.en, ...((x.syn && x.syn.he) || []), ...((x.syn && x.syn.en) || [])]; }), ...tool.audience.he, ...tool.audience.en,
    tool.pricing === 'free' || tool.pricing === 'freemium' ? 'free חינם חינמי' : '',
    tool.openSource ? 'open source קוד פתוח' : ''].join(' ');
  return `
<li class="tool" data-id="${tool.id}" data-cat="${tool.category}" data-price="${tool.pricing}" data-uses="${tool.uses.join(' ')}" data-platforms="${(tool.platforms || []).join(' ')}" data-open="${tool.openSource ? 1 : 0}" data-added="${tool.addedAt}" data-name="${esc(tool.name.toLowerCase())}" data-search="${esc(search)}">
  <article class="card">
    <div class="card-top">
      ${logoTile(tool, c)}
      <div class="card-title">
        <${h} class="card-name"><a class="card-link" href="${c.u('tools/' + tool.id + '.html')}" data-hl>${esc(tool.name)}</a></${h}>
        <p class="card-meta">${esc(cat(data, tool.category)[L])}</p>
      </div>
      <button type="button" class="fav-btn js-only" data-fav="${tool.id}" aria-pressed="false" aria-label="${esc(s.fav)}: ${esc(tool.name)}" data-l-add="${esc(s.fav)}: ${esc(tool.name)}" data-l-remove="${esc(s.unfav)}: ${esc(tool.name)}">${icon('heart')}</button>
    </div>
    <p class="card-desc" data-hl>${esc(tool.description[L])}</p>
    <div class="card-badges">
      ${priceBadge(tool, data, L)}
      ${tool.openSource ? `<span class="tag tag-open">${esc(s.openSource)}</span>` : ''}
      ${tool.featured ? `<span class="tag tag-pick">${esc(s.pick)}</span>` : ''}
    </div>
    <div class="card-actions">
      <label class="cmp js-only"><input type="checkbox" data-compare="${tool.id}"><span>${esc(s.compare)}</span></label>
      <span class="ext-wrap">${paidNote(tool, L)}<a class="ext-link" href="${esc(outLink(tool).href)}" target="_blank" rel="${outLink(tool).rel}">${esc(s.visit)}${icon('ext')}${ext(L)}<span class="sr-only"> – ${esc(tool.name)}</span></a></span>
    </div>
  </article>
</li>`;
}

// ---------- Home ----------
export function homePage(c, data, site) {
  const s = S[c.lang];
  const L = c.lang;
  const tools = data.tools;
  const picks = tools.filter((x) => x.featured);
  const newest = [...tools].sort((a, b) => b.addedAt.localeCompare(a.addedAt) || a.name.localeCompare(b.name)).slice(0, 6);
  const tiles = tools.map((x) => `<a class="board-tile" href="${c.u('tools/' + x.id + '.html')}" aria-label="${esc(x.name)}" title="${esc(x.name)}">${logoTile(x, c, 'sm')}</a>`).join('');
  const catTiles = data.categories.map((k) => {
    const n = tools.filter((x) => x.category === k.id).length;
    return `<li><a class="cat-tile" data-cat="${k.id}" href="${c.u('category/' + k.id + '.html')}">
      <span class="cat-icon">${icon(k.icon)}</span>
      <span class="cat-name">${esc(k[L])}</span>
      <span class="cat-blurb">${esc(k.blurb[L])}</span>
      <span class="cat-count">${n}</span></a></li>`;
  }).join('');
  const bt = byId(data);
  const presets = comparePresets.map((p) => `<li><a class="preset" href="${c.u('compare/' + p.slug + '.html')}">
      <span class="preset-logos">${p.ids.map((id) => logoTile(bt[id], c, 'xs')).join('')}</span>
      <span class="preset-title">${esc(p.title[L])}</span>${icon('arrow', 'flip')}</a></li>`).join('');
  const guideCards = guides.map((g) => guideCard(g, c, data)).join('');

  const jsonld = { '@context': 'https://schema.org', '@type': 'WebSite', name: 'ToolScout', url: `${site.siteUrl}/${L === 'en' ? 'en/' : ''}`, inLanguage: L,
    potentialAction: { '@type': 'SearchAction', target: `${site.siteUrl}/${L === 'en' ? 'en/' : ''}catalog.html?q={search_term_string}`, 'query-input': 'required name=search_term_string' } };

  return page(c, data, site, { title: s.home.title, desc: s.home.desc, page: 'home', jsonld }, `
<section class="hero">
  <div class="wrap hero-grid">
    <div class="hero-copy">
      <p class="hero-stats">${esc(s.home.stats(tools.length, data.categories.length, fmtDate(site.updated, L)))}</p>
      <h1>${esc(s.home.h1)}</h1>
      <p class="lead">${esc(s.home.lead)}</p>
      <form class="search search-hero" role="search" action="${c.u('catalog.html')}" method="get">
        <label class="sr-only" for="hero-q">${esc(s.catalog.searchLabel)}</label>
        ${icon('search', 'search-ic')}
        <input id="hero-q" name="q" type="search" autocomplete="off" placeholder="${esc(s.home.searchPh)}">
        <button type="submit" class="btn btn-primary">${esc(s.home.searchBtn)}</button>
      </form>
      <div class="intents"><span class="intents-label">${esc(s.home.intentsLabel)}:</span>
        <ul>${s.intents.map(([u, label]) => `<li><a class="chip" href="${c.u('catalog.html')}?use=${u}">${esc(label)}</a></li>`).join('')}</ul>
      </div>
    </div>
    <div class="board" role="group" aria-label="${esc(s.home.boardLabel)}">
      <div class="board-grid">${tiles}<a class="board-tile board-more" href="${c.u('catalog.html')}" aria-label="${esc(s.home.allTools)}">${icon('arrow', 'flip')}</a></div>
    </div>
  </div>
</section>

<section class="section" aria-labelledby="cats-h">
  <div class="wrap">
    <div class="section-head"><h2 id="cats-h">${esc(s.home.catsTitle)}</h2><p>${esc(s.home.catsLead)}</p></div>
    <ul class="cat-grid">${catTiles}</ul>
  </div>
</section>

<section class="section finder-wrap" aria-labelledby="finder-h">
  <div class="wrap">
    <form class="finder panel" action="${c.u('catalog.html')}" method="get" aria-labelledby="finder-h">
      <div class="finder-copy"><h2 id="finder-h">${esc(s.home.finderTitle)}</h2><p>${esc(s.home.finderLead)}</p></div>
      <div class="finder-steps">
        <label class="field"><span><b class="step">1</b>${esc(s.home.finderTask)}</span>
          <select name="use">${data.uses.map((u) => `<option value="${u.id}">${esc(u[L])}</option>`).join('')}</select></label>
        <fieldset class="field"><legend><b class="step">2</b>${esc(s.home.finderBudget)}</legend>
          <label class="opt"><input type="radio" name="price" value="" checked><span>${esc(s.home.finderAny)}</span></label>
          <label class="opt"><input type="radio" name="price" value="free,freemium"><span>${esc(s.home.finderFree)}</span></label></fieldset>
        <label class="field"><span><b class="step">3</b>${esc(s.home.finderPlatform)}</span>
          <select name="platform" aria-describedby="finder-pnote"><option value="">${esc(s.home.finderPlatformAny)}</option>${data.platforms.map((x) => `<option value="${x.id}">${esc(x[L])}</option>`).join('')}</select>
          <small class="hint" id="finder-pnote">${esc(s.home.finderPlatformNote)}</small></label>
      </div>
      <button type="submit" class="btn btn-primary">${icon('search')}${esc(s.home.finderGo)}</button>
    </form>
  </div>
</section>

<section class="section" aria-labelledby="picks-h">
  <div class="wrap">
    <div class="section-head"><h2 id="picks-h">${esc(s.home.picksTitle)}</h2><p>${esc(s.home.picksLead)}</p>
      <a class="text-link" href="${c.u('catalog.html')}">${esc(s.home.allTools)}${icon('arrow', 'flip')}</a></div>
    <ul class="grid">${picks.map((x) => card(x, data, c)).join('')}</ul>
  </div>
</section>

<section class="section band" aria-labelledby="disc-h">
  <div class="wrap band-grid">
    <div><h2 id="disc-h">${esc(s.home.discoverTitle)}</h2><p>${esc(s.home.discoverLead)}</p>
      <a class="btn btn-light" href="${c.u('compare.html')}">${icon('compare')}${esc(s.home.discoverCta)}</a></div>
    <ul class="presets">${presets}</ul>
  </div>
</section>

<section class="section" aria-labelledby="new-h">
  <div class="wrap two-col">
    <div>
      <div class="section-head"><h2 id="new-h">${esc(s.home.newTitle)}</h2><p>${esc(s.home.newLead)}</p></div>
      <ul class="rows">${newest.map((x) => `<li><a class="row" href="${c.u('tools/' + x.id + '.html')}">${logoTile(x, c, 'sm')}
        <span class="row-main"><span class="row-name">${esc(x.name)}</span><span class="row-desc">${esc(x.description[L])}</span></span>
        <span class="row-side"><span class="price" data-price="${x.pricing}">${esc(priceName(data, x.pricing, L))}</span><time datetime="${x.addedAt}">${esc(fmtDate(x.addedAt, L))}</time></span></a></li>`).join('')}</ul>
    </div>
    <aside class="roadmap" aria-labelledby="road-h">
      <span class="tag tag-soon">${esc(s.home.roadmapTag)}</span>
      <span class="roadmap-icon">${icon('box')}</span>
      <h2 id="road-h">${esc(s.home.roadmapTitle)}</h2>
      <p>${esc(s.home.roadmapBody)}</p>
      <a class="text-link" href="${c.u('books.html')}">${esc(s.home.roadmapLink)}${icon('arrow', 'flip')}</a>
    </aside>
  </div>
</section>

<section class="section" aria-labelledby="guides-h">
  <div class="wrap">
    <div class="section-head"><h2 id="guides-h">${esc(s.home.guidesTitle)}</h2><p>${esc(s.home.guidesLead)}</p>
      <a class="text-link" href="${c.u('guides/index.html')}">${esc(s.home.allGuides)}${icon('arrow', 'flip')}</a></div>
    <ul class="guide-grid">${guideCards}</ul>
  </div>
</section>

<section class="section" aria-labelledby="nl-h">
  <div class="wrap">${newsletterBlock(c, 'nl-h')}</div>
</section>
`);
}

export function newsletterBlock(c, headingId, { compact = false } = {}) {
  const s = S[c.lang].newsletter;
  const id = headingId + '-f';
  return `
<div class="newsletter${compact ? ' compact' : ''}">
  <div class="nl-copy">
    <span class="tag tag-soon">${esc(s.demo)}</span>
    <h2 id="${headingId}">${icon('mail')}${esc(s.title)}</h2>
    <p>${esc(s.lead)}</p>
  </div>
  <form class="nl-form demo-form" data-demo-form="newsletter" novalidate aria-labelledby="${headingId}">
    <div class="field">
      <label for="${id}-email">${esc(s.email)}</label>
      <input id="${id}-email" name="email" type="email" autocomplete="email" required aria-describedby="${id}-email-err" data-err="${esc(s.errEmail)}">
      <p class="field-err" id="${id}-email-err" hidden></p>
    </div>
    <div class="check">
      <input id="${id}-consent" name="consent" type="checkbox" required aria-describedby="${id}-consent-err ${id}-dbl" data-err="${esc(s.errConsent)}">
      <label for="${id}-consent">${esc(s.consent)}</label>
    </div>
    <p class="field-err" id="${id}-consent-err" hidden></p>
    <p class="hint" id="${id}-dbl">${esc(s.doubleOptIn)}</p>
    <p class="hint">${esc(s.notice)} <a href="${c.u('privacy.html')}">${esc(S[c.lang].contact.privacy)}</a></p>
    <button type="submit" class="btn btn-primary" disabled data-enable-js>${esc(s.submit)}</button>
    <p class="form-status" role="status" data-status data-not-connected="${esc(s.notConnected)}" hidden></p>
  </form>
</div>`;
}

function guideCard(g, c, data) {
  const s = S[c.lang];
  const bt = byId(data);
  return `<li><a class="guide-card" href="${c.u('guides/' + g.slug + '.html')}">
    <span class="guide-logos">${g.tools.slice(0, 4).map((id) => logoTile(bt[id], c, 'xs')).join('')}</span>
    <span class="guide-title">${esc(g.title[c.lang])}</span>
    <span class="guide-sum">${esc(g.summary[c.lang])}</span>
    <span class="guide-meta">${esc(s.guides.minutes(g.minutes))}</span></a></li>`;
}

// ---------- Catalog ----------
export function catalogPage(c, data, site) {
  const s = S[c.lang];
  const L = c.lang;
  const k = s.catalog;
  const counts = (key, val) => data.tools.filter((x) => (Array.isArray(x[key]) ? x[key].includes(val) : x[key] === val)).length;
  const catChips = [`<button type="button" class="chip" data-f="cat" data-v="all" aria-pressed="true">${esc(k.all)} <span class="n">${data.tools.length}</span></button>`,
    ...data.categories.map((x) => `<button type="button" class="chip" data-f="cat" data-v="${x.id}" aria-pressed="false">${esc(x[L])} <span class="n">${counts('category', x.id)}</span></button>`)].join('');
  const checks = (name, items, countKey) => items.filter((x) => counts(countKey, x.id) > 0).map((x) =>
    `<label class="opt"><input type="checkbox" data-f="${name}" value="${x.id}"><span>${esc(x[L])}</span><span class="n">${counts(countKey, x.id)}</span></label>`).join('');

  return page(c, data, site, { title: k.title, desc: k.desc, page: 'catalog', active: 'catalog' }, `
<section class="page-head">
  <div class="wrap">
    ${crumbs(c, [[null, k.h1]])}
    <h1>${esc(k.h1)}</h1>
    <p class="lead">${esc(k.lead)}</p>
    <form class="search js-only" role="search" data-catalog-search>
      <label class="sr-only" for="q">${esc(k.searchLabel)}</label>
      ${icon('search', 'search-ic')}
      <input id="q" name="q" type="search" autocomplete="off" spellcheck="false" placeholder="${esc(k.searchPh)}" aria-describedby="result-count">
      <kbd class="kbd" aria-hidden="true">/</kbd>
      <button type="button" class="clear-btn" data-clear aria-label="${esc(k.clear)}" hidden>${icon('close')}</button>
    </form>
    <div class="cat-chips js-only" role="group" aria-label="${esc(k.category)}">${catChips}</div>
  </div>
</section>
<section class="wrap catalog-layout" aria-labelledby="results-h">
  <h2 class="sr-only" id="results-h">${esc(k.h1)}</h2>
  <details class="filters js-only" data-filters open>
    <summary class="filters-toggle">${icon('filter')}${esc(k.filters)} <span class="n" data-filter-count hidden></span></summary>
    <div class="filters-body">
      <fieldset><legend>${esc(k.use)}</legend>${checks('use', data.uses, 'uses')}</fieldset>
      <fieldset><legend>${esc(k.price)}</legend>${checks('price', data.pricing, 'pricing')}</fieldset>
      <fieldset><legend>${esc(k.platform)}</legend><p class="hint">${esc(k.platformNote)}</p>${checks('platform', data.platforms, 'platforms')}</fieldset>
      <fieldset><legend>${esc(k.more)}</legend>
        <label class="opt"><input type="checkbox" data-f="open" value="1"><span>${esc(k.openSource)}</span></label>
        <label class="opt"><input type="checkbox" data-f="fav" value="1"><span>${esc(k.favOnly)}</span></label>
      </fieldset>
      <button type="button" class="btn btn-ghost" data-reset>${esc(k.resetAll)}</button>
    </div>
  </details>
  <div class="results">
    <div class="results-bar js-only">
      <p class="result-count" id="result-count" aria-live="polite" data-tpl="${esc(k.countTpl)}" data-one="${esc(k.countOne)}" data-zero="${esc(k.countZero)}">${esc(k.countTpl.replace('{n}', data.tools.length))}</p>
      <label class="sort"><span>${esc(k.sort)}</span>
        <select data-sort><option value="rel">${esc(k.sortRel)}</option><option value="name">${esc(k.sortName)}</option><option value="new">${esc(k.sortNew)}</option></select></label>
    </div>
    <ul class="grid" id="results" tabindex="-1">${data.tools.map((x) => card(x, data, c)).join('')}</ul>
    <div class="empty" data-empty hidden>
      ${icon('search', 'empty-ic')}
      <p class="empty-title">${esc(k.emptyTitle)}</p>
      <p>${esc(k.emptyBody)}</p>
      <button type="button" class="btn btn-primary" data-reset>${esc(k.reset)}</button>
    </div>
    <p class="note">${esc(k.note(fmtDate(site.updated, L)))}</p>
  </div>
</section>
<div class="tray js-only" data-tray hidden>
  <div class="wrap tray-row">
    <p class="tray-label">${esc(k.tray)}: <span data-tray-logos></span></p>
    <p class="tray-max" data-tray-max hidden>${esc(k.trayMax)}</p>
    <div class="tray-actions">
      <button type="button" class="btn btn-ghost sm" data-tray-clear>${esc(k.trayClear)}</button>
      <a class="btn btn-primary sm" data-tray-go href="${c.u('compare.html')}">${icon('compare')}${esc(k.trayGo)} <span data-tray-n></span></a>
    </div>
  </div>
</div>
`);
}

// ---------- Tool page ----------
export function toolPage(c, data, site, tool) {
  const s = S[c.lang];
  const L = c.lang;
  const k = s.tool;
  const category = cat(data, tool.category);
  const similar = data.tools.filter((x) => x.category === tool.category && x.id !== tool.id).slice(0, 3);
  const fact = (f) => `<li>${icon(f.kind === 'pro' ? 'ok' : 'minus')}<span>${esc(f[L])}<a class="src" href="${esc(f.source === 'pricing' ? tool.pricingUrl : tool.url)}" target="_blank" rel="noopener">${esc(f.source === 'pricing' ? k.sourcePricing : k.sourceOfficial)}${ext(L)}</a></span></li>`;
  const pros = tool.pros.map((f) => fact({ ...f, kind: 'pro' })).join('');
  const cons = tool.cons.map((f) => fact({ ...f, kind: 'con' })).join('');
  const status = (v) => `<span class="status ${v === 'verified' ? 'ok' : 'warn'}">${icon(v === 'verified' ? 'ok' : 'info')}${esc(v === 'verified' ? k.sVerified : k.sUnverified)}</span>`;
  const platforms = tool.platforms ? tool.platforms.map((p) => platName(data, p, L)).join(', ') : k.platformsUnverified;
  const jsonld = { '@context': 'https://schema.org', '@type': 'SoftwareApplication', name: tool.name, applicationCategory: category.en,
    url: tool.url, publisher: { '@type': 'Organization', name: tool.maker }, description: tool.description[L], inLanguage: L };
  const bt = byId(data);
  const preset = comparePresets.find((p) => p.ids.includes(tool.id));
  const compareHref = preset ? c.u('compare/' + preset.slug + '.html') : c.u('compare.html') + '?ids=' + [tool.id, ...similar.slice(0, 2).map((x) => x.id)].join(',');

  return page(c, data, site, { title: `${tool.name}: ${tool.description[L]} | ToolScout`.slice(0, 120), desc: `${tool.description[L]} ${s.card.by} ${tool.maker}. ${k.verifiedLead(fmtDate(tool.checkedAt, L))}`, page: 'tool', jsonld }, `
<section class="page-head tool-head">
  <div class="wrap">
    ${crumbs(c, [[c.u('catalog.html'), s.nav.catalog], [c.u('category/' + category.id + '.html'), category[L]], [null, tool.name]])}
    <div class="tool-hero">
      ${logoTile(tool, c, 'lg')}
      <div>
        <h1>${esc(tool.name)}</h1>
        <p class="tool-sub">${esc(s.card.by)} ${esc(tool.maker)} · <a href="${c.u('category/' + category.id + '.html')}">${esc(category[L])}</a></p>
        <div class="card-badges">${priceBadge(tool, data, L)}${tool.openSource ? `<span class="tag tag-open">${esc(s.card.openSource)}</span>` : ''}${tool.featured ? `<span class="tag tag-pick">${esc(s.card.pick)}</span>` : ''}</div>
      </div>
    </div>
  </div>
</section>
<div class="wrap tool-layout">
  <div class="tool-main">
    <section aria-labelledby="what-h" class="panel">
      <h2 id="what-h">${esc(k.what)}</h2>
      <p class="tool-desc">${esc(tool.description[L])}</p>
    </section>
    <section aria-labelledby="facts-h" class="panel facts">
      <div class="panel-head"><h2 id="facts-h">${icon('ok', 'h-ic')}${esc(k.verifiedTitle)}</h2><p>${esc(k.verifiedLead(fmtDate(tool.checkedAt, L)))}</p></div>
      <div class="pc">
        <div><h3>${esc(k.pros)}</h3>${pros ? `<ul class="facts-list pros">${pros}</ul>` : `<p class="muted">${esc(k.noPros)}</p>`}</div>
        <div><h3>${esc(k.cons)}</h3>${cons ? `<ul class="facts-list cons">${cons}</ul>` : `<p class="muted">${esc(k.noCons)}</p>`}</div>
      </div>
      ${tool.verification.note ? `<p class="callout">${icon('info')}${esc(tool.verification.note[L])}</p>` : ''}
    </section>
    <section aria-labelledby="ed-h" class="panel editorial">
      <div class="panel-head"><h2 id="ed-h">${esc(k.editorialTitle)}</h2><p>${esc(k.editorialNote)}</p></div>
      <h3>${esc(k.audience)}</h3>
      <ul class="tags-list">${tool.audience[L].map((a) => `<li>${esc(a)}</li>`).join('')}</ul>
      <h3>${esc(k.uses)}</h3>
      <ul class="tags-list">${tool.uses.map((u) => `<li><a href="${c.u('catalog.html')}?use=${u}">${esc(useName(data, u, L))}</a></li>`).join('')}</ul>
    </section>
  </div>
  <aside class="tool-aside">
    <div class="panel sticky">
      <a class="btn btn-primary block" href="${esc(outLink(tool).href)}" target="_blank" rel="${outLink(tool).rel}">${esc(s.card.visit)}${icon('ext')}${ext(L)}</a>
      ${outLink(tool).paid ? `<p class="fine paid-note">${esc(s.card.paidLink)}</p>` : ''}
      <a class="btn btn-ghost block" href="${esc(tool.pricingUrl)}" target="_blank" rel="noopener">${esc(k.pricingPage)}${icon('ext')}${ext(L)}</a>
      <div class="aside-actions js-only">
        <button type="button" class="btn btn-ghost sm" data-fav="${tool.id}" aria-pressed="false" data-l-add="${esc(s.card.fav)}" data-l-remove="${esc(s.card.unfav)}">${icon('heart')}<span data-fav-label>${esc(s.card.fav)}</span></button>
        <label class="cmp btn btn-ghost sm"><input type="checkbox" data-compare="${tool.id}"><span>${esc(s.card.compare)}</span></label>
      </div>
      <dl class="spec">
        <dt>${esc(k.pricing)}</dt><dd>${esc(priceName(data, tool.pricing, L))}</dd>
        <dt>${esc(k.platforms)}</dt><dd>${esc(platforms)}${tool.platformsUrl ? ` <a class="src" href="${esc(tool.platformsUrl)}" target="_blank" rel="noopener">${esc(k.sourceOfficial)}${ext(L)}</a>` : ''}</dd>
        <dt>${esc(k.openSource)}</dt><dd>${esc(tool.openSource === true ? k.yes : tool.openSource === false ? k.no : k.unknown)}</dd>
        <dt>${esc(k.checked)}</dt><dd><time datetime="${tool.checkedAt}">${esc(fmtDate(tool.checkedAt, L))}</time></dd>
      </dl>
      <h3 class="aside-h">${esc(k.status)}</h3>
      <ul class="status-list"><li><span>${esc(k.fieldPricing)}</span>${status(tool.verification.pricing)}</li><li><span>${esc(k.fieldPlatforms)}</span>${status(tool.verification.platforms)}</li></ul>
      ${outLink(tool).paid ? '' : `<p class="fine">${esc(k.affiliateNone)}</p>`}
      <p class="fine">${esc(tool.logo ? k.logoCredit : k.noLogo)}</p>
    </div>
  </aside>
</div>
<section class="section" aria-labelledby="sim-h">
  <div class="wrap">
    <div class="section-head"><h2 id="sim-h">${esc(k.similar)}</h2>
      <a class="text-link" href="${compareHref}">${icon('compare')}${esc(k.compareWith)}</a></div>
    <ul class="grid">${similar.map((x) => card(x, data, c)).join('')}</ul>
  </div>
</section>
`);
}

// ---------- Category ----------
export function categoryPage(c, data, site, category) {
  const s = S[c.lang];
  const L = c.lang;
  const tools = data.tools.filter((x) => x.category === category.id);
  return page(c, data, site, { title: `${category[L]} | ToolScout`, desc: `${category.intro ? category.intro[L] : category.blurb[L]}`.slice(0, 158), page: 'category' }, `
<section class="page-head">
  <div class="wrap">
    ${crumbs(c, [[c.u('catalog.html'), s.nav.catalog], [null, category[L]]])}
    <div class="cat-hero" data-cat="${category.id}"><span class="cat-icon lg">${icon(category.icon)}</span>
      <div><h1>${esc(category[L])}</h1><p class="lead">${esc(category.blurb[L])} · ${esc(s.catalog.countTpl.replace('{n}', tools.length))}</p></div></div>
    ${category.intro ? `<p class="cat-intro">${esc(category.intro[L])}</p>` : ''}
  </div>
</section>
<section class="section tight" aria-label="${esc(category[L])}">
  <div class="wrap">
    <ul class="grid">${tools.map((x) => card(x, data, c, { headingLevel: 2 })).join('')}</ul>
    <p class="note"><a class="text-link" href="${c.u('catalog.html')}?cat=${category.id}">${esc(s.catalog.filters)}: ${esc(category[L])}${icon('arrow', 'flip')}</a></p>
  </div>
</section>
${tray(c)}
`);
}

function tray(c) {
  const k = S[c.lang].catalog;
  return `<div class="tray js-only" data-tray hidden>
  <div class="wrap tray-row">
    <p class="tray-label">${esc(k.tray)}: <span data-tray-logos></span></p>
    <p class="tray-max" data-tray-max hidden>${esc(k.trayMax)}</p>
    <div class="tray-actions"><button type="button" class="btn btn-ghost sm" data-tray-clear>${esc(k.trayClear)}</button>
      <a class="btn btn-primary sm" data-tray-go href="${c.u('compare.html')}">${icon('compare')}${esc(k.trayGo)} <span data-tray-n></span></a></div>
  </div>
</div>`;
}

// ---------- Compare ----------
export function compareTable(tools, data, c) {
  const s = S[c.lang];
  const L = c.lang;
  const r = s.compare.rows;
  const k = s.tool;
  const freeOf = (x) => x.pricing === 'unverified' ? s.compare.freeUnknown : (x.pricing === 'paid' ? s.compare.freeNo : s.compare.freeYes);
  const facts = (arr, kind) => arr.length ? `<ul class="facts-list ${kind}">${arr.map((f) => `<li>${icon(kind === 'pros' ? 'ok' : 'minus')}<span>${esc(f[L])}</span></li>`).join('')}</ul>` : `<span class="muted">—</span>`;
  const row = (label, fn) => `<tr><th scope="row">${esc(label)}</th>${tools.map((x) => `<td>${fn(x)}</td>`).join('')}</tr>`;
  return `<div class="table-wrap" tabindex="0" role="region" aria-label="${esc(s.compare.h1)}"><table class="cmp-table">
  <thead><tr><td></td>${tools.map((x) => `<th scope="col"><a class="cmp-head" href="${c.u('tools/' + x.id + '.html')}">${logoTile(x, c, 'sm')}<span>${esc(x.name)}</span></a></th>`).join('')}</tr></thead>
  <tbody>
  ${row(r.category, (x) => esc(cat(data, x.category)[L]))}
  ${row(r.pricing, (x) => `<div class="card-badges">${priceBadge(x, data, L)}</div>`)}
  ${row(r.free, (x) => esc(freeOf(x)))}
  ${row(r.open, (x) => esc(x.openSource === true ? k.yes : x.openSource === false ? k.no : k.unknown))}
  ${row(r.platforms, (x) => esc(x.platforms ? x.platforms.map((p) => platName(data, p, L)).join(', ') : k.platformsUnverified))}
  ${row(r.pros, (x) => facts(x.pros, 'pros'))}
  ${row(r.cons, (x) => facts(x.cons, 'cons'))}
  ${row(r.checked, (x) => `<time datetime="${x.checkedAt}">${esc(fmtDate(x.checkedAt, L))}</time>`)}
  ${row(r.links, (x) => `${paidNote(x, L)}<a class="ext-link" href="${esc(outLink(x).href)}" target="_blank" rel="${outLink(x).rel}">${esc(s.card.visit)}${icon('ext')}${ext(L)}</a><br><a class="ext-link" href="${esc(x.pricingUrl)}" target="_blank" rel="noopener">${esc(k.pricingPage)}${icon('ext')}${ext(L)}</a>`)}
  </tbody></table></div>`;
}

function presetList(c, data, current = '') {
  const L = c.lang;
  const bt = byId(data);
  return `<ul class="presets light">${comparePresets.map((p) => `<li><a class="preset" href="${c.u('compare/' + p.slug + '.html')}"${p.slug === current ? ' aria-current="page"' : ''}>
    <span class="preset-logos">${p.ids.map((id) => logoTile(bt[id], c, 'xs')).join('')}</span><span class="preset-title">${esc(p.title[L])}</span>${icon('arrow', 'flip')}</a></li>`).join('')}</ul>`;
}

export function comparePage(c, data, site) {
  const s = S[c.lang];
  const k = s.compare;
  return page(c, data, site, { title: k.title, desc: k.desc, page: 'compare', active: 'compare' }, `
<section class="page-head">
  <div class="wrap">
    ${crumbs(c, [[null, k.h1]])}
    <h1>${esc(k.h1)}</h1>
    <p class="lead">${esc(k.lead)}</p>
  </div>
</section>
<div class="wrap compare-app">
  <noscript><p class="callout">${esc(k.noscript)}</p></noscript>
  <div class="js-only compare-controls">
    <label class="select"><span>${esc(k.add)}</span>
      <select data-cmp-add><option value="">${esc(k.choose)}</option>${data.categories.map((g) => `<optgroup label="${esc(g[c.lang])}">${data.tools.filter((x) => x.category === g.id).map((x) => `<option value="${x.id}">${esc(x.name)}</option>`).join('')}</optgroup>`).join('')}</select></label>
    <div class="cmp-picked" data-cmp-picked></div>
  </div>
  <div class="js-only" data-cmp-out data-l-remove="${esc(k.remove)}" data-empty="${esc(k.empty)}"></div>
  <p class="hint js-only">${esc(k.share)}</p>
</div>
<section class="section tight" aria-labelledby="presets-h">
  <div class="wrap"><h2 id="presets-h">${esc(k.presets)}</h2>${presetList(c, data)}</div>
</section>
`);
}

export function comparePresetPage(c, data, site, preset) {
  const s = S[c.lang];
  const L = c.lang;
  const bt = byId(data);
  const tools = preset.ids.map((id) => bt[id]);
  return page(c, data, site, { title: `${preset.title[L]} | ToolScout`, desc: preset.lead[L], page: 'compare-preset', active: 'compare' }, `
<section class="page-head">
  <div class="wrap">
    ${crumbs(c, [[c.u('compare.html'), s.compare.h1], [null, preset.title[L]]])}
    <h1>${esc(preset.title[L])}</h1>
    <p class="lead">${esc(preset.lead[L])}</p>
  </div>
</section>
<section class="wrap" aria-label="${esc(preset.title[L])}">
  ${compareTable(tools, data, c)}
  ${preset.who ? `<section class="panel who" aria-labelledby="who-h"><div class="panel-head"><h2 id="who-h">${esc(s.tool.whoTitle)}</h2><p>${esc(s.tool.whoNote)}</p></div>
    <ul class="who-list">${preset.ids.map((id) => preset.who[id] ? `<li>${logoTile(bt[id], c, 'sm')}<div><h3>${esc(bt[id].name)}</h3><p>${esc(preset.who[id][L])}</p></div></li>` : '').join('')}</ul></section>` : ''}
  <p class="note">${esc(s.catalog.note(fmtDate(site.updated, L)))}</p>
  <p><a class="btn btn-ghost" href="${c.u('compare.html')}?ids=${preset.ids.join(',')}">${icon('compare')}${esc(s.home.discoverCta)}</a></p>
</section>
<section class="section tight" aria-labelledby="presets-h">
  <div class="wrap"><h2 id="presets-h">${esc(s.compare.presets)}</h2>${presetList(c, data, preset.slug)}</div>
</section>
`);
}

// ---------- Guides ----------
export function guidesIndex(c, data, site) {
  const s = S[c.lang];
  return page(c, data, site, { title: s.guides.title, desc: s.guides.desc, page: 'guides', active: 'guides' }, `
<section class="page-head"><div class="wrap">${crumbs(c, [[null, s.guides.h1]])}<h1>${esc(s.guides.h1)}</h1><p class="lead">${esc(s.guides.lead)}</p></div></section>
<section class="section tight" aria-label="${esc(s.guides.h1)}"><div class="wrap"><ul class="guide-grid">${guides.map((g) => guideCard(g, c, data)).join('')}</ul></div></section>
`);
}

export function guidePage(c, data, site, g) {
  const s = S[c.lang];
  const L = c.lang;
  const bt = byId(data);
  const jsonld = { '@context': 'https://schema.org', '@type': 'Article', headline: g.title[L], dateModified: g.updated, inLanguage: L, publisher: { '@type': 'Organization', name: 'ToolScout' } };
  return page(c, data, site, { title: `${g.title[L]} | ToolScout`, desc: g.summary[L], page: 'guide', active: 'guides', jsonld }, `
<section class="page-head"><div class="wrap narrow">${crumbs(c, [[c.u('guides/index.html'), s.guides.h1], [null, g.title[L]]])}
  <h1>${esc(g.title[L])}</h1><p class="lead">${esc(g.summary[L])}</p>
  <p class="meta-line">${esc(s.guides.updated)} <time datetime="${g.updated}">${esc(fmtDate(g.updated, L))}</time> · ${esc(s.guides.minutes(g.minutes))}</p></div></section>
<article class="wrap narrow prose">${richText(g.body[L])}</article>
<section class="section" aria-labelledby="gt-h"><div class="wrap"><div class="section-head"><h2 id="gt-h">${esc(s.guides.toolsIn)}</h2></div>
  <ul class="grid">${g.tools.map((id) => card(bt[id], data, c)).join('')}</ul></div></section>
${tray(c)}
`);
}

// ---------- Legal ----------
export function legalPage(c, data, site, key) {
  const s = S[c.lang];
  const L = c.lang;
  const doc = legal[key];
  return page(c, data, site, { title: `${doc.title[L]} | ToolScout`, desc: doc.body[L].find((b) => b[0] === 'p')[1].slice(0, 155), page: 'legal' }, `
<section class="page-head"><div class="wrap narrow">${crumbs(c, [[null, doc.title[L]]])}<h1>${esc(doc.title[L])}</h1>
  <p class="meta-line">${esc(s.guides.updated)} <time datetime="${doc.updated}">${esc(fmtDate(doc.updated, L))}</time></p>
</div></section>
<article class="wrap narrow prose">${richText(doc.body[L], site, L)}</article>
`);
}

// ---------- Contact ----------
export function contactPage(c, data, site) {
  const s = S[c.lang];
  const k = s.contact;
  const f = (id, label, input, err) => `<div class="field"><label for="${id}">${esc(label)} <span class="req" aria-hidden="true">*</span></label>${input}<p class="field-err" id="${id}-err" hidden></p></div>`;
  return page(c, data, site, { title: k.title, desc: k.desc, page: 'contact', active: 'contact' }, `
<section class="page-head"><div class="wrap">${crumbs(c, [[null, k.h1]])}<h1>${esc(k.h1)}</h1><p class="lead">${esc(k.lead)}</p></div></section>
<div class="wrap contact-layout">
  <form class="panel contact-form demo-form" data-demo-form="contact" novalidate aria-labelledby="cf-h">
    <h2 id="cf-h" class="sr-only">${esc(k.h1)}</h2>
    <p class="callout warn">${icon('info')}${esc(k.demo)}</p>
    <p class="field-err summary" data-summary data-text="${esc(k.errSummary)}" role="alert" hidden></p>
    <div class="field-row">
      ${f('cf-name', k.name, `<input id="cf-name" name="name" type="text" autocomplete="name" required minlength="2" aria-describedby="cf-name-err" data-err="${esc(k.errName)}">`)}
      ${f('cf-email', k.email, `<input id="cf-email" name="email" type="email" autocomplete="email" required aria-describedby="cf-email-err" data-err="${esc(k.errEmail)}">`)}
    </div>
    <div class="field"><label for="cf-topic">${esc(k.topic)}</label><select id="cf-topic" name="topic">${k.topics.map((x) => `<option>${esc(x)}</option>`).join('')}</select></div>
    ${f('cf-msg', k.message, `<textarea id="cf-msg" name="message" rows="6" required minlength="10" maxlength="2000" aria-describedby="cf-msg-err" data-err="${esc(k.errMessage)}"></textarea>`)}
    <div class="check"><input id="cf-consent" name="consent" type="checkbox" required aria-describedby="cf-consent-err" data-err="${esc(k.errConsent)}"><label for="cf-consent">${esc(k.consent)} <a href="${c.u('privacy.html')}">${esc(k.privacy)}</a></label></div>
    <p class="field-err" id="cf-consent-err" hidden></p>
    <p class="hint">${esc(k.notice)}</p>
    <button type="submit" class="btn btn-primary" disabled data-enable-js>${icon('send')}${esc(k.send)}</button>
    <p class="form-status" role="status" data-status data-not-connected="${esc(k.notSent)}" hidden></p>
  </form>
  <aside class="contact-aside">
    <div class="panel"><h2>${esc(k.channels)}</h2><p>${esc(k.channelsNote)}</p><p class="fine">${esc(k.a11y)}</p></div>
    ${newsletterBlock(c, 'nl-c', { compact: true })}
  </aside>
</div>
`);
}

// ---------- Account ----------
export function accountPage(c, data, site) {
  const s = S[c.lang];
  const k = s.account;
  const pending = (h, b, ic) => `<section class="panel acc-card is-pending" aria-labelledby="${ic}-h"><div class="acc-head">${icon(ic)}<h2 id="${ic}-h">${esc(h)}</h2><span class="status warn">${icon('info')}${esc(k.pending)}</span></div><p>${esc(b)}</p></section>`;
  return page(c, data, site, { title: k.title, desc: k.desc, page: 'account', active: 'account', noindex: true }, `
<section class="page-head"><div class="wrap">${crumbs(c, [[null, k.h1]])}<h1>${esc(k.h1)}</h1><p class="lead">${esc(k.lead)}</p></div></section>
<div class="wrap acc-grid">
  <section class="panel acc-card acc-favs" aria-labelledby="fav-h">
    <div class="acc-head">${icon('heart')}<h2 id="fav-h">${esc(k.favTitle)}</h2><span class="status ok js-only">${icon('ok')}${esc(k.working)}</span></div>
    <p class="fine">${esc(k.favLocal)}</p>
    <noscript><p>${esc(k.favNoJs)}</p></noscript>
    <ul class="grid js-only" data-fav-list data-base="${c.u('')}" data-assets="${c.a('')}" data-catalog="${c.a('assets/catalog.json')}"></ul>
    <p class="muted js-only" data-fav-empty hidden>${esc(k.favEmpty)}</p>
    <button type="button" class="btn btn-ghost sm js-only" data-fav-clear hidden>${esc(k.favClear)}</button>
  </section>
  ${pending(k.prefsTitle, k.prefsBody, 'mail')}
  ${pending(k.ticketsTitle, k.ticketsBody, 'chat')}
  ${pending(k.loginTitle, k.loginBody, 'user')}
</div>
`);
}
