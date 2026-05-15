import { Injectable } from '@nestjs/common';
import { ScoreStrategy as ScoreStrategyEnum } from '@prisma/client';
import { CumulativeScoreStrategy } from './cumulative-score.strategy';
import { LatestScoreStrategy } from './latest-score.strategy';
import { MaxScoreStrategy } from './max-score.strategy';
import { MinScoreStrategy } from './min-score.strategy';
import type { ScoreStrategy } from './score-strategy.interface';

@Injectable()
export class StrategyFactory {
  private readonly strategies: Record<ScoreStrategyEnum, ScoreStrategy>;

  constructor(
    latestScoreStrategy: LatestScoreStrategy,
    maxScoreStrategy: MaxScoreStrategy,
    minScoreStrategy: MinScoreStrategy,
    cumulativeScoreStrategy: CumulativeScoreStrategy,
  ) {
    this.strategies = {
      LATEST: latestScoreStrategy,
      MAX: maxScoreStrategy,
      MIN: minScoreStrategy,
      CUMULATIVE: cumulativeScoreStrategy,
    };
  }

  resolve(strategy: ScoreStrategyEnum): ScoreStrategy {
    return this.strategies[strategy];
  }
}
