import styles from './NearestPassingShades.module.css';

interface NearestPassingShadesProps {
  shades: string[];
  allPass: boolean;
  onSelect: (hex: string) => void;
}

export function NearestPassingShades({ shades, allPass, onSelect }: NearestPassingShadesProps) {
  return (
    <>
      <p className={styles.microLabel}>Nearest passing shades</p>

      <div className={styles.shades}>
        {shades.map((shade, index) => (
          <button
            key={index}
            type="button"
            className={allPass && index === 0 ? styles.shadeRecommended : styles.shade}
            style={{ background: shade }}
            onClick={() => onSelect(shade)}
            aria-label={
              allPass && index === 0
                ? `Use ${shade} as the foreground color (recommended)`
                : `Use ${shade} as the foreground color`
            }
          />
        ))}
      </div>

      <p className={styles.microCaption}>
        {allPass
          ? 'Click a shade to lock AAA at every size.'
          : 'None of these reach AAA against this background — closest attempts shown.'}
      </p>
    </>
  );
}
