import { Link } from 'react-router';
import { featureRegistry, topicLabels, topicOrder } from '../features/registry';
import styles from './SandboxHome.module.css';

export function SandboxHome() {
  const doneCount = featureRegistry.filter((f) => f.status === 'done').length;

  return (
    <div>
      <p className={styles.progress}>
        {doneCount} / {featureRegistry.length} demos built
      </p>

      {topicOrder.map((topic) => {
        const entries = featureRegistry.filter((f) => f.topic === topic);
        if (entries.length === 0) return null;

        return (
          <section key={topic} className={styles.section} aria-labelledby={`topic-${topic}`}>
            <h2 id={`topic-${topic}`} className={styles.sectionTitle}>
              {topicLabels[topic]}
            </h2>
            <ul className={styles.cardGrid}>
              {entries.map((entry) => (
                <li key={entry.id}>
                  {entry.status === 'done' ? (
                    <Link to={entry.path} className={styles.card}>
                      <span className={styles.cardTitle}>{entry.title}</span>
                      <span className={styles.cardDescription}>{entry.description}</span>
                    </Link>
                  ) : (
                    <div className={`${styles.card} ${styles.cardPlanned}`}>
                      <span className={styles.cardTitle}>{entry.title}</span>
                      <span className={styles.cardDescription}>{entry.description}</span>
                      <span className={styles.cardBadge}>planned</span>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </section>
        );
      })}
    </div>
  );
}
