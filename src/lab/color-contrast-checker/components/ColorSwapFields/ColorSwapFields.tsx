import { Button, ColorField } from '@/components';
import { SwapIcon } from '@/icons';

import styles from './ColorSwapFields.module.css';

interface ColorSwapFieldsProps {
  foreground: string;
  background: string;
  onForegroundChange: (hex: string) => void;
  onBackgroundChange: (hex: string) => void;
  onSwap: () => void;
}

export function ColorSwapFields({
  foreground,
  background,
  onForegroundChange,
  onBackgroundChange,
  onSwap,
}: ColorSwapFieldsProps) {
  return (
    <div className={styles.fields}>
      <ColorField id="foreground" label="Foreground" value={foreground} onChange={onForegroundChange} />

      <Button onClick={onSwap} ariaLabel="Swap colors" className={styles.swapButton}>
        <SwapIcon />
      </Button>

      <ColorField id="background" label="Background" value={background} onChange={onBackgroundChange} />
    </div>
  );
}
