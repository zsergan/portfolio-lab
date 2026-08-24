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
  describedBy?: string;
}

export function Select<T extends string>({ id, value, onChange, options, describedBy }: SelectProps<T>) {
  return (
    <select
      id={id}
      className={styles.select}
      value={value}
      onChange={(e) => onChange(e.target.value as T)}
      aria-describedby={describedBy}
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}
