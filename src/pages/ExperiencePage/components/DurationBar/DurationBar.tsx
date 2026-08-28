import styles from './DurationBar.module.css';

interface DurationBarProps {
  months: number;
  maxMonths: number;
}

// Decorative — gives an at-a-glance sense of relative tenure across
// roles without stating exact durations anywhere on the page.
export function DurationBar({ months, maxMonths }: DurationBarProps) {
  const percent = maxMonths === 0 ? 0 : Math.round((months / maxMonths) * 100);

  return (
    <div className={styles.track} aria-hidden="true">
      <div className={styles.fill} style={{ width: `${percent}%` }} />
    </div>
  );
}
