import styles from './NearestPassingShades.module.css';

interface NearestPassingShadesProps {
  shades: string[];
  onSelect: (hex: string) => void;
}

export function NearestPassingShades({ shades, onSelect }: NearestPassingShadesProps) {
  return (
    <>
      <p className={styles.microLabel}>Nearest passing shades</p>

      <div className={styles.shades}>
        {shades.map((shade, index) => (
          <button
            key={index}
            type="button"
            className={index === 0 ? styles.shadeRecommended : styles.shade}
            style={{ background: shade }}
            onClick={() => onSelect(shade)}
            aria-label={`Use ${shade} as the foreground color`}
          />
        ))}
      </div>

      <p className={styles.microCaption}>Click a shade to lock AAA at every size.</p>
    </>
  );
}
