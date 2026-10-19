// "How we verify" — editorial methodology page (trust and transparency).
import { esc, fmtDate } from './util.mjs';
import { icon, page, crumbs } from './layout.mjs';

const T = {
  he: {
    title: 'איך אנחנו בודקים כלים | ToolScout',
    desc: 'השיטה של ToolScout: מה בדיוק אנחנו מאמתים מול האתרים הרשמיים, מה מסומן כלא מאומת, ומה אנחנו לא מפרסמים.',
    h1: 'איך אנחנו בודקים כלים',
    lead: 'בכל עמוד ב-ToolScout אפשר לדעת מה נבדק, מתי ומול איזה מקור, ומה עדיין לא אומת.',
    stats: (t, v, u, b) => `${t} כלים · ${v} עם תמחור מאומת · ${u} עם תמחור שלא אומת · ${b} ספרים`,
    steps: [
      ['search', 'מקור רשמי בלבד', 'את מודל התמחור (חינמי, חינמי ובתשלום, או בתשלום בלבד) ואת שמות התוכניות אנחנו בודקים בעמוד התמחור הרשמי של כל כלי. לא מבלוגים, לא מסיכומים ולא ממודלי AI.'],
      ['ok', 'עובדה נרשמת עם מקור', 'כל יתרון וחיסרון שמוצג כ"עובדה מאומתת" מקושר לעמוד שממנו נלקח: עמוד התמחור או האתר הרשמי.'],
      ['info', 'מה שלא אומת, מסומן', 'אם עמוד רשמי לא מציין משהו, למשל תמחור או פלטפורמות, אנחנו מסמנים "לא אומת" ולא משלימים מהזיכרון.'],
      ['check', 'כל בדיקה מתוארכת', 'בכל כלי מופיע תאריך הבדיקה. תוכניות ומחירים משתנים, ולכן אנחנו בודקים מחדש באופן קבוע.']
    ],
    notTitle: 'מה אנחנו לא מפרסמים',
    not: [
      'דירוגים, ציונים או "כוכבים": אין לנו מקור נתונים אמיתי לכך.',
      'ביקורות או המלצות בשם משתמשים.',
      'מחירים מדויקים בלי מקור ותאריך. במקומם מוצג מודל התמחור, עם קישור לעמוד הרשמי.',
      'נתוני פופולריות. "בחירת העורכים" היא בחירה עריכתית, ומסומנת ככזו.'
    ],
    edTitle: 'עובדות לעומת סיכום עריכתי',
    ed: 'התיאור, קהל היעד והשימושים של כל כלי הם סיכום של צוות ToolScout, ובעמוד הכלי הם מסומנים בבירור כ"סיכום עריכתי". כך אפשר להבחין בין מה שבדקנו לבין מה שאנחנו מסכמים.',
    moneyTitle: 'כסף ועצמאות',
    money: 'כרגע איננו מקבלים תשלום מאף כלי. אם בעתיד יתווספו קישורי שותפים או תוכן ממומן, הם יסומנו ליד הקישור עצמו. הם לא ישנו את העובדות המאומתות או את בחירת העורכים.',
    fixTitle: 'מצאתם טעות?',
    fix: 'אפשר לבחור בנושא "תיקון מידע בקטלוג" בעמוד יצירת הקשר. שימו לב שהטופס עדיין במצב הדגמה.',
    disclosure: 'לעמוד הגילוי הנאות', contact: 'לעמוד יצירת הקשר', updated: 'עודכן'
  },
  en: {
    title: 'How we verify tools | ToolScout',
    desc: "ToolScout's method: exactly what we verify against official sites, what's marked as unverified, and what we never publish.",
    h1: 'How we verify tools',
    lead: "On every ToolScout page you can see what was checked, when, against which source, and what hasn't been verified yet.",
    stats: (t, v, u, b) => `${t} tools · ${v} with verified pricing · ${u} with unverified pricing · ${b} books`,
    steps: [
      ['search', 'Official sources only', "We check each tool's pricing model (free, free + paid, or paid only) and plan names on its official pricing page. Not blogs, not round-ups, not AI models."],
      ['ok', 'Every fact has a source', 'Each pro and con shown as a "verified fact" links to the page it came from: the pricing page or the official site.'],
      ['info', "What isn't verified is marked", "If an official page doesn't state something, such as pricing or platforms, we mark it \"Not verified\" instead of filling it in from memory."],
      ['check', 'Every check is dated', 'Each tool shows the date it was checked. Plans and prices change, so we re-check regularly.']
    ],
    notTitle: "What we don't publish",
    not: [
      "Ratings, scores or stars: we don't have a real data source for them.",
      'Reviews or testimonials in users\' names.',
      'Exact prices without a source and date. Instead we show the pricing model, with a link to the official page.',
      "Popularity data. \"Editors' picks\" is an editorial selection, and is labeled as such."
    ],
    edTitle: 'Facts vs editorial summary',
    ed: "Each tool's description, audience and uses are ToolScout's summary, and they're clearly labeled \"Editorial summary\" on the tool page. That way you can tell what we checked from what we summarize.",
    moneyTitle: 'Money and independence',
    money: "We currently receive no payment from any tool. If affiliate links or sponsored content are added later, they'll be labeled right next to the link. They won't change verified facts or editors' picks.",
    fixTitle: 'Found a mistake?',
    fix: 'Choose the "Catalog correction" topic on the contact page. Note that the form is still in demo mode.',
    disclosure: 'Disclosure page', contact: 'Contact page', updated: 'Updated'
  }
};

export function methodPage(c, data, site, products) {
  const L = c.lang;
  const k = T[L];
  const v = data.tools.filter((x) => x.verification.pricing === 'verified').length;
  const books = products ? products.items.filter((x) => x.type === 'book').length : 0;
  return page(c, data, site, { title: k.title, desc: k.desc, page: 'method' }, `
<section class="page-head"><div class="wrap narrow">${crumbs(c, [[null, k.h1]])}
  <h1>${esc(k.h1)}</h1><p class="lead">${esc(k.lead)}</p>
  <p class="hero-stats method-stats">${esc(k.stats(data.tools.length, v, data.tools.length - v, books))}</p>
  <p class="meta-line">${esc(k.updated)} <time datetime="${site.updated}">${esc(fmtDate(site.updated, L))}</time></p></div></section>
<div class="wrap narrow">
  <ol class="method-steps">${k.steps.map(([ic, h, p], i) => `<li class="panel"><span class="method-ic">${icon(ic)}</span><div><h2><span class="sr-only">${i + 1}. </span>${esc(h)}</h2><p>${esc(p)}</p></div></li>`).join('')}</ol>
  <section class="panel method-not" aria-labelledby="not-h"><h2 id="not-h">${esc(k.notTitle)}</h2><ul class="facts-list cons">${k.not.map((x) => `<li>${icon('minus')}<span>${esc(x)}</span></li>`).join('')}</ul></section>
  <article class="prose method-prose">
    <h2>${esc(k.edTitle)}</h2><p>${esc(k.ed)}</p>
    <h2>${esc(k.moneyTitle)}</h2><p>${esc(k.money)} <a href="${c.u('disclosure.html')}">${esc(k.disclosure)}</a></p>
    <h2>${esc(k.fixTitle)}</h2><p>${esc(k.fix)} <a href="${c.u('contact.html')}">${esc(k.contact)}</a></p>
  </article>
</div>
`);
}
