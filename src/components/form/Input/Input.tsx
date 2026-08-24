import { Label } from '../Label/Label';

import styles from './Input.module.css';

interface InputProps {
  id: string;
  value: string;
  onChange: (value: string) => void;
  type?: 'text' | 'number';
  label?: string;
  error?: string | null;
  placeholder?: string;
  maxLength?: number;
}

export function Input({ id, value, onChange, type = 'text', label, error, placeholder, maxLength }: InputProps) {
  const errorId = `${id}-error`;

  return (
    <div className={styles.field}>
      {label && <Label htmlFor={id}>{label}</Label>}
      <input
        id={id}
        type={type}
        className={styles.input}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        maxLength={maxLength}
        spellCheck={false}
        aria-invalid={!!error}
        aria-describedby={error !== undefined ? errorId : undefined}
      />
      {error !== undefined && (
        <p id={errorId} role="status" className={styles.error}>
          {error}
        </p>
      )}
    </div>
  );
}
