// Service interfaces demo page: email templates, newsletter, chat, voice, account.
// Everything here is a design specimen. Nothing connects to a real service.
import { esc } from './util.mjs';
import { S } from './strings.mjs';
import { icon, page, crumbs } from './layout.mjs';
import { EMAILS } from './emails.mjs';
import { newsletterBlock } from './pages.mjs';

const T = {
  he: {
    statusTitle: 'מה עובד ומה ממתין לחיבור',
    cols: ['רכיב', 'מצב', 'מה צריך כדי לחבר'],
    rows: [
      ['עוזר חיפוש בצ\'אט', 'ok', 'פועל עכשיו, כולו בדפדפן. לא שולח ולא שומר את השיחה.'],
      ['מועדפים והשוואה', 'ok', 'פועלים עכשיו. נשמרים רק בדפדפן.'],
      ['טופס יצירת קשר', 'warn', 'בדיקת השדות פועלת. לשליחה צריך לבחור ספק טפסים או מערכת תמיכה, ולעדכן את מדיניות הפרטיות.'],
      ['הרשמה לניוזלטר', 'warn', 'בדיקת השדות פועלת. צריך ספק דיוור עם אישור כפול, קישור הסרה ורשימת חסימה.'],
      ['תבניות אימייל', 'warn', 'מוכנות בעברית ובאנגלית. צריך ספק שליחה ופרטי שולח אמיתיים.'],
      ['צ\'אט עם נציג', 'off', 'צריך מערכת תמיכה, שעות מענה ומדיניות שמירת שיחות.'],
      ['עוזר AI', 'off', 'צריך ספק מודל, בדיקת עלויות, הגנות פרטיות וסינון תוכן.'],
      ['שיחה קולית', 'off', 'צריך ספק קול (WebRTC), בקשת הרשאת מיקרופון, בדיקת עלויות ופרטיות.'],
      ['אזור אישי וחשבונות', 'off', 'צריך מערכת אימות מאובטחת. אין התחברות מדומה.']
    ],
    st: { ok: 'פועל', warn: 'ממשק מוכן, לא מחובר', off: 'לא מחובר' },
    emailsTitle: 'תבניות אימייל', emailsLead: 'כל התבניות מוכנות בעברית ובאנגלית, עם קישור הסרה ופרטי שולח כנדרש בחוק. הסוגריים הכפולים ({{...}}) הם שדות שימולאו בזמן השליחה.',
    names: { welcome: 'ברוכים הבאים', confirm: 'אישור הרשמה (אישור כפול)', update: 'עדכון חודשי', 'support-reply': 'תשובה לפנייה', system: 'הודעת מערכת' },
    subject: 'נושא', openFull: 'פתיחה בחלון מלא',
    nlTitle: 'הרשמה לניוזלטר', nlLead: 'ההסכמה לא מסומנת מראש, ויש הסבר על אישור כפול. נסו לשלוח את הטופס: בדיקת השדות עובדת, אבל שום כתובת לא נשמרת.',
    chatTitle: 'צ\'אט באתר', chatLead: 'הצ\'אט החי נמצא בפינת המסך בכל עמוד. כאן מוצגים מצבי הממשק כדוגמאות עיצוב.',
    chatStates: { loading: 'טעינה', typing: 'חיווי כתיבה', error: 'שגיאה', soon: 'אפשרות שעדיין לא מחוברת' },
    sample: { q: 'אני מחפש כלי חינמי לעריכת וידאו', a: 'מצאתי 2 כלים:', t1: 'DaVinci Resolve', t2: 'OBS Studio', err: 'לא הצלחנו לטעון את הקטלוג.', retry: 'ניסיון חוזר', soonMsg: 'האפשרות הזו עדיין לא מחוברת. כשהיא תחובר, נציין זאת כאן במפורש.' },
    voiceTitle: 'שיחה קולית: עיצוב בלבד', voiceLead: 'אלה מצבי התצוגה המתוכננים לשיחה קולית. הכפתורים כאן לא פעילים, והדף לא מבקש גישה למיקרופון.',
    voice: {
      idle: ['מוכן לשיחה', 'לפני ההתחלה נבקש גישה למיקרופון. אפשר לסיים בכל רגע.', 'התחלת שיחה'],
      perm: ['בקשת הרשאה', 'הדפדפן יבקש גישה למיקרופון. השיחה לא תוקלט בלי הודעה מראש.', 'אישור בדפדפן'],
      connecting: ['מתחבר…', 'יוצר חיבור מאובטח.', 'ביטול'],
      live: ['השיחה פעילה', 'המיקרופון פעיל', 'סיום שיחה'],
      muted: ['השיחה פעילה', 'המיקרופון מושתק', 'סיום שיחה'],
      ended: ['השיחה הסתיימה', 'משך: 02:14. אפשר לחזור לצ\'אט הכתוב.', 'חזרה לצ\'אט'],
      error: ['אין גישה למיקרופון', 'אפשר לאשר גישה בהגדרות הדפדפן, או להמשיך בצ\'אט כתוב.', 'המשך בצ\'אט']
    },
    mute: 'השתקה', spec: 'דוגמת עיצוב',
    accTitle: 'אזור אישי', accLead: 'האזור האישי הקיים מציג מועדפים ששמורים בדפדפן. העדפות תקשורת, פניות וחשבון מסומנים כ"ממתין לחיבור".', accLink: 'לאזור האישי',
    planTitle: 'מסמכי תכנון', planBody: 'תוכנית התקשורת המלאה: הסכמות, אישור כפול, הסרה, מניעת ספאם, צ\'אט ושיחה קולית. היא נמצאת במאגר בקובץ toolscout/docs/communications-plan.md.'
  },
  en: {
    statusTitle: "What works and what's waiting to be connected",
    cols: ['Component', 'Status', 'Needed to connect'],
    rows: [
      ['Chat search helper', 'ok', "Works now, entirely in the browser. Doesn't send or store the conversation."],
      ['Favorites and compare', 'ok', 'Work now. Stored only in the browser.'],
      ['Contact form', 'warn', 'Field validation works. Sending needs a form or support provider, plus a privacy policy update.'],
      ['Newsletter sign-up', 'warn', 'Field validation works. Needs an email provider with double opt-in, an unsubscribe link and a suppression list.'],
      ['Email templates', 'warn', 'Ready in Hebrew and English. Needs a sending provider and real sender details.'],
      ['Live agent chat', 'off', 'Needs a support system, response hours and a chat retention policy.'],
      ['AI assistant', 'off', 'Needs a model provider, a cost review, privacy safeguards and content filtering.'],
      ['Voice call', 'off', 'Needs a voice provider (WebRTC), a microphone permission flow, and a cost and privacy review.'],
      ['Account area and sign-in', 'off', 'Needs a secure authentication system. No fake sign-in.']
    ],
    st: { ok: 'Working', warn: 'UI ready, not connected', off: 'Not connected' },
    emailsTitle: 'Email templates', emailsLead: 'All templates are ready in Hebrew and English, with an unsubscribe link and sender details as the law requires. Double braces ({{...}}) are fields filled in at send time.',
    names: { welcome: 'Welcome', confirm: 'Confirm subscription (double opt-in)', update: 'Monthly update', 'support-reply': 'Support reply', system: 'Service notice' },
    subject: 'Subject', openFull: 'Open full size',
    nlTitle: 'Newsletter sign-up', nlLead: 'Consent is never pre-ticked, and double opt-in is explained. Try submitting: validation works, but no address is stored.',
    chatTitle: 'Site chat', chatLead: 'The live chat sits in the corner of every page. These are its interface states, shown as design specimens.',
    chatStates: { loading: 'Loading', typing: 'Typing indicator', error: 'Error', soon: 'Option not connected yet' },
    sample: { q: "I'm looking for a free video editor", a: 'I found 2 tools:', t1: 'DaVinci Resolve', t2: 'OBS Studio', err: "We couldn't load the catalog.", retry: 'Try again', soonMsg: "This option isn't connected yet. When it is, we'll say so clearly here." },
    voiceTitle: 'Voice call: design only', voiceLead: "These are the planned voice-call states. The buttons here don't work, and this page never asks for microphone access.",
    voice: {
      idle: ['Ready to call', "Before starting we'll ask for microphone access. You can end at any time.", 'Start call'],
      perm: ['Permission request', "Your browser will ask for microphone access. Calls aren't recorded without notice.", 'Allow in browser'],
      connecting: ['Connecting…', 'Setting up a secure connection.', 'Cancel'],
      live: ['Call in progress', 'Microphone on', 'End call'],
      muted: ['Call in progress', 'Microphone muted', 'End call'],
      ended: ['Call ended', 'Duration: 02:14. You can go back to text chat.', 'Back to chat'],
      error: ['No microphone access', 'Allow access in your browser settings, or continue in text chat.', 'Continue in chat']
    },
    mute: 'Mute', spec: 'Design specimen',
    accTitle: 'Your area', accLead: 'The current personal area shows favorites stored in the browser. Communication preferences, requests and account are marked "Not connected yet".', accLink: 'Go to your area',
    planTitle: 'Planning documents', planBody: 'The full communications plan covers consent, double opt-in, unsubscribe, spam prevention, chat and voice. It lives in the repository at toolscout/docs/communications-plan.md.'
  }
};

function chatSpecimen(c, kind, x, s) {
  const msg = (who, text, time, extra = '') => `<div class="msg ${who}${extra}"><p>${text}</p><time>${time}</time></div>`;
  const bodies = {
    loading: `${msg('user', esc(x.sample.q), '10:42')}<div class="msg bot"><p class="loading-line"><span class="spinner" aria-hidden="true"></span>${esc(s.loading)}</p></div>`,
    typing: `${msg('user', esc(x.sample.q), '10:42')}<div class="msg bot typing"><span></span><span></span><span></span><b class="sr-only">${esc(x.chatStates.typing)}</b></div>`,
    error: `${msg('user', esc(x.sample.q), '10:42')}<div class="msg bot is-error"><p>${icon('info')}${esc(x.sample.err)}</p><button type="button" class="btn btn-ghost sm" disabled>${esc(x.sample.retry)}</button></div>`,
    soon: `<div class="msg bot"><p>${esc(x.sample.soonMsg)}</p><time>10:44</time></div><div class="chat-modes static"><span class="chip sm is-soon">${esc(s.agent)} <span class="soon">${esc(s.soon)}</span></span><span class="chip sm is-soon">${esc(s.ai)} <span class="soon">${esc(s.soon)}</span></span></div>`
  };
  return `<figure class="specimen chat-spec"><figcaption>${esc(x.chatStates[kind])}</figcaption>
    <div class="chat-panel static"><header class="chat-head"><div class="chat-id"><span class="chat-avatar" aria-hidden="true">${icon('search')}</span><div><p class="chat-title-s">${esc(s.title)}</p><p class="chat-status"><span class="dot dot-ok" aria-hidden="true"></span>${esc(s.status)}</p></div></div></header>
    <div class="chat-log">${bodies[kind]}</div></div></figure>`;
}

function voiceSpecimen(key, x) {
  const [title, sub, action] = x.voice[key];
  const live = key === 'live';
  const muted = key === 'muted';
  const cls = { idle: '', perm: 'is-perm', connecting: 'is-connecting', live: 'is-live', muted: 'is-muted', ended: 'is-ended', error: 'is-error' }[key];
  return `<figure class="specimen voice ${cls}"><figcaption>${esc(x.spec)}</figcaption>
    <div class="voice-orb" aria-hidden="true">${icon(key === 'error' ? 'info' : 'mic')}${live ? '<span class="ring"></span><span class="ring r2"></span>' : ''}</div>
    <p class="voice-title">${esc(title)}</p>
    <p class="voice-sub">${live ? `<span class="mic-live">${icon('mic')}${esc(sub)}</span> · 00:48` : muted ? `<span class="mic-muted">${esc(sub)}</span> · 01:12` : esc(sub)}</p>
    <div class="voice-actions">${live || muted ? `<button type="button" class="btn btn-ghost sm" disabled>${esc(x.mute)}</button>` : ''}
      <button type="button" class="btn ${live || muted || key === 'connecting' ? 'btn-danger' : 'btn-primary'} sm" disabled>${live || muted ? icon('phoneOff') : ''}${esc(action)}</button></div></figure>`;
}

export function previewPage(c, data, site) {
  const s = S[c.lang];
  const L = c.lang;
  const x = T[L];
  const cs = s.chat;
  const emailCards = Object.keys(EMAILS).map((name) => `<li class="email-card">
    <div class="email-meta"><h3>${esc(x.names[name])}</h3><p><span class="muted">${esc(x.subject)}:</span> ${esc(EMAILS[name][L].subject)}</p>
      <a class="text-link" href="${c.a('emails/' + L + '/' + name + '.html')}" target="_blank" rel="noopener">${esc(x.openFull)}${icon('ext')}</a></div>
    <iframe src="${c.a('emails/' + L + '/' + name + '.html')}" title="${esc(x.names[name])}" loading="lazy" sandbox=""></iframe></li>`).join('');

  return page(c, data, site, { title: s.preview.title, desc: s.preview.lead, page: 'preview', noindex: true }, `
<section class="page-head"><div class="wrap">${crumbs(c, [[null, s.preview.h1]])}<h1>${esc(s.preview.h1)}</h1><p class="lead">${esc(s.preview.lead)}</p></div></section>

<section class="section tight"><div class="wrap">
  <h2 id="st-h">${esc(x.statusTitle)}</h2>
  <div class="table-wrap" tabindex="0" role="region" aria-labelledby="st-h"><table class="status-table">
    <thead><tr>${x.cols.map((h) => `<th scope="col">${esc(h)}</th>`).join('')}</tr></thead>
    <tbody>${x.rows.map(([n, st, need]) => `<tr><th scope="row">${esc(n)}</th><td><span class="status ${st}">${icon(st === 'ok' ? 'ok' : st === 'warn' ? 'info' : 'minus')}${esc(x.st[st])}</span></td><td>${esc(need)}</td></tr>`).join('')}</tbody>
  </table></div>
</div></section>

<section class="section tight" aria-labelledby="em-h"><div class="wrap">
  <div class="section-head"><h2 id="em-h">${esc(x.emailsTitle)}</h2><p>${esc(x.emailsLead)}</p></div>
  <ul class="email-grid">${emailCards}</ul>
</div></section>

<section class="section tight" aria-labelledby="nlp-h"><div class="wrap">
  <div class="section-head"><h2 id="nlp-h">${esc(x.nlTitle)}</h2><p>${esc(x.nlLead)}</p></div>
  ${newsletterBlock(c, 'nl-p')}
</div></section>

<section class="section tight" aria-labelledby="ch-h"><div class="wrap">
  <div class="section-head"><h2 id="ch-h">${esc(x.chatTitle)}</h2><p>${esc(x.chatLead)}</p></div>
  <div class="spec-grid">${['loading', 'typing', 'error', 'soon'].map((k) => chatSpecimen(c, k, x, cs)).join('')}</div>
</div></section>

<section class="section tight" aria-labelledby="vo-h"><div class="wrap">
  <div class="section-head"><h2 id="vo-h">${esc(x.voiceTitle)}</h2><p>${esc(x.voiceLead)}</p></div>
  <div class="spec-grid voice-grid">${['idle', 'perm', 'connecting', 'live', 'muted', 'ended', 'error'].map((k) => voiceSpecimen(k, x)).join('')}</div>
</div></section>

<section class="section tight" aria-labelledby="ac-h"><div class="wrap two-col">
  <div class="panel"><h2 id="ac-h">${icon('user', 'h-ic')}${esc(x.accTitle)}</h2><p>${esc(x.accLead)}</p><a class="btn btn-ghost" href="${c.u('account.html')}">${esc(x.accLink)}</a></div>
  <div class="panel"><h2>${icon('info', 'h-ic')}${esc(x.planTitle)}</h2><p>${esc(x.planBody)}</p></div>
</div></section>
`);
}
