import styles from './ProgressStrip.module.css';

interface ProgressStripProps {
  done: number;
  total: number;
}

export function ProgressStrip({ done, total }: ProgressStripProps) {
  return (
    <div
      className={styles.strip}
      role="progressbar"
      aria-valuenow={done}
      aria-valuemin={0}
      aria-valuemax={total}
      aria-label={`${done} of ${total} tools shipped`}
    >
      {Array.from({ length: total }, (_, index) => (
        <span key={index} className={index < done ? `${styles.cell} ${styles.cellFilled}` : styles.cell} />
      ))}
    </div>
  );
}
