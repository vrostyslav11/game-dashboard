import { ApiPropertyOptional } from '@nestjs/swagger';
import { ScoreStrategy } from '@prisma/client';
import {
  IsBoolean,
  IsEnum,
  IsInt,
  IsOptional,
  Max,
  Min,
} from 'class-validator';

export class UpdateGameSettingsDto {
  @ApiPropertyOptional({ example: 10, minimum: 1, maximum: 60 })
  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(60)
  durationSeconds?: number;

  @ApiPropertyOptional({ enum: ScoreStrategy })
  @IsOptional()
  @IsEnum(ScoreStrategy)
  activeStrategy?: ScoreStrategy;

  @ApiPropertyOptional({ example: 15, minimum: 1, maximum: 100 })
  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(100)
  maxClicksPerSecond?: number;

  @ApiPropertyOptional({ example: true })
  @IsOptional()
  @IsBoolean()
  isGameEnabled?: boolean;
}
