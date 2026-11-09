# System Design feature verification

This repository does not define a dedicated automated test script. Before publishing the System Design tab, run these project checks from the repository root:

```powershell
npm run lint
npm run typecheck
npm run build
```

## What each check covers

- `npm run lint` runs ESLint across the project and checks for code quality issues.
- `npm run typecheck` runs TypeScript with `tsc --noEmit` to catch type errors.
- `npm run build` generates the Prisma client and creates the optimized Next.js production build.
- Asset/data review confirms the slide data order is Four Pillars overview, Performance, Scalability, Reliability, and Security, and each referenced image exists under `public/system-design/`.

Record the date and results here after each verification run.

## Run record

- 2026-11-09: `npm run lint` passed with 15 existing `no-explicit-any` warnings in `contentlayer.config.ts`, `lib/content/index.ts`, and `scripts/sync-content-to-db.ts`.
- 2026-11-09: `npm run typecheck` passed.
- 2026-11-09: `npm run build` generated Prisma Client and Contentlayer documents, then stopped because this environment could not resolve `fonts.googleapis.com` for the existing `next/font` declarations in `app/layout.tsx` (network unavailable).
- 2026-11-09: Slide data and all five image assets verified present and in the requested order.
- 2026-11-10: `npm run lint` passed with the same 15 existing `no-explicit-any` warnings; no errors.
- 2026-11-10: `npm run typecheck` passed.
- 2026-11-10: All five slide images verified present. The live `/system-design` page was opened and confirmed to show the System Design link in the main navbar and the five-slide deck.
- 2026-11-10: `npm run build` reached successful compilation after network access became available, but Next.js's lint/type worker exited with JavaScript heap out of memory. Retrying with `NODE_OPTIONS=--max-old-space-size=4096` produced the same worker memory failure.
