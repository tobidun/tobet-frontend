// components/ui/feedback/progress.tsx
// Progress bar with value and label.

"use client";

import { forwardRef } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils/cn";

const progressVariants = cva("relative w-full overflow-hidden rounded-full bg-background-hover", {
  variants: {
    size: {
      sm: "h-1",
      md: "h-2",
      lg: "h-3",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

const indicatorVariants = cva("h-full rounded-full transition-all duration-300 ease-out", {
  variants: {
    color: {
      default: "bg-primary",
      success: "bg-success",
      warning: "bg-warning",
      error: "bg-error",
    },
  },
  defaultVariants: {
    color: "default",
  },
});

interface ProgressProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "color">,
    VariantProps<typeof progressVariants>,
    VariantProps<typeof indicatorVariants> {
  value?: number;
  label?: string;
  showValue?: boolean;
}

const Progress = forwardRef<HTMLDivElement, ProgressProps>(
  ({ size, color, value = 0, label, showValue, className, ...props }, ref) => {
    const clampedValue = Math.min(100, Math.max(0, value));
    const indicatorColor = color as ProgressProps["color"];

    return (
      <div ref={ref} className={cn("w-full", className)} {...props}>
        {(label || showValue) && (
          <div className="flex items-center justify-between mb-1.5">
            {label && <span className="text-xs font-medium text-foreground">{label}</span>}
            {showValue && (
              <span className="text-xs text-foreground-muted">{Math.round(clampedValue)}%</span>
            )}
          </div>
        )}
        <div className={progressVariants({ size })} role="progressbar" aria-valuenow={clampedValue} aria-valuemin={0} aria-valuemax={100}>
          <div className={cn(indicatorVariants({ color: indicatorColor }), "w-0")} style={{ width: `${clampedValue}%` }} />
        </div>
      </div>
    );
  }
);

Progress.displayName = "Progress";

export { Progress, progressVariants, indicatorVariants };
export type { ProgressProps };
