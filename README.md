# rubberfit-docs

Documentation for **Rubberfit** — manufacturing operations for rubber-roll fabricators.

> *Material that lands flat.*

**Live at:** [docs.rubberfit.app](https://docs.rubberfit.app)
**Marketing site:** [get.rubberfit.app](https://get.rubberfit.app)
**Application:** [dashboard.rubberfit.app](https://dashboard.rubberfit.app)
**Built by:** [Arc & Anchor](https://www.arcanchor.com)

## Stack

- [Nextra v3](https://nextra.site) — Next.js-based docs framework (open source, MIT)
- MDX content in `pages/`
- `_meta.ts` files configure section navigation
- Theme: `nextra-theme-docs` with the Rubberfit brand mark + signal-orange accent

We previously evaluated Mintlify (used by [`sigilix-docs`](https://github.com/Arc-and-Anchor/sigilix-docs)) but moved to Nextra after Mintlify's free tier limited us to one site. Nextra is free to self-host on Vercel and uses the same Next.js stack as the rest of the Rubberfit ecosystem.

## Local dev

```bash
npm install
npm run dev      # http://localhost:3000
npm run build
```

## Adding a page

1. Create `pages/<section>/<slug>.mdx` with frontmatter:
   ```mdx
   ---
   title: My new page
   description: "One-line description used for SEO + the docs index."
   ---

   # My new page

   ...
   ```
2. Add the slug to the section's `_meta.ts`:
   ```ts
   const meta = {
     existing: "Existing page",
     mySlug: "My new page",
   } as const
   export default meta
   ```
3. Build to verify (`npm run build`)

## Editing the theme

Theme configuration lives in `theme.config.tsx`. The brand mark is the same graphite-bordered + signal-orange-inset square used across the marketing site and application.
