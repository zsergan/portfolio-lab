# Portfolio & Lab

[![CI](https://github.com/zsergan/portfolio-lab/actions/workflows/ci.yml/badge.svg)](https://github.com/zsergan/portfolio-lab/actions/workflows/ci.yml)

A personal portfolio site with two zones:

- **Portfolio** — About (`/`), Experience (`/experience`), and Contact
  (`/contact`).
- **Lab** (`/lab`) — a growing collection of small, focused dev tools that
  run entirely in your browser. No accounts, no real backend — persistence
  (where a tool needs it) is localStorage/IndexedDB, and any "network"
  behavior is either mocked or hits a free public API that needs no key.

## Stack

- **React 19** + **TypeScript** (`strict` mode) on **Vite**
- **react-router** (data router API) for routing
- **CSS Modules** for styling — no other styling library
- **Vitest** + **React Testing Library** for tests
- **Zustand** / **Redux Toolkit** — installed for an upcoming Lab tool

## Getting started

```bash
npm install
npm run dev
```

Then open the printed local URL. `/` is the About page (with Experience and
Contact alongside it); `/lab` lists every tool, with built ones linked and
upcoming ones shown greyed out.

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the dev server |
| `npm run build` | Type-check and build for production |
| `npm run lint` | Run ESLint |
| `npm run test` | Run the test suite once |
| `npm run test:watch` | Run tests in watch mode |
| `npm run preview` | Preview the production build locally |

## Lab tools

| Tool | Status |
|---|---|
| JSON Formatter & Validator | Planned |
| Color Contrast Checker | Planned |
| Unit Converter | Planned |
| Form Builder Playground | Planned |
| Snippet Vault | Planned |
| Bookmark Manager | Planned |
| CSV/JSON Table Viewer | Planned |
| State Playground | Planned |
| UI Patterns Gallery | Planned |
| TypeScript Pattern Reference | Planned |

## Roadmap

- **v0.1** — Portfolio page + Lab index + JSON Formatter, Color Contrast
  Checker, Unit Converter
- **v0.2** — Form Builder Playground
- **v0.3** — Snippet Vault
- **v0.4** — Bookmark Manager
- **v0.5** — CSV/JSON Table Viewer
- **v0.6** — State Playground
- **v0.7** — UI Patterns Gallery
- **v0.8** — TypeScript Pattern Reference

## How the Lab is organized

`src/lab/registry.ts` is the single source of truth for every tool — its
id, description, status (`planned`/`done`), route, and (once built) a
lazy-loaded component. The Lab index page (`src/pages/LabHome/LabHome.tsx`) renders
it as a card grid. Routing is set up in `src/app/router.tsx` on top of
`react-router`'s data router; `src/app/RootLayout.tsx` is the shared shell.

See [`CLAUDE.md`](./CLAUDE.md) for more detail on the architecture and the
stack decisions behind it — written for AI coding agents working in this
repo, but equally useful as a human reference.
