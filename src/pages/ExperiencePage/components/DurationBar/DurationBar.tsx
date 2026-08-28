import styles from './DurationBar.module.css';

interface DurationBarProps {
  months: number;
  maxMonths: number;
}

// Decorative — the adjacent duration text already states the value; this
// only adds an at-a-glance sense of relative tenure across roles.
export function DurationBar({ months, maxMonths }: DurationBarProps) {
  const percent = maxMonths === 0 ? 0 : Math.round((months / maxMonths) * 100);

  return (
    <div className={styles.track} aria-hidden="true">
      <div className={styles.fill} style={{ width: `${percent}%` }} />
    </div>
  );
}
