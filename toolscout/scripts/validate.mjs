// Validates data/tools.json against the ToolScout data rules. Exits non-zero on errors.
// Usage: node toolscout/scripts/validate.mjs
import { readFileSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const data = JSON.parse(readFileSync(join(root, 'data/tools.json'), 'utf8'));
const errors = [];
const warn = [];
const ids = new Set();
const set = (arr) => new Set(arr.map((x) => x.id));
const cats = set(data.categories), prices = set(data.pricing), uses = set(data.uses), plats = set(data.platforms);
const isDate = (s) => /^\d{4}-\d{2}-\d{2}$/.test(s || '');
const isHttps = (s) => /^https:\/\/[^\s]+$/.test(s || '');
const bi = (o) => o && typeof o.he === 'string' && o.he.trim() && typeof o.en === 'string' && o.en.trim();

for (const t of data.tools) {
  const at = `tool "${t.id}"`;
  if (!/^[a-z0-9-]+$/.test(t.id)) errors.push(`${at}: id must be kebab-case`);
  if (ids.has(t.id)) errors.push(`${at}: duplicate id`);
  ids.add(t.id);
  for (const k of ['name', 'maker']) if (!t[k]) errors.push(`${at}: missing ${k}`);
  if (!['ai-tool', 'software', 'digital-product', 'physical-product'].includes(t.type)) errors.push(`${at}: bad type`);
  if (!cats.has(t.category)) errors.push(`${at}: unknown category ${t.category}`);
  if (!prices.has(t.pricing)) errors.push(`${at}: unknown pricing ${t.pricing}`);
  if (!Array.isArray(t.uses) || !t.uses.length || t.uses.some((u) => !uses.has(u))) errors.push(`${at}: bad uses`);
  if (t.platforms !== null && (!Array.isArray(t.platforms) || t.platforms.some((p) => !plats.has(p)))) errors.push(`${at}: bad platforms`);
  if (t.platformsUrl && !isHttps(t.platformsUrl)) errors.push(`${at}: platformsUrl must be https`);
  if (!isHttps(t.url) || !isHttps(t.pricingUrl)) errors.push(`${at}: url and pricingUrl must be https`);
  if (!isDate(t.addedAt) || !isDate(t.checkedAt)) errors.push(`${at}: addedAt/checkedAt must be YYYY-MM-DD`);
  if (!bi(t.description)) errors.push(`${at}: description needs he + en`);
  if (!t.audience || !Array.isArray(t.audience.he) || !Array.isArray(t.audience.en)) errors.push(`${at}: audience needs he + en arrays`);
  for (const kind of ['pros', 'cons']) {
    if (!Array.isArray(t[kind])) { errors.push(`${at}: ${kind} must be an array`); continue; }
    t[kind].forEach((f, i) => {
      if (!bi(f)) errors.push(`${at}: ${kind}[${i}] needs he + en`);
      if (!['pricing', 'official'].includes(f.source)) errors.push(`${at}: ${kind}[${i}] needs source pricing|official`);
    });
  }
  const v = t.verification || {};
  if (!['verified', 'unverified'].includes(v.pricing)) errors.push(`${at}: verification.pricing required`);
  if (!['verified', 'unverified'].includes(v.platforms)) errors.push(`${at}: verification.platforms required`);
  if (v.pricing === 'unverified' && t.pricing !== 'unverified') errors.push(`${at}: unverified pricing must use pricing "unverified"`);
  if (v.platforms === 'verified' && !t.platforms) errors.push(`${at}: platforms verified but empty`);
  if (v.platforms === 'unverified' && t.platforms) errors.push(`${at}: platforms listed but not verified`);
  // Affiliate safety: never an affiliate URL unless the program is approved by the owner.
  const a = t.affiliate || {};
  if (!['none', 'applied', 'approved'].includes(a.status)) errors.push(`${at}: affiliate.status must be none|applied|approved`);
  if (a.url && a.status !== 'approved') errors.push(`${at}: affiliate.url only allowed when status is approved`);
  if (a.status === 'approved' && !isHttps(a.url)) errors.push(`${at}: approved affiliate needs https url`);
  // Logos must come from a licensed source and exist on disk.
  if (t.logo) {
    if (t.logo.source !== 'simple-icons') errors.push(`${at}: logo.source must be a licensed source`);
    else if (!existsSync(join(root, 'assets/logos', t.logo.slug + '.svg'))) errors.push(`${at}: logo file missing (run vendor-logos)`);
  }
  // Physical / digital products: price only with a dated, sourced value.
  if ('price' in t && (!t.price || !isDate(t.price.checkedAt) || !isHttps(t.price.sourceUrl))) errors.push(`${at}: price needs value, currency, checkedAt and sourceUrl`);
  if (t.monogram && !/^[A-Z0-9]{1,3}$/.test(t.monogram)) errors.push(`${at}: monogram must be 1-3 uppercase letters`);
  if (!t.pros.length && !t.cons.length) warn.push(`${at}: no verified pros or cons`);
}

const toolIds = new Set(data.tools.map((t) => t.id));
const programs = JSON.parse(readFileSync(join(root, 'data/affiliate-programs.json'), 'utf8'));
const JOIN = ['not-applied', 'applied', 'approved', 'rejected', 'closed', 'not-eligible'];
const approvedPrograms = new Set(programs.programs.filter((x) => x.joinStatus === 'approved').map((x) => x.id));
const siteCfg = JSON.parse(readFileSync(join(root, 'data/site.json'), 'utf8'));
function isbn13ok(v) {
  if (!/^97[89]\d{10}$/.test(v)) return false;
  const sum = [...v.slice(0, 12)].reduce((s, d, i) => s + Number(d) * (i % 2 ? 3 : 1), 0);
  return (10 - (sum % 10)) % 10 === Number(v[12]);
}

// Products (books, physical, digital, courses)
const products = JSON.parse(readFileSync(join(root, 'data/products.json'), 'utf8'));
const pset = (k) => new Set((products[k] || []).map((x) => x.id));
const ptypes = pset('types'), topics = pset('bookTopics'), plangs = pset('languages'), levels = pset('levels'), formats = pset('formats');
for (const it of products.items) {
  const at = `product "${it.id}"`;
  if (!/^[a-z0-9-]+$/.test(it.id || '')) errors.push(`${at}: id must be kebab-case`);
  if (ids.has(it.id)) errors.push(`${at}: duplicate id`); ids.add(it.id);
  if (!ptypes.has(it.type)) errors.push(`${at}: unknown type`);
  if (!it.title) errors.push(`${at}: missing title`);
  if (!isHttps(it.officialUrl)) errors.push(`${at}: officialUrl (publisher/manufacturer page) must be https`);
  if (!isDate(it.checkedAt) || !isDate(it.addedAt)) errors.push(`${at}: checkedAt/addedAt required`);
  if (it.type === 'book') {
    if (!Array.isArray(it.authors) || !it.authors.length) errors.push(`${at}: authors required`);
    if ((it.topics || []).some((x) => !topics.has(x))) errors.push(`${at}: unknown topic`);
    if ((it.languages || []).some((x) => !plangs.has(x))) errors.push(`${at}: unknown language`);
    if (it.level && !levels.has(it.level)) errors.push(`${at}: unknown level`);
    if ((it.formats || []).some((x) => !formats.has(x))) errors.push(`${at}: unknown format`);
  }
  if (it.cover && (!it.cover.file || !it.cover.license || !it.cover.permissionSource)) errors.push(`${at}: cover needs file, license and permissionSource`);
  if (it.price && (typeof it.price.amount !== 'number' || !it.price.currency || !isDate(it.price.checkedAt) || !isHttps(it.price.sourceUrl))) errors.push(`${at}: price needs amount, currency, checkedAt, sourceUrl`);
  if ('stock' in it || 'rating' in it || 'reviews' in it) errors.push(`${at}: stock/rating/reviews are not allowed without a verified data source`);
  const a = it.affiliate || { status: 'none' };
  if (a.url && a.status !== 'approved') errors.push(`${at}: affiliate.url only when approved`);
  if (it.isbn13 && !isbn13ok(it.isbn13)) errors.push(`${at}: isbn13 checksum is invalid`);
  if (it.type === 'book' && !it.isbn13) warn.push(`${at}: book without isbn13`);
  for (const [i, r] of (it.retailers || []).entries()) {
    const rat = `${at}: retailers[${i}]`;
    if (!r.name || !isHttps(r.url)) errors.push(`${rat}: needs name and https url`);
    if (!['publisher', 'store', 'ebook-store', 'audiobook-store', 'library'].includes(r.type)) errors.push(`${rat}: bad type`);
    if (!isDate(r.checkedAt)) errors.push(`${rat}: checkedAt required`);
    const ra = r.affiliate || { status: 'none' };
    if (!['none', 'applied', 'approved'].includes(ra.status)) errors.push(`${rat}: affiliate.status must be none|applied|approved`);
    if (ra.status === 'approved' && (!ra.programId || !approvedPrograms.has(ra.programId))) errors.push(`${rat}: approved affiliate needs a programId whose joinStatus is approved`);
    if ('price' in r) errors.push(`${rat}: store prices are not stored (they change; show only via an official API)`);
  }
}

// Central affiliate programs (data/affiliate-programs.json)
for (const [i, pr] of programs.programs.entries()) {
  const at = `affiliate program "${pr.id || i}"`;
  if (!/^[a-z0-9-]+$/.test(pr.id || '')) errors.push(`${at}: id must be kebab-case`);
  if (!pr.name || !isHttps(pr.programUrl) || !isHttps(pr.source)) errors.push(`${at}: needs name, https programUrl and source`);
  if (!['verified', 'partial', 'unverified'].includes(pr.verification)) errors.push(`${at}: verification must be verified|partial|unverified`);
  if (!JOIN.includes(pr.joinStatus)) errors.push(`${at}: joinStatus must be ${JOIN.join('|')}`);
  if (!isDate(pr.checkedAt)) errors.push(`${at}: checkedAt required`);
  if (!pr.commission || typeof pr.commission.text !== 'string' || typeof pr.commission.verified !== 'boolean') errors.push(`${at}: commission {type, text, verified} required`);
  if (pr.commission && pr.commission.verified && pr.verification === 'unverified') errors.push(`${at}: commission cannot be verified when the program is unverified`);
  if (!pr.disclosureLabel || !pr.disclosureLabel.he || !pr.disclosureLabel.en) errors.push(`${at}: disclosureLabel needs he + en`);
  for (const id of pr.linkedTools || []) if (!toolIds.has(id)) errors.push(`${at}: linked tool "${id}" not in catalog`);
}
for (const t of data.tools) {
  const a = t.affiliate || { status: 'none' };
  if (a.status === 'approved') {
    const pr = programs.programs.find((x) => (x.linkedTools || []).includes(t.id));
    if (!pr || pr.joinStatus !== 'approved') errors.push(`tool "${t.id}": affiliate approved but its program in affiliate-programs.json is not joinStatus "approved"`);
  }
}

// Site config: Google IDs (all optional; nothing loads when null)
const g = siteCfg.google || {}, feat = siteCfg.features || {};
if (g.ga4MeasurementId != null && !/^G-[A-Z0-9]{4,}$/.test(g.ga4MeasurementId)) errors.push('site.json: google.ga4MeasurementId must look like G-XXXXXXX');
if (g.adsensePublisherId != null && !/^pub-\d{16}$/.test(g.adsensePublisherId)) errors.push('site.json: google.adsensePublisherId must look like pub-0000000000000000');
if (g.searchConsoleVerification != null && !/^[A-Za-z0-9_-]{20,100}$/.test(g.searchConsoleVerification)) errors.push('site.json: google.searchConsoleVerification must be the content value of the meta tag only');
if (feat.analytics && !g.ga4MeasurementId) errors.push('site.json: features.analytics is on but google.ga4MeasurementId is missing');
if (feat.ads && !g.adsensePublisherId) errors.push('site.json: features.ads is on but google.adsensePublisherId is missing');
if (feat.affiliateLinks && !programs.programs.some((x) => x.joinStatus === 'approved')) errors.push('site.json: features.affiliateLinks is on but no program is approved');


// Affiliate program categories
const PCATS = ['software-ai', 'software-automation', 'software-business', 'software-design', 'software-security', 'software-marketing', 'hosting', 'domains', 'courses', 'retail-books-hardware'];
for (const pr of programs.programs) if (!PCATS.includes(pr.category)) errors.push(`affiliate program "${pr.id}": category must be one of ${PCATS.join('|')}`);

// Sponsorship on tools: off unless explicitly approved and labeled
for (const t of data.tools) {
  const sp = t.sponsored;
  if (!sp) continue;
  const at = `tool "${t.id}": sponsored`;
  if (!['none', 'active'].includes(sp.status)) errors.push(`${at}.status must be none|active`);
  if (sp.status === 'active') {
    if (!feat.sponsoredContent) errors.push(`${at} is active but site.json features.sponsoredContent is off`);
    if (!sp.sponsor || !isDate(sp.start) || !isDate(sp.end) || sp.end < sp.start) errors.push(`${at} needs sponsor, start and end dates`);
    if (!sp.approvedBy) errors.push(`${at} needs approvedBy (owner approval record)`);
  }
}

// Digital products: never for sale without approval and a real checkout
for (const it of products.items.filter((x) => x.type === 'digital-product')) {
  const at = `product "${it.id}"`;
  if (!['not-for-sale', 'waitlist', 'for-sale'].includes(it.availability)) errors.push(`${at}: availability must be not-for-sale|waitlist|for-sale`);
  if (it.availability === 'for-sale' && (!feat.payments || !isHttps(it.checkoutUrl) || !isHttps(it.termsUrl))) errors.push(`${at}: for-sale needs features.payments, https checkoutUrl and termsUrl`);
  if (it.availability === 'waitlist' && !feat.newsletter) errors.push(`${at}: waitlist needs a connected newsletter (features.newsletter)`);
}

// Monetization channel registry
const money = JSON.parse(readFileSync(join(root, 'data/monetization.json'), 'utf8'));
const CH = ['affiliate', 'ads', 'sponsorship', 'digital-product', 'newsletter', 'subscription', 'leads', 'software', 'licensing', 'partnership'];
const progIds = new Set(programs.programs.map((x) => x.id));
for (const c of money.channels) {
  const at = `monetization "${c.id}"`;
  if (!CH.includes(c.channel)) errors.push(`${at}: unknown channel`);
  if (!['idea', 'prepared', 'active'].includes(c.status)) errors.push(`${at}: status must be idea|prepared|active`);
  if (!['now', 'phase2', 'future'].includes(c.priority)) errors.push(`${at}: priority must be now|phase2|future`);
  if (c.status === 'active') errors.push(`${at}: 'active' must be set by hand only after owner approval (remove this check when approved)`);
  for (const pv of c.providers || []) if (!isHttps(pv.url) || typeof pv.verified !== 'boolean') errors.push(`${at}: provider needs https url and verified flag`);
  for (const id of c.affiliatePrograms || []) if (!progIds.has(id)) errors.push(`${at}: unknown affiliate program ${id}`);
  if (!isDate(c.checkedAt)) errors.push(`${at}: checkedAt required`);
}


// Courses, reading lists and learning paths
for (const it of products.items.filter((x) => x.type === 'course')) {
  const at = `course "${it.id}"`;
  if (!it.provider || !isHttps(it.officialUrl)) errors.push(`${at}: provider and https officialUrl required`);
  if (!it.cost || !['free', 'paid', 'unverified'].includes(it.cost.model) || typeof it.cost.verified !== 'boolean') errors.push(`${at}: cost {model, verified} required`);
  if (it.cost && it.cost.model !== 'unverified' && !it.cost.verified) errors.push(`${at}: cost model must be "unverified" unless verified`);
  if (!bi(it.description)) errors.push(`${at}: description needs he + en`);
}
const productIds = new Set(products.items.map((x) => x.id));
for (const col of products.collections || []) {
  if (!bi(col.title) || !bi(col.description)) errors.push(`list "${col.id}": title and description need he + en`);
  for (const [id, he, en] of col.items) { const b = products.items.find((x) => x.id === id); if (!b || b.type !== 'book') errors.push(`list "${col.id}": "${id}" is not a book in products.json`); if (!he || !en) errors.push(`list "${col.id}": "${id}" needs he + en note`); }
}
const pathsData = JSON.parse(readFileSync(join(root, 'data/paths.json'), 'utf8'));
const { guides: guideList } = await import('./lib/content.mjs');
const guideIds = new Set(guideList.map((g) => g.slug));
for (const p of pathsData.paths) {
  if (!bi(p.title) || !bi(p.audience)) errors.push(`path "${p.id}": title and audience need he + en`);
  for (const [type, id, he, en] of p.steps) {
    const ok = type === 'book' || type === 'course' ? (products.items.find((x) => x.id === id) || {}).type === type : type === 'tool' ? toolIds.has(id) : type === 'guide' ? guideIds.has(id) : false;
    if (!ok) errors.push(`path "${p.id}": step ${type}:${id} does not exist`);
    if (!he || !en) errors.push(`path "${p.id}": step ${id} needs he + en note`);
  }
}

for (const w of warn) console.warn('warn:', w);
if (errors.length) { for (const e of errors) console.error('error:', e); console.error(`\n${errors.length} error(s)`); process.exit(1); }
console.log(`data ok: ${data.tools.length} tools, ${data.categories.length} categories, ${products.items.length} products, ${programs.programs.length} affiliate programs, ${money.channels.length} revenue channels`);
