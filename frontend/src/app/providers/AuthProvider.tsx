import { useCallback, useMemo, useState, type ReactNode } from 'react';
import {
  clearAccessToken,
  getAccessToken,
  setAccessToken,
} from '@/shared/api/tokenStorage';
import { AuthContext, type AuthContextValue } from './authContext';

export function AuthProvider({ children }: { children: ReactNode }) {
  const [accessToken, setAccessTokenState] = useState<string | null>(() =>
    getAccessToken(),
  );

  const setToken = useCallback((token: string) => {
    setAccessToken(token);
    setAccessTokenState(token);
  }, []);

  const clearToken = useCallback(() => {
    clearAccessToken();
    setAccessTokenState(null);
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      accessToken,
      isAuthenticated: accessToken !== null,
      setToken,
      clearToken,
    }),
    [accessToken, setToken, clearToken],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
