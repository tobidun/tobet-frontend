// features/wallet/components/bonus-card.tsx
// Bonus card with wagering progress.

"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils/cn";
import { Surface } from "@/components/ui/surface";
import { Badge } from "@/components/ui/feedback";
import { Progress } from "@/components/ui/feedback";
import { formatCurrency } from "@/lib/utils/format";
import { Gift } from "lucide-react";
import type { Bonus, BonusStatus } from "@/types/wallet";

const STATUS_BADGE: Record<BonusStatus, { variant: "success" | "warning" | "error" | "default"; label: string }> = {
  active: { variant: "success", label: "Active" },
  completed: { variant: "success", label: "Completed" },
  expired: { variant: "error", label: "Expired" },
  cancelled: { variant: "default", label: "Cancelled" },
};

interface BonusCardProps {
  bonus: Bonus;
  className?: string;
}

const BonusCard = ({ bonus, className }: BonusCardProps) => {
  const progress = Math.min(
    100,
    Math.round((bonus.wageringCompleted / bonus.wageringRequired) * 100)
  );
  const badge = STATUS_BADGE[bonus.status];
  const showProgress = bonus.status === "active" || bonus.status === "completed";

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      className={className}
    >
      <Surface variant="default" padding="md" rounded="lg" shadow="none" className="flex flex-col gap-4">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <span className="size-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0">
              <Gift className="size-5" />
            </span>
            <div className="min-w-0">
              <h3 className="font-semibold text-foreground truncate">{bonus.title}</h3>
              <p className="text-xs text-foreground-muted">{bonus.description}</p>
            </div>
          </div>
          <Badge variant={badge.variant} shape="pill">{badge.label}</Badge>
        </div>

        <div className="flex items-center justify-between text-sm">
          <span className="text-foreground-muted">Bonus value</span>
          <span className="font-mono font-semibold text-foreground">
            {formatCurrency(bonus.amount, bonus.currency)}
          </span>
        </div>

        {showProgress && (
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between text-xs">
              <span className="text-foreground-muted">Wagering progress</span>
              <span className="text-foreground-muted">
                {formatCurrency(bonus.wageringCompleted, bonus.currency)} /{" "}
                {formatCurrency(bonus.wageringRequired, bonus.currency)}
              </span>
            </div>
            <Progress
              value={progress}
              color={bonus.status === "completed" ? "success" : "default"}
              aria-label={`Wagering progress ${progress}%`}
            />
            <span className={cn("text-xs", progress >= 100 ? "text-success" : "text-foreground-subtle")}>
              {progress}% wagered
            </span>
          </div>
        )}

        <div className="flex items-center justify-between text-xs text-foreground-subtle">
          <span>Expires {new Date(bonus.expiryDate).toLocaleDateString()}</span>
          {bonus.code && <span className="font-mono uppercase">Code: {bonus.code}</span>}
        </div>
      </Surface>
    </motion.div>
  );
};

export { BonusCard };
export type { BonusCardProps };
