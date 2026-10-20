// Original flat illustrations for cards (no photos, no third-party artwork). Decorative: aria-hidden.
import { readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

export const heroArt = readFileSync(join(dirname(fileURLToPath(import.meta.url)), 'hero-art.svg'), 'utf8');

const wrap = (bg, inner) => `<svg class="card-art" viewBox="0 0 240 120" preserveAspectRatio="xMidYMid slice" aria-hidden="true" focusable="false"><rect width="240" height="120" fill="${bg}"/>${inner}</svg>`;
const desk = '<rect y="92" width="240" height="28" fill="#C9A47A"/><rect y="92" width="240" height="4" fill="#B48C60"/>';

export const ART = {
  books: wrap('#F3E6D2', desk +
    '<rect x="70" y="78" width="96" height="14" rx="2" fill="#1F3A68"/><rect x="74" y="64" width="88" height="14" rx="2" fill="#B5462E"/><rect x="66" y="50" width="100" height="14" rx="2" fill="#2F6B4F"/><rect x="78" y="36" width="80" height="14" rx="2" fill="#D9A441"/>' +
    '<rect x="74" y="80" width="88" height="2" fill="#FFF" opacity=".5"/><rect x="70" y="52" width="92" height="2" fill="#FFF" opacity=".4"/>' +
    '<path d="M150 36c8-10 20-12 30-6-10 2-18 8-22 16z" fill="#7D8F5A"/><rect x="176" y="62" width="12" height="30" rx="3" fill="#E8D9C2"/><path d="M182 62c-6-14 4-22 0-34 10 10 6 22 0 34z" fill="#7D8F5A"/>'),
  courses: wrap('#E9EEF6', desk +
    '<rect x="60" y="34" width="96" height="58" rx="5" fill="#1F2A44"/><rect x="66" y="40" width="84" height="44" rx="2" fill="#3D6FD8"/><rect x="72" y="48" width="40" height="5" rx="2" fill="#FFF" opacity=".85"/><rect x="72" y="58" width="60" height="4" rx="2" fill="#FFF" opacity=".55"/><rect x="72" y="66" width="50" height="4" rx="2" fill="#FFF" opacity=".55"/>' +
    '<rect x="48" y="90" width="120" height="6" rx="2" fill="#2B3550"/><path d="M168 66h44l-6 26h-44z" fill="#FFFDF8"/><path d="M168 66h44l-6 26h-44z" fill="none" stroke="#D6CBB8"/><rect x="176" y="72" width="22" height="2" fill="#B9AE9B"/><rect x="174" y="78" width="26" height="2" fill="#B9AE9B"/><path d="M206 60l10-14 4 3-10 14z" fill="#D9A441"/>'),
  products: wrap('#F1E8DC', desk +
    '<path d="M64 74a22 22 0 0 1 44 0" fill="none" stroke="#22252B" stroke-width="7"/><rect x="58" y="70" width="14" height="22" rx="5" fill="#22252B"/><rect x="100" y="70" width="14" height="22" rx="5" fill="#22252B"/>' +
    '<path d="M124 62h52l6 30h-64z" fill="#FFFDF8"/><path d="M150 62v30" stroke="#D6CBB8"/><rect x="190" y="46" width="22" height="46" rx="8" fill="#1F3A68"/><rect x="194" y="40" width="14" height="8" rx="2" fill="#13213F"/>'),
  ai: wrap('#0F1B33', '<rect y="92" width="240" height="28" fill="#1A2744"/>' +
    '<rect x="44" y="26" width="110" height="66" rx="5" fill="#0B1428" stroke="#2D4A86"/><rect x="52" y="36" width="34" height="4" rx="2" fill="#5B9BFF"/><rect x="52" y="46" width="70" height="4" rx="2" fill="#22D3EE" opacity=".8"/><rect x="60" y="56" width="56" height="4" rx="2" fill="#8B6CFF"/><rect x="60" y="66" width="44" height="4" rx="2" fill="#5B9BFF" opacity=".7"/><rect x="52" y="76" width="30" height="4" rx="2" fill="#22D3EE" opacity=".6"/>' +
    '<rect x="164" y="40" width="40" height="52" rx="5" fill="#0B1428" stroke="#2D4A86"/><circle cx="184" cy="60" r="10" fill="none" stroke="#22D3EE" stroke-width="2.5"/><path d="M178 78h12" stroke="#5B9BFF" stroke-width="3" stroke-linecap="round"/><path d="M206 22l3 7 7 3-7 3-3 7-3-7-7-3 7-3z" fill="#F3D27A"/>'),
  events: wrap('#EDE3D3', '<rect y="90" width="240" height="30" fill="#D8C3A2"/><rect x="60" y="30" width="120" height="60" rx="6" fill="#FFFDF8"/><rect x="60" y="30" width="120" height="16" rx="6" fill="#B5462E"/><g fill="#1F3A68">' +
    Array.from({ length: 12 }, (_, i) => `<rect x="${70 + (i % 6) * 17}" y="${54 + Math.floor(i / 6) * 16}" width="10" height="10" rx="2" opacity="${i === 4 ? 1 : 0.25}"/>`).join('') + '</g>'),
  content: wrap('#F5EEE2', desk + '<path d="M70 40h70l14 14v38H70z" fill="#FFFDF8" stroke="#D6CBB8"/><path d="M140 40v14h14" fill="none" stroke="#D6CBB8"/><g fill="#B9AE9B"><rect x="80" y="58" width="56" height="3"/><rect x="80" y="66" width="62" height="3"/><rect x="80" y="74" width="48" height="3"/></g><path d="M150 84l26-30 6 5-26 30-8 3z" fill="#1F3A68"/>'),
  groups: wrap('#E8EEF3', '<rect y="92" width="240" height="28" fill="#C9D6E2"/>' +
    [[90, '#1F3A68'], [120, '#B5462E'], [150, '#2F6B4F']].map(([x, c]) => `<circle cx="${x}" cy="48" r="12" fill="${c}"/><path d="M${x - 18} 92a18 22 0 0 1 36 0z" fill="${c}"/>`).join('')),
  qa: wrap('#F2EADF', '<path d="M50 30h90a8 8 0 0 1 8 8v28a8 8 0 0 1-8 8H82l-16 14v-14H50a8 8 0 0 1-8-8V38a8 8 0 0 1 8-8z" fill="#1F3A68"/><text x="95" y="61" text-anchor="middle" font-size="26" font-weight="700" fill="#FFF" font-family="Rubik, sans-serif">?</text>' +
    '<path d="M196 54h-56a8 8 0 0 0-8 8v22a8 8 0 0 0 8 8h36l14 12V92h6a8 8 0 0 0 8-8V62a8 8 0 0 0-8-8z" fill="#D9A441"/><path d="M152 74l8 8 16-16" fill="none" stroke="#FFF" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>')
};
