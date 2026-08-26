import { labTools } from '@/lab/registry';

import styles from './ToolIntro.module.css';

interface ToolIntroProps {
  toolId: string;
}

export function ToolIntro({ toolId }: ToolIntroProps) {
  const index = labTools.findIndex((tool) => tool.id === toolId);
  const tool = labTools[index];
  if (!tool) return null;

  const number = String(index + 1).padStart(2, '0');

  return (
    <div className={styles.intro}>
      <div className={styles.titleRow}>
        <span className={styles.number}>{number}</span>
        <h2 className={styles.title}>{tool.title}</h2>
      </div>

      <p className={styles.description}>{tool.description}</p>

      {tool.topics && tool.topics.length > 0 && (
        <ul className={styles.tags}>
          {tool.topics.map((topic) => (
            <li key={topic}>
              <span className={styles.tag}>{topic}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
