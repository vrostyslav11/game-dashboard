import { Injectable } from '@nestjs/common';
import { GameSettings, Prisma, ScoreStrategy } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { GAME_SETTINGS_ID } from './game-settings.constants';

export interface GameSettingsUpdate {
  durationSeconds?: number;
  activeStrategy?: ScoreStrategy;
  maxClicksPerSecond?: number;
  isGameEnabled?: boolean;
  updatedByAdminId: string;
}

@Injectable()
export class GameSettingsRepository {
  constructor(private readonly prisma: PrismaService) {}

  find(tx?: Prisma.TransactionClient): Promise<GameSettings | null> {
    return (tx ?? this.prisma).gameSettings.findUnique({
      where: { id: GAME_SETTINGS_ID },
    });
  }

  /**
   * Upserts the singleton row. `update` only writes the fields that were
   * passed; `create` falls back to schema defaults for anything omitted.
   */
  upsert(
    data: GameSettingsUpdate,
    tx?: Prisma.TransactionClient,
  ): Promise<GameSettings> {
    return (tx ?? this.prisma).gameSettings.upsert({
      where: { id: GAME_SETTINGS_ID },
      update: data,
      create: {
        id: GAME_SETTINGS_ID,
        ...data,
      },
    });
  }
}
