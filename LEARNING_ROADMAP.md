# Roadmap

This is the working backlog for the site, grouped by release. Each release
ships one coherent Lab tool (or, for v0.1, the Portfolio section itself).
Under each tool is the list of React/TypeScript topics building it gives
you a reason to practice, with a short **Hint** on which API/approach to
reach for. Check topics off individually as you actually use the pattern,
and check the tool's own box once it's fully built and wired up.

**How to use this:**
1. Pick the next release with unchecked topics.
2. Build its tool under `src/lab/<tool-id>/` (a component + a `.module.css`
   + a co-located test), using the listed topics/hints as you go.
3. Add a lazy route for it in `src/app/router.tsx`.
4. Flip its entry in `src/lab/registry.ts` to `status: 'done'` and point
   `component` at the new file.
5. Check the topic boxes and the tool box below.

Work happens one release item per session.

---

## v0.1 — MVP

- [x] **Portfolio page** — static About / Experience / Stack / Contact
  sections at `/`. Placeholder copy for now; real bio/links to be filled in.
- [x] **Lab index shell** — tool listing at `/lab`, planned/done card
  pattern.

### JSON Formatter & Validator (`/lab/json-formatter`)
Pretty-print, minify, and validate JSON with inline error feedback.
- [ ] **Discriminated Unions** — model the tool's state as a tagged union
  so an impossible state can't be represented.
  *Hint:* `type FormatState = { status: 'idle' } | { status: 'valid'; formatted: string } | { status: 'error'; message: string }`, narrow with `switch (state.status)`.
- [ ] **`useMemo`** — don't reformat on every keystroke.
  *Hint:* `const formatted = useMemo(() => { try { return JSON.stringify(JSON.parse(input), null, 2) } catch (e) { ... } }, [input])`.

### Color Contrast Checker (`/lab/color-contrast-checker`)
Compare two colors against WCAG AA/AAA contrast ratio thresholds.
- [ ] **Color Contrast Basics** — compute the WCAG contrast ratio.
  *Hint:* relative-luminance formula → `ratio = (L1 + 0.05) / (L2 + 0.05)`; compare against 4.5 (AA) / 7 (AAA).
- [ ] **Controlled Inputs** — two color pickers driven by state.
  *Hint:* `<input type="color" value={fg} onChange={(e) => setFg(e.target.value)} />`.

### Unit Converter (`/lab/unit-converter`)
Convert between length, weight, and temperature units.
- [ ] **Generics** — one type-safe converter instead of one per category.
  *Hint:* `function convert<C extends UnitCategory>(value: number, from: Unit<C>, to: Unit<C>): number`.
- [ ] **Utility Types** — derive unit metadata from one source type.
  *Hint:* `type UnitLabels = Record<Unit, string>`, `Pick<UnitConfig, 'factor' | 'label'>`.

## v0.2 — Form Builder Playground

Assemble a multi-field form and preview live validation as you type
(`/lab/form-builder-playground`).
- [ ] **react-hook-form Basics** — uncontrolled-by-default form state.
  *Hint:* `const { register, handleSubmit } = useForm<FormValues>()`.
- [ ] **Zod Schema Validation** — one schema drives validation and types.
  *Hint:* `useForm({ resolver: zodResolver(schema) })`, `type FormValues = z.infer<typeof schema>`.
- [ ] **Controlled vs Uncontrolled Inputs (in forms)** — wrap a custom
  input for RHF.
  *Hint:* `<Controller control={control} name="color" render={({ field }) => <ColorPicker {...field} />} />`.
- [ ] **Dynamic Field Arrays** — add/remove/reorder repeating sections.
  *Hint:* `const { fields, append, remove } = useFieldArray({ control, name: 'items' })`.
- [ ] **Actions & `useActionState`** — submission with built-in
  pending/error state.
  *Hint:* `const [state, formAction, isPending] = useActionState(submitAction, initialState)`.
- [ ] **Accessible Forms** — errors announced to assistive tech.
  *Hint:* `<span id="email-error" role="alert">…</span>`, `<input aria-describedby="email-error" aria-invalid={!!error} />`.

## v0.3 — Snippet Vault

Save, search, and tag reusable code snippets, persisted in IndexedDB, with a
"sync" action mocked via MSW (`/lab/snippet-vault`).
- [ ] **TanStack Query Basics** — declarative fetching.
  *Hint:* `useQuery({ queryKey: ['snippets'], queryFn: fetchSnippets })`.
- [ ] **Caching & Invalidation** — invalidate after a mutation.
  *Hint:* `useMutation({ onSuccess: () => queryClient.invalidateQueries({ queryKey: ['snippets'] }) })`.
- [ ] **Optimistic Updates** — update the UI before the mock confirms.
  *Hint:* `useMutation({ onMutate, onError: (err, vars, ctx) => queryClient.setQueryData(['snippets'], ctx.previous) })`.
- [ ] **Pagination & Infinite Queries** — page through saved snippets.
  *Hint:* `useInfiniteQuery({ queryKey, queryFn, getNextPageParam })`.
- [ ] **Suspense-Integrated Fetching** — loading via a Suspense boundary.
  *Hint:* `useSuspenseQuery(...)` inside `<Suspense fallback={<Spinner />}>`.
- [ ] **Error Boundaries** — catch render-time errors.
  *Hint:* React has no hook for this — a small class component with
  `static getDerivedStateFromError()`, or the `react-error-boundary`
  package.
- [ ] **Suspense for Data** — fallback UI while a fetch resolves.
  *Hint:* same `<Suspense>` boundary as the query above, one mechanism for
  both loading and code-splitting.
- [ ] **Granular vs Global Boundaries** — boundary placement tradeoffs.
  *Hint:* one `<ErrorBoundary>` around the snippet list, a separate one
  around the whole page shell — compare what breaks vs. what survives.
- [ ] **Retry & Fallback UX** — a real "try again" action.
  *Hint:* `<button onClick={() => refetch()}>Try again</button>`, or the
  boundary's `resetErrorBoundary()`.
- [ ] **Mocking Network & Modules** — no real network calls.
  *Hint:* `http.get('/api/snippets', () => HttpResponse.json(data))` in
  `src/mocks/handlers.ts`; `setupServer(...handlers)` in tests, MSW's
  browser `worker.start()` in dev.

## v0.4 — Bookmark Manager

List/detail bookmark manager behind a locally simulated login
(`/lab/bookmark-manager`).
- [ ] **Nested Routes** — shared chrome for list + detail.
  *Hint:* `{ path: 'bookmark-manager', element: <BookmarkLayout />, children: [{ index: true, element: <BookmarkList /> }, { path: ':id', element: <BookmarkDetail /> }] }`.
- [ ] **Dynamic Route Params** — read the bookmark id from the URL.
  *Hint:* `const { id } = useParams<{ id: string }>()`.
- [ ] **Loaders & Actions** — fetch before render, submit via route action.
  *Hint:* `{ path: ':id', loader: bookmarkLoader, action: bookmarkAction }`, read with `useLoaderData()`.
- [ ] **Protected Routes** — gate the manager behind a fake login.
  *Hint:* a wrapper route element checking a `localStorage` token,
  `<Navigate to="/lab/bookmark-manager/login" replace />` if missing.
- [ ] **Route-Based Code Splitting** — its own JS chunk.
  *Hint:* `{ path: 'lab/bookmark-manager', lazy: () => import('../lab/bookmark-manager/route') }`.

## v0.5 — CSV/JSON Table Viewer

Paste a dataset and browse it as a virtualized table
(`/lab/csv-json-table-viewer`).
- [ ] **`React.memo`** — skip re-rendering unchanged rows.
  *Hint:* `export const Row = memo(function Row({ data }: RowProps) { ... })`.
- [ ] **`useMemo`/`useCallback` Deep Dive** — prove memoization helped.
  *Hint:* memoize parsed rows/columns, then record before/after in the
  React DevTools Profiler tab.
- [ ] **Code Splitting & `React.lazy`** — load the viewer on demand.
  *Hint:* `const TableViewer = lazy(() => import('./TableViewer'))` behind
  `<Suspense>`.
- [ ] **List Virtualization** — only render visible rows.
  *Hint:* `react-window`'s `<FixedSizeList height={600} itemCount={rows.length} itemSize={32}>{Row}</FixedSizeList>` (new, free dependency — no key required).
- [ ] **Profiling with React DevTools** — read the flamegraph.
  *Hint:* Profiler tab → record a scroll/filter interaction → check which
  rows actually re-rendered.
- [ ] **React Compiler vs Manual Memoization** — comparison note only, not
  a live toggle.
  *Hint:* a short written comparison in the tool's "About" panel — the
  compiler stays off project-wide (see `CLAUDE.md`).

## v0.6 — State Playground

The same small task board implemented three ways (`/lab/state-playground`).
- [ ] **Context API** — share state across the board subtree.
  *Hint:* `const TaskContext = createContext<TaskStore | null>(null)`, a
  provider wrapping the board, `useContext(TaskContext)` in children.
- [ ] **Zustand** — a minimal external store.
  *Hint:* `const useTaskStore = create<TaskStore>()((set) => ({ tasks: [], addTask: (t) => set((s) => ({ tasks: [...s.tasks, t] })) }))`.
- [ ] **Redux Toolkit** — slices, `createSlice`.
  *Hint:* `const taskSlice = createSlice({ name: 'tasks', initialState, reducers: { addTask } })`, `configureStore({ reducer: taskSlice.reducer })`.
- [ ] **Context vs Zustand vs Redux Toolkit** — compared side by side.
  *Hint:* a tab switcher rendering the same task-board UI against each of
  the three stores above.
- [ ] **Derived State & Selectors** — compute, don't store.
  *Hint:* a `doneCount` selector (`useMemo` for Context, a selector
  function for Zustand, `createSelector` — bundled with RTK — for Redux).

## v0.7 — UI Patterns Gallery

A gallery of reusable component patterns: tabs, menus, and typed
polymorphic text (`/lab/ui-patterns-gallery`).
- [ ] **Compound Components** — implicit shared state via context.
  *Hint:* `<Tabs><Tabs.Tab>...</Tabs.Tab></Tabs>` where `Tabs.Tab = Tab`,
  both reading a `TabsContext`.
- [ ] **Render Props** — behavior shared via a function-as-prop.
  *Hint:* `<DataList items={items} render={(item) => <Row item={item} />} />`.
- [ ] **Headless Components** — logic-only, no rendered markup.
  *Hint:* a `useDisclosure()` hook returning `{ isOpen, open, close }`;
  consumers render their own markup around it.
- [ ] **Slot / Children Composition** — `children` instead of config props.
  *Hint:* `<Card><Card.Header /><Card.Body /></Card>`.
- [ ] **Polymorphic Components (`as` prop)** — one component, many tags.
  *Hint:* `type PolymorphicProps<E extends ElementType> = { as?: E } & ComponentPropsWithoutRef<E>`.
- [ ] **Higher-Order Components** — wrap a component to inject behavior.
  *Hint:* `function withAuth<P extends object>(Component: ComponentType<P>) { return (props: P) => (...) }`.
- [ ] **`ref` as a Prop** — no `forwardRef` needed.
  *Hint:* `function TextInput({ ref, ...props }: TextInputProps & { ref?: Ref<HTMLInputElement> })`.
- [ ] **`useImperativeHandle`** — expose a controlled imperative API.
  *Hint:* `useImperativeHandle(ref, () => ({ focus: () => inputRef.current?.focus() }))`.
- [ ] **`useId`** — stable label/input ids.
  *Hint:* `const id = useId()`, `<label htmlFor={id}>`/`<input id={id}>`.
- [ ] **Focus Management** — move focus on open/close.
  *Hint:* `useRef` + `.focus()` inside a `useEffect` that runs when a
  dialog opens; return focus to the trigger on close.
- [ ] **Keyboard Navigation** — full keyboard operability.
  *Hint:* `onKeyDown` handling `ArrowLeft`/`ArrowRight`/`Home`/`End` with a
  roving `tabIndex` across tab buttons.
- [ ] **Semantic HTML** — right element before ARIA.
  *Hint:* `<button>` for anything clickable, never `<div onClick>`.
- [ ] **ARIA Roles & Labels** — only where semantic HTML falls short.
  *Hint:* `role="tablist"` / `role="tab"` / `aria-selected` /
  `aria-controls` on the custom Tabs widget.

## v0.8 — TypeScript Pattern Reference

A living reference of TypeScript patterns with runnable, editable examples
(`/lab/typescript-pattern-reference`).
- [ ] **`satisfies` Operator** — check a shape without widening it.
  *Hint:* `const config = { light: '#fff', dark: '#000' } satisfies Record<Theme, string>`.
- [ ] **Template Literal Types** — string-pattern types.
  *Hint:* `type EventName = \`on${Capitalize<'click' | 'hover'>}\``.
- [ ] **Conditional & Mapped Types** — derive types from types.
  *Hint:* `type DeepPartial<T> = { [K in keyof T]?: DeepPartial<T[K]> }`.
- [ ] **Type Narrowing & Guards** — custom predicates.
  *Hint:* `function isError(x: unknown): x is Error { return x instanceof Error }`.
- [ ] **`as const`** — literal types, no widening.
  *Hint:* `const COLORS = ['red', 'green', 'blue'] as const` → `type Color = (typeof COLORS)[number]`.
- [ ] **Module Augmentation** — extend a third-party/ambient type.
  *Hint:* `declare module '*.svg' { const src: string; export default src }`.

## Ongoing, across every release

Not a standalone release — practiced continuously as each tool above gets
built, wherever its state/UI naturally calls for it:
- [ ] **`useReducer`** — complex local state transitions.
  *Hint:* `const [state, dispatch] = useReducer(reducer, initialState)` —
  a natural fit for the Snippet Vault's or Bookmark Manager's form state.
- [ ] **`useLayoutEffect` vs `useEffect`** — sync DOM read/write before
  paint.
  *Hint:* measuring a tooltip's position in the UI Patterns Gallery before
  it's shown, to avoid a visible jump.
- [ ] **`useTransition` / `useDeferredValue`** — stay responsive under
  load.
  *Hint:* `const [isPending, startTransition] = useTransition()` around
  the Table Viewer's filter/sort.
- [ ] **`useSyncExternalStore`** — subscribe to external state safely.
  *Hint:* a small custom `useMediaQuery(query)` hook built on it, used
  anywhere a tool needs to know the viewport.
- [ ] **`useOptimistic`** — instant UI, no manual rollback wiring.
  *Hint:* `const [items, addOptimistic] = useOptimistic(items, reducer)`
  on the Snippet Vault's save button.
- [ ] **The `use()` Hook** — conditional promise/context reads.
  *Hint:* `const data = use(snippetsPromise)` inside a Suspense-wrapped
  component in the Snippet Vault.
- [ ] **Document Metadata** — per-tool `<title>`.
  *Hint:* `<title>{tool.title} — Lab</title>` rendered directly in each
  tool's component (React 19 hoists it to `<head>`).
- [ ] **Server Components (conceptual)** — notes-only, no code.
  *Hint:* a short written page on what RSC changes about data
  fetching/bundling — not runnable in this Vite SPA.
- [ ] **RTL Basics** — the baseline test shape for every tool.
  *Hint:* `render(<Tool />)`, `screen.getByRole(...)`,
  `userEvent.click(...)`.
- [ ] **Testing Custom Hooks** — test hook logic in isolation.
  *Hint:* `const { result } = renderHook(() => useToggle())`.
- [ ] **Testing Async Flows & Forms** — cover the flaky-test failure mode.
  *Hint:* `await screen.findByText(...)` after `userEvent.type` + submit,
  asserting a validation error appears.
