import { axiosInstance } from '@/shared/api/axiosInstance';
import type { LeaderboardQueryParams, LeaderboardResponse } from './types';

export async function fetchLeaderboard(
  params: LeaderboardQueryParams,
): Promise<LeaderboardResponse> {
  const { data } = await axiosInstance.get<LeaderboardResponse>('/leaderboard', {
    params,
  });
  return data;
}
