// lib/api/endpoints.ts
// API endpoint constants.

export const ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    LOGOUT: '/auth/logout',
    REFRESH: '/auth/refresh',
    ME: '/auth/me',
  },
  SPORTS: {
    LIST: '/sports',
    DETAIL: '/sports/:id',
  },
  EVENTS: {
    LIST: '/events',
    DETAIL: '/events/:id',
    LIVE: '/events/live',
  },
  BETS: {
    PLACE: '/bets',
    HISTORY: '/bets/history',
    DETAIL: '/bets/:id',
  },
  ACCOUNT: {
    PROFILE: '/account/profile',
    VERIFY: '/account/verify',
  },
  PAYMENTS: {
    DEPOSITS: '/payments/deposits',
    WITHDRAWALS: '/payments/withdrawals',
  },
} as const;
