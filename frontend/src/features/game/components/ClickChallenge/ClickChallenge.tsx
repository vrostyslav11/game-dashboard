import type { ChallengePhase } from '@/features/game/hooks/useClickChallenge';
import { Button } from '@/shared/ui/Button/Button';
import { Card } from '@/shared/ui/Card/Card';
import styles from './ClickChallenge.module.scss';

interface ClickChallengeProps {
  durationSeconds: number;
  phase: ChallengePhase;
  clicks: number;
  secondsLeft: number;
  isGameEnabled: boolean;
  isSubmitting: boolean;
  onStart: () => void;
  onClick: () => void;
}

export function ClickChallenge({
  durationSeconds,
  phase,
  clicks,
  secondsLeft,
  isGameEnabled,
  isSubmitting,
  onStart,
  onClick,
}: ClickChallengeProps) {
  const canStart = isGameEnabled && phase === 'idle' && !isSubmitting;
  const isPlaying = phase === 'playing';

  return (
    <Card title="Click challenge" className={styles.card}>
      {!isGameEnabled ? (
        <p className={styles.disabledMessage}>
          The game is currently disabled. Try again later.
        </p>
      ) : null}

      <div className={styles.stats}>
        <div className={styles.stat}>
          <span className={styles.statLabel}>Time left</span>
          <span className={styles.statValue}>
            {isPlaying ? secondsLeft : durationSeconds}s
          </span>
        </div>
        <div className={styles.stat}>
          <span className={styles.statLabel}>Clicks</span>
          <span className={styles.statValue}>{clicks}</span>
        </div>
      </div>

      <button
        type="button"
        className={[styles.clickArea, isPlaying ? styles.clickAreaActive : '']
          .filter(Boolean)
          .join(' ')}
        onClick={onClick}
        disabled={!isPlaying || isSubmitting}
        aria-label="Click to score"
      >
        {isPlaying ? 'Click!' : 'Click area'}
      </button>

      {isSubmitting ? (
        <p className={styles.hint}>Submitting score…</p>
      ) : (
        <p className={styles.hint}>
          {isPlaying
            ? 'Click as fast as you can before time runs out.'
            : 'Press Start when you are ready.'}
        </p>
      )}

      <Button
        type="button"
        onClick={onStart}
        disabled={!canStart}
        fullWidth
        className={styles.startButton}
      >
        Start
      </Button>
    </Card>
  );
}
