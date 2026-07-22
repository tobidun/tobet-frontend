// features/layout/components/page-sections/trending-bets.tsx
// Trending bets section.

"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils/cn";
import { Surface } from "@/components/ui/surface";
import { Badge } from "@/components/ui/feedback";
import type { TrendingBet } from "@/features/layout/types";

interface TrendingBetsProps {
  bets: TrendingBet[];
  className?: string;
}

const TrendingBets = ({ bets, className }: TrendingBetsProps) => {
  return (
    <section className={cn("py-12", className)}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-8"
        >
          <h2 className="text-2xl font-bold text-foreground">Trending Bets</h2>
          <p className="text-sm text-foreground-muted mt-1">Most popular bets right now</p>
        </motion.div>
        <Surface variant="default" padding="md" rounded="lg" shadow="none">
          <div className="flex flex-col gap-3">
            {bets.map((bet, i) => (
              <motion.div
                key={bet.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex items-center justify-between p-4 rounded-lg bg-background-hover/50 hover:bg-background-hover transition-colors"
              >
                <div className="flex flex-col gap-1 flex-1 min-w-0">
                  <span className="text-sm font-medium text-foreground truncate">{bet.match}</span>
                  <span className="text-xs text-foreground-muted">{bet.selection}</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <span className="text-sm font-bold font-mono text-primary">{bet.odds.toFixed(2)}</span>
                    <span className="block text-xs text-foreground-muted">${bet.stake.toLocaleString()}</span>
                  </div>
                  <Badge variant="accent" size="sm">
                    {bet.users} bets
                  </Badge>
                </div>
              </motion.div>
            ))}
          </div>
        </Surface>
      </div>
    </section>
  );
};

export { TrendingBets };
export type { TrendingBetsProps };
