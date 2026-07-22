// features/sportsbook/mock-data/index.ts
// Realistic mock data for sportsbook components.

import type { Match, Sport, League, Market, Selection, Promotion, Transaction, Team } from "../types";

export const mockTeams: Record<string, Team> = {
  home: { id: "t1", name: "Manchester United", shortName: "MUN", color: "#DA291C" },
  away: { id: "t2", name: "Liverpool FC", shortName: "LIV", color: "#C8102E" },
  homeBasketball: { id: "t3", name: "Los Angeles Lakers", shortName: "LAL", color: "#552583" },
  awayBasketball: { id: "t4", name: "Boston Celtics", shortName: "BOS", color: "#007A33" },
  homeTennis: { id: "t5", name: "Novak Djokovic", shortName: "DJO", color: "#1E3A8A" },
  awayTennis: { id: "t6", name: "Carlos Alcaraz", shortName: "ALC", color: "#DC2626" },
};

export const mockSports: Sport[] = [
  { id: "1", name: "Football", slug: "football", icon: "⚽", isActive: true, category: "Team Sports" },
  { id: "2", name: "Basketball", slug: "basketball", icon: "🏀", isActive: true, category: "Team Sports" },
  { id: "3", name: "Tennis", slug: "tennis", icon: "🎾", isActive: true, category: "Individual Sports" },
  { id: "4", name: "Hockey", slug: "hockey", icon: "🏒", isActive: false, category: "Team Sports" },
  { id: "5", name: "Baseball", slug: "baseball", icon: "⚾", isActive: false, category: "Team Sports" },
  { id: "6", name: "MMA", slug: "mma", icon: "🥊", isActive: true, category: "Combat Sports" },
  { id: "7", name: "Boxing", slug: "boxing", icon: "🥋", isActive: false, category: "Combat Sports" },
  { id: "8", name: "Cricket", slug: "cricket", icon: "🏏", isActive: false, category: "Team Sports" },
];

export const mockLeagues: League[] = [
  { id: "l1", name: "Premier League", country: "England", sportId: "1", logo: "🏴󠁧󠁢󠁥󠁮󠁧󠁿", isActive: true },
  { id: "l2", name: "La Liga", country: "Spain", sportId: "1", logo: "🇪🇸", isActive: true },
  { id: "l3", name: "NBA", country: "USA", sportId: "2", logo: "🇺🇸", isActive: true },
  { id: "l4", name: "ATP Tour", country: "International", sportId: "3", logo: "🌍", isActive: true },
];

export const createMockMatch = (overrides?: Partial<Match>): Match => {
  const base: Match = {
    id: "match-1",
    sportId: "1",
    leagueId: "l1",
    homeTeam: mockTeams.home,
    awayTeam: mockTeams.away,
    startTime: new Date(Date.now() + 3600000).toISOString(),
    status: "scheduled",
    isFeatured: true,
    isLive: false,
    markets: [
      {
        id: "m1",
        name: "Match Winner",
        type: "match_winner",
        isLive: false,
        selections: [
          { id: "s1", name: "Home", odds: 2.10, previousOdds: 2.05, status: "active" },
          { id: "s2", name: "Draw", odds: 3.40, previousOdds: 3.40, status: "active" },
          { id: "s3", name: "Away", odds: 3.20, previousOdds: 3.25, status: "active" },
        ],
      },
    ],
  };
  return { ...base, ...overrides };
};

export const mockMatches: Match[] = [
  createMockMatch({ id: "1", status: "live", liveMinute: 67, score: { home: 2, away: 1 }, isLive: true, isFeatured: false }),
  createMockMatch({ id: "2", status: "live", liveMinute: 34, score: { home: 0, away: 0 }, isLive: true, isFeatured: false }),
  createMockMatch({ id: "3", status: "scheduled", startTime: new Date(Date.now() + 7200000).toISOString(), isFeatured: true }),
  createMockMatch({ id: "4", status: "scheduled", startTime: new Date(Date.now() + 86400000).toISOString(), isFeatured: false }),
  createMockMatch({ id: "5", status: "finished", score: { home: 3, away: 2 }, isLive: false }),
  createMockMatch({ id: "6", status: "half_time", liveMinute: 45, score: { home: 1, away: 1 }, isLive: true, isFeatured: false }),
];

export const mockMarkets: Market[] = [
  {
    id: "m1",
    name: "Match Winner",
    type: "match_winner",
    isLive: true,
    selections: [
      { id: "s1", name: "Home", odds: 2.10, previousOdds: 2.05, status: "active" },
      { id: "s2", name: "Draw", odds: 3.40, previousOdds: 3.40, status: "active" },
      { id: "s3", name: "Away", odds: 3.20, previousOdds: 3.25, status: "active" },
    ],
  },
  {
    id: "m2",
    name: "Total Goals",
    type: "total_goals",
    isLive: true,
    selections: [
      { id: "s4", name: "Over 2.5", odds: 1.85, previousOdds: 1.80, status: "active" },
      { id: "s5", name: "Under 2.5", odds: 1.95, previousOdds: 1.95, status: "active" },
    ],
  },
  {
    id: "m3",
    name: "Both Teams To Score",
    type: "both_teams_to_score",
    isLive: false,
    selections: [
      { id: "s6", name: "Yes", odds: 1.75, previousOdds: 1.75, status: "active" },
      { id: "s7", name: "No", odds: 2.00, previousOdds: 2.05, status: "active" },
    ],
  },
];

export const mockPromotions: Promotion[] = [
  {
    id: "p1",
    title: "Welcome Bonus",
    description: "Get 100% match on your first deposit up to $200",
    ctaText: "Claim Now",
    isFeatured: true,
    badge: "New",
    startDate: new Date().toISOString(),
    endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "p2",
    title: "Acca Insurance",
    description: "Get your money back if one leg of your accumulator loses",
    ctaText: "Learn More",
    startDate: new Date().toISOString(),
    endDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(),
  },
];

export const mockTransactions: Transaction[] = [
  {
    id: "t1",
    type: "deposit",
    amount: 500,
    currency: "USD",
    status: "completed",
    timestamp: new Date(Date.now() - 86400000).toISOString(),
    description: "Deposit via Visa",
  },
  {
    id: "t2",
    type: "bet_placed",
    amount: 50,
    currency: "USD",
    status: "completed",
    timestamp: new Date(Date.now() - 43200000).toISOString(),
    description: "Bet on Manchester United vs Liverpool",
  },
  {
    id: "t3",
    type: "bet_won",
    amount: 105,
    currency: "USD",
    status: "completed",
    timestamp: new Date(Date.now() - 3600000).toISOString(),
    description: "Won bet #12345",
  },
];
