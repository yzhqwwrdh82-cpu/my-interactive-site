// Copies brand logos used in data/tools.json from a local Simple Icons package
// into assets/logos/, coloured with the official brand hex, and records credits.
// Dev-only. Usage:
//   npm i simple-icons@13 --prefix /tmp/si
//   node toolscout/scripts/vendor-logos.mjs /tmp/si/node_modules/simple-icons
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const pkgDir = process.argv[2];
if (!pkgDir) { console.error('Pass the path to node_modules/simple-icons'); process.exit(1); }

const pkg = JSON.parse(readFileSync(join(pkgDir, 'package.json'), 'utf8'));
const meta = JSON.parse(readFileSync(join(pkgDir, '_data/simple-icons.json'), 'utf8'));
const icons = Array.isArray(meta) ? meta : meta.icons;
const slugOf = (t) => t.slug || t.title.toLowerCase()
  .replace(/\+/g, 'plus').replace(/^\./, 'dot-').replace(/\./g, 'dot').replace(/&/g, 'and')
  .normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9]/g, '');
const bySlug = Object.fromEntries(icons.map((t) => [slugOf(t), t]));

const data = JSON.parse(readFileSync(join(root, 'data/tools.json'), 'utf8'));
const outDir = join(root, 'assets/logos');
mkdirSync(outDir, { recursive: true });
// Brand-guideline overrides: some brands forbid recoloring their mark (e.g. OpenAI: no added colors).
const COLOR_OVERRIDE = { openai: '000000', mailchimp: '241C15' };  // Mailchimp: dark mark for contrast on white (brand assets offer a dark version)
const credits = { source: 'Simple Icons', version: pkg.version, url: 'https://simpleicons.org/', projectLicense: 'CC0-1.0', icons: {} };

for (const tool of data.tools) {
  if (!tool.logo || tool.logo.source !== 'simple-icons') continue;
  const icon = bySlug[tool.logo.slug];
  if (!icon) { console.warn('missing icon', tool.logo.slug); continue; }
  const raw = readFileSync(join(pkgDir, 'icons', tool.logo.slug + '.svg'), 'utf8');
  const path = raw.match(/<path d="([^"]+)"/)[1];
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" role="img" aria-hidden="true"><path fill="#${COLOR_OVERRIDE[tool.logo.slug] || icon.hex}" d="${path}"/></svg>\n`;
  writeFileSync(join(outDir, tool.logo.slug + '.svg'), svg);
  credits.icons[tool.logo.slug] = { title: icon.title, hex: COLOR_OVERRIDE[tool.logo.slug] || icon.hex, license: icon.license ? icon.license.type : 'CC0-1.0 (project default; not confirmed per icon)', source: icon.source, guidelines: icon.guidelines || null };
  console.log('logo', tool.logo.slug);
}
writeFileSync(join(root, 'data/logo-credits.json'), JSON.stringify(credits, null, 2) + '\n');
