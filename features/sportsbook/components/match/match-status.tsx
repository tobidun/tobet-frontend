// features/sportsbook/components/match/match-status.tsx
// Match status badge with appropriate styling.

"use client";

import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils/cn";
import type { MatchStatus } from "@/features/sportsbook/types";

const statusVariants = cva("inline-flex items-center gap-1.5 text-xs font-semibold px-2 py-0.5 rounded-full", {
  variants: {
    status: {
      scheduled: "bg-background-hover text-foreground-muted",
      live: "bg-success/10 text-success",
      finished: "bg-foreground-subtle/10 text-foreground-subtle",
      postponed: "bg-warning/10 text-warning",
      cancelled: "bg-error/10 text-error",
      half_time: "bg-warning/10 text-warning",
    },
  },
  defaultVariants: {
    status: "scheduled",
  },
});

interface MatchStatusProps extends VariantProps<typeof statusVariants> {
  status: MatchStatus;
  minute?: number;
  className?: string;
}

const statusLabels: Record<MatchStatus, string> = {
  scheduled: "Scheduled",
  live: "Live",
  finished: "Finished",
  postponed: "Postponed",
  cancelled: "Cancelled",
  half_time: "Half Time",
};

const MatchStatusBadge = ({ status, minute, className }: MatchStatusProps) => {
  const label = status === "live" && minute ? `${minute}'` : statusLabels[status];

  return (
    <span className={cn(statusVariants({ status }), className)}>
      {status === "live" && <span className="size-1.5 rounded-full bg-success animate-pulse" aria-hidden="true" />}
      {label}
    </span>
  );
};

export { MatchStatusBadge as MatchStatus };
export type { MatchStatusProps };
