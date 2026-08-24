import type { UnitCategory } from './converter';
import { useUnitConverter } from './hooks/useUnitConverter';
import { BackLink, Button, Description, Input, Label, Select, Toggle } from '@/components';

import styles from './UnitConverterPage.module.css';

const HINT_ID = 'unit-converter-hint';

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
        <div className={`${styles.field} ${styles.amountField}`}>
          <Label htmlFor="unit-converter-value">Amount</Label>
          <Input
            id="unit-converter-value"
            type="number"
            value={value}
            onChange={setValue}
            isInvalid={result === null}
            describedBy={result === null ? HINT_ID : undefined}
          />
        </div>

        <div className={`${styles.field} ${styles.unitField}`}>
          <Label htmlFor="unit-converter-from">From</Label>
          <Select id="unit-converter-from" value={from} onChange={setFrom} options={unitOptions} />
        </div>

        <Button onClick={swap}>Swap</Button>

        <div className={`${styles.field} ${styles.unitField}`}>
          <Label htmlFor="unit-converter-to">To</Label>
          <Select id="unit-converter-to" value={to} onChange={setTo} options={unitOptions} />
        </div>
      </div>

      <div className={styles.result}>
        {/* Two permanently-mounted elements (not a ternary swapping which
            one exists) sharing one grid cell, so the role="status" node is
            already present in the DOM before the invalid transition
            happens — required for assistive tech to reliably pick up the
            change; adding role="status" to a freshly-mounted node in the
            same update that also sets its text isn't guaranteed to
            announce. Only its own text (not the numeric result) changes,
            so it doesn't re-announce on every keystroke of a valid number. */}
        <p className={styles.resultValue}>{result ? `${result.value} ${result.label}` : null}</p>
        <p id={HINT_ID} role="status" className={styles.resultValue}>
          {result ? null : 'Enter a number to convert.'}
        </p>
      </div>
    </div>
  );
}
