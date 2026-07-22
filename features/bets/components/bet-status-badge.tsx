// features/bets/components/bet-status-badge.tsx
// Status badge mapping for placed bets.

"use client";

import { Badge } from "@/components/ui/feedback";
import type { BetStatus } from "@/types/bets";

const STATUS_MAP: Record<
  BetStatus,
  { label: string; variant: "default" | "success" | "warning" | "error" | "info" | "primary" }
> = {
  open: { label: "Open", variant: "info" },
  partially_cashed_out: { label: "Partial Cash Out", variant: "warning" },
  cashed_out: { label: "Cashed Out", variant: "default" },
  won: { label: "Won", variant: "success" },
  lost: { label: "Lost", variant: "error" },
  void: { label: "Void", variant: "default" },
  cancelled: { label: "Cancelled", variant: "default" },
};

interface BetStatusBadgeProps {
  status: BetStatus;
  className?: string;
}

const BetStatusBadge = ({ status, className }: BetStatusBadgeProps) => {
  const { label, variant } = STATUS_MAP[status];
  return (
    <Badge variant={variant} shape="pill" className={className}>
      {label}
    </Badge>
  );
};

export { BetStatusBadge };
export type { BetStatusBadgeProps };
