// features/sportsbook/components/score/events-list.tsx
// List of match events (goals, cards, substitutions).

"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils/cn";
import type { TimelineEvent } from "./timeline";

interface EventsListProps {
  events: TimelineEvent[];
  className?: string;
}

const EventsList = ({ events, className }: EventsListProps) => {
  const sortedEvents = [...events].sort((a, b) => a.minute - b.minute);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn("flex flex-col gap-2", className)}
    >
      <h3 className="text-sm font-semibold text-foreground">Events</h3>
      <div className="flex flex-col gap-2">
        {sortedEvents.map((event, i) => (
          <motion.div
            key={event.id}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.03 }}
            className="flex items-center justify-between p-2 rounded-lg bg-background-hover/50"
          >
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-foreground-muted w-8">{event.minute}'</span>
              <span className="text-sm text-foreground">{event.player}</span>
            </div>
            <span className="text-xs text-foreground-subtle capitalize">{event.type.replace("_", " ")}</span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export { EventsList };
export type { EventsListProps };
