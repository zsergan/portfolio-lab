import styles from './Toggle.module.css';

interface ToggleOption<T extends string> {
  value: T;
  label: string;
}

interface ToggleProps<T extends string> {
  options: ToggleOption<T>[];
  value: T;
  onChange: (value: T) => void;
}

export function Toggle<T extends string>({ options, value, onChange }: ToggleProps<T>) {
  return (
    <div className={styles.toggle}>
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          className={value === option.value ? `${styles.button} ${styles.buttonActive}` : styles.button}
          onClick={() => onChange(option.value)}
          aria-pressed={value === option.value}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
