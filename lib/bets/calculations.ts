// lib/bets/calculations.ts
// Pure helpers for bet slip math and settlement.

import type { BetSelection } from "@/features/sportsbook/types";

export const calcTotalOdds = (selections: BetSelection[]): number =>
  selections.reduce((acc, s) => acc * s.selection.odds, 1);

export const calcPotentialWin = (
  selections: BetSelection[],
  stake: number
): number => calcTotalOdds(selections) * stake;

export const formatTicketNumber = (): string => {
  const chars = "0123456789ABCDEF";
  let out = "";
  for (let i = 0; i < 8; i += 1) {
    out += chars[Math.floor(Math.random() * chars.length)];
  }
  return `TN-${out}`;
};

// Derive a plausible cash out value from stake, potential win, and confidence.
export const deriveCashOutValue = (
  stake: number,
  potentialWin: number,
  confidence: number
): number => {
  const profit = potentialWin - stake;
  const value = stake + profit * confidence;
  return Math.max(0, Math.round(value * 100) / 100);
};
