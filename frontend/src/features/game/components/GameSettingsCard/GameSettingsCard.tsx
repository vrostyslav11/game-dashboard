import type { GameSettings } from '@/features/game/types';
import { STRATEGY_LABELS } from '@/features/game/constants';
import { Card } from '@/shared/ui/Card/Card';
import styles from './GameSettingsCard.module.scss';

interface GameSettingsCardProps {
  settings: GameSettings;
}

export function GameSettingsCard({ settings }: GameSettingsCardProps) {
  return (
    <Card title="Game settings" className={styles.card}>
      <dl className={styles.list}>
        <div className={styles.row}>
          <dt>Strategy</dt>
          <dd>{STRATEGY_LABELS[settings.activeStrategy]}</dd>
        </div>
        <div className={styles.row}>
          <dt>Duration</dt>
          <dd>{settings.durationSeconds}s</dd>
        </div>
        <div className={styles.row}>
          <dt>Max clicks / second</dt>
          <dd>{settings.maxClicksPerSecond}</dd>
        </div>
        <div className={styles.row}>
          <dt>Status</dt>
          <dd>
            <span
              className={
                settings.isGameEnabled ? styles.badgeEnabled : styles.badgeDisabled
              }
            >
              {settings.isGameEnabled ? 'Enabled' : 'Disabled'}
            </span>
          </dd>
        </div>
      </dl>
    </Card>
  );
}
