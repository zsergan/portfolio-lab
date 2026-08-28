import type { AboutStat } from '@/content/data';

import styles from './StatsGrid.module.css';

interface StatsGridProps {
  stats: AboutStat[];
  className?: string;
}

export function StatsGrid({ stats, className }: StatsGridProps) {
  const combined = className ? `${styles.grid} ${className}` : styles.grid;

  return (
    <div className={combined}>
      {stats.map((stat) => (
        <div key={stat.label} className={styles.cell}>
          <span className={styles.value}>{stat.value}</span>
          <span className={styles.label}>{stat.label}</span>
        </div>
      ))}
    </div>
  );
}
