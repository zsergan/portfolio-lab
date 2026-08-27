import { CategoryTabs } from './components/CategoryTabs/CategoryTabs';
import { UnitConversionFields } from './components/UnitConversionFields/UnitConversionFields';
import { useUnitConverter } from './hooks/useUnitConverter';
import type { UnitCategory } from './utils/converter/converter';
import { Breadcrumbs, ToolIntro, WorkspaceCard } from '@/components';
import { useCopyToClipboard } from '@/hooks';

import styles from './UnitConverterPage.module.css';

const CATEGORY_OPTIONS: { value: UnitCategory; label: string }[] = [
  { value: 'length', label: 'Length' },
  { value: 'weight', label: 'Weight' },
  { value: 'temperature', label: 'Temperature' },
  { value: 'data', label: 'Data' },
];

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

  return (
    <div>
      <Breadcrumbs items={[{ label: 'lab', to: '/lab' }, { label: 'unit-converter' }]} />
      <ToolIntro toolId="unit-converter" />

      <WorkspaceCard
        filename="convert.tsx"
        actions={[
          { label: 'Swap', onClick: swap },
          { label: copyLabel, onClick: () => copy(`${result} ${toLabel}`), disabled: !!error },
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
    </div>
  );
}
