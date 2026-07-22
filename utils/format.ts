// utils/format.ts
// Pure formatting utilities.

export const formatCurrency = (value: number, currency = 'USD') => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  }).format(value);
};

export const formatNumber = (value: number) => {
  return new Intl.NumberFormat('en-US').format(value);
};

export const formatPercentage = (value: number, decimals = 2) => {
  return `${value.toFixed(decimals)}%`;
};
