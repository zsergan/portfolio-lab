# React / TS Learning Sandbox

A personal sandbox for refreshing React and TypeScript knowledge. Each topic that comes up often in real frontend work — and in interviews — gets its own small, interactive demo page you can click through and read the source of.

The full topic backlog lives in [`LEARNING_ROADMAP.md`](./LEARNING_ROADMAP.md): checkboxes grouped by topic (TypeScript, React 19, Hooks, Component Patterns, State Management, Data Fetching, Forms, Routing, Performance, Error Handling, Testing, Accessibility), each with a short description, why it matters in practice, and where it tends to show up in interviews.

## Stack

- **React 19** + **TypeScript** (`strict` mode) on **Vite**
- **react-router** (data router API) for routing
- **CSS Modules** for styling — no other styling library
- **Vitest** + **React Testing Library** for tests
- **Zustand** / **Redux Toolkit** pre-installed for the State Management demos

## Getting started

```bash
npm install
npm run dev
```

Then open the printed local URL — the home page lists every roadmap topic, with built demos linked and unbuilt ones shown greyed out.

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the dev server |
| `npm run build` | Type-check and build for production |
| `npm run lint` | Run ESLint |
| `npm run test` | Run the test suite once |
| `npm run test:watch` | Run tests in watch mode |
| `npm run preview` | Preview the production build locally |

## How the sandbox is organized

`src/features/registry.ts` is the single source of truth for every demo — its id, topic, description, status (`planned`/`done`), route, and (once built) a lazy-loaded component. The home page (`src/pages/SandboxHome.tsx`) renders it grouped by topic. Routing is set up in `src/app/router.tsx` on top of `react-router`'s data router; `src/app/RootLayout.tsx` is the shared shell.

To add a demo for a roadmap item:
1. Build it under `src/features/<topic>/<id>/` (component + `.module.css` + a co-located test).
2. Flip its entry in `src/features/registry.ts` to `status: 'done'` with a `component: () => import(...)` loader.
3. Add its route as a child of the layout route in `src/app/router.tsx`.
4. Check it off in `LEARNING_ROADMAP.md`.

See [`CLAUDE.md`](./CLAUDE.md) for more detail on the architecture and the stack decisions behind it (why strict mode, why the React Compiler is off, etc.) — written for AI coding agents working in this repo, but equally useful as a human reference.
