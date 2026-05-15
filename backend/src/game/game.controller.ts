import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { GameSettings } from '@prisma/client';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import type { AuthenticatedUser } from '../common/types/authenticated-user.type';
import { GameSettingsDto } from './dto/game-settings.dto';
import { SubmitScoreResultDto } from './dto/submit-score-result.dto';
import { SubmitScoreDto } from './dto/submit-score.dto';
import { GameService, SubmitScoreResult } from './game.service';

@ApiTags('game')
@Controller('game')
export class GameController {
  constructor(private readonly gameService: GameService) {}

  @Get('settings')
  @ApiOperation({ summary: 'Get current game settings (public)' })
  @ApiResponse({ status: 200, type: GameSettingsDto })
  getSettings(): Promise<GameSettings> {
    return this.gameService.getSettings();
  }

  @Post('submit-score')
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Submit a score (authenticated)' })
  @ApiResponse({ status: 201, type: SubmitScoreResultDto })
  @ApiResponse({
    status: 400,
    description:
      'Game is disabled, durationSeconds mismatch, or suspicious score',
  })
  @ApiResponse({ status: 401, description: 'Missing or invalid access token' })
  submitScore(
    @CurrentUser() user: AuthenticatedUser,
    @Body() dto: SubmitScoreDto,
  ): Promise<SubmitScoreResult> {
    return this.gameService.submitScore(user.id, dto);
  }
}
