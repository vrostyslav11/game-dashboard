import styles from './Loader.module.scss';

export interface LoaderProps {
  label?: string;
}

export function Loader({ label = 'Loading…' }: LoaderProps) {
  return (
    <div className={styles.wrapper} role="status" aria-live="polite">
      <span className={styles.spinner} aria-hidden />
      <span className={styles.label}>{label}</span>
    </div>
  );
}
