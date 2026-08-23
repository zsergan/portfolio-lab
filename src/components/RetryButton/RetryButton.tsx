import styles from './RetryButton.module.css';

export function RetryButton({ onClick }: { onClick: () => void }) {
  return (
    <button className={styles.retryButton} onClick={onClick}>
      Try again
    </button>
  );
}
