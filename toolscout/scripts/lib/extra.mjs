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
