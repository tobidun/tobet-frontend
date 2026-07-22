// features/sportsbook/components/sports-navigation/league-list.tsx
// Scrollable list of leagues.

"use client";

import { cn } from "@/lib/utils/cn";
import { LeagueItem } from "./league-item";
import type { League } from "@/features/sportsbook/types";

interface LeagueListProps {
  leagues: League[];
  activeLeagueId?: string;
  onLeagueSelect?: (league: League) => void;
  className?: string;
}

const LeagueList = ({ leagues, activeLeagueId, onLeagueSelect, className }: LeagueListProps) => {
  const activeLeagues = leagues.filter((l) => l.isActive);
  if (activeLeagues.length === 0) return null;

  return (
    <div className={cn("flex flex-col gap-1 overflow-y-auto max-h-[300px] pr-1", className)}>
      {activeLeagues.map((league) => (
        <LeagueItem
          key={league.id}
          league={league}
          isActive={league.id === activeLeagueId}
          onClick={onLeagueSelect}
        />
      ))}
    </div>
  );
};

export { LeagueList };
export type { LeagueListProps };
