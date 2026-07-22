// utils/validation.ts
// Validation utilities.

export const isValidEmail = (email: string): boolean => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

export const isValidPassword = (password: string): boolean => {
  return password.length >= 8;
};

export const isValidStake = (stake: number): boolean => {
  return Number.isFinite(stake) && stake > 0;
};

export const isValidOdds = (odds: number): boolean => {
  return Number.isFinite(odds) && odds >= 1.01;
};
