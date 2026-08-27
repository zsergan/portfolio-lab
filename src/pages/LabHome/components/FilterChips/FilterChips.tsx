import styles from './FilterChips.module.css';

interface FilterChipsOption<T extends string> {
  value: T;
  label: string;
}

interface FilterChipsProps<T extends string> {
  options: FilterChipsOption<T>[];
  value: T;
  onChange: (value: T) => void;
}

// Same single-select-group shape as CategoryTabs (Unit Converter), so it
// mirrors that component's tablist/tab/aria-selected semantics rather than
// a plain button group — aria-pressed is for independently-toggleable
// buttons, not a mutually-exclusive picker like this one.
export function FilterChips<T extends string>({ options, value, onChange }: FilterChipsProps<T>) {
  return (
    <div className={styles.chips} role="tablist" aria-label="Filter tools by status">
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          role="tab"
          aria-selected={value === option.value}
          className={value === option.value ? `${styles.chip} ${styles.chipActive}` : styles.chip}
          onClick={() => onChange(option.value)}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
