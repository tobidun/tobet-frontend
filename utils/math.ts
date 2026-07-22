// utils/math.ts
// Pure math utilities for odds and probability.

export const decimalToFractional = (decimal: number): string => {
  if (decimal < 1) return '0/1';
  const whole = Math.floor(decimal);
  const fraction = decimal - whole;
  const precision = 100;
  const numerator = Math.round(fraction * precision);
  const denominator = precision;
  const divisor = gcd(numerator, denominator);
  return `${whole * denominator / divisor + numerator / divisor}/${denominator / divisor}`;
};

export const fractionalToDecimal = (fractional: string): number => {
  const [numerator, denominator] = fractional.split('/').map(Number);
  return numerator / denominator + 1;
};

export const decimalToAmerican = (decimal: number): number => {
  if (decimal >= 2) return Math.round((decimal - 1) * 100);
  return Math.round(-100 / (decimal - 1));
};

export const americanToDecimal = (american: number): number => {
  if (american > 0) return american / 100 + 1;
  return 100 / Math.abs(american) + 1;
};

export const calculatePayout = (stake: number, totalOdds: number): number => {
  return Math.round(stake * totalOdds * 100) / 100;
};

const gcd = (a: number, b: number): number => {
  return b === 0 ? a : gcd(b, a % b);
};
