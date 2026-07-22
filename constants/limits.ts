// constants/limits.ts
// Betting limits and risk constraints.

export const BETTING_LIMITS = {
  MIN_STAKE: 1,
  MAX_STAKE: 100000,
  MAX_SELECTIONS: 20,
  MIN_ODDS: 1.01,
  MAX_ODDS: 1000,
  DEFAULT_STAKE: 10,
} as const;

export const PAYOUT_LIMITS = {
  MIN_PAYOUT: 1,
  MAX_PAYOUT: 1000000,
} as const;
