import { Link } from 'react-router';

import { TagList } from '@/components';
import { ArrowUpRightIcon } from '@/icons';
import { getToolNumber } from '@/lab/registry';
import type { LabTool } from '@/lab/registry';

import styles from './ToolTile.module.css';

interface ToolTileProps {
  tool: LabTool;
}

export function ToolTile({ tool }: ToolTileProps) {
  const isDone = tool.status === 'done';
  const number = getToolNumber(tool.id);
  const tileClassName = `${styles.tile} ${isDone ? styles.tileShipped : styles.tilePlanned}`;
  const badgeClassName = `${styles.badge} ${isDone ? styles.badgeShipped : styles.badgePlanned}`;

  const content = (
    <>
      <div className={styles.topRow}>
        <span className={styles.number}>{number}</span>
        <span className={badgeClassName}>{isDone ? 'shipped' : 'planned'}</span>
      </div>

      <div className={styles.body}>
        <span className={styles.title}>
          {tool.title}
          {isDone && (
            <span className={styles.arrow}>
              <ArrowUpRightIcon />
            </span>
          )}
        </span>
        <p className={styles.description}>{tool.description}</p>
      </div>

      {tool.topics && (
        <div className={styles.tags}>
          <TagList tags={tool.topics} variant={isDone ? 'default' : 'muted'} />
        </div>
      )}
    </>
  );

  if (isDone) {
    return (
      <Link to={tool.path} className={tileClassName}>
        {content}
      </Link>
    );
  }

  return <div className={tileClassName}>{content}</div>;
}
