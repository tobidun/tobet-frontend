// types/sports.ts
// Sport, league, event, and market types.

export interface Sport {
  id: string;
  name: string;
  slug: string;
  icon?: string;
  isActive: boolean;
}

export interface League {
  id: string;
  sportId: string;
  name: string;
  country: string;
  season?: string;
}

export interface Event {
  id: string;
  sportId: string;
  leagueId: string;
  homeTeam: string;
  awayTeam: string;
  startTime: string;
  status: 'scheduled' | 'live' | 'finished' | 'postponed' | 'cancelled';
  currentPeriod?: string;
  score?: { home: number; away: number };
}

export interface Market {
  id: string;
  eventId: string;
  name: string;
  isLive: boolean;
  selections: Selection[];
}
