import axios from 'axios';
import { clearAccessToken, getAccessToken } from './tokenStorage';

const AUTH_PATHS = ['/auth/login', '/auth/register'] as const;

function isAuthRequest(url: string | undefined): boolean {
  if (!url) return false;
  return AUTH_PATHS.some((path) => url.includes(path));
}

function isAuthPage(): boolean {
  const { pathname } = window.location;
  return pathname === '/login' || pathname === '/register';
}

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use((config) => {
  const token = getAccessToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error: unknown) => {
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      const requestUrl = error.config?.url;
      if (!isAuthRequest(requestUrl) && !isAuthPage()) {
        clearAccessToken();
        window.location.assign('/login');
      }
    }
    return Promise.reject(error);
  },
);
