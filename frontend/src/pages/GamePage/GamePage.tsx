import { useCallback, useEffect, useState } from 'react';
import { ClickChallenge } from '@/features/game/components/ClickChallenge/ClickChallenge';
import { GameSettingsCard } from '@/features/game/components/GameSettingsCard/GameSettingsCard';
import { ScoreResultCard } from '@/features/game/components/ScoreResultCard/ScoreResultCard';
import {
  useClickChallenge,
  useGameSettingsQuery,
  useSubmitScoreMutation,
} from '@/features/game/hooks';
import type { SubmitScoreResponse } from '@/features/game/types';
import { getApiErrorMessage } from '@/shared/api/apiError';
import { FormError } from '@/shared/ui/FormError/FormError';
import { Loader } from '@/shared/ui/Loader/Loader';
import styles from './GamePage.module.scss';

export default function GamePage() {
  const { data: settings, isLoading, isError, error } = useGameSettingsQuery();
  const submitMutation = useSubmitScoreMutation();
  const [lastResult, setLastResult] = useState<SubmitScoreResponse | null>(null);

  const handleTimeUp = useCallback(
    (score: number) => {
      if (!settings) return;
      submitMutation.mutate(
        { score, durationSeconds: settings.durationSeconds },
        { onSuccess: (data) => setLastResult(data) },
      );
    },
    [settings, submitMutation],
  );

  const challenge = useClickChallenge({
    durationSeconds: settings?.durationSeconds ?? 10,
    onTimeUp: handleTimeUp,
  });

  useEffect(() => {
    if (submitMutation.isError && challenge.phase === 'finished') {
      challenge.reset();
    }
  }, [submitMutation.isError, challenge.phase, challenge]);

  const handlePlayAgain = () => {
    submitMutation.reset();
    setLastResult(null);
    challenge.reset();
  };

  const showResult =
    lastResult !== null && !submitMutation.isPending && challenge.phase === 'finished';

  if (isLoading) {
    return <Loader label="Loading game settings…" />;
  }

  if (isError || !settings) {
    return (
      <FormError
        message={error ? getApiErrorMessage(error) : 'Failed to load game settings'}
      />
    );
  }

  return (
    <div className={styles.page}>
      <GameSettingsCard settings={settings} />

      <FormError message={submitMutation.error && getApiErrorMessage(submitMutation.error)} />

      {showResult ? (
        <ScoreResultCard result={lastResult} onPlayAgain={handlePlayAgain} />
      ) : (
        <ClickChallenge
          durationSeconds={settings.durationSeconds}
          phase={challenge.phase}
          clicks={challenge.clicks}
          secondsLeft={challenge.secondsLeft}
          isGameEnabled={settings.isGameEnabled}
          isSubmitting={submitMutation.isPending}
          onStart={challenge.start}
          onClick={challenge.registerClick}
        />
      )}
    </div>
  );
}
