import type { ReactNode } from 'react';

import { Button } from '../Button/Button';

import styles from './WorkspaceCard.module.css';

interface WorkspaceCardAction {
  label: string;
  onClick: () => void;
  disabled?: boolean;
}

interface WorkspaceCardProps {
  filename: string;
  actions: WorkspaceCardAction[];
  children: ReactNode;
}

export function WorkspaceCard({ filename, actions, children }: WorkspaceCardProps) {
  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <div className={styles.filename}>
          <span className={styles.dot} aria-hidden="true" />
          {filename}
        </div>

        <div className={styles.actions}>
          {actions.map((action, index) => (
            <Button
              key={index}
              variant={index === 0 ? 'primary' : 'secondary'}
              onClick={action.onClick}
              disabled={action.disabled}
            >
              {action.label}
            </Button>
          ))}
        </div>
      </div>

      {children}
    </div>
  );
}
