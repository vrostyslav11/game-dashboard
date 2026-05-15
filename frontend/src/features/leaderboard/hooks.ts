import { useQuery } from '@tanstack/react-query';
import { fetchLeaderboard } from './api';
import type { LeaderboardQueryParams } from './types';

export const leaderboardKeys = {
  all: ['leaderboard'] as const,
  list: (params: LeaderboardQueryParams) => ['leaderboard', 'list', params] as const,
};

export function useLeaderboardQuery(params: LeaderboardQueryParams) {
  return useQuery({
    queryKey: leaderboardKeys.list(params),
    queryFn: () => fetchLeaderboard(params),
  });
}
