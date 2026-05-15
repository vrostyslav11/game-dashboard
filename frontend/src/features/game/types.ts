export type ScoreStrategy = 'LATEST' | 'MAX' | 'MIN' | 'CUMULATIVE';

export interface GameSettings {
  id: string;
  durationSeconds: number;
  activeStrategy: ScoreStrategy;
  maxClicksPerSecond: number;
  isGameEnabled: boolean;
  updatedByAdminId: string | null;
  updatedAt: string;
}

export interface SubmitScorePayload {
  score: number;
  durationSeconds: number;
}

export interface ScoreSubmission {
  id: string;
  userId: string;
  score: number;
  strategyUsed: ScoreStrategy;
  durationSeconds: number;
  clicksPerSecond: number;
  createdAt: string;
}

export interface LeaderboardEntry {
  id: string;
  userId: string;
  currentScore: number;
  bestScore: number;
  worstScore: number | null;
  lastScore: number;
  totalScore: number;
  gamesPlayed: number;
  createdAt: string;
  updatedAt: string;
}

export interface SubmitScoreResponse {
  submission: ScoreSubmission;
  entry: LeaderboardEntry;
}
