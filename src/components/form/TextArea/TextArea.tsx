import styles from './TextArea.module.css';

interface TextAreaProps {
  id: string;
  value: string;
  onChange: (value: string) => void;
  isInvalid: boolean;
  placeholder?: string;
  describedBy?: string;
}

export function TextArea({ id, value, onChange, isInvalid, placeholder, describedBy }: TextAreaProps) {
  return (
    <textarea
      id={id}
      className={styles.textarea}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      spellCheck={false}
      aria-invalid={isInvalid}
      aria-describedby={describedBy}
    />
  );
}
