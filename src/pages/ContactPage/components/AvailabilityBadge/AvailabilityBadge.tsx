import styles from './AvailabilityBadge.module.css';

interface AvailabilityBadgeProps {
  text: string;
  className?: string;
}

export function AvailabilityBadge({ text, className }: AvailabilityBadgeProps) {
  const combined = className ? `${styles.badge} ${className}` : styles.badge;

  return (
    <div className={combined}>
      <span className={styles.dot} aria-hidden="true" />
      <span className={styles.text}>{text}</span>
    </div>
  );
}
