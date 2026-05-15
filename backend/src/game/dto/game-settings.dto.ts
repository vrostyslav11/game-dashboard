import { ApiProperty } from '@nestjs/swagger';
import { ScoreStrategy } from '@prisma/client';

export class GameSettingsDto {
  @ApiProperty()
  id!: string;

  @ApiProperty({ example: 10 })
  durationSeconds!: number;

  @ApiProperty({ enum: ScoreStrategy })
  activeStrategy!: ScoreStrategy;

  @ApiProperty({ example: 15 })
  maxClicksPerSecond!: number;

  @ApiProperty({ example: true })
  isGameEnabled!: boolean;

  @ApiProperty({ nullable: true, type: String })
  updatedByAdminId!: string | null;

  @ApiProperty()
  updatedAt!: Date;
}
