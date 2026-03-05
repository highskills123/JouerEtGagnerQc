export type TournamentStatus = 'upcoming' | 'active' | 'completed';

export interface Tournament {
  id: string;
  title: string;
  description: string;
  status: TournamentStatus;
  prizePool: number;
  currency: string;
  maxParticipants: number;
  currentParticipants: number;
  startDate: string;
  endDate: string;
  imageUrl?: string;
  gameType: string;
  entryFee: number;
  leaderboard?: TournamentEntry[];
}

export interface TournamentEntry {
  userId: string;
  username: string;
  score: number;
  rank: number;
  prize: number;
}
