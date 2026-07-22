// features/layout/components/sidebar/favorites-section.tsx
// Favorites section in sidebar.

"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils/cn";
import { Star } from "lucide-react";
import Link from "next/link";
import type { League } from "@/features/layout/types";

interface FavoritesSectionProps {
  leagues: League[];
  collapsed?: boolean;
  className?: string;
}

const FavoritesSection = ({ leagues, collapsed, className }: FavoritesSectionProps) => {
  const favorites = leagues.filter((l) => l.isFavorite);

  if (favorites.length === 0) return null;

  return (
    <div className={cn("flex flex-col gap-1", className)}>
      {!collapsed && (
        <h3 className="text-xs font-semibold text-foreground-muted uppercase tracking-wider px-2 mb-2 flex items-center gap-1.5">
          <Star className="size-3 fill-accent text-accent" aria-hidden="true" />
          Favorites
        </h3>
      )}
      {favorites.map((league) => (
        <Link
          key={league.id}
          href={`/league/${league.id}`}
          className={cn(
            "flex items-center gap-2 px-2 py-1.5 rounded-md text-sm transition-colors",
            "text-foreground-muted hover:text-foreground hover:bg-background-hover",
            collapsed && "justify-center px-1"
          )}
        >
          {collapsed && <span className="text-base">{league.logo}</span>}
          {!collapsed && (
            <>
              <span className="text-base" aria-hidden="true">{league.logo}</span>
              <span className="truncate">{league.name}</span>
            </>
          )}
        </Link>
      ))}
    </div>
  );
};

export { FavoritesSection };
export type { FavoritesSectionProps };
