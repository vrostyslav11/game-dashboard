import type { FormEventHandler, ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/shared/ui/Button/Button';
import { Card } from '@/shared/ui/Card/Card';
import { FormError } from '@/shared/ui/FormError/FormError';
import styles from './AuthForm.module.scss';

export interface AuthFormProps {
  title: string;
  errorMessage?: string | null;
  isLoading: boolean;
  submitLabel: string;
  loadingLabel: string;
  onSubmit: FormEventHandler<HTMLFormElement>;
  children: ReactNode;
  footerText: string;
  footerLinkText: string;
  footerLinkTo: string;
}

export function AuthForm({
  title,
  errorMessage,
  isLoading,
  submitLabel,
  loadingLabel,
  onSubmit,
  children,
  footerText,
  footerLinkText,
  footerLinkTo,
}: AuthFormProps) {
  return (
    <Card title={title} className={styles.card}>
      <form className={styles.form} onSubmit={onSubmit} noValidate>
        <FormError message={errorMessage} />

        {children}

        <Button
          type="submit"
          fullWidth
          disabled={isLoading}
          className={styles.submit}
        >
          {isLoading ? loadingLabel : submitLabel}
        </Button>
      </form>

      <p className={styles.footer}>
        {footerText} <Link to={footerLinkTo}>{footerLinkText}</Link>
      </p>
    </Card>
  );
}
