import type { GameSettings, ScoreStrategy } from "@/features/game/types"

export type { GameSettings, ScoreStrategy }

export interface UpdateGameSettingsPayload {
	durationSeconds?: number
	activeStrategy?: ScoreStrategy
	maxClicksPerSecond?: number
	isGameEnabled?: boolean
}
