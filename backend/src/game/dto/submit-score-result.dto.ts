import { ApiProperty } from '@nestjs/swagger';
import { ScoreStrategy } from '@prisma/client';

export class SubmissionInfoDto {
  @ApiProperty()
  id!: string;

  @ApiProperty()
  userId!: string;

  @ApiProperty({ example: 54 })
  score!: number;

  @ApiProperty({ enum: ScoreStrategy })
  strategyUsed!: ScoreStrategy;

  @ApiProperty({ example: 10 })
  durationSeconds!: number;

  @ApiProperty({ example: 5.4 })
  clicksPerSecond!: number;

  @ApiProperty()
  createdAt!: Date;
}

export class LeaderboardEntryInfoDto {
  @ApiProperty()
  id!: string;

  @ApiProperty()
  userId!: string;

  @ApiProperty({ example: 54 })
  currentScore!: number;

  @ApiProperty({ example: 54 })
  lastScore!: number;

  @ApiProperty({ example: 54 })
  bestScore!: number;

  @ApiProperty({ nullable: true, type: Number, example: 54 })
  worstScore!: number | null;

  @ApiProperty({ example: 54 })
  totalScore!: number;

  @ApiProperty({ example: 1 })
  gamesPlayed!: number;

  @ApiProperty()
  createdAt!: Date;

  @ApiProperty()
  updatedAt!: Date;
}

export class SubmitScoreResultDto {
  @ApiProperty({ type: SubmissionInfoDto })
  submission!: SubmissionInfoDto;

  @ApiProperty({ type: LeaderboardEntryInfoDto })
  entry!: LeaderboardEntryInfoDto;
}
