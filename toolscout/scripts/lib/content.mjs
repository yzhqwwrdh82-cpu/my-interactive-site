// Editorial content: guides, comparison presets, legal pages and chat help answers.
// Facts about tools must come from data/tools.json — guides only reference them.

export const comparePresets = [
  { slug: 'ai-assistants', ids: ['chatgpt', 'claude', 'gemini'],
    title: { he: 'ChatGPT מול Claude מול Gemini', en: 'ChatGPT vs Claude vs Gemini' },
    lead: { he: 'שלושה עוזרי AI כלליים, כולם עם תוכנית חינמית ותוכניות בתשלום.', en: 'Three general AI assistants, each with a free plan and paid tiers.' } },
  { slug: 'video-editing', ids: ['descript', 'davinci-resolve', 'runway'],
    title: { he: 'עריכת וידאו: Descript, ‏DaVinci Resolve ו-Runway', en: 'Video editing: Descript, DaVinci Resolve and Runway' },
    lead: { he: 'שלוש גישות: עריכה דרך תמלול, תוכנת עריכה מקצועית ויצירת וידאו ב-AI.', en: 'Three approaches: transcript-based editing, a professional editor and AI video generation.' } },
  { slug: 'notes', ids: ['notion', 'obsidian', 'otter'],
    title: { he: 'פתקים וידע: Notion, ‏Obsidian ו-Otter.ai', en: 'Notes and knowledge: Notion, Obsidian and Otter.ai' },
    lead: { he: 'סביבת עבודה משותפת, פתקים בקבצים מקומיים ותמלול פגישות.', en: 'A shared workspace, local-file notes and meeting transcription.' } }
];

export const guides = [
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
        ['p', 'המדיניות הזו מתארת איזה מידע ToolScout אוסף ואיך הוא משמש. היא משקפת את האתר כפי שהוא עכשיו.'],
        ['h2', 'מה אנחנו לא אוספים'],
        ['p', 'אין באתר חשבונות משתמש, עוגיות מעקב, כלי אנליטיקה או פרסומות. טופס יצירת הקשר וההרשמה לעדכונים נמצאים במצב הדגמה: הם לא שולחים ולא שומרים את מה שמקלידים בהם.'],
        ['h2', 'מה נשמר בדפדפן שלכם'],
        ['p', 'כדי לזכור את ההעדפות שלכם, האתר שומר בדפדפן (localStorage) את ערכת הצבעים, את המועדפים ואת הכלים שבחרתם להשוואה. המידע הזה נשאר במכשיר שלכם ולא נשלח אלינו. אפשר למחוק אותו בכל עת דרך הגדרות הדפדפן או דרך האזור האישי.'],
        ['h2', 'עוזר האתר'],
        ['p', 'עוזר החיפוש באתר פועל כולו בדפדפן. השאלות שאתם כותבים בו לא נשלחות לשרת ולא נשמרות.'],
        ['h2', 'אחסון ואבטחה'],
        ['p', 'האתר מאוחסן ב-Netlify. כמו כל שרת אינטרנט, ספק האחסון עשוי לרשום נתונים טכניים כמו כתובת IP וזמן הגישה, לצורכי אבטחה ותפעול. הגופנים מאוחסנים באתר עצמו, ולא נטענים משירותים חיצוניים.'],
        ['h2', 'קישורים חיצוניים'],
        ['p', 'קישורים לאתרי הכלים מובילים לאתרים של צד שלישי, שחלות עליהם מדיניות הפרטיות שלהם.'],
        ['h2', 'שינויים'],
        ['p', 'אם נחבר בעתיד שירותים שאוספים מידע, כמו דיוור, תמיכה או צ\'אט עם נציג, נעדכן את המדיניות לפני ההפעלה ונבקש הסכמה כשנדרש.']
      ],
      en: [
        ['p', 'This policy describes what information ToolScout collects and how it is used. It reflects the site as it is now.'],
        ['h2', "What we don't collect"],
        ['p', 'The site has no user accounts, tracking cookies, analytics or ads. The contact form and the updates sign-up are in demo mode: they do not send or store anything you type.'],
        ['h2', 'What is stored in your browser'],
        ['p', 'To remember your preferences, the site stores your color theme, favorites and comparison picks in your browser (localStorage). This stays on your device and is never sent to us. You can delete it at any time in your browser settings or from your area on the site.'],
        ['h2', 'Site helper'],
        ['p', 'The search helper runs entirely in your browser. What you type into it is not sent to a server or stored.'],
        ['h2', 'Hosting and security'],
        ['p', 'The site is hosted on Netlify. Like any web server, the host may log technical data such as IP address and access time for security and operations. Fonts are served from the site itself, not loaded from external services.'],
        ['h2', 'External links'],
        ['p', "Links to tool websites lead to third-party sites, which have their own privacy policies."],
        ['h2', 'Changes'],
        ['p', "If we connect services that collect information in the future, such as email updates, support or live chat, we'll update this policy before launch and ask for consent where required."]
      ]
    }
  },
  terms: {
    title: { he: 'תנאי שימוש', en: 'Terms of use' },
    updated: '2026-10-19',
    body: {
      he: [
        ['h2', 'מטרת האתר'],
        ['p', 'ToolScout הוא קטלוג מידע. הוא עוזר להכיר כלים ולהשוות ביניהם, אבל הוא לא מוכר מוצרים ולא מספק שירות של הכלים עצמם.'],
        ['h2', 'דיוק המידע'],
        ['p', 'אנחנו בודקים את המידע מול האתרים הרשמיים ומציינים את תאריך הבדיקה. תוכניות, מחירים ותכונות משתנים, ולכן המידע מסופק כמו שהוא. לפני רכישה או התחייבות, בדקו את התנאים העדכניים באתר הרשמי של הכלי.'],
        ['h2', 'סימנים מסחריים'],
        ['p', 'שמות המוצרים והלוגואים שייכים לבעליהם, ומשמשים רק לזיהוי המוצרים. השימוש בהם לא מעיד על שותפות, חסות או המלצה מצד בעליהם.'],
        ['h2', 'קישורים לאתרים אחרים'],
        ['p', 'אנחנו לא אחראים לתוכן, לתנאים או לפרטיות באתרים חיצוניים.'],
        ['h2', 'קישורי שותפים בעתיד'],
        ['p', 'כרגע אין באתר קישורי שותפים. אם יתווספו כאלה, הם יסומנו בבירור, כמתואר בעמוד הגילוי הנאות.'],
        ['h2', 'זכויות בתוכן'],
        ['p', 'התיאורים, המדריכים והעיצוב באתר הם תוכן מקורי של ToolScout.']
      ],
      en: [
        ['h2', 'What the site is'],
        ['p', 'ToolScout is an information catalog. It helps you discover and compare tools, but it does not sell products or provide the tools themselves.'],
        ['h2', 'Accuracy'],
        ['p', 'We check information against official sites and show the date of each check. Plans, prices and features change, so information is provided as is. Before buying or committing, check the current terms on the tool\'s official site.'],
        ['h2', 'Trademarks'],
        ['p', 'Product names and logos belong to their owners and are used only to identify the products. Their use does not imply any partnership, sponsorship or endorsement by their owners.'],
        ['h2', 'Links to other sites'],
        ['p', 'We are not responsible for the content, terms or privacy practices of external sites.'],
        ['h2', 'Future affiliate links'],
        ['p', 'The site has no affiliate links right now. If any are added, they will be clearly marked, as described on the disclosure page.'],
        ['h2', 'Content rights'],
        ['p', "The descriptions, guides and design on this site are ToolScout's original content."]
      ]
    }
  },
  accessibility: {
    title: { he: 'הצהרת נגישות', en: 'Accessibility statement' },
    updated: '2026-10-19',
    body: {
      he: [
        ['p', 'אנחנו רוצים ש-ToolScout יהיה נוח לשימוש לכל אחד. האתר נבנה בהתאם להנחיות WCAG 2.1 ברמה AA, שעליהן מבוסס התקן הישראלי ת"י 5568.'],
        ['h2', 'מה עשינו'],
        ['p', 'האתר כולל ניווט מלא במקלדת עם סימון פוקוס ברור, קישור לדילוג לתוכן ומבנה כותרות מסודר. הוא תומך בעברית מימין לשמאל ובאנגלית משמאל לימין, ושומר על ניגודיות צבעים מספקת במצב בהיר ובמצב כהה. האתר מכבד את הגדרת "הפחתת תנועה" במערכת ההפעלה, וכל התוכן זמין גם בלי JavaScript. בדקנו את העמודים בכלי הבדיקה האוטומטי axe-core.'],
        ['h2', 'מגבלות ידועות'],
        ['p', 'האתרים החיצוניים שאליהם אנחנו מקשרים לא נמצאים באחריותנו, ורמת הנגישות שלהם עשויה להיות שונה. בדיקה ידנית עם קוראי מסך עדיין לא בוצעה, והיא מתוכננת לפני הפרסום.'],
        ['h2', 'פנייה בנושא נגישות'],
        ['p', 'פרטי רכז/ת הנגישות יפורסמו כאן לפני עליית האתר לאוויר. עד אז אפשר לבחור בנושא "נגישות" בעמוד יצירת הקשר. שימו לב שהעמוד עדיין במצב הדגמה.']
      ],
      en: [
        ['p', 'We want ToolScout to be easy for everyone to use. The site is built to follow WCAG 2.1 level AA, the basis of the Israeli standard IS 5568.'],
        ['h2', 'What we did'],
        ['p', 'The site has full keyboard navigation with a visible focus indicator, a skip-to-content link and a clear heading structure. It supports right-to-left Hebrew and left-to-right English, and keeps sufficient color contrast in both light and dark themes. It respects the "reduce motion" system setting, and all content is available without JavaScript. We tested the pages with the automated checker axe-core.'],
        ['h2', 'Known limitations'],
        ['p', 'External sites we link to are not under our control, and their accessibility may differ. Manual testing with screen readers has not been done yet and is planned before launch.'],
        ['h2', 'Accessibility contact'],
        ['p', 'Contact details for the accessibility coordinator will be published here before the site goes live. Until then, you can choose the "Accessibility" topic on the contact page. Note that it is still in demo mode.']
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
        ['p', 'כרגע אין באתר קישורי שותפים, פרסומות או תוכן ממומן. כל הקישורים מובילים ישירות לאתרים הרשמיים של הכלים.'],
        ['h2', 'בעתיד'],
        ['p', 'ייתכן שחלק מהקישורים יהיו קישורי שותפים. אם תרכשו דרכם, ייתכן שנקבל עמלה, בלי עלות נוספת עבורכם. קישורים כאלה יסומנו בבירור בכרטיס הכלי בתווית "קישור שותפים". תוכן ממומן, אם יהיה, יסומן כ"ממומן".'],
        ['h2', 'עצמאות עריכתית'],
        ['p', 'עמלות או חסויות לא קובעות אילו כלים נכנסים לקטלוג, איך הם מתוארים או אילו כלים נבחרים ל"בחירת העורכים".']
      ],
      en: [
        ['p', 'ToolScout is an independent catalog. Our goal is to help you find the right tool, with information checked against the official sites.'],
        ['h2', 'Today'],
        ['p', 'The site has no affiliate links, ads or sponsored content right now. Every link goes directly to the tool\'s official site.'],
        ['h2', 'In the future'],
        ['p', 'Some links may become affiliate links. If you buy through one, we may earn a commission at no extra cost to you. Those links will be clearly marked on the tool card with an "Affiliate link" label. Sponsored content, if any, will be labeled "Sponsored".'],
        ['h2', 'Editorial independence'],
        ['p', "Commissions or sponsorships do not decide which tools are listed, how they are described, or which tools are chosen as editors' picks."]
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
