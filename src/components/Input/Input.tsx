import styles from './Input.module.css';

interface InputProps {
  id: string;
  value: string;
  onChange: (value: string) => void;
  type?: 'text' | 'number';
  isInvalid: boolean;
  placeholder?: string;
  describedBy?: string;
}

export function Input({ id, value, onChange, type = 'text', isInvalid, placeholder, describedBy }: InputProps) {
  return (
    <input
      id={id}
      type={type}
      className={styles.input}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      spellCheck={false}
      aria-invalid={isInvalid}
      aria-describedby={describedBy}
    />
  );
}
