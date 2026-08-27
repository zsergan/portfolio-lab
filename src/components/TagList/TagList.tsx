import { Tag } from '../Tag/Tag';

import styles from './TagList.module.css';

interface TagListProps {
  tags: string[];
  variant?: 'default' | 'muted';
}

export function TagList({ tags, variant }: TagListProps) {
  return (
    <ul className={styles.tagList}>
      {tags.map((tag) => (
        <li key={tag}>
          <Tag variant={variant}>{tag}</Tag>
        </li>
      ))}
    </ul>
  );
}
