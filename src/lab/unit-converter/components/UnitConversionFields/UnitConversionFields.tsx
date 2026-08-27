import { ConversionField } from '../ConversionField/ConversionField';
import { Button } from '@/components';
import { SwapIcon } from '@/icons';

import styles from './UnitConversionFields.module.css';

interface UnitOption<T extends string> {
  value: T;
  label: string;
}

interface UnitConversionFieldsProps<T extends string> {
  from: T;
  to: T;
  unitOptions: UnitOption<T>[];
  value: string;
  result: string;
  error: string | null;
  onValueChange: (next: string) => void;
  onFromChange: (next: T) => void;
  onToChange: (next: T) => void;
  onSwap: () => void;
}

export function UnitConversionFields<T extends string>({
  from,
  to,
  unitOptions,
  value,
  result,
  error,
  onValueChange,
  onFromChange,
  onToChange,
  onSwap,
}: UnitConversionFieldsProps<T>) {
  return (
    <div className={styles.fields}>
      <ConversionField
        variant="input"
        id="unit-converter-from"
        label="From"
        value={value}
        onValueChange={onValueChange}
        error={error}
        unit={from}
        unitOptions={unitOptions}
        onUnitChange={onFromChange}
        unitAriaLabel="From unit"
      />

      <Button onClick={onSwap} ariaLabel="Swap units" className={styles.swapButton}>
        <SwapIcon />
      </Button>

      <ConversionField
        variant="output"
        id="unit-converter-to"
        label="To"
        value={result}
        unit={to}
        unitOptions={unitOptions}
        onUnitChange={onToChange}
        unitAriaLabel="To unit"
      />
    </div>
  );
}
