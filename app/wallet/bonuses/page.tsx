// app/wallet/bonuses/page.tsx
// Bonus system: balance, active bonuses, wagering, history.

"use client";

import { useEffect, useState } from "react";
import { Gift } from "lucide-react";
import { Spinner } from "@/components/ui/feedback";
import { EmptyState } from "@/components/ui/feedback";
import { Surface } from "@/components/ui/surface";
import { StatCard } from "@/components/ui/data-display";
import {
  WalletLayout,
  BonusCard,
} from "@/features/wallet/components";
import { mockWallet } from "@/features/wallet";
import { formatCurrency } from "@/lib/utils/format";
import type { Bonus } from "@/types/wallet";

export default function BonusesPage() {
  const [bonuses, setBonuses] = useState<Bonus[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    mockWallet
      .getBonuses()
      .then(setBonuses)
      .catch(() => setError("Unable to load bonuses."))
      .finally(() => setLoading(false));
  }, []);

  const active = bonuses.filter((b) => b.status === "active");
  const history = bonuses.filter((b) => b.status !== "active");
  const totalBonusValue = bonuses.reduce((sum, b) => sum + b.amount, 0);
  const activeWagering = active.reduce(
    (sum, b) => sum + (b.wageringRequired - b.wageringCompleted),
    0
  );

  return (
    <WalletLayout>
      <div className="flex flex-col gap-8">
        <h2 className="text-lg font-semibold text-foreground">Bonuses & Offers</h2>

        {error && (
          <Surface variant="default" padding="md" rounded="lg" className="text-error text-sm">
            {error}
          </Surface>
        )}

        {loading ? (
          <div className="flex items-center justify-center py-16" aria-live="polite">
            <Spinner size="lg" />
            <span className="sr-only">Loading bonuses</span>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <StatCard
                label="Total Bonus Value"
                value={formatCurrency(totalBonusValue)}
                icon={<Gift className="size-5 text-primary" />}
              />
              <StatCard
                label="Active Bonuses"
                value={active.length}
                icon={<Gift className="size-5 text-success" />}
              />
              <StatCard
                label="Remaining Wagering"
                value={formatCurrency(activeWagering)}
                icon={<Gift className="size-5 text-warning" />}
              />
            </div>

            <section className="flex flex-col gap-4">
              <h3 className="text-sm font-semibold text-foreground uppercase tracking-wide">
                Active Bonuses
              </h3>
              {active.length === 0 ? (
                <EmptyState icon={Gift} title="No active bonuses" description="Claim an offer to get started." />
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {active.map((b) => (
                    <BonusCard key={b.id} bonus={b} />
                  ))}
                </div>
              )}
            </section>

            <section className="flex flex-col gap-4">
              <h3 className="text-sm font-semibold text-foreground uppercase tracking-wide">
                Bonus History
              </h3>
              {history.length === 0 ? (
                <EmptyState title="No bonus history" description="Completed and expired bonuses will appear here." />
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {history.map((b) => (
                    <BonusCard key={b.id} bonus={b} />
                  ))}
                </div>
              )}
            </section>
          </>
        )}
      </div>
    </WalletLayout>
  );
}
