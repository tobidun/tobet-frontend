// features/layout/components/page-sections/popular-sports.tsx
// Popular sports section.

"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils/cn";
import { Surface } from "@/components/ui/surface";
import { SportCategory } from "@/features/sportsbook/components/sports-navigation";
import type { Sport } from "@/features/sportsbook/types";

interface PopularSportsProps {
  sports: Sport[];
  onSportSelect?: (sport: Sport) => void;
  className?: string;
}

const PopularSports = ({ sports, onSportSelect, className }: PopularSportsProps) => {
  const popular = sports.filter((s) => s.isActive).slice(0, 8);

  return (
    <section className={cn("py-12 bg-background-elevated/50", className)}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-8"
        >
          <h2 className="text-2xl font-bold text-foreground">Popular Sports</h2>
          <p className="text-sm text-foreground-muted mt-1">Browse by sport</p>
        </motion.div>
        <Surface variant="default" padding="lg" rounded="xl" shadow="none">
          <SportCategory
            title=""
            sports={popular}
            onSportSelect={onSportSelect}
          />
        </Surface>
      </div>
    </section>
  );
};

export { PopularSports };
export type { PopularSportsProps };
