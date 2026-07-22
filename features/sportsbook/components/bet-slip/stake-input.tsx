// features/sportsbook/components/bet-slip/stake-input.tsx
// Stake input with currency symbol and validation.

"use client";

import { forwardRef } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils/cn";

const stakeVariants = cva("flex items-center gap-2", {
  variants: {
    size: {
      sm: "text-sm",
      md: "text-base",
      lg: "text-lg",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

interface StakeInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size">, VariantProps<typeof stakeVariants> {
  currency?: string;
  maxStake?: number;
  minStake?: number;
  error?: string;
}

const StakeInput = forwardRef<HTMLInputElement, StakeInputProps>(
  ({ size, currency = "$", maxStake, minStake, error, className, ...props }, ref) => {
    return (
      <div className={cn("flex flex-col gap-1.5", className)}>
        <div className={cn("flex items-center gap-2 p-3 rounded-lg border border-border bg-background", error && "border-error")}>
          <span className="text-foreground-muted font-medium">{currency}</span>
          <input
            ref={ref}
            type="number"
            inputMode="decimal"
            className="flex-1 bg-transparent border-none outline-none text-foreground font-mono"
            {...props}
          />
        </div>
        {error && <span className="text-xs text-error">{error}</span>}
        {(maxStake || minStake) && (
          <span className="text-xs text-foreground-subtle">
            Min: {currency}{minStake} | Max: {currency}{maxStake}
          </span>
        )}
      </div>
    );
  }
);

StakeInput.displayName = "StakeInput";

export { StakeInput, stakeVariants };
export type { StakeInputProps };
