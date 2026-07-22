// features/wallet/components/payment-method-card.tsx
// Selectable payment method card.

"use client";

import { cn } from "@/lib/utils/cn";
import { Check } from "lucide-react";
import { formatCurrency } from "@/lib/utils/format";
import type { PaymentMethod } from "@/types/wallet";

interface PaymentMethodCardProps {
  method: PaymentMethod;
  selected?: boolean;
  onSelect?: (id: string) => void;
  currency?: string;
}

const PaymentMethodCard = ({
  method,
  selected,
  onSelect,
  currency = "USD",
}: PaymentMethodCardProps) => {
  return (
    <button
      type="button"
      onClick={() => onSelect?.(method.id)}
      aria-pressed={selected}
      className={cn(
        "w-full text-left flex items-center gap-4 p-4 rounded-lg border transition-colors",
        selected
          ? "border-primary bg-primary/5 ring-1 ring-primary"
          : "border-border bg-background-hover/40 hover:border-border-subtle"
      )}
    >
      <span className="size-11 rounded-lg bg-background border border-border flex items-center justify-center text-2xl shrink-0">
        {method.icon}
      </span>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className="font-medium text-foreground truncate">{method.label}</span>
          {method.isDefault && (
            <span className="text-[10px] uppercase tracking-wide px-1.5 py-0.5 rounded bg-primary/10 text-primary">
              Default
            </span>
          )}
        </div>
        <span className="text-xs text-foreground-muted">{method.detail}</span>
        <div className="text-xs text-foreground-subtle mt-1">
          {formatCurrency(method.min, currency)} – {formatCurrency(method.max, currency)}
          {method.fee > 0 && ` · ${method.fee}% fee`} · {method.processingTime}
        </div>
      </div>
      <span
        className={cn(
          "size-5 rounded-full border flex items-center justify-center shrink-0",
          selected ? "bg-primary border-primary text-foreground-inverse" : "border-border"
        )}
      >
        {selected && <Check className="size-3.5" />}
      </span>
    </button>
  );
};

export { PaymentMethodCard };
export type { PaymentMethodCardProps };
