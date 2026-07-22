// features/layout/types/index.ts
// Shared types for the layout feature.

export interface NavItem {
  id: string;
  label: string;
  href?: string;
  icon?: React.ReactNode;
  children?: NavItem[];
  isActive?: boolean;
  isExternal?: boolean;
}

export interface UserMenuItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  href?: string;
  onClick?: () => void;
  divider?: boolean;
  danger?: boolean;
}

export interface Category {
  id: string;
  name: string;
  icon?: string;
  items: NavItem[];
}

export interface League {
  id: string;
  name: string;
  country: string;
  logo?: string;
  isFavorite?: boolean;
}

export interface RecentMatch {
  id: string;
  homeTeam: string;
  awayTeam: string;
  score?: { home: number; away: number };
  status: string;
  timestamp: string;
}

export interface Promotion {
  id: string;
  title: string;
  description: string;
  image?: string;
  ctaText: string;
  ctaLink?: string;
  badge?: string;
}

export interface TrendingBet {
  id: string;
  match: string;
  selection: string;
  odds: number;
  stake: number;
  users: number;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  type: "bet" | "promotion" | "system";
}
