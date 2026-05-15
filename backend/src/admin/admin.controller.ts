import { Body, Controller, Patch, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { GameSettings, Role } from '@prisma/client';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { Roles } from '../common/decorators/roles.decorator';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import type { AuthenticatedUser } from '../common/types/authenticated-user.type';
import { GameSettingsDto } from '../game/dto/game-settings.dto';
import { AdminService } from './admin.service';
import { UpdateGameSettingsDto } from './dto/update-game-settings.dto';

@ApiTags('admin')
@ApiBearerAuth()
@Controller('admin')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.ADMIN)
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Patch('game-settings')
  @ApiOperation({
    summary:
      'Update game settings (admin only). Changing activeStrategy eagerly recomputes currentScore for all leaderboard entries.',
  })
  @ApiResponse({ status: 200, type: GameSettingsDto })
  @ApiResponse({ status: 400, description: 'Invalid request body' })
  @ApiResponse({ status: 401, description: 'Missing or invalid access token' })
  @ApiResponse({ status: 403, description: 'Admin role required' })
  updateGameSettings(
    @CurrentUser() admin: AuthenticatedUser,
    @Body() dto: UpdateGameSettingsDto,
  ): Promise<GameSettings> {
    return this.adminService.updateGameSettings(admin.id, dto);
  }
}
