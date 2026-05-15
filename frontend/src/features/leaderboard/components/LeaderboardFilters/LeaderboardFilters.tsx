import type { FormEvent } from 'react';
import type { LeaderboardSort } from '@/features/leaderboard/types';
import { LEADERBOARD_SORT_OPTIONS } from '@/features/leaderboard/constants';
import { Button } from '@/shared/ui/Button/Button';
import { Input } from '@/shared/ui/Input/Input';
import { Select } from '@/shared/ui/Select/Select';
import styles from './LeaderboardFilters.module.scss';

export interface LeaderboardFiltersValues {
  search: string;
  minScore: string;
  maxScore: string;
}

interface LeaderboardFiltersProps {
  sort: LeaderboardSort;
  filters: LeaderboardFiltersValues;
  onSortChange: (sort: LeaderboardSort) => void;
  onFiltersChange: (filters: LeaderboardFiltersValues) => void;
  onApply: () => void;
}

export function LeaderboardFilters({
  sort,
  filters,
  onSortChange,
  onFiltersChange,
  onApply,
}: LeaderboardFiltersProps) {
  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    onApply();
  };

  return (
    <div className={styles.filters}>
      <Select
        label="Sort by"
        options={LEADERBOARD_SORT_OPTIONS}
        value={sort}
        onChange={(event) => onSortChange(event.target.value as LeaderboardSort)}
      />

      <form className={styles.form} onSubmit={handleSubmit}>
        <Input
          label="Search username"
          type="search"
          placeholder="e.g. player"
          value={filters.search}
          onChange={(event) =>
            onFiltersChange({ ...filters, search: event.target.value })
          }
        />
        <Input
          label="Min score"
          type="number"
          min={0}
          placeholder="0"
          value={filters.minScore}
          onChange={(event) =>
            onFiltersChange({ ...filters, minScore: event.target.value })
          }
        />
        <Input
          label="Max score"
          type="number"
          min={0}
          placeholder="100"
          value={filters.maxScore}
          onChange={(event) =>
            onFiltersChange({ ...filters, maxScore: event.target.value })
          }
        />
        <Button type="submit" variant="secondary" className={styles.apply}>
          Apply filters
        </Button>
      </form>
    </div>
  );
}
