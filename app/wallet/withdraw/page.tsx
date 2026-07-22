// app/wallet/withdraw/page.tsx
// Withdrawal flow: bank selection, amount, confirmation, history.

"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpFromLine, ArrowLeft, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TextInput } from "@/components/ui/input";
import { Alert } from "@/components/ui/feedback";
import { Spinner } from "@/components/ui/feedback";
import { ConfirmDialog } from "@/components/ui/overlay";
import {
  WalletLayout,
  BankAccountCard,
  TransactionTable,
} from "@/features/wallet/components";
import { mockWallet } from "@/features/wallet";
import { withdrawalSchema, type WithdrawalInput } from "@/lib/validations/wallet";
import { formatCurrency } from "@/lib/utils/format";
import type { BankAccount, WalletTransaction } from "@/types/wallet";

type Step = "form" | "success";
type Status = "idle" | "loading" | "success" | "failed";

export default function WithdrawPage() {
  const [accounts, setAccounts] = useState<BankAccount[]>([]);
  const [transactions, setTransactions] = useState<WalletTransaction[]>([]);
  const [balance, setBalance] = useState(0);
  const [step, setStep] = useState<Step>("form");
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [result, setResult] = useState<WalletTransaction | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<WithdrawalInput>({
    resolver: zodResolver(withdrawalSchema),
    defaultValues: { amount: "", bankAccountId: "" },
  });

  useEffect(() => {
    (async () => {
      const [accs, txs, bal] = await Promise.all([
        mockWallet.getBankAccounts(),
        mockWallet.getTransactions(),
        mockWallet.getBalance(),
      ]);
      setAccounts(accs);
      setTransactions(txs.filter((t) => t.type === "withdrawal"));
      setBalance(bal.available);
    })();
  }, []);

  const amount = watch("amount");
  const bankAccountId = watch("bankAccountId");
  const selectedAccount = accounts.find((a) => a.id === bankAccountId) ?? null;
  const numericAmount = Number(amount);

  const onSelectAccount = (id: string) => {
    setValue("bankAccountId", id, { shouldValidate: true });
  };

  const onSubmit = async (data: WithdrawalInput) => {
    setStatus("loading");
    setError(null);
    try {
      const tx = await mockWallet.withdraw({
        amount: Number(data.amount),
        bankAccountId: data.bankAccountId,
      });
      setResult(tx);
      setTransactions((prev) => [tx, ...prev]);
      setStatus("success");
      setStep("success");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Withdrawal failed");
      setStatus("failed");
    } finally {
      setConfirmOpen(false);
    }
  };

  const reset = () => {
    setStep("form");
    setStatus("idle");
    setError(null);
    setResult(null);
    setValue("amount", "");
    setValue("bankAccountId", "");
  };

  return (
    <WalletLayout>
      <div className="flex flex-col gap-6">
        <div className="flex items-center gap-2">
          <ArrowUpFromLine className="size-5 text-primary" />
          <h2 className="text-lg font-semibold text-foreground">Withdraw Funds</h2>
        </div>

        <Alert variant="info">
          Available to withdraw: <span className="font-mono font-semibold">{formatCurrency(balance)}</span>
        </Alert>

        {error && (
          <Alert variant="error" title="Withdrawal failed">
            {error}
          </Alert>
        )}

        <AnimatePresence mode="wait">
          {step === "success" && result ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center text-center gap-4 py-8"
            >
              <CheckCircle2 className="size-16 text-success" />
              <div>
                <h3 className="text-xl font-semibold text-foreground">Withdrawal Requested</h3>
                <p className="text-foreground-muted mt-1">
                  {formatCurrency(result.amount, result.currency)} to {result.method}
                </p>
                <p className="text-xs text-foreground-subtle mt-2">Reference: {result.reference}</p>
              </div>
              <div className="flex gap-3 mt-2">
                <Button variant="primary" onClick={reset}>
                  New Withdrawal
                </Button>
                <Link href="/wallet" className="contents">
                  <Button variant="secondary">Back to Wallet</Button>
                </Link>
              </div>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onSubmit={handleSubmit(() => setConfirmOpen(true))}
              className="flex flex-col gap-6"
            >
              <section className="flex flex-col gap-3">
                <h3 className="text-sm font-semibold text-foreground uppercase tracking-wide">
                  Select Bank Account
                </h3>
                {accounts.length === 0 ? (
                  <div className="flex items-center gap-3 text-foreground-muted py-4">
                    <Spinner /> Loading accounts…
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {accounts.map((a) => (
                      <BankAccountCard
                        key={a.id}
                        account={a}
                        selected={bankAccountId === a.id}
                        onSelect={onSelectAccount}
                      />
                    ))}
                  </div>
                )}
                {errors.bankAccountId && (
                  <p className="text-xs text-error">{errors.bankAccountId.message}</p>
                )}
              </section>

              <section className="flex flex-col gap-3">
                <h3 className="text-sm font-semibold text-foreground uppercase tracking-wide">
                  Enter Amount
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {["25", "50", "100", String(Math.floor(balance))].map((quick) => (
                    <Button
                      key={quick}
                      type="button"
                      variant={amount === quick ? "primary" : "secondary"}
                      size="sm"
                      onClick={() => setValue("amount", quick, { shouldValidate: true })}
                    >
                      ${quick}
                    </Button>
                  ))}
                </div>
                <div className="space-y-1.5">
                  <label htmlFor="amount" className="text-sm font-medium text-foreground">
                    Amount (USD)
                  </label>
                  <TextInput
                    id="amount"
                    inputMode="decimal"
                    placeholder="0.00"
                    error={errors.amount?.message}
                    {...register("amount")}
                  />
                </div>
                {numericAmount > balance && (
                  <p className="text-xs text-error">Amount exceeds your available balance.</p>
                )}
              </section>

              <div className="flex items-center gap-3">
                <Button
                  type="submit"
                  variant="primary"
                  disabled={!bankAccountId || numericAmount <= 0 || numericAmount > balance}
                >
                  Review Withdrawal
                </Button>
                <Link href="/wallet" className="contents">
                  <Button type="button" variant="ghost">
                    <ArrowLeft className="size-4 mr-1.5" /> Cancel
                  </Button>
                </Link>
              </div>
            </motion.form>
          )}
        </AnimatePresence>

        {transactions.length > 0 && (
          <section className="flex flex-col gap-4">
            <h3 className="text-lg font-semibold text-foreground">Withdrawal History</h3>
            <TransactionTable transactions={transactions} />
          </section>
        )}
      </div>

      <ConfirmDialog
        open={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        onConfirm={handleSubmit(onSubmit)}
        title="Confirm Withdrawal"
        description={
          selectedAccount
            ? `Withdraw ${formatCurrency(numericAmount)} to ${selectedAccount.bankName} (···· ${selectedAccount.last4})?`
            : undefined
        }
        confirmLabel={status === "loading" ? "Processing…" : "Confirm Withdrawal"}
        loading={status === "loading"}
      />
    </WalletLayout>
  );
}
