"use client";

// features/layout/components/sidebar/surebet-sidebar.tsx
// SUREBET247 left sidebar panel with sports lobby links and popular league flag list.

import { useState } from "react";
import { cn } from "@/lib/utils/cn";
import { ChevronDown, ChevronUp, Trophy, Radio, Layers, Search, Star, Globe } from "lucide-react";

interface SureBetSidebarProps {
  activeItem?: string;
  onSelect?: (id: string) => void;
  className?: string;
}

export function SureBetSidebar({ activeItem = "sports-lobby", onSelect, className }: SureBetSidebarProps) {
  const [sportsExpanded, setSportsExpanded] = useState(true);

  const mainItems = [
    { id: "sports-lobby", label: "Sports Lobby", icon: <Trophy className="size-4 text-amber-400" /> },
    { id: "live-events", label: "Live Events", icon: <Radio className="size-4 text-red-500 animate-pulse" /> },
    { id: "sport", label: "Sport", icon: <span className="text-base leading-none">⚽</span> },
    { id: "top-parlay", label: "Top Parlay", icon: <Layers className="size-4 text-emerald-400" /> },
    { id: "search", label: "Search", icon: <Search className="size-4 text-orange-400" /> },
    { id: "favourites", label: "Favourites", icon: <Star className="size-4 text-yellow-400" /> },
  ];

  const leagues = [
    { id: "brazil-serie-a", label: "Serie A", country: "Brazil", flag: "🇧🇷" },
    { id: "england-premier", label: "Premier League", country: "England", flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿" },
    { id: "spain-laliga", label: "LaLiga", country: "Spain", flag: "🇪🇸" },
    { id: "germany-bundesliga", label: "Bundesliga", country: "Germany", flag: "🇩🇪" },
    { id: "france-ligue1", label: "Ligue 1", country: "France", flag: "🇫🇷" },
    { id: "italy-serie-a", label: "Serie A", country: "Italy", flag: "🇮🇹" },
    { id: "national-teams", label: "National teams", country: "", flag: "🌐" },
  ];

  return (
    <aside className={cn("w-64 shrink-0 bg-[#0E1013] text-white border-r border-[#1F232B] flex flex-col h-full min-h-[calc(100vh-3.5rem)] select-none", className)}>
      <div className="p-3 space-y-1">
        {/* Accordion Header */}
        <button
          onClick={() => setSportsExpanded(!sportsExpanded)}
          className="w-full flex items-center justify-between px-3 py-2 text-sm font-bold text-gray-300 hover:text-white rounded-md hover:bg-white/5 transition-colors cursor-pointer"
        >
          <span>Sports</span>
          {sportsExpanded ? <ChevronUp className="size-4 text-gray-400" /> : <ChevronDown className="size-4 text-gray-400" />}
        </button>

        {/* Main Links */}
        {sportsExpanded && (
          <div className="space-y-1 pl-1">
            {mainItems.map((item) => {
              const isActive = activeItem === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onSelect?.(item.id)}
                  className={cn(
                    "w-full flex items-center gap-3 px-3 py-2 rounded-md text-xs font-medium transition-colors cursor-pointer",
                    isActive
                      ? "bg-[#1C2026] text-white font-semibold shadow-inner border-l-2 border-emerald-500"
                      : "text-gray-300 hover:bg-white/5 hover:text-white"
                  )}
                >
                  <span className="shrink-0">{item.icon}</span>
                  <span className="truncate">{item.label}</span>
                </button>
              );
            })}
          </div>
        )}

        <hr className="my-3 border-[#1F232B]" />

        {/* Popular Leagues */}
        <div className="space-y-1 pl-1">
          {leagues.map((league) => (
            <button
              key={league.id}
              onClick={() => onSelect?.(league.id)}
              className="w-full flex items-center gap-2.5 px-3 py-1.5 rounded-md text-xs text-gray-300 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
            >
              <span className="text-sm shrink-0">{league.flag}</span>
              <div className="flex flex-col text-left truncate">
                {league.country && <span className="text-[10px] text-gray-500 leading-tight">{league.country}</span>}
                <span className="text-xs text-gray-300 truncate font-medium">{league.label}</span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </aside>
  );
}
