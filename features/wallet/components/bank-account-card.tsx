// features/wallet/components/bank-account-card.tsx
// Selectable bank account card.

"use client";

import { cn } from "@/lib/utils/cn";
import { Check, Landmark } from "lucide-react";
import type { BankAccount } from "@/types/wallet";

interface BankAccountCardProps {
  account: BankAccount;
  selected?: boolean;
  onSelect?: (id: string) => void;
}

const BankAccountCard = ({
  account,
  selected,
  onSelect,
}: BankAccountCardProps) => {
  return (
    <button
      type="button"
      onClick={() => onSelect?.(account.id)}
      aria-pressed={selected}
      className={cn(
        "w-full text-left flex items-center gap-4 p-4 rounded-lg border transition-colors",
        selected
          ? "border-primary bg-primary/5 ring-1 ring-primary"
          : "border-border bg-background-hover/40 hover:border-border-subtle"
      )}
    >
      <span className="size-11 rounded-lg bg-background border border-border flex items-center justify-center shrink-0 text-primary">
        <Landmark className="size-5" />
      </span>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className="font-medium text-foreground truncate">{account.bankName}</span>
          {account.isDefault && (
            <span className="text-[10px] uppercase tracking-wide px-1.5 py-0.5 rounded bg-primary/10 text-primary">
              Default
            </span>
          )}
        </div>
        <span className="text-xs text-foreground-muted">
          {account.accountName} ···· {account.last4}
        </span>
        <span className="text-xs text-foreground-subtle mt-1 block">{account.country}</span>
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

export { BankAccountCard };
export type { BankAccountCardProps };
