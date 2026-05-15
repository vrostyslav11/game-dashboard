import type { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/app/providers/authContext';
import { useMeQuery } from '@/features/auth/hooks';
import { Loader } from '@/shared/ui/Loader/Loader';

interface ProtectedRouteProps {
  children: ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isAuthenticated } = useAuth();
  const { isLoading, isError } = useMeQuery();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (isLoading) {
    return <Loader label="Checking session…" />;
  }

  if (isError) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
