import { Link } from 'react-router';

import { Description, Label, TagList } from '@/components';
import { labTools } from '@/lab/registry';

import styles from './LabHome.module.css';

export function LabHome() {
  const doneCount = labTools.filter((tool) => tool.status === 'done').length;

  return (
    <div>
      <h2>Lab</h2>
      <Description>Small, focused dev tools — no accounts, no servers, everything runs in your browser.</Description>
      <p className={styles.progress}>
        {doneCount} / {labTools.length} tools built
      </p>

      <ul className={styles.cardGrid}>
        {labTools.map((tool) => (
          <li key={tool.id}>
            {tool.status === 'done' ? (
              <Link to={tool.path} className={styles.card}>
                <span className={styles.cardTitle}>{tool.title}</span>
                <span className={styles.cardDescription}>{tool.description}</span>
                {tool.topics && <TagList tags={tool.topics} />}
              </Link>
            ) : (
              <div className={`${styles.card} ${styles.cardPlanned}`}>
                <span className={styles.cardTitle}>{tool.title}</span>
                <span className={styles.cardDescription}>{tool.description}</span>
                {tool.topics && <TagList tags={tool.topics} />}
                <Label className={styles.cardBadge}>planned</Label>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
