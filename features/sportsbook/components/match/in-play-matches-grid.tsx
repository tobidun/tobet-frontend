"use client";

// features/sportsbook/components/match/in-play-matches-grid.tsx
// In-Play Live section with sport filter pills, live match cards, odds buttons, and skeleton loading state.

import { useState } from "react";
import { cn } from "@/lib/utils/cn";
import { Radio, Star, Zap } from "lucide-react";
import { Skeleton } from "@/components/ui/feedback/skeleton";

export interface MatchOdd {
  label: string; // "1", "X", "2" or "OVER", "TOTAL", "UNDER"
  odds: number;
}

export interface LiveMatchData {
  id: string;
  category: string;
  period: string; // e.g. "H2 68:13"
  marketsCount: number;
  homeTeam: string;
  awayTeam: string;
  homeScore: number;
  awayScore: number;
  isFavourite?: boolean;
  odds: MatchOdd[];
}

interface InPlayMatchesGridProps {
  isLoading?: boolean;
  onSelectOdd?: (match: LiveMatchData, odd: MatchOdd) => void;
  selectedOddsIds?: string[];
  className?: string;
}

const filterCategories = [
  { id: "football", label: "Football", icon: "⚽" },
  { id: "basketball", label: "Basketball", icon: "🏀" },
  { id: "tennis", label: "Tennis", icon: "🎾" },
  { id: "table-tennis", label: "Table Tennis", icon: "🏓" },
  { id: "esports", label: "E-Sports", icon: "🎮" },
  { id: "volleyball", label: "Volleyball", icon: "🏐" },
];

const mockLiveMatches: LiveMatchData[] = [
  {
    id: "m1",
    category: "Football. Iceland. Cup",
    period: "H2 68:13",
    marketsCount: 105,
    homeTeam: "Fylkir",
    awayTeam: "Afturelding",
    homeScore: 1,
    awayScore: 1,
    odds: [
      { label: "1", odds: 3.70 },
      { label: "X", odds: 1.83 },
      { label: "2", odds: 3.25 },
    ],
  },
  {
    id: "m2",
    category: "Football. Iceland. Women. Urvalsdeild",
    period: "H2 88:57",
    marketsCount: 19,
    homeTeam: "Valur (w)",
    awayTeam: "Breidablik (w)",
    homeScore: 1,
    awayScore: 7,
    odds: [
      { label: "OVER", odds: 4.00 },
      { label: "TOTAL", odds: 8.5 },
      { label: "UNDER", odds: 1.22 },
    ],
  },
  {
    id: "m3",
    category: "Football. Iceland. Urvalsdeild",
    period: "H2 83:59",
    marketsCount: 45,
    homeTeam: "FH Hafnarfjörður",
    awayTeam: "Stjarnan (w)",
    homeScore: 2,
    awayScore: 1,
    odds: [
      { label: "OVER", odds: 2.20 },
      { label: "TOTAL", odds: 3.40 },
      { label: "UNDER", odds: 2.80 },
    ],
  },
];

const leaguePills = [
  { id: "premier", label: "Premier League", icon: "🦁" },
  { id: "laliga", label: "LaLiga", icon: "🇪🇸" },
  { id: "seriea", label: "Serie A", icon: "🇮🇹" },
  { id: "bundesliga", label: "Bundesliga", icon: "🇩🇪" },
  { id: "ligue1", label: "Ligue 1", icon: "🇫🇷" },
];

export function InPlayMatchesGrid({
  isLoading = false,
  onSelectOdd,
  selectedOddsIds = [],
  className,
}: InPlayMatchesGridProps) {
  const [activeFilter, setActiveFilter] = useState("football");
  const [favourites, setFavourites] = useState<Record<string, boolean>>({});

  const toggleFav = (id: string) => {
    setFavourites((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className={cn("w-full space-y-4 my-4", className)}>
      {/* Category Filter Pills Bar */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
        {filterCategories.map((cat) => {
          const isActive = activeFilter === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setActiveFilter(cat.id)}
              className={cn(
                "flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold shrink-0 transition-colors cursor-pointer",
                isActive
                  ? "bg-[#2A2E37] text-white ring-1 ring-gray-600"
                  : "bg-[#14161B] text-gray-400 hover:text-white hover:bg-[#1E222A]"
              )}
            >
              <span>{cat.icon}</span>
              <span>{cat.label}</span>
            </button>
          );
        })}
      </div>

      {/* In-Play Header */}
      <div className="flex items-center gap-2">
        <span className="text-lg">⚽</span>
        <span className="text-lg">🔥</span>
        <h2 className="text-base font-bold text-white tracking-wide">In-Play</h2>
        <span className="bg-red-600 text-white font-bold text-[10px] uppercase px-2 py-0.5 rounded-md flex items-center gap-1 leading-none">
          <Radio className="size-3 animate-pulse" /> Live
        </span>
      </div>

      {/* Match Cards Grid or Skeleton Loaders */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="bg-[#14161B] border border-[#222630] rounded-xl p-3 space-y-3"
            >
              <div className="flex items-center justify-between">
                <Skeleton className="h-3 w-32 bg-[#222630]" />
                <Skeleton className="h-3 w-16 bg-[#222630]" />
              </div>
              <div className="space-y-2 my-2">
                <Skeleton className="h-4 w-3/4 bg-[#222630]" />
                <Skeleton className="h-4 w-2/3 bg-[#222630]" />
              </div>
              <div className="grid grid-cols-3 gap-2">
                <Skeleton className="h-10 w-full bg-[#222630] rounded-lg" />
                <Skeleton className="h-10 w-full bg-[#222630] rounded-lg" />
                <Skeleton className="h-10 w-full bg-[#222630] rounded-lg" />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
          {mockLiveMatches.map((match) => (
            <div
              key={match.id}
              className="bg-[#14161B] border border-[#222630] rounded-xl p-3 flex flex-col justify-between space-y-3 hover:border-gray-700 transition-colors shadow-lg"
            >
              {/* Card Header: Category & Live Time */}
              <div className="flex items-center justify-between text-[11px] text-gray-400">
                <span className="truncate font-medium">{match.category}</span>
                <div className="flex items-center gap-1.5 shrink-0">
                  <span className="text-red-500 font-bold flex items-center gap-1">
                    <Radio className="size-3 animate-pulse" /> {match.period}
                  </span>
                  <span className="text-gray-400 hover:text-white cursor-pointer font-mono">
                    +{match.marketsCount} &gt;
                  </span>
                </div>
              </div>

              {/* Teams & Scores */}
              <div className="flex items-center justify-between my-1">
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-white font-semibold">{match.homeTeam}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-white font-semibold">{match.awayTeam}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex flex-col items-center justify-center space-y-1.5 font-bold text-xs text-red-500 font-mono">
                    <span>{match.homeScore}</span>
                    <span>{match.awayScore}</span>
                  </div>
                  <button
                    onClick={() => toggleFav(match.id)}
                    className="text-gray-500 hover:text-yellow-400 transition-colors cursor-pointer p-1"
                  >
                    <Star
                      className={cn(
                        "size-4",
                        favourites[match.id] ? "fill-yellow-400 text-yellow-400" : "text-gray-500"
                      )}
                    />
                  </button>
                </div>
              </div>

              {/* 3-Way Odds Grid */}
              <div className="grid grid-cols-3 gap-2">
                {match.odds.map((odd, idx) => {
                  const oddKey = `${match.id}-${odd.label}`;
                  const isSelected = selectedOddsIds.includes(oddKey);
                  return (
                    <button
                      key={idx}
                      onClick={() => onSelectOdd?.(match, odd)}
                      className={cn(
                        "flex flex-col items-center justify-center py-2 px-1 rounded-lg border transition-all cursor-pointer select-none",
                        isSelected
                          ? "bg-emerald-950/80 border-emerald-500 text-emerald-400 shadow-md ring-1 ring-emerald-500/50"
                          : "bg-[#1E222B] border-[#292F3B] hover:bg-[#252B36] hover:border-gray-500 text-gray-200"
                      )}
                    >
                      <span className="text-[12px] font-bold text-white font-mono">
                        {odd.odds.toFixed(2)}
                      </span>
                      <span className="text-[10px] text-gray-400 font-semibold uppercase">
                        {odd.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Quick League Selector Pills */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pt-3 pb-1">
        {leaguePills.map((league) => (
          <button
            key={league.id}
            className="flex items-center gap-2 px-3.5 py-1.5 bg-[#1C2028] hover:bg-[#252B36] border border-[#2B313D] text-white rounded-full text-xs font-semibold transition-colors cursor-pointer shrink-0"
          >
            <span>{league.icon}</span>
            <span>{league.label}</span>
          </button>
        ))}
      </div>

      {/* Highlights Section Header */}
      <div className="flex items-center gap-2 pt-4">
        <Zap className="size-4 text-amber-400 fill-amber-400" />
        <h2 className="text-base font-bold text-white tracking-wide">Highlights</h2>
      </div>
    </div>
  );
}
