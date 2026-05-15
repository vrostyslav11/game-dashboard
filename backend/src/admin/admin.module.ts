import { Module } from '@nestjs/common';
import { GameModule } from '../game/game.module';
import { LeaderboardModule } from '../leaderboard/leaderboard.module';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';

@Module({
  imports: [GameModule, LeaderboardModule],
  controllers: [AdminController],
  providers: [AdminService],
})
export class AdminModule {}
