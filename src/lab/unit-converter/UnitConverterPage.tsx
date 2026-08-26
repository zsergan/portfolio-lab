import type { UnitCategory } from './converter';
import { useUnitConverter } from './hooks/useUnitConverter';
import { Breadcrumbs, Button, Input, Select, Toggle, ToolIntro } from '@/components';
import { SwapIcon } from '@/icons';

import styles from './UnitConverterPage.module.css';

const CATEGORY_OPTIONS: { value: UnitCategory; label: string }[] = [
  { value: 'length', label: 'Length' },
  { value: 'weight', label: 'Weight' },
  { value: 'temperature', label: 'Temperature' },
];

export function UnitConverterPage() {
  const {
    category,
    from,
    to,
    unitOptions,
    amount,
    result,
    amountError,
    resultError,
    setCategory,
    setAmount,
    setResult,
    setFrom,
    setTo,
    swap,
  } = useUnitConverter();

  return (
    <div>
      <Breadcrumbs items={[{ label: 'lab', to: '/lab' }, { label: 'unit-converter' }]} />
      <ToolIntro toolId="unit-converter" />

      <Toggle options={CATEGORY_OPTIONS} value={category} onChange={setCategory} />

      <div className={styles.grid}>
        <div className={styles.fromField}>
          <Select id="unit-converter-from" label="From" value={from} onChange={setFrom} options={unitOptions} />
        </div>

        <div className={styles.toField}>
          <Select id="unit-converter-to" label="To" value={to} onChange={setTo} options={unitOptions} />
        </div>

        <Button onClick={swap} ariaLabel="Swap" className={styles.swapButton}>
          <SwapIcon />
        </Button>

        <div className={styles.amountField}>
          <Input
            id="unit-converter-amount"
            type="number"
            label="Amount"
            value={amount}
            onChange={setAmount}
            error={amountError}
          />
        </div>

        <div className={styles.resultField}>
          <Input
            id="unit-converter-result"
            type="number"
            label="Converted"
            value={result}
            onChange={setResult}
            error={resultError}
          />
        </div>
      </div>
    </div>
  );
}
