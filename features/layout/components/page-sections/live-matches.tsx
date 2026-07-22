// features/layout/components/page-sections/live-matches.tsx
// Live matches section.

"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils/cn";
import { Surface } from "@/components/ui/surface";
import { LiveMatchCard } from "@/features/sportsbook/components/match";
import type { Match } from "@/features/sportsbook/types";

interface LiveMatchesProps {
  matches: Match[];
  onOddsClick?: (match: Match, selectionId: string) => void;
  className?: string;
}

const LiveMatches = ({ matches, onOddsClick, className }: LiveMatchesProps) => {
  const live = matches.filter((m) => m.isLive);

  if (live.length === 0) return null;

  return (
    <section className={cn("py-12", className)}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-center justify-between mb-8"
        >
          <div className="flex items-center gap-3">
            <h2 className="text-2xl font-bold text-foreground">Live Now</h2>
            <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-success/10 text-success text-sm font-semibold">
              <span className="size-2 rounded-full bg-success animate-pulse" />
              {live.length} Active
            </span>
          </div>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {live.map((match, i) => (
            <motion.div
              key={match.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <LiveMatchCard match={match} onOddsClick={onOddsClick} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export { LiveMatches };
export type { LiveMatchesProps };
