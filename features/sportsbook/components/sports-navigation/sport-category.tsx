// features/sportsbook/components/sports-navigation/sport-category.tsx
// Grouped sport category with label.

"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils/cn";
import { SportItem } from "./sport-item";
import type { Sport } from "@/features/sportsbook/types";

interface SportCategoryProps {
  title: string;
  sports: Sport[];
  activeSportId?: string;
  onSportSelect?: (sport: Sport) => void;
  className?: string;
}

const SportCategory = ({ title, sports, activeSportId, onSportSelect, className }: SportCategoryProps) => {
  const activeSports = sports.filter((s) => s.isActive);
  if (activeSports.length === 0) return null;

  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <span className="text-xs font-semibold text-foreground-subtle uppercase tracking-wider px-3">{title}</span>
      <div className="flex gap-1 overflow-x-auto pb-2 scrollbar-hide">
        {activeSports.map((sport) => (
          <SportItem
            key={sport.id}
            sport={sport}
            isActive={sport.id === activeSportId}
            onClick={onSportSelect}
          />
        ))}
      </div>
    </div>
  );
};

export { SportCategory };
export type { SportCategoryProps };
