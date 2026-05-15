import { Injectable } from '@nestjs/common';
import { Prisma, ScoreStrategy, ScoreSubmission } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

export interface CreateScoreSubmissionInput {
  userId: string;
  score: number;
  strategyUsed: ScoreStrategy;
  durationSeconds: number;
  clicksPerSecond: number;
}

@Injectable()
export class ScoreSubmissionRepository {
  constructor(private readonly prisma: PrismaService) {}

  create(
    input: CreateScoreSubmissionInput,
    tx?: Prisma.TransactionClient,
  ): Promise<ScoreSubmission> {
    return (tx ?? this.prisma).scoreSubmission.create({ data: input });
  }
}
