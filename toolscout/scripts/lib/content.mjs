// Editorial content: guides, comparison presets, legal pages and chat help answers.
// Facts about tools must come from data/tools.json — guides only reference them.

export const comparePresets = [
  { slug: 'ai-assistants', ids: ['chatgpt', 'claude', 'gemini'],
    title: { he: 'ChatGPT מול Claude מול Gemini', en: 'ChatGPT vs Claude vs Gemini' },
    lead: { he: 'שלושה עוזרי AI כלליים, כולם עם תוכנית חינמית ותוכניות בתשלום.', en: 'Three general AI assistants, each with a free plan and paid tiers.' },
    who: {
      chatgpt: { he: 'למי שרוצה מבחר רחב של דרגות מנוי (Go, Plus, Pro) ותוכניות לעסקים.', en: 'For people who want a wide choice of subscription tiers (Go, Plus, Pro) and business plans.' },
      claude: { he: 'למי שמחפש עוזר לכתיבה, ניתוח ותכנות, עם תוכניות Team ו-Enterprise לצוותים.', en: 'For writing, analysis and coding help, with Team and Enterprise plans for groups.' },
      gemini: { he: 'למי שכבר עובד עם חשבון Google: התוכנית החינמית פועלת עם החשבון הקיים.', en: 'For people already using a Google account: the free tier works with it.' } } },
  { slug: 'video-editing', ids: ['descript', 'davinci-resolve', 'runway'],
    title: { he: 'עריכת וידאו: Descript, ‏DaVinci Resolve ו-Runway', en: 'Video editing: Descript, DaVinci Resolve and Runway' },
    lead: { he: 'שלוש גישות: עריכה דרך תמלול, תוכנת עריכה מקצועית ויצירת וידאו ב-AI.', en: 'Three approaches: transcript-based editing, a professional editor and AI video generation.' },
    who: {
      descript: { he: 'לפודקאסטים ולסרטוני דיבור: עורכים את התמלול, ויש כלים להסרת מילות מילוי ולכתוביות.', en: 'For podcasts and talking videos: edit the transcript, with tools for filler words and captions.' },
      'davinci-resolve': { he: 'לעריכה מקצועית בחינם, ב-Windows, ב-Mac וב-Linux. גרסת Studio בתשלום.', en: 'For professional editing for free on Windows, Mac and Linux; Studio is paid.' },
      runway: { he: 'ליצירה ולעריכה של וידאו בעזרת AI, ולא לעריכה קלאסית של צילומים.', en: 'For creating and editing video with AI rather than classic footage editing.' } } },
  { slug: 'notes', ids: ['notion', 'obsidian', 'otter'],
    title: { he: 'פתקים וידע: Notion, ‏Obsidian ו-Otter.ai', en: 'Notes and knowledge: Notion, Obsidian and Otter.ai' },
    lead: { he: 'סביבת עבודה משותפת, פתקים בקבצים מקומיים ותמלול פגישות.', en: 'A shared workspace, local-file notes and meeting transcription.' },
    who: {
      notion: { he: 'לעבודת צוות על מסמכים, ויקי ופרויקטים במקום אחד.', en: 'For team work on docs, wikis and projects in one place.' },
      obsidian: { he: 'למי שרוצה שהפתקים יישארו במכשיר שלו ויעבדו גם בלי רשת. חינמית, גם לשימוש מסחרי.', en: 'For notes that stay on your device and work offline; free, including commercial use.' },
      otter: { he: 'לתמלול ולסיכום פגישות ב-Zoom, ב-Teams וב-Google Meet.', en: 'For transcribing and summarizing Zoom, Teams and Google Meet meetings.' } } },
  { slug: 'automation', ids: ['zapier', 'make', 'n8n'],
    title: { he: 'אוטומציה: Zapier, ‏Make ו-n8n', en: 'Automation: Zapier, Make and n8n' },
    lead: { he: 'שלוש פלטפורמות לחיבור אפליקציות. ההבדלים העיקריים: מגבלות התוכנית החינמית, ואפשרות התקנה עצמית.', en: 'Three platforms for connecting apps. The main differences: free-plan limits and self-hosting.' },
    who: {
      zapier: { he: 'למתחילים שרוצים להתחיל בחינם. התוכנית החינמית כוללת 100 משימות בחודש.', en: 'For beginners starting free; the free plan includes 100 tasks a month.' },
      make: { he: 'למי שרוצה בונה ויזואלי, עם 1,000 קרדיטים בחודש בתוכנית החינמית.', en: 'For a visual builder, with 1,000 credits a month on the free plan.' },
      n8n: { he: 'למשתמשים טכניים שרוצים להתקין על שרת משלהם. גרסה להתקנה עצמית זמינה ב-GitHub.', en: 'For technical users who want to self-host; a self-hosted version is on GitHub.' } } },
  { slug: 'free-image-editors', ids: ['gimp', 'inkscape', 'krita'],
    title: { he: 'עריכת תמונות ואיור בחינם: GIMP, ‏Inkscape ו-Krita', en: 'Free image editing and illustration: GIMP, Inkscape and Krita' },
    lead: { he: 'שלוש תוכנות חינמיות בקוד פתוח, וכל אחת מתאימה לסוג עבודה אחר.', en: 'Three free, open-source programs, each suited to a different kind of work.' },
    who: {
      gimp: { he: 'לעריכה ולריטוש של תמונות (גרפיקת פיקסלים).', en: 'For editing and retouching photos (raster graphics).' },
      inkscape: { he: 'לגרפיקה וקטורית: לוגואים, איורים ותרשימים.', en: 'For vector graphics: logos, illustrations and diagrams.' },
      krita: { he: 'לציור דיגיטלי ולאיור ביד חופשית.', en: 'For digital painting and freehand illustration.' } } },
  { slug: 'meeting-notes', ids: ['otter', 'fireflies'],
    title: { he: 'תמלול פגישות: Otter.ai מול Fireflies.ai', en: 'Meeting notes: Otter.ai vs Fireflies.ai' },
    lead: { he: 'שני רושמי פגישות מבוססי AI. לשניהם תוכנית חינמית, ושניהם עובדים עם Zoom, ‏Teams ו-Google Meet.', en: 'Two AI meeting notetakers; both have a free plan and work with Zoom, Teams and Google Meet.' },
    who: {
      otter: { he: 'לתמלול חי, לסיכומים ולצ\'אט על תוכן הפגישה, עם תוכנית Basic חינמית.', en: 'For live transcription, summaries and chat about the meeting, with a free Basic plan.' },
      fireflies: { he: 'להקלטה ולתמלול בכמה פלטפורמות פגישה, עם תוכנית חינמית לתמיד.', en: 'For recording and transcription across meeting platforms, with a free-forever plan.' } } },
  { slug: 'password-managers', ids: ['bitwarden', '1password', 'proton-pass'],
    title: { he: 'מנהלי סיסמאות: Bitwarden, ‏1Password ו-Proton Pass', en: 'Password managers: Bitwarden, 1Password and Proton Pass' },
    lead: { he: 'שלושה מנהלי סיסמאות. ההבדל המרכזי: לשניים יש תוכנית חינמית, ולאחד יש רק תקופת ניסיון.', en: 'Three password managers. The main difference: two have a free plan, one only a trial.' },
    who: {
      bitwarden: { he: 'למי שרוצה חשבון אישי חינמי ותוכנה בקוד פתוח, עם אפליקציות לדפדפן, לנייד ולמחשב.', en: 'For a free personal account and open-source software, with browser, mobile and desktop apps.' },
      '1password': { he: 'למשפחות ולעסקים שמוכנים לשלם. אפשר לנסות 14 יום בחינם לפני שמחליטים.', en: 'For families and businesses ready to pay; there is a 14-day free trial to decide.' },
      'proton-pass': { he: 'למי שכבר משתמש בשירותי Proton, או רוצה תוכנית חינמית בלי כרטיס אשראי.', en: 'For people already using Proton services, or who want a free plan with no credit card.' } } },
  { slug: 'social-media', ids: ['buffer', 'hootsuite'],
    title: { he: 'ניהול רשתות חברתיות: Buffer מול Hootsuite', en: 'Social media management: Buffer vs Hootsuite' },
    lead: { he: 'שני כלים לתזמון ולניהול פוסטים. ל-Buffer יש תוכנית חינמית, ול-Hootsuite רק תקופת ניסיון.', en: 'Two tools for scheduling and managing posts. Buffer has a free plan; Hootsuite only a trial.' },
    who: {
      buffer: { he: 'לעסקים קטנים וליוצרים שמתחילים בחינם, עם עד 3 ערוצים.', en: 'For small businesses and creators starting free, with up to 3 channels.' },
      hootsuite: { he: 'לצוותי שיווק וסוכנויות שמוכנים לשלם. אפשר לנסות 14 יום בחינם.', en: 'For marketing teams and agencies ready to pay; there is a 14-day free trial.' } } },
  { slug: 'project-management', ids: ['asana', 'trello', 'clickup'],
    title: { he: 'ניהול פרויקטים: Asana, ‏Trello ו-ClickUp', en: 'Project management: Asana, Trello and ClickUp' },
    lead: { he: 'לשלושתם יש תוכנית חינמית, אבל המגבלות שונות: מספר משתמשים, מספר לוחות ותכונות.', en: 'All three have a free plan, but the limits differ: users, boards and features.' },
    who: {
      asana: { he: 'לזוג שעובד יחד: התוכנית החינמית מיועדת ל-2 משתמשים.', en: 'For two people working together: the free plan is for 2 users.' },
      trello: { he: 'למי שרוצה לוחות קנבן פשוטים: עד 10 לוחות ו-10 משתתפים בתוכנית החינמית.', en: 'For simple kanban boards: up to 10 boards and 10 collaborators on the free plan.' },
      clickup: { he: 'למי שרוצה משימות, מסמכים ופרויקטים במקום אחד, עם תוכנית Free Forever.', en: 'For tasks, docs and projects in one place, with a Free Forever plan.' } } },
  { slug: 'ai-images', ids: ['midjourney', 'ideogram', 'leonardo'],
    title: { he: 'יצירת תמונות ב-AI: Midjourney, ‏Ideogram ו-Leonardo.ai', en: 'AI image generation: Midjourney, Ideogram and Leonardo.ai' },
    lead: { he: 'שלושה כלים ליצירת תמונות מטקסט. ההבדל העיקרי הוא אם אפשר להשתמש בחינם, ובאילו תנאים.', en: 'Three text-to-image tools. The main difference is whether you can use them for free, and on what terms.' },
    who: {
      midjourney: { he: 'למי שמוכן לשלם: כל התוכניות הן מנוי.', en: 'For people ready to pay: all plans are subscriptions.' },
      ideogram: { he: 'לניסוי בחינם: משתמשים רשומים מקבלים קרדיטים שבועיים, בכמות שעשויה להשתנות.', en: 'For trying it free: signed-in accounts get weekly credits, in amounts that may vary.' },
      leonardo: { he: 'לשימוש יומי חינמי עם 150 טוקנים מהירים ביום. בתוכנית החינמית התוצרים ציבוריים.', en: 'For daily free use with 150 fast tokens a day; free-plan creations are public.' } } },
  { slug: 'ai-video', ids: ['heygen', 'synthesia', 'runway'],
    title: { he: 'וידאו ב-AI: HeyGen, ‏Synthesia ו-Runway', en: 'AI video: HeyGen, Synthesia and Runway' },
    lead: { he: 'יצירת וידאו בלי מצלמה: אווטארים להדרכה ולשיווק, או יצירה ועריכה ב-AI.', en: 'Video without a camera: avatars for training and marketing, or AI generation and editing.' },
    who: {
      heygen: { he: 'לסרטוני שיווק והדרכה, כולל התאמה לשפות נוספות.', en: 'For marketing and training videos, including localization.' },
      synthesia: { he: 'להדרכה ולתקשורת בארגון, עם תוכנית Basic חינמית (עם מגבלת דקות).', en: 'For training and internal communication, with a free Basic plan (minute-limited).' },
      runway: { he: 'ליצירה ולעריכה קריאטיבית של וידאו בעזרת AI.', en: 'For creative AI video generation and editing.' } } }
];

export const guides = [
  {
    slug: 'choose-password-manager', minutes: 3, updated: '2026-10-19',
    tools: ['bitwarden', '1password', 'proton-pass', 'proton-vpn'],
    title: { he: 'איך לבחור מנהל סיסמאות', en: 'How to choose a password manager' },
    summary: { he: 'מה בודקים לפני שבוחרים: תוכנית חינמית או ניסיון, קוד פתוח, פלטפורמות ושיתוף במשפחה.', en: 'What to check before choosing: free plan or trial, open source, platforms and family sharing.' },
    body: {
      he: [
        ['p', 'מנהל סיסמאות שומר את כל הסיסמאות בכספת מוצפנת, כך שצריך לזכור רק סיסמה ראשית אחת. במדריך הזה ריכזנו ארבע שאלות שכדאי לשאול לפני שבוחרים, על סמך המידע שבדקנו בעמודים הרשמיים.'],
        ['h2', '1. צריך תוכנית חינמית?'],
        ['p', 'ל-Bitwarden יש חשבון אישי חינמי. ל-Proton Pass יש תוכנית Proton Free, שאין צורך בכרטיס אשראי כדי להירשם אליה. ב-1Password עמוד התמחור מציג ניסיון חינם של 14 יום, ואחריו נדרש מנוי.'],
        ['h2', '2. חשוב לכם קוד פתוח?'],
        ['p', 'Bitwarden מציינת בעמוד התמחור שהיא בקוד פתוח. ב-Proton Pass עמוד התמחור עצמו לא מציין זאת, ולכן בקטלוג זה מסומן "לא אומת".'],
        ['h2', '3. משפחה או עסק?'],
        ['p', 'לכל השלושה יש תוכניות למשפחות או לעסקים: Families ו-Teams ב-Bitwarden, ‏Pass Family ב-Proton, ותוכניות Personal ו-Business ב-1Password.'],
        ['h2', '4. ומה עם VPN?'],
        ['p', 'מנהל סיסמאות ו-VPN הם כלים שונים. VPN מצפין את התעבורה ברשת. ל-Proton VPN יש תוכנית חינמית בלי הגבלת נתונים, לפי עמוד התמחור שלה.'],
        ['p', 'שימו לב: לא בדקנו בעצמנו את רמת האבטחה של הכלים. ההשוואה מתבססת על המידע הרשמי בלבד.']
      ],
      en: [
        ['p', 'A password manager keeps all your passwords in an encrypted vault, so you only need to remember one master password. This guide covers four questions to ask before choosing, based on what we checked on the official pages.'],
        ['h2', '1. Do you need a free plan?'],
        ['p', "Bitwarden has a free personal account. Proton Pass has a Proton Free plan, and signing up needs no credit card. 1Password's pricing page shows a 14-day free trial, after which a subscription is needed."],
        ['h2', '2. Does open source matter to you?'],
        ['p', "Bitwarden's pricing page says it is open source. Proton Pass's pricing page doesn't state this itself, so the catalog marks it as not verified."],
        ['h2', '3. Family or business?'],
        ['p', 'All three have family or business options: Families and Teams at Bitwarden, Pass Family at Proton, and Personal and Business plans at 1Password.'],
        ['h2', '4. What about a VPN?'],
        ['p', 'A password manager and a VPN are different tools. A VPN encrypts your network traffic. Proton VPN has a free plan with no data limits, according to its pricing page.'],
        ['p', 'Note: we have not independently audited the security of these tools. The comparison is based on official information only.']
      ]
    }
  },
  {
    slug: 'small-business-free-stack', minutes: 4, updated: '2026-10-19',
    tools: ['trello', 'asana', 'airtable', 'calendly', 'mailchimp', 'buffer'],
    title: { he: 'כלים חינמיים לניהול עסק קטן', en: 'Free tools for running a small business' },
    summary: { he: 'משימות, טבלאות, תיאום פגישות, דיוור ורשתות חברתיות: מה מקבלים בתוכניות החינמיות, ואיפה עובר הגבול.', en: 'Tasks, databases, scheduling, email and social media: what the free plans include and where they stop.' },
    body: {
      he: [
        ['p', 'עסק קטן יכול להתחיל עם כלים חינמיים, בתנאי שמכירים את המגבלות. כל הנתונים במדריך מופיעים בעמודי התמחור הרשמיים, ונבדקו בתאריך שמופיע בעמוד של כל כלי.'],
        ['h2', 'משימות ופרויקטים'],
        ['p', 'Trello מאפשרת בתוכנית החינמית עד 10 לוחות ו-10 משתתפים בכל סביבת עבודה. התוכנית החינמית של Asana מיועדת ל-2 משתמשים. אם הצוות גדול יותר, כדאי לבדוק את ההשוואה המוכנה לניהול פרויקטים.'],
        ['h2', 'טבלאות ונתונים'],
        ['p', 'ל-Airtable יש תוכנית חינמית ליחידים ולצוותים קטנים מאוד, ותוכניות מיוחדות לעמותות ולחינוך.'],
        ['h2', 'תיאום פגישות'],
        ['p', 'התוכנית החינמית של Calendly כוללת סוג פגישה אחד וחיבור ליומן אחד. זה מספיק לפגישת היכרות אחת עם לקוחות.'],
        ['h2', 'דיוור ורשתות חברתיות'],
        ['p', 'התוכנית החינמית של Mailchimp מוגבלת ל-250 אנשי קשר ו-500 שליחות בחודש. Buffer מאפשרת בחינם לחבר עד 3 ערוצים. לפני דיוור שיווקי, ודאו שיש לכם הסכמה מראש של הנמענים ושבכל הודעה יש דרך להסיר את עצמם מהרשימה, כפי שהחוק מחייב.'],
        ['h2', 'מתי לשדרג'],
        ['p', 'כדאי לשדרג כשמגיעים לאחת המגבלות, ולא לפני. התוכניות והמגבלות משתנים, לכן בדקו את העמוד הרשמי לפני רכישה.']
      ],
      en: [
        ['p', 'A small business can start with free tools, as long as it knows the limits. Every figure in this guide comes from the official pricing pages and was checked on the date shown on each tool page.'],
        ['h2', 'Tasks and projects'],
        ['p', "Trello's free plan allows up to 10 boards and 10 collaborators per workspace. Asana's free plan is for 2 users. For a bigger team, see the ready-made project management comparison."],
        ['h2', 'Databases'],
        ['p', 'Airtable has a free plan for individuals and very small teams, plus special nonprofit and education plans.'],
        ['h2', 'Scheduling'],
        ['p', "Calendly's free plan includes one event type and one calendar connection. That's enough for a single client intro call."],
        ['h2', 'Email and social media'],
        ['p', "Mailchimp's free plan is limited to 250 contacts and 500 sends a month. Buffer lets you connect up to 3 channels for free. Before sending marketing email, make sure recipients gave prior consent and every message includes a way to unsubscribe, as the law requires."],
        ['h2', 'When to upgrade'],
        ['p', 'Upgrade when you hit one of the limits, not before. Plans and limits change, so check the official page before buying.']
      ]
    }
  },
  {
    slug: 'free-tools', minutes: 3, updated: '2026-10-19',
    tools: ['vscode', 'blender', 'obs-studio', 'audacity', 'obsidian', 'davinci-resolve'],
    title: { he: 'כלים חינמיים באמת: מה אפשר לעשות בלי לשלם', en: 'Genuinely free tools: what you can do without paying' },
    summary: { he: 'קוד, תלת-ממד, הקלטה, אודיו ופתקים: תוכנות שהגרסה החינמית שלהן היא תוכנה מלאה.', en: 'Code, 3D, recording, audio and notes: software whose free version is the full product.' },
    body: {
      he: [
        ['p', 'הרבה כלים מציגים "תוכנית חינמית" שהיא בעצם גרסת ניסיון. במדריך הזה ריכזנו תוכנות שהגרסה החינמית שלהן מספיקה לעבודה אמיתית, לפי מה שבדקנו באתרים הרשמיים.'],
        ['h2', 'קוד פתוח ובחינם לגמרי'],
        ['p', 'Visual Studio Code, ‏Blender, ‏OBS Studio ו-Audacity הן תוכנות חינמיות בקוד פתוח. לפי האתר הרשמי של Blender, מותר להשתמש בה לכל מטרה, כולל עבודה מסחרית. OBS Studio ו-Audacity פועלות ב-Windows, ב-macOS וב-Linux.'],
        ['h2', 'חינם, עם תוספות בתשלום'],
        ['p', 'Obsidian חינמית ללא הגבלה ובלי הרשמה, גם לשימוש מסחרי. סנכרון בין מכשירים ופרסום לרשת הם תוספות בתשלום. ל-DaVinci Resolve יש גרסה חינמית ל-Windows, ל-Mac ול-Linux, וגרסת Studio בתשלום.'],
        ['h2', 'לפני שמתחילים'],
        ['p', 'תנאים משתנים מדי פעם. בכל עמוד כלי בקטלוג מופיע תאריך הבדיקה וקישור לעמוד הרשמי, כדי שתוכלו לוודא שהמידע עדיין נכון.']
      ],
      en: [
        ['p', 'Many tools advertise a "free plan" that is really a trial. This guide collects software whose free version is enough for real work, based on what we checked on the official sites.'],
        ['h2', 'Open source and completely free'],
        ['p', "Visual Studio Code, Blender, OBS Studio and Audacity are free and open source. Blender's official site says it can be used for any purpose, including commercial work. OBS Studio and Audacity run on Windows, macOS and Linux."],
        ['h2', 'Free, with paid add-ons'],
        ['p', 'Obsidian is free without limits and needs no sign-up, including for commercial use. Sync across devices and web publishing are paid add-ons. DaVinci Resolve has a free version for Windows, Mac and Linux, and a paid Studio edition.'],
        ['h2', 'Before you start'],
        ['p', 'Terms change from time to time. Every tool page in the catalog shows the date we checked it and a link to the official page, so you can confirm the details are still current.']
      ]
    }
  },
  {
    slug: 'choose-ai-assistant', minutes: 4, updated: '2026-10-19',
    tools: ['chatgpt', 'claude', 'gemini', 'perplexity', 'microsoft-copilot', 'le-chat'],
    title: { he: 'איך לבחור עוזר AI', en: 'How to choose an AI assistant' },
    summary: { he: 'ארבע שאלות שעוזרות להחליט בין ChatGPT, ‏Claude, ‏Gemini ואחרים.', en: 'Four questions that help you decide between ChatGPT, Claude, Gemini and others.' },
    body: {
      he: [
        ['p', 'כל עוזרי ה-AI הכלליים בקטלוג מציעים תוכנית חינמית. ההבדלים הם בדרך העבודה, בשירותים שהם משתלבים בהם ובמה שמקבלים בתשלום.'],
        ['h2', '1. איפה אתם כבר עובדים?'],
        ['p', 'אם אתם עובדים בעיקר עם חשבון Google, ל-Gemini יש תוכנית חינמית עם החשבון הזה. Microsoft Copilot זמין בדפדפן, ב-Windows, ב-Mac ובטלפון, ומגבלות שימוש גבוהות יותר מגיעות עם Microsoft 365 Premium.'],
        ['h2', '2. צריכים מקורות?'],
        ['p', 'Perplexity בנוי כמנוע תשובות שמחפש ברשת. זה שימושי כשחשוב לכם לראות מאיפה הגיע המידע.'],
        ['h2', '3. כמה תשתמשו?'],
        ['p', 'לשימוש מזדמן, התוכניות החינמיות מספיקות לרוב. לשימוש יומיומי כדאי להשוות את הדרגות בתשלום בעמודי התמחור הרשמיים, כי הן משתנות.'],
        ['h2', '4. עבודה בצוות?'],
        ['p', 'ChatGPT ו-Claude מציעים תוכניות לצוותים ולארגונים, ול-Mistral Vibe (לשעבר Le Chat) יש גם גרסה לסטודנטים מאומתים. אפשר לראות את ההבדלים בהשוואה המוכנה בקטלוג.']
      ],
      en: [
        ['p', 'Every general AI assistant in the catalog offers a free plan. The differences are in how they work, which services they fit into, and what you get when you pay.'],
        ['h2', '1. Where do you already work?'],
        ['p', 'If you mostly use a Google account, Gemini has a free tier with that account. Microsoft Copilot is available on the web, Windows, Mac and mobile, and higher usage limits come with Microsoft 365 Premium.'],
        ['h2', '2. Do you need sources?'],
        ['p', 'Perplexity is built as an answer engine that searches the web. That helps when you want to see where information came from.'],
        ['h2', '3. How much will you use it?'],
        ['p', 'For occasional use, the free plans are usually enough. For daily use, compare the paid tiers on the official pricing pages, because they change.'],
        ['h2', '4. Working as a team?'],
        ['p', "ChatGPT and Claude offer plans for teams and organizations, and Mistral Vibe (formerly Le Chat) also has a version for verified students. See the differences in the ready-made comparison in the catalog."]
      ]
    }
  },
  {
    slug: 'no-code-automation', minutes: 3, updated: '2026-10-19',
    tools: ['zapier', 'make', 'n8n'],
    title: { he: 'אוטומציה בלי קוד: מאיפה מתחילים', en: 'No-code automation: where to start' },
    summary: { he: 'מה עושות פלטפורמות כמו Zapier, ‏Make ו-n8n, ומה ההבדלים בתוכניות החינמיות.', en: 'What platforms like Zapier, Make and n8n do, and how their free plans differ.' },
    body: {
      he: [
        ['p', 'פלטפורמות אוטומציה מחברות בין אפליקציות: כשמשהו קורה באחת, פעולה מתבצעת בשנייה. למשל, טופס חדש נשמר בגיליון ונשלחת התראה לצוות.'],
        ['h2', 'להתחיל בחינם'],
        ['p', 'ל-Zapier יש תוכנית חינמית לתמיד עם 100 משימות בחודש. ל-Make יש תוכנית חינמית עם 1,000 קרדיטים בחודש. הנתונים האלה מופיעים בעמודי התמחור הרשמיים, ונבדקו בתאריך שמופיע בעמוד של כל כלי.'],
        ['h2', 'התקנה עצמית'],
        ['p', 'n8n מציעה גרסה סטנדרטית להתקנה עצמית, שזמינה ב-GitHub, ותוכניות ענן בתשלום עם תקופת ניסיון. התקנה עצמית מתאימה למשתמשים טכניים, ודורשת לנהל שרת בעצמכם.'],
        ['h2', 'איך לבחור'],
        ['p', 'התחילו מתהליך אחד קטן, ובדקו כמה משימות או קרדיטים הוא צורך בחודש. כך תדעו אם התוכנית החינמית מספיקה לכם. את ההבדלים אפשר לראות בהשוואה המוכנה.']
      ],
      en: [
        ['p', 'Automation platforms connect apps: when something happens in one, an action runs in another. For example, a new form entry is saved to a sheet and the team gets a notification.'],
        ['h2', 'Starting free'],
        ['p', "Zapier has a free-forever plan with 100 tasks a month. Make has a free plan with 1,000 credits a month. These figures come from the official pricing pages and were checked on the date shown on each tool's page."],
        ['h2', 'Self-hosting'],
        ['p', 'n8n offers a standard self-hosted version on GitHub, plus paid cloud plans with a trial. Self-hosting suits technical users and means running your own server.'],
        ['h2', 'How to choose'],
        ['p', 'Start with one small workflow and see how many tasks or credits it uses each month. That tells you whether the free plan is enough. See the differences in the ready-made comparison.']
      ]
    }
  },
  {
    slug: 'free-design-tools', minutes: 3, updated: '2026-10-19',
    tools: ['gimp', 'inkscape', 'krita', 'blender', 'canva', 'figma'],
    title: { he: 'עיצוב בחינם: תוכנות קוד פתוח ותוכניות חינמיות', en: 'Design for free: open-source software and free plans' },
    summary: { he: 'עריכת תמונות, גרפיקה וקטורית, ציור, תלת-ממד ועיצוב ממשקים, בלי לשלם.', en: 'Photo editing, vector graphics, painting, 3D and interface design without paying.' },
    body: {
      he: [
        ['h2', 'תוכנות חינמיות בקוד פתוח'],
        ['p', 'GIMP היא עורך תמונות, Inkscape היא עורך גרפיקה וקטורית, Krita היא תוכנת ציור דיגיטלי ו-Blender היא תוכנת תלת-ממד. כולן חינמיות ובקוד פתוח. GIMP ו-Inkscape פועלות ב-Windows, ב-macOS וב-Linux.'],
        ['h2', 'תוכניות חינמיות בשירותי ענן'],
        ['p', 'ל-Canva יש תוכנית חינמית לעיצוב גרפיקה ומצגות. ל-Figma יש תוכנית חינמית ליחידים לעיצוב ממשקים. התוכניות בתשלום מוסיפות יכולות לצוותים ולעסקים.'],
        ['h2', 'מה לבחור'],
        ['p', 'לתמונות, בחרו ב-GIMP. ללוגו או לאיור שצריך להגדיל בלי לאבד איכות, בחרו ב-Inkscape. לציור, Krita. לעבודה מהירה עם תבניות, Canva. לעיצוב אפליקציות ואתרים, Figma.']
      ],
      en: [
        ['h2', 'Free, open-source software'],
        ['p', 'GIMP is an image editor, Inkscape a vector graphics editor, Krita a digital painting program and Blender a 3D suite. All are free and open source. GIMP and Inkscape run on Windows, macOS and Linux.'],
        ['h2', 'Free plans in cloud tools'],
        ['p', 'Canva has a free plan for graphics and presentations. Figma has a free plan for individuals for interface design. Paid plans add team and business features.'],
        ['h2', 'Which to pick'],
        ['p', 'For photos, choose GIMP. For a logo or illustration that must scale without losing quality, choose Inkscape. For painting, Krita. For fast work with templates, Canva. For app and website design, Figma.']
      ]
    }
  },
  {
    slug: 'creator-kit', minutes: 3, updated: '2026-10-19',
    tools: ['obs-studio', 'audacity', 'descript', 'davinci-resolve', 'elevenlabs', 'suno'],
    title: { he: 'ערכת יוצרי תוכן: הקלטה, עריכה וקול', en: 'Creator kit: recording, editing and voice' },
    summary: { he: 'מהקלטת המסך ועד המוזיקה: כלים לכל שלב, ומה חשוב לבדוק לפני שימוש מסחרי.', en: 'From screen recording to music: tools for each step, and what to check before commercial use.' },
    body: {
      he: [
        ['h2', 'הקלטה'],
        ['p', 'OBS Studio מקליטה וידאו ומשדרת שידור חי, למשל ל-Twitch ול-YouTube. היא חינמית ובקוד פתוח. לאודיו בלבד, Audacity מקליטה, עורכת וממירה פורמטים, גם היא בחינם.'],
        ['h2', 'עריכה'],
        ['p', 'ב-Descript עורכים וידאו ואודיו דרך התמלול, ויש בה כלי AI להסרת מילות מילוי ולכתוביות. DaVinci Resolve היא תוכנת עריכה מקצועית עם גרסה חינמית.'],
        ['h2', 'קול ומוזיקה'],
        ['p', 'ElevenLabs מייצרת קול מטקסט. Suno יוצרת מוזיקה, אבל שימו לב: לפי עמוד התמחור שלה, התוכנית החינמית לא כוללת זכויות שימוש מסחרי. רק התוכניות Pro ו-Premier כוללות אותן.'],
        ['h2', 'שימוש מסחרי'],
        ['p', 'לפני שמפרסמים תוכן שנוצר בכלי AI, כדאי לבדוק את תנאי הרישיון של התוכנית שלכם בעמוד הרשמי.']
      ],
      en: [
        ['h2', 'Recording'],
        ['p', 'OBS Studio records video and streams live, for example to Twitch and YouTube. It is free and open source. For audio only, Audacity records, edits and converts formats, also for free.'],
        ['h2', 'Editing'],
        ['p', 'Descript lets you edit video and audio through the transcript, with AI tools for removing filler words and adding captions. DaVinci Resolve is a professional editor with a free version.'],
        ['h2', 'Voice and music'],
        ['p', "ElevenLabs generates voice from text. Suno creates music, but note: according to its pricing page, the free plan has no commercial use rights. Only the Pro and Premier plans include them."],
        ['h2', 'Commercial use'],
        ['p', "Before you publish content made with an AI tool, check the license terms for your plan on the official page."]
      ]
    }
  }
];

// Legal pages. Accurate to the current static site: no cookies, no analytics,
// no forms that transmit data, browser storage only for preferences.
export const legal = {
  privacy: {
    title: { he: 'מדיניות פרטיות', en: 'Privacy policy' },
    updated: '2026-10-19',
    body: {
      he: [
        ['todo', 'טיוטה לפני בדיקת עורך דין. פרטי בעל האתר עדיין חסרים ומסומנים "להשלמה".'],
        ['p', 'המדיניות הזו מתארת איזה מידע נאסף כשמשתמשים ב-ToolScout ואיך הוא משמש. היא משקפת את האתר כפי שהוא היום.'],
        ['h2', 'מי אחראי על האתר'],
        ['owner'],
        ['h2', 'מה האתר עצמו אוסף'],
        ['p', 'האתר לא מגדיר עוגיות, ולא משתמש בכלי אנליטיקה, בפרסומות, בפיקסלים של רשתות חברתיות או בסקריפטים של צד שלישי. אין בו חשבונות משתמש.'],
        ['p', 'טופס יצירת הקשר וההרשמה לעדכונים נמצאים במצב הדגמה. הם בודקים את השדות בדפדפן בלבד, ולא שולחים ולא שומרים את מה שמקלידים בהם.'],
        ['h2', 'מה נשמר בדפדפן שלכם'],
        ['p', 'האתר שומר בדפדפן (localStorage) שלושה פריטים, רק כשאתם משתמשים בתכונה המתאימה: ערכת הצבעים שבחרתם (ts-theme), רשימת המועדפים (ts-favs) והכלים שבחרתם להשוואה (ts-compare). המידע נשאר במכשיר שלכם, לא נשלח אלינו, ואפשר למחוק אותו בכל עת דרך הגדרות הדפדפן או דרך האזור האישי.'],
        ['h2', 'עוזר החיפוש'],
        ['p', 'עוזר החיפוש באתר פועל כולו בדפדפן. השאלות שאתם כותבים בו לא נשלחות לשרת ולא נשמרות. כדי לחפש, הדפדפן טוען מהאתר קובץ עם נתוני הקטלוג, כמו כל דף אחר באתר.'],
        ['h2', 'ספק האחסון'],
        ['p', 'האתר מאוחסן אצל Netlify. כמו כל שרת אינטרנט, Netlify מעבדת נתונים טכניים על כל בקשה, כמו כתובת IP, הדף המבוקש, זמן הגישה וסוג הדפדפן, לצורך הפעלת השירות ואבטחתו. לפי הסכם עיבוד הנתונים של Netlify, היא פועלת כ"מעבד" מטעם בעל האתר, עשויה לעבד נתונים בארצות הברית, ושומרת יומנים עד 90 יום באופן מקוון ועד שנה באופן לא מקוון.'],
        ['todo', 'לבדוק עם עורך דין: האם ההסכם עם Netlify והעברת הנתונים לחו"ל דורשים הודעה או הסדר נוסף לפי הדין החל.'],
        ['p', 'הגופנים והלוגואים מאוחסנים באתר עצמו, ולא נטענים משירותים חיצוניים.'],
        ['h2', 'מדידת שימוש (Google Analytics)', 'analytics'],
        ['p', 'אם תאשרו זאת בחלון ההסכמה, האתר יטען את Google Analytics 4 כדי למדוד שימוש מצטבר, כמו אילו עמודים נצפים ומאיזה סוג מכשיר. Google תשמור לצורך כך עוגיות ותעבד נתונים כמו כתובת IP ומזהה דפדפן. לפני האישור לא נטען שום קוד של Google. הבחירה נשמרת בדפדפן בפריט ts-consent, ואפשר לשנות אותה בכל עת בקישור "הגדרות פרטיות" בתחתית העמוד. אותות פרסום נשארים כבויים.', 'analytics'],
        ['h2', 'פרסומות (Google AdSense)', 'ads'],
        ['p', 'ספקים חיצוניים, ובהם Google, משתמשים בעוגיות כדי להציג מודעות לפי ביקורים קודמים באתר הזה ובאתרים אחרים. אפשר לבטל פרסום מותאם אישית בהגדרות המודעות של Google (adssettings.google.com), ואת העוגיות של ספקים אחרים באתר www.aboutads.info. למבקרים מהאזור הכלכלי האירופי, מבריטניה ומשווייץ תוצג בקשת הסכמה דרך פלטפורמת הסכמה מאושרת של Google.', 'ads'],
        ['h2', 'קישורים חיצוניים'],
        ['p', 'קישורים לאתרי הכלים מובילים לאתרים של צד שלישי, שחלות עליהם מדיניות הפרטיות שלהם.'],
        ['h2', 'הזכויות שלכם'],
        ['p', 'לפי חוק הגנת הפרטיות, ובמקרים מסוימים לפי דיני הגנת מידע של מדינות אחרות, יש לכם זכות לעיין במידע עליכם ולבקש לתקן אותו. מאחר שהאתר לא שומר מידע אישי מעבר ליומני האחסון, ברוב המקרים לא יהיה מידע לעיין בו. פניות אפשר לשלוח לכתובת שתופיע בסעיף "מי אחראי על האתר".'],
        ['h2', 'לפני חיבור שירותים בעתיד'],
        ['p', 'לפני שנחבר שירות שאוסף מידע, כמו דיוור, טופס פנייה פעיל, צ\'אט עם נציג או שיחה קולית, נעדכן את המדיניות. נציג בנקודת האיסוף מה נאסף, למה, האם מסירת המידע היא חובה, למי הוא יועבר ומה הזכויות שלכם, ונבקש הסכמה כשהדין מחייב זאת.']
      ],
      en: [
        ['todo', 'Draft pending legal review. Site owner details are still missing and marked "to be completed".'],
        ['p', 'This policy describes what information is collected when you use ToolScout and how it is used. It reflects the site as it is today.'],
        ['h2', 'Who is responsible for the site'],
        ['owner'],
        ['h2', 'What the site itself collects'],
        ['p', 'The site sets no cookies and uses no analytics, ads, social media pixels or third-party scripts. It has no user accounts.'],
        ['p', 'The contact form and the updates sign-up are in demo mode. They check the fields in your browser only, and do not send or store anything you type.'],
        ['h2', 'What is stored in your browser'],
        ['p', 'The site stores three items in your browser (localStorage), and only when you use the related feature: your color theme (ts-theme), your favorites (ts-favs) and your comparison picks (ts-compare). This stays on your device, is never sent to us, and you can delete it at any time in your browser settings or from your area on the site.'],
        ['h2', 'Search helper'],
        ['p', 'The search helper runs entirely in your browser. What you type into it is not sent to a server or stored. To search, your browser loads a catalog data file from the site, like any other page.'],
        ['h2', 'Hosting provider'],
        ['p', 'The site is hosted on Netlify. Like any web server, Netlify processes technical data about each request, such as IP address, requested page, access time and browser type, to run and secure the service. Under Netlify\'s data processing agreement, Netlify acts as a processor on behalf of the site owner, may process data in the United States, and keeps logs online for up to 90 days and offline for up to one year.'],
        ['todo', 'Check with a lawyer: whether the Netlify agreement and the transfer of data abroad require any additional notice or arrangement under applicable law.'],
        ['p', 'Fonts and logos are served from the site itself, not loaded from external services.'],
        ['h2', 'Usage measurement (Google Analytics)', 'analytics'],
        ['p', 'If you allow it in the consent prompt, the site loads Google Analytics 4 to measure aggregate usage, such as which pages are viewed and on what kind of device. For this, Google stores cookies and processes data such as IP address and a browser identifier. Before you allow it, no Google code is loaded. Your choice is saved in your browser (ts-consent), and you can change it at any time from the "Privacy settings" link in the footer. Advertising signals stay off.', 'analytics'],
        ['h2', 'Advertising (Google AdSense)', 'ads'],
        ['p', 'Third-party vendors, including Google, use cookies to serve ads based on prior visits to this site and other sites. You can opt out of personalized advertising in Google Ads Settings (adssettings.google.com), and out of other vendors\' cookies at www.aboutads.info. Visitors from the EEA, the UK and Switzerland will see a consent request through a Google-certified consent platform.', 'ads'],
        ['h2', 'External links'],
        ['p', 'Links to tool websites lead to third-party sites, which have their own privacy policies.'],
        ['h2', 'Your rights'],
        ['p', 'Under Israel\'s Privacy Protection Law, and in some cases under other countries\' data protection laws, you have the right to access information about you and to ask for it to be corrected. Because the site keeps no personal data beyond hosting logs, in most cases there will be nothing to access. You can send requests to the address that will appear under "Who is responsible for the site".'],
        ['h2', 'Before connecting services later'],
        ['p', 'Before connecting any service that collects information, such as email updates, a live contact form, live chat or voice calls, we\'ll update this policy. At the point of collection we\'ll explain what is collected, why, whether providing it is required, who receives it and what your rights are, and we\'ll ask for consent where the law requires it.']
      ]
    }
  },
  terms: {
    title: { he: 'תנאי שימוש', en: 'Terms of use' },
    updated: '2026-10-19',
    body: {
      he: [
        ['todo', 'טיוטה לפני בדיקת עורך דין. פרטי המפעיל, הדין החל וסמכות השיפוט עדיין חסרים.'],
        ['h2', 'מי מפעיל את האתר'],
        ['owner'],
        ['h2', 'מטרת האתר'],
        ['p', 'ToolScout הוא קטלוג מידע. הוא עוזר להכיר כלים ולהשוות ביניהם, אבל הוא לא מוכר מוצרים ולא מספק שירות של הכלים עצמם.'],
        ['h2', 'דיוק המידע'],
        ['p', 'אנחנו בודקים את המידע מול האתרים הרשמיים ומציינים את תאריך הבדיקה. מידע שלא הצלחנו לאמת מסומן ככזה. תוכניות, מחירים ותכונות משתנים, ולכן לפני רכישה או התחייבות כדאי לבדוק את התנאים העדכניים באתר הרשמי של הכלי. אם מצאתם טעות, נשמח שתעדכנו אותנו.'],
        ['h2', 'קישורים לאתרים אחרים'],
        ['p', 'הקישורים מובילים לאתרים של צדדים שלישיים. איננו שולטים בתוכן, בתנאים או במדיניות הפרטיות שלהם, והשימוש בהם כפוף לתנאים שלהם.'],
        ['h2', 'סימני מסחר ולוגואים'],
        ['p', 'שמות המוצרים והלוגואים שייכים לבעליהם, ומשמשים רק כדי לזהות את המוצרים. השימוש בהם לא מעיד על שותפות, חסות או המלצה מצד בעליהם. בעל סימן שמבקש לשנות או להסיר את הצגתו מוזמן לפנות אלינו.'],
        ['h2', 'זכויות בתוכן'],
        ['p', 'התיאורים, המדריכים והעיצוב באתר הם תוכן מקורי של ToolScout. רכיבים של צד שלישי, כמו לוגואים והגופן, משמשים לפי הרישיונות שלהם, כמפורט בעמוד הקרדיטים שבמאגר הקוד.'],
        ['h2', 'שימוש באתר'],
        ['p', 'אין לשבש את פעולת האתר, לנסות לעקוף את מנגנוני האבטחה שלו, או להציג את תוכנו כאילו הוא של מישהו אחר.'],
        ['h2', 'אחריות'],
        ['p', 'המידע באתר ניתן לצורכי מידע כללי בלבד, ואינו ייעוץ מקצועי. במידה המותרת בדין, איננו אחראים לנזק שנגרם מהסתמכות על מידע שהשתנה מאז תאריך הבדיקה שלו, או מהשימוש באתרים חיצוניים. אין באמור כדי לגרוע מזכויות שהדין מעניק ושאי אפשר לוותר עליהן.'],
        ['h2', 'קישורי שותפים וחסויות'],
        ['p', 'כרגע אין באתר קישורי שותפים, פרסומות או תוכן ממומן. אם יתווספו, הם יסומנו כמתואר בעמוד הגילוי הנאות.'],
        ['h2', 'שינויים בתנאים'],
        ['p', 'אנחנו עשויים לעדכן את התנאים מעת לעת. תאריך העדכון האחרון מופיע בראש העמוד.'],
        ['h2', 'דין וסמכות שיפוט'],
        ['todo', 'להשלמה על ידי עורך דין: הדין החל וסמכות השיפוט.']
      ],
      en: [
        ['todo', 'Draft pending legal review. Operator details, governing law and jurisdiction are still missing.'],
        ['h2', 'Who operates the site'],
        ['owner'],
        ['h2', 'What the site is'],
        ['p', 'ToolScout is an information catalog. It helps you discover and compare tools, but it does not sell products or provide the tools themselves.'],
        ['h2', 'Accuracy'],
        ['p', 'We check information against official sites and show the date of each check. Information we couldn\'t verify is marked as such. Plans, prices and features change, so check the current terms on the tool\'s official site before buying or committing. If you find a mistake, please let us know.'],
        ['h2', 'Links to other sites'],
        ['p', 'Links lead to third-party sites. We don\'t control their content, terms or privacy policies, and your use of them is subject to their terms.'],
        ['h2', 'Trademarks and logos'],
        ['p', 'Product names and logos belong to their owners and are used only to identify the products. Their use does not imply any partnership, sponsorship or endorsement by their owners. A trademark owner who wants its mark shown differently or removed is welcome to contact us.'],
        ['h2', 'Content rights'],
        ['p', 'The descriptions, guides and design on this site are ToolScout\'s original content. Third-party components such as logos and the typeface are used under their own licenses, as listed in the credits file in the code repository.'],
        ['h2', 'Using the site'],
        ['p', 'Do not disrupt the site, try to bypass its security, or present its content as someone else\'s.'],
        ['h2', 'Liability'],
        ['p', 'Information on the site is for general information only and is not professional advice. To the extent permitted by law, we are not liable for loss caused by relying on information that changed after its check date, or by using external sites. Nothing here limits rights you have under law that cannot be waived.'],
        ['h2', 'Affiliate links and sponsorships'],
        ['p', 'There are no affiliate links, ads or sponsored content right now. If any are added, they will be labeled as described on the disclosure page.'],
        ['h2', 'Changes to these terms'],
        ['p', 'We may update these terms from time to time. The last update date appears at the top of the page.'],
        ['h2', 'Governing law and jurisdiction'],
        ['todo', 'To be completed by a lawyer: governing law and jurisdiction.']
      ]
    }
  },
  accessibility: {
    title: { he: 'הצהרת נגישות', en: 'Accessibility statement' },
    updated: '2026-10-19',
    body: {
      he: [
        ['todo', 'טיוטה. פרטי רכז/ת הנגישות חסרים, ובדיקה ידנית מלאה עדיין לא בוצעה.'],
        ['p', 'אנחנו רוצים ש-ToolScout יהיה נוח לשימוש לכל אחד, כולל אנשים עם מוגבלות. היעד שלנו הוא התקן הישראלי ת"י 5568, שמבוסס על הנחיות WCAG 2.0 ברמה AA. בנוסף, פעלנו לפי הנחיות WCAG 2.1 ברמה AA.'],
        ['p', 'אנחנו לא מצהירים על עמידה מלאה בתקן. עד כה בוצעו בדיקות אוטומטיות ובדיקות מקלדת בלבד. בדיקה מקצועית ידנית עדיין לא בוצעה.'],
        ['h2', 'מה עשינו'],
        ['p', 'האתר כולל ניווט מלא במקלדת עם סימון פוקוס ברור, קישור לדילוג לתוכן, מבנה כותרות מסודר ותוויות לשדות טפסים. הוא תומך בעברית מימין לשמאל ובאנגלית משמאל לימין, עם ניגודיות צבעים מספקת במצב בהיר ובמצב כהה. הוא מכבד את הגדרת "הפחתת תנועה" במערכת ההפעלה, וכל התוכן זמין גם בלי JavaScript.'],
        ['h2', 'בדיקות שבוצעו'],
        ['p', 'ב-19 באוקטובר 2026 בדקנו 16 סוגי עמודים, בעברית ובאנגלית, במצב בהיר ובמצב כהה, במחשב ובטלפון, בכלי הבדיקה האוטומטי axe-core, מול כללי WCAG 2.0 ו-2.1 ברמות A ו-AA. לא נמצאו הפרות בבדיקה הזו. בדיקה אוטומטית לא מכסה את כל דרישות התקן.'],
        ['h2', 'מגבלות ידועות'],
        ['p', 'בדיקה ידנית עם קוראי מסך (כמו NVDA ו-VoiceOver) עדיין לא בוצעה. האתרים החיצוניים שאליהם אנחנו מקשרים לא נמצאים באחריותנו. תצוגות המקדימות של תבניות האימייל בעמוד ההדגמה מוצגות בתוך מסגרות, וייתכן שהן פחות נוחות לקוראי מסך.'],
        ['h2', 'פנייה בנושא נגישות'],
        ['a11yContact'],
        ['p', 'אם נתקלתם בבעיית נגישות, נשמח לשמוע: באיזה עמוד, מה ניסיתם לעשות ובאיזה דפדפן או טכנולוגיה מסייעת השתמשתם.'],
        ['h2', 'עדכון ההצהרה'],
        ['p', 'ההצהרה עודכנה לאחרונה ב-19 באוקטובר 2026.']
      ],
      en: [
        ['todo', 'Draft. Accessibility coordinator details are missing, and a full manual audit has not been done yet.'],
        ['p', 'We want ToolScout to be easy for everyone to use, including people with disabilities. Our target is the Israeli standard IS 5568, which is based on WCAG 2.0 level AA. We also followed WCAG 2.1 level AA.'],
        ['p', 'We do not claim full conformance. So far only automated and keyboard testing has been done. A professional manual audit has not been carried out yet.'],
        ['h2', 'What we did'],
        ['p', 'The site has full keyboard navigation with a visible focus indicator, a skip-to-content link, a clear heading structure and labelled form fields. It supports right-to-left Hebrew and left-to-right English, with sufficient color contrast in light and dark themes. It respects the "reduce motion" system setting, and all content is available without JavaScript.'],
        ['h2', 'Testing done'],
        ['p', 'On 19 October 2026 we tested 16 page types, in Hebrew and English, in light and dark themes, on desktop and phone widths, with the automated checker axe-core against WCAG 2.0 and 2.1 level A and AA rules. That test found no violations. Automated testing does not cover every requirement of the standard.'],
        ['h2', 'Known limitations'],
        ['p', 'Manual testing with screen readers (such as NVDA and VoiceOver) has not been done yet. External sites we link to are not under our control. The email template previews on the demo page are shown inside frames, which may be less convenient with screen readers.'],
        ['h2', 'Accessibility contact'],
        ['a11yContact'],
        ['p', 'If you run into an accessibility problem, we want to hear about it: which page, what you were trying to do, and which browser or assistive technology you used.'],
        ['h2', 'Statement updates'],
        ['p', 'This statement was last updated on 19 October 2026.']
      ]
    }
  },
  disclosure: {
    title: { he: 'גילוי נאות', en: 'Disclosure' },
    updated: '2026-10-19',
    body: {
      he: [
        ['p', 'ToolScout הוא קטלוג עצמאי. המטרה שלנו היא לעזור לכם למצוא את הכלי המתאים, עם מידע שנבדק מול האתרים הרשמיים.'],
        ['h2', 'המצב היום'],
        ['p', 'כרגע אין באתר קישורי שותפים, פרסומות, תוכן ממומן או מיקום בתשלום, ואיננו מקבלים תשלום או טובת הנאה מאף כלי שמופיע באתר. כל הקישורים מובילים ישירות לאתרים הרשמיים.'],
        ['h2', 'איך נסמן קשרים מסחריים בעתיד'],
        ['p', 'קישור שותפים: ליד הקישור עצמו תופיע התווית "קישור בתשלום". המשמעות היא שאם תרכשו דרכו, ייתכן שנקבל עמלה, בלי עלות נוספת עבורכם.'],
        ['p', 'תוכן ממומן או חסות: בראש התוכן, לפני גוף הטקסט, תופיע המילה "פרסומת" יחד עם שם הגורם המממן.'],
        ['p', 'מיקום מקודם בתשלום: הכרטיס יסומן "פרסומת". מיקום כזה לא יופיע תחת "בחירת העורכים".'],
        ['h2', 'עצמאות עריכתית'],
        ['p', 'עמלות או חסויות לא משנות את העובדות המאומתות, את היתרונות והחסרונות, או את הבחירה אילו כלים נכנסים לקטלוג ול"בחירת העורכים".']
      ],
      en: [
        ['p', 'ToolScout is an independent catalog. Our goal is to help you find the right tool, with information checked against the official sites.'],
        ['h2', 'Today'],
        ['p', 'There are no affiliate links, ads, sponsored content or paid placements on the site right now, and we receive no payment or benefit from any tool listed. Every link goes directly to the official site.'],
        ['h2', 'How we will label commercial relationships'],
        ['p', 'Affiliate links: the label "Paid link" will appear right next to the link itself. It means that if you buy through it, we may earn a commission at no extra cost to you.'],
        ['p', 'Sponsored content: the word "Advertisement", together with the sponsor\'s name, will appear at the top of the content, before the body text.'],
        ['p', 'Paid placements: the card will be labeled "Advertisement". A paid placement will never appear under "Editors\' picks".'],
        ['h2', 'Editorial independence'],
        ['p', 'Commissions or sponsorships do not change verified facts, pros and cons, or which tools are listed and chosen as editors\' picks.']
      ]
    }
  }
};

// Chat helper: site-help answers matched by keywords (both languages).
export const chatHelp = [
  { keys: ['אומת', 'מאומת', 'אימות', 'verified', 'verify', 'verification', 'checked'],
    a: { he: '"תמחור אומת" אומר שבדקנו את מודל התמחור (חינמי, חינמי + בתשלום או בתשלום בלבד) בעמוד התמחור הרשמי, בתאריך שמופיע בעמוד הכלי. מה שלא הצלחנו לאמת מסומן "לא אומת".', en: '"Pricing verified" means we checked the pricing model (free, free + paid, or paid only) on the official pricing page, on the date shown on the tool page. Anything we could not verify is marked "Not verified".' } },
  { keys: ['השוואה', 'להשוות', 'משווים', 'compare', 'comparison'],
    a: { he: 'בקטלוג, סמנו "השוואה" בעד 3 כרטיסים ולחצו על "השוואה" בפס שבתחתית המסך. אפשר גם לפתוח את עמוד ההשוואה ולבחור כלים מהרשימה.', en: 'In the catalog, tick "Compare" on up to 3 cards and press "Compare" in the bar at the bottom. You can also open the compare page and pick tools from the list.' } },
  { keys: ['מועדפים', 'מועדף', 'לב', 'favorite', 'favourites', 'favorites', 'saved'],
    a: { he: 'לחצו על הלב בכרטיס של כלי כדי לשמור אותו. המועדפים נשמרים רק בדפדפן שלכם, במכשיר הזה, ומופיעים באזור האישי.', en: 'Tap the heart on a tool card to save it. Favorites are stored only in your browser, on this device, and appear in your area.' } },
  { keys: ['מחיר', 'מחירים', 'עולה', 'price', 'prices', 'cost', 'pricing'],
    a: { he: 'אנחנו לא מציגים מחירים מדויקים, כי הם משתנים לעיתים קרובות. במקום זה מוצג מודל התמחור, עם קישור לעמוד התמחור הרשמי ותאריך הבדיקה.', en: "We don't show exact prices because they change often. Instead we show the pricing model, with a link to the official pricing page and the date we checked it." } },
  { keys: ['שותפים', 'עמלה', 'ממומן', 'affiliate', 'commission', 'sponsored'],
    a: { he: 'כרגע אין באתר קישורי שותפים או תוכן ממומן. אם יתווספו, הם יסומנו בבירור. הפרטים בעמוד הגילוי הנאות.', en: 'There are no affiliate links or sponsored content right now. If any are added, they will be clearly marked. See the disclosure page.' } },
  { keys: ['פרטיות', 'מידע אישי', 'עוגיות', 'privacy', 'cookies', 'data', 'personal'],
    a: { he: 'האתר לא משתמש בעוגיות מעקב או באנליטיקה, ואין בו חשבונות. השיחה הזו לא נשמרת ולא נשלחת. הפרטים במדיניות הפרטיות.', en: 'The site uses no tracking cookies or analytics, and has no accounts. This conversation is not saved or sent. See the privacy policy.' } },
  { keys: ['שפה', 'אנגלית', 'עברית', 'language', 'hebrew', 'english'],
    a: { he: 'אפשר לעבור בין עברית לאנגלית דרך הכפתור בראש העמוד או בתחתיתו. תגיעו לאותו עמוד בשפה השנייה.', en: 'Switch between Hebrew and English with the button at the top or bottom of the page. You land on the same page in the other language.' } },
  { keys: ['כהה', 'בהיר', 'צבע', 'dark', 'light', 'theme'],
    a: { he: 'כפתור ערכת הצבעים בראש העמוד עובר בין שלושה מצבים: לפי הגדרות המערכת, בהיר וכהה.', en: 'The color theme button at the top switches between system setting, light and dark.' } },
  { keys: ['נגישות', 'accessibility', 'screen reader'],
    a: { he: 'האתר נבנה לפי הנחיות WCAG 2.1 ברמה AA. הפרטים בהצהרת הנגישות.', en: 'The site is built to WCAG 2.1 AA. See the accessibility statement.' } }
];
