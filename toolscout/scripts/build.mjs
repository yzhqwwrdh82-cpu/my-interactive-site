// ToolScout static site generator — zero dependencies (Node 18+).
// Usage: node toolscout/scripts/build.mjs
// Reads data/*.json, writes pre-rendered HTML for both languages, emails,
// assets/catalog.json (client data), sitemap.xml and robots.txt.
import { readFileSync, writeFileSync, mkdirSync, rmSync, existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createHash } from 'node:crypto';
import { execFileSync } from 'node:child_process';
import { LANGS, ctx, absUrl } from './lib/util.mjs';
import { setSite } from './lib/layout.mjs';
import { methodPage } from './lib/method.mjs';
import { setFeatures, isSponsored, homePage, catalogPage, toolPage, categoryPage, comparePage, comparePresetPage, guidesIndex, guidePage, legalPage, contactPage, accountPage } from './lib/pages.mjs';
import { previewPage } from './lib/preview.mjs';
import { booksPage } from './lib/books.mjs';
import { notFoundPage, aboutPage, partnersPage, editorialPage } from './lib/extra.mjs';
import { emailHtml, EMAILS } from './lib/emails.mjs';
import { ideasPage, authorsOf, authorPage, topicPage, TOPICS, bookPage, coursesPage, coursePage, pathsIndex, pathPage, listPage, searchPage, searchIndex } from './lib/knowledge.mjs';
import { guides, comparePresets, legal, chatHelp } from './lib/content.mjs';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
execFileSync(process.execPath, [join(root, 'scripts/validate.mjs')], { stdio: 'inherit' });

const data = JSON.parse(readFileSync(join(root, 'data/tools.json'), 'utf8'));
const products = JSON.parse(readFileSync(join(root, 'data/products.json'), 'utf8'));
const siteCfg = JSON.parse(readFileSync(join(root, 'data/site.json'), 'utf8'));
const paths = JSON.parse(readFileSync(join(root, 'data/paths.json'), 'utf8'));
const hash = createHash('sha1');
for (const f of ['assets/styles.css', 'assets/app.js', 'assets/theme-init.js', 'assets/consent.js', 'assets/search.js']) hash.update(readFileSync(join(root, f)));
const site = {
  siteUrl: (process.env.SITE_URL || siteCfg.siteUrl).replace(/\/$/, ''),
  updated: data.tools.reduce((m, x) => (x.checkedAt > m ? x.checkedAt : m), '0000-00-00'),
  version: hash.digest('hex').slice(0, 8),
  features: siteCfg.features || {},
  google: siteCfg.google || {},
  owner: siteCfg.owner || {}
};
site.analyticsOn = !!(site.features.analytics && site.google.ga4MeasurementId);

setSite(site);
setFeatures(site.features);

// Clean generated output (only generated folders/files, never data or assets).
for (const d of ['en', 'tools', 'category', 'compare', 'guides', 'emails', 'books', 'courses', 'paths', 'lists', 'community', 'authors']) rmSync(join(root, d), { recursive: true, force: true });

const written = [];
const indexable = [];
function out(c, html, { index = true } = {}) {
  const p = join(root, c.file);
  mkdirSync(dirname(p), { recursive: true });
  writeFileSync(p, html);
  written.push(c.file);
  if (index && c.lang === 'he') indexable.push(c.path);
}

for (const L of LANGS) {
  out(ctx(L, 'index.html'), homePage(ctx(L, 'index.html'), data, site, products, paths));
  out(ctx(L, 'catalog.html'), catalogPage(ctx(L, 'catalog.html'), data, site));
  out(ctx(L, 'compare.html'), comparePage(ctx(L, 'compare.html'), data, site));
  for (const p of comparePresets) { const c = ctx(L, `compare/${p.slug}.html`); out(c, comparePresetPage(c, data, site, p)); }
  for (const t of data.tools) { const c = ctx(L, `tools/${t.id}.html`); out(c, toolPage(c, data, site, t)); }
  for (const k of data.categories) { const c = ctx(L, `category/${k.id}.html`); out(c, categoryPage(c, data, site, k)); }
  out(ctx(L, 'about.html'), aboutPage(ctx(L, 'about.html'), data, site, products));
  out(ctx(L, 'ideas.html'), ideasPage(ctx(L, 'ideas.html'), data, site, products));
  out(ctx(L, 'editorial.html'), editorialPage(ctx(L, 'editorial.html'), data, site));
  out(ctx(L, 'partners.html'), partnersPage(ctx(L, 'partners.html'), data, site));
  out(ctx(L, 'books.html'), booksPage(ctx(L, 'books.html'), data, site, products));
  for (const b of products.items.filter((x) => x.type === 'book')) { const c = ctx(L, `books/${b.id}.html`); out(c, bookPage(c, data, site, products, paths, b)); }
  for (const au of authorsOf(products)) { const c = ctx(L, `authors/${au.slug}.html`); out(c, authorPage(c, data, site, products, au)); }
  for (const tp of TOPICS) { const c = ctx(L, `books/topic-${tp.id}.html`); out(c, topicPage(c, data, site, products, paths, tp)); }
  out(ctx(L, 'courses.html'), coursesPage(ctx(L, 'courses.html'), data, site, products));
  for (const co of products.items.filter((x) => x.type === 'course')) { const c = ctx(L, `courses/${co.id}.html`); out(c, coursePage(c, data, site, products, paths, co)); }
  out(ctx(L, 'paths/index.html'), pathsIndex(ctx(L, 'paths/index.html'), data, site, products, paths));
  for (const p of paths.paths) { const c = ctx(L, `paths/${p.id}.html`); out(c, pathPage(c, data, site, products, paths, p)); }
  for (const col of products.collections) { const c = ctx(L, `lists/${col.id}.html`); out(c, listPage(c, data, site, products, col)); }
  out(ctx(L, 'search.html'), searchPage(ctx(L, 'search.html'), data, site), { index: false });
  writeFileSync(join(root, `assets/search-${L}.json`), JSON.stringify(searchIndex(L, data, products, paths)));
  out(ctx(L, 'guides/index.html'), guidesIndex(ctx(L, 'guides/index.html'), data, site));
  for (const g of guides) { const c = ctx(L, `guides/${g.slug}.html`); out(c, guidePage(c, data, site, g)); }
  for (const key of Object.keys(legal)) { const c = ctx(L, `${key}.html`); out(c, legalPage(c, data, site, key)); }
  out(ctx(L, 'how-we-verify.html'), methodPage(ctx(L, 'how-we-verify.html'), data, site, products));
  out(ctx(L, 'contact.html'), contactPage(ctx(L, 'contact.html'), data, site));
  out(ctx(L, 'account.html'), accountPage(ctx(L, 'account.html'), data, site), { index: false });
  out(ctx(L, 'service-preview.html'), previewPage(ctx(L, 'service-preview.html'), data, site), { index: false });
  for (const name of Object.keys(EMAILS)) {
    const p = join(root, 'emails', L, name + '.html');
    mkdirSync(dirname(p), { recursive: true });
    writeFileSync(p, emailHtml(name, L));
    written.push(`emails/${L}/${name}.html`);
  }
}

// Client data for chat, compare and favorites (compact, both languages).
const pick = (o) => ({ he: o.he, en: o.en });
const catalog = {
  updated: site.updated,
  categories: data.categories.map((k) => ({ id: k.id, he: k.he, en: k.en })),
  pricing: data.pricing.map((p) => ({ id: p.id, he: p.he, en: p.en })),
  uses: data.uses.map((u) => ({ id: u.id, he: u.he, en: u.en, syn: u.syn || null })),
  platforms: data.platforms.map((p) => ({ id: p.id, he: p.he, en: p.en })),
  tools: data.tools.map((t) => ({
    id: t.id, name: t.name, maker: t.maker, category: t.category, pricing: t.pricing, uses: t.uses,
    platforms: t.platforms, openSource: t.openSource, pricingUrl: t.pricingUrl,
    url: (t.affiliate && t.affiliate.status === 'approved' && t.affiliate.url) ? t.affiliate.url : t.url,
    paidLink: !!(t.affiliate && t.affiliate.status === 'approved' && t.affiliate.url),
    sponsored: isSponsored(t),
    logo: t.logo ? t.logo.slug : null, monogram: t.monogram || null, checkedAt: t.checkedAt, addedAt: t.addedAt,
    description: pick(t.description), audience: t.audience,
    pros: t.pros.map(pick), cons: t.cons.map(pick), verification: { pricing: t.verification.pricing, platforms: t.verification.platforms }
  })),
  help: chatHelp,
  products: products.items
};
writeFileSync(join(root, 'assets/catalog.json'), JSON.stringify(catalog));

// Sitemap with hreflang alternates.
const urls = indexable.map((p) => `  <url>
    <loc>${absUrl(site.siteUrl, 'he', p)}</loc>
    <xhtml:link rel="alternate" hreflang="he" href="${absUrl(site.siteUrl, 'he', p)}"/>
    <xhtml:link rel="alternate" hreflang="en" href="${absUrl(site.siteUrl, 'en', p)}"/>
    <lastmod>${site.updated}</lastmod>
  </url>
  <url>
    <loc>${absUrl(site.siteUrl, 'en', p)}</loc>
    <xhtml:link rel="alternate" hreflang="he" href="${absUrl(site.siteUrl, 'he', p)}"/>
    <xhtml:link rel="alternate" hreflang="en" href="${absUrl(site.siteUrl, 'en', p)}"/>
    <lastmod>${site.updated}</lastmod>
  </url>`).join('\n');
writeFileSync(join(root, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls}
</urlset>
`);
// ---------- Root deploy files (repo root = Netlify publish directory) ----------
// robots.txt only works at the host root. These files take effect in production only after merge;
// Netlify also applies _headers/_redirects to Deploy Previews, so they can be tested there first.
const repoRoot = join(root, '..');
const basePath = new URL(site.siteUrl).pathname.replace(/\/$/, '');   // e.g. "/toolscout"
rmSync(join(root, 'robots.txt'), { force: true });
writeFileSync(join(repoRoot, 'robots.txt'), `# Generated by toolscout/scripts/build.mjs
User-agent: *
Disallow: ${basePath}/account.html
Disallow: ${basePath}/en/account.html
Disallow: ${basePath}/service-preview.html
Disallow: ${basePath}/en/service-preview.html
Disallow: ${basePath}/emails/

Sitemap: ${site.siteUrl}/sitemap.xml
`);
writeFileSync(join(repoRoot, '_redirects'), `# Generated by toolscout/scripts/build.mjs
# The site lives under ${basePath}/. Send the host root there (forced, because index.html exists at the root).
/            ${basePath}/   301!
/index.html  ${basePath}/   301!
`);
writeFileSync(join(repoRoot, '_headers'), `# Generated by toolscout/scripts/build.mjs — security headers for every response
/*
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin
  X-Frame-Options: SAMEORIGIN
  Permissions-Policy: camera=(), microphone=(), geolocation=(), payment=(), usb=()
  Strict-Transport-Security: max-age=31536000
${basePath}/emails/*
  X-Robots-Tag: noindex
${basePath}/account.html
  X-Robots-Tag: noindex
${basePath}/en/account.html
  X-Robots-Tag: noindex
${basePath}/service-preview.html
  X-Robots-Tag: noindex
${basePath}/en/service-preview.html
  X-Robots-Tag: noindex
`);
writeFileSync(join(repoRoot, '404.html'), notFoundPage(site, basePath));
const pub = site.google.adsensePublisherId;
if (pub) writeFileSync(join(repoRoot, 'ads.txt'), `google.com, ${pub}, DIRECT, f08c47fec0942fa0\n`);
else rmSync(join(repoRoot, 'ads.txt'), { force: true });

if (existsSync(join(root, 'disclosure.html')) && !written.includes('disclosure.html')) console.warn('stale disclosure.html');
console.log(`built ${written.length} files (${indexable.length * 2} indexable pages) · version ${site.version} · siteUrl ${site.siteUrl}`);
