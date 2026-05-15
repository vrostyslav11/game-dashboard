import { Controller, Get, Query } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { LeaderboardQueryDto } from './dto/leaderboard-query.dto';
import { LeaderboardResponseDto } from './dto/leaderboard-response.dto';
import { LeaderboardService } from './leaderboard.service';

@ApiTags('leaderboard')
@Controller('leaderboard')
export class LeaderboardController {
  constructor(private readonly leaderboardService: LeaderboardService) {}

  @Get()
  @ApiOperation({
    summary:
      'Get paginated leaderboard with sort (desc | asc | random), search, and score range filters',
  })
  @ApiResponse({ status: 200, type: LeaderboardResponseDto })
  @ApiResponse({ status: 400, description: 'Invalid query parameters' })
  getLeaderboard(
    @Query() query: LeaderboardQueryDto,
  ): Promise<LeaderboardResponseDto> {
    return this.leaderboardService.getLeaderboard(query);
  }
}
