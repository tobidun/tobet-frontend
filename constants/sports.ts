// constants/sports.ts
// Supported sports catalogue.

export const SPORTS = [
  { id: '1', name: 'Football', slug: 'football' },
  { id: '2', name: 'Basketball', slug: 'basketball' },
  { id: '3', name: 'Tennis', slug: 'tennis' },
  { id: '4', name: 'Hockey', slug: 'hockey' },
  { id: '5', name: 'Baseball', slug: 'baseball' },
  { id: '6', name: 'Soccer', slug: 'soccer' },
  { id: '7', name: 'MMA', slug: 'mma' },
  { id: '8', name: 'Boxing', slug: 'boxing' },
] as const;

export type SportId = typeof SPORTS[number]['id'];
