import type { ScoreStrategy } from './types';

export const STRATEGY_LABELS: Record<ScoreStrategy, string> = {
  LATEST: 'Latest (overwrite)',
  MAX: 'Max score',
  MIN: 'Min score',
  CUMULATIVE: 'Cumulative',
};
