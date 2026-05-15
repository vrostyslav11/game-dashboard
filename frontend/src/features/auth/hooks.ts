import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/app/providers/authContext';
import { getMe, login, register } from './api';
import type { LoginPayload, RegisterPayload } from './types';

export const authKeys = {
  all: ['auth'] as const,
  me: ['auth', 'me'] as const,
};

export function useMeQuery() {
  const { isAuthenticated } = useAuth();

  return useQuery({
    queryKey: authKeys.me,
    queryFn: getMe,
    enabled: isAuthenticated,
    retry: false,
  });
}

export function useLoginMutation() {
  const { setToken } = useAuth();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (payload: LoginPayload) => login(payload),
    onSuccess: (data) => {
      setToken(data.accessToken);
      queryClient.setQueryData(authKeys.me, data.user);
      void navigate('/');
    },
  });
}

export function useRegisterMutation() {
  const { setToken } = useAuth();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (payload: RegisterPayload) => register(payload),
    onSuccess: (data) => {
      setToken(data.accessToken);
      queryClient.setQueryData(authKeys.me, data.user);
      void navigate('/');
    },
  });
}

export function useLogout() {
  const { clearToken } = useAuth();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return () => {
    clearToken();
    queryClient.removeQueries({ queryKey: authKeys.all });
    void navigate('/login');
  };
}
