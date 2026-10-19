// Checks links in the generated site.
//   node toolscout/scripts/check-links.mjs             → internal links/assets (offline)
//   node toolscout/scripts/check-links.mjs --external  → also requests every external URL (run on a normal network)
import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { join, dirname, resolve, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const skip = new Set(['scripts', 'data', 'docs', 'node_modules']);
const files = [];
(function walk(d) {
  for (const f of readdirSync(d)) {
    const p = join(d, f);
    if (statSync(p).isDirectory()) { if (!skip.has(f)) walk(p); }
    else if (f.endsWith('.html')) files.push(p);
  }
})(root);

const broken = [];
const external = new Map();
const attr = /\s(?:href|src)="([^"]+)"/g;
for (const file of files) {
  const html = readFileSync(file, 'utf8');
  for (const m of html.matchAll(attr)) {
    const raw = m[1].replace(/&amp;/g, '&');
    if (/^(mailto:|tel:|#|data:|\{\{)/.test(raw)) continue;
    if (/^https?:\/\//.test(raw)) { if (!raw.includes('{{')) { if (!external.has(raw)) external.set(raw, new Set()); external.get(raw).add(relative(root, file)); } continue; }
    const clean = raw.split(/[?#]/)[0];
    let target = resolve(dirname(file), clean || '.');
    if (clean === '' || clean.endsWith('/')) target = join(target, 'index.html');
    else if (existsSync(target) && statSync(target).isDirectory()) target = join(target, 'index.html');
    if (!existsSync(target)) broken.push(`${relative(root, file)} → ${raw}`);
  }
}

console.log(`checked ${files.length} pages, ${external.size} unique external URLs`);
if (broken.length) { console.error(`\n${broken.length} broken internal link(s):`); broken.slice(0, 50).forEach((b) => console.error('  ' + b)); }

if (process.argv.includes('--external')) {
  const bad = [];
  for (const [url, from] of external) {
    if (url.includes('netlify.app/toolscout')) continue; // own production URL (canonical); checked after launch
    try {
      let r = await fetch(url, { method: 'HEAD', redirect: 'follow' });
      if (r.status === 405 || r.status === 403) r = await fetch(url, { method: 'GET', redirect: 'follow' });
      if (r.status >= 400) bad.push(`${r.status} ${url} (in ${[...from][0]})`);
    } catch (e) { bad.push(`ERR ${url}: ${e.message}`); }
  }
  console.log(bad.length ? `\n${bad.length} external problem(s):\n  ` + bad.join('\n  ') : 'external links ok');
  if (bad.length) process.exitCode = 1;
}
if (broken.length) process.exitCode = 1;
