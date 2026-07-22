// features/bets/components/bet-slip-drawer.tsx
// App-wide bet slip slide-over backed by the Zustand store.

"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Ticket, X } from "lucide-react";
import { Dialog } from "@/components/ui/overlay";
import { BetSlipContainer } from "./bet-slip-container";
import { useBetStore } from "../store";

interface BetSlipDrawerProps {
  className?: string;
}

const BetSlipDrawer = ({ className }: BetSlipDrawerProps) => {
  const [open, setOpen] = useState(false);
  const count = useBetStore((s) => s.selections.length);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label={`Open bet slip with ${count} selection${count === 1 ? "" : "s"}`}
        className={
          "fixed bottom-20 right-4 z-40 lg:bottom-6 lg:right-6 inline-flex items-center gap-2 rounded-full bg-primary text-foreground-inverse px-4 py-3 shadow-lg hover:bg-primary-hover transition-colors " +
          (className ?? "")
        }
      >
        <Ticket className="size-5" />
        <span className="font-medium">Bet Slip</span>
        {count > 0 && (
          <span className="ml-1 size-6 grid place-items-center rounded-full bg-foreground-inverse text-primary text-xs font-bold">
            {count}
          </span>
        )}
      </button>

      <Dialog open={open} onClose={() => setOpen(false)} className="lg:ml-auto">
        <div className="fixed inset-0 z-modal flex justify-end">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-background-overlay/60 backdrop-blur-sm"
            onClick={() => setOpen(false)}
            aria-hidden="true"
          />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.25 }}
            role="dialog"
            aria-modal="true"
            aria-label="Bet slip"
            className="relative z-10 w-full max-w-md h-full bg-background-card border-l border-border flex flex-col"
          >
            <div className="flex items-center justify-between p-4 border-b border-border">
              <h2 className="text-lg font-semibold text-foreground">Bet Slip</h2>
              <button
                onClick={() => setOpen(false)}
                aria-label="Close bet slip"
                className="size-8 flex items-center justify-center rounded-md hover:bg-background-hover text-foreground-muted"
              >
                <X className="size-4" />
              </button>
            </div>
            <div className="flex-1 min-h-0 overflow-hidden">
              <BetSlipContainer className="h-full flex flex-col" />
            </div>
          </motion.div>
        </div>
      </Dialog>
    </>
  );
};

export { BetSlipDrawer };
export type { BetSlipDrawerProps };
