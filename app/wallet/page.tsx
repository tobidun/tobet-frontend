// app/wallet/page.tsx
// Wallet dashboard with balance breakdown and recent activity.

"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowDownToLine, ArrowUpFromLine, Gift, Receipt, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Alert } from "@/components/ui/feedback";
import { Spinner } from "@/components/ui/feedback";
import { EmptyState } from "@/components/ui/feedback";
import { WalletLayout, BalanceOverview, TransactionTable, BonusCard } from "@/features/wallet/components";
import { mockWallet } from "@/features/wallet";
import type { WalletBalance, WalletTransaction, Bonus } from "@/types/wallet";

export default function WalletDashboardPage() {
  const [balance, setBalance] = useState<WalletBalance | null>(null);
  const [transactions, setTransactions] = useState<WalletTransaction[]>([]);
  const [bonuses, setBonuses] = useState<Bonus[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    (async () => {
      try {
        const [b, txs, bns] = await Promise.all([
          mockWallet.getBalance(),
          mockWallet.getTransactions(),
          mockWallet.getBonuses(),
        ]);
        if (!active) return;
        setBalance(b);
        setTransactions(txs);
        setBonuses(bns);
      } catch {
        if (active) setError("Unable to load wallet data. Please try again.");
      } finally {
        if (active) setLoading(false);
      }
    })();
    return () => {
      active = false;
    };
  }, []);

  const recent = transactions.slice(0, 5);
  const activeBonuses = bonuses.filter((b) => b.status === "active");

  return (
    <WalletLayout>
      <div className="flex flex-col gap-8">
        {error && (
          <Alert variant="error" title="Something went wrong">
            {error}
          </Alert>
        )}

        {loading ? (
          <div className="flex items-center justify-center py-16" aria-live="polite">
            <Spinner size="lg" />
            <span className="sr-only">Loading wallet</span>
          </div>
        ) : balance ? (
          <>
            <BalanceOverview balance={balance} />

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <Link href="/wallet/deposit" className="contents">
                <Button variant="primary" fullWidth>
                  <ArrowDownToLine className="size-4 mr-1.5" /> Deposit
                </Button>
              </Link>
              <Link href="/wallet/withdraw" className="contents">
                <Button variant="secondary" fullWidth>
                  <ArrowUpFromLine className="size-4 mr-1.5" /> Withdraw
                </Button>
              </Link>
              <Link href="/wallet/bonuses" className="contents">
                <Button variant="secondary" fullWidth>
                  <Gift className="size-4 mr-1.5" /> Bonuses
                </Button>
              </Link>
              <Link href="/wallet/transactions" className="contents">
                <Button variant="secondary" fullWidth>
                  <Receipt className="size-4 mr-1.5" /> History
                </Button>
              </Link>
            </div>

            <section className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-foreground">Recent Transactions</h2>
                <Link
                  href="/wallet/transactions"
                  className="text-sm text-primary hover:underline inline-flex items-center gap-1"
                >
                  View all <Plus className="size-3.5" />
                </Link>
              </div>
              {recent.length === 0 ? (
                <EmptyState title="No transactions yet" description="Your deposits and bets will appear here." />
              ) : (
                <TransactionTable transactions={recent} />
              )}
            </section>

            {activeBonuses.length > 0 && (
              <section className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-foreground">Active Bonuses</h2>
                  <Link
                    href="/wallet/bonuses"
                    className="text-sm text-primary hover:underline inline-flex items-center gap-1"
                  >
                    View all <Plus className="size-3.5" />
                  </Link>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {activeBonuses.slice(0, 2).map((b) => (
                    <BonusSummaryCard key={b.id} bonus={b} />
                  ))}
                </div>
              </section>
            )}
          </>
        ) : null}
      </div>
    </WalletLayout>
  );
}

function BonusSummaryCard({ bonus }: { bonus: Bonus }) {
  return <BonusCard bonus={bonus} />;
}
