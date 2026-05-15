import { Injectable } from '@nestjs/common';
import { LeaderboardEntry, Prisma, ScoreStrategy } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

export interface LeaderboardEntryStats {
  currentScore: number;
  lastScore: number;
  bestScore: number;
  worstScore: number;
  totalScore: number;
  gamesPlayed: number;
}

export interface LeaderboardFilter {
  search?: string;
  minScore?: number;
  maxScore?: number;
}

export type LeaderboardSortDirection = 'asc' | 'desc' | 'random';

export interface LeaderboardListItem {
  userId: string;
  username: string;
  currentScore: number;
  bestScore: number;
  worstScore: number | null;
  lastScore: number;
  totalScore: number;
  gamesPlayed: number;
  updatedAt: Date;
}

/** Repository methods accept an optional `Prisma.TransactionClient` so callers
 *  can compose multiple writes inside a single interactive transaction. */
@Injectable()
export class LeaderboardRepository {
  constructor(private readonly prisma: PrismaService) {}

  findByUserId(
    userId: string,
    tx?: Prisma.TransactionClient,
  ): Promise<LeaderboardEntry | null> {
    return (tx ?? this.prisma).leaderboardEntry.findUnique({
      where: { userId },
    });
  }

  upsertStats(
    userId: string,
    stats: LeaderboardEntryStats,
    tx?: Prisma.TransactionClient,
  ): Promise<LeaderboardEntry> {
    return (tx ?? this.prisma).leaderboardEntry.upsert({
      where: { userId },
      update: stats,
      create: { userId, ...stats },
    });
  }

  /** Bulk-updates `currentScore` when admin changes `activeStrategy`. */
  recomputeCurrentScoreByStrategy(
    strategy: ScoreStrategy,
    tx?: Prisma.TransactionClient,
  ): Promise<number> {
    const client = tx ?? this.prisma;
    switch (strategy) {
      case ScoreStrategy.LATEST:
        return client.$executeRaw`UPDATE "LeaderboardEntry" SET "currentScore" = "lastScore"`;
      case ScoreStrategy.MAX:
        return client.$executeRaw`UPDATE "LeaderboardEntry" SET "currentScore" = "bestScore"`;
      case ScoreStrategy.MIN:
        return client.$executeRaw`UPDATE "LeaderboardEntry" SET "currentScore" = "worstScore" WHERE "worstScore" IS NOT NULL`;
      case ScoreStrategy.CUMULATIVE:
        return client.$executeRaw`UPDATE "LeaderboardEntry" SET "currentScore" = "totalScore"`;
    }
  }

  countMatching(filter: LeaderboardFilter): Promise<number> {
    return this.prisma.leaderboardEntry.count({
      where: this.buildWhere(filter),
    });
  }

  async findPage(
    filter: LeaderboardFilter,
    sort: LeaderboardSortDirection,
    skip: number,
    take: number,
  ): Promise<LeaderboardListItem[]> {
    if (sort === 'random') {
      return this.findPageRandom(filter, skip, take);
    }

    const rows = await this.prisma.leaderboardEntry.findMany({
      where: this.buildWhere(filter),
      include: { user: { select: { username: true } } },
      // `id ASC` is a stable tiebreaker so pagination doesn't reshuffle ties.
      orderBy: [{ currentScore: sort }, { id: 'asc' }],
      skip,
      take,
    });

    return rows.map(toListItem);
  }

  private buildWhere(
    filter: LeaderboardFilter,
  ): Prisma.LeaderboardEntryWhereInput {
    const where: Prisma.LeaderboardEntryWhereInput = {};

    if (filter.minScore !== undefined || filter.maxScore !== undefined) {
      where.currentScore = {
        ...(filter.minScore !== undefined && { gte: filter.minScore }),
        ...(filter.maxScore !== undefined && { lte: filter.maxScore }),
      };
    }

    if (filter.search) {
      where.user = {
        username: { contains: filter.search, mode: 'insensitive' },
      };
    }

    return where;
  }

  private async findPageRandom(
    filter: LeaderboardFilter,
    skip: number,
    take: number,
  ): Promise<LeaderboardListItem[]> {
    const conditions: Prisma.Sql[] = [];
    if (filter.search) {
      conditions.push(
        Prisma.sql`u."username" ILIKE '%' || ${filter.search} || '%'`,
      );
    }
    if (filter.minScore !== undefined) {
      conditions.push(Prisma.sql`le."currentScore" >= ${filter.minScore}`);
    }
    if (filter.maxScore !== undefined) {
      conditions.push(Prisma.sql`le."currentScore" <= ${filter.maxScore}`);
    }
    const whereClause =
      conditions.length > 0
        ? Prisma.sql`WHERE ${Prisma.join(conditions, ' AND ')}`
        : Prisma.empty;

    return this.prisma.$queryRaw<LeaderboardListItem[]>`
      SELECT
        le."userId"        AS "userId",
        u."username"       AS "username",
        le."currentScore"  AS "currentScore",
        le."bestScore"     AS "bestScore",
        le."worstScore"    AS "worstScore",
        le."lastScore"     AS "lastScore",
        le."totalScore"    AS "totalScore",
        le."gamesPlayed"   AS "gamesPlayed",
        le."updatedAt"     AS "updatedAt"
      FROM "LeaderboardEntry" le
      INNER JOIN "User" u ON u.id = le."userId"
      ${whereClause}
      ORDER BY RANDOM()
      LIMIT ${take} OFFSET ${skip}
    `;
  }
}

function toListItem(
  row: LeaderboardEntry & { user: { username: string } },
): LeaderboardListItem {
  return {
    userId: row.userId,
    username: row.user.username,
    currentScore: row.currentScore,
    bestScore: row.bestScore,
    worstScore: row.worstScore,
    lastScore: row.lastScore,
    totalScore: row.totalScore,
    gamesPlayed: row.gamesPlayed,
    updatedAt: row.updatedAt,
  };
}
