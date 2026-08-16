# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this project is

A personal React/TypeScript learning sandbox, not a production app. The owner is a senior frontend dev refreshing React/TS knowledge after a break. The repo holds one small, interactive demo page per interview-relevant topic (hooks, TS features, state management, data fetching, forms, performance, testing, a11y, component patterns, routing). Each demo is meant to be read as much as clicked — code clarity matters more than DRY-ing things up across demos.

`LEARNING_ROADMAP.md` is the topic backlog (checkboxes grouped by topic, each with a description/why-it-matters/interview-overlap note) and `src/features/registry.ts` is its in-app mirror — the two must be kept in sync by `id`/title when items are added or completed. Work happens **one roadmap item per session**: pick an unchecked item, build its demo, wire it up, check the box.

## Commands

- `npm run dev` — start the Vite dev server
- `npm run build` — typecheck (`tsc -b`) then production build
- `npm run lint` — ESLint (flat config, `eslint.config.js`)
- `npm run test` — run the Vitest suite once
- `npm run test:watch` — Vitest in watch mode
- Single test file: `npx vitest run src/pages/SandboxHome.test.tsx`
- Single test by name: `npx vitest run -t "renders every topic section heading"`

There is no separate `tsc --noEmit` script — type errors surface via `npm run build` or your editor's TS server.

## Architecture

**Registry-driven routing.** `src/features/registry.ts` is the single source of truth for every demo: id, title, topic, description, interview notes, `status: 'planned' | 'done'`, route `path`, and (once built) a lazy `component` loader (`() => import('...')`). `src/pages/SandboxHome.tsx` renders the registry grouped by topic — `planned` entries show as non-interactive greyed-out cards, `done` entries are real `<Link>`s. **Adding a feature = four edits, no more:** write the demo component, flip its registry entry to `status: 'done'` with a `component` loader, add its route in `src/app/router.tsx`, check it off in `LEARNING_ROADMAP.md`.

**Routing** uses `react-router`'s data router (`createBrowserRouter`/`RouterProvider`, wired in `src/main.tsx` → `src/app/router.tsx`). One layout route (`src/app/RootLayout.tsx`, header + `<Outlet/>`) wraps an index route (`SandboxHome`) and a catch-all (`NotFound`). Per-feature routes are added as children of the layout route; use `lazy: () => import(...)` for code-split demo routes rather than eager imports, matching the registry's lazy-loader convention.

**Conventions for a new demo**, once you pick a roadmap item:
- Place it at `src/features/<topic>/<id>/` (topic/id match the registry entry).
- Styling: CSS Modules (`*.module.css`) — no other styling library is installed; this is the deliberate baseline (see below).
- Co-locate a test next to the component (see `src/pages/SandboxHome.test.tsx` for the convention: React Testing Library, explicit `import { describe, it, expect } from 'vitest'` rather than relying on Vitest globals).
- Import shared code via the `@/` alias (maps to `src/`, configured in both `tsconfig.app.json` and `vite.config.ts`).

**Deliberate stack decisions** (don't "fix" these without checking in — they're intentional for the learning goal, not oversights):
- TypeScript `strict: true` is on — several roadmap topics (generics, discriminated unions, utility types) are pedagogically hollow without it.
- The React Compiler is **not** enabled, even though the Vite template supports adding it. Manual-memoization topics (`React.memo`, `useMemo`/`useCallback`) need memoization to actually matter for the demo to teach anything.
- `zustand`, `@reduxjs/toolkit`, and `react-redux` are installed but currently unused by any code — they're pre-installed for the future State Management demos, not dead dependencies to prune.
- ESLint uses `typescript-eslint`'s non-type-checked `recommended` config, not `recommendedTypeChecked`/`strictTypeChecked` — upgrading is a legitimate future roadmap-adjacent improvement, not a bug.
- Testing config lives inside `vite.config.ts`'s `test` field (not a separate `vitest.config.ts`) so it reuses the same Vite/React plugin setup.
