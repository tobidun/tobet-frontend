// app/wallet/transactions/page.tsx
// Transaction system: table, details, filters, and search.

"use client";

import { useEffect, useMemo, useState } from "react";
import { Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/feedback";
import { EmptyState } from "@/components/ui/feedback";
import { Surface } from "@/components/ui/surface";
import { Select } from "@/components/ui/form";
import {
  WalletLayout,
  TransactionTable,
} from "@/features/wallet/components";
import { mockWallet } from "@/features/wallet";
import { formatCurrency } from "@/lib/utils/format";
import { TYPE_LABEL } from "@/features/wallet/components";
import type { WalletTransaction, TransactionType, TransactionStatus } from "@/types/wallet";

const TYPE_OPTIONS: { value: TransactionType | "all"; label: string }[] = [
  { value: "all", label: "All Types" },
  { value: "deposit", label: "Deposit" },
  { value: "withdrawal", label: "Withdrawal" },
  { value: "bet_placed", label: "Bet Placed" },
  { value: "bet_won", label: "Bet Won" },
  { value: "bet_lost", label: "Bet Lost" },
  { value: "bonus", label: "Bonus" },
  { value: "refund", label: "Refund" },
];

const STATUS_OPTIONS: { value: TransactionStatus | "all"; label: string }[] = [
  { value: "all", label: "All Statuses" },
  { value: "completed", label: "Completed" },
  { value: "pending", label: "Pending" },
  { value: "failed", label: "Failed" },
  { value: "cancelled", label: "Cancelled" },
];

export default function TransactionsPage() {
  const [transactions, setTransactions] = useState<WalletTransaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState<TransactionType | "all">("all");
  const [statusFilter, setStatusFilter] = useState<TransactionStatus | "all">("all");
  const [selected, setSelected] = useState<WalletTransaction | null>(null);

  useEffect(() => {
    mockWallet.getTransactions().then((txs) => {
      setTransactions(txs);
      setLoading(false);
    });
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return transactions
      .filter((t) => (typeFilter === "all" ? true : t.type === typeFilter))
      .filter((t) => (statusFilter === "all" ? true : t.status === statusFilter))
      .filter((t) =>
        q
          ? t.description.toLowerCase().includes(q) ||
            (t.reference ?? "").toLowerCase().includes(q) ||
            (t.method ?? "").toLowerCase().includes(q)
          : true
      )
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
  }, [transactions, query, typeFilter, statusFilter]);

  const clearFilters = () => {
    setQuery("");
    setTypeFilter("all");
    setStatusFilter("all");
  };

  const hasFilters = query || typeFilter !== "all" || statusFilter !== "all";

  return (
    <WalletLayout>
      <div className="flex flex-col gap-6">
        <h2 className="text-lg font-semibold text-foreground">Transactions</h2>

        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1">
            <Input
              type="search"
              placeholder="Search by description, method, or reference"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              aria-label="Search transactions"
            />
          </div>
          <Select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value as TransactionType | "all")}
            aria-label="Filter by type"
            className="sm:w-44"
          >
            {TYPE_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </Select>
          <Select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as TransactionStatus | "all")}
            aria-label="Filter by status"
            className="sm:w-44"
          >
            {STATUS_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </Select>
        </div>

        {hasFilters && (
          <div className="flex items-center justify-between">
            <span className="text-sm text-foreground-muted">
              {filtered.length} result{filtered.length === 1 ? "" : "s"}
            </span>
            <Button variant="ghost" size="sm" onClick={clearFilters}>
              <X className="size-4 mr-1" /> Clear filters
            </Button>
          </div>
        )}

        {loading ? (
          <div className="flex items-center justify-center py-16" aria-live="polite">
            <Spinner size="lg" />
            <span className="sr-only">Loading transactions</span>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <TransactionTable
                transactions={filtered}
                onSelect={setSelected}
                selectedId={selected?.id}
              />
            </div>
            <aside className="lg:col-span-1">
              {selected ? (
                <TransactionDetails tx={selected} onClose={() => setSelected(null)} />
              ) : (
                <Surface variant="default" padding="md" rounded="lg" shadow="none" className="text-sm text-foreground-muted">
                  Select a transaction to view its details.
                </Surface>
              )}
            </aside>
          </div>
        )}

        {!loading && filtered.length === 0 && (
          <EmptyState
            icon={Search}
            title="No transactions found"
            description="Try adjusting your search or filters."
            action={{ label: "Clear filters", onClick: clearFilters }}
          />
        )}
      </div>
    </WalletLayout>
  );
}

function TransactionDetails({
  tx,
  onClose,
}: {
  tx: WalletTransaction;
  onClose: () => void;
}) {
  const rows: [string, string][] = [
    ["Type", TYPE_LABEL[tx.type]],
    ["Status", tx.status],
    ["Amount", formatCurrency(tx.amount, tx.currency)],
    ["Date", new Date(tx.timestamp).toLocaleString()],
    ["Method", tx.method ?? "—"],
    ["Reference", tx.reference ?? "—"],
  ];
  return (
    <Surface variant="default" padding="md" rounded="lg" shadow="none" className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-foreground">Transaction Details</h3>
        <Button variant="ghost" size="xs" onClick={onClose} aria-label="Close details">
          <X className="size-4" />
        </Button>
      </div>
      <dl className="flex flex-col gap-2">
        {rows.map(([label, value]) => (
          <div key={label} className="flex items-center justify-between text-sm">
            <dt className="text-foreground-muted">{label}</dt>
            <dd className="text-foreground font-medium capitalize text-right">{value}</dd>
          </div>
        ))}
      </dl>
      <p className="text-sm text-foreground">{tx.description}</p>
    </Surface>
  );
}
