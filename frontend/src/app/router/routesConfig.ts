import type { ComponentType } from 'react';
import type { UserRole } from '@/features/auth/types';

export type RouteLayout = 'main' | 'auth' | 'standalone';

export interface AppRoute {
  path: string;
  title: string;
  isInMenu: boolean;
  requireAuth: boolean;
  roles?: UserRole[];
  layout: RouteLayout;
  lazy: () => Promise<{ default: ComponentType }>;
}

export const appRoutes: AppRoute[] = [
  {
    path: '/',
    title: 'Game',
    isInMenu: true,
    requireAuth: true,
    layout: 'main',
    lazy: () => import('@/pages/GamePage/GamePage'),
  },
  {
    path: '/leaderboard',
    title: 'Leaderboard',
    isInMenu: true,
    requireAuth: false,
    layout: 'main',
    lazy: () => import('@/pages/LeaderboardPage/LeaderboardPage'),
  },
  {
    path: '/admin',
    title: 'Admin',
    isInMenu: true,
    requireAuth: true,
    roles: ['ADMIN'],
    layout: 'main',
    lazy: () => import('@/pages/AdminPage/AdminPage'),
  },
  {
    path: '/login',
    title: 'Login',
    isInMenu: false,
    requireAuth: false,
    layout: 'auth',
    lazy: () => import('@/pages/LoginPage/LoginPage'),
  },
  {
    path: '/register',
    title: 'Register',
    isInMenu: false,
    requireAuth: false,
    layout: 'auth',
    lazy: () => import('@/pages/RegisterPage/RegisterPage'),
  },
  {
    path: '/forbidden',
    title: 'Forbidden',
    isInMenu: false,
    requireAuth: false,
    layout: 'standalone',
    lazy: () => import('@/pages/ForbiddenPage/ForbiddenPage'),
  },
];

export const mainMenuRoutes = appRoutes.filter(
  (route) => route.isInMenu && route.layout === 'main',
);

export const mainLayoutRoutes = appRoutes.filter((route) => route.layout === 'main');
export const authLayoutRoutes = appRoutes.filter((route) => route.layout === 'auth');
