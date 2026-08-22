# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this project is

A personal portfolio site, meant to be public on GitHub. It has two zones: **Portfolio** (`/`) — about, experience, stack, contact — and **Lab** (`/lab`) — a growing collection of small, self-contained interactive dev tools (JSON formatter, color contrast checker, unit converter, and more as the roadmap progresses). It's a pure frontend app: no real backend, no paid or keyed external APIs. Persistence, where a tool needs it, is localStorage/IndexedDB; any "network" scenario is mocked via MSW or hits a free public API that needs no key.

Under the product surface, this project doubles as the owner's React/TypeScript refresher: each Lab tool is chosen so building it exercises a specific set of interview-relevant patterns (hooks, TS features, state management, data fetching, forms, performance, testing, a11y, component patterns, routing). Code clarity matters more than DRY-ing things up across tools — each tool is meant to be read as much as clicked.

`LEARNING_ROADMAP.md` is the release backlog (checkboxes grouped by release — v0.1, v0.2, ... — each release describing one Lab tool or Portfolio milestone, with a note on which patterns it practices) and `src/lab/registry.ts` is its in-app mirror for the Lab tools — the two must be kept in sync by `id`/title when items are added or completed. Work happens **one release item per session**: pick the next unchecked release, build its tool, wire it up, check the box.

## Permanent rules

These apply to everything in this repository, without exception, because it is (or will become) a public repo:

- **English only, always.** All code, comments, JSDoc, commit messages, README/docs, and any other file that could end up in the public repo must be written in English. Never write Russian (or any non-English text) into a project file.
- **No real backend, no paid or keyed external APIs.** Any "server" behavior in a Lab tool is simulated — via MSW, via localStorage/IndexedDB, or by calling a free public API that requires no API key/token. Never wire up a real backend service or a paid/keyed API.
- **`/private-notes/` is off-limits to product code.** It's gitignored and reserved for the owner's personal, local-only notes. Never place product code, demo content, or anything meant to ship there.
- **Commit at the right granularity.** Each commit should be one coherent, reviewable change — not a giant dump of unrelated edits, and not fragmented into trivial one-liners that only make sense stitched together. Split unrelated concerns (e.g. a docs/process update vs. a feature vs. a bug fix) into separate commits; keep a single feature's implementation together rather than splitting it across commits that don't build or make sense in isolation. Write commit messages that explain *why*, matching this repo's existing message style.

## Commands

- `npm run dev` — start the Vite dev server
- `npm run build` — typecheck (`tsc -b`) then production build
- `npm run lint` — ESLint (flat config, `eslint.config.js`)
- `npm run test` — run the Vitest suite once
- `npm run test:watch` — Vitest in watch mode
- Single test file: `npx vitest run src/pages/LabHome.test.tsx`
- Single test by name: `npx vitest run -t "renders every registered tool title"`

There is no separate `tsc --noEmit` script — type errors surface via `npm run build` or your editor's TS server.

## Architecture

**Registry-driven Lab.** `src/lab/registry.ts` is the single source of truth for every Lab tool: id, title, description, `highlights` (what patterns it demonstrates), `status: 'planned' | 'done'`, route `path`, optional `topics` tags, and (once built) a lazy `component` loader (`() => import('...')`). `src/pages/LabHome.tsx` renders the registry as a card grid at `/lab` — `planned` entries show as non-interactive greyed-out cards, `done` entries are real `<Link>`s. **Adding a tool = four edits, no more:** write the tool component, flip its registry entry to `status: 'done'` with a `component` loader, add its route in `src/app/router.tsx`, check it off in `LEARNING_ROADMAP.md`.

**Portfolio** (`src/pages/PortfolioHome.tsx`) is static content — About/Experience/Stack/Contact — with no registry of its own; it's a single page, not a growing collection.

**Routing** uses `react-router`'s data router (`createBrowserRouter`/`RouterProvider`, wired in `src/main.tsx` → `src/app/router.tsx`). One layout route (`src/app/RootLayout.tsx`, header + nav + `<Outlet/>`) wraps the index route (`PortfolioHome`), the Lab index route (`LabHome` at `/lab`), and a catch-all (`NotFound`). Per-tool routes are added as children of the layout route under `lab/<tool-id>`; use `lazy: () => import(...)` for code-split tool routes rather than eager imports, matching the registry's lazy-loader convention.

**Conventions for a new Lab tool**, once you pick the next roadmap release:
- Place it at `src/lab/<tool-id>/` (id matches the registry entry).
- Styling: CSS Modules (`*.module.css`) — no other styling library is installed; this is the deliberate baseline (see below).
- Co-locate a test next to the component (see `src/pages/LabHome.test.tsx` for the convention: React Testing Library, explicit `import { describe, it, expect } from 'vitest'` rather than relying on Vitest globals).
- Import shared code via the `@/` alias (maps to `src/`, configured in both `tsconfig.app.json` and `vite.config.ts`).

**Deliberate stack decisions** (don't "fix" these without checking in — they're intentional for the learning goal, not oversights):
- TypeScript `strict: true` is on — several roadmap topics (generics, discriminated unions, utility types) are pedagogically hollow without it.
- The React Compiler is **not** enabled, even though the Vite template supports adding it. Manual-memoization topics (`React.memo`, `useMemo`/`useCallback`) need memoization to actually matter for the demo to teach anything.
- `zustand`, `@reduxjs/toolkit`, and `react-redux` are installed but currently unused by any code — they're pre-installed for the future State Playground tool, not dead dependencies to prune.
- ESLint uses `typescript-eslint`'s non-type-checked `recommended` config, not `recommendedTypeChecked`/`strictTypeChecked` — upgrading is a legitimate future roadmap-adjacent improvement, not a bug.
- Testing config lives inside `vite.config.ts`'s `test` field (not a separate `vitest.config.ts`) so it reuses the same Vite/React plugin setup.
