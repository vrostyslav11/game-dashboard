import { Injectable } from '@nestjs/common';
import type {
  ScoreStrategy,
  ScoreStrategyContext,
} from './score-strategy.interface';

@Injectable()
export class CumulativeScoreStrategy implements ScoreStrategy {
  computeCurrentScore(context: ScoreStrategyContext): number {
    return context.totalScore;
  }
}
