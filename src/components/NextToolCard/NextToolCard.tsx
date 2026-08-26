import { Link } from 'react-router';

import { Card } from '../Card/Card';
import { Eyebrow } from '../typography/Eyebrow/Eyebrow';
import { getToolNumber, labTools } from '@/lab/registry';

import styles from './NextToolCard.module.css';

interface NextToolCardProps {
  currentToolId: string;
}

export function NextToolCard({ currentToolId }: NextToolCardProps) {
  const doneTools = labTools.filter((tool) => tool.status === 'done');
  const currentIndex = doneTools.findIndex((tool) => tool.id === currentToolId);
  if (currentIndex === -1) return null;

  // Wraps around the list of done tools rather than stopping at the end, so
  // the last-built tool still points somewhere instead of showing nothing.
  const nextTools = Array.from(
    { length: Math.min(2, doneTools.length - 1) },
    (_, offset) => doneTools[(currentIndex + 1 + offset) % doneTools.length],
  );
  if (nextTools.length === 0) return null;

  return (
    <Card className={styles.card}>
      <Eyebrow variant="muted" className={styles.eyebrow}>
        next tool
      </Eyebrow>

      <ul className={styles.list}>
        {nextTools.map((tool) => (
          <li key={tool.id}>
            <Link to={tool.path} className={styles.row}>
              <span className={styles.title}>{tool.title}</span>
              <span className={styles.number}>{getToolNumber(tool.id)}</span>
            </Link>
          </li>
        ))}
      </ul>
    </Card>
  );
}
