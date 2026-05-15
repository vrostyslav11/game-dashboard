import { FormError } from '@/shared/ui/FormError/FormError';
import styles from './AdminAlert.module.scss';

interface AdminAlertProps {
  error?: string | null;
  success?: string | null;
}

export function AdminAlert({ error, success }: AdminAlertProps) {
  return (
    <>
      <FormError message={error} />
      {success ? (
        <p className={styles.success} role="status">
          {success}
        </p>
      ) : null}
    </>
  );
}
