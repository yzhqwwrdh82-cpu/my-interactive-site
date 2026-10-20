// Knowledge platform: book pages, courses, reading lists, learning paths and global search.
// Everything renders only real items from data/products.json and data/paths.json.
import { esc, fmtDate } from './util.mjs';
import { icon, page, crumbs, logoTile } from './layout.mjs';
import { guides } from './content.mjs';

export const K = {
  he: {
    by: 'מאת', isbn: 'ISBN', edition: 'מהדורה', year: 'שנה', publisher: 'הוצאה', formats: 'פורמטים', level: 'רמה', topics: 'נושאים', language: 'שפה',
    checked: 'הפרטים נבדקו מול עמוד ההוצאה ב־', checkedCourse: 'הפרטים נבדקו מול האתר הרשמי ב־',
    about: 'על הספר', aboutCourse: 'על הקורס', editorial: 'התיאור והרמה הם הערכה עריכתית שלנו, לא ציטוט מהמוציא לאור.',
    where: 'איפה להשיג', whereNote: 'כרגע אין קישורי רכישה בתשלום. הקישור מוביל לעמוד הרשמי, ושם אפשר לבדוק מחיר וזמינות.', pubPage: 'לעמוד הרשמי',
    priceNote: 'לא מציגים מחיר כי מחירים משתנים ותלויים בחנות ובמדינה.',
    inLists: 'מופיע ברשימות', inPaths: 'חלק ממסלולי הלמידה', related: 'ספרים נוספים בנושא', relatedTools: 'כלים קשורים',
    books: 'ספרים', courses: 'קורסים', paths: 'מסלולי למידה', lists: 'רשימות קריאה', tools: 'כלי AI', guides: 'מדריכים', search: 'חיפוש',
    provider: 'מספק', cost: 'עלות', certificate: 'תעודה', costNote: 'הערה על העלות',
    coursesTitle: 'קורסים מומלצים', coursesLead: 'קורסים מגופים מוכרים, עם עלות שנבדקה מול האתר הרשמי. קורס שעלותו לא אומתה מסומן כך.',
    pathsTitle: 'מסלולי למידה', pathsLead: 'מסלולים שמחברים ספר, קורס, כלי ומדריך לסדר הגיוני, כדי להתקדם בנושא אחד צעד אחר צעד.',
    listsTitle: 'רשימות קריאה', listsLead: 'אוספים קצרים של ספרים לפי נושא, עם הסבר למה כל ספר נמצא ברשימה.',
    steps: 'שלבים', step: 'שלב', why: 'למה בשלב הזה', forWho: 'למי זה מתאים', open: 'לפתיחה',
    type: { book: 'ספר', author: 'מחבר', course: 'קורס', tool: 'כלי', guide: 'מדריך', list: 'רשימה', path: 'מסלול' },
    searchTitle: 'חיפוש בכל האתר', searchLead: 'ספרים, קורסים, מסלולי למידה, רשימות קריאה, מדריכים וכלי AI.', searchLabel: 'מה לחפש?', searchPh: 'למשל: הרגלים, Python, יזמות',
    results: (n) => `${n} תוצאות`, noResults: 'לא נמצאו תוצאות. נסו מילה אחרת או עיינו בקטגוריות.', all: 'הכול', noJs: 'החיפוש פועל עם JavaScript. בינתיים אפשר לעיין לפי קטגוריה:',
    items: (n) => `${n} פריטים`, booksN: (n) => `${n} ספרים`, stepsN: (n) => `${n} שלבים`,
    lvl: { beginner: 'מתחילים', intermediate: 'בינוני', advanced: 'מתקדמים' },
    costs: { free: 'חינם', paid: 'בתשלום', unverified: 'עלות לא אומתה' }
  },
  en: {
    by: 'by', isbn: 'ISBN', edition: 'Edition', year: 'Year', publisher: 'Publisher', formats: 'Formats', level: 'Level', topics: 'Topics', language: 'Language',
    checked: "Details checked against the publisher's page on ", checkedCourse: 'Details checked against the official site on ',
    about: 'About the book', aboutCourse: 'About the course', editorial: 'The description and level are our editorial view, not a quote from the publisher.',
    where: 'Where to get it', whereNote: 'There are no paid purchase links yet. The link goes to the official page, where you can check price and availability.', pubPage: 'Official page',
    priceNote: 'We do not show prices because they change and depend on store and country.',
    inLists: 'In reading lists', inPaths: 'Part of learning paths', related: 'More books on this topic', relatedTools: 'Related tools',
    books: 'Books', courses: 'Courses', paths: 'Learning paths', lists: 'Reading lists', tools: 'AI tools', guides: 'Guides', search: 'Search',
    provider: 'Provider', cost: 'Cost', certificate: 'Certificate', costNote: 'Cost note',
    coursesTitle: 'Recommended courses', coursesLead: 'Courses from well-known providers, with cost checked against the official site. Courses whose cost is not verified are marked.',
    pathsTitle: 'Learning paths', pathsLead: 'Paths that put a book, a course, a tool and a guide in a sensible order, so you can progress in one topic step by step.',
    listsTitle: 'Reading lists', listsLead: 'Short collections of books by topic, with a note on why each book is on the list.',
    steps: 'Steps', step: 'Step', why: 'Why at this step', forWho: 'Who it is for', open: 'Open',
    type: { book: 'Book', author: 'Author', course: 'Course', tool: 'Tool', guide: 'Guide', list: 'List', path: 'Path' },
    searchTitle: 'Search the whole site', searchLead: 'Books, courses, learning paths, reading lists, guides and AI tools.', searchLabel: 'What are you looking for?', searchPh: 'e.g. habits, Python, startups',
    results: (n) => `${n} results`, noResults: 'No results. Try another word or browse the categories.', all: 'All', noJs: 'Search needs JavaScript. Meanwhile, browse by category:',
    items: (n) => `${n} items`, booksN: (n) => `${n} books`, stepsN: (n) => `${n} steps`,
    lvl: { beginner: 'Beginner', intermediate: 'Intermediate', advanced: 'Advanced' },
    costs: { free: 'Free', paid: 'Paid', unverified: 'Cost not verified' }
  }
};

const name = (list, id, L) => (list.find((x) => x.id === id) || { [L]: id })[L];
const BOOKSVG = '<path d="M5 4.5h9.5A2.5 2.5 0 0 1 17 7v12.5H7.5A2.5 2.5 0 0 1 5 17z"/><path d="M5 17a2.5 2.5 0 0 1 2.5-2.5H17"/>';
const CAPSVG = '<path d="M2.5 9.5L12 5l9.5 4.5L12 14z"/><path d="M6.5 11.5V16c3 2.2 8 2.2 11 0v-4.5M21.5 9.5V15"/>';
const PATHSVG = '<circle cx="6" cy="18" r="2.2"/><circle cx="18" cy="6" r="2.2"/><path d="M8 18h6a3 3 0 0 0 0-6h-4a3 3 0 0 1 0-6h6"/>';
export const kicon = (n) => `<svg class="ic" viewBox="0 0 24 24" aria-hidden="true" focusable="false" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${{ book: BOOKSVG, course: CAPSVG, path: PATHSVG }[n] || BOOKSVG}</svg>`;

export const urls = {
  book: (c, id) => c.u('books/' + id + '.html'),
  course: (c, id) => c.u('courses/' + id + '.html'),
  path: (c, id) => c.u('paths/' + id + '.html'),
  list: (c, id) => c.u('lists/' + id + '.html'),
  tool: (c, id) => c.u('tools/' + id + '.html'),
  guide: (c, id) => c.u('guides/' + id + '.html')
};

// Generated typographic cover (no copyrighted artwork).
export function coverHtml(item, c, size = '') {
  if (item.cover && item.cover.file && item.cover.license) return `<img class="book-cover-img" src="${c.a('assets/covers/' + item.cover.file)}" alt="" loading="lazy">`;
  const t = item.titleShort || item.title || '';
  const label = size === 'sm' ? t.split(/[\s:-]+/).filter((w) => /^[A-Za-z0-9]/.test(w)).slice(0, 3).map((w) => w[0].toUpperCase()).join('') : t;
  return `<span class="book-cover-gen${size ? ' ' + size : ''}" lang="en" data-topic="${esc((item.topics || ['ai'])[0])}" aria-hidden="true"><span class="bc-title">${esc(label)}</span><span class="bc-author">${esc((item.authors || [item.provider || '']).join(', '))}</span></span>`;
}

export function shelfCard(item, c, products) {
  const L = c.lang, k = K[L];
  return `<li class="shelf-item"><a class="shelf-link" href="${urls.book(c, item.id)}">
    <span class="book-cover">${coverHtml(item, c)}</span>
    <span class="shelf-title">${esc(item.titleShort || item.title)}</span>
    <span class="shelf-author">${esc(item.authors.join(', '))}</span>
    <span class="shelf-meta">${esc(name(products.bookTopics, item.topics[0], L))} · ${esc(k.lvl[item.level] || '')}</span></a></li>`;
}

export function courseCard(item, c) {
  const L = c.lang, k = K[L];
  return `<li><a class="course-card" href="${urls.course(c, item.id)}">
    <span class="course-ic">${kicon('course')}</span>
    <span class="course-title">${esc(item.title)}</span>
    <span class="course-provider">${esc(item.provider)}</span>
    <span class="course-desc">${esc(item.description[L])}</span>
    <span class="card-badges"><span class="price" data-price="${item.cost.model === 'free' ? 'free' : 'unverified'}">${esc(k.costs[item.cost.model])}</span><span class="tag">${esc(k.lvl[item.level])}</span></span></a></li>`;
}

function itemRef(type, id, ctx) {
  const { data, products, c } = ctx;
  const L = c.lang;
  if (type === 'book' || type === 'course') { const it = products.items.find((x) => x.id === id); return it && { title: it.titleShort ? `${it.titleShort}` : it.title, full: it.title, href: urls[type](c, id), sub: type === 'book' ? it.authors.join(', ') : it.provider, item: it }; }
  if (type === 'tool') { const t = data.tools.find((x) => x.id === id); return t && { title: t.name, href: urls.tool(c, id), sub: t.maker, tool: t }; }
  if (type === 'guide') { const g = guides.find((x) => x.slug === id); return g && { title: g.title[L], href: urls.guide(c, id), sub: g.summary[L] }; }
  return null;
}

export function pathCard(p, ctx) {
  const { c } = ctx; const L = c.lang, k = K[L];
  return `<li><a class="path-card" href="${urls.path(c, p.id)}">
    <span class="path-ic">${kicon('path')}</span>
    <span class="path-title">${esc(p.title[L])}</span>
    <span class="path-sub">${esc(p.audience[L])}</span>
    <span class="path-steps" aria-hidden="true">${p.steps.map(([t]) => `<i data-type="${t}"></i>`).join('')}</span>
    <span class="path-meta">${esc(k.stepsN(p.steps.length))} · ${esc(k.lvl[p.level])}</span></a></li>`;
}

export function listCard(col, ctx) {
  const { c, products } = ctx; const L = c.lang, k = K[L];
  const books = col.items.map(([id]) => products.items.find((x) => x.id === id)).filter(Boolean);
  return `<li><a class="list-card" href="${urls.list(c, col.id)}">
    <span class="list-covers" aria-hidden="true">${books.slice(0, 3).map((b) => `<span class="book-cover sm">${coverHtml(b, c, 'sm')}</span>`).join('')}</span>
    <span class="list-title">${esc(col.title[L])}</span>
    <span class="list-sub">${esc(col.description[L])}</span>
    <span class="list-meta">${esc(k.booksN(books.length))}</span></a></li>`;
}

// Only topics with a genuinely related tool category; history, philosophy, psychology, society and Israel get no tool suggestions.
const TOPIC_TOOLS = { ai: 'assistants', prompts: 'assistants', programming: 'code', automation: 'automation', productivity: 'productivity', design: 'design', business: 'work', entrepreneurship: 'work', marketing: 'marketing', technology: 'code' };
export const slug = (s) => s.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

// ---------- Book page ----------
export function bookPage(c, data, site, products, paths, b) {
  const L = c.lang, k = K[L];
  const lists = products.collections.filter((x) => x.items.some(([id]) => id === b.id));
  const inPaths = paths.paths.filter((p) => p.steps.some(([t, id]) => t === 'book' && id === b.id));
  const related = products.items.filter((x) => x.type === 'book' && x.id !== b.id && x.topics.some((t) => b.topics.includes(t))).slice(0, 4);
  const tcat = b.topics.map((t) => TOPIC_TOOLS[t]).find(Boolean);
  const tools = tcat ? data.tools.filter((t) => t.category === tcat).slice(0, 4) : [];
  const goals = (b.goals || []).map((g) => (products.readingGoals || []).find((x) => x.id === g)).filter(Boolean);
  const jsonld = { '@context': 'https://schema.org', '@type': 'Book', name: b.title, author: b.authors.map((a) => ({ '@type': 'Person', name: a })), isbn: b.isbn13, publisher: { '@type': 'Organization', name: b.publisher }, datePublished: String(b.year), inLanguage: 'en', url: b.officialUrl, ...(b.edition ? { bookEdition: b.edition } : {}) };
  const row = (label, val) => val ? `<div><dt>${esc(label)}</dt><dd>${val}</dd></div>` : '';
  return page(c, data, site, { title: `${b.titleShort || b.title} – ${b.authors[0]} | ToolScout`, desc: `${b.description[L]} ${k.by} ${b.authors.join(', ')}.`.slice(0, 158), page: 'book', active: 'books', jsonld }, `
<section class="page-head item-head"><div class="wrap">
  ${crumbs(c, [[c.u('books.html'), k.books], [null, b.titleShort || b.title]])}
  <div class="item-hero">
    <div class="book-cover lg">${coverHtml(b, c, 'lg')}</div>
    <div class="item-hero-body">
      <p class="item-type">${kicon('book')}${topicOf(b) ? `<a href="${c.u('books/topic-' + topicOf(b).id + '.html')}">${esc(name(products.bookTopics, b.topics[0], L))}</a>` : esc(name(products.bookTopics, b.topics[0], L))}</p>
      <h1 lang="en" dir="ltr">${esc(b.title)}</h1>
      <p class="lead">${esc(k.by)} ${b.authors.map((a) => `<a href="${c.u('authors/' + slug(a) + '.html')}" lang="en" dir="ltr">${esc(a)}</a>`).join(', ')}${b.translator ? ` · ${esc(L === 'he' ? 'תרגום' : 'Translated by')} <span lang="en" dir="ltr">${esc(b.translator)}</span>` : ''}</p>
      <div class="card-badges">${(b.formats || []).map((f) => `<span class="tag">${esc(name(products.formats, f, L))}</span>`).join('')}<span class="tag">${esc(k.lvl[b.level])}</span></div>
      <a class="btn btn-primary" href="${esc(b.officialUrl)}" target="_blank" rel="noopener">${esc(k.pubPage)}${icon('ext')}</a>
    </div>
  </div>
</div></section>
<div class="wrap item-layout">
  <article class="item-main">
    <section class="panel editorial-panel"><p class="panel-label">${esc(k.editorialH)}</p><h2>${esc(k.about)}</h2><p class="item-desc">${esc(b.description[L])}</p>
      ${b.audience ? `<h3 class="for-whom-h">${esc(L === 'he' ? 'למי הספר מתאים' : 'Who it is for')}</h3><p class="for-whom">${esc(b.audience[L])}</p>` : ''}
      ${goals.length ? `<ul class="goal-chips">${goals.map((g) => `<li><a class="chip sm" href="${c.u('books.html')}?goal=${g.id}">${esc(g[L])}</a></li>`).join('')}</ul>` : ''}
      <p class="fine">${esc(k.editorial)}</p></section>
    ${lists.length || inPaths.length ? `<section class="panel"><h2>${esc(inPaths.length ? k.inPaths : k.inLists)}</h2><ul class="mini-links">
      ${inPaths.map((p) => `<li><a href="${urls.path(c, p.id)}">${kicon('path')}${esc(p.title[L])}</a></li>`).join('')}
      ${lists.map((x) => `<li><a href="${urls.list(c, x.id)}">${kicon('book')}${esc(x.title[L])}</a></li>`).join('')}</ul></section>` : ''}
    ${related.length ? `<section><h2 class="sub-h">${esc(k.related)}</h2><ul class="shelf">${related.map((x) => shelfCard(x, c, products)).join('')}</ul></section>` : ''}
  </article>
  <aside class="item-side">
    <div class="panel verified-panel"><p class="panel-label">${icon('ok')}${esc(k.verifiedH)}</p><dl class="facts">
      ${row(k.publisher, esc(b.publisher))}${row(k.year, esc(String(b.year)))}${row(k.edition, b.edition ? esc(b.edition) : '')}
      ${row(k.isbn, `<span dir="ltr">${esc(b.isbn13)}</span>`)}${row(k.language, L === 'he' ? 'אנגלית' : 'English')}
      ${row(k.topics, b.topics.map((t) => esc(name(products.bookTopics, t, L))).join(', '))}
      ${row(k.formats, (b.formats || []).length ? b.formats.map((f) => esc(name(products.formats, f, L))).join(', ') : esc(L === 'he' ? 'לא צוין בעמוד ההוצאה' : 'Not stated on the publisher page'))}
      ${b.formatNote ? `<div><dt></dt><dd class="fine">${esc(b.formatNote[L])}</dd></div>` : ''}
    </dl><p class="fine">${esc(k.checked)}${esc(fmtDate(b.checkedAt, L))}</p></div>
    <div class="panel"><h2>${esc(k.where)}</h2>
      <ul class="retailers">${(b.retailers || []).map((r) => `<li><a class="ext-link" href="${esc(r.url)}" target="_blank" rel="noopener">${esc(r.name)}${icon('ext')}</a></li>`).join('')}
        <li><a class="ext-link" href="https://search.worldcat.org/search?q=bn%3A${esc(b.isbn13)}" target="_blank" rel="noopener">${esc(L === 'he' ? 'חיפוש בספריות לפי ISBN (WorldCat)' : 'Find in libraries by ISBN (WorldCat)')}${icon('ext')}</a></li></ul>
      <p class="fine">${esc(k.whereNote)} ${esc(k.priceNote)}</p></div>
    ${tools.length ? `<div class="panel"><h2>${esc(k.relatedTools)}</h2><ul class="mini-tools">${tools.map((t) => `<li><a href="${urls.tool(c, t.id)}">${logoTile(t, c, 'xs')}<span>${esc(t.name)}</span></a></li>`).join('')}</ul></div>` : ''}
  </aside>
</div>
`);
}

// ---------- Courses ----------
export function coursesPage(c, data, site, products) {
  const L = c.lang, k = K[L];
  const courses = products.items.filter((x) => x.type === 'course');
  return page(c, data, site, { title: `${k.coursesTitle} | ToolScout`, desc: k.coursesLead, page: 'courses', active: 'courses' }, `
<section class="page-head"><div class="wrap">${crumbs(c, [[null, k.courses]])}<h1>${esc(k.coursesTitle)}</h1><p class="lead">${esc(k.coursesLead)}</p></div></section>
<section class="section tight"><div class="wrap"><ul class="course-grid">${courses.map((x) => courseCard(x, c)).join('')}</ul></div></section>
`);
}

export function coursePage(c, data, site, products, paths, co) {
  const L = c.lang, k = K[L];
  const inPaths = paths.paths.filter((p) => p.steps.some(([t, id]) => t === 'course' && id === co.id));
  const jsonld = { '@context': 'https://schema.org', '@type': 'Course', name: co.title, description: co.description.en, provider: { '@type': 'Organization', name: co.provider }, url: co.officialUrl, inLanguage: 'en' };
  return page(c, data, site, { title: `${co.title} | ToolScout`, desc: co.description[L].slice(0, 158), page: 'course', active: 'courses', jsonld }, `
<section class="page-head item-head"><div class="wrap">
  ${crumbs(c, [[c.u('courses.html'), k.courses], [null, co.title]])}
  <div class="item-hero no-cover">
    <span class="course-ic lg">${kicon('course')}</span>
    <div class="item-hero-body">
      <h1 lang="en" dir="ltr">${esc(co.title)}</h1>
      <p class="lead">${esc(co.provider)}</p>
      <div class="card-badges"><span class="price" data-price="${co.cost.model === 'free' ? 'free' : 'unverified'}">${esc(k.costs[co.cost.model])}</span><span class="tag">${esc(k.lvl[co.level])}</span></div>
      <a class="btn btn-primary" href="${esc(co.officialUrl)}" target="_blank" rel="noopener">${esc(k.pubPage)}${icon('ext')}</a>
    </div>
  </div>
</div></section>
<div class="wrap item-layout">
  <article class="item-main">
    <section class="panel"><h2>${esc(k.aboutCourse)}</h2><p class="item-desc">${esc(co.description[L])}</p><p class="fine">${esc(k.editorial)}</p></section>
    ${inPaths.length ? `<section class="panel"><h2>${esc(k.inPaths)}</h2><ul class="mini-links">${inPaths.map((p) => `<li><a href="${urls.path(c, p.id)}">${kicon('path')}${esc(p.title[L])}</a></li>`).join('')}</ul></section>` : ''}
    ${(() => { const rb = products.items.filter((x) => x.type === 'book' && x.topics.some((t) => co.topics.includes(t))).slice(0, 6); return rb.length ? `<section><h2 class="sub-h">${esc(L === 'he' ? 'ספרים שמשלימים את הקורס' : 'Books that go with this course')}</h2><ul class="shelf">${rb.map((x) => shelfCard(x, c, products)).join('')}</ul></section>` : ''; })()}
  </article>
  <aside class="item-side"><div class="panel"><dl class="facts">
    <div><dt>${esc(k.provider)}</dt><dd>${esc(co.provider)}</dd></div>
    <div><dt>${esc(k.cost)}</dt><dd>${esc(k.costs[co.cost.model])}</dd></div>
    ${co.certificate ? `<div><dt>${esc(k.certificate)}</dt><dd>${esc(co.certificate[L])}</dd></div>` : ''}
    <div><dt>${esc(k.language)}</dt><dd>${L === 'he' ? 'אנגלית' : 'English'}</dd></div>
  </dl><p class="fine">${esc(co.cost.note[L])}</p><p class="fine">${esc(k.checkedCourse)}${esc(fmtDate(co.checkedAt, L))}</p></div></aside>
</div>
`);
}

// ---------- Learning paths ----------
export function pathsIndex(c, data, site, products, paths) {
  const L = c.lang, k = K[L];
  const ctx = { c, data, products };
  return page(c, data, site, { title: `${k.pathsTitle} | ToolScout`, desc: k.pathsLead, page: 'paths', active: 'paths' }, `
<section class="page-head"><div class="wrap">${crumbs(c, [[null, k.paths]])}<h1>${esc(k.pathsTitle)}</h1><p class="lead">${esc(k.pathsLead)}</p></div></section>
<section class="section tight"><div class="wrap"><ul class="path-grid">${paths.paths.map((p) => pathCard(p, ctx)).join('')}</ul></div></section>
`);
}

export function pathPage(c, data, site, products, paths, p) {
  const L = c.lang, k = K[L];
  const ctx = { c, data, products };
  const steps = p.steps.map(([type, id, he, en], i) => {
    const r = itemRef(type, id, ctx);
    const vis = type === 'book' ? `<span class="book-cover sm">${coverHtml(r.item, c, 'sm')}</span>` : type === 'tool' ? logoTile(r.tool, c, 'sm') : `<span class="step-ic" data-type="${type}">${type === 'course' ? kicon('course') : icon('guide')}</span>`;
    return `<li class="path-step"><span class="step-n" aria-hidden="true">${i + 1}</span>
      <a class="step-card" href="${r.href}">${vis}<span class="step-body"><span class="step-type">${esc(k.step)} ${i + 1} · ${esc(k.type[type])}</span>
        <span class="step-title">${esc(r.title)}</span><span class="step-why">${esc(L === 'he' ? he : en)}</span></span></a></li>`;
  }).join('');
  const jsonld = { '@context': 'https://schema.org', '@type': 'ItemList', name: p.title[L], itemListOrder: 'https://schema.org/ItemListOrderAscending', numberOfItems: p.steps.length };
  return page(c, data, site, { title: `${p.title[L]} | ToolScout`, desc: p.audience[L], page: 'path', active: 'paths', jsonld }, `
<section class="page-head"><div class="wrap narrow">${crumbs(c, [[c.u('paths/index.html'), k.paths], [null, p.title[L]]])}<h1>${esc(p.title[L])}</h1>
  <p class="lead">${esc(p.audience[L])}</p><p class="meta-line">${esc(k.stepsN(p.steps.length))} · ${esc(k.lvl[p.level])}</p></div></section>
<section class="section tight"><div class="wrap narrow"><ol class="path-list">${steps}</ol></div></section>
`);
}

// ---------- Reading lists ----------
export function listPage(c, data, site, products, col) {
  const L = c.lang, k = K[L];
  const items = col.items.map(([id, he, en]) => [products.items.find((x) => x.id === id), L === 'he' ? he : en]).filter(([b]) => b);
  const jsonld = { '@context': 'https://schema.org', '@type': 'ItemList', name: col.title[L], numberOfItems: items.length,
    itemListElement: items.map(([b], i) => ({ '@type': 'ListItem', position: i + 1, item: { '@type': 'Book', name: b.title, author: b.authors.map((a) => ({ '@type': 'Person', name: a })), isbn: b.isbn13 } })) };
  return page(c, data, site, { title: `${col.title[L]} | ToolScout`, desc: col.description[L], page: 'list', active: 'books', jsonld }, `
<section class="page-head"><div class="wrap narrow">${crumbs(c, [[c.u('books.html'), k.books], [null, col.title[L]]])}<h1>${esc(col.title[L])}</h1><p class="lead">${esc(col.description[L])}</p></div></section>
<section class="section tight"><div class="wrap narrow"><ol class="reading-list">${items.map(([b, why], i) => `<li><a class="rl-item" href="${urls.book(c, b.id)}">
  <span class="rl-n" aria-hidden="true">${i + 1}</span><span class="book-cover sm">${coverHtml(b, c, 'sm')}</span>
  <span class="rl-body"><span class="rl-title" lang="en" dir="ltr">${esc(b.titleShort || b.title)}</span><span class="rl-author">${esc(k.by)} <span lang="en" dir="ltr">${esc(b.authors.join(', '))}</span></span><span class="rl-why">${esc(why)}</span></span></a></li>`).join('')}</ol>
  <p class="fine">${esc(k.editorial)}</p></div></section>
`);
}


// ---------- Topic hubs (books + courses + paths + tools per topic) ----------
export const TOPICS = [
  { id: 'ai', match: ['ai', 'prompts'], cat: 'assistants', he: ['ספרים על בינה מלאכותית', 'מה AI יכול לעשות היום, איך עובדים איתו נכון, ואילו שאלות הוא מעורר. מספרי מבוא בלי רקע טכני ועד ספרים מעשיים למי שבונה עם מודלי שפה.'], en: ['Books on artificial intelligence', 'What AI can do today, how to work with it well, and the questions it raises. From non-technical introductions to hands-on books for people building with language models.'] },
  { id: 'programming', match: ['programming', 'technology', 'automation'], cat: 'code', he: ['ספרים על תכנות ופיתוח', 'מהצעדים הראשונים ב־Python, דרך הרגלי עבודה של מפתחים מקצועיים, ועד תכנון מערכות נתונים גדולות.'], en: ['Books on programming and software', 'From first steps in Python, through the habits of professional developers, to designing large data systems.'] },
  { id: 'business', match: ['business', 'entrepreneurship', 'marketing', 'design'], cat: 'work', he: ['ספרים על עסקים, יזמות ומוצר', 'איך בודקים רעיון, בונים מוצר שאנשים מבינים, וחושבים על מה שהופך עסק לייחודי.'], en: ['Books on business, startups and product', 'How to test an idea, build a product people understand, and think about what makes a business unique.'] },
  { id: 'history', match: ['history', 'society'], cat: null, he: ['ספרי היסטוריה וחברה', 'ספרים שמסבירים איך הגענו לכאן: התפתחות החברה האנושית, טכנולוגיה, כוח ומידע לאורך אלפי שנים.'], en: ['History and society books', 'Books that explain how we got here: the development of human society, technology, power and information across millennia.'] },
  { id: 'mind', match: ['psychology', 'philosophy'], cat: null, he: ['ספרי פסיכולוגיה ופילוסופיה', 'איך אנחנו חושבים, מחליטים ומוצאים משמעות. ספרים קלאסיים ומודרניים שאפשר ליישם בחיים.'], en: ['Psychology and philosophy books', 'How we think, decide and find meaning. Classic and modern books you can apply to life.'] },
  { id: 'israel', match: ['israel'], cat: null, he: ['מחברים ישראלים וסיפורים מישראל', 'ספרים של מחברים ישראלים וספרים על החדשנות הישראלית, שנקראים בכל העולם.'], en: ['Israeli authors and stories from Israel', 'Books by Israeli authors and about Israeli innovation, read around the world.'] },
  { id: 'judaism', group: 'ideas', match: ['judaism', 'family'], cat: null, he: ['יהדות, מסורת וקהילה', 'מסורת, זהות ומוסר יהודי, ומקומם של המשפחה והקהילה בחברה. האזור בהרחבה, ונוסיף ספרים רק אחרי אימות.'], en: ['Judaism, tradition and community', 'Jewish tradition, identity and ethics, and the place of family and community in society. This area is growing, and books are added only after verification.'] },
  { id: 'zionism', group: 'ideas', match: ['zionism'], cat: null, he: ['ציונות והיסטוריה ישראלית', 'מהרעיון של מדינה יהודית ועד ישראל של היום: הוגים, מלחמות, חדשנות והוויכוח על מדינת הלאום.'], en: ['Zionism and Israeli history', 'From the idea of a Jewish state to today\'s Israel: thinkers, wars, innovation and the nation-state debate.'] },
  { id: 'conservatism', group: 'ideas', match: ['conservatism'], cat: null, he: ['מחשבה שמרנית', 'מסורת, מוסדות, שינוי הדרגתי ולאומיות: טקסטים קלאסיים והוגים בני זמננו, ישראלים ובינלאומיים.'], en: ['Conservative thought', 'Tradition, institutions, gradual change and nationhood: classic texts and contemporary thinkers, Israeli and international.'] },
  { id: 'liberty', group: 'ideas', match: ['liberty', 'economics'], cat: null, he: ['חירות הפרט וכלכלה חופשית', 'למה חופש כלכלי וחופש פוליטי קשורים, מה עושים תמריצים ומחירים, ומה קורה כשהמדינה מרכזת כוח.'], en: ['Individual liberty and free markets', 'Why economic and political freedom are linked, what incentives and prices do, and what happens when the state concentrates power.'] },
  { id: 'leadership', group: 'ideas', match: ['leadership'], cat: null, he: ['מנהיגות וביטחון', 'החלטות בשעת משבר, ביטחון לאומי והחוסן שמאחורי ההצלחה הישראלית.'], en: ['Leadership and security', 'Decisions in times of crisis, national security and the resilience behind Israel\'s success.'] },
  { id: 'critique', group: 'ideas', stance: true, match: ['critique'], cat: null, he: ['ביקורת רעיונית: פרוגרסיביות, תקינות פוליטית ותרבות הביטול', 'ספרים שמבקרים את צמצום חופש הביטוי, את תרבות הביטול, את התקינות הפוליטית ואת ריכוז הכוח בידי מוסדות ומדינה. זו עמדה עריכתית: אנחנו מציגים את הטיעונים כפי שהמחברים מנסחים אותם, עם מקורות מדויקים.'], en: ['Critique of ideas: progressivism, political correctness and cancel culture', 'Books that criticize shrinking free speech, cancel culture, political correctness and the concentration of power in institutions and the state. This is an editorial position: we present the arguments as their authors make them, with exact sources.'] },
  { id: 'productivity', match: ['productivity'], cat: 'productivity', he: ['ספרים על פרודוקטיביות והרגלים', 'הרגלים קטנים, עבודה מרוכזת וארגון מידע. ספרים שעוזרים לעבוד טוב יותר עם פחות לחץ.'], en: ['Books on productivity and habits', 'Small habits, focused work and organizing information. Books that help you work better with less stress.'] }
];
export function topicPage(c, data, site, products, paths, tp) {
  const L = c.lang, k = K[L];
  const [title, intro] = tp[L];
  const books = products.items.filter((x) => x.type === 'book' && x.topics.some((t) => tp.match.includes(t)));
  const courses = products.items.filter((x) => x.type === 'course' && x.topics.some((t) => tp.match.includes(t)));
  const ids = new Set(books.map((b) => b.id).concat(courses.map((x) => x.id)));
  const ps = paths.paths.filter((p) => p.steps.some(([, id]) => ids.has(id)));
  const lists = products.collections.filter((col) => col.items.some(([id]) => ids.has(id)));
  const tools = tp.cat ? data.tools.filter((t) => t.category === tp.cat).slice(0, 6) : [];
  const ctx = { c, data, products };
  const jsonld = { '@context': 'https://schema.org', '@type': 'CollectionPage', name: title, inLanguage: L,
    mainEntity: { '@type': 'ItemList', numberOfItems: books.length, itemListElement: books.map((b, i) => ({ '@type': 'ListItem', position: i + 1, item: { '@type': 'Book', name: b.title, isbn: b.isbn13 } })) } };
  return page(c, data, site, { title: `${title} | ToolScout`, desc: intro.slice(0, 158), page: 'topic', active: 'books', jsonld }, `
<section class="page-head"><div class="wrap">${crumbs(c, tp.group === 'ideas' ? [[c.u('ideas.html'), L === 'he' ? 'רעיונות' : 'Ideas'], [null, title]] : [[c.u('books.html'), k.books], [null, title]])}${tp.group === 'ideas' ? `<p class="eyebrow">${esc(tp.stance ? (L === 'he' ? 'עמדה עריכתית' : 'Editorial position') : (L === 'he' ? 'רעיונות וזהות' : 'Ideas and identity'))}</p>` : ''}<h1>${esc(title)}</h1><p class="lead">${esc(intro)}</p>${tp.group === 'ideas' ? `<p class="fine"><a href="${c.u('editorial.html')}">${esc(L === 'he' ? 'הקו המערכתי שלנו, ואיך אנחנו מפרידים בין עובדה לדעה' : 'Our editorial line, and how we separate fact from opinion')}</a></p>` : ''}
  <p class="meta-line">${esc(k.booksN(books.length))}${courses.length ? ` · ${esc(L === 'he' ? `${courses.length} קורסים` : `${courses.length} courses`)}` : ''}</p></div></section>
<section class="section tight"><div class="wrap"><h2 class="sub-h">${esc(k.books)}</h2><ul class="shelf">${books.map((b) => shelfCard(b, c, products)).join('')}</ul></div></section>
${courses.length ? `<section class="section tight"><div class="wrap"><h2 class="sub-h">${esc(k.courses)}</h2><ul class="course-grid">${courses.map((x) => courseCard(x, c)).join('')}</ul></div></section>` : ''}
${ps.length ? `<section class="section tight"><div class="wrap"><h2 class="sub-h">${esc(k.paths)}</h2><ul class="path-grid">${ps.map((p) => pathCard(p, ctx)).join('')}</ul></div></section>` : ''}
${lists.length ? `<section class="section tight"><div class="wrap"><h2 class="sub-h">${esc(k.lists)}</h2><ul class="list-grid">${lists.map((col) => listCard(col, ctx)).join('')}</ul></div></section>` : ''}
${tools.length ? `<section class="section tight"><div class="wrap"><h2 class="sub-h">${esc(k.relatedTools)}</h2><ul class="mini-tools topic-tools">${tools.map((t) => `<li><a href="${urls.tool(c, t.id)}">${logoTile(t, c, 'xs')}<span>${esc(t.name)}</span></a></li>`).join('')}</ul>
  <p><a class="text-link" href="${c.u('category/' + tp.cat + '.html')}">${esc(L === 'he' ? 'לכל הכלים בתחום' : 'All tools in this area')}${icon('arrow', 'flip')}</a></p></div></section>` : ''}
`);
}
export const topicOf = (b) => TOPICS.find((tp) => b.topics.some((t) => tp.match.includes(t)));


// ---------- Author pages ----------
export function authorsOf(products) {
  const m = new Map();
  for (const b of products.items.filter((x) => x.type === 'book')) for (const a of b.authors) { if (!m.has(a)) m.set(a, []); m.get(a).push(b); }
  return [...m.entries()].map(([name, books]) => ({ name, slug: slug(name), books }));
}
export function authorPage(c, data, site, products, au) {
  const L = c.lang, k = K[L];
  const topics = [...new Set(au.books.flatMap((b) => b.topics))];
  const more = products.items.filter((x) => x.type === 'book' && !au.books.includes(x) && x.topics.some((t) => topics.includes(t))).slice(0, 6);
  const title = L === 'he' ? `ספרים של ${au.name}` : `Books by ${au.name}`;
  const jsonld = { '@context': 'https://schema.org', '@type': 'ProfilePage', mainEntity: { '@type': 'Person', name: au.name } };
  return page(c, data, site, { title: `${title} | ToolScout`, desc: (L === 'he' ? `ספרים של ${au.name} בקטלוג ToolScout, עם פרטי הוצאה שנבדקו.` : `Books by ${au.name} in the ToolScout catalog, with checked publisher details.`), page: 'author', active: 'books', jsonld }, `
<section class="page-head"><div class="wrap">${crumbs(c, [[c.u('books.html'), k.books], [null, au.name]])}<h1 lang="en" dir="ltr">${esc(au.name)}</h1>
  <p class="lead">${esc(k.booksN(au.books.length))} · ${esc(topics.map((t) => name(products.bookTopics, t, L)).join(', '))}</p></div></section>
<section class="section tight"><div class="wrap"><ul class="shelf">${au.books.map((b) => shelfCard(b, c, products)).join('')}</ul></div></section>
${more.length ? `<section class="section tight"><div class="wrap"><h2 class="sub-h">${esc(k.related)}</h2><ul class="shelf">${more.map((b) => shelfCard(b, c, products)).join('')}</ul></div></section>` : ''}
`);
}


// ---------- Ideas hub ----------
export function ideasPage(c, data, site, products) {
  const L = c.lang, k = K[L];
  const ctx = { c, data, products };
  const title = L === 'he' ? 'יהדות, ציונות ורעיונות' : 'Judaism, Zionism and ideas';
  const lead = L === 'he' ? 'אזורי ידע שמבטאים את הקו של ToolScout: יהדות ומסורת, ציונות, מחשבה שמרנית, חירות וכלכלה חופשית, מנהיגות וביטחון, וביקורת רעיונית. ספרים אמיתיים, פרטים שנבדקו, והפרדה ברורה בין עובדה לדעה.' : 'Areas that express ToolScout\'s line: Judaism and tradition, Zionism, conservative thought, liberty and free markets, leadership and security, and critique of ideas. Real books, checked details, and a clear line between fact and opinion.';
  const hubs = TOPICS.filter((tp) => tp.group === 'ideas');
  const books = products.items.filter((x) => x.type === 'book');
  const cols = products.collections.filter((col) => ['zionism-and-israel', 'conservative-foundations', 'israeli-authors-and-stories'].includes(col.id));
  return page(c, data, site, { title: `${title} | ToolScout`, desc: lead.slice(0, 158), page: 'ideas', active: 'ideas' }, `
<section class="page-head"><div class="wrap">${crumbs(c, [[null, title]])}<p class="eyebrow">${esc(L === 'he' ? 'רעיונות וזהות' : 'Ideas and identity')}</p><h1>${esc(title)}</h1><p class="lead">${esc(lead)}</p>
  <p><a class="text-link" href="${c.u('editorial.html')}">${esc(L === 'he' ? 'הקו המערכתי שלנו' : 'Our editorial line')}${icon('arrow', 'flip')}</a></p></div></section>
<section class="section tight"><div class="wrap"><ul class="topic-grid">${hubs.map((tp) => { const tb = books.filter((b) => b.topics.some((t) => tp.match.includes(t))); return `<li><a class="topic-card" href="${c.u('books/topic-' + tp.id + '.html')}"><span class="list-covers" aria-hidden="true">${tb.slice(0, 3).map((b) => `<span class="book-cover sm">${coverHtml(b, c, 'sm')}</span>`).join('')}</span>${tp.stance ? `<span class="eyebrow">${esc(L === 'he' ? 'עמדה עריכתית' : 'Editorial position')}</span>` : ''}<span class="topic-title">${esc(tp[L][0])}</span><span class="topic-meta">${esc(k.booksN(tb.length))}</span></a></li>`; }).join('')}</ul></div></section>
<section class="section tight"><div class="wrap"><h2 class="sub-h">${esc(k.lists)}</h2><ul class="list-grid">${cols.map((col) => listCard(col, ctx)).join('')}</ul></div></section>
`);
}

// ---------- Search ----------
export function searchPage(c, data, site) {
  const L = c.lang, k = K[L];
  const types = ['book', 'course', 'path', 'list', 'guide', 'tool'];
  return page(c, data, site, { title: `${k.searchTitle} | ToolScout`, desc: k.searchLead, page: 'search', active: 'search', noindex: true }, `
<section class="page-head"><div class="wrap">${crumbs(c, [[null, k.search]])}<h1>${esc(k.searchTitle)}</h1><p class="lead">${esc(k.searchLead)}</p>
  <form class="search search-hero" role="search" aria-label="${esc(k.searchTitle)}" action="${c.u('search.html')}" method="get" data-site-search>
    <label class="sr-only" for="sq">${esc(k.searchLabel)}</label>${icon('search', 'search-ic')}
    <input id="sq" name="q" type="search" autocomplete="off" placeholder="${esc(k.searchPh)}">
    <button type="submit" class="btn btn-primary">${esc(k.search)}</button>
  </form>
  <div class="type-chips js-only" role="group" aria-label="${esc(k.search)}"><button type="button" class="chip" data-stype="" aria-pressed="true">${esc(k.all)}</button>${types.map((t) => `<button type="button" class="chip" data-stype="${t}" aria-pressed="false">${esc(k.type[t])}</button>`).join('')}</div>
</div></section>
<section class="section tight"><div class="wrap">
  <p class="results-count js-only" role="status" data-scount data-tpl="${esc(k.results('{n}'))}" data-empty="${esc(k.noResults)}"></p>
  <ul class="search-results" data-sresults data-index="${c.a('assets/search-' + L + '.json')}?v=${site.version}" data-types="${esc(JSON.stringify(k.type))}"></ul>
  <noscript><p>${esc(k.noJs)}</p><ul class="mini-links"><li><a href="${c.u('books.html')}">${esc(k.books)}</a></li><li><a href="${c.u('courses.html')}">${esc(k.courses)}</a></li><li><a href="${c.u('paths/index.html')}">${esc(k.paths)}</a></li><li><a href="${c.u('catalog.html')}">${esc(k.tools)}</a></li></ul></noscript>
</div></section>
<script src="${c.a('assets/search.js')}?v=${site.version}" defer></script>
`);
}

// Search index per language (written by build.mjs).
export function searchIndex(L, data, products, paths) {
  const prefix = L === 'en' ? 'en/' : '';
  const out = [];
  for (const it of products.items) {
    if (it.type === 'book') out.push({ t: 'book', u: `${prefix}books/${it.id}.html`, n: it.title, s: it.authors.join(', '), d: it.description[L], k: [it.publisher, ...(it.topics || [])].join(' ') });
    if (it.type === 'course') out.push({ t: 'course', u: `${prefix}courses/${it.id}.html`, n: it.title, s: it.provider, d: it.description[L], k: (it.topics || []).join(' ') });
  }
  for (const p of paths.paths) out.push({ t: 'path', u: `${prefix}paths/${p.id}.html`, n: p.title[L], s: '', d: p.audience[L], k: p.steps.map((x) => x[1]).join(' ') });
  for (const col of products.collections) out.push({ t: 'list', u: `${prefix}lists/${col.id}.html`, n: col.title[L], s: '', d: col.description[L], k: col.items.map((x) => x[0]).join(' ') });
  for (const au of authorsOf(products)) out.push({ t: 'author', u: `${prefix}authors/${au.slug}.html`, n: au.name, s: au.books.map((b) => b.titleShort || b.title).join(', '), d: '', k: au.books.map((b) => b.title).join(' ') });
  for (const tp of TOPICS) out.push({ t: 'list', u: `${prefix}books/topic-${tp.id}.html`, n: tp[L][0], s: '', d: tp[L][1], k: tp.match.join(' ') });
  for (const g of guides) out.push({ t: 'guide', u: `${prefix}guides/${g.slug}.html`, n: g.title[L], s: '', d: g.summary[L], k: g.tools.join(' ') });
  for (const t of data.tools) out.push({ t: 'tool', u: `${prefix}tools/${t.id}.html`, n: t.name, s: t.maker, d: t.description[L], k: [t.category, ...t.uses].join(' ') });
  return out;
}
