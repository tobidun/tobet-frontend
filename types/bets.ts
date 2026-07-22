// types/bets.ts
// Betting slip, selection, placed bet, and cash out types.

import type { BetSelection } from "@/features/sportsbook/types";

export type BetType = "single" | "double" | "treble" | "accumulator" | "system";

export type BetStatus =
  | "open"
  | "partially_cashed_out"
  | "cashed_out"
  | "won"
  | "lost"
  | "void"
  | "cancelled";

export type SettlementOutcome = "won" | "lost" | "void" | "pending";

// A selection as held inside the slip (mirrors the sportsbook BetSelection).
export type SlipSelection = BetSelection;

export interface BetSlipState {
  selections: SlipSelection[];
  stake: number;
  betType: BetType;
  totalOdds: number;
  potentialWin: number;
}

// Offer presented when cashing out a bet.
export interface CashOutOffer {
  available: boolean;
  // Current full cash out value in account currency.
  fullValue: number;
  // Minimum allowed partial cash out value.
  minPartial: number;
  // Maximum allowed partial cash out value (defaults to fullValue).
  maxPartial: number;
  // The part of the stake that is already settled/won so far.
  settledAmount: number;
  // Probability-like confidence used to derive the offer (0-1).
  confidence: number;
}

// A bet that has been placed and tracked in "My Bets".
export interface PlacedBet {
  id: string;
  ticketNumber: string;
  selections: SlipSelection[];
  betType: BetType;
  totalOdds: number;
  stake: number;
  potentialWin: number;
  status: BetStatus;
  placedAt: string;
  settledAt?: string;
  currency: string;
  // Present once the bet reaches a terminal/partial state.
  cashOut?: CashOutOffer;
  // Per-selection settlement for transparency.
  selectionResults?: { selectionId: string; outcome: SettlementOutcome }[];
  // Amount actually returned to the user (winnings + stake returned).
  returnedAmount?: number;
}

export interface BetFilters {
  status: "all" | "open" | "settled" | "won" | "lost" | "cancelled";
  search: string;
}
