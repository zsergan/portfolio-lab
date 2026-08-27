import { CategoryTabs } from './components/CategoryTabs/CategoryTabs';
import { UnitConversionFields } from './components/UnitConversionFields/UnitConversionFields';
import { useUnitConverter } from './hooks/useUnitConverter';
import type { UnitCategory } from './utils/converter/converter';
import { Breadcrumbs, BuildNoteCard, NextToolCard, ShortcutsCard, ToolIntro, WorkspaceCard } from '@/components';
import { useCopyToClipboard, useKeyboardShortcuts } from '@/hooks';

import styles from './UnitConverterPage.module.css';

const CATEGORY_OPTIONS: { value: UnitCategory; label: string }[] = [
  { value: 'length', label: 'Length' },
  { value: 'weight', label: 'Weight' },
  { value: 'temperature', label: 'Temperature' },
  { value: 'data', label: 'Data' },
];

function nextCategory(current: UnitCategory): UnitCategory {
  const index = CATEGORY_OPTIONS.findIndex((option) => option.value === current);
  return CATEGORY_OPTIONS[(index + 1) % CATEGORY_OPTIONS.length].value;
}

export function UnitConverterPage() {
  const {
    category,
    from,
    to,
    unitOptions,
    value,
    result,
    error,
    setCategory,
    setValue,
    setFrom,
    setTo,
    swap,
    reset,
  } = useUnitConverter();
  const { status: copyStatus, copy } = useCopyToClipboard();

  const toLabel = unitOptions.find((option) => option.value === to)?.label ?? to;
  const copyLabel = copyStatus === 'copied' ? 'Copied' : copyStatus === 'error' ? 'Copy failed' : 'Copy';

  function handleCopy() {
    copy(`${result} ${toLabel}`);
  }

  const shortcuts = [
    { label: 'Swap units', combo: 'mod+s', onTrigger: swap },
    // The design's own key for this is bare "Tab", but useKeyboardShortcuts
    // only exempts typing targets from bare-key combos — the toolbar and
    // category buttons aren't typing targets, so binding Tab there would
    // hijack native focus navigation instead of just cycling categories.
    { label: 'Next category', combo: ']', onTrigger: () => setCategory(nextCategory(category)) },
    { label: 'Copy result', combo: 'mod+c', onTrigger: handleCopy },
  ];

  useKeyboardShortcuts(shortcuts);

  return (
    <div>
      <Breadcrumbs items={[{ label: 'lab', to: '/lab' }, { label: 'unit-converter' }]} />
      <ToolIntro toolId="unit-converter" />

      <WorkspaceCard
        filename="convert.tsx"
        actions={[
          { label: 'Swap', onClick: swap },
          { label: copyLabel, onClick: handleCopy, disabled: !!error },
          { label: 'Reset', onClick: reset },
        ]}
      >
        <div className={styles.body}>
          <CategoryTabs options={CATEGORY_OPTIONS} value={category} onChange={setCategory} />

          <UnitConversionFields
            from={from}
            to={to}
            unitOptions={unitOptions}
            value={value}
            result={result}
            error={error}
            onValueChange={setValue}
            onFromChange={setFrom}
            onToChange={setTo}
            onSwap={swap}
          />
        </div>
      </WorkspaceCard>

      <div className={styles.bottomRow}>
        <BuildNoteCard toolId="unit-converter" />

        <div className={styles.sidebar}>
          <ShortcutsCard shortcuts={shortcuts} />
          <NextToolCard currentToolId="unit-converter" />
        </div>
      </div>
    </div>
  );
}
