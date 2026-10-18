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
import { homePage, catalogPage, toolPage, categoryPage, comparePage, comparePresetPage, guidesIndex, guidePage, legalPage, contactPage, accountPage } from './lib/pages.mjs';
import { previewPage } from './lib/preview.mjs';
import { booksPage } from './lib/books.mjs';
import { emailHtml, EMAILS } from './lib/emails.mjs';
import { guides, comparePresets, legal, chatHelp } from './lib/content.mjs';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
execFileSync(process.execPath, [join(root, 'scripts/validate.mjs')], { stdio: 'inherit' });

const data = JSON.parse(readFileSync(join(root, 'data/tools.json'), 'utf8'));
const products = JSON.parse(readFileSync(join(root, 'data/products.json'), 'utf8'));
const siteCfg = JSON.parse(readFileSync(join(root, 'data/site.json'), 'utf8'));
const hash = createHash('sha1');
for (const f of ['assets/styles.css', 'assets/app.js', 'assets/theme-init.js']) hash.update(readFileSync(join(root, f)));
const site = {
  siteUrl: (process.env.SITE_URL || siteCfg.siteUrl).replace(/\/$/, ''),
  updated: data.tools.reduce((m, x) => (x.checkedAt > m ? x.checkedAt : m), '0000-00-00'),
  version: hash.digest('hex').slice(0, 8)
};

// Clean generated output (only generated folders/files, never data or assets).
for (const d of ['en', 'tools', 'category', 'compare', 'guides', 'emails']) rmSync(join(root, d), { recursive: true, force: true });

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
  out(ctx(L, 'index.html'), homePage(ctx(L, 'index.html'), data, site));
  out(ctx(L, 'catalog.html'), catalogPage(ctx(L, 'catalog.html'), data, site));
  out(ctx(L, 'compare.html'), comparePage(ctx(L, 'compare.html'), data, site));
  for (const p of comparePresets) { const c = ctx(L, `compare/${p.slug}.html`); out(c, comparePresetPage(c, data, site, p)); }
  for (const t of data.tools) { const c = ctx(L, `tools/${t.id}.html`); out(c, toolPage(c, data, site, t)); }
  for (const k of data.categories) { const c = ctx(L, `category/${k.id}.html`); out(c, categoryPage(c, data, site, k)); }
  out(ctx(L, 'books.html'), booksPage(ctx(L, 'books.html'), data, site, products));
  out(ctx(L, 'guides/index.html'), guidesIndex(ctx(L, 'guides/index.html'), data, site));
  for (const g of guides) { const c = ctx(L, `guides/${g.slug}.html`); out(c, guidePage(c, data, site, g)); }
  for (const key of Object.keys(legal)) { const c = ctx(L, `${key}.html`); out(c, legalPage(c, data, site, key)); }
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
  uses: data.uses.map((u) => ({ id: u.id, he: u.he, en: u.en })),
  platforms: data.platforms.map((p) => ({ id: p.id, he: p.he, en: p.en })),
  tools: data.tools.map((t) => ({
    id: t.id, name: t.name, maker: t.maker, category: t.category, pricing: t.pricing, uses: t.uses,
    platforms: t.platforms, openSource: t.openSource, url: t.url, pricingUrl: t.pricingUrl,
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
// Note: crawlers only read robots.txt at the domain root. This file documents the intended rules
// and should be copied to the site root when ToolScout moves there.
writeFileSync(join(root, 'robots.txt'), `User-agent: *
Disallow: /toolscout/account.html
Disallow: /toolscout/en/account.html
Disallow: /toolscout/service-preview.html
Disallow: /toolscout/en/service-preview.html
Disallow: /toolscout/emails/

Sitemap: ${site.siteUrl}/sitemap.xml
`);

if (existsSync(join(root, 'disclosure.html')) && !written.includes('disclosure.html')) console.warn('stale disclosure.html');
console.log(`built ${written.length} files (${indexable.length * 2} indexable pages) · version ${site.version} · siteUrl ${site.siteUrl}`);
