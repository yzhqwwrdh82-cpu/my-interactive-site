# תוכניות שותפים: מחקר בלבד

**נבדק:** 19 באוקטובר 2026 מול העמודים הרשמיים. **לא בוצעה שום הרשמה.** תנאים משתנים, ולכן צריך לבדוק שוב לפני הגשה. אין כאן הבטחה להכנסה.

הסטטוס של כל התוכניות בקוד הוא `affiliate.status: "none"`. ההרשמה ועדכון הסטטוס דורשים אישור מפורש שלך.

| תוכנית | האם פתוחה | עמלה, כפי שמופיעה בעמוד הרשמי | פלטפורמה ותשלום | תנאים בולטים | מקור |
|---|---|---|---|---|---|
| **Make** | פתוחה. לכל בעל חשבון | 35% מתשלומי מנוי למשך 12 חודשים. ⚠️ בשאלות הנפוצות בעמוד כתוב 24 חודשים, אז צריך לברר | Wise בלבד | 3 משלמים לפחות ו-100$ מינימום לתשלום. חלון של 30 יום להרשמה אחרי לחיצה | [make.com/affiliate](https://www.make.com/affiliate) |
| **ElevenLabs** | פתוחה. הרשמה דרך האפליקציה | עד 22% מהתשלומים ב-12 החודשים הראשונים | PartnerStack | "מנוי מזכה" לא מוגדר בעמוד | [elevenlabs.io/affiliates](https://elevenlabs.io/affiliates) |
| **Descript** | פתוחה, בתהליך מעבר ל-PartnerStack | 25$ לכל מנוי חדש | PayPal חודשי (לפני המעבר) | אישור תוך כשבוע. שותפים קיימים צריכים להירשם מחדש | [descript.com/affiliate](https://www.descript.com/affiliate) |
| **Synthesia** | פתוחה | 25% מהתשלום נטו על תוכניות Starter ו-Creator | מעקב ב-Rewardful | עוגייה ל-60 יום, ובלי הפניה עצמית | [synthesia.io/partners/affiliates](https://www.synthesia.io/partners/affiliates) |
| **Notion** | **סגורה** למצטרפים חדשים | עד 50$ לכל הרשמה מופעלת, ועוד 20% מהכנסות השנה הראשונה | PartnerStack | Last-click, שדרוג בתוך 180 יום, ואפשרות לקיזוז בהחזר כספי. דורשת גילוי לפי FTC | [notion.com/affiliates](https://www.notion.com/affiliates) |
| **Canva** | **סגורה** (תוכנית Canvassador) | לא מופיעה | — | רק ליוצרי הדרכות שהתקבלו | [Canva Help](https://www.canva.com/en_in/help/canva-affiliate-marketing-program/) |
| **HeyGen** | יש עמוד תוכנית (בגרמנית). לא נבדק לעומק | — | — | לבדוק | [heygen.com/de-de/affiliate-program](https://www.heygen.com/de-de/affiliate-program) |
| **1Password** | פתוחה, דרך Commission Junction (CJ) | "$2 לכל הרשמה שהושלמה ו-25% מהתשלום הראשון, שנתי או חודשי (מינימום $2)" | CJ | מיועדת למפרסמים ולמשפיענים בתחומי טכנולוגיה, אבטחה ופרודוקטיביות. משך העוגייה לא מצוין | [1password.com/affiliate](https://1password.com/affiliate) |
| **ClickUp** | פתוחה, בלי תנאי סף בעמוד | "עד $25 לכל הפניה לסביבת עבודה חינמית חדשה" (זו תקרה, לא סכום קבוע) | PartnerStack | עוגייה ל-30 יום | [clickup.com/partners/affiliates](https://clickup.com/partners/affiliates) |
| **Bitwarden, ‏monday.com, ‏Proton** | לא אומת: העמודים לא נטענו בבדיקה | — | — | לבדוק שוב | — |
| **Amazon Associates** (ספרים) | יש תוכנית. לא בדקתי זמינות למגישים מישראל | — | — | מחירים, זמינות, ביקורות ודירוגים מותר להציג **רק** דרך ה-API הרשמי (Creators API או PA API). התוכן חייב להיות מקורי, ונדרש גילוי לפי הדין | [Participation Requirements](https://affiliate-program.amazon.com/help/operating/participation/) |

## לפני הגשה
1. לקרוא את תנאי התוכנית המלאים. רוב התוכניות דורשות אתר פעיל עם תוכן.
2. לוודא שהתווית "קישור בתשלום" מופיעה ליד הקישור. זה כבר ממומש בקוד.
3. לעדכן את עמוד הגילוי הנאות ואת מדיניות הפרטיות, אם התוכנית משתמשת בעוגיות מעקב.
4. להתייעץ עם רואה חשבון לגבי דיווח על ההכנסה.

## מוצרים דיגיטליים, ספרים וקורסים בעתיד

איך להוסיף אותם בלי להמציא נתונים. המבנה כבר קיים ב-`data/products.json`, והבדיקה האוטומטית אוכפת אותו:
- **ספרים:** רק אחרי אימות מול עמוד ההוצאה (שדה `officialUrl`).
  - מחיר: רק עם `price.sourceUrl` ו-`checkedAt`.
  - כריכה: רק עם `cover.license` ו-`permissionSource`.
  - קישור שותפים: רק עם `affiliate.status: "approved"`.
- **קורסים:** `type: "course"`, עם `provider` ומשך הקורס, רק אם הם מפורסמים. תעודה רק אם היא קיימת. אין דירוגים.
- **מוצרים דיגיטליים מקוריים של ToolScout:** `availability: "not-for-sale"`, עד שיהיו ספק תשלום, תנאי מכירה ומדיניות ביטול. ראו את רשימת הדרישות ב-`legal-audit.md`, סעיף 3.
