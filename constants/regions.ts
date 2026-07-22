// constants/regions.ts
// Regional configuration for betting markets.

export const REGIONS = [
  { code: 'US', name: 'United States', currency: 'USD', timezone: 'America/New_York' },
  { code: 'UK', name: 'United Kingdom', currency: 'GBP', timezone: 'Europe/London' },
  { code: 'EU', name: 'Europe', currency: 'EUR', timezone: 'Europe/Paris' },
  { code: 'CA', name: 'Canada', currency: 'CAD', timezone: 'America/Toronto' },
  { code: 'AU', name: 'Australia', currency: 'AUD', timezone: 'Australia/Sydney' },
] as const;

export type RegionCode = typeof REGIONS[number]['code'];
