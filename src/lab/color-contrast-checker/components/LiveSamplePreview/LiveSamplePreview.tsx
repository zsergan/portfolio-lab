import styles from './LiveSamplePreview.module.css';

interface LiveSamplePreviewProps {
  foreground: string;
  background: string;
}

export function LiveSamplePreview({ foreground, background }: LiveSamplePreviewProps) {
  return (
    <>
      <p className={styles.microLabel}>Live Sample</p>

      <div className={styles.preview} style={{ color: foreground, background }}>
        <p className={styles.previewHeading}>Heading, 22px bold</p>
        <p className={styles.previewBody}>Body copy at 15px — the size most of the page actually uses.</p>
        <p className={styles.previewCaption}>Caption at 12px, the first thing to fail an audit.</p>
      </div>
    </>
  );
}
