import { axiosInstance } from '@/shared/api/axiosInstance';
import type { GameSettings, SubmitScorePayload, SubmitScoreResponse } from './types';

export async function fetchGameSettings(): Promise<GameSettings> {
  const { data } = await axiosInstance.get<GameSettings>('/game/settings');
  return data;
}

export async function submitScore(
  payload: SubmitScorePayload,
): Promise<SubmitScoreResponse> {
  const { data } = await axiosInstance.post<SubmitScoreResponse>(
    '/game/submit-score',
    payload,
  );
  return data;
}
