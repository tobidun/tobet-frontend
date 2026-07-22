// features/sportsbook/components/score/timeline.tsx
// Match event timeline (goals, cards, substitutions).

"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils/cn";
import { Goal, Square, ArrowLeftRight } from "lucide-react";

interface TimelineEvent {
  id: string;
  minute: number;
  type: "goal" | "yellow_card" | "red_card" | "substitution";
  team: "home" | "away";
  player: string;
  assistPlayer?: string;
}

interface TimelineProps {
  events: TimelineEvent[];
  className?: string;
}

const iconMap = {
  goal: Goal,
  yellow_card: Square,
  red_card: Square,
  substitution: ArrowLeftRight,
};

const Timeline = ({ events, className }: TimelineProps) => {
  const sortedEvents = [...events].sort((a, b) => a.minute - b.minute);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn("flex flex-col gap-3", className)}
    >
      <h3 className="text-sm font-semibold text-foreground">Timeline</h3>
      <div className="relative flex flex-col gap-3">
        {sortedEvents.map((event, i) => {
          const Icon = iconMap[event.type];
          const isHome = event.team === "home";

          return (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, x: isHome ? -20 : 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              className={cn("flex items-center gap-3", isHome ? "flex-row" : "flex-row-reverse")}
            >
              <div className={cn("flex items-center justify-center size-8 rounded-full", event.type === "goal" ? "bg-primary text-foreground-inverse" : "bg-background-hover text-foreground-muted")}>
                <Icon className="size-4" />
              </div>
              <div className={cn("flex flex-col gap-0.5", isHome ? "text-left" : "text-right")}>
                <span className="text-sm font-medium text-foreground">{event.player}</span>
                {event.assistPlayer && (
                  <span className="text-xs text-foreground-muted">Assist: {event.assistPlayer}</span>
                )}
                <span className="text-xs text-foreground-subtle">{event.minute}'</span>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
};

export { Timeline };
export type { TimelineProps, TimelineEvent };
