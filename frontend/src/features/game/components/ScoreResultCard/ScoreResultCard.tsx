import { STRATEGY_LABELS } from '@/features/game/constants';
import type { SubmitScoreResponse } from '@/features/game/types';
import { Button } from '@/shared/ui/Button/Button';
import { Card } from '@/shared/ui/Card/Card';
import styles from './ScoreResultCard.module.scss';

interface ScoreResultCardProps {
  result: SubmitScoreResponse;
  onPlayAgain: () => void;
}

export function ScoreResultCard({ result, onPlayAgain }: ScoreResultCardProps) {
  const { submission, entry } = result;

  return (
    <Card title="Last result" className={styles.card}>
      <dl className={styles.list}>
        <div className={styles.row}>
          <dt>Submitted score</dt>
          <dd>{submission.score}</dd>
        </div>
        <div className={styles.row}>
          <dt>Strategy used</dt>
          <dd>{STRATEGY_LABELS[submission.strategyUsed]}</dd>
        </div>
        <div className={styles.row}>
          <dt>Current score</dt>
          <dd>{entry.currentScore}</dd>
        </div>
        <div className={styles.row}>
          <dt>Best / Worst</dt>
          <dd>
            {entry.bestScore} / {entry.worstScore ?? '—'}
          </dd>
        </div>
        <div className={styles.row}>
          <dt>Games played</dt>
          <dd>{entry.gamesPlayed}</dd>
        </div>
      </dl>

      <Button type="button" onClick={onPlayAgain} fullWidth>
        Play again
      </Button>
    </Card>
  );
}
