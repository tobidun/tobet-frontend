// features/layout/components/sidebar/league-nav.tsx
// League navigation in sidebar.

"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils/cn";
import Link from "next/link";
import type { League } from "@/features/layout/types";

interface LeagueNavProps {
  leagues: League[];
  activeLeagueId?: string;
  collapsed?: boolean;
  className?: string;
}

const LeagueNav = ({ leagues, activeLeagueId, collapsed, className }: LeagueNavProps) => {
  const favoriteLeagues = leagues.filter((l) => l.isFavorite);

  return (
    <div className={cn("flex flex-col gap-1", className)}>
      {!collapsed && (
        <h3 className="text-xs font-semibold text-foreground-muted uppercase tracking-wider px-2 mb-2">
          Leagues
        </h3>
      )}
      {favoriteLeagues.map((league) => (
        <Link
          key={league.id}
          href={`/league/${league.id}`}
          className={cn(
            "flex items-center gap-2 px-2 py-1.5 rounded-md text-sm transition-colors",
            league.id === activeLeagueId
              ? "bg-primary/10 text-primary"
              : "text-foreground-muted hover:text-foreground hover:bg-background-hover",
            collapsed && "justify-center px-1"
          )}
        >
          {collapsed && <span className="text-base">{league.logo}</span>}
          {!collapsed && (
            <>
              <span className="text-base" aria-hidden="true">{league.logo}</span>
              <div className="flex flex-col gap-0.5 min-w-0">
                <span className="truncate">{league.name}</span>
                <span className="text-xs text-foreground-muted">{league.country}</span>
              </div>
            </>
          )}
        </Link>
      ))}
    </div>
  );
};

export { LeagueNav };
export type { LeagueNavProps };
