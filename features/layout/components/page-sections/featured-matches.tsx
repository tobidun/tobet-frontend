// features/layout/components/page-sections/featured-matches.tsx
// Featured matches section.

"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils/cn";
import { Surface } from "@/components/ui/surface";
import { FeaturedMatchCard } from "@/features/sportsbook/components/match";
import type { Match } from "@/features/sportsbook/types";

interface FeaturedMatchesProps {
  matches: Match[];
  onOddsClick?: (match: Match, selectionId: string) => void;
  className?: string;
}

const FeaturedMatches = ({ matches, onOddsClick, className }: FeaturedMatchesProps) => {
  const featured = matches.filter((m) => m.isFeatured);

  return (
    <section className={cn("py-12", className)}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-center justify-between mb-8"
        >
          <div>
            <h2 className="text-2xl font-bold text-foreground">Featured Matches</h2>
            <p className="text-sm text-foreground-muted mt-1">Top matches of the day</p>
          </div>
        </motion.div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {featured.map((match, i) => (
            <motion.div
              key={match.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <FeaturedMatchCard match={match} onOddsClick={onOddsClick} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export { FeaturedMatches };
export type { FeaturedMatchesProps };
