// features/bets/components/cash-out-panel.tsx
// Cash out UI supporting full and partial cash out via a dialog.

"use client";

import { useState } from "react";
import { Wallet, X } from "lucide-react";
import { Dialog } from "@/components/ui/overlay";
import { Button } from "@/components/ui/button";
import { TextInput } from "@/components/ui/input";
import { formatCurrency } from "@/lib/utils/format";
import { useBetStore } from "../store";
import type { PlacedBet } from "@/types/bets";

interface CashOutPanelProps {
  bet: PlacedBet;
}

const CashOutPanel = ({ bet }: CashOutPanelProps) => {
  const [open, setOpen] = useState(false);
  const [partial, setPartial] = useState<string>(
    bet.cashOut ? (bet.cashOut.fullValue / 2).toFixed(2) : "0"
  );
  const cashOutFull = useBetStore((s) => s.cashOutFull);
  const cashOutPartial = useBetStore((s) => s.cashOutPartial);
  const isCashingOut = useBetStore((s) => s.isCashingOut[bet.id] ?? false);

  const offer = bet.cashOut;
  if (!offer?.available) return null;

  const partialNum = Number(partial);
  const partialValid =
    !Number.isNaN(partialNum) &&
    partialNum >= offer.minPartial &&
    partialNum <= offer.maxPartial;

  const close = () => setOpen(false);

  const onFull = async () => {
    await cashOutFull(bet.id);
    close();
  };

  const onPartial = async () => {
    if (!partialValid) return;
    await cashOutPartial(bet.id, partialNum);
    close();
  };

  return (
    <>
      <Button variant="secondary" size="sm" onClick={() => setOpen(true)}>
        <Wallet className="size-4 mr-1.5" />
        Cash Out {formatCurrency(offer.fullValue, bet.currency)}
      </Button>

      <Dialog open={open} onClose={close}>
        <div className="max-w-sm w-full mx-4 rounded-xl bg-background-card border border-border shadow-xl p-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="text-lg font-semibold text-foreground">Cash Out</h3>
              <p className="text-xs text-foreground-muted font-mono">{bet.ticketNumber}</p>
            </div>
            <button
              onClick={close}
              aria-label="Close"
              className="size-8 flex items-center justify-center rounded-md hover:bg-background-hover text-foreground-muted"
            >
              <X className="size-4" />
            </button>
          </div>

          <div className="rounded-lg bg-background-hover/60 p-4 mb-4">
            <div className="flex items-center justify-between text-sm">
              <span className="text-foreground-muted">Full cash out value</span>
              <span className="font-mono font-semibold text-success">
                {formatCurrency(offer.fullValue, bet.currency)}
              </span>
            </div>
            <p className="text-xs text-foreground-subtle mt-1">
              Range: {formatCurrency(offer.minPartial, bet.currency)} –{" "}
              {formatCurrency(offer.maxPartial, bet.currency)}
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <Button variant="primary" fullWidth loading={isCashingOut} onClick={onFull}>
              Full Cash Out · {formatCurrency(offer.fullValue, bet.currency)}
            </Button>

            <div className="flex items-center gap-2 my-1">
              <span className="h-px flex-1 bg-border" />
              <span className="text-xs text-foreground-subtle">or partial</span>
              <span className="h-px flex-1 bg-border" />
            </div>

            <div className="space-y-1.5">
              <label htmlFor="partial-amount" className="text-sm font-medium text-foreground">
                Partial cash out amount
              </label>
              <TextInput
                id="partial-amount"
                inputMode="decimal"
                value={partial}
                error={
                  !partialValid
                    ? `Enter between ${formatCurrency(offer.minPartial, bet.currency)} and ${formatCurrency(offer.maxPartial, bet.currency)}`
                    : undefined
                }
                onChange={(e) => setPartial(e.target.value)}
              />
            </div>

            <Button
              variant="secondary"
              fullWidth
              disabled={!partialValid || isCashingOut}
              onClick={onPartial}
            >
              Partial Cash Out · {formatCurrency(partialNum || 0, bet.currency)}
            </Button>
          </div>

          <p className="text-[11px] text-foreground-subtle mt-4 text-center">
            Cashing out closes the corresponding part of your bet. Remaining stake stays live.
          </p>
        </div>
      </Dialog>
    </>
  );
};

export { CashOutPanel };
export type { CashOutPanelProps };
