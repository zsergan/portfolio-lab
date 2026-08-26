import { getToolNumber, labTools } from '@/lab/registry';

import styles from './ToolIntro.module.css';

interface ToolIntroProps {
  toolId: string;
}

export function ToolIntro({ toolId }: ToolIntroProps) {
  const tool = labTools.find((candidate) => candidate.id === toolId);
  if (!tool) return null;

  const number = getToolNumber(toolId);

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
