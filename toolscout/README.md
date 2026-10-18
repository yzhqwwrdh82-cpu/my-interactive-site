# ToolScout — v1 (branch `toolscout-redesign`)

Bilingual (Hebrew / English) static catalog of AI tools and software. No server, no database, no paid services.

The original `index.html` and `README.md` at the repo root are untouched. The new site lives entirely in this folder:

| Path | What it is |
|---|---|
| `index.html` | Hebrew catalog (RTL) — generated |
| `en/index.html` | English catalog (LTR) — generated |
| `disclosure.html`, `en/disclosure.html` | Affiliate disclosure, ready for future use — generated |
| `data/tools.json` | **Single source of truth** for tools, categories and pricing models |
| `scripts/build.mjs` | Generates the HTML pages from the JSON (Node, zero dependencies) |
| `assets/styles.css` | Design tokens, light/dark themes, layout |
| `assets/app.js` | Search, filters, highlighting, details toggle, theme toggle |
| `assets/favicon.svg`, `favicon-32.png`, `apple-touch-icon.png`, `og-image.png` | Icons and social share image |

## Editing the catalog

1. Edit `data/tools.json`.
2. Run `node toolscout/scripts/build.mjs`.
3. Commit the JSON **and** the regenerated HTML (the HTML is committed so no build step is needed on the host).

Each tool has: `name`, `maker`, `category`, `pricing` (`free` / `freemium` / `paid`), official `url`, `pricingUrl`, `affiliateUrl` (currently `null` everywhere), `tags` and `description` in both languages. Exact prices are deliberately not stored: they change often. When an `affiliateUrl` is added, the card links to it with `rel="sponsored"` and shows an "Affiliate link" label automatically.

## Domain / SEO

Once the production URL is known, build with it to add canonical + hreflang URLs and `sitemap.xml`:

```
SITE_URL=https://your-domain.example/toolscout node toolscout/scripts/build.mjs
```

## Design decisions

- All cards are pre-rendered in HTML, so content is fully visible if JavaScript fails (fixes the old `opacity: 0` problem). JS only enhances.
- Filters are reflected in the URL (`?q=&cat=&price=`) so filtered views can be shared.
- `/` focuses search, `Esc` clears it. Motion is limited to one card "settle" on filtering and is disabled under `prefers-reduced-motion`.
- Font: Rubik (Google Fonts, covers Hebrew and Latin), with system fallback.
