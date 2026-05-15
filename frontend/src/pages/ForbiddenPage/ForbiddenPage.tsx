import { Link } from 'react-router-dom';
import { Button } from '@/shared/ui/Button/Button';
import { Card } from '@/shared/ui/Card/Card';
import styles from './ForbiddenPage.module.scss';

export default function ForbiddenPage() {
  return (
    <div className={styles.wrapper}>
      <Card title="403 — Forbidden" className={styles.card}>
        <p className={styles.message}>
          You do not have permission to access this page.
        </p>
        <Link to="/">
          <Button>Go to game</Button>
        </Link>
      </Card>
    </div>
  );
}
