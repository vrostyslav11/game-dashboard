import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { leaderboardKeys } from '@/features/leaderboard/hooks';
import { fetchGameSettings, submitScore } from '../api';
import type { SubmitScorePayload } from '../types';

export const gameKeys = {
  all: ['game'] as const,
  settings: ['game', 'settings'] as const,
};

export function useGameSettingsQuery() {
  return useQuery({
    queryKey: gameKeys.settings,
    queryFn: fetchGameSettings,
  });
}

export function useSubmitScoreMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: SubmitScorePayload) => submitScore(payload),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: leaderboardKeys.all });
    },
  });
}

export { useClickChallenge } from './useClickChallenge';
export type { ChallengePhase } from './useClickChallenge';
