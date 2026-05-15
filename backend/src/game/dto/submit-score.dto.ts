import { ApiProperty } from '@nestjs/swagger';
import { IsInt, Min } from 'class-validator';

export class SubmitScoreDto {
  @ApiProperty({ example: 54, minimum: 0 })
  @IsInt()
  @Min(0)
  score!: number;

  @ApiProperty({ example: 10, minimum: 1 })
  @IsInt()
  @Min(1)
  durationSeconds!: number;
}
