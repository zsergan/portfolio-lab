import { Card } from '../Card/Card';
import { Eyebrow } from '../typography/Eyebrow/Eyebrow';

import styles from './ShortcutsCard.module.css';

interface ShortcutItem {
  label: string;
  combo: string;
}

interface ShortcutsCardProps {
  shortcuts: ShortcutItem[];
}

const SYMBOLS: Record<string, string> = {
  mod: '⌘',
  shift: '⇧',
  alt: '⌥',
  enter: '⏎',
  backspace: '⌫',
  tab: 'Tab',
  escape: 'Esc',
};

function formatCombo(combo: string): string {
  return combo
    .split('+')
    .map((part) => SYMBOLS[part] ?? part.toUpperCase())
    .join('');
}

export function ShortcutsCard({ shortcuts }: ShortcutsCardProps) {
  if (shortcuts.length === 0) return null;

  return (
    <Card className={styles.card}>
      <Eyebrow variant="muted" className={styles.eyebrow}>
        shortcuts
      </Eyebrow>

      <ul className={styles.list}>
        {shortcuts.map((shortcut) => (
          <li key={shortcut.combo} className={styles.row}>
            <span className={styles.rowLabel}>{shortcut.label}</span>
            <kbd className={styles.keys}>{formatCombo(shortcut.combo)}</kbd>
          </li>
        ))}
      </ul>
    </Card>
  );
}
