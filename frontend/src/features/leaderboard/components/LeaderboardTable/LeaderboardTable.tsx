import type { LeaderboardEntry } from "@/features/leaderboard/types"
import { Table, TableBody, TableCell, TableEmpty, TableHead, TableHeader, TableRow } from "@/shared/ui/Table/Table"
import styles from "./LeaderboardTable.module.scss"

const COLUMN_COUNT = 9

function formatScore(value: number | null): string {
	return value === null ? "—" : String(value)
}

function formatDate(iso: string): string {
	return new Date(iso).toLocaleString()
}

interface LeaderboardTableProps {
	items: LeaderboardEntry[]
}

export function LeaderboardTable({ items }: LeaderboardTableProps) {
	return (
		<Table>
			<TableHead>
				<TableRow>
					<TableHeader>Rank</TableHeader>
					<TableHeader>Player</TableHeader>
					<TableHeader>Current</TableHeader>
					<TableHeader>Best</TableHeader>
					<TableHeader>Worst</TableHeader>
					<TableHeader>Last</TableHeader>
					<TableHeader>Total</TableHeader>
					<TableHeader>Games</TableHeader>
					<TableHeader>Updated</TableHeader>
				</TableRow>
			</TableHead>
			<TableBody>
				{items.length === 0 ? (
					<TableEmpty colSpan={COLUMN_COUNT} message="No players match your filters" />
				) : (
					items.map((entry) => (
						<TableRow key={entry.userId}>
							<TableCell>{entry.rank}</TableCell>
							<TableCell className={styles.username}>{entry.username}</TableCell>
							<TableCell>{entry.currentScore}</TableCell>
							<TableCell>{entry.bestScore}</TableCell>
							<TableCell>{formatScore(entry.worstScore)}</TableCell>
							<TableCell>{entry.lastScore}</TableCell>
							<TableCell>{entry.totalScore}</TableCell>
							<TableCell>{entry.gamesPlayed}</TableCell>
							<TableCell className={styles.date}>{formatDate(entry.updatedAt)}</TableCell>
						</TableRow>
					))
				)}
			</TableBody>
		</Table>
	)
}
