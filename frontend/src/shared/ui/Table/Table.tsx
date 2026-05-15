import type { HTMLAttributes, TdHTMLAttributes, ThHTMLAttributes } from 'react';
import styles from './Table.module.scss';

export function Table({
  children,
  className,
  ...props
}: HTMLAttributes<HTMLTableElement>) {
  return (
    <div className={styles.wrapper}>
      <table className={[styles.table, className ?? ''].filter(Boolean).join(' ')} {...props}>
        {children}
      </table>
    </div>
  );
}

export function TableHead({ children, ...props }: HTMLAttributes<HTMLTableSectionElement>) {
  return <thead className={styles.head} {...props}>{children}</thead>;
}

export function TableBody({ children, ...props }: HTMLAttributes<HTMLTableSectionElement>) {
  return <tbody className={styles.body} {...props}>{children}</tbody>;
}

export function TableRow({ children, ...props }: HTMLAttributes<HTMLTableRowElement>) {
  return <tr className={styles.row} {...props}>{children}</tr>;
}

export function TableHeader({ children, ...props }: ThHTMLAttributes<HTMLTableCellElement>) {
  return <th className={styles.header} {...props}>{children}</th>;
}

export function TableCell({ children, ...props }: TdHTMLAttributes<HTMLTableCellElement>) {
  return <td className={styles.cell} {...props}>{children}</td>;
}

export interface TableEmptyProps {
  colSpan: number;
  message?: string;
}

export function TableEmpty({ colSpan, message = 'No data' }: TableEmptyProps) {
  return (
    <TableRow>
      <TableCell colSpan={colSpan} className={styles.empty}>
        {message}
      </TableCell>
    </TableRow>
  );
}
