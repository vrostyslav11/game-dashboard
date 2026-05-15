export interface ScoreStrategyContext {
  lastScore: number;
  bestScore: number;
  worstScore: number;
  totalScore: number;
}

export interface ScoreStrategy {
  computeCurrentScore(context: ScoreStrategyContext): number;
}
