import { useMemo, useState } from 'react';
import {
  LeaderboardFilters,
  type LeaderboardFiltersValues,
} from '@/features/leaderboard/components/LeaderboardFilters/LeaderboardFilters';
import { LeaderboardTable } from '@/features/leaderboard/components/LeaderboardTable/LeaderboardTable';
import { Pagination } from '@/features/leaderboard/components/Pagination/Pagination';
import { LEADERBOARD_DEFAULT_LIMIT } from '@/features/leaderboard/constants';
import { useLeaderboardQuery } from '@/features/leaderboard/hooks';
import type { LeaderboardQueryParams, LeaderboardSort } from '@/features/leaderboard/types';
import { getApiErrorMessage } from '@/shared/api/apiError';
import { Card } from '@/shared/ui/Card/Card';
import { FormError } from '@/shared/ui/FormError/FormError';
import { Loader } from '@/shared/ui/Loader/Loader';
import styles from './LeaderboardPage.module.scss';

const EMPTY_FILTERS: LeaderboardFiltersValues = {
  search: '',
  minScore: '',
  maxScore: '',
};

function parseOptionalScore(value: string): number | undefined {
  const trimmed = value.trim();
  if (trimmed === '') return undefined;
  const parsed = Number(trimmed);
  return Number.isFinite(parsed) && parsed >= 0 ? parsed : undefined;
}

function buildQueryParams(
  sort: LeaderboardSort,
  page: number,
  applied: LeaderboardFiltersValues,
): LeaderboardQueryParams {
  const params: LeaderboardQueryParams = {
    sort,
    page,
    limit: LEADERBOARD_DEFAULT_LIMIT,
  };

  const search = applied.search.trim();
  if (search) params.search = search;

  const minScore = parseOptionalScore(applied.minScore);
  if (minScore !== undefined) params.minScore = minScore;

  const maxScore = parseOptionalScore(applied.maxScore);
  if (maxScore !== undefined) params.maxScore = maxScore;

  return params;
}

export default function LeaderboardPage() {
  const [sort, setSort] = useState<LeaderboardSort>('desc');
  const [page, setPage] = useState(1);
  const [draftFilters, setDraftFilters] = useState<LeaderboardFiltersValues>(EMPTY_FILTERS);
  const [appliedFilters, setAppliedFilters] = useState<LeaderboardFiltersValues>(EMPTY_FILTERS);

  const queryParams = useMemo(
    () => buildQueryParams(sort, page, appliedFilters),
    [sort, page, appliedFilters],
  );

  const { data, isLoading, isError, error, isFetching } = useLeaderboardQuery(queryParams);

  const handleSortChange = (nextSort: LeaderboardSort) => {
    setSort(nextSort);
    setPage(1);
  };

  const handleApplyFilters = () => {
    setAppliedFilters(draftFilters);
    setPage(1);
  };

  return (
    <Card title="Leaderboard" className={styles.page}>
      <LeaderboardFilters
        sort={sort}
        filters={draftFilters}
        onSortChange={handleSortChange}
        onFiltersChange={setDraftFilters}
        onApply={handleApplyFilters}
      />

      {isError ? (
        <FormError message={error ? getApiErrorMessage(error) : 'Failed to load leaderboard'} />
      ) : null}

      {isLoading ? <Loader label="Loading leaderboard…" /> : null}

      {!isLoading && !isError && data ? (
        <>
          <LeaderboardTable items={data.items} />
          <Pagination
            page={data.page}
            totalPages={data.totalPages}
            total={data.total}
            onPageChange={setPage}
            disabled={isFetching}
          />
        </>
      ) : null}
    </Card>
  );
}
