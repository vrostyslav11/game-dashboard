import { NavLink, Outlet } from 'react-router-dom';
import { useAuth } from '@/app/providers/authContext';
import { mainMenuRoutes } from '@/app/router/routesConfig';
import { useMeQuery, useLogout } from '@/features/auth/hooks';
import { Button } from '@/shared/ui/Button/Button';
import styles from './MainLayout.module.scss';

export function MainLayout() {
  const { isAuthenticated } = useAuth();
  const { data: user } = useMeQuery();
  const logout = useLogout();

  const visibleMenuRoutes = mainMenuRoutes.filter((route) => {
    if (!route.roles?.length) return true;
    return user?.role && route.roles.includes(user.role);
  });

  return (
    <div className={styles.layout}>
      <header className={styles.header}>
        <div className={styles.headerInner}>
          <NavLink to="/" className={styles.brand}>
            Leaderboard
          </NavLink>

          <nav className={styles.nav} aria-label="Main">
            {visibleMenuRoutes.map((route) => (
              <NavLink
                key={route.path}
                to={route.path}
                className={({ isActive }) =>
                  [styles.navLink, isActive ? styles.navLinkActive : '']
                    .filter(Boolean)
                    .join(' ')
                }
                end={route.path === '/'}
              >
                {route.title}
              </NavLink>
            ))}
          </nav>

          <div className={styles.actions}>
            {isAuthenticated && user ? (
              <>
                <span className={styles.userMeta}>
                  <span className={styles.username}>{user.username}</span>
                  <span className={styles.role}>{user.role}</span>
                </span>
                <Button variant="ghost" size="sm" onClick={logout}>
                  Log out
                </Button>
              </>
            ) : (
              <NavLink to="/login">
                <Button variant="secondary" size="sm">
                  Log in
                </Button>
              </NavLink>
            )}
          </div>
        </div>
      </header>

      <main className={styles.main}>
        <Outlet />
      </main>
    </div>
  );
}
