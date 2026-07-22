"use client";

// features/sportsbook/components/sports-navigation/sports-count-ribbon.tsx
// Horizontal scrollable sports ribbon with live event count badges above each icon.

import { cn } from "@/lib/utils/cn";

interface SportCountItem {
  id: string;
  name: string;
  icon: string;
  count: number;
}

interface SportsCountRibbonProps {
  selectedSportId?: string;
  onSelectSport?: (id: string) => void;
  className?: string;
}

const defaultSports: SportCountItem[] = [
  { id: "football", name: "Football", icon: "⚽", count: 973 },
  { id: "basketball", name: "Basketball", icon: "🏀", count: 32 },
  { id: "table-tennis", name: "Table Tennis", icon: "🏓", count: 93 },
  { id: "tennis", name: "Tennis", icon: "🎾", count: 333 },
  { id: "cricket", name: "Cricket", icon: "🏏", count: 70 },
  { id: "mma", name: "MMA", icon: "🥊", count: 19 },
  { id: "esports", name: "Esports", icon: "🎮", count: 210 },
  { id: "boxing", name: "Boxing", icon: "🥊", count: 83 },
  { id: "handball", name: "Handball", icon: "🤾", count: 4 },
  { id: "badminton", name: "Badminton", icon: "🏸", count: 58 },
];

export function SportsCountRibbon({
  selectedSportId = "football",
  onSelectSport,
  className,
}: SportsCountRibbonProps) {
  return (
    <div className={cn("w-full py-2 overflow-x-auto no-scrollbar", className)}>
      <div className="flex items-center gap-4 sm:gap-6 min-w-max px-1">
        {defaultSports.map((sport) => {
          const isSelected = selectedSportId === sport.id;
          return (
            <button
              key={sport.id}
              onClick={() => onSelectSport?.(sport.id)}
              className={cn(
                "flex flex-col items-center group cursor-pointer transition-transform hover:scale-105 select-none"
              )}
            >
              {/* Overhead Count */}
              <span className="text-[10px] text-gray-400 font-mono group-hover:text-white transition-colors mb-0.5">
                {sport.count}
              </span>

              {/* Sport Icon Circle */}
              <div
                className={cn(
                  "size-9 rounded-full flex items-center justify-center text-lg transition-all shadow-sm",
                  isSelected
                    ? "bg-[#252A32] ring-2 ring-emerald-500 text-white scale-110"
                    : "bg-[#16181D] hover:bg-[#20242B] text-gray-300"
                )}
              >
                {sport.icon}
              </div>

              {/* Sport Name */}
              <span
                className={cn(
                  "text-[11px] font-medium mt-1 transition-colors",
                  isSelected ? "text-white font-bold" : "text-gray-400 group-hover:text-gray-200"
                )}
              >
                {sport.name}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
