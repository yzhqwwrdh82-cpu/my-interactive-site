// Page shell: <head>, header, footer, chat widget, icons, shared components.
import { esc, dirOf, absUrl, fmtDate, monogram } from './util.mjs';
import { S } from './strings.mjs';

// ---------- Icons (inline SVG, currentColor) ----------
const P = {
  chat: '<path d="M4 5.5A2.5 2.5 0 0 1 6.5 3h11A2.5 2.5 0 0 1 20 5.5v8a2.5 2.5 0 0 1-2.5 2.5H10l-4.2 3.6c-.5.4-1.3.1-1.3-.6V16A2.5 2.5 0 0 1 4 13.5z"/><path d="M8 8.5h8M8 11.5h5"/>',
  pen: '<path d="M14.5 4.5l5 5L9 20H4v-5z"/><path d="M12.5 6.5l5 5"/>',
  shapes: '<circle cx="7.5" cy="7.5" r="3.5"/><path d="M14 4h6v6h-6z"/><path d="M8 13.5l4.5 7.5h-9z"/><circle cx="17" cy="17" r="3"/>',
  wave: '<path d="M3 12h2M7 8v8M11 5v14M15 9v6M19 7v10M21 12h0"/>',
  brackets: '<path d="M8 5L3 12l5 7M16 5l5 7-5 7M13.5 4l-3 16"/>',
  check: '<path d="M4 6h10M4 12h7M4 18h7"/><path d="M14 16l2.5 2.5L21 13"/>',
  search: '<circle cx="10.5" cy="10.5" r="6.5"/><path d="M15.5 15.5l5 5"/>',
  heart: '<path d="M12 20s-7.5-4.4-7.5-10.1A4.4 4.4 0 0 1 12 7a4.4 4.4 0 0 1 7.5 2.9C19.5 15.6 12 20 12 20z"/>',
  compare: '<path d="M4 6h7v12H4zM13 6h7v12h-7z"/>',
  ext: '<path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5"/>',
  theme: '<circle cx="12" cy="12" r="8"/><path d="M12 4a8 8 0 0 1 0 16z" fill="currentColor" stroke="none"/>',
  menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
  close: '<path d="M6 6l12 12M18 6L6 18"/>',
  send: '<path d="M4 12l16-8-6 16-2.5-6.5z"/>',
  mic: '<rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5.5 11a6.5 6.5 0 0 0 13 0M12 17.5V21"/>',
  phoneOff: '<path d="M4 15.5c4.6-4 11.4-4 16 0l-1.6 2.4-3.4-1.2v-2.4a10 10 0 0 0-6 0v2.4l-3.4 1.2z"/>',
  ok: '<path d="M5 12.5l4.5 4.5L19 7.5"/>',
  minus: '<path d="M6 12h12"/>',
  info: '<circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8h0"/>',
  user: '<circle cx="12" cy="8.5" r="3.5"/><path d="M5 20a7 7 0 0 1 14 0"/>',
  mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3.5 6.5l8.5 7 8.5-7"/>',
  filter: '<path d="M4 6h16M7 12h10M10 18h4"/>',
  arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>',
  box: '<path d="M4 8l8-4 8 4v8l-8 4-8-4z"/><path d="M4 8l8 4 8-4M12 12v8"/>',
  flow: '<circle cx="5.5" cy="6" r="2.5"/><circle cx="18.5" cy="18" r="2.5"/><rect x="15" y="3.5" width="6" height="5" rx="1.5"/><path d="M8 6h7M18 8.5v7M5.5 8.5V15a3 3 0 0 0 3 3H16"/>',
  kanban: '<rect x="3.5" y="4" width="17" height="16" rx="2"/><path d="M9.5 4v16M15 4v16M5.5 8h2M11.5 8h2M17 8h1.5M11.5 11h2"/>',
  megaphone: '<path d="M4 10v4a1 1 0 0 0 1 1h2l6 4V5L7 9H5a1 1 0 0 0-1 1z"/><path d="M16.5 9a4 4 0 0 1 0 6M7 15l1 4"/>',
  home: '<path d="M4 11l8-6.5 8 6.5"/><path d="M6 9.5V20h12V9.5M10 20v-5.5h4V20"/>',
  grid: '<rect x="4" y="4" width="7" height="7" rx="1.5"/><rect x="13" y="4" width="7" height="7" rx="1.5"/><rect x="4" y="13" width="7" height="7" rx="1.5"/><rect x="13" y="13" width="7" height="7" rx="1.5"/>',
  book: '<path d="M12 6.5C10 5 7 4.5 4 5v13c3-.5 6 0 8 1.5 2-1.5 5-2 8-1.5V5c-3-.5-6 0-8 1.5zM12 6.5v13"/>',
  guide: '<path d="M4 5.5l5-1.5 6 2 5-1.5v14l-5 1.5-6-2-5 1.5z"/><path d="M9 4v14M15 6v14"/>',
  globe: '<circle cx="12" cy="12" r="8.5"/><path d="M3.5 12h17M12 3.5c2.5 2.6 3.6 5.4 3.6 8.5s-1.1 5.9-3.6 8.5c-2.5-2.6-3.6-5.4-3.6-8.5S9.5 6.1 12 3.5z"/>',
  bolt: '<path d="M13 3L5 13.5h6L10 21l8-10.5h-6z"/>',
  lock: '<rect x="5" y="10.5" width="14" height="9.5" rx="2"/><path d="M8 10.5V8a4 4 0 0 1 8 0v2.5"/>'
};
export function icon(name, cls = '') {
  return `<svg class="ic ${cls}" viewBox="0 0 24 24" aria-hidden="true" focusable="false" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${P[name] || ''}</svg>`;
}

// ---------- Logo tile ----------
export function logoTile(tool, c, size = 'md') {
  if (tool.logo && tool.logo.source === 'simple-icons') {
    return `<span class="logo logo-${size}"><img src="${c.a('assets/logos/' + tool.logo.slug + '.svg')}" alt="" width="28" height="28" loading="lazy" decoding="async"></span>`;
  }
  return `<span class="logo logo-${size} logo-mono" data-cat="${tool.category}" aria-hidden="true">${esc(monogram(tool.name, tool.monogram))}</span>`;
}

// ---------- <head> ----------
export function head(c, site, { title, desc, noindex = false, jsonld = null, ogImage = 'assets/og-image.png' }) {
  const s = S[c.lang];
  const canon = absUrl(site.siteUrl, c.lang, c.path);
  const alt = absUrl(site.siteUrl, c.o, c.path);
  // Google Analytics hosts are allowed only when analytics is enabled AND configured (data/site.json).
  const ga = site.analyticsOn ? ' https://www.googletagmanager.com https://*.google-analytics.com https://*.analytics.google.com' : '';
  const csp = `default-src 'self'; img-src 'self' data:${ga}; style-src 'self'; font-src 'self'; script-src 'self'${site.analyticsOn ? ' https://www.googletagmanager.com' : ''}; connect-src 'self'${ga}; frame-src 'self'; form-action 'self'; base-uri 'self'; object-src 'none'`;
  const g = site.google || {};
  return `<!doctype html>
<html lang="${c.lang}" dir="${dirOf(c.lang)}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta http-equiv="Content-Security-Policy" content="${csp}">
<meta name="referrer" content="strict-origin-when-cross-origin">
<title>${esc(title)}</title>
<meta name="description" content="${esc(desc)}">
${noindex ? '<meta name="robots" content="noindex, nofollow">' : ''}
<meta name="color-scheme" content="light dark">
<meta name="theme-color" content="#FBF8F3">
<link rel="canonical" href="${canon}">
<link rel="alternate" hreflang="${c.lang}" href="${canon}">
<link rel="alternate" hreflang="${c.o}" href="${alt}">
<link rel="alternate" hreflang="x-default" href="${absUrl(site.siteUrl, 'he', c.path)}">
<meta property="og:type" content="website">
<meta property="og:site_name" content="ToolScout">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(desc)}">
<meta property="og:url" content="${canon}">
<meta property="og:locale" content="${s.locale}">
<meta property="og:image" content="${site.siteUrl}/${ogImage}">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta name="twitter:card" content="summary_large_image">
<link rel="icon" href="${c.a('assets/favicon.svg')}" type="image/svg+xml">
<link rel="icon" href="${c.a('assets/favicon-32.png')}" sizes="32x32" type="image/png">
<link rel="apple-touch-icon" href="${c.a('assets/apple-touch-icon.png')}">
<link rel="preload" href="${c.a(c.lang === 'he' ? 'assets/fonts/rubik-hebrew-wght-normal.woff2' : 'assets/fonts/rubik-latin-wght-normal.woff2')}" as="font" type="font/woff2" crossorigin>
${g.searchConsoleVerification ? `<meta name="google-site-verification" content="${esc(g.searchConsoleVerification)}">` : ''}
${g.adsensePublisherId ? `<meta name="google-adsense-account" content="ca-${esc(g.adsensePublisherId)}">` : ''}
${site.analyticsOn ? `<meta name="ts-analytics" content="${esc(g.ga4MeasurementId)}">\n<script src="${c.a('assets/consent.js')}?v=${site.version}" defer></script>` : ''}
<link rel="stylesheet" href="${c.a('assets/styles.css')}?v=${site.version}">
<script src="${c.a('assets/theme-init.js')}?v=${site.version}"></script>
<script src="${c.a('assets/app.js')}?v=${site.version}" defer></script>
${jsonld ? `<script type="application/ld+json">${JSON.stringify(jsonld).replace(/</g, '\\u003c')}</script>` : ''}
</head>`;
}

export const brandMark = () => '<svg class="brand-mark" viewBox="0 0 32 32" aria-hidden="true" focusable="false"><path d="M16 2l12.1 7L16 16 3.9 9z" fill="#3FD5FF"/><path d="M3.9 9L16 16v14L3.9 23z" fill="#2F6BFF"/><path d="M16 16l12.1-7v14L16 30z" fill="#6B4DFF"/><path d="M16 9.7l5.45 3.15v6.3L16 22.3l-5.45-3.15v-6.3z" fill="#071026"/><path d="M16 9.7v6.3l-5.45 3.15v-6.3z" fill="#0F2560"/><path d="M16 9.7l5.45 3.15v6.3L16 16z" fill="#1B1A63"/><path d="M16 16l5.45 3.15L16 22.3l-5.45-3.15z" fill="#2B63F5"/><path d="M16 2l12.1 7v14L16 30 3.9 23V9z" fill="none" stroke="#9FEFFF" stroke-opacity=".55" stroke-width=".8" stroke-linejoin="round"/></svg>';
export const wordmark = () => '<span class="wordmark">Tool<span>Scout</span></span>';

// ---------- Header ----------
export function header(c, active = '') {
  const s = S[c.lang];
  const link = (href, key, label) => `<a href="${c.u(href)}"${active === key ? ' aria-current="page"' : ''}>${esc(label)}</a>`;
  const nav = `${link('books.html', 'books', s.nav.books)}${link('paths/index.html', 'paths', s.nav.paths)}${link('courses.html', 'courses', s.nav.courses)}${link('catalog.html', 'catalog', s.nav.tools)}${link('guides/index.html', 'guides', s.nav.guides)}`;
  const navMore = `${link('compare.html', 'compare', s.nav.compare)}${link('search.html', 'search', s.nav.search)}`;
  return `
<a class="skip-link" href="#main">${esc(s.skip)}</a>
<header class="site-header">
  <div class="wrap header-row">
    <a class="brand" href="${c.u('index.html')}">
      ${brandMark()}${wordmark()}
    </a>
    <nav class="nav-primary" aria-label="${esc(s.nav.primary)}">${nav}</nav>
    <form class="header-search" role="search" action="${c.u('search.html')}" method="get"><label class="sr-only" for="hs-q">${esc(s.nav.search)}</label>${icon('search')}<input id="hs-q" name="q" type="search" autocomplete="off" placeholder="${esc(c.lang === 'he' ? 'חיפוש ספרים, קורסים, כלים ועוד…' : 'Search books, courses, tools…')}"></form>
    <div class="header-actions">
      <a class="icon-btn search-link" href="${c.u('search.html')}" aria-label="${esc(s.nav.search)}" title="${esc(s.nav.search)}">${icon('search')}</a>
      <a class="icon-btn fav-link" href="${c.u('account.html')}" aria-label="${esc(s.nav.favorites)}" title="${esc(s.nav.favorites)}">${icon('heart')}<span class="fav-count js-only" data-fav-count hidden>0</span></a>
      <button type="button" class="icon-btn js-only" data-theme-toggle data-l-label="${esc(s.theme.label)}" data-l-system="${esc(s.theme.system)}" data-l-light="${esc(s.theme.light)}" data-l-dark="${esc(s.theme.dark)}" aria-label="${esc(s.theme.label)}">${icon('theme')}</button>
      <a class="lang-btn" href="${c.alt()}" hreflang="${c.o}" lang="${c.o}" aria-label="${esc(s.switchLang)}">${esc(s.otherLangName)}</a>
      <details class="menu">
        <summary class="icon-btn" aria-label="${esc(s.nav.menu)}">${icon('menu')}</summary>
        <nav class="menu-panel" aria-label="${esc(s.nav.primary)}">${nav}${navMore}${link('account.html', 'account', s.footer.account)}${link('contact.html', 'contact', s.footer.contact)}</nav>
      </details>
    </div>
  </div>
</header>`;
}

// ---------- Footer ----------
export function footer(c, data, site) {
  const s = S[c.lang];
  const f = s.footer;
  const cats = data.categories.map((cat) => `<li><a href="${c.u('category/' + cat.id + '.html')}">${esc(cat[c.lang])}</a></li>`).join('');
  return `
<footer class="site-footer">
  <div class="wrap footer-grid">
    <div class="footer-brand">
      <a class="brand" href="${c.u('index.html')}">${brandMark()}${wordmark()}</a>
      <p>${esc(f.tagline)}</p>
      <p class="footer-lang"><span>${esc(f.language)}:</span> <strong>${esc(s.langName)}</strong> · <a href="${c.alt()}" hreflang="${c.o}" lang="${c.o}">${esc(s.otherLangName)}</a></p>
    </div>
    <nav aria-label="${esc(s.home.catsTitle)}"><h2>${esc(s.home.catsTitle)}</h2><ul>${cats}</ul></nav>
    <nav aria-label="${esc(f.explore)}"><h2>${esc(f.explore)}</h2><ul>
      <li><a href="${c.u('catalog.html')}">${esc(s.nav.catalog)}</a></li>
      <li><a href="${c.u('compare.html')}">${esc(s.nav.compare)}</a></li>
      <li><a href="${c.u('guides/index.html')}">${esc(s.nav.guides)}</a></li>
      <li><a href="${c.u('books.html')}">${esc(s.nav.books)}</a></li>
      <li><a href="${c.u('courses.html')}">${esc(s.nav.courses)}</a></li>
      <li><a href="${c.u('paths/index.html')}">${esc(s.nav.paths)}</a></li>
      <li><a href="${c.u('search.html')}">${esc(s.nav.search)}</a></li>
      <li><a href="${c.u('how-we-verify.html')}">${esc(s.nav.method)}</a></li>
      <li><a href="${c.u('about.html')}">${esc(s.nav.about)}</a></li>
    </ul></nav>
    <nav aria-label="${esc(f.support)}"><h2>${esc(f.support)}</h2><ul>
      <li><a href="${c.u('contact.html')}">${esc(f.contact)}</a></li>
      <li><a href="${c.u('partners.html')}">${esc(f.partners)}</a></li>
      <li><a href="${c.u('account.html')}">${esc(f.account)}</a></li>
      <li><a href="${c.u('service-preview.html')}">${esc(f.preview)}</a></li>
    </ul></nav>
    <nav aria-label="${esc(f.legal)}"><h2>${esc(f.legal)}</h2><ul>
      <li><a href="${c.u('privacy.html')}">${esc(f.privacy)}</a></li>
      ${site.analyticsOn ? `<li><button type="button" class="linklike" data-consent-open>${esc(f.privacySettings)}</button></li>` : ''}
      <li><a href="${c.u('terms.html')}">${esc(f.terms)}</a></li>
      <li><a href="${c.u('accessibility.html')}">${esc(f.accessibility)}</a></li>
      <li><a href="${c.u('disclosure.html')}">${esc(f.disclosure)}</a></li>
    </ul></nav>
  </div>
  <div class="wrap footer-base">
    <p>© ${new Date(site.updated).getUTCFullYear()} ${esc(f.rights)} · ${esc(s.guides.updated)} ${esc(fmtDate(site.updated, c.lang))}</p>
    <p class="credits">${esc(f.credits)}</p>
  </div>
</footer>`;
}

// ---------- Chat widget (local helper; agent/AI/voice clearly not connected) ----------
export function chatWidget(c) {
  const s = S[c.lang].chat;
  return `
<div class="chat js-only" data-chat data-catalog="${c.a('assets/catalog.json')}" data-catalog-base="${c.u('')}" data-contact="${c.u('contact.html')}" data-catalog-page="${c.u('catalog.html')}">
  <button type="button" class="chat-fab" data-chat-open aria-expanded="false" aria-controls="chat-panel">${icon('chat')}<span>${esc(s.open)}</span></button>
  <section class="chat-panel" id="chat-panel" role="dialog" aria-modal="false" aria-labelledby="chat-title" hidden>
    <header class="chat-head">
      <div class="chat-id">
        <span class="chat-avatar" aria-hidden="true">${icon('search')}</span>
        <div><h2 id="chat-title">${esc(s.title)}</h2><p class="chat-status"><span class="dot dot-ok" aria-hidden="true"></span>${esc(s.status)}</p></div>
      </div>
      <div class="chat-head-actions">
        <button type="button" class="icon-btn sm" disabled aria-disabled="true" aria-label="${esc(s.voiceBtn)}" title="${esc(s.voiceBtn)}">${icon('mic')}</button>
        <button type="button" class="icon-btn sm" data-chat-close aria-label="${esc(s.close)}">${icon('close')}</button>
      </div>
    </header>
    <div class="chat-log" role="log" aria-live="polite" aria-relevant="additions" tabindex="0" data-chat-log></div>
    <div class="chat-modes" role="group" aria-label="${esc(s.title)}">
      <button type="button" class="chip sm" data-chat-mode="search">${esc(s.chips.search)}</button>
      <button type="button" class="chip sm" data-chat-mode="help">${esc(s.chips.help)}</button>
      <button type="button" class="chip sm" data-chat-mode="support">${esc(s.chips.support)}</button>
      <button type="button" class="chip sm is-soon" data-chat-mode="agent" aria-describedby="chat-soon">${esc(s.agent)} <span class="soon">${esc(s.soon)}</span></button>
      <button type="button" class="chip sm is-soon" data-chat-mode="ai" aria-describedby="chat-soon">${esc(s.ai)} <span class="soon">${esc(s.soon)}</span></button>
      <span id="chat-soon" class="sr-only">${esc(s.notConnected)}</span>
    </div>
    <form class="chat-form" data-chat-form>
      <label class="sr-only" for="chat-input">${esc(s.ph)}</label>
      <input id="chat-input" type="text" autocomplete="off" maxlength="200" placeholder="${esc(s.ph)}">
      <button type="submit" class="icon-btn send" aria-label="${esc(s.send)}">${icon('send')}</button>
    </form>
    <p class="chat-foot">${icon('lock')}${esc(s.privacy)}</p>
  </section>
</div>
<template id="chat-i18n">${esc(JSON.stringify({ ...s, foundOne: s.found(1), foundMany: s.found(7).replace('7', '{n}') }, (k, v) => typeof v === 'function' ? undefined : v))}</template>`;
}

function consentBanner(c) {
  const k = S[c.lang].consent;
  return `<section class="consent" id="consent-banner" role="dialog" aria-labelledby="consent-h" hidden>
  <h2 id="consent-h" class="sr-only">${esc(k.title)}</h2>
  <p>${esc(k.body)} <a href="${c.u('privacy.html')}">${esc(S[c.lang].footer.privacy)}</a></p>
  <div class="consent-actions"><button type="button" class="btn btn-primary sm" data-consent="accept">${esc(k.accept)}</button><button type="button" class="btn btn-ghost sm" data-consent="reject">${esc(k.reject)}</button></div>
</section>`;
}

// ---------- Mobile tab bar (phones only; the header menu still holds every link) ----------
export function tabbar(c, active = '', pg = '') {
  const s = S[c.lang];
  const cur = active || (pg === 'home' ? 'home' : '');
  const item = (href, key, ic, label) => `<a href="${c.u(href)}"${cur === key ? ' aria-current="page"' : ''}>${icon(ic)}<span>${esc(label)}</span></a>`;
  return `<nav class="tabbar" aria-label="${esc(s.nav.quick)}">${item('index.html', 'home', 'home', s.nav.home)}${item('books.html', 'books', 'book', s.nav.books)}${item('paths/index.html', 'paths', 'guide', s.nav.paths)}${item('catalog.html', 'catalog', 'grid', s.nav.tools)}${item('search.html', 'search', 'search', s.nav.search)}</nav>`;
}

export function page(c, data, site, opts, body) {
  return `${head(c, site, opts)}
<body data-page="${opts.page || ''}" data-lang="${c.lang}">
${header(c, opts.active)}
<main id="main" tabindex="-1">
${body}
</main>
${footer(c, data, site)}
${tabbar(c, opts.active, opts.page)}
${chatWidget(c)}
${site.analyticsOn ? consentBanner(c) : ''}
<template id="ui-i18n">${esc(JSON.stringify({ card: S[c.lang].card, compare: S[c.lang].compare, tool: S[c.lang].tool, catalog: { countTpl: S[c.lang].catalog.countTpl } }, (k, v) => typeof v === 'function' ? undefined : v))}</template>
</body>
</html>
`;
}

let SITE = null;
export function setSite(site) { SITE = site; }

export function crumbs(c, items) {
  const s = S[c.lang];
  const all = [[c.u('index.html'), s.tool.crumbsHome], ...items];
  let ld = '';
  if (SITE) {
    const here = absUrl(SITE.siteUrl, c.lang, c.path);
    const list = all.map(([href, label], i) => ({ '@type': 'ListItem', position: i + 1, name: label,
      item: i === all.length - 1 ? here : new URL(href || '', here).href }));
    ld = `<script type="application/ld+json">${JSON.stringify({ '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: list }).replace(/</g, '\\u003c')}</script>`;
  }
  return `<nav class="crumbs" aria-label="breadcrumb"><ol>${all.map(([href, label], i) =>
    i === all.length - 1 ? `<li aria-current="page">${esc(label)}</li>` : `<li><a href="${href}">${esc(label)}</a></li>`).join('')}</ol></nav>${ld}`;
}
