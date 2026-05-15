import { ApiProperty } from '@nestjs/swagger';

export class LeaderboardEntryDto {
  @ApiProperty({ example: 1 })
  rank!: number;

  @ApiProperty()
  userId!: string;

  @ApiProperty({ example: 'player' })
  username!: string;

  @ApiProperty({ example: 120 })
  currentScore!: number;

  @ApiProperty({ example: 120 })
  bestScore!: number;

  @ApiProperty({ nullable: true, type: Number, example: 30 })
  worstScore!: number | null;

  @ApiProperty({ example: 80 })
  lastScore!: number;

  @ApiProperty({ example: 230 })
  totalScore!: number;

  @ApiProperty({ example: 3 })
  gamesPlayed!: number;

  @ApiProperty()
  updatedAt!: Date;
}

export class LeaderboardResponseDto {
  @ApiProperty({ type: [LeaderboardEntryDto] })
  items!: LeaderboardEntryDto[];

  @ApiProperty({ example: 1 })
  total!: number;

  @ApiProperty({ example: 1 })
  page!: number;

  @ApiProperty({ example: 10 })
  limit!: number;

  @ApiProperty({ example: 1 })
  totalPages!: number;
}
