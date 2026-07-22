// features/layout/mock-data/index.ts
// Realistic mock data for layout components.

import type { NavItem, Category, League, RecentMatch, Promotion, TrendingBet, Notification, UserMenuItem } from "../types";

export const mockNavigation: NavItem[] = [
  { id: "sportsbook", label: "Sportsbook", href: "/sportsbook", isActive: true },
  { id: "live", label: "Live", href: "/live", isActive: false },
  { id: "in-play", label: "In-Play", href: "/in-play", isActive: false },
  { id: "promotions", label: "Promotions", href: "/promotions", isActive: false },
  { id: "results", label: "Results", href: "/results", isActive: false },
];

export const mockCategories: Category[] = [
  {
    id: "team-sports",
    name: "Team Sports",
    icon: "⚽",
    items: [
      { id: "football", label: "Football", href: "/sports/football" },
      { id: "basketball", label: "Basketball", href: "/sports/basketball" },
      { id: "tennis", label: "Tennis", href: "/sports/tennis" },
      { id: "hockey", label: "Hockey", href: "/sports/hockey" },
      { id: "baseball", label: "Baseball", href: "/sports/baseball" },
      { id: "cricket", label: "Cricket", href: "/sports/cricket" },
    ],
  },
  {
    id: "combat-sports",
    name: "Combat Sports",
    icon: "🥊",
    items: [
      { id: "mma", label: "MMA", href: "/sports/mma" },
      { id: "boxing", label: "Boxing", href: "/sports/boxing" },
      { id: "ufc", label: "UFC", href: "/sports/ufc" },
    ],
  },
  {
    id: "motorsports",
    name: "Motorsports",
    icon: "🏎️",
    items: [
      { id: "f1", label: "Formula 1", href: "/sports/f1" },
      { id: "motogp", label: "MotoGP", href: "/sports/motogp" },
      { id: "nascar", label: "NASCAR", href: "/sports/nascar" },
    ],
  },
];

export const mockLeagues: League[] = [
  { id: "l1", name: "Premier League", country: "England", logo: "🏴󠁧󠁢󠁥󠁮󠁧󠁿", isFavorite: true },
  { id: "l2", name: "La Liga", country: "Spain", logo: "🇪🇸", isFavorite: true },
  { id: "l3", name: "NBA", country: "USA", logo: "🇺🇸", isFavorite: false },
  { id: "l4", name: "ATP Tour", country: "International", logo: "🌍", isFavorite: false },
  { id: "l5", name: "Serie A", country: "Italy", logo: "🇮🇹", isFavorite: true },
  { id: "l6", name: "Bundesliga", country: "Germany", logo: "🇩🇪", isFavorite: false },
];

export const mockRecentMatches: RecentMatch[] = [
  { id: "1", homeTeam: "Manchester United", awayTeam: "Liverpool", score: { home: 2, away: 1 }, status: "finished", timestamp: "2024-01-15T20:00:00Z" },
  { id: "2", homeTeam: "Lakers", awayTeam: "Celtics", score: { home: 108, away: 102 }, status: "finished", timestamp: "2024-01-15T23:30:00Z" },
  { id: "3", homeTeam: "Djokovic", awayTeam: "Alcaraz", score: { home: 2, away: 1 }, status: "live", timestamp: "2024-01-16T15:00:00Z" },
  { id: "4", homeTeam: "Arsenal", awayTeam: "Chelsea", status: "scheduled", timestamp: "2024-01-16T20:00:00Z" },
];

export const mockPromotions: Promotion[] = [
  {
    id: "p1",
    title: "Welcome Bonus",
    description: "Get 100% match on your first deposit up to $200",
    ctaText: "Claim Now",
    badge: "New",
  },
  {
    id: "p2",
    title: "Acca Insurance",
    description: "Get your money back if one leg of your accumulator loses",
    ctaText: "Learn More",
  },
  {
    id: "p3",
    title: "Live Betting Boost",
    description: "Enhanced odds on selected live matches every day",
    ctaText: "View Offers",
    badge: "Hot",
  },
];

export const mockTrendingBets: TrendingBet[] = [
  { id: "1", match: "Man United vs Liverpool", selection: "Home Win", odds: 2.10, stake: 1250, users: 342 },
  { id: "2", match: "Lakers vs Celtics", selection: "Over 215.5", odds: 1.85, stake: 890, users: 256 },
  { id: "3", match: "Djokovic vs Alcaraz", selection: "Djokovic", odds: 1.75, stake: 2100, users: 189 },
];

export const mockNotifications: Notification[] = [
  { id: "1", title: "Bet Won!", message: "Your bet on Man United won $105.00", timestamp: "2024-01-15T21:00:00Z", read: false, type: "bet" },
  { id: "2", title: "New Promotion", message: "Check out our enhanced odds for today's matches", timestamp: "2024-01-15T18:00:00Z", read: false, type: "promotion" },
  { id: "3", title: "Bet Placed", message: "Your bet on Lakers vs Celtics has been placed", timestamp: "2024-01-15T23:45:00Z", read: true, type: "bet" },
];

export const mockUserMenu: UserMenuItem[] = [
  { id: "profile", label: "My Profile", href: "/profile" },
  { id: "bets", label: "My Bets", href: "/bets" },
  { id: "history", label: "Betting History", href: "/history" },
  { id: "wallet", label: "Wallet", href: "/wallet" },
  { id: "settings", label: "Settings", href: "/settings" },
  { id: "help", label: "Help & Support", href: "/help" },
  { id: "divider", label: "", divider: true },
  { id: "logout", label: "Log Out", onClick: () => {}, danger: true },
];
