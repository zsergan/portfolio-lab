import type { UnitCategory } from './converter';
import { useUnitConverter } from './hooks/useUnitConverter';
import { BackLink, Button, Description, Input, Select, Toggle } from '@/components';

import styles from './UnitConverterPage.module.css';

const CATEGORY_OPTIONS: { value: UnitCategory; label: string }[] = [
  { value: 'length', label: 'Length' },
  { value: 'weight', label: 'Weight' },
  { value: 'temperature', label: 'Temperature' },
];

export function UnitConverterPage() {
  const { category, value, from, to, unitOptions, result, setCategory, setValue, setFrom, setTo, swap } =
    useUnitConverter();

  return (
    <div>
      <BackLink to="/lab">Back to Lab</BackLink>

      <h2>Unit Converter</h2>
      <Description>Convert between length, weight, and temperature units.</Description>

      <Toggle options={CATEGORY_OPTIONS} value={category} onChange={setCategory} />

      <div className={styles.row}>
        <div className={styles.amountField}>
          <Input
            id="unit-converter-value"
            type="number"
            label="Amount"
            value={value}
            onChange={setValue}
            error={result === null ? 'Enter a number to convert.' : null}
          />
        </div>

        <div className={styles.unitField}>
          <Select id="unit-converter-from" label="From" value={from} onChange={setFrom} options={unitOptions} />
        </div>

        <Button onClick={swap}>Swap</Button>

        <div className={styles.unitField}>
          <Select id="unit-converter-to" label="To" value={to} onChange={setTo} options={unitOptions} />
        </div>
      </div>

      <div className={styles.result}>
        <p className={styles.resultValue}>{result ? `${result.value} ${result.label}` : null}</p>
      </div>
    </div>
  );
}
