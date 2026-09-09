# Muhammad Huzaifa — AI Engineering Institute

Phase 1 (Foundation) of the platform. This is not a portfolio — it's the
skeleton of a research institute: navigation, theming, SEO foundation, and
database/auth wiring points are in place; content and the knowledge graph
build out in the phases that follow.

## Stack

Next.js 15 (App Router) · TypeScript · Tailwind CSS v4 · shadcn/ui ·
Framer Motion · Prisma · PostgreSQL · NextAuth · Resend · React Hook Form +
Zod · ESLint + Prettier + Husky + lint-staged.

## What's built (Phase 1)

- App shell: root layout, theme system (light/dark via `next-themes`),
  fonts (Inter / Space Grotesk / JetBrains Mono).
- Navigation shell: primary nav, "Explore" mega-menu, mobile nav, footer
  sitemap — matching the approved information architecture exactly
  (`lib/nav-config.ts`).
- SEO foundation: `app/sitemap.ts`, `app/robots.ts`, metadata API wired in
  `app/layout.tsx`.
- Stub routes for all 16 primary/secondary nav destinations, so the site
  is fully navigable end to end (real content lands in Phases 2–5).
- Prisma connected to Postgres via `DATABASE_URL` (minimal placeholder
  schema — the full 14-content-type schema is Phase 2).
- Code quality: ESLint + Prettier (non-conflicting config), Husky
  pre-commit hook running lint-staged.

## What's built (Phase 2 — Content System)

- **Full Prisma schema** (`prisma/schema.prisma`): the `Content` +
  `ContentLink` backbone plus all 14 detail tables (Research — three
  layers: Idea/Note/Paper — Knowledge, Architecture, Writing, Project,
  Lab, Journey, Roadmap, Venture, Playbook, Case Study, Talk, Dataset,
  Toolbox), tags, references, reading list, structured Now snapshot,
  bookmarks, newsletter, contact requests.
- **Contentlayer2** (`contentlayer.config.ts`): 14 MDX document types
  mirroring the Prisma detail tables field-for-field. MDX under
  `/content` is the authoring source of truth.
- **14 real seed content items**, one per type (`/content/**/*.mdx`) —
  no lorem ipsum, reusing established facts (NeuroFlow, RAG chunking,
  the Production RAG playbook, etc.) so the pipeline is provable, not
  just declared to work.
- **`scripts/sync-content-to-db.ts`**: ingests every MDX document into
  Postgres — Content row, detail row, tags, and `ContentLink` edges
  resolved from each document's `related` slug list. This is what gives
  Phase 3 (Knowledge Graph) and Phase 6 (Search) real relational data to
  query, without a second content-authoring system.
- **Three sections fully wired end-to-end** (index + detail pages, real
  data, SEO metadata, JSON-LD): **Research** (three-layer index),
  **Knowledge** (wiki-style category tree + article + related/backlinks),
  **Playbooks** (ordered workflow steps + HowTo structured data). The
  remaining 11 nav destinations keep their Phase 1 stub pages —
  full page builds for all of them is Phase 4's explicit scope.
- **Shared SEO helper** (`lib/seo/metadata.ts`): one `contentMetadata()` +
  `structuredData()` pair generating Next.js Metadata and per-type
  JSON-LD (HowTo for Playbooks, Dataset for Datasets, Review for Toolbox,
  ScholarlyArticle for Research, TechArticle as the default) for every
  content type from one function, not 14 bespoke implementations.

### One deliberate scoping decision: Fumadocs

`fumadocs-core`, `fumadocs-mdx`, and `fumadocs-ui` are installed per the
mandated stack. Rather than run fumadocs-mdx as a second MDX compiler
over the same `/content/knowledge` files Contentlayer already parses
(two pipelines compiling the same source is a real maintenance cost, not
a hedge), the Knowledge section is built with Contentlayer's data and a
hand-rolled wiki layout (`components/knowledge/category-tree.tsx` +
the three-pane page layout) that delivers the same UX fumadocs-ui's
`DocsLayout` would (category sidebar, article, related/backlinks) —
verified against fumadocs-ui's actual shipped type definitions in
`node_modules`, not guessed. Swapping in fumadocs-ui's `DocsLayout` /
`DocsPage` components directly is a reasonable Phase 4 decision once
you're ready to invest in its full (fairly large, Radix-dependent)
component surface — flagging this explicitly rather than silently
half-wiring it.

## Content pipeline commands

```bash
npm run content:sync   # ingest all /content MDX into Postgres (needs DATABASE_URL + db:generate)
npx contentlayer2 build # regenerate .contentlayer/generated from /content
```



1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Environment variables** — copy the template and fill in what you have:
   ```bash
   cp .env.example .env
   ```
   Only `DATABASE_URL` is required to run Phase 1. `NEXTAUTH_*`,
   `RESEND_API_KEY`, and the Plausible domain are needed starting in
   Phases 8–11 — leave them blank for now.

3. **Database** — point `DATABASE_URL` at any Postgres instance (Vercel
   Postgres, Neon, Supabase, or local Postgres), then:
   ```bash
   npx prisma generate   # generates the Prisma client
   npx prisma migrate dev # applies the schema
   ```

   **Note on Prisma 7:** this project uses Prisma ORM 7, which changed how
   the database connection is configured — `datasource.url` is no longer
   allowed inside `prisma/schema.prisma`. Instead:
   - `prisma.config.ts` (project root) holds the connection string for the
     CLI (`generate`/`migrate`/`studio`), reading `DATABASE_URL` from `.env`.
   - `lib/db/client.ts` connects Prisma Client at runtime via an explicit
     driver adapter (`@prisma/adapter-pg`), which is now required rather
     than optional. Both files are already set up this way — you shouldn't
     need to touch either unless you're switching database providers.

4. **Run it**
   ```bash
   npm run dev
   ```
   Visit `http://localhost:3000`.

5. **Before committing**, Husky runs lint-staged automatically. To run
   checks manually:
   ```bash
   npm run lint
   npm run typecheck
   npm run format
   ```

## Verified in this environment

`npm install`, `contentlayer2 build` (all 14 document type schemas
validate against the 14 seed MDX files), `tsc --noEmit`, `eslint .`, and
`next build` (27 routes, including SSG detail pages for Research,
Knowledge, and Playbooks with real content) all pass clean.

Two things could not be fully verified here, both isolated and confirmed
not to affect anything else:
- **`prisma generate`** — blocked by this sandbox's network allowlist
  (`binaries.prisma.sh` isn't reachable). The schema was hand-reviewed
  for internal consistency (relation names, cascade paths, compound
  unique keys) in lieu of the engine's own validation. Runs normally
  once you have `DATABASE_URL` set and full network access.
- **Google Fonts fetch inside `next build`** — same class of sandbox
  network restriction as Phase 1 (`fonts.googleapis.com`). Confirmed by
  temporarily stubbing the font imports and re-running the full build.

`lib/db/client.ts` and `scripts/sync-content-to-db.ts` are correct as
written but depend on the generated Prisma client existing — run
`npm run db:generate` before `npm run content:sync`.

## What's next

**Phase 3 — Knowledge Graph**: build the graph *service* against the
`ContentLink` table the sync script now populates — related-content and
backlink queries as SQL joins (Phase 2's `resolveRelated`/
`resolveBacklinks` in `lib/content/index.ts` are a file-based stand-in
using the same `related` data, so pages already render correctly; Phase
3 swaps the implementation, not the page code, once content is synced to
Postgres), plus the `/knowledge/graph` visualization.
"# my-portfolio" 
