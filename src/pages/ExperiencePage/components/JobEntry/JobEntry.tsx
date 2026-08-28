import { DurationBar } from '../DurationBar/DurationBar';
import { TagList } from '@/components';
import type { ExperienceEntry } from '@/content/data';
import { formatDuration } from '@/content/duration';

import styles from './JobEntry.module.css';

interface JobEntryProps {
  entry: ExperienceEntry;
  maxMonths: number;
}

export function JobEntry({ entry, maxMonths }: JobEntryProps) {
  return (
    <li className={styles.entry}>
      <div className={styles.meta}>
        <span className={styles.period}>{entry.years}</span>
        <span className={styles.duration}>{formatDuration(entry.months)}</span>
        <DurationBar months={entry.months} maxMonths={maxMonths} />
      </div>

      <div className={styles.content}>
        <span className={styles.dot} aria-hidden="true" />

        <div className={styles.titleBlock}>
          <h3 className={styles.role}>{entry.role}</h3>
          <span className={styles.company}>{entry.company}</span>
        </div>

        {entry.client && <p className={styles.client}>{entry.client}</p>}

        <p className={styles.description}>{entry.description}</p>

        {entry.highlights && (
          <ul className={styles.highlights}>
            {entry.highlights.map((highlight) => (
              <li key={highlight} className={styles.highlight}>
                {highlight}
              </li>
            ))}
          </ul>
        )}

        <TagList tags={entry.tags} />
      </div>
    </li>
  );
}
