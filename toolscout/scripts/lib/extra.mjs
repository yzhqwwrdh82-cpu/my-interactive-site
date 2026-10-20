// About page and the standalone root 404 page.
import { esc } from './util.mjs';
import { page, crumbs, brandMark, wordmark } from './layout.mjs';
import { ownerLine } from './pages.mjs';

const ABOUT = {
  he: {
    title: 'אודות ToolScout',
    desc: 'מה זה ToolScout, איך אנחנו בודקים כלים, ממה האתר מתכוון להתפרנס ומי עומד מאחוריו.',
    h1: 'אודות ToolScout',
    lead: 'ToolScout עוזר למצוא כלי בינה מלאכותית, תוכנות וספרים שמתאימים למשימה, בעברית ובאנגלית, עם מחירים ופרטים שנבדקו מול המקור.',
    sections: [
      ['מה יש כאן', (n, k, b) => `קטלוג של ${n} כלים ב-${k} קטגוריות, השוואות מוכנות, מדריכים קצרים ו-${b} ספרים מומלצים. כל כרטיס מציג למי הכלי מתאים, יתרונות וחסרונות, מסלול מחיר ותאריך בדיקה אחרון.`],
      ['איך אנחנו בודקים', () => 'כל מחיר ופלטפורמה נבדקים מול האתר הרשמי של היצרן, ותאריך הבדיקה מוצג בכרטיס. מה שלא הצלחנו לאמת מסומן בבירור כלא מאומת. אנחנו לא ממציאים דירוגים, ביקורות או נתוני שימוש.'],
      ['עצמאות ומימון', () => 'כרגע אין באתר קישורי שותפים, פרסומות או תוכן ממומן. בעתיד האתר עשוי להרוויח מעמלות שותפים, פרסומות או חסויות. כשזה יקרה, כל קישור בתשלום יסומן ליד הקישור עצמו, והדירוג לא ייקבע לפי גובה העמלה.'],
      ['מה עוד לא מחובר', () => 'טופס יצירת הקשר, הניוזלטר, הצ׳אט עם נציג והאזור האישי מוצגים כהדגמה בלבד. שום מידע לא נשלח או נשמר מהם.']
    ],
    who: 'מי עומד מאחורי האתר',
    method: 'קראו עוד על שיטת הבדיקה',
    disclosure: 'גילוי נאות',
    contact: 'יצירת קשר'
  },
  en: {
    title: 'About ToolScout',
    desc: 'What ToolScout is, how we check tools, how the site plans to make money, and who runs it.',
    h1: 'About ToolScout',
    lead: 'ToolScout helps you find AI tools, software and books that fit the job, in English and Hebrew, with prices and details checked against the source.',
    sections: [
      ['What you will find', (n, k, b) => `A catalog of ${n} tools in ${k} categories, ready-made comparisons, short guides and ${b} recommended books. Every card shows who the tool is for, pros and cons, the pricing model and the date it was last checked.`],
      ['How we check', () => 'Every price and platform is checked against the maker\'s official site, and the check date is shown on the card. Anything we could not verify is clearly marked as unverified. We do not invent ratings, reviews or usage numbers.'],
      ['Independence and funding', () => 'There are currently no affiliate links, ads or sponsored content on the site. In the future the site may earn affiliate commissions, ad revenue or sponsorships. When that happens, every paid link will be labeled next to the link itself, and rankings will not be set by commission size.'],
      ['What is not connected yet', () => 'The contact form, newsletter, live chat and personal area are demos only. Nothing is sent or stored from them.']
    ],
    who: 'Who runs the site',
    method: 'Read more about how we verify',
    disclosure: 'Disclosure',
    contact: 'Contact'
  }
};

export function aboutPage(c, data, site, products = null) {
  const L = c.lang;
  const a = ABOUT[L];
  const o = site.owner || {};
  const n = data.tools.length, k = data.categories.length, b = products ? products.items.length : 5;
  const owner = (o.name && o.email)
    ? ownerLine(o, L)
    : `<p class="todo">${esc(L === 'he' ? 'להשלמה: שם בעל האתר או העסק ואימייל ליצירת קשר.' : 'To be completed: site owner or business name and a contact email.')}</p>`;
  const jsonld = { '@context': 'https://schema.org', '@type': 'AboutPage', name: a.title, inLanguage: L, isPartOf: { '@type': 'WebSite', name: 'ToolScout', url: site.siteUrl + '/' } };
  return page(c, data, site, { title: `${a.title} | ToolScout`, desc: a.desc, page: 'about', jsonld }, `
<section class="page-head"><div class="wrap narrow">${crumbs(c, [[null, a.h1]])}<h1>${esc(a.h1)}</h1><p class="lead">${esc(a.lead)}</p></div></section>
<article class="wrap narrow prose">
${a.sections.map(([h, fn]) => `<h2>${esc(h)}</h2>\n<p>${esc(fn(n, k, b))}</p>`).join('\n')}
<h2>${esc(a.who)}</h2>
${owner}
<p><a href="${c.u('how-we-verify.html')}">${esc(a.method)}</a> · <a href="${c.u('disclosure.html')}">${esc(a.disclosure)}</a> · <a href="${c.u('contact.html')}">${esc(a.contact)}</a></p>
</article>
`);
}

// Root 404 (served by Netlify for any unknown path). Absolute links, because it can be served at any depth.
export function notFoundPage(site, basePath) {
  const b = basePath;
  const csp = "default-src 'self'; img-src 'self' data:; style-src 'self'; font-src 'self'; script-src 'self'; base-uri 'self'; form-action 'self'; object-src 'none'";
  return `<!doctype html>
<html lang="he" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta http-equiv="Content-Security-Policy" content="${csp}">
<meta name="robots" content="noindex">
<title>הדף לא נמצא · Page not found | ToolScout</title>
<link rel="icon" href="${b}/assets/favicon.svg" type="image/svg+xml">
<link rel="stylesheet" href="${b}/assets/styles.css?v=${site.version}">
<script src="${b}/assets/theme-init.js?v=${site.version}"></script>
</head>
<body>
<main id="main" class="section">
  <div class="wrap narrow prose">
    <p><a class="brand" href="${b}/">${brandMark()}${wordmark()}</a></p>
    <h1>הדף לא נמצא</h1>
    <p>ייתכן שהקישור שגוי או שהדף הועבר. אפשר לחזור לדף הבית או לחפש בקטלוג.</p>
    <p><a class="btn btn-primary" href="${b}/">לדף הבית</a> <a class="btn" href="${b}/catalog.html">לקטלוג הכלים</a></p>
    <hr>
    <div lang="en" dir="ltr">
      <h2>Page not found</h2>
      <p>The link may be wrong or the page may have moved. Go back to the home page or browse the catalog.</p>
      <p><a class="btn btn-primary" href="${b}/en/">Home</a> <a class="btn" href="${b}/en/catalog.html">Tool catalog</a></p>
    </div>
  </div>
</main>
</body>
</html>
`;
}

// ---------- Partnerships / advertise (B2B entry point; email only, nothing is collected on the site) ----------
const PARTNER = {
  he: {
    title: 'שיתופי פעולה ופרסום', desc: 'איך יצרני כלים, הוצאות ספרים וספקי קורסים יכולים לעבוד עם ToolScout, ואילו כללי עריכה חלים תמיד.',
    lead: 'ToolScout עוזר לאנשים לבחור כלי AI, תוכנות וספרים לפי מידע שנבדק מול המקור. אלה הדרכים לעבוד איתנו בלי לפגוע באמון של הקוראים.',
    now: 'כרגע אין באתר תוכן ממומן, פרסומות או קישורי שותפים.',
    waysH: 'דרכים לשיתוף פעולה',
    ways: [
      ['הצעת כלי לקטלוג', 'חינם. כלי נכנס לקטלוג רק אחרי בדיקה מול האתר הרשמי, ואי אפשר לשלם על הכנסה לקטלוג או על מיקום בדירוג.'],
      ['תוכן ממומן מסומן', 'כרטיס, מדריך או השוואה בחסות, עם תווית "פרסומת" ושם נותן החסות ליד התוכן עצמו.'],
      ['חסות בניוזלטר', 'אזכור מסומן בעדכון החודשי, אחרי שהניוזלטר יושק.'],
      ['תוכנית שותפים', 'אם יש לכם תוכנית שותפים, אפשר לשלוח פרטים. קישורים בתשלום מסומנים "קישור בתשלום".'],
      ['תוכן בעברית', 'מדריכים והסברים בעברית למוצר שנכנס לשוק הישראלי, עם סימון ברור כשיש תשלום.']
    ],
    rulesH: 'כללים שלא משתנים',
    rules: ['לא מוכרים ביקורות, דירוגים או "בחירת העורכים".', 'כל תוכן ממומן וכל קישור בתשלום מסומנים ליד התוכן.', 'מחירים ופרטים נבדקים מול המקור גם בתוכן ממומן.', 'אנחנו יכולים לסרב לכל הצעה.'],
    audienceH: 'נתוני קהל',
    audience: 'האתר חדש. נתוני תנועה יפורסמו רק כשיהיה כלי מדידה מחובר, ולא נמסור הערכות.',
    contactH: 'פנייה', contactTodo: 'להשלמה: אימייל ליצירת קשר.', contactText: 'כתבו לנו באימייל, וציינו את שם המוצר, סוג שיתוף הפעולה והקישור לאתר הרשמי:', subject: 'שיתוף פעולה עם ToolScout',
    more: 'גילוי נאות'
  },
  en: {
    title: 'Partnerships and advertising', desc: 'How tool makers, publishers and course providers can work with ToolScout, and the editorial rules that always apply.',
    lead: 'ToolScout helps people choose AI tools, software and books based on information checked against the source. These are the ways to work with us without hurting readers\' trust.',
    now: 'There is currently no sponsored content, advertising or affiliate links on the site.',
    waysH: 'Ways to work together',
    ways: [
      ['Suggest a tool', 'Free. A tool is added only after we check it against the official site, and nobody can pay to be included or ranked.'],
      ['Labeled sponsored content', 'A sponsored card, guide or comparison, labeled "Advertisement" with the sponsor\'s name next to the content itself.'],
      ['Newsletter sponsorship', 'A labeled mention in the monthly update, once the newsletter launches.'],
      ['Affiliate program', 'If you run an affiliate program, send us the details. Paid links are labeled "Paid link".'],
      ['Hebrew content', 'Guides and explainers in Hebrew for products entering the Israeli market, clearly labeled when paid.']
    ],
    rulesH: 'Rules that never change',
    rules: ['We do not sell reviews, rankings or "Editors\' picks".', 'Every sponsored item and paid link is labeled next to the content.', 'Prices and details are checked against the source, sponsored content included.', 'We can decline any offer.'],
    audienceH: 'Audience data',
    audience: 'The site is new. Traffic figures will be published only once a measurement tool is connected; we will not give estimates.',
    contactH: 'Contact', contactTodo: 'To be completed: a contact email.', contactText: 'Email us with the product name, the type of partnership and a link to the official site:', subject: 'Partnership with ToolScout',
    more: 'Disclosure'
  }
};
export function partnersPage(c, data, site) {
  const L = c.lang;
  const a = PARTNER[L];
  const o = site.owner || {};
  const contact = o.email
    ? `<p>${esc(a.contactText)} <a href="mailto:${esc(o.email)}?subject=${encodeURIComponent(a.subject)}" dir="ltr">${esc(o.email)}</a></p>`
    : `<p class="todo">${esc(a.contactTodo)}</p>`;
  return page(c, data, site, { title: `${a.title} | ToolScout`, desc: a.desc, page: 'partners' }, `
<section class="page-head"><div class="wrap narrow">${crumbs(c, [[null, a.title]])}<h1>${esc(a.title)}</h1><p class="lead">${esc(a.lead)}</p></div></section>
<article class="wrap narrow prose">
<p class="callout">${esc(a.now)}</p>
<h2>${esc(a.waysH)}</h2>
<ul>${a.ways.map(([h, t]) => `<li><strong>${esc(h)}:</strong> ${esc(t)}</li>`).join('')}</ul>
<h2>${esc(a.rulesH)}</h2>
<ul>${a.rules.map((r) => `<li>${esc(r)}</li>`).join('')}</ul>
<h2>${esc(a.audienceH)}</h2>
<p>${esc(a.audience)}</p>
<h2>${esc(a.contactH)}</h2>
${contact}
<p><a href="${c.u('disclosure.html')}">${esc(a.more)}</a></p>
</article>
`);
}

// ---------- Ideas hub and editorial line ----------
const ED = {
  he: {
    title: 'הקו המערכתי שלנו', desc: 'ToolScout הוא בית לספרים ולידע עם זהות ברורה: יהודית, ציונית ושמרנית, שמחויבת לחירות הפרט ולחופש המחשבה.',
    sections: [
      ['מי אנחנו', ['ToolScout הוא בית לספרים רגילים ולידע, עם זהות ברורה: יהודית, ציונית ושמרנית, שמחויבת לחירות הפרט ולחופש המחשבה. אנחנו לא מציגים את עצמנו כנייטרליים מבחינה רעיונית.', 'האתר פונה לישראלים ולקהל בינלאומי, בעברית ובאנגלית.']],
      ['מה זה אומר בפועל', ['אנחנו מבליטים אזורי ידע ביהדות ומסורת, בציונות ובהיסטוריה ישראלית, במחשבה שמרנית, בחירות הפרט ובכלכלה חופשית, במשפחה ובקהילה, בפילוסופיה ובמנהיגות ובביטחון.', 'יש לנו גם אזור של ביקורת רעיונית על פרוגרסיביות, תקינות פוליטית, תרבות הביטול וריכוז כוח מוסדי, עם ספרים אמיתיים ומקורות מדויקים.']],
      ['הספרים נשארים במרכז', ['לצד הקו הרעיוני, אנחנו ממליצים על ספרים טובים בהיסטוריה, בפסיכולוגיה, בטכנולוגיה, בעסקים ובתחומים רבים אחרים, לפי הערך שלהם לקורא.']],
      ['עובדה, פרשנות ודעה', ['עובדות: פרטי הספר (כותרת, מחבר, הוצאה, שנה ו־ISBN) נבדקים מול עמוד ההוצאה, ומסומנים "פרטים מאומתים".', 'פרשנות: תיאורי הספרים הם סיכום שלנו לתוכן, ולא ציטוט מהמוציא לאור.', 'דעה: המלצות ועמדות מסומנות "המלצה עריכתית" או "עמדה עריכתית".']],
      ['מה לא נעשה', ['לא נמציא ציטוטים, מקורות, ביקורות, דירוגים או נתוני מכירות.', 'לא נוסיף ספר, מחבר או מאמר שלא אימתנו.', 'נתקן טעויות גם כשהתיקון לא מתאים לעמדה שלנו.']],
      ['כללי שיח', ['כשהקהילה תיפתח, נשמח בוויכוח נמרץ ובחופש ביטוי.', 'אסורים: איומים, הטרדה ממוקדת, חשיפת פרטים אישיים, התקפות על אנשים בשל זהותם, וספאם.']]
    ],
    fix: 'מצאתם טעות? כתבו לנו, ונתקן ונציין את תאריך התיקון:', ideas: 'לאזורי הרעיונות'
  },
  en: {
    title: 'Our editorial line', desc: 'ToolScout is a home for books and knowledge with a clear identity: Jewish, Zionist and conservative, committed to individual liberty and freedom of thought.',
    sections: [
      ['Who we are', ['ToolScout is a home for print books and knowledge with a clear identity: Jewish, Zionist and conservative, committed to individual liberty and freedom of thought. We do not present ourselves as ideologically neutral.', 'The site serves Israelis and an international audience, in Hebrew and English.']],
      ['What this means in practice', ['We feature areas on Judaism and tradition, Zionism and Israeli history, conservative thought, individual liberty and free markets, family and community, philosophy, and leadership and security.', 'We also have an area of critique of progressivism, political correctness, cancel culture and the concentration of institutional power, with real books and exact sources.']],
      ['Books stay at the center', ['Alongside our editorial line, we recommend good books in history, psychology, technology, business and many other fields, based on their value to the reader.']],
      ['Fact, interpretation and opinion', ['Facts: book details (title, author, publisher, year and ISBN) are checked against the publisher page and marked "Verified details".', 'Interpretation: book descriptions are our summary of the content, not a quote from the publisher.', 'Opinion: recommendations and positions are marked "Editorial recommendation" or "Editorial position".']],
      ['What we will not do', ['We will not invent quotes, sources, reviews, ratings or sales figures.', 'We will not add a book, author or article we have not verified.', 'We correct mistakes even when the correction does not suit our position.']],
      ['Discussion rules', ['When the community opens, vigorous debate and free expression are welcome.', 'Not allowed: threats, targeted harassment, exposing personal details, attacks on people for their identity, and spam.']]
    ],
    fix: 'Found a mistake? Write to us, and we will fix it and note the date:', ideas: 'Go to the ideas areas'
  }
};
export function editorialPage(c, data, site) {
  const L = c.lang, e = ED[L], o = site.owner || {};
  return page(c, data, site, { title: `${e.title} | ToolScout`, desc: e.desc, page: 'editorial' }, `
<section class="page-head"><div class="wrap narrow">${crumbs(c, [[null, e.title]])}<h1>${esc(e.title)}</h1><p class="lead">${esc(e.desc)}</p></div></section>
<article class="wrap narrow prose">
${e.sections.map(([h, ps]) => `<h2>${esc(h)}</h2>${ps.map((x) => `<p>${esc(x)}</p>`).join('')}`).join('\n')}
${o.email ? `<p>${esc(e.fix)} <a href="mailto:${esc(o.email)}" dir="ltr">${esc(o.email)}</a></p>` : ''}
<p><a href="${c.u('ideas.html')}">${esc(e.ideas)}</a></p>
</article>
`);
}
