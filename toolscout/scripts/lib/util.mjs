// Shared helpers for the ToolScout static generator.

export const esc = (s) => String(s ?? '')
  .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;').replace(/'/g, '&#39;');

export const LANGS = ['he', 'en'];
export const other = (lang) => (lang === 'he' ? 'en' : 'he');
export const dirOf = (lang) => (lang === 'he' ? 'rtl' : 'ltr');

// A page context knows where it lives so it can build relative links.
// `path` is relative to the language root, e.g. "tools/claude.html".
export function ctx(lang, path) {
  const depthInLang = path.split('/').length - 1;
  const toLangRoot = '../'.repeat(depthInLang);
  const toSiteRoot = '../'.repeat(depthInLang + (lang === 'en' ? 1 : 0));
  return {
    lang, path,
    o: other(lang),
    // link to another page in the same language
    u: (p) => toLangRoot + (p === 'index.html' ? '' : p) || './',
    // link to a shared asset under /toolscout/
    a: (p) => toSiteRoot + p,
    // same page in the other language
    alt: () => toSiteRoot + (lang === 'he' ? 'en/' : '') + (path === 'index.html' ? '' : path),
    // file path on disk relative to /toolscout/
    file: (lang === 'en' ? 'en/' : '') + path
  };
}

export const absUrl = (siteUrl, lang, path) =>
  `${siteUrl}/${lang === 'en' ? 'en/' : ''}${path === 'index.html' ? '' : path}`;

export function fmtDate(iso, lang) {
  return new Date(iso + 'T00:00:00Z').toLocaleDateString(lang === 'he' ? 'he-IL' : 'en-GB',
    { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });
}

export function monogram(name, override) {
  if (override) return override;
  const words = name.replace(/[^A-Za-z0-9 ]/g, ' ').trim().split(/\s+/);
  return (words.length > 1 ? words[0][0] + words[1][0] : name.slice(0, 2)).toUpperCase();
}

export const t = (obj, lang) => (obj && typeof obj === 'object' && lang in obj ? obj[lang] : obj);
