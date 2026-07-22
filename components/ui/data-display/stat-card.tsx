// components/ui/data-display/stat-card.tsx
// Stat card for displaying key metrics.

"use client";

import { forwardRef } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils/cn";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";
import { Surface } from "@/components/ui/surface";
import type { SurfaceProps } from "@/components/ui/surface";

const statCardVariants = cva("flex flex-col", {
  variants: {
    align: {
      left: "items-start",
      center: "items-center",
      right: "items-end",
    },
  },
  defaultVariants: {
    align: "left",
  },
});

interface StatCardProps extends SurfaceProps, VariantProps<typeof statCardVariants> {
  label: string;
  value: string | number;
  change?: {
    value: number;
    label?: string;
  };
  icon?: React.ReactNode;
  footer?: React.ReactNode;
}

const StatCard = forwardRef<HTMLDivElement, StatCardProps>(
  ({ variant, padding, rounded, shadow, align, label, value, change, icon, footer, className, ...props }, ref) => {
    const isPositive = change && change.value > 0;
    const isNegative = change && change.value < 0;

    return (
      <Surface
        ref={ref}
        variant={variant || "default"}
        padding={padding || "md"}
        rounded={rounded || "lg"}
        shadow={shadow || "none"}
        className={cn(statCardVariants({ align }), className)}
        {...props}
      >
        <div className="flex items-center justify-between w-full">
          <span className="text-sm font-medium text-foreground-muted">{label}</span>
          {icon && <span className="text-foreground-muted">{icon}</span>}
        </div>
        <div className="mt-2 flex items-baseline gap-2">
          <span className="text-2xl font-bold text-foreground">{value}</span>
          {change && (
            <span
              className={cn(
                "inline-flex items-center gap-0.5 text-xs font-medium",
                isPositive && "text-success",
                isNegative && "text-error",
                !isPositive && !isNegative && "text-foreground-muted"
              )}
            >
              {isPositive && <ArrowUpRight className="size-3" aria-hidden="true" />}
              {isNegative && <ArrowDownRight className="size-3" aria-hidden="true" />}
              {Math.abs(change.value)}%
              {change.label && <span className="text-foreground-subtle">{change.label}</span>}
            </span>
          )}
        </div>
        {footer && <div className="mt-3 text-xs text-foreground-subtle">{footer}</div>}
      </Surface>
    );
  }
);

StatCard.displayName = "StatCard";

export { StatCard, statCardVariants };
export type { StatCardProps };
