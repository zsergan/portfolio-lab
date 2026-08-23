import js from '@eslint/js'
import globals from 'globals'
import perfectionist from 'eslint-plugin-perfectionist'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    plugins: {
      perfectionist,
    },
    languageOptions: {
      globals: globals.browser,
    },
    rules: {
      // Groups imports into three blank-line-separated buckets: external
      // packages, internal (the @/ alias + relative paths), and styles.
      'perfectionist/sort-imports': [
        'error',
        {
          type: 'natural',
          internalPattern: ['^@/'],
          newlinesBetween: 1,
          sortSideEffects: true,
          groups: [['builtin', 'external'], ['internal', 'parent', 'sibling', 'index'], 'style'],
        },
      ],
    },
  },
  {
    // The /// <reference> directive here must stay the file's first line for
    // Vitest's config-augmentation types to apply — sort-imports doesn't
    // know that, so it's turned off for this file specifically.
    files: ['vite.config.ts'],
    rules: {
      'perfectionist/sort-imports': 'off',
    },
  },
])
