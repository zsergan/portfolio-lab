import { Tag } from '../Tag/Tag';
import styles from './TagList.module.css';

export function TagList({ tags }: { tags: string[] }) {
  return (
    <ul className={styles.tagList}>
      {tags.map((tag) => (
        <li key={tag}>
          <Tag>{tag}</Tag>
        </li>
      ))}
    </ul>
  );
}
