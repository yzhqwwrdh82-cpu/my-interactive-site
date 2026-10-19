# ToolScout data model

All content lives in three JSON files. The build (`node toolscout/scripts/build.mjs`) validates them first and refuses to build on errors.

| File | Holds | Status |
|---|---|---|
| `data/tools.json` | AI tools and software, plus their taxonomies (categories, uses, platforms, pricing models) | 29 verified tools |
| `data/products.json` | Books, physical products, digital products, courses, and reading lists (`collections`) | Structure only, 0 items |
| `data/site.json` | Base URL and feature flags (affiliate, ads, newsletter, chat, voice, accounts, payments) | All flags `false` |

## Core principles (enforced by `scripts/validate.mjs`)

1. **Verified vs editorial is explicit.** `pros` / `cons` are verified facts, and each one carries `source: "pricing" | "official"`. `description`, `audience` and `uses` are editorial, and the UI labels them that way.
2. **No invented data.** The validator rejects:
   - `rating`, `reviews` and `stock` fields
   - a `price` without `amount`, `currency`, `checkedAt` and `sourceUrl`
   - an affiliate URL unless `affiliate.status` is `approved`
3. **Every item is dated.** `addedAt` and `checkedAt` (YYYY-MM-DD) are required.
4. **Licensed assets only.** A logo must come from a licensed source (Simple Icons today) and exist in `assets/logos/`. A cover image needs `file`, `license` and `permissionSource`. Without one, the UI falls back to a monogram or a generated cover.

## Tool entry (`tools.json` → `tools[]`)

```jsonc
{
  "id": "descript",                    // kebab-case, unique across tools AND products
  "name": "Descript", "maker": "Descript",
  "type": "ai-tool",                   // ai-tool | software
  "category": "media",                 // → categories[].id
  "uses": ["video", "audio"],          // → uses[].id (drives "find by task" filters)
  "pricing": "freemium",               // free | freemium | paid | unverified
  "platforms": null,                   // null unless verified → platforms[].id
  "platformsUrl": "https://…",         // optional: official download page the platforms were verified against
  "openSource": null,                  // true | false | null (unknown)
  "url": "https://…", "pricingUrl": "https://…",
  "logo": { "source": "simple-icons", "slug": "…" } | null,
  "monogram": "DE",                    // optional fallback initials
  "affiliate": { "status": "none" },   // none | applied | approved (+ "url" only when approved)
  "addedAt": "2026-10-19", "checkedAt": "2026-10-19",
  "featured": true,                    // editorial pick, always labeled as such
  "description": { "he": "…", "en": "…" },
  "audience": { "he": [], "en": [] },
  "pros": [{ "he": "…", "en": "…", "source": "pricing" }],
  "cons": [],
  "verification": { "pricing": "verified", "platforms": "unverified", "note": { "he": "…", "en": "…" } }
}
```

## Product entry (`products.json` → `items[]`)

The same principles apply. Fields by type:

```jsonc
{
  "id": "example-book", "type": "book",        // book | physical-product | digital-product | course
  "title": "…", "authors": ["…"], "publisher": "…", "year": 2025,
  "topics": ["ai"], "languages": ["en"], "level": "beginner", "formats": ["print", "ebook"],
  "isbn13": "…",                               // optional
  "officialUrl": "https://publisher…",          // the page details were verified against
  "cover": null,                               // or { file, license, permissionSource }
  "price": null,                               // or { amount, currency, checkedAt, sourceUrl }
  "affiliate": { "status": "none" },
  "description": { "he": "…", "en": "…" },     // editorial
  "pros": [], "cons": [],                      // verified only, with source
  "addedAt": "…", "checkedAt": "…"
}
```

- **Physical products** add `manufacturer` and `specs: [{ label: {he,en}, value, source }]`. Never add stock levels.
- **Digital products** add `license` (what the buyer may do) and `seller`. A ToolScout-original product stays `availability: "not-for-sale"` until a real payment provider exists.
- **Courses** add `provider`, `duration` (only if published) and `certificate` (true/false/null).
- **Reading lists** (`collections[]`): `{ id, title {he,en}, level, goal, items: [productId…], editorialNote {he,en} }`.

## Future commercial fields (planned, not active)

| Need | Field | Rule |
|---|---|---|
| Affiliate link | `affiliate: { status: "approved", url, program, approvedAt }` | Card shows an "Affiliate link" label and `rel="sponsored"` |
| Sponsored placement | `sponsored: { by, from, to, label }` | Always labeled "Sponsored". Never affects `featured` or verified facts |
| Subscription plan | `data/plans.json` | Added only when a premium offer is justified |
| Price history | `priceHistory: [{ amount, currency, checkedAt, sourceUrl }]` | Only from verified checks |

## Adding a tool (about 15 minutes)

1. Open the tool's official pricing page. Note the plan names, whether there's a free plan, and the date.
2. Add the entry to `tools.json`. Write `pros` / `cons` only from what the page says, and set `source`.
3. If Simple Icons has the logo, run `node toolscout/scripts/vendor-logos.mjs <path-to-simple-icons>`.
4. Run `node toolscout/scripts/build.mjs`. If validation fails, fix the data and rebuild.
5. Commit the data and the generated pages together.
