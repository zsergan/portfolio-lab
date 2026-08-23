# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this project is

A personal portfolio site, meant to be public on GitHub. It has two zones: **Portfolio** — About (`/`), Experience (`/experience`), Contact (`/contact`) — and **Lab** (`/lab`) — a growing collection of small, self-contained interactive dev tools (JSON formatter, color contrast checker, unit converter, and more as the roadmap progresses). It's a pure frontend app: no real backend, no paid or keyed external APIs. Persistence, where a tool needs it, is localStorage/IndexedDB; any "network" scenario is mocked via MSW or hits a free public API that needs no key.

Under the product surface, this project doubles as the owner's React/TypeScript refresher: each Lab tool is chosen so building it exercises a specific set of interview-relevant patterns (hooks, TS features, state management, data fetching, forms, performance, testing, a11y, component patterns, routing). Code clarity matters more than DRY-ing things up across tools — each tool is meant to be read as much as clicked.

`LEARNING_ROADMAP.md` is the release backlog (checkboxes grouped by release — v0.1, v0.2, ... — each release describing one Lab tool or Portfolio milestone, with a note on which patterns it practices) and `src/lab/registry.ts` is its in-app mirror for the Lab tools — the two must be kept in sync by `id`/title when items are added or completed. Work happens **one release item per session**: pick the next unchecked release, build its tool, wire it up, check the box.

## Permanent rules

These apply to everything in this repository, without exception, because it is (or will become) a public repo:

- **English only, always.** All code, comments, JSDoc, commit messages, README/docs, and any other file that could end up in the public repo must be written in English. Never write Russian (or any non-English text) into a project file.
- **No real backend, no paid or keyed external APIs.** Any "server" behavior is simulated — via a delayed-promise fake API module (see `src/content/api.ts`), via MSW, via localStorage/IndexedDB, or by calling a free public API that requires no API key/token. Never wire up a real backend service or a paid/keyed API.
- **`/private-notes/` is off-limits to product code.** It's gitignored and reserved for the owner's personal, local-only notes. Never place product code, demo content, or anything meant to ship there.
- **Commit at the right granularity.** Each commit should be one coherent, reviewable change — not a giant dump of unrelated edits, and not fragmented into trivial one-liners that only make sense stitched together. Split unrelated concerns (e.g. a docs/process update vs. a feature vs. a bug fix) into separate commits; keep a single feature's implementation together rather than splitting it across commits that don't build or make sense in isolation. Write commit messages that explain *why*, matching this repo's existing message style.

## Commands

- `npm run dev` — start the Vite dev server
- `npm run build` — typecheck (`tsc -b`) then production build
- `npm run lint` — ESLint (flat config, `eslint.config.js`)
- `npm run lint:fix` — ESLint with `--fix`; also runs automatically on save if your editor has the recommended ESLint extension (see `.vscode/`)
- `npm run test` — run the Vitest suite once
- `npm run test:watch` — Vitest in watch mode
- `npm run test:coverage` — run the suite once with a coverage report (no enforced threshold, informational only)
- Single test file: `npx vitest run src/pages/LabHome/LabHome.test.tsx`
- Single test by name: `npx vitest run -t "renders every registered tool title"`

There is no separate `tsc --noEmit` script — type errors surface via `npm run build` or your editor's TS server.

## Architecture

**Registry-driven Lab.** `src/lab/registry.ts` is the single source of truth for every Lab tool: id, title, description, `highlights` (what patterns it demonstrates), `status: 'planned' | 'done'`, route `path`, optional `topics` tags, and (once built) a lazy `component` loader (`() => import('...')`). `src/pages/LabHome/LabHome.tsx` renders the registry as a card grid at `/lab` — `planned` entries show as non-interactive greyed-out cards, `done` entries are real `<Link>`s. **Adding a tool = four edits, no more:** write the tool component, flip its registry entry to `status: 'done'` with a `component` loader, add its route in `src/app/router.tsx`, check it off in `LEARNING_ROADMAP.md`.

**Portfolio** is three separate static pages — `src/pages/AboutPage/AboutPage.tsx` (`/`), `ExperiencePage/ExperiencePage.tsx` (`/experience`), `ContactPage/ContactPage.tsx` (`/contact`) — each its own route rather than anchored sections on one page, so any of them can be linked to directly. No registry of its own; they're not a growing collection like the Lab tools.

**Routing** uses `react-router`'s data router (`createBrowserRouter`/`RouterProvider`, wired in `src/main.tsx` → `src/app/router.tsx`). One layout route (`src/app/RootLayout.tsx`, header + nav + `<Outlet/>`) wraps the three Portfolio routes, the Lab index route (`LabHome` at `/lab`), and a catch-all (`NotFound`). Per-tool routes are added as children of the layout route under `lab/<tool-id>`; use `lazy: () => import(...)` for code-split tool routes rather than eager imports, matching the registry's lazy-loader convention.

**One folder per component/page.** `src/pages/<PageName>/` and `src/components/<ComponentName>/` each hold their own `<Name>.tsx` + `<Name>.module.css` + `<Name>.test.tsx` — matching the folder-per-tool convention `src/lab/<tool-id>/` already uses. Keep the full name on the file inside the folder (not `index.tsx`); it keeps editor tabs and imports unambiguous when several are open at once.

**`src/components/index.ts`** re-exports every shared component, so consumers import from `@/components` (e.g. `import { Eyebrow } from '@/components'`) instead of reaching into a specific component's folder. Add a new export line there whenever a new shared component is added. This barrel is specific to `src/components` — `src/pages` and `src/lab` stay path-based (routed by `router.tsx`/`registry.ts`, not imported ad hoc), so they don't get one.

**`src/hooks/`** mirrors `src/components/` for shared, non-visual logic: each hook gets its own folder (`src/hooks/<hookName>/<hookName>.ts` + a co-located test) plus a barrel `src/hooks/index.ts`, imported via `@/hooks`. Only promote a hook here once it's clearly general-purpose (e.g. a clipboard helper) — page/tool-specific logic stays co-located next to what uses it, matching `src/lab/<tool-id>/useSomething.ts`.

**Import order** is enforced by `eslint-plugin-perfectionist`'s `sort-imports` rule (`eslint.config.js`), not just convention: every file's imports are grouped into three blank-line-separated buckets — external packages, internal (`@/` alias + relative paths), then styles — alphabetized within each. It's autofixable (`npm run lint:fix`, or on save via `.vscode/settings.json`), so don't hand-order imports; let the tool do it. `vite.config.ts` is excluded from the rule since its `/// <reference types="vitest/config" />` directive must stay the file's first line, which the rule doesn't know to preserve.

**CI and local checks.** `.github/workflows/ci.yml` runs Lint/Build/Test as three separate jobs on every PR and on push to `main`; `main` has branch protection requiring all three to pass before merge, so a failing PR physically can't be merged, not just flagged. Locally, Husky runs `lint-staged` (`eslint --fix` on staged `*.{ts,tsx}` files) on `pre-commit`, and the full `lint && build && test` on `pre-push` — these are a convenience to catch problems before they reach GitHub, not the source of truth (they can be bypassed with `--no-verify`; CI is the real gate). `.github/dependabot.yml` opens weekly PRs for outdated npm packages and Action versions, which get validated by the same CI workflow.

**Loading states.** Any `useQuery` consumer renders its pending state through `QueryBoundary` (`src/components/QueryBoundary/`), which takes a required `loading: ReactNode` prop — never fall back to a plain "Loading…" string. Compose the loading UI from the shared `Skeleton` primitive (`src/components/Skeleton/`, a shimmering block with built-in `prefers-reduced-motion` handling); `QueryBoundary` itself wraps whatever `loading` renders in a `role="status"`/`aria-live="polite"` region with a visually-hidden announcement, so individual pages don't need to think about accessibility. The convention for a page's skeleton is to reuse that page's own real CSS Module layout classes (adding a small flex-wrapper class only where none already exists) so the skeleton's DOM shape matches the real content exactly and there's no layout shift when data arrives — see `AboutPage.tsx`/`ExperiencePage.tsx`/`ContactPage.tsx` for examples.

**Conventions for a new Lab tool**, once you pick the next roadmap release:
- Place it at `src/lab/<tool-id>/` (id matches the registry entry).
- Styling: CSS Modules (`*.module.css`) — no other styling library is installed; this is the deliberate baseline (see below).
- Co-locate a test next to the component (see `src/pages/LabHome/LabHome.test.tsx` for the convention: React Testing Library, explicit `import { describe, it, expect } from 'vitest'` rather than relying on Vitest globals).
- Import shared code via the `@/` alias (maps to `src/`, configured in both `tsconfig.app.json` and `vite.config.ts`).

**Deliberate stack decisions** (don't "fix" these without checking in — they're intentional for the learning goal, not oversights):
- TypeScript `strict: true` is on — several roadmap topics (generics, discriminated unions, utility types) are pedagogically hollow without it.
- The React Compiler is **not** enabled, even though the Vite template supports adding it. Manual-memoization topics (`React.memo`, `useMemo`/`useCallback`) need memoization to actually matter for the demo to teach anything.
- `zustand`, `@reduxjs/toolkit`, and `react-redux` are installed but currently unused by any code — they're pre-installed for the future State Playground tool, not dead dependencies to prune.
- ESLint uses `typescript-eslint`'s non-type-checked `recommended` config, not `recommendedTypeChecked`/`strictTypeChecked` — upgrading is a legitimate future roadmap-adjacent improvement, not a bug.
- Testing config lives inside `vite.config.ts`'s `test` field (not a separate `vitest.config.ts`) so it reuses the same Vite/React plugin setup.
