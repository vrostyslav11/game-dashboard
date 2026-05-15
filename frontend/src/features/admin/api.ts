import { axiosInstance } from "@/shared/api/axiosInstance"
import type { GameSettings, UpdateGameSettingsPayload } from "./types"

export async function updateGameSettings(payload: UpdateGameSettingsPayload): Promise<GameSettings> {
	const { data } = await axiosInstance.patch<GameSettings>("/admin/game-settings", payload)
	return data
}
