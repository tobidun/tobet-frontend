// constants/odds.ts
// Odds format and display constants.

export const ODDS_FORMATS = {
  DECIMAL: 'decimal',
  FRACTIONAL: 'fractional',
  AMERICAN: 'american',
} as const;

export const DEFAULT_ODDS_FORMAT = ODDS_FORMATS.DECIMAL;

export const ODDS_CHANGE_THRESHOLD = 0.05; // 5% change triggers notification
