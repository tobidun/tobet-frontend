// features/layout/components/mobile-nav/mobile-drawer.tsx
// Mobile drawer menu with categories and leagues.

"use client";

import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils/cn";
import { X } from "lucide-react";
import { Drawer } from "@/components/ui/overlay";
import { SportCategory } from "@/features/sportsbook/components/sports-navigation";
import { LeagueList } from "@/features/sportsbook/components/sports-navigation";
import type { Category, League } from "@/features/layout/types";

interface MobileDrawerProps {
  open: boolean;
  onClose: () => void;
  categories: Category[];
  leagues: League[];
  onSportSelect?: (sportId: string) => void;
  onLeagueSelect?: (league: League) => void;
  className?: string;
}

const MobileDrawer = ({ open, onClose, categories, leagues, onSportSelect, onLeagueSelect, className }: MobileDrawerProps) => {
  const sportsFromCategories = categories.flatMap((cat) =>
    cat.items.map((item) => ({
      id: item.id,
      name: item.label,
      slug: item.href?.split('/').pop() || item.id,
      isActive: item.isActive || false,
    }))
  );

  return (
    <Drawer open={open} onClose={onClose} side="left" className={className}>
      <div className="flex flex-col h-full">
        <div className="flex items-center justify-between p-4 border-b border-border">
          <h2 className="text-lg font-semibold text-foreground">Menu</h2>
          <button
            onClick={onClose}
            className="size-8 flex items-center justify-center rounded-md hover:bg-background-hover transition-colors text-foreground-muted hover:text-foreground"
            aria-label="Close menu"
          >
            <X className="size-5" />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-4">
          <div className="flex flex-col gap-6">
            <SportCategory
              title="Sports"
              sports={sportsFromCategories}
              onSportSelect={(sport) => {
                onSportSelect?.(sport.id);
                onClose();
              }}
            />
            <div className="border-t border-border pt-4">
              <h3 className="text-xs font-semibold text-foreground-muted uppercase tracking-wider mb-3 px-3">Leagues</h3>
              <LeagueList
                leagues={leagues.map((l) => ({
                  id: l.id,
                  name: l.name,
                  country: l.country,
                  sportId: "",
                  logo: l.logo,
                  isActive: false,
                }))}
                onLeagueSelect={(league) => {
                  onLeagueSelect?.(league);
                  onClose();
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </Drawer>
  );
};

export { MobileDrawer };
export type { MobileDrawerProps };
