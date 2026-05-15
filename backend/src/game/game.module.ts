import { Module } from '@nestjs/common';
import { LeaderboardModule } from '../leaderboard/leaderboard.module';
import { GameSettingsRepository } from './game-settings.repository';
import { GameController } from './game.controller';
import { GameService } from './game.service';
import { ScoreSubmissionRepository } from './score-submission.repository';

@Module({
  imports: [LeaderboardModule],
  controllers: [GameController],
  providers: [GameService, GameSettingsRepository, ScoreSubmissionRepository],
  exports: [GameSettingsRepository, ScoreSubmissionRepository],
})
export class GameModule {}
