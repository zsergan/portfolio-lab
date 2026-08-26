import type { ComponentType } from 'react';

export type ToolStatus = 'planned' | 'done';

export interface LabTool {
  /** stable kebab-case id, also used as the route slug under /lab/:id */
  id: string;
  title: string;
  /** short one-liner shown on the index card */
  description: string;
  /** what patterns/APIs this tool exercises — not yet rendered in the UI, kept for future use */
  highlights: string;
  status: ToolStatus;
  /** route path relative to the site root, e.g. "/lab/json-formatter" */
  path: string;
  /** topic tags, e.g. "Forms", "State Management" — rendered as a TagList on the index card and as chips on the tool's own detail page */
  topics?: string[];
  /** present only once status is 'done' — kept lazy so each tool is its own chunk */
  component?: () => Promise<{ default: ComponentType }>;
}

export const labTools: LabTool[] = [
  {
    id: 'json-formatter',
    title: 'JSON Formatter & Validator',
    description:
      'Paste a payload, get it readable — with the parse error pointed at the exact line instead of a stack trace.',
    highlights: 'Discriminated-union state (idle/valid/error), useMemo-based formatting.',
    status: 'done',
    path: '/lab/json-formatter',
    topics: ['TypeScript', 'React Hooks', 'Clipboard API'],
    component: () => import('./json-formatter/JsonFormatterPage').then((m) => ({ default: m.JsonFormatterPage })),
  },
  {
    id: 'color-contrast-checker',
    title: 'Color Contrast Checker',
    description: 'Two colors, every WCAG threshold at once, and the nearest shade that actually passes.',
    highlights: 'Controlled color inputs, derived state, accessibility-first UI.',
    status: 'done',
    path: '/lab/color-contrast-checker',
    topics: ['TypeScript', 'Accessibility', 'OKLCH'],
    component: () =>
      import('./color-contrast-checker/ColorContrastCheckerPage').then((m) => ({
        default: m.ColorContrastCheckerPage,
      })),
  },
  {
    id: 'unit-converter',
    title: 'Unit Converter',
    description: 'Convert between length, weight, and temperature units.',
    highlights: 'Generic, typed conversion functions; utility types for unit config.',
    status: 'done',
    path: '/lab/unit-converter',
    topics: ['TypeScript', 'Generics'],
    component: () => import('./unit-converter/UnitConverterPage').then((m) => ({ default: m.UnitConverterPage })),
  },
  {
    id: 'form-builder-playground',
    title: 'Form Builder Playground',
    description: 'Assemble a multi-field form and preview live validation as you type.',
    highlights: 'react-hook-form + Zod schema validation, dynamic field arrays, accessible error messaging.',
    status: 'planned',
    path: '/lab/form-builder-playground',
    topics: ['Forms', 'Accessibility'],
  },
  {
    id: 'snippet-vault',
    title: 'Snippet Vault',
    description: 'Save, search, and tag reusable code snippets.',
    highlights: 'IndexedDB persistence, MSW-mocked sync, caching/invalidation, optimistic updates, pagination.',
    status: 'planned',
    path: '/lab/snippet-vault',
    topics: ['Data Fetching', 'Error Handling', 'Testing'],
  },
  {
    id: 'bookmark-manager',
    title: 'Bookmark Manager',
    description: 'Organize bookmarks in a list/detail view with a locally simulated login.',
    highlights: 'Nested routes, dynamic route params, loaders/actions, protected routes.',
    status: 'planned',
    path: '/lab/bookmark-manager',
    topics: ['Routing'],
  },
  {
    id: 'csv-json-table-viewer',
    title: 'CSV/JSON Table Viewer',
    description: 'Paste a CSV or JSON dataset and browse it as a virtualized table.',
    highlights: 'List virtualization, React.memo, memoized derived columns, lazy-loaded viewer chunk.',
    status: 'planned',
    path: '/lab/csv-json-table-viewer',
    topics: ['Performance'],
  },
  {
    id: 'state-playground',
    title: 'State Playground',
    description: 'The same small task board implemented three ways: Context, Zustand, and Redux Toolkit.',
    highlights: 'Side-by-side state-management comparison, derived state and selectors.',
    status: 'planned',
    path: '/lab/state-playground',
    topics: ['State Management'],
  },
  {
    id: 'ui-patterns-gallery',
    title: 'UI Patterns Gallery',
    description: 'A gallery of reusable component patterns: tabs, menus, and typed polymorphic text.',
    highlights: 'Compound components, headless components, render props vs. HOCs, ref-as-prop, focus and keyboard handling.',
    status: 'planned',
    path: '/lab/ui-patterns-gallery',
    topics: ['Component Patterns', 'Accessibility'],
  },
  {
    id: 'typescript-pattern-reference',
    title: 'TypeScript Pattern Reference',
    description: 'A living reference of TypeScript patterns with runnable, editable examples.',
    highlights: 'satisfies, template literal types, conditional & mapped types, type narrowing, module augmentation.',
    status: 'planned',
    path: '/lab/typescript-pattern-reference',
    topics: ['TypeScript'],
  },
];
