import { useRef } from 'react';
import type { UIEvent } from 'react';

import styles from './InputPane.module.css';

const encoder = new TextEncoder();

interface InputPaneProps {
  id: string;
  value: string;
  onChange: (value: string) => void;
  error?: string | null;
  errorId: string;
}

export function InputPane({ id, value, onChange, error, errorId }: InputPaneProps) {
  const gutterRef = useRef<HTMLDivElement>(null);
  const lineCount = value === '' ? 1 : value.split('\n').length;
  const byteSize = encoder.encode(value).length;

  // The gutter is a plain div, not a second scrollable element — syncing
  // its scrollTop to the textarea's on every scroll event is what keeps
  // the line numbers lined up with their rows instead of drifting.
  function handleScroll(event: UIEvent<HTMLTextAreaElement>) {
    if (gutterRef.current) gutterRef.current.scrollTop = event.currentTarget.scrollTop;
  }

  return (
    <div className={styles.pane}>
      <div className={styles.header}>
        <label htmlFor={id} className={styles.label}>
          INPUT
        </label>
        <span className={styles.meta}>
          {lineCount} {lineCount === 1 ? 'line' : 'lines'} · {byteSize} B
        </span>
      </div>

      <div className={styles.body}>
        <div ref={gutterRef} className={styles.gutter} aria-hidden="true">
          {Array.from({ length: lineCount }, (_, index) => (
            <span key={index}>{index + 1}</span>
          ))}
        </div>

        <textarea
          id={id}
          className={styles.textarea}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onScroll={handleScroll}
          placeholder={'{"hello": "world"}'}
          spellCheck={false}
          aria-invalid={!!error}
          aria-describedby={error ? errorId : undefined}
        />
      </div>
    </div>
  );
}
