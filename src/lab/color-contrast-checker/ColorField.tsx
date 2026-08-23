import { useState } from 'react';

import { Caption } from '@/components';

import styles from './ColorField.module.css';

const HEX_PATTERN = /^#[0-9a-f]{6}$/i;

interface ColorFieldProps {
  id: string;
  label: string;
  value: string;
  onChange: (hex: string) => void;
}

export function ColorField({ id, label, value, onChange }: ColorFieldProps) {
  const [text, setText] = useState(value);
  // Keep the free-text buffer in sync when `value` changes externally (a
  // swap or the swatch picker) — adjusted during render, not in an effect,
  // so an external change doesn't cost an extra render pass.
  const [prevValue, setPrevValue] = useState(value);
  if (value !== prevValue) {
    setPrevValue(value);
    setText(value);
  }

  function handleTextChange(next: string) {
    setText(next);
    if (HEX_PATTERN.test(next)) {
      // <input type="color">'s value must be a lowercase hex string per the
      // HTML spec — an uppercase value silently resets it to black.
      onChange(next.toLowerCase());
    }
  }

  const isInvalid = !HEX_PATTERN.test(text);
  const hintId = `${id}-hint`;

  return (
    <div className={styles.field}>
      <Caption htmlFor={id}>{label}</Caption>
      <div className={styles.controls}>
        <input
          type="color"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          aria-label={`${label} color picker`}
          className={styles.swatch}
        />
        <input
          id={id}
          type="text"
          value={text}
          onChange={(e) => handleTextChange(e.target.value)}
          spellCheck={false}
          maxLength={7}
          aria-invalid={isInvalid}
          aria-describedby={hintId}
          className={styles.hexInput}
        />
      </div>
      <p id={hintId} role="status" className={styles.hint}>
        {isInvalid ? 'Enter a 6-digit hex color, like #aa3bff.' : null}
      </p>
    </div>
  );
}
