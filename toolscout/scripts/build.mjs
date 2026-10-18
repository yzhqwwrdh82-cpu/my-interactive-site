// ToolScout static page generator — no dependencies.
// Usage:  node toolscout/scripts/build.mjs
// Optional: SITE_URL=https://example.com/toolscout node toolscout/scripts/build.mjs
//   (adds canonical, hreflang and sitemap.xml with absolute URLs)
//
// Reads data/tools.json and writes pre-rendered HTML pages so all content
// is visible even if JavaScript fails. app.js only adds search/filtering.

import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createHash } from 'node:crypto';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const data = JSON.parse(readFileSync(join(root, 'data/tools.json'), 'utf8'));
const SITE_URL = (process.env.SITE_URL || '').replace(/\/$/, '');
// Cache-busting version = content hash of CSS + JS (stable between identical builds).
const VERSION = createHash('sha1')
  .update(readFileSync(join(root, 'assets/styles.css')))
  .update(readFileSync(join(root, 'assets/app.js')))
  .digest('hex').slice(0, 8);

const esc = (s) => String(s)
  .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;').replace(/'/g, '&#39;');

const T = {
  he: {
    dir: 'rtl', locale: 'he_IL', other: 'en', otherLabel: 'English', otherShort: 'EN',
    title: 'ToolScout | כלי AI ותוכנות במקום אחד',
    metaDesc: 'קטלוג נבדק של כלי AI ותוכנות: מה כל כלי עושה, האם יש גרסה חינמית וקישור לאתר הרשמי.',
    skip: 'דילוג לתוצאות',
    h1: 'כלי AI ותוכנות, במקום אחד.',
    lead: 'קטלוג קצר ונבדק של כלים אמיתיים: מה הם עושים, אם יש גרסה חינמית, וקישור ישיר לאתר הרשמי.',
    searchLabel: 'חיפוש כלי',
    searchPh: 'למשל: תרגום, וידאו, עורך קוד…',
    clear: 'ניקוי החיפוש',
    catLegend: 'קטגוריה', all: 'הכול',
    priceLegend: 'מחיר', anyPrice: 'כל המחירים',
    count: (n) => n === 1 ? 'כלי אחד' : `${n} כלים`,
    countTpl: '{n} כלים', countOne: 'כלי אחד', countZero: 'אין תוצאות',
    emptyTitle: 'לא נמצא כלי שמתאים לחיפוש.',
    emptyBody: 'נסו מילה אחרת או הסירו את הסינון.',
    reset: 'איפוס הסינון',
    visit: 'לאתר הרשמי', details: 'פרטים', by: 'מאת',
    pricingPage: 'עמוד התמחור הרשמי', checked: 'נבדק',
    sponsored: 'קישור שותפים',
    newTab: '(נפתח בחלון חדש)',
    note: (d) => `המידע נבדק מול האתרים הרשמיים ב-${d}. תוכניות ומחירים משתנים, לכן כדאי לבדוק באתר הכלי לפני רכישה.`,
    disclosure: 'גילוי נאות', home: 'לקטלוג',
    themeLabel: 'ערכת צבעים', themeSystem: 'לפי המערכת', themeLight: 'בהירה', themeDark: 'כהה',
    langSwitch: 'Switch to English',
    footer: 'ToolScout · קטלוג כלים עצמאי',
    discTitle: 'גילוי נאות | ToolScout',
    discH1: 'גילוי נאות',
    discBody: [
      'ToolScout הוא קטלוג עצמאי. המטרה שלנו היא לעזור לכם למצוא את הכלי המתאים, עם מידע שנבדק מול האתרים הרשמיים.',
      'כרגע אין באתר קישורי שותפים, פרסומות או תוכן ממומן. כל הקישורים מובילים ישירות לאתרים הרשמיים של הכלים.',
      'בעתיד ייתכן שחלק מהקישורים יהיו קישורי שותפים. אם תרכשו דרכם, ייתכן שנקבל עמלה, בלי עלות נוספת עבורכם. קישורים כאלה יסומנו בבירור בכרטיס הכלי בתווית "קישור שותפים".',
      'עמלות לא קובעות אילו כלים נכנסים לקטלוג או איך הם מתוארים.',
      'מחירים ותוכניות משתנים. לפני רכישה, בדקו את המידע העדכני באתר הרשמי של הכלי.'
    ],
    dateFmt: (iso) => new Date(iso + 'T00:00:00Z').toLocaleDateString('he-IL', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' })
  },
  en: {
    dir: 'ltr', locale: 'en_US', other: 'he', otherLabel: 'עברית', otherShort: 'עב',
    title: 'ToolScout | AI tools and software in one place',
    metaDesc: 'A checked catalog of AI tools and software: what each tool does, whether there is a free plan, and a link to the official site.',
    skip: 'Skip to results',
    h1: 'AI tools and software, in one place.',
    lead: 'A short, checked catalog of real tools: what they do, whether there is a free plan, and a direct link to the official site.',
    searchLabel: 'Search tools',
    searchPh: 'e.g. translation, video, code editor…',
    clear: 'Clear search',
    catLegend: 'Category', all: 'All',
    priceLegend: 'Price', anyPrice: 'Any price',
    count: (n) => n === 1 ? '1 tool' : `${n} tools`,
    countTpl: '{n} tools', countOne: '1 tool', countZero: 'No results',
    emptyTitle: 'No tool matches your search.',
    emptyBody: 'Try another word or remove a filter.',
    reset: 'Reset filters',
    visit: 'Official site', details: 'Details', by: 'by',
    pricingPage: 'Official pricing page', checked: 'Checked',
    sponsored: 'Affiliate link',
    newTab: '(opens in a new tab)',
    note: (d) => `Information checked against the official sites on ${d}. Plans and prices change, so check the tool's site before buying.`,
    disclosure: 'Disclosure', home: 'Back to catalog',
    themeLabel: 'Color theme', themeSystem: 'System', themeLight: 'Light', themeDark: 'Dark',
    langSwitch: 'החלפה לעברית',
    footer: 'ToolScout · An independent tool catalog',
    discTitle: 'Disclosure | ToolScout',
    discH1: 'Disclosure',
    discBody: [
      'ToolScout is an independent catalog. Our goal is to help you find the right tool, with information checked against the official sites.',
      'Right now the site has no affiliate links, ads or sponsored content. Every link goes directly to the tool\'s official site.',
      'In the future some links may be affiliate links. If you buy through one, we may earn a commission at no extra cost to you. Those links will be clearly marked on the tool card with an "Affiliate link" label.',
      'Commissions do not decide which tools are listed or how they are described.',
      'Plans and prices change. Before buying, check the current details on the tool\'s official site.'
    ],
    dateFmt: (iso) => new Date(iso + 'T00:00:00Z').toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' })
  }
};

const catName = (id, lang) => data.categories.find((c) => c.id === id)[lang];
const priceName = (id, lang) => data.pricing.find((p) => p.id === id)[lang];
const countBy = (key, val) => data.tools.filter((t) => t[key] === val).length;

// Path helpers: Hebrew pages live at /toolscout/, English at /toolscout/en/
const pagePath = (lang, page) => (lang === 'he' ? '' : 'en/') + (page === 'index' ? '' : page + '.html');
const rel = (fromLang) => (fromLang === 'he' ? '' : '../');
const abs = (lang, page) => SITE_URL ? `${SITE_URL}/${pagePath(lang, page)}` : null;

function monogram(name) {
  const words = name.split(/\s+/);
  return (words.length > 1 ? words[0][0] + words[1][0] : name.slice(0, 2)).toUpperCase().slice(0, 2);
}

function card(tool, lang) {
  const t = T[lang];
  const href = tool.affiliateUrl || tool.url;
  const relAttr = tool.affiliateUrl ? 'sponsored noopener' : 'noopener';
  const searchIndex = [
    tool.name, tool.maker, tool.description.he, tool.description.en,
    ...tool.tags.he, ...tool.tags.en, catName(tool.category, 'he'), catName(tool.category, 'en')
  ].join(' ');
  const detailsId = `d-${tool.id}`;
  return `
      <li class="tool" data-cat="${tool.category}" data-price="${tool.pricing}" data-search="${esc(searchIndex)}">
        <article aria-labelledby="n-${tool.id}">
          <div class="tool-head">
            <span class="mono" data-cat="${tool.category}" aria-hidden="true">${esc(monogram(tool.name))}</span>
            <div>
              <h3 class="tool-name" id="n-${tool.id}" data-hl>${esc(tool.name)}</h3>
              <p class="tool-meta">${esc(catName(tool.category, lang))}</p>
            </div>
          </div>
          <p class="tool-desc" data-hl>${esc(tool.description[lang])}</p>
          <div class="tool-foot">
            <span class="price" data-price="${tool.pricing}">${esc(priceName(tool.pricing, lang))}</span>
            ${tool.affiliateUrl ? `<span class="sponsored">${esc(t.sponsored)}</span>` : ''}
          </div>
          <div class="tool-details" id="${detailsId}">
            <dl>
              <dt>${esc(t.by)}</dt><dd>${esc(tool.maker)}</dd>
              <dt>${esc(t.checked)}</dt><dd>${esc(t.dateFmt(data.checkedAt))}</dd>
            </dl>
            <ul class="tags">${tool.tags[lang].map((tag) => `<li>${esc(tag)}</li>`).join('')}</ul>
            <a class="text-link" href="${esc(tool.pricingUrl)}" target="_blank" rel="noopener">${esc(t.pricingPage)}<span class="sr-only"> ${esc(t.newTab)}</span></a>
          </div>
          <div class="tool-actions">
            <button type="button" class="btn-ghost js-only" aria-expanded="false" aria-controls="${detailsId}">${esc(t.details)}</button>
            <a class="btn" href="${esc(href)}" target="_blank" rel="${relAttr}">${esc(t.visit)}<span class="sr-only"> – ${esc(tool.name)} ${esc(t.newTab)}</span></a>
          </div>
        </article>
      </li>`;
}

function head(lang, page, title, desc) {
  const t = T[lang];
  const r = rel(lang);
  const canonical = abs(lang, page);
  const alt = abs(t.other, page);
  return `<!doctype html>
<html lang="${lang}" dir="${t.dir}">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${esc(title)}</title>
  <meta name="description" content="${esc(desc)}">
  <meta name="color-scheme" content="light dark">
  <meta name="theme-color" content="#EEF2F3" media="(prefers-color-scheme: light)">
  <meta name="theme-color" content="#0D1B20" media="(prefers-color-scheme: dark)">
  ${canonical ? `<link rel="canonical" href="${canonical}">
  <link rel="alternate" hreflang="${lang}" href="${canonical}">
  <link rel="alternate" hreflang="${t.other}" href="${alt}">
  <link rel="alternate" hreflang="x-default" href="${abs('he', page)}">` : `<link rel="alternate" hreflang="${t.other}" href="${r}${t.other === 'he' ? '' : 'en/'}${page === 'index' ? '' : page + '.html'}">`}
  <meta property="og:type" content="website">
  <meta property="og:site_name" content="ToolScout">
  <meta property="og:title" content="${esc(title)}">
  <meta property="og:description" content="${esc(desc)}">
  <meta property="og:locale" content="${t.locale}">
  <meta property="og:image" content="${SITE_URL ? SITE_URL + '/assets/og-image.png' : r + 'assets/og-image.png'}">
  ${canonical ? `<meta property="og:url" content="${canonical}">` : ''}
  <meta name="twitter:card" content="summary_large_image">
  <link rel="icon" href="${r}assets/favicon.svg" type="image/svg+xml">
  <link rel="icon" href="${r}assets/favicon-32.png" sizes="32x32" type="image/png">
  <link rel="apple-touch-icon" href="${r}assets/apple-touch-icon.png">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Rubik:wght@400;500;600;700&display=swap">
  <link rel="stylesheet" href="${r}assets/styles.css?v=${VERSION}">
  <script>
    // Theme + JS flag before paint (no flash). Storage wrapped: it may be blocked.
    (function () {
      var d = document.documentElement; d.classList.add('js');
      try { var th = localStorage.getItem('ts-theme'); if (th === 'light' || th === 'dark') d.dataset.theme = th; } catch (e) {}
    })();
  </script>
</head>`;
}

function header(lang, page) {
  const t = T[lang];
  const r = rel(lang);
  const otherHref = (lang === 'he' ? 'en/' : '../') + (page === 'index' ? '' : page + '.html');
  return `
  <header class="site-header">
    <div class="wrap header-row">
      <a class="brand" href="${r}${lang === 'he' ? '' : 'en/'}" aria-label="ToolScout">
        <svg class="brand-mark" viewBox="0 0 32 32" aria-hidden="true"><circle cx="14" cy="14" r="9" fill="none" stroke="currentColor" stroke-width="3"/><path d="M14 9v10M9 14h10" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"/><path d="M21 21l7 7" stroke="var(--signal)" stroke-width="4" stroke-linecap="round"/></svg>
        <span>ToolScout</span>
      </a>
      <nav class="header-actions" aria-label="${lang === 'he' ? 'הגדרות' : 'Settings'}">
        <button type="button" class="icon-btn js-only" id="theme-toggle" aria-label="${esc(t.themeLabel)}: ${esc(t.themeSystem)}"
          data-l-system="${esc(t.themeSystem)}" data-l-light="${esc(t.themeLight)}" data-l-dark="${esc(t.themeDark)}" data-l-label="${esc(t.themeLabel)}">
          <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="8" fill="none" stroke="currentColor" stroke-width="2"/><path d="M12 4a8 8 0 0 1 0 16z" fill="currentColor"/></svg>
        </button>
        <a class="lang-switch" href="${otherHref}" hreflang="${t.other}" lang="${t.other}" aria-label="${esc(t.langSwitch)}">${esc(t.otherLabel)}</a>
      </nav>
    </div>
  </header>`;
}

function footer(lang) {
  const t = T[lang];
  const base = lang === 'he' ? '' : '';
  return `
  <footer class="site-footer">
    <div class="wrap footer-row">
      <p>${esc(t.footer)}</p>
      <a href="${base}disclosure.html">${esc(t.disclosure)}</a>
    </div>
  </footer>`;
}

function indexPage(lang) {
  const t = T[lang];
  const r = rel(lang);
  const total = data.tools.length;
  const catChips = [
    `<button type="button" class="chip" data-filter="cat" data-value="all" aria-pressed="true">${esc(t.all)} <span class="chip-n">${total}</span></button>`,
    ...data.categories.map((c) => `<button type="button" class="chip" data-filter="cat" data-value="${c.id}" aria-pressed="false">${esc(c[lang])} <span class="chip-n">${countBy('category', c.id)}</span></button>`)
  ].join('\n          ');
  const priceChips = [
    `<button type="button" class="seg" data-filter="price" data-value="all" aria-pressed="true">${esc(t.anyPrice)}</button>`,
    ...data.pricing.map((p) => `<button type="button" class="seg" data-filter="price" data-value="${p.id}" aria-pressed="false">${esc(p[lang])}</button>`)
  ].join('\n          ');

  return `${head(lang, 'index', t.title, t.metaDesc)}
<body>
  <a class="skip-link" href="#results">${esc(t.skip)}</a>${header(lang, 'index')}
  <main>
    <section class="hero wrap" aria-labelledby="hero-title">
      <h1 id="hero-title">${esc(t.h1)}</h1>
      <p class="lead">${esc(t.lead)}</p>
      <form class="search js-only" role="search" action="" onsubmit="return false">
        <label class="sr-only" for="q">${esc(t.searchLabel)}</label>
        <svg class="search-icon" viewBox="0 0 24 24" aria-hidden="true"><circle cx="10.5" cy="10.5" r="6.5" fill="none" stroke="currentColor" stroke-width="2.2"/><path d="M15.5 15.5l5 5" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/></svg>
        <input id="q" name="q" type="search" autocomplete="off" spellcheck="false" placeholder="${esc(t.searchPh)}" aria-describedby="result-count">
        <kbd class="kbd-hint" aria-hidden="true">/</kbd>
        <button type="button" class="clear" id="clear" aria-label="${esc(t.clear)}" hidden>
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/></svg>
        </button>
      </form>
    </section>

    <section class="catalog wrap" aria-labelledby="catalog-title">
      <h2 class="sr-only" id="catalog-title">${lang === 'he' ? 'קטלוג הכלים' : 'Tool catalog'}</h2>
      <div class="filters js-only">
        <div class="filter-group" role="group" aria-label="${esc(t.catLegend)}">
          ${catChips}
        </div>
        <div class="filter-row">
          <div class="segmented" role="group" aria-label="${esc(t.priceLegend)}">
          ${priceChips}
          </div>
          <p class="result-count" id="result-count" aria-live="polite" data-tpl="${esc(t.countTpl)}" data-one="${esc(t.countOne)}" data-zero="${esc(t.countZero)}">${esc(t.count(total))}</p>
        </div>
      </div>

      <ul class="grid" id="results" tabindex="-1">${data.tools.map((tool) => card(tool, lang)).join('')}
      </ul>

      <div class="empty" id="empty" hidden>
        <p class="empty-title">${esc(t.emptyTitle)}</p>
        <p>${esc(t.emptyBody)}</p>
        <button type="button" class="btn" id="reset">${esc(t.reset)}</button>
      </div>

      <p class="note">${esc(t.note(t.dateFmt(data.checkedAt)))}</p>
    </section>
  </main>${footer(lang)}
  <script src="${r}assets/app.js?v=${VERSION}" defer></script>
</body>
</html>
`;
}

function disclosurePage(lang) {
  const t = T[lang];
  return `${head(lang, 'disclosure', t.discTitle, t.discBody[0])}
<body>
  <a class="skip-link" href="#content">${esc(t.skip)}</a>${header(lang, 'disclosure')}
  <main id="content" class="wrap prose">
    <h1>${esc(t.discH1)}</h1>
    ${t.discBody.map((p) => `<p>${esc(p)}</p>`).join('\n    ')}
    <p><a class="text-link" href="./">${esc(t.home)}</a></p>
  </main>${footer(lang)}
</body>
</html>
`;
}

function write(file, content) {
  const p = join(root, file);
  mkdirSync(dirname(p), { recursive: true });
  writeFileSync(p, content);
  console.log('wrote', file);
}

write('index.html', indexPage('he'));
write('en/index.html', indexPage('en'));
write('disclosure.html', disclosurePage('he'));
write('en/disclosure.html', disclosurePage('en'));

if (SITE_URL) {
  const urls = ['he', 'en'].flatMap((l) => ['index', 'disclosure'].map((p) => abs(l, p)));
  write('sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((u) => `  <url><loc>${u}</loc><lastmod>${data.checkedAt}</lastmod></url>`).join('\n')}
</urlset>
`);
} else {
  console.log('SITE_URL not set: skipped canonical/hreflang absolute URLs and sitemap.xml');
}
