import { Card } from '../Card/Card';
import { Eyebrow } from '../typography/Eyebrow/Eyebrow';
import { labTools } from '@/lab/registry';

import styles from './BuildNoteCard.module.css';

interface BuildNoteCardProps {
  toolId: string;
}

export function BuildNoteCard({ toolId }: BuildNoteCardProps) {
  const tool = labTools.find((candidate) => candidate.id === toolId);
  if (!tool?.buildNote) return null;

  return (
    <Card className={styles.card}>
      <Eyebrow className={styles.eyebrow}>build note</Eyebrow>
      <p className={styles.text}>{tool.buildNote}</p>
    </Card>
  );
}
