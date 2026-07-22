// features/sportsbook/types/index.ts
// Shared types for the sportsbook feature.

export interface Sport {
  id: string;
  name: string;
  slug: string;
  icon?: string;
  isActive: boolean;
  category?: string;
}

export interface League {
  id: string;
  name: string;
  country: string;
  sportId: string;
  logo?: string;
  isActive: boolean;
}

export interface Team {
  id: string;
  name: string;
  shortName: string;
  logo?: string;
  color?: string;
}

export interface Match {
  id: string;
  sportId: string;
  leagueId: string;
  homeTeam: Team;
  awayTeam: Team;
  startTime: string;
  status: MatchStatus;
  currentPeriod?: string;
  score?: { home: number; away: number };
  liveMinute?: number;
  isFeatured?: boolean;
  isLive?: boolean;
  markets?: Market[];
}

export type MatchStatus =
  | "scheduled"
  | "live"
  | "finished"
  | "postponed"
  | "cancelled"
  | "half_time";

export interface Market {
  id: string;
  name: string;
  type: MarketType;
  isLive: boolean;
  selections: Selection[];
}

export type MarketType =
  | "match_winner"
  | "total_goals"
  | "both_teams_to_score"
  | "correct_score"
  | "half_time"
  | "handicap"
  | "custom";

export interface Selection {
  id: string;
  name: string;
  odds: number;
  oddsDisplay?: OddsDisplay;
  previousOdds?: number;
  status: SelectionStatus;
}

export type SelectionStatus = "active" | "suspended" | "won" | "lost" | "void";
export type OddsDisplay = "decimal" | "fractional" | "american";

export interface BetSelection {
  id: string;
  matchId: string;
  marketId: string;
  selectionId: string;
  match: Match;
  market: Market;
  selection: Selection;
  stake?: number;
}

export interface BetSlipState {
  selections: BetSelection[];
  stake: number;
  betType: BetType;
  totalOdds: number;
  potentialWin: number;
}

export type BetType = "single" | "double" | "treble" | "accumulator" | "system";

export interface Transaction {
  id: string;
  type: "deposit" | "withdrawal" | "bet_placed" | "bet_won" | "bet_lost";
  amount: number;
  currency: string;
  status: "pending" | "completed" | "failed";
  timestamp: string;
  description: string;
}

export interface Promotion {
  id: string;
  title: string;
  description: string;
  image?: string;
  ctaText: string;
  ctaLink?: string;
  isFeatured?: boolean;
  badge?: string;
  startDate: string;
  endDate: string;
}
