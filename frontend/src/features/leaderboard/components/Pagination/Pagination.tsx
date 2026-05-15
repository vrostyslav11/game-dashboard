import { Button } from '@/shared/ui/Button/Button';
import styles from './Pagination.module.scss';

interface PaginationProps {
  page: number;
  totalPages: number;
  total: number;
  onPageChange: (page: number) => void;
  disabled?: boolean;
}

export function Pagination({
  page,
  totalPages,
  total,
  onPageChange,
  disabled = false,
}: PaginationProps) {
  if (total === 0) {
    return null;
  }

  const canGoPrev = page > 1;
  const canGoNext = page < totalPages;

  return (
    <nav className={styles.pagination} aria-label="Leaderboard pagination">
      <p className={styles.summary}>
        Page {page} of {totalPages} · {total} {total === 1 ? 'player' : 'players'}
      </p>
      <div className={styles.controls}>
        <Button
          variant="secondary"
          size="sm"
          disabled={disabled || !canGoPrev}
          onClick={() => onPageChange(page - 1)}
        >
          Previous
        </Button>
        <Button
          variant="secondary"
          size="sm"
          disabled={disabled || !canGoNext}
          onClick={() => onPageChange(page + 1)}
        >
          Next
        </Button>
      </div>
    </nav>
  );
}
