// features/bets/components/bet-type-toggle.tsx
// Toggle between single and multiple (accumulator) bet types.

"use client";

import { cn } from "@/lib/utils/cn";
import type { BetType } from "@/types/bets";

interface BetTypeToggleProps {
  value: BetType;
  onChange: (type: BetType) => void;
  disabled?: boolean;
  className?: string;
}

const OPTIONS: { value: BetType; label: string }[] = [
  { value: "single", label: "Single" },
  { value: "accumulator", label: "Accumulator" },
];

const BetTypeToggle = ({ value, onChange, disabled, className }: BetTypeToggleProps) => {
  return (
    <div
      role="radiogroup"
      aria-label="Bet type"
      className={cn("inline-flex p-1 rounded-lg bg-background-hover", className)}
    >
      {OPTIONS.map((opt) => {
        const active = value === opt.value;
        return (
          <button
            key={opt.value}
            type="button"
            role="radio"
            aria-checked={active}
            disabled={disabled}
            onClick={() => onChange(opt.value)}
            className={cn(
              "px-3 py-1.5 text-sm font-medium rounded-md transition-colors",
              active
                ? "bg-primary text-foreground-inverse"
                : "text-foreground-muted hover:text-foreground",
              disabled && "opacity-50 cursor-not-allowed"
            )}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
};

export { BetTypeToggle };
export type { BetTypeToggleProps };
