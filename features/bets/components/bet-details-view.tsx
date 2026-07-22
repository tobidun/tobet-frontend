// features/bets/components/bet-details-view.tsx
// Detailed view of a single placed bet (ticket).

"use client";

import { Surface } from "@/components/ui/surface";
import { Button } from "@/components/ui/button";
import { Alert } from "@/components/ui/feedback";
import { formatCurrency } from "@/lib/utils/format";
import { BetStatusBadge } from "./bet-status-badge";
import { CashOutPanel } from "./cash-out-panel";
import { useBetStore } from "../store";
import type { PlacedBet } from "@/types/bets";

interface BetDetailsViewProps {
  bet: PlacedBet;
  onBack?: () => void;
}

const BetDetailsView = ({ bet, onBack }: BetDetailsViewProps) => {
  const settleBet = useBetStore((s) => s.settleBet);
  const isSettling = useBetStore((s) => s.isSettling[bet.id] ?? false);
  const canSettle = bet.status === "open" || bet.status === "partially_cashed_out";

  const rows: [string, string][] = [
    ["Ticket Number", bet.ticketNumber],
    ["Bet Type", bet.betType],
    ["Total Odds", bet.totalOdds.toFixed(2)],
    ["Stake", formatCurrency(bet.stake, bet.currency)],
    ["Potential Win", formatCurrency(bet.potentialWin, bet.currency)],
    ["Placed", new Date(bet.placedAt).toLocaleString()],
  ];

  if (bet.returnedAmount !== undefined) {
    rows.push([
      "Returned",
      formatCurrency(bet.returnedAmount, bet.currency),
    ]);
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {onBack && (
            <Button variant="ghost" size="sm" onClick={onBack}>
              ← Back
            </Button>
          )}
          <BetStatusBadge status={bet.status} />
        </div>
        {bet.cashOut?.available && <CashOutPanel bet={bet} />}
      </div>

      <Surface variant="default" padding="lg" rounded="lg" shadow="none">
        <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3">
          {rows.map(([label, value]) => (
            <div key={label} className="flex items-center justify-between gap-4 border-b border-border/60 pb-2">
              <dt className="text-sm text-foreground-muted">{label}</dt>
              <dd className="text-sm font-medium text-foreground text-right font-mono">{value}</dd>
            </div>
          ))}
        </dl>
      </Surface>

      <section>
        <h3 className="text-sm font-semibold text-foreground uppercase tracking-wide mb-3">
          Selections
        </h3>
        <div className="flex flex-col gap-2">
          {bet.selections.map((sel) => {
            const result = bet.selectionResults?.find(
              (r) => r.selectionId === sel.selectionId
            );
            return (
              <Surface
                key={sel.id}
                variant="default"
                padding="md"
                rounded="lg"
                shadow="none"
                className="flex items-center justify-between gap-3"
              >
                <div className="min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">
                    {sel.match.homeTeam.name} vs {sel.match.awayTeam.name}
                  </p>
                  <p className="text-xs text-foreground-muted truncate">
                    {sel.market.name} · {sel.selection.name}
                  </p>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <span className="font-mono font-semibold text-primary">
                    {sel.selection.odds.toFixed(2)}
                  </span>
                  {result && result.outcome !== "pending" && (
                    <span
                      className={
                        result.outcome === "won"
                          ? "text-xs font-semibold text-success"
                          : result.outcome === "lost"
                            ? "text-xs font-semibold text-error"
                            : "text-xs font-semibold text-foreground-subtle"
                      }
                    >
                      {result.outcome.toUpperCase()}
                    </span>
                  )}
                </div>
              </Surface>
            );
          })}
        </div>
      </section>

      {canSettle && (
        <div>
          <Button variant="outline" loading={isSettling} onClick={() => settleBet(bet.id)}>
            Simulate Settlement
          </Button>
          <p className="text-xs text-foreground-subtle mt-2">
            Mock logic randomly settles each pending selection to win or lose.
          </p>
        </div>
      )}

      {bet.status === "won" && (
        <Alert variant="success" title="Congratulations!">
          This bet won. {formatCurrency(bet.returnedAmount ?? bet.potentialWin, bet.currency)} credited to your account.
        </Alert>
      )}
      {bet.status === "lost" && (
        <Alert variant="error" title="Bet Lost">
          This bet was not successful. Stake not returned.
        </Alert>
      )}
    </div>
  );
};

export { BetDetailsView };
export type { BetDetailsViewProps };
