// features/bets/components/my-bets-list.tsx
// Filterable, searchable list of placed bets.

"use client";

import { useState, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { EmptyState } from "@/components/ui/feedback";
import { BetCard } from "./bet-card";
import { CashOutPanel } from "./cash-out-panel";
import type { PlacedBet, BetStatus } from "@/types/bets";

type FilterKey = "all" | "open" | "settled" | "won" | "lost" | "cancelled";

interface MyBetsListProps {
  bets: PlacedBet[];
  onOpen?: (id: string) => void;
}

const FILTERS: { key: FilterKey; label: string }[] = [
  { key: "all", label: "All" },
  { key: "open", label: "Open" },
  { key: "won", label: "Won" },
  { key: "lost", label: "Lost" },
  { key: "cancelled", label: "Cancelled" },
];

const matchesStatus = (bet: PlacedBet, filter: FilterKey): boolean => {
  if (filter === "all") return true;
  if (filter === "open") return bet.status === "open" || bet.status === "partially_cashed_out";
  if (filter === "settled") {
    return ["won", "lost", "void", "cancelled", "cashed_out"].includes(bet.status);
  }
  return bet.status === (filter as BetStatus);
};

const MyBetsList = ({ bets, onOpen }: MyBetsListProps) => {
  const [filter, setFilter] = useState<FilterKey>("all");
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return bets
      .filter((b) => matchesStatus(b, filter))
      .filter((b) =>
        q
          ? b.ticketNumber.toLowerCase().includes(q) ||
            b.selections.some(
              (s) =>
                s.match.homeTeam.name.toLowerCase().includes(q) ||
                s.match.awayTeam.name.toLowerCase().includes(q) ||
                s.selection.name.toLowerCase().includes(q)
            )
          : true
      )
      .sort((a, b) => new Date(b.placedAt).getTime() - new Date(a.placedAt).getTime());
  }, [bets, filter, search]);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1">
          <Input
            type="search"
            placeholder="Search ticket or team"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            aria-label="Search bets"
          />
        </div>
        <div className="flex flex-wrap gap-2" role="tablist" aria-label="Filter bets">
          {FILTERS.map((f) => {
            const active = filter === f.key;
            return (
              <button
                key={f.key}
                role="tab"
                aria-selected={active}
                onClick={() => setFilter(f.key)}
                className={
                  "px-3 py-1.5 text-sm font-medium rounded-lg transition-colors " +
                  (active
                    ? "bg-primary text-foreground-inverse"
                    : "bg-background-hover text-foreground-muted hover:text-foreground")
                }
              >
                {f.label}
              </button>
            );
          })}
        </div>
      </div>

      {filtered.length === 0 ? (
        <EmptyState
          title="No bets found"
          description="Try a different filter or search term."
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {filtered.map((bet) => (
            <BetCard key={bet.id} bet={bet} onOpen={onOpen} />
          ))}
        </div>
      )}
    </div>
  );
};

export { MyBetsList };
export type { MyBetsListProps };
// Re-export for convenience in pages that need the cash out trigger standalone.
export { CashOutPanel };
