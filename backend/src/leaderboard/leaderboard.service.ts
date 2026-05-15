import { Injectable } from '@nestjs/common';
import {
  LeaderboardQueryDto,
  LeaderboardSort,
} from './dto/leaderboard-query.dto';
import {
  LeaderboardEntryDto,
  LeaderboardResponseDto,
} from './dto/leaderboard-response.dto';
import {
  LeaderboardFilter,
  LeaderboardRepository,
  LeaderboardSortDirection,
} from './leaderboard.repository';

const SORT_MAP: Record<LeaderboardSort, LeaderboardSortDirection> = {
  [LeaderboardSort.DESC]: 'desc',
  [LeaderboardSort.ASC]: 'asc',
  [LeaderboardSort.RANDOM]: 'random',
};

@Injectable()
export class LeaderboardService {
  constructor(private readonly leaderboardRepository: LeaderboardRepository) {}

  async getLeaderboard(
    query: LeaderboardQueryDto,
  ): Promise<LeaderboardResponseDto> {
    const { page, limit, sort } = query;
    const filter: LeaderboardFilter = {
      search: query.search,
      minScore: query.minScore,
      maxScore: query.maxScore,
    };
    const skip = (page - 1) * limit;

    const [total, items] = await Promise.all([
      this.leaderboardRepository.countMatching(filter),
      this.leaderboardRepository.findPage(filter, SORT_MAP[sort], skip, limit),
    ]);

    const ranked: LeaderboardEntryDto[] = items.map((item, index) => ({
      rank: skip + index + 1,
      ...item,
    }));

    return {
      items: ranked,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }
}
