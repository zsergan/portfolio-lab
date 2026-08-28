import { Card, Eyebrow } from '@/components';
import type { CurrentlyLine } from '@/content/data';

import styles from './CurrentlyCard.module.css';

interface CurrentlyCardProps {
  updated: string;
  lines: CurrentlyLine[];
}

export function CurrentlyCard({ updated, lines }: CurrentlyCardProps) {
  return (
    <Card className={styles.card}>
      <div className={styles.header}>
        <Eyebrow className={styles.eyebrow}>currently</Eyebrow>
        <span className={styles.updated}>{updated}</span>
      </div>

      {lines.map((line) => (
        <div key={line.key} className={styles.row}>
          <span className={styles.key}>{line.key}</span>
          <span className={styles.value}>{line.value}</span>
        </div>
      ))}
    </Card>
  );
}
