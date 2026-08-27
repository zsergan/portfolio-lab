import type { ReactNode } from 'react';

import { Button } from '../Button/Button';

import styles from './WorkspaceCard.module.css';

interface WorkspaceCardAction {
  label: string;
  onClick: () => void;
  disabled?: boolean;
  /** Marks this action as the current mode of a toggle-like group (e.g.
   * Pretty/Minify) — when any action in the array sets this, primary
   * styling follows whichever one is active instead of always the first
   * position. Omit entirely for plain one-off actions (Swap, Copy, Reset). */
  active?: boolean;
}

interface WorkspaceCardProps {
  filename: string;
  actions: WorkspaceCardAction[];
  children: ReactNode;
}

export function WorkspaceCard({ filename, actions, children }: WorkspaceCardProps) {
  const hasActiveFlags = actions.some((action) => action.active !== undefined);

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <div className={styles.filename}>
          <span className={styles.dot} aria-hidden="true" />
          {filename}
        </div>

        <div className={styles.actions}>
          {actions.map((action, index) => {
            const isPrimary = hasActiveFlags ? !!action.active : index === 0;

            return (
              <Button
                key={index}
                variant={isPrimary ? 'primary' : 'secondary'}
                onClick={action.onClick}
                disabled={action.disabled}
                ariaPressed={action.active}
              >
                {action.label}
              </Button>
            );
          })}
        </div>
      </div>

      {children}
    </div>
  );
}
