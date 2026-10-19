# ToolScout

A bilingual (Hebrew RTL / English LTR) catalog for choosing AI tools and software, with information verified against official sources. It's a static site with no server, database, external services, cookies or analytics.

The original `index.html` and `README.md` at the repository root are untouched. Everything lives in `toolscout/`.

## Structure

| Path | Purpose |
|---|---|
| `data/tools.json` | 29 tools plus taxonomies. The single source of truth for tools |
| `data/products.json` | Books, physical and digital products, courses. Structure only, no items yet |
| `data/site.json` | Base URL, plus feature flags that are all off (affiliate, ads, newsletter, chat, voice, accounts, payments) |
| `data/logo-credits.json` | Logo sources and licenses (Simple Icons) |
| `scripts/build.mjs` | Validates the data, then generates every page in both languages, the emails, `assets/catalog.json`, the sitemap and robots |
| `scripts/validate.mjs` | Data rules: no invented prices, ratings or stock; affiliate URLs only when approved; licensed assets only |
| `scripts/check-links.mjs` | Internal link check. Add `--external` to check official URLs on a normal network |
| `scripts/vendor-logos.mjs` | Copies brand logos from a local Simple Icons package |
| `scripts/lib/` | Templates, UI strings, editorial content (guides, legal pages, comparisons), emails, books |
| `assets/` | CSS, JS, self-hosted Rubik font (OFL), logos, favicon, share image |
| `docs/` | Data model, site map and user journeys, communications plan, business roadmap, **legal pre-launch audit** (`legal-audit.md`), **credits and licenses** (`licenses.md`) |
| Generated output | `index.html`, `catalog.html`, `compare*.html`, `tools/`, `category/`, `guides/`, `books.html`, legal pages, `contact.html`, `account.html`, `service-preview.html`, `emails/`, `en/…` |

## Workflow

```bash
node toolscout/scripts/build.mjs          # validate and generate
node toolscout/scripts/check-links.mjs    # check internal links
```

Commit the data and the generated output together, so the host needs no build step. To change the production URL, edit `siteUrl` in `data/site.json`, or run with `SITE_URL=… node toolscout/scripts/build.mjs`.

## What works vs what's demo

- **Works now:**
  - Search, filters, sorting and URL state
  - Compare (up to 3 tools)
  - Favorites, saved in the browser only
  - Light and dark theme
  - Local chat search helper, which runs in the browser and sends nothing
  - Form validation
- **Demo, not connected:**
  - Contact form and newsletter (no data sent or stored)
  - Email templates
  - Live agent and AI chat
  - Voice call (design specimens only, never requests the microphone)
  - Accounts
  - Books catalog (no items yet)

See `docs/communications-plan.md` for what each one needs before it can be connected.

## Security and privacy

- A strict Content-Security-Policy, with no inline scripts and no third-party requests.
- External links use `rel="noopener"`.
- Browser storage access is wrapped in try/catch.
- The chat never sends what you type.
