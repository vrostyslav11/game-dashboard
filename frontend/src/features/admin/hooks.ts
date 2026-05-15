import { useMutation, useQueryClient } from "@tanstack/react-query"
import { gameKeys } from "@/features/game/hooks"
import { leaderboardKeys } from "@/features/leaderboard/hooks"
import { updateGameSettings } from "./api"
import type { UpdateGameSettingsPayload } from "./types"

export function useUpdateGameSettingsMutation() {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: (payload: UpdateGameSettingsPayload) => updateGameSettings(payload),
		onSuccess: () => {
			void queryClient.invalidateQueries({ queryKey: gameKeys.settings })
			void queryClient.invalidateQueries({ queryKey: leaderboardKeys.all })
		},
	})
}
