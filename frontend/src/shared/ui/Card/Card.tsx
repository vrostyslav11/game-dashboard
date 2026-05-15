import type { HTMLAttributes, ReactNode } from 'react';
import styles from './Card.module.scss';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  title?: string;
  children: ReactNode;
}

export function Card({ title, children, className, ...props }: CardProps) {
  return (
    <div className={[styles.card, className ?? ''].filter(Boolean).join(' ')} {...props}>
      {title ? <h2 className={styles.title}>{title}</h2> : null}
      <div className={styles.body}>{children}</div>
    </div>
  );
}
