import { axiosInstance } from '@/shared/api/axiosInstance';
import type { AuthResponse, LoginPayload, RegisterPayload, User } from './types';

export async function login(payload: LoginPayload): Promise<AuthResponse> {
  const { data } = await axiosInstance.post<AuthResponse>('/auth/login', payload);
  return data;
}

export async function register(payload: RegisterPayload): Promise<AuthResponse> {
  const { data } = await axiosInstance.post<AuthResponse>('/auth/register', payload);
  return data;
}

export async function getMe(): Promise<User> {
  const { data } = await axiosInstance.get<User>('/auth/me');
  return data;
}
