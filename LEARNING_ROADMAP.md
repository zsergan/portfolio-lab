# Learning Roadmap

A backlog of React/TypeScript topics that come up constantly in real frontend work and in interviews. Each item becomes a small, self-contained demo page in this app.

**How to use this:**
1. Pick one unchecked item.
2. Build its demo under `src/features/<topic>/<id>/` (a component + a `.module.css` + a co-located test).
3. Add a lazy route for it in `src/app/router.tsx`.
4. Flip its entry in `src/features/registry.ts` to `status: 'done'` and point `component` at the new file.
5. Check the box below.

Each item lists a short description, why it matters in practice, and where it tends to show up in interviews or real tasks.

---

## TypeScript

- [ ] **Generics** — Reusable, type-safe functions and components via generic type parameters.
  *Why it matters:* lets you write one `useLocalStorage<T>` instead of a copy per data shape, without falling back to `any`.
  *Interview overlap:* classic "write a generic `useFetch`/`useLocalStorage` hook" live-coding prompt.
- [ ] **Utility Types** — `Partial`, `Pick`, `Omit`, `Record`, `ReturnType` and friends applied to real props/state shapes.
  *Why it matters:* avoids hand-duplicated types that drift out of sync with the source type.
  *Interview overlap:* tests whether you reach for built-ins instead of re-declaring near-identical interfaces.
- [ ] **Discriminated Unions** — Modeling state (`loading` / `error` / `success`) as a tagged union instead of loose booleans.
  *Why it matters:* makes impossible states (e.g. `loading: true` *and* `data` present) unrepresentable.
  *Interview overlap:* directly maps to "how do you model async state" and exhaustiveness-check questions.
- [ ] **`satisfies` Operator** — Validating an object literal against a type without widening or losing literal inference.
  *Why it matters:* keeps literal types (e.g. for autocompletion) while still getting type-checking against a shape.
  *Interview overlap:* a newer TS feature interviewers use to check if your knowledge is current.
- [ ] **Template Literal Types** — Building string-pattern types, e.g. typed event names or CSS-variable keys.
  *Why it matters:* catches typos in string-based APIs (routes, event names, i18n keys) at compile time.
  *Interview overlap:* comes up in typed-routing and design-token discussions.
- [ ] **Conditional & Mapped Types** — Deriving new types from existing ones with `extends`/`infer` and key remapping.
  *Why it matters:* the mechanism behind most utility types you already use.
  *Interview overlap:* "how would you type a deep `Partial`/`Readonly`" is a common senior-level probe.
- [ ] **Type Narrowing & Guards** — Custom type predicates (`is`), `in`/`instanceof` checks, exhaustive switch narrowing.
  *Why it matters:* lets TS track which branch of a union you're in, instead of casting.
  *Interview overlap:* shows up any time union types meet runtime branching logic.
- [ ] **`as const`** — Locking literal types and readonly-ness for config objects and "enum-as-array" values.
  *Why it matters:* a common, lighter-weight alternative to TS `enum`.
  *Interview overlap:* interviewers ask why you'd prefer `as const` over `enum`.
- [ ] **Module Augmentation** — Extending third-party types (e.g. adding custom props to a library component).
  *Why it matters:* practical for typing CSS Modules, env vars, or patching a vendor library's types.
  *Interview overlap:* less commonly asked directly, but a real skill gap for most mid-level devs.

## React 19

- [ ] **Actions & `useActionState`** — Form submission with built-in pending state and returned errors, no manual `useState` wiring.
  *Why it matters:* removes a lot of boilerplate around form-submission loading/error state.
  *Interview overlap:* the newest way to answer "how do you handle form submission state".
- [ ] **`useOptimistic`** — Showing an optimistic UI update while a mutation is still in flight.
  *Why it matters:* makes UI feel instant without hand-rolling rollback logic.
  *Interview overlap:* ties directly into the "optimistic updates" data-fetching topic below.
- [ ] **The `use()` Hook** — Reading a promise or context conditionally, inside render.
  *Why it matters:* enables conditional data/context reads that hooks-rules previously forbade.
  *Interview overlap:* distinguishes candidates who kept up with React 19 vs stuck on React 18 patterns.
- [ ] **`ref` as a Prop** — Passing `ref` directly to function components without `forwardRef`.
  *Why it matters:* simplifies a very commonly-built pattern (imperative handles, focus management).
  *Interview overlap:* likely to replace "explain `forwardRef`" as the standard question.
- [ ] **Document Metadata** — Rendering `<title>`/`<meta>` directly from components, auto-hoisted to `<head>`.
  *Why it matters:* replaces the need for `react-helmet` in many SPAs.
  *Interview overlap:* niche but worth knowing it exists, especially for SEO-adjacent discussions.
- [ ] **Server Components (conceptual)** — Read-only overview of what RSC changes about data fetching/bundling. Not runnable in this Vite SPA — a notes/diagram page, not a live demo.
  *Why it matters:* even non-Next.js teams get asked about it; understanding the mental model matters more than hands-on use here.
  *Interview overlap:* frequently asked conceptually regardless of whether the team actually uses RSC.

## Hooks

- [ ] **`useReducer`** — Managing complex local state transitions with a reducer instead of many `useState` calls.
  *Why it matters:* keeps related state transitions colocated and testable as pure functions.
  *Interview overlap:* tests when `useState` stops scaling, and how reducers relate to Redux.
- [ ] **`useMemo` / `useCallback`** — Memoizing expensive computations and stable function identities, and when it actually helps.
  *Why it matters:* prevents wasted recomputation/re-renders — but only when used correctly.
  *Interview overlap:* one of the most-asked "when would you NOT use this" performance questions.
- [ ] **`useRef`** — DOM node access plus mutable values that persist across renders without triggering one.
  *Why it matters:* the escape hatch for imperative DOM work and non-rendering mutable state.
  *Interview overlap:* checks understanding of the render vs mutation distinction.
- [ ] **Custom Hooks** — Extracting reusable stateful logic (e.g. `useDebounce`, `useToggle`) from components.
  *Why it matters:* the primary React 16.8+ mechanism for sharing logic without HOCs/render props.
  *Interview overlap:* almost every senior interview includes "build a custom hook for X".
- [ ] **`useImperativeHandle`** — Exposing a controlled imperative API (e.g. `focus()`, `reset()`) from a child to a parent ref.
  *Why it matters:* the right tool when a parent genuinely needs to command a child imperatively.
  *Interview overlap:* comes up with custom form controls, video players, modal dialogs.
- [ ] **`useLayoutEffect` vs `useEffect`** — Timing differences and when a synchronous DOM read/write before paint matters.
  *Why it matters:* avoids visual flicker bugs caused by using the wrong one.
  *Interview overlap:* a classic "explain the difference" question that trips up mid-level candidates.
- [ ] **`useTransition` / `useDeferredValue`** — Marking updates as non-urgent to keep typing/interactions responsive under load.
  *Why it matters:* smooths out UI under heavy re-render load without debouncing hacks.
  *Interview overlap:* a concurrent-React feature interviewers use to probe for React 18+ knowledge.
- [ ] **`useSyncExternalStore`** — Subscribing to external (non-React) state sources safely under concurrent rendering.
  *Why it matters:* what libraries like Zustand/Redux use under the hood to stay tear-free.
  *Interview overlap:* good "how does X library work internally" answer.
- [ ] **`useId`** — Generating stable, unique IDs for accessible label/input pairing across server and client renders.
  *Why it matters:* avoids ID collisions and hydration mismatches from hand-rolled IDs.
  *Interview overlap:* small but real a11y-adjacent hook, easy to forget exists.

## Component Patterns

- [ ] **Compound Components** — A parent + implicit-context children API, e.g. `<Tabs><Tabs.Tab/></Tabs>`.
  *Why it matters:* gives consumers layout flexibility while keeping shared state internal.
  *Interview overlap:* a common "design a component API" exercise (build your own `<Select>`).
- [ ] **Render Props** — Sharing behavior by passing a function as a child/prop that returns JSX.
  *Why it matters:* an older but still-encountered reuse mechanism, useful to recognize in legacy code.
  *Interview overlap:* useful contrast against hooks-based reuse in "compare these patterns" questions.
- [ ] **Controlled vs Uncontrolled** — Same input built two ways: state-driven value vs ref-read DOM value.
  *Why it matters:* affects re-render frequency and how validation/reset logic is written.
  *Interview overlap:* extremely common form-related interview question; also ties into react-hook-form.
- [ ] **Headless Components** — Logic-only components/hooks that render nothing themselves; consumers supply the UI.
  *Why it matters:* the separation of behavior from markup that makes a component reusable across designs.
  *Interview overlap:* explains how libraries like Radix/Headless UI/react-table are built.
- [ ] **Slot / Children Composition** — Using `children`/named slot props instead of config props to compose layout.
  *Why it matters:* avoids config-prop explosion for layout-heavy components.
  *Interview overlap:* "how do you avoid prop-drilling config into a layout component" answer.
- [ ] **Polymorphic Components (`as` prop)** — A component that renders as a different element/tag via an `as` prop, fully typed.
  *Why it matters:* lets a design-system `<Text as="h2">` stay semantic without prop duplication.
  *Interview overlap:* advanced TS + component-design combo; ties back to generics.
- [ ] **Higher-Order Components** — A function that wraps a component to inject props or behavior (e.g. `withAuth`).
  *Why it matters:* legacy but still-referenced pattern, useful to recognize and to compare against hooks.
  *Interview overlap:* "why would you use a hook instead of an HOC now" comparison question.

## State Management

- [ ] **Context API** — Sharing state across a subtree without prop drilling, and its re-render pitfalls.
  *Why it matters:* the built-in baseline every app reaches for first; knowing its limits matters more than using it.
  *Interview overlap:* baseline every React interview expects; also sets up the comparison item below.
- [ ] **Zustand** — Minimal external store with selector-based subscriptions, no boilerplate.
  *Why it matters:* solves Context's re-render-everything problem with almost no ceremony.
  *Interview overlap:* increasingly the "lightweight Redux alternative" teams ask about.
- [ ] **Redux Toolkit** — Slices, `createSlice`, and the modern, boilerplate-light way to write Redux.
  *Why it matters:* still the most-referenced state library in job postings; RTK is the current idiomatic way to write it.
  *Interview overlap:* expect "have you used Redux/RTK" in most mid-to-large-company interviews.
- [ ] **Context vs Zustand vs Redux Toolkit** — Same small app (e.g. a cart) implemented three ways, compared side by side.
  *Why it matters:* makes the tradeoffs (boilerplate, re-renders, devtools, testability) concrete instead of theoretical.
  *Interview overlap:* directly answers the "how do you choose a state management approach" discussion question.
- [ ] **Derived State & Selectors** — Computing values from state instead of storing them, plus memoized selector patterns.
  *Why it matters:* most "state out of sync" bugs trace back to storing something that should've been derived.
  *Interview overlap:* a good signal question: "where would you store the cart total?"

## Data Fetching

- [ ] **TanStack Query Basics** — Declarative fetching with automatic loading/error state and background refetching.
  *Why it matters:* removes hand-rolled `useEffect` + `useState` fetch boilerplate and its race-condition bugs.
  *Interview overlap:* the current industry-standard answer to "how do you handle server state".
- [ ] **Caching & Invalidation** — Query keys, `staleTime`/`gcTime`, and invalidating queries after a mutation.
  *Why it matters:* where most real-world "stale data after I saved" bugs live.
  *Interview overlap:* a very common follow-up once you say "I use React Query".
- [ ] **Optimistic Updates** — Updating the UI before the server confirms, with rollback on failure.
  *Why it matters:* makes mutations feel instant instead of waiting on a round-trip.
  *Interview overlap:* common "how would you make this feel instant" system-design-ish question.
- [ ] **Pagination & Infinite Queries** — Page-based and cursor-based fetching, plus infinite-scroll loading.
  *Why it matters:* almost every list-heavy app needs one of these two patterns.
  *Interview overlap:* practical, very frequently built in take-home assignments.
- [ ] **Suspense-Integrated Fetching** — Using `useSuspenseQuery` so loading states are handled by a Suspense boundary.
  *Why it matters:* consolidates loading UI at the boundary instead of scattering `isLoading` checks.
  *Interview overlap:* ties data fetching directly into the Error Handling / Suspense topic below.

## Forms

- [ ] **react-hook-form Basics** — Uncontrolled-by-default form state with `register`/`handleSubmit` and minimal re-renders.
  *Why it matters:* the most commonly used form library in current job listings; drastically less boilerplate than manual controlled forms.
  *Interview overlap:* expect "have you used react-hook-form (or similar)" directly.
- [ ] **Zod Schema Validation** — Defining a validation schema once and deriving both types and runtime checks from it.
  *Why it matters:* keeps form validation and TypeScript types from drifting apart.
  *Interview overlap:* "how do you keep validation and TS types in sync" is a very common question.
- [ ] **Controlled vs Uncontrolled Inputs (in forms)** — When RHF still needs a `Controller` wrapper (e.g. for custom/library inputs).
  *Why it matters:* the practical case where the component-patterns version of this topic actually bites you.
  *Interview overlap:* follow-up once you claim RHF experience: "how do you wire a custom `<DatePicker>` into it?"
- [ ] **Dynamic Field Arrays** — Add/remove/reorder repeating form sections with `useFieldArray`.
  *Why it matters:* the standard way to handle "add another item" forms without hand-rolled array state.
  *Interview overlap:* a common take-home task: "build a form where users can add multiple X".

## Routing

- [ ] **Nested Routes** — Layout routes with `<Outlet/>` rendering matched child routes.
  *Why it matters:* keeps shared chrome (nav, headers) out of every individual page.
  *Interview overlap:* this scaffold already uses the pattern for its own layout — this demo makes it explicit and interactive.
- [ ] **Dynamic Route Params** — Reading `:id`-style segments and query params with `useParams`/`useSearchParams`.
  *Why it matters:* needed for virtually any list/detail-page flow.
  *Interview overlap:* comes up in nearly every routing-related take-home task.
- [ ] **Loaders & Actions** — Fetching data before a route renders, and handling form submissions via route actions.
  *Why it matters:* React Router's built-in answer to "load data before this page shows".
  *Interview overlap:* good to contrast against TanStack Query's client-cache approach.
- [ ] **Protected Routes** — Redirecting unauthenticated users away from a route, and back after login.
  *Why it matters:* nearly every real app needs this exact pattern.
  *Interview overlap:* frequently asked as a design question, even without a live-coding component.
- [ ] **Route-Based Code Splitting** — Lazy-loading route components so each route ships its own JS chunk.
  *Why it matters:* keeps the initial bundle small as an app's route count grows — this scaffold's own registry is built around this idea.
  *Interview overlap:* directly connects routing to the Performance topic below.

## Performance

- [ ] **`React.memo`** — Skipping re-renders of a component when its props are shallow-equal.
  *Why it matters:* a targeted fix for a component that re-renders too often for no visible reason.
  *Interview overlap:* "when does `memo` NOT help" is the real question behind this one.
- [ ] **`useMemo`/`useCallback` Deep Dive** — Measuring before/after with React DevTools Profiler to prove memoization actually helped.
  *Why it matters:* separates "I memoized it" from "I confirmed it mattered".
  *Interview overlap:* separates candidates who measure from candidates who memoize everything by reflex.
- [ ] **Code Splitting & `React.lazy`** — Splitting a heavy component into its own chunk, loaded on demand behind Suspense.
  *Why it matters:* the standard bundle-size-reduction technique for rarely-used, heavy UI (e.g. a rich text editor).
  *Interview overlap:* standard answer in performance interview questions.
- [ ] **List Virtualization** — Rendering only visible rows of a long list, e.g. with `react-window`.
  *Why it matters:* the only real fix once a list gets into the thousands of rows.
  *Interview overlap:* "how would you render 10,000 rows" is an extremely common performance prompt.
- [ ] **Profiling with React DevTools** — Reading flamegraphs to find which component re-rendered and why.
  *Why it matters:* the actual workflow for diagnosing perf issues, instead of guessing.
  *Interview overlap:* a practical skill interviewers sometimes ask you to demonstrate live.
- [ ] **React Compiler vs Manual Memoization** — Toggling the React Compiler on this exact sandbox and comparing generated behavior against the hand-memoized demos above.
  *Why it matters:* the ecosystem is actively shifting toward auto-memoization; worth understanding what it changes and what it doesn't.
  *Interview overlap:* a forward-looking topic that signals you're tracking where React is headed.

## Error Handling

- [ ] **Error Boundaries** — Catching render-time errors in a subtree and showing a fallback UI instead of a blank screen.
  *Why it matters:* the only way to contain a render-time crash in React — `try/catch` doesn't work for this.
  *Interview overlap:* "what does `try/catch` NOT catch in React" is the classic lead-in question.
- [ ] **Suspense for Data** — Using Suspense boundaries to show fallback UI while data-fetching promises resolve.
  *Why it matters:* consolidates loading UI handling with the same mechanism used for code splitting.
  *Interview overlap:* bridges Error Handling and Data Fetching topics — commonly asked about together.
- [ ] **Granular vs Global Boundaries** — Placing boundaries per-widget vs per-page/app, and the UX tradeoffs of each.
  *Why it matters:* a real architecture decision that affects blast radius when something breaks.
  *Interview overlap:* "would you put one boundary or many" comes up often in system-design-style questions.
- [ ] **Retry & Fallback UX** — Giving a failed boundary/query a "try again" action instead of a dead end.
  *Why it matters:* turns a crash into a recoverable moment instead of a lost user.
  *Interview overlap:* the natural follow-up after "how do you handle errors": "...and then what?"

## Testing

- [ ] **RTL Basics** — `render`/`screen`/`userEvent`, and querying by role/text the way a user would.
  *Why it matters:* the standard component-testing approach for React apps today.
  *Interview overlap:* baseline expectation for any team that writes component tests.
- [ ] **Mocking Network & Modules** — Intercepting requests with MSW, and mocking modules/timers with Vitest.
  *Why it matters:* lets tests exercise real fetch-driven components without hitting a real network.
  *Interview overlap:* "how do you test a component that fetches data" is a near-universal ask.
- [ ] **Testing Custom Hooks** — Using `renderHook` to test hook logic in isolation from any component.
  *Why it matters:* faster, more focused tests once logic has been extracted into a custom hook.
  *Interview overlap:* the natural follow-up once you have custom hooks: "how would you unit test just the hook".
- [ ] **Testing Async Flows & Forms** — Awaiting `findBy*` queries and simulating multi-step form submission with validation errors.
  *Why it matters:* covers the failure mode (flaky async tests) that trips up most teams.
  *Interview overlap:* where most flaky-test interview war-stories come from — good to practice deliberately.

## Accessibility

- [ ] **Semantic HTML** — Choosing the right element (`button` vs `div`, `nav`, landmark regions) before reaching for ARIA.
  *Why it matters:* gets you correct keyboard/screen-reader behavior for free, no ARIA required.
  *Interview overlap:* "why not just use a `div` with `onClick`" is a very common a11y interview question.
- [ ] **ARIA Roles & Labels** — Adding roles/labels only where semantic HTML falls short (custom widgets).
  *Why it matters:* ARIA fixes gaps semantic HTML can't cover — but misused ARIA is worse than none.
  *Interview overlap:* tests whether you know ARIA is a last resort, not a first reach.
- [ ] **Focus Management** — Moving focus correctly when opening a modal, after a route change, or on error.
  *Why it matters:* the single most common a11y bug in custom-built widgets.
  *Interview overlap:* a practical skill most "build a modal" take-homes silently grade you on.
- [ ] **Keyboard Navigation** — Full keyboard operability for a custom widget (tabs, menus, dialogs) without a mouse.
  *Why it matters:* required for anyone who can't or doesn't use a mouse — not optional.
  *Interview overlap:* "can you use this with just a keyboard" is a real, easy live-demo interview check.
- [ ] **Accessible Forms** — Label association, error announcement (`aria-live`), and describing fields with `aria-describedby`.
  *Why it matters:* the most common real-world a11y requirement, and easy to get subtly wrong.
  *Interview overlap:* combines the Forms and Accessibility topics — a common real-world requirement.
- [ ] **Color Contrast Basics** — Checking text/background contrast ratios against WCAG AA using this app's own theme tokens.
  *Why it matters:* a11y isn't only markup — visual design choices (like this app's own CSS variables) can fail contrast too.
  *Interview overlap:* shows a11y awareness extends beyond markup into visual design decisions.
