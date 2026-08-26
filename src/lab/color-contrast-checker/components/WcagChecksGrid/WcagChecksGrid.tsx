import styles from './WcagChecksGrid.module.css';

const CHECKS = [
  { label: 'AA · normal', threshold: 4.5 },
  { label: 'AA · large', threshold: 3 },
  { label: 'AAA · normal', threshold: 7 },
  { label: 'AAA · large', threshold: 4.5 },
];

interface WcagChecksGridProps {
  ratio: number;
}

export function WcagChecksGrid({ ratio }: WcagChecksGridProps) {
  return (
    <ul className={styles.checks}>
      {CHECKS.map((check) => {
        const passes = ratio >= check.threshold;

        return (
          <li key={check.label} className={styles.check}>
            {check.label}
            <strong className={passes ? styles.pass : styles.fail}>{passes ? 'pass' : 'fail'}</strong>
          </li>
        );
      })}
    </ul>
  );
}
