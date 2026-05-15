import { Injectable } from '@nestjs/common';
import { GameSettings } from '@prisma/client';
import { GameSettingsRepository } from '../game/game-settings.repository';
import { LeaderboardRepository } from '../leaderboard/leaderboard.repository';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateGameSettingsDto } from './dto/update-game-settings.dto';

@Injectable()
export class AdminService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly gameSettingsRepository: GameSettingsRepository,
    private readonly leaderboardRepository: LeaderboardRepository,
  ) {}

  /**
   * Updates game settings. If `activeStrategy` actually changes, eagerly
   * recomputes `currentScore` for every leaderboard entry inside the same
   * transaction so the settings row and leaderboard can never disagree.
   */
  async updateGameSettings(
    adminId: string,
    dto: UpdateGameSettingsDto,
  ): Promise<GameSettings> {
    return this.prisma.$transaction(async (tx) => {
      const previous = await this.gameSettingsRepository.find(tx);
      const updated = await this.gameSettingsRepository.upsert(
        { ...dto, updatedByAdminId: adminId },
        tx,
      );

      const strategyChanged =
        previous !== null && previous.activeStrategy !== updated.activeStrategy;
      if (strategyChanged) {
        await this.leaderboardRepository.recomputeCurrentScoreByStrategy(
          updated.activeStrategy,
          tx,
        );
      }

      return updated;
    });
  }
}
