// features/wallet/components/transaction-table.tsx
// Transaction table with optional detail drawer content.

"use client";

import { cn } from "@/lib/utils/cn";
import { formatCurrency } from "@/lib/utils/format";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/data-display";
import type { WalletTransaction, TransactionType, TransactionStatus } from "@/types/wallet";

const TYPE_LABEL: Record<TransactionType, string> = {
  deposit: "Deposit",
  withdrawal: "Withdrawal",
  bet_placed: "Bet Placed",
  bet_won: "Bet Won",
  bet_lost: "Bet Lost",
  bonus: "Bonus",
  refund: "Refund",
};

const TYPE_SIGN: Record<TransactionType, string> = {
  deposit: "+",
  withdrawal: "-",
  bet_placed: "-",
  bet_won: "+",
  bet_lost: "-",
  bonus: "+",
  refund: "+",
};

const STATUS_TONE: Record<TransactionStatus, string> = {
  completed: "text-success",
  pending: "text-warning",
  failed: "text-error",
  cancelled: "text-foreground-subtle",
};

interface TransactionTableProps {
  transactions: WalletTransaction[];
  onSelect?: (tx: WalletTransaction) => void;
  selectedId?: string;
  currency?: string;
}

const TransactionTable = ({
  transactions,
  onSelect,
  selectedId,
  currency = "USD",
}: TransactionTableProps) => {
  return (
    <Table variant="default">
      <TableHeader>
        <TableRow className="border-b border-border">
          <TableHead>Description</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Status</TableHead>
          <TableHead textAlign="right">Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {transactions.length === 0 ? (
          <TableRow>
            <TableCell colSpan={5} className="text-center text-foreground-muted py-8">
              No transactions found
            </TableCell>
          </TableRow>
        ) : (
          transactions.map((tx) => (
            <TableRow
              key={tx.id}
              onClick={() => onSelect?.(tx)}
              className={cn(
                "border-b border-border cursor-pointer transition-colors hover:bg-background-hover/50",
                selectedId === tx.id && "bg-primary/5"
              )}
            >
              <TableCell>
                <span className="block text-foreground font-medium">{tx.description}</span>
                {tx.reference && (
                  <span className="text-xs text-foreground-subtle">{tx.reference}</span>
                )}
              </TableCell>
              <TableCell className="text-foreground-muted">{TYPE_LABEL[tx.type]}</TableCell>
              <TableCell className="text-foreground-muted whitespace-nowrap">
                {new Date(tx.timestamp).toLocaleDateString()}
              </TableCell>
              <TableCell>
                <span className={cn("capitalize", STATUS_TONE[tx.status])}>{tx.status}</span>
              </TableCell>
              <TableCell
                className={cn(
                  "text-right font-mono font-semibold",
                  TYPE_SIGN[tx.type] === "+" ? "text-success" : "text-error"
                )}
              >
                {TYPE_SIGN[tx.type]}
                {formatCurrency(tx.amount, tx.currency || currency)}
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );
};

export { TransactionTable, TYPE_LABEL };
export type { TransactionTableProps };
