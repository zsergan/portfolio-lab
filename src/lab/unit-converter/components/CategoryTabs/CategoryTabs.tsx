import styles from './CategoryTabs.module.css';

interface CategoryTabsOption<T extends string> {
  value: T;
  label: string;
}

interface CategoryTabsProps<T extends string> {
  options: CategoryTabsOption<T>[];
  value: T;
  onChange: (value: T) => void;
}

export function CategoryTabs<T extends string>({ options, value, onChange }: CategoryTabsProps<T>) {
  return (
    <div className={styles.tabs} role="tablist">
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          role="tab"
          aria-selected={value === option.value}
          className={value === option.value ? `${styles.tab} ${styles.tabActive}` : styles.tab}
          onClick={() => onChange(option.value)}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
