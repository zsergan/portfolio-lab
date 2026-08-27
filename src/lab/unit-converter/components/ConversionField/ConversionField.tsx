import { ChevronDownIcon } from '@/icons';

import styles from './ConversionField.module.css';

interface ConversionFieldOption<T extends string> {
  value: T;
  label: string;
}

interface ConversionFieldSharedProps<T extends string> {
  id: string;
  label: string;
  unit: T;
  unitOptions: ConversionFieldOption<T>[];
  onUnitChange: (next: T) => void;
  unitAriaLabel: string;
}

// `input`: a real, editable FROM field — text (not number) since it now
// accepts a comma decimal separator, parsed on our own via parseAmount.
// `output`: a read-only, derived TO display — never holds its own state,
// so there's no onValueChange/error for it to report.
type ConversionFieldProps<T extends string> =
  | (ConversionFieldSharedProps<T> & { variant: 'input'; value: string; onValueChange: (next: string) => void; error?: string | null })
  | (ConversionFieldSharedProps<T> & { variant: 'output'; value: string });

export function ConversionField<T extends string>(props: ConversionFieldProps<T>) {
  const { id, label, unit, unitOptions, onUnitChange, unitAriaLabel, variant, value } = props;
  const errorId = `${id}-error`;
  const error = variant === 'input' ? props.error : undefined;
  const isOutput = variant === 'output';
  const cardClassName = `${styles.card} ${isOutput ? styles.cardOutput : styles.cardInput}`;
  const unitClassName = isOutput ? `${styles.unit} ${styles.unitAccent}` : styles.unit;
  const chevronClassName = isOutput ? `${styles.unitChevron} ${styles.unitChevronAccent}` : styles.unitChevron;

  return (
    <div className={cardClassName}>
      {variant === 'input' ? (
        <label htmlFor={id} className={styles.caption}>
          {label}
        </label>
      ) : (
        <span className={styles.caption}>{label}</span>
      )}

      {variant === 'input' ? (
        <input
          id={id}
          className={styles.value}
          type="text"
          inputMode="decimal"
          value={value}
          onChange={(e) => props.onValueChange(e.target.value)}
          aria-invalid={!!error}
          aria-describedby={error ? errorId : undefined}
        />
      ) : (
        <span className={styles.value}>{value}</span>
      )}

      <div className={styles.unitWrapper}>
        <select
          className={unitClassName}
          value={unit}
          onChange={(e) => onUnitChange(e.target.value as T)}
          aria-label={unitAriaLabel}
        >
          {unitOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        <span className={chevronClassName}>
          <ChevronDownIcon />
        </span>
      </div>

      {error && (
        <p id={errorId} role="status" className={styles.error}>
          {error}
        </p>
      )}
    </div>
  );
}
