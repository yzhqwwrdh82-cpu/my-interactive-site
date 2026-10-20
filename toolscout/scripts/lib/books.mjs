// Books section. Renders real items from data/products.json (type "book") when they exist;
// until then it shows the planned structure, the filter design and a clearly labeled card specimen.
import { esc, fmtDate } from './util.mjs';
import { icon, page, crumbs } from './layout.mjs';
import { K, listCard, coverHtml, TOPICS } from './knowledge.mjs';

const T = {
  he: {
    title: 'ספרים מומלצים: היסטוריה, פסיכולוגיה, עסקים, טכנולוגיה ו־AI | ToolScout', desc: 'ספרים ורשימות קריאה לפי נושא ומטרה: היסטוריה, פסיכולוגיה, פילוסופיה, עסקים, טכנולוגיה, AI ופרודוקטיביות, עם פרטי הוצאה ו־ISBN שנבדקו מול המקור.',
    h1: 'ספרים', lead: 'ספרים מודפסים שאפשר לקנות בחנות או לשאול בספרייה: היסטוריה, פסיכולוגיה, פילוסופיה, עסקים, טכנולוגיה, AI ופרודוקטיביות. מופיעים כאן רק ספרים שאת פרטיהם בדקנו מול עמוד ההוצאה לאור.',
    status: 'מתעדכן', levelNote: 'רמת הידע והתיאור הם הערכה עריכתית. כותרת, מחברים, הוצאה, שנה, ISBN ופורמטים נבדקו מול עמוד ההוצאה.', empty: 'עדיין אין ספרים בקטלוג. כשנוסיף ספרים, הם יופיעו כאן עם הפרטים שאומתו.',
    sectionsTitle: 'מה יש כאן ומה בהכנה', soon: 'עוד לא זמין', live: 'זמין',
    sections: [
      ['book', 'ספרים מודפסים', 'ספרי AI, תכנות, עסקים, שיווק, עיצוב, יזמות וטכנולוגיה, עם פרטי ההוצאה לאור.'],
      ['ebook', 'ספרים דיגיטליים', 'ספרים אלקטרוניים ומדריכים מקצועיים, רק כשזכויות ההפצה מאפשרות זאת.'],
      ['guide', 'מדריכים מעשיים', 'מדריכים לשימוש בכלי AI, לאוטומציה, לכתיבת פרומפטים ולפיתוח תוכנה.'],
      ['list', 'רשימות קריאה', 'המלצות לפי רמה, תחום, מטרה ותקציב, עם יתרונות וחסרונות כשאפשר לבסס אותם.'],
      ['star', 'ספרים של ToolScout', 'בעתיד: ספרים דיגיטליים מקוריים, אחרי הכנת התוכן והסדרת הזכויות.']
    ],
    filtersTitle: 'סינון ספרים', filtersNote: 'המסננים יופעלו כשיתווספו ספרים. כל מסנן יוצג רק כשהמידע לגביו אומת.',
    topic: 'נושא', language: 'שפה', level: 'רמת ידע', format: 'פורמט', price: 'מחיר',
    rulesTitle: 'איך נציג ספרים',
    rules: [
      'פרטי הספר (כותרת, מחברים, הוצאה, שנה ופורמטים) נבדקים מול עמוד ההוצאה לאור, עם תאריך בדיקה.',
      'תמונת כריכה תוצג רק כשיש היתר לשימוש בה. בלי היתר, תוצג כריכה גרפית ניטרלית.',
      'מחיר יוצג רק עם מקור ותאריך. לא נציג מלאי או זמינות שלא אומתו.',
      'אין ביקורות או דירוגים מומצאים. יתרונות וחסרונות יופיעו רק כשאפשר לבסס אותם.',
      'קישורי שותפים יתווספו רק אחרי אישור לתוכנית שותפים, ויסומנו בבירור.'
    ],
    specimenTitle: 'דוגמת עיצוב לכרטיס ספר', specimenNote: 'זו דוגמה לעיצוב בלבד, לא ספר אמיתי.',
    specTitle: 'שם הספר', specAuthor: 'שם המחבר/ת', specMeta: 'הוצאה · שנה',
    by: 'מאת', checked: 'נבדק', publisher: 'עמוד ההוצאה', priceNone: 'מחיר: בעמוד ההוצאה', related: 'כלים קשורים בקטלוג', toCatalog: 'לקטלוג הכלים'
  },
  en: {
    title: 'Recommended books: history, psychology, business, technology and AI | ToolScout', desc: 'Books and reading lists by topic and goal: history, psychology, philosophy, business, technology, AI and productivity, with publisher and ISBN checked against the source.',
    h1: 'Books', lead: "Print books you can buy in a store or borrow from a library: history, psychology, philosophy, business, technology, AI and productivity. Only books whose details we checked against the publisher's page are listed.",
    status: 'Growing', levelNote: 'Level and description are editorial. Title, authors, publisher, year, ISBN and formats were checked against the publisher page.', empty: "There are no books in the catalog yet. When we add them, they'll appear here with their verified details.",
    sectionsTitle: "What's here and what's coming", soon: 'Not available yet', live: 'Available',
    sections: [
      ['book', 'Print books', 'Books on AI, programming, business, marketing, design, entrepreneurship and technology, with publisher details.'],
      ['ebook', 'Digital books', 'E-books and professional guides, only where distribution rights allow.'],
      ['guide', 'Practical guides', 'Guides to using AI tools, automation, writing prompts and software development.'],
      ['list', 'Reading lists', 'Recommendations by level, field, goal and budget, with pros and cons where they can be backed up.'],
      ['star', 'ToolScout originals', 'Later: original digital books, once the content is ready and the rights are settled.']
    ],
    filtersTitle: 'Filter books', filtersNote: 'Filters turn on once books are added. Each filter appears only when its information is verified.',
    topic: 'Topic', language: 'Language', level: 'Level', format: 'Format', price: 'Price',
    rulesTitle: "How we'll list books",
    rules: [
      "Book details (title, authors, publisher, year and formats) are checked against the publisher's page, with a check date.",
      'A cover image appears only when its use is permitted. Otherwise a neutral graphic cover is shown.',
      "A price appears only with a source and date. We won't show unverified stock or availability.",
      'No invented reviews or ratings. Pros and cons appear only when they can be backed up.',
      'Affiliate links are added only after approval to an affiliate program, and are clearly marked.'
    ],
    specimenTitle: 'Book card design specimen', specimenNote: 'This is a design example only, not a real book.',
    specTitle: 'Book title', specAuthor: 'Author name', specMeta: 'Publisher · year',
    by: 'by', checked: 'Checked', publisher: "Publisher's page", priceNone: "Price: see publisher's page", related: 'Related tools in the catalog', toCatalog: 'Go to the tool catalog'
  }
};

const ICONS = {
  book: '<path d="M5 4.5h9.5A2.5 2.5 0 0 1 17 7v12.5H7.5A2.5 2.5 0 0 1 5 17z"/><path d="M5 17a2.5 2.5 0 0 1 2.5-2.5H17"/>',
  ebook: '<rect x="6" y="3" width="12" height="18" rx="2"/><path d="M10 17.5h4"/>',
  guide: '<path d="M4 5.5C6.5 4 9.5 4 12 5.5 14.5 4 17.5 4 20 5.5V19c-2.5-1.5-5.5-1.5-8 0-2.5-1.5-5.5-1.5-8 0z"/><path d="M12 5.5V19"/>',
  list: '<path d="M9 6h11M9 12h11M9 18h11"/><circle cx="4.5" cy="6" r="1"/><circle cx="4.5" cy="12" r="1"/><circle cx="4.5" cy="18" r="1"/>',
  star: '<path d="M12 3.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8L12 16.9l-5.2 2.7 1-5.8-4.3-4.1 5.9-.9z"/>'
};
const ic = (n) => `<svg class="ic" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${ICONS[n]}</svg>`;
const name = (list, id, L) => (list.find((x) => x.id === id) || { [L]: id })[L];

function cover(item, x) {
  // Real cover only with documented permission; otherwise a neutral generated cover.
  if (item.cover && item.cover.file && item.cover.license) return `<img class="book-cover-img" src="${x.a('assets/covers/' + item.cover.file)}" alt="" width="120" height="180" loading="lazy">`;
  return `<span class="book-cover-gen" data-topic="${esc((item.topics || ['ai'])[0])}" aria-hidden="true"><span class="bc-title">${esc(item.titleShort || item.title || '')}</span></span>`;
}

export function bookCard(item, products, c, { specimen = false } = {}) {
  const L = c.lang;
  const k = T[L];
  const slugA = (a) => a.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  const href = c.u('books/' + item.id + '.html');
  return `<li class="book${specimen ? ' is-specimen' : ''}" data-goals="${(item.goals || []).join(' ')}" data-authors="${(item.authors || []).map(slugA).join(' ')}" data-topics="${(item.topics || []).join(' ')}" data-langs="${(item.languages || []).join(' ')}" data-level="${item.level || ''}" data-formats="${(item.formats || []).join(' ')}" data-price="${item.price ? 'paid' : 'unverified'}">
  <article class="book-card">
    <a class="book-cover" href="${href}" tabindex="-1" aria-hidden="true">${specimen ? cover(item, c) : coverHtml(item, c)}</a>
    <div class="book-body">
      <h3 class="book-title"><a class="card-link" href="${href}" lang="en" dir="ltr">${esc(item.titleShort || item.title)}</a></h3>
      <p class="book-author">${esc(k.by)} <span lang="en" dir="ltr">${esc((item.authors || []).join(', '))}</span></p>
      ${item.description ? `<p class="book-desc">${esc(item.description[L])}</p>` : ''}
      <div class="card-badges">${(item.topics || []).slice(0, 1).map((t) => `<span class="tag">${esc(name(products.bookTopics, t, L))}</span>`).join('')}${item.level ? `<span class="tag">${esc(name(products.levels, item.level, L))}</span>` : ''}${(item.formats || [])[0] === 'print' ? `<span class="tag">${esc(name(products.formats, 'print', L))}</span>` : ''}</div>
      <p class="book-meta">${esc([item.publisher, item.year].filter(Boolean).join(' · '))}</p>
    </div>
  </article>
</li>`;
}

export function booksPage(c, data, site, products) {
  const L = c.lang;
  const k = T[L];
  const books = products.items.filter((x) => x.type === 'book');
  const has = books.length > 0;
  const facet = (legend, list, key) => `<fieldset${has ? '' : ' disabled'}${key === 'author' ? ' class="facet-scroll"' : ''}><legend>${esc(legend)}</legend>${list.map((x) =>
    `<label class="opt"><input type="checkbox" data-bf="${key}" value="${x.id}"><span>${esc(x[L])}</span></label>`).join('')}</fieldset>`;
  const specimen = { title: k.specTitle, authors: [k.specAuthor], meta: k.specMeta, formats: ['print', 'ebook'], level: 'beginner', topics: ['ai'], titleShort: 'AI' };
  return page(c, data, site, { title: k.title, desc: k.desc, page: 'books', active: 'books' }, `
<section class="page-head">
  <div class="wrap">
    ${crumbs(c, [[null, k.h1]])}
    <div class="cat-hero"><span class="cat-icon lg books-icon">${ic('book')}</span>
      <div><h1>${esc(k.h1)}</h1><p class="lead">${esc(k.lead)}</p></div></div>
    <p class="hero-stats books-status">${esc(L === 'he' ? `${books.length} ספרים · ${products.collections.length} רשימות קריאה` : `${books.length} books · ${products.collections.length} reading lists`)}</p>
  </div>
</section>

<section class="wrap books-layout" aria-labelledby="books-h">
  <h2 id="books-h" class="sr-only">${esc(k.h1)}</h2>
  <aside class="filters books-filters" aria-labelledby="bf-h">
    <div class="filters-toggle"><span id="bf-h">${icon('filter')}${esc(k.filtersTitle)}</span></div>
    <div class="filters-body">
      ${has ? '' : `<p class="hint">${esc(k.filtersNote)}</p>`}
      ${facet(L === 'he' ? 'מטרת קריאה' : 'Reading goal', products.readingGoals || [], 'goal')}
      ${facet(k.topic, products.bookTopics.filter((t) => books.some((b) => b.topics.includes(t.id))), 'topic')}
      ${facet(L === 'he' ? 'מחבר' : 'Author', [...new Set(books.flatMap((b) => b.authors))].sort().map((a) => ({ id: a.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''), he: a, en: a })), 'author')}
      ${facet(k.language, products.languages, 'lang')}
      ${facet(k.level, products.levels, 'level')}
      ${facet(k.format, products.formats, 'format')}
      ${facet(k.price, products.priceBands, 'price')}
    </div>
  </aside>
  <div class="results">
    <nav class="topic-chips" aria-label="${esc(L === 'he' ? 'ספרים לפי נושא' : 'Books by topic')}">${TOPICS.map((tp) => `<a class="chip" href="${c.u('books/topic-' + tp.id + '.html')}">${esc(tp[L][0])}</a>`).join('')}</nav>
    ${has ? `<p class="results-count" role="status" data-bcount data-tpl="${esc(L === 'he' ? '{n} ספרים' : '{n} books')}">${esc(L === 'he' ? `${books.length} ספרים` : `${books.length} books`)}</p><p class="empty" data-bempty hidden>${esc(L === 'he' ? 'אין ספרים שמתאימים לכל המסננים. נסו להסיר מסנן.' : 'No books match all filters. Try removing one.')}</p><p class="fine book-note">${esc(k.levelNote)}</p><div class="view-toggle js-only" role="group" aria-label="${esc(L === 'he' ? 'תצוגה' : 'View')}"><button type="button" class="chip sm" data-bview="grid" aria-pressed="true">${esc(L === 'he' ? 'עטיפות' : 'Covers')}</button><button type="button" class="chip sm" data-bview="compact" aria-pressed="false">${esc(L === 'he' ? 'רשימה' : 'List')}</button></div><ul class="book-grid" data-books data-view="grid">${books.map((b) => bookCard(b, products, c)).join('')}</ul>` : `<div class="empty">${ic('book').replace('class="ic"', 'class="ic empty-ic"')}<p class="empty-title">${esc(k.empty)}</p><a class="btn btn-primary" href="${c.u('catalog.html')}">${esc(k.toCatalog)}</a></div>`}

    <section class="books-bottom" aria-labelledby="lists-h"><h2 id="lists-h" class="sub-h">${esc(K[L].listsTitle)}</h2><p class="muted">${esc(K[L].listsLead)}</p>
      <ul class="list-grid">${products.collections.map((col) => listCard(col, { c, data, products })).join('')}</ul></section>
    <section class="panel books-rules" aria-labelledby="rules-h"><h2 id="rules-h">${icon('ok', 'h-ic')}${esc(k.rulesTitle)}</h2>
      <ul class="facts-list pros rules">${k.rules.map((r) => `<li>${icon('ok')}<span>${esc(r)}</span></li>`).join('')}</ul></section>
  </div>
</section>
`);
}
