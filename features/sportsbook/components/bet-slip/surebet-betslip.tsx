"use client";

// features/sportsbook/components/bet-slip/surebet-betslip.tsx
// SUREBET247 right sidebar betslip container with empty state and booking code input.

import { useState } from "react";
import { cn } from "@/lib/utils/cn";
import { Ticket, X, Trash2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export interface SelectedBetItem {
  id: string;
  matchId: string;
  matchTitle: string;
  market: string;
  selection: string;
  odds: number;
}

interface SureBetBetslipProps {
  selections: SelectedBetItem[];
  onRemoveSelection: (id: string) => void;
  onClearAll: () => void;
  className?: string;
}

export function SureBetBetslip({
  selections = [],
  onRemoveSelection,
  onClearAll,
  className,
}: SureBetBetslipProps) {
  const [stake, setStake] = useState<number>(100);
  const [bookingCode, setBookingCode] = useState<string>("");

  const totalOdds = selections.reduce((acc, item) => acc * item.odds, 1);
  const potentialPayout = stake * (selections.length > 0 ? totalOdds : 0);

  return (
    <aside className={cn("w-80 shrink-0 bg-[#0E1013] border-l border-[#1F232B] text-white flex flex-col h-full min-h-[calc(100vh-3.5rem)] select-none", className)}>
      {/* Betslip Header */}
      <div className="py-3 px-4 border-b border-[#1F232B] flex items-center justify-between">
        <h3 className="text-sm font-extrabold text-white tracking-wide mx-auto">Betslip</h3>
        {selections.length > 0 && (
          <button
            onClick={onClearAll}
            className="text-xs text-gray-400 hover:text-red-400 flex items-center gap-1 cursor-pointer transition-colors"
          >
            <Trash2 className="size-3.5" /> Clear
          </button>
        )}
      </div>

      {/* Betslip Selections or Empty State */}
      <div className="flex-1 overflow-y-auto p-4 flex flex-col justify-center">
        {selections.length === 0 ? (
          <div className="flex flex-col items-center justify-center text-center space-y-3 py-10">
            {/* Ticket Outline Icon */}
            <div className="size-14 rounded-2xl border-2 border-dashed border-gray-600 flex items-center justify-center text-gray-500">
              <Ticket className="size-7 stroke-[1.5]" />
            </div>

            <div className="space-y-1">
              <p className="text-sm font-bold text-gray-200">Your betslip is empty</p>
              <p className="text-xs text-gray-400 max-w-[200px] leading-relaxed">
                Click on odds to add a bet to the betslip
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-3 justify-start my-auto">
            {selections.map((item) => (
              <div
                key={item.id}
                className="bg-[#171B22] border border-[#262C38] rounded-lg p-3 text-xs space-y-1.5 relative group"
              >
                <button
                  onClick={() => onRemoveSelection(item.id)}
                  className="absolute top-2.5 right-2 text-gray-400 hover:text-white cursor-pointer"
                >
                  <X className="size-3.5" />
                </button>
                <p className="text-gray-400 text-[11px] font-medium pr-5 truncate">{item.matchTitle}</p>
                <div className="flex items-center justify-between text-white font-bold">
                  <span>{item.selection}</span>
                  <span className="text-emerald-400 font-mono">{item.odds.toFixed(2)}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Stake & Payout Controls when selections exist */}
      {selections.length > 0 && (
        <div className="p-4 border-t border-[#1F232B] bg-[#12151B] space-y-3">
          <div className="flex items-center justify-between text-xs">
            <span className="text-gray-400 font-medium">Total Odds</span>
            <span className="text-emerald-400 font-bold font-mono text-sm">{totalOdds.toFixed(2)}</span>
          </div>

          <div className="space-y-1">
            <label className="text-[11px] text-gray-400 font-medium">Stake Amount ($)</label>
            <input
              type="number"
              value={stake}
              onChange={(e) => setStake(Math.max(0, Number(e.target.value)))}
              className="w-full bg-[#1A1E26] border border-[#2B313E] rounded-md px-3 py-1.5 text-xs text-white font-mono focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div className="flex items-center justify-between text-xs pt-1">
            <span className="text-gray-400 font-medium">Potential Winnings</span>
            <span className="text-emerald-400 font-bold font-mono text-sm">${potentialPayout.toFixed(2)}</span>
          </div>

          <Button className="w-full bg-[#00C853] hover:bg-[#00E676] text-black font-extrabold text-xs py-2 rounded-md uppercase tracking-wider shadow-md">
            PLACE BET (${stake})
          </Button>
        </div>
      )}

      {/* Booking Code Input Section */}
      <div className="p-4 border-t border-[#1F232B] bg-[#121418] space-y-2">
        <div className="relative flex items-center">
          <input
            type="text"
            value={bookingCode}
            onChange={(e) => setBookingCode(e.target.value)}
            placeholder="Booking code"
            className="w-full bg-[#1A1D24] border border-[#292E39] rounded-lg px-3 py-2 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500 transition-colors pr-9"
          />
          <button
            onClick={() => {
              if (bookingCode) alert(`Loaded booking code: ${bookingCode}`);
            }}
            className="absolute right-2 text-gray-400 hover:text-emerald-400 p-1 cursor-pointer"
          >
            <ArrowRight className="size-4" />
          </button>
        </div>
      </div>
    </aside>
  );
}
