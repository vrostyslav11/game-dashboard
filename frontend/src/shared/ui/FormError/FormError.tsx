import styles from './FormError.module.scss';

export interface FormErrorProps {
  message?: string | string[] | null;
}

export function FormError({ message }: FormErrorProps) {
  if (!message) return null;

  const text = Array.isArray(message) ? message.join('. ') : message;
  if (!text) return null;

  return (
    <p className={styles.error} role="alert">
      {text}
    </p>
  );
}
