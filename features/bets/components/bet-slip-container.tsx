// features/bets/components/bet-slip-container.tsx
// Connects the design-system BetSlip to the Zustand bet store.

"use client";

import Link from "next/link";
import { BetSlip } from "@/features/sportsbook/components/bet-slip";
import { BetTypeToggle } from "./bet-type-toggle";
import { useBetStore } from "../store";

interface BetSlipContainerProps {
  className?: string;
}

const BetSlipContainer = ({ className }: BetSlipContainerProps) => {
  const selections = useBetStore((s) => s.selections);
  const stake = useBetStore((s) => s.stake);
  const betType = useBetStore((s) => s.betType);
  const isPlacing = useBetStore((s) => s.isPlacing);
  const addSelection = useBetStore((s) => s.addSelection);
  const removeSelection = useBetStore((s) => s.removeSelection);
  const clearSlip = useBetStore((s) => s.clearSlip);
  const setStake = useBetStore((s) => s.setStake);
  const setBetType = useBetStore((s) => s.setBetType);
  const placeBet = useBetStore((s) => s.placeBet);

  const onPlace = async () => {
    const bet = await placeBet();
    if (bet) {
      // Optional: surface success (e.g. toast). For now navigate to my bets.
      if (typeof window !== "undefined") {
        window.location.href = `/bets/${bet.id}`;
      }
    }
  };

  return (
    <div className={className}>
      <div className="p-4 border-b border-border flex items-center justify-between">
        <BetTypeToggle value={betType} onChange={setBetType} disabled={selections.length === 0} />
        <Link
          href="/bets"
          className="text-xs text-primary hover:underline whitespace-nowrap"
        >
          My Bets
        </Link>
      </div>
      <BetSlip
        selections={selections}
        stake={stake}
        onStakeChange={setStake}
        onSelectionRemove={removeSelection}
        onClearAll={clearSlip}
        onPlaceBet={onPlace}
        isPlacing={isPlacing}
      />
    </div>
  );
};

export { BetSlipContainer };
export type { BetSlipContainerProps };
