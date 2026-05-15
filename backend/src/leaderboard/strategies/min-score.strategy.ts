import { Injectable } from '@nestjs/common';
import type {
  ScoreStrategy,
  ScoreStrategyContext,
} from './score-strategy.interface';

@Injectable()
export class MinScoreStrategy implements ScoreStrategy {
  computeCurrentScore(context: ScoreStrategyContext): number {
    return context.worstScore;
  }
}
