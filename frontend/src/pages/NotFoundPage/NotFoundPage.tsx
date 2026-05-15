import { Link } from 'react-router-dom';
import { Button } from '@/shared/ui/Button/Button';
import { Card } from '@/shared/ui/Card/Card';
import styles from './NotFoundPage.module.scss';

export function NotFoundPage() {
  return (
    <div className={styles.wrapper}>
      <Card title="404 — Page not found" className={styles.card}>
        <p className={styles.message}>The page you requested does not exist.</p>
        <Link to="/">
          <Button>Go home</Button>
        </Link>
      </Card>
    </div>
  );
}

export default NotFoundPage;
