import type { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useMeQuery } from '@/features/auth/hooks';
import { Loader } from '@/shared/ui/Loader/Loader';

interface AdminRouteProps {
  children: ReactNode;
}

export function AdminRoute({ children }: AdminRouteProps) {
  const { data: user, isLoading } = useMeQuery();

  if (isLoading) {
    return <Loader label="Checking permissions…" />;
  }

  if (user?.role !== 'ADMIN') {
    return <Navigate to="/forbidden" replace />;
  }

  return children;
}
