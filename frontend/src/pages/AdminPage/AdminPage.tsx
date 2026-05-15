import { GameSettingsForm } from '@/features/admin/components/GameSettingsForm/GameSettingsForm';
import { useGameSettingsQuery } from '@/features/game/hooks';
import { getApiErrorMessage } from '@/shared/api/apiError';
import { Card } from '@/shared/ui/Card/Card';
import { FormError } from '@/shared/ui/FormError/FormError';
import { Loader } from '@/shared/ui/Loader/Loader';
import styles from './AdminPage.module.scss';

export default function AdminPage() {
  const { data: settings, isLoading, isError, error } = useGameSettingsQuery();

  return (
    <Card title="Admin panel" className={styles.page}>
      {isLoading ? <Loader label="Loading game settings…" /> : null}

      {isError ? (
        <FormError
          message={error ? getApiErrorMessage(error) : 'Failed to load game settings'}
        />
      ) : null}

      {settings ? <GameSettingsForm settings={settings} /> : null}
    </Card>
  );
}
