// Transactional / newsletter email templates (design only — nothing is sent).
// Table layout + inline styles for email-client compatibility. Placeholders use {{double_braces}}.
import { esc } from './util.mjs';

const C = { bg: '#F4F6F5', card: '#FFFFFF', ink: '#10242B', muted: '#4A5D65', line: '#DCE3E1', accent: '#0E6E68', signal: '#F2B705' };

export const EMAILS = {
  welcome: {
    he: { subject: 'ברוכים הבאים ל-ToolScout', pre: 'תודה שהצטרפתם. כך תקבלו מאיתנו את המיטב.', h: 'ברוכים הבאים, {{first_name}}',
      p: ['תודה שהצטרפתם לעדכונים של ToolScout. פעם בחודש נשלח סיכום קצר: כלים חדשים בקטלוג, שינויים בתמחור שבדקנו ומדריכים חדשים.', 'אנחנו בודקים כל פרט מול האתר הרשמי ומציינים מה לא אומת. בלי ספאם, ובלי למכור את הכתובת שלכם.'],
      cta: 'לקטלוג הכלים', ctaUrl: '{{catalog_url}}' },
    en: { subject: 'Welcome to ToolScout', pre: "Thanks for joining. Here's what to expect.", h: 'Welcome, {{first_name}}',
      p: ['Thanks for subscribing to ToolScout updates. Once a month we send a short round-up: new tools in the catalog, pricing changes we checked, and new guides.', "We check every detail against the official site and mark what we couldn't verify. No spam, and we never sell your address."],
      cta: 'Browse the catalog', ctaUrl: '{{catalog_url}}' }
  },
  confirm: {
    he: { subject: 'נא לאשר את ההרשמה', pre: 'עוד לחיצה אחת ואתם ברשימה.', h: 'נא לאשר את כתובת האימייל',
      p: ['קיבלנו בקשה לרשום את הכתובת הזו לעדכונים מ-ToolScout. כדי להשלים את ההרשמה, לחצו על הכפתור.', 'אם לא נרשמתם, אפשר להתעלם מההודעה. בלי אישור, הכתובת לא תתווסף לרשימה.'],
      cta: 'אישור ההרשמה', ctaUrl: '{{confirm_url}}', note: 'הקישור תקף ל-48 שעות.' },
    en: { subject: 'Please confirm your subscription', pre: "One more click and you're on the list.", h: 'Confirm your email address',
      p: ['We received a request to subscribe this address to ToolScout updates. Press the button to finish subscribing.', "If you didn't sign up, ignore this email. Without confirmation, the address won't be added."],
      cta: 'Confirm subscription', ctaUrl: '{{confirm_url}}', note: 'This link is valid for 48 hours.' }
  },
  update: {
    he: { subject: 'ToolScout: מה חדש החודש', pre: 'כלים חדשים, שינויי תמחור ומדריך חדש.', h: 'מה חדש החודש',
      p: ['{{intro_text}}'], list: ['{{item_1}}', '{{item_2}}', '{{item_3}}'],
      cta: 'לכל העדכונים', ctaUrl: '{{updates_url}}' },
    en: { subject: "ToolScout: what's new this month", pre: 'New tools, pricing changes and a new guide.', h: "What's new this month",
      p: ['{{intro_text}}'], list: ['{{item_1}}', '{{item_2}}', '{{item_3}}'],
      cta: 'See all updates', ctaUrl: '{{updates_url}}' }
  },
  'support-reply': {
    he: { subject: 'תשובה לפנייה שלכם [#{{ticket_id}}]', pre: 'ענינו לפנייה שלכם.', h: 'שלום {{first_name}},',
      p: ['תודה שכתבתם לנו בנושא "{{topic}}".', '{{reply_text}}', 'אפשר להשיב למייל הזה כדי להמשיך את השיחה.'],
      cta: 'צפייה בפנייה', ctaUrl: '{{ticket_url}}', sign: '{{agent_name}}, צוות ToolScout' },
    en: { subject: 'Reply to your request [#{{ticket_id}}]', pre: "We've replied to your request.", h: 'Hi {{first_name}},',
      p: ['Thanks for writing to us about "{{topic}}".', '{{reply_text}}', 'Reply to this email to continue the conversation.'],
      cta: 'View your request', ctaUrl: '{{ticket_url}}', sign: '{{agent_name}}, ToolScout team' }
  },
  system: {
    he: { subject: 'הודעת מערכת מ-ToolScout', pre: 'עדכון חשוב לגבי השירות.', h: '{{notice_title}}',
      p: ['{{notice_text}}', 'ההודעה הזו נשלחת לכל המשתמשים הרשומים, כי היא נוגעת לשירות או לתנאים.'],
      cta: 'לפרטים', ctaUrl: '{{details_url}}' },
    en: { subject: 'Service notice from ToolScout', pre: 'An important update about the service.', h: '{{notice_title}}',
      p: ['{{notice_text}}', 'This notice goes to all registered users because it concerns the service or its terms.'],
      cta: 'Details', ctaUrl: '{{details_url}}' }
  }
};

const FOOT = {
  he: { why: 'קיבלתם את ההודעה כי נרשמתם לעדכונים מ-ToolScout.', unsub: 'הסרה מהרשימה', prefs: 'ניהול העדפות', sender: '{{sender_name}} · {{sender_address}}', transactional: 'זו הודעת שירות שקשורה לפנייה או לחשבון שלכם.' },
  en: { why: 'You received this because you subscribed to ToolScout updates.', unsub: 'Unsubscribe', prefs: 'Manage preferences', sender: '{{sender_name}} · {{sender_address}}', transactional: 'This is a service message about your request or account.' }
};

export function emailHtml(name, lang) {
  const e = EMAILS[name][lang];
  const f = FOOT[lang];
  const dir = lang === 'he' ? 'rtl' : 'ltr';
  const align = lang === 'he' ? 'right' : 'left';
  const marketing = name === 'welcome' || name === 'update';
  const font = "'Rubik',Arial,Helvetica,sans-serif";
  const p = (text) => `<p style="margin:0 0 16px;font:16px/1.6 ${font};color:${C.ink};">${esc(text)}</p>`;
  return `<!doctype html>
<html lang="${lang}" dir="${dir}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="color-scheme" content="light">
<meta name="robots" content="noindex">
<title>${esc(e.subject)}</title>
</head>
<body style="margin:0;padding:0;background:${C.bg};">
<div style="display:none;max-height:0;overflow:hidden;">${esc(e.pre)}</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${C.bg};">
<tr><td align="center" style="padding:28px 12px;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;" dir="${dir}">
    <tr><td style="padding:0 4px 18px;text-align:${align};">
      <span style="display:inline-block;width:28px;height:28px;border-radius:8px;background:${C.ink};vertical-align:middle;"></span>
      <span style="font:700 20px/1 ${font};color:${C.ink};vertical-align:middle;padding:0 8px;">ToolScout</span>
    </td></tr>
    <tr><td style="background:${C.card};border:1px solid ${C.line};border-radius:16px;padding:32px 28px;text-align:${align};">
      <div style="height:4px;width:48px;background:${C.signal};border-radius:4px;margin:0 0 20px;${lang === 'he' ? 'margin-left:auto;' : ''}"></div>
      <h1 style="margin:0 0 16px;font:700 24px/1.3 ${font};color:${C.ink};">${esc(e.h)}</h1>
      ${e.p.map(p).join('\n      ')}
      ${e.list ? `<ul style="margin:0 0 16px;padding-${lang === 'he' ? 'right' : 'left'}:20px;font:16px/1.7 ${font};color:${C.ink};">${e.list.map((x) => `<li>${esc(x)}</li>`).join('')}</ul>` : ''}
      <table role="presentation" cellpadding="0" cellspacing="0" style="margin:8px 0 8px;${lang === 'he' ? 'margin-left:auto;' : ''}"><tr><td style="background:${C.accent};border-radius:10px;">
        <a href="${e.ctaUrl}" style="display:inline-block;padding:13px 22px;font:600 16px/1 ${font};color:#FFFFFF;text-decoration:none;">${esc(e.cta)}</a>
      </td></tr></table>
      ${e.note ? `<p style="margin:12px 0 0;font:14px/1.5 ${font};color:${C.muted};">${esc(e.note)}</p>` : ''}
      ${e.sign ? `<p style="margin:20px 0 0;font:15px/1.5 ${font};color:${C.ink};">${esc(e.sign)}</p>` : ''}
    </td></tr>
    <tr><td style="padding:20px 8px;text-align:${align};font:13px/1.6 ${font};color:${C.muted};">
      <p style="margin:0 0 6px;">${esc(marketing ? f.why : f.transactional)}</p>
      ${marketing ? `<p style="margin:0 0 6px;"><a href="{{unsubscribe_url}}" style="color:${C.accent};">${esc(f.unsub)}</a> · <a href="{{preferences_url}}" style="color:${C.accent};">${esc(f.prefs)}</a></p>` : ''}
      <p style="margin:0;">${esc(f.sender)}</p>
    </td></tr>
  </table>
</td></tr>
</table>
</body>
</html>
`;
}
