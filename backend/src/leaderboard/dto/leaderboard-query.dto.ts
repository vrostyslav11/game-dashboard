import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
  Max,
  MaxLength,
  Min,
} from 'class-validator';

export enum LeaderboardSort {
  DESC = 'desc',
  ASC = 'asc',
  RANDOM = 'random',
}

export class LeaderboardQueryDto {
  @ApiPropertyOptional({ enum: LeaderboardSort, default: LeaderboardSort.DESC })
  @IsOptional()
  @IsEnum(LeaderboardSort)
  sort: LeaderboardSort = LeaderboardSort.DESC;

  @ApiPropertyOptional({ example: 'john', maxLength: 50 })
  @IsOptional()
  @IsString()
  @MaxLength(50)
  search?: string;

  @ApiPropertyOptional({ example: 0, minimum: 0 })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  minScore?: number;

  @ApiPropertyOptional({ example: 1000, minimum: 0 })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  maxScore?: number;

  @ApiPropertyOptional({ example: 1, minimum: 1, default: 1 })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page: number = 1;

  @ApiPropertyOptional({ example: 10, minimum: 1, maximum: 100, default: 10 })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(100)
  limit: number = 10;
}
