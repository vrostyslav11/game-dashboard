import { Module } from '@nestjs/common';
import { LeaderboardController } from './leaderboard.controller';
import { LeaderboardRepository } from './leaderboard.repository';
import { LeaderboardService } from './leaderboard.service';
import { CumulativeScoreStrategy } from './strategies/cumulative-score.strategy';
import { LatestScoreStrategy } from './strategies/latest-score.strategy';
import { MaxScoreStrategy } from './strategies/max-score.strategy';
import { MinScoreStrategy } from './strategies/min-score.strategy';
import { StrategyFactory } from './strategies/strategy.factory';

@Module({
  controllers: [LeaderboardController],
  providers: [
    LeaderboardRepository,
    LeaderboardService,
    LatestScoreStrategy,
    MaxScoreStrategy,
    MinScoreStrategy,
    CumulativeScoreStrategy,
    StrategyFactory,
  ],
  exports: [LeaderboardRepository, StrategyFactory],
})
export class LeaderboardModule {}
