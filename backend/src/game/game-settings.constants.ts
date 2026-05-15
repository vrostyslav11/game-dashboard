/**
 * Fixed primary key for the singleton `GameSettings` row.
 * The seed creates this row; the repository always upserts against it.
 * Keeping the value here (and importing it from the seed) prevents drift.
 */
export const GAME_SETTINGS_ID = '00000000-0000-0000-0000-000000000001';
