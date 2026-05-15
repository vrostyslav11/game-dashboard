import { z } from 'zod';

export const gameSettingsSchema = z.object({
  durationSeconds: z
    .number({ error: 'Duration is required' })
    .int('Duration must be a whole number')
    .min(1, 'Duration must be at least 1 second')
    .max(60, 'Duration must be at most 60 seconds'),
  activeStrategy: z.enum(['LATEST', 'MAX', 'MIN', 'CUMULATIVE']),
  maxClicksPerSecond: z
    .number({ error: 'Max clicks is required' })
    .int('Max clicks must be a whole number')
    .min(1, 'Max clicks must be at least 1')
    .max(100, 'Max clicks must be at most 100'),
  isGameEnabled: z.boolean(),
});

export type GameSettingsFormValues = z.infer<typeof gameSettingsSchema>;
