import { Label } from '../Label/Label';

import styles from './TextArea.module.css';

interface TextAreaProps {
  id: string;
  value: string;
  onChange: (value: string) => void;
  label?: string;
  labelClassName?: string;
  error?: string | null;
  placeholder?: string;
}

export function TextArea({ id, value, onChange, label, labelClassName, error, placeholder }: TextAreaProps) {
  const errorId = `${id}-error`;

  return (
    <div className={styles.field}>
      {label && (
        <Label htmlFor={id} className={labelClassName}>
          {label}
        </Label>
      )}
      <textarea
        id={id}
        className={styles.textarea}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
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
