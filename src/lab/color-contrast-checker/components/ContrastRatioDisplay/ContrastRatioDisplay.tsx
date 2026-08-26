import { scalePosition } from '../../utils/contrastRatio/contrastRatio';

import styles from './ContrastRatioDisplay.module.css';

const SCALE_TICKS = [3, 4.5, 7];
const SCALE_LABELS = [1, 3, 4.5, 7, 21].map((value) => ({ value, position: scalePosition(value) }));

interface ContrastRatioDisplayProps {
  ratio: number;
}

export function ContrastRatioDisplay({ ratio }: ContrastRatioDisplayProps) {
  return (
    <div className={styles.container}>
      <p className={styles.ratio}>
        <span className={styles.ratioValue}>{ratio.toFixed(2)}</span>
        <span className={styles.ratioSuffix}>: 1</span>
      </p>

      <div className={styles.scale} aria-hidden="true">
        <div className={styles.scaleTrack}>
          <div className={styles.scaleFill} style={{ width: `${scalePosition(ratio) * 100}%` }} />
          {SCALE_TICKS.map((tick) => (
            <span key={tick} className={styles.scaleTick} style={{ left: `${scalePosition(tick) * 100}%` }} />
          ))}
        </div>

        <div className={styles.scaleLabels}>
          {SCALE_LABELS.map(({ value, position }, index) => (
            <span
              key={value}
              className={styles.scaleLabel}
              style={{
                left: `${position * 100}%`,
                transform:
                  index === 0 ? 'none' : index === SCALE_LABELS.length - 1 ? 'translateX(-100%)' : 'translateX(-50%)',
              }}
            >
              {value}:1
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
