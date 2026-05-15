import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { AdminAlert } from '@/features/admin/components/AdminAlert/AdminAlert';
import { useUpdateGameSettingsMutation } from '@/features/admin/hooks';
import { gameSettingsSchema, type GameSettingsFormValues } from '@/features/admin/schemas';
import { STRATEGY_LABELS } from '@/features/game/constants';
import type { GameSettings, ScoreStrategy } from '@/features/game/types';
import { getApiErrorMessage } from '@/shared/api/apiError';
import { Button } from '@/shared/ui/Button/Button';
import { Input } from '@/shared/ui/Input/Input';
import { Select } from '@/shared/ui/Select/Select';
import styles from './GameSettingsForm.module.scss';

const STRATEGY_OPTIONS = (Object.keys(STRATEGY_LABELS) as ScoreStrategy[]).map((value) => ({
  value,
  label: STRATEGY_LABELS[value],
}));

interface GameSettingsFormProps {
  settings: GameSettings;
}

function toFormValues(settings: GameSettings): GameSettingsFormValues {
  return {
    durationSeconds: settings.durationSeconds,
    activeStrategy: settings.activeStrategy,
    maxClicksPerSecond: settings.maxClicksPerSecond,
    isGameEnabled: settings.isGameEnabled,
  };
}

export function GameSettingsForm({ settings }: GameSettingsFormProps) {
  const updateMutation = useUpdateGameSettingsMutation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<GameSettingsFormValues>({
    resolver: zodResolver(gameSettingsSchema),
    defaultValues: toFormValues(settings),
  });

  useEffect(() => {
    reset(toFormValues(settings));
  }, [settings, reset]);

  const isLoading = isSubmitting || updateMutation.isPending;

  return (
    <section className={styles.section}>
      <h3 className={styles.heading}>Game settings</h3>
      <p className={styles.meta}>
        Last updated {new Date(settings.updatedAt).toLocaleString()}
      </p>

      <form
        className={styles.form}
        onSubmit={handleSubmit((values) => updateMutation.mutate(values))}
        noValidate
      >
        <AdminAlert
          error={updateMutation.error ? getApiErrorMessage(updateMutation.error) : null}
          success={updateMutation.isSuccess ? 'Game settings saved.' : null}
        />

        <div className={styles.fields}>
          <Input
            label="Duration (seconds)"
            type="number"
            min={1}
            max={60}
            disabled={isLoading}
            error={errors.durationSeconds?.message}
            {...register('durationSeconds', { valueAsNumber: true })}
          />

          <Select
            label="Score strategy"
            options={STRATEGY_OPTIONS}
            disabled={isLoading}
            error={errors.activeStrategy?.message}
            {...register('activeStrategy')}
          />

          <Input
            label="Max clicks per second"
            type="number"
            min={1}
            max={100}
            disabled={isLoading}
            error={errors.maxClicksPerSecond?.message}
            {...register('maxClicksPerSecond', { valueAsNumber: true })}
          />

          <label className={styles.checkbox}>
            <input type="checkbox" disabled={isLoading} {...register('isGameEnabled')} />
            <span>Game enabled</span>
          </label>
        </div>

        <Button type="submit" disabled={isLoading}>
          {isLoading ? 'Saving…' : 'Save settings'}
        </Button>
      </form>
    </section>
  );
}
