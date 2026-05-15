import type { LeaderboardSort } from './types';

export const LEADERBOARD_DEFAULT_LIMIT = 10;

export const LEADERBOARD_SORT_OPTIONS: { value: LeaderboardSort; label: string }[] = [
  { value: 'desc', label: 'Highest score' },
  { value: 'asc', label: 'Lowest score' },
  { value: 'random', label: 'Random' },
];
