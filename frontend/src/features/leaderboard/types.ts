export type LeaderboardSort = 'desc' | 'asc' | 'random';

export interface LeaderboardEntry {
  rank: number;
  userId: string;
  username: string;
  currentScore: number;
  bestScore: number;
  worstScore: number | null;
  lastScore: number;
  totalScore: number;
  gamesPlayed: number;
  updatedAt: string;
}

export interface LeaderboardResponse {
  items: LeaderboardEntry[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface LeaderboardQueryParams {
  sort?: LeaderboardSort;
  search?: string;
  minScore?: number;
  maxScore?: number;
  page?: number;
  limit?: number;
}
