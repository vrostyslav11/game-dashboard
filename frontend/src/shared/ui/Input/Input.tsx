import { forwardRef, type InputHTMLAttributes } from 'react';
import styles from './Input.module.scss';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  function Input({ label, error, id, className, ...props }, ref) {
    const inputId = id ?? label?.toLowerCase().replace(/\s+/g, '-');

    return (
      <div className={styles.field}>
        {label ? (
          <label htmlFor={inputId} className={styles.label}>
            {label}
          </label>
        ) : null}
        <input
          ref={ref}
          id={inputId}
          className={[styles.input, error ? styles.hasError : '', className ?? '']
            .filter(Boolean)
            .join(' ')}
          aria-invalid={error ? true : undefined}
          {...props}
        />
        {error ? <span className={styles.error}>{error}</span> : null}
      </div>
    );
  },
);
