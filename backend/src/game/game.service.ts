import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import {
  GameSettings,
  LeaderboardEntry,
  ScoreSubmission,
} from '@prisma/client';
import {
  LeaderboardRepository,
  LeaderboardEntryStats,
} from '../leaderboard/leaderboard.repository';
import { StrategyFactory } from '../leaderboard/strategies/strategy.factory';
import { PrismaService } from '../prisma/prisma.service';
import { SubmitScoreDto } from './dto/submit-score.dto';
import { GameSettingsRepository } from './game-settings.repository';
import { ScoreSubmissionRepository } from './score-submission.repository';

export interface SubmitScoreResult {
  submission: ScoreSubmission;
  entry: LeaderboardEntry;
}

@Injectable()
export class GameService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly gameSettingsRepository: GameSettingsRepository,
    private readonly leaderboardRepository: LeaderboardRepository,
    private readonly scoreSubmissionRepository: ScoreSubmissionRepository,
    private readonly strategyFactory: StrategyFactory,
  ) {}

  async getSettings(): Promise<GameSettings> {
    const settings = await this.gameSettingsRepository.find();
    if (!settings) {
      throw new NotFoundException('Game settings have not been initialized');
    }
    return settings;
  }

  async submitScore(
    userId: string,
    dto: SubmitScoreDto,
  ): Promise<SubmitScoreResult> {
    const settings = await this.getSettings();

    if (!settings.isGameEnabled) {
      throw new BadRequestException('Game is currently disabled');
    }
    if (dto.durationSeconds !== settings.durationSeconds) {
      throw new BadRequestException(
        `durationSeconds must equal ${settings.durationSeconds}`,
      );
    }

    const clicksPerSecond = dto.score / dto.durationSeconds;
    if (clicksPerSecond > settings.maxClicksPerSecond) {
      throw new BadRequestException('Suspicious score detected');
    }

    const existingEntry = await this.leaderboardRepository.findByUserId(userId);
    const stats = this.foldNewScoreIntoStats(existingEntry, dto.score);
    const strategy = this.strategyFactory.resolve(settings.activeStrategy);
    const currentScore = strategy.computeCurrentScore(stats);

    return this.prisma.$transaction(async (tx) => {
      const submission = await this.scoreSubmissionRepository.create(
        {
          userId,
          score: dto.score,
          strategyUsed: settings.activeStrategy,
          durationSeconds: dto.durationSeconds,
          clicksPerSecond,
        },
        tx,
      );
      const entry = await this.leaderboardRepository.upsertStats(
        userId,
        { ...stats, currentScore },
        tx,
      );
      return { submission, entry };
    });
  }

  private foldNewScoreIntoStats(
    existing: LeaderboardEntry | null,
    newScore: number,
  ): LeaderboardEntryStats {
    if (!existing) {
      return {
        currentScore: newScore,
        lastScore: newScore,
        bestScore: newScore,
        worstScore: newScore,
        totalScore: newScore,
        gamesPlayed: 1,
      };
    }

    const worstScore =
      existing.worstScore === null
        ? newScore
        : Math.min(existing.worstScore, newScore);

    return {
      currentScore: existing.currentScore,
      lastScore: newScore,
      bestScore: Math.max(existing.bestScore, newScore),
      worstScore,
      totalScore: existing.totalScore + newScore,
      gamesPlayed: existing.gamesPlayed + 1,
    };
  }
}
