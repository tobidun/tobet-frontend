// features/layout/components/sidebar/recent-matches.tsx
// Recent matches section in sidebar.

"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils/cn";
import { Clock } from "lucide-react";
import Link from "next/link";
import type { RecentMatch } from "@/features/layout/types";

interface RecentMatchesProps {
  matches: RecentMatch[];
  collapsed?: boolean;
  className?: string;
}

const RecentMatches = ({ matches, collapsed, className }: RecentMatchesProps) => {
  return (
    <div className={cn("flex flex-col gap-1", className)}>
      {!collapsed && (
        <h3 className="text-xs font-semibold text-foreground-muted uppercase tracking-wider px-2 mb-2 flex items-center gap-1.5">
          <Clock className="size-3" aria-hidden="true" />
          Recent
        </h3>
      )}
      {matches.map((match) => (
        <Link
          key={match.id}
          href={`/match/${match.id}`}
          className={cn(
            "flex items-center gap-2 px-2 py-1.5 rounded-md text-sm transition-colors",
            "text-foreground-muted hover:text-foreground hover:bg-background-hover",
            collapsed && "justify-center px-1"
          )}
        >
          {collapsed && <span className="text-base">⚽</span>}
          {!collapsed && (
            <div className="flex flex-col gap-0.5 min-w-0">
              <span className="truncate text-xs">
                {match.homeTeam} vs {match.awayTeam}
              </span>
              {match.score && (
                <span className="text-xs font-mono text-foreground">
                  {match.score.home} - {match.score.away}
                </span>
              )}
            </div>
          )}
        </Link>
      ))}
    </div>
  );
};

export { RecentMatches };
export type { RecentMatchesProps };
