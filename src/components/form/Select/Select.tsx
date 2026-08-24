import { Label } from '../Label/Label';

import styles from './Select.module.css';

interface SelectOption<T extends string> {
  value: T;
  label: string;
}

interface SelectProps<T extends string> {
  id: string;
  value: T;
  onChange: (value: T) => void;
  options: SelectOption<T>[];
  label?: string;
}

export function Select<T extends string>({ id, value, onChange, options, label }: SelectProps<T>) {
  return (
    <div className={styles.field}>
      {label && <Label htmlFor={id}>{label}</Label>}
      <select id={id} className={styles.select} value={value} onChange={(e) => onChange(e.target.value as T)}>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
