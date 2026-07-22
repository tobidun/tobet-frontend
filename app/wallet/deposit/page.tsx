// app/wallet/deposit/page.tsx
// Deposit flow: method selection, amount, success/failed states.

"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, XCircle, ArrowLeft, ArrowDownToLine } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TextInput } from "@/components/ui/input";
import { Spinner } from "@/components/ui/feedback";
import {
  WalletLayout,
  PaymentMethodCard,
} from "@/features/wallet/components";
import { mockWallet } from "@/features/wallet";
import { depositSchema, type DepositInput } from "@/lib/validations/wallet";
import { formatCurrency } from "@/lib/utils/format";
import type { PaymentMethod, WalletTransaction } from "@/types/wallet";

type Status = "idle" | "loading" | "success" | "failed";

export default function DepositPage() {
  const [methods, setMethods] = useState<PaymentMethod[]>([]);
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<WalletTransaction | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<DepositInput>({
    resolver: zodResolver(depositSchema),
    defaultValues: { amount: "", methodId: "", bonusCode: "" },
  });

  useEffect(() => {
    mockWallet.getPaymentMethods().then(setMethods);
  }, []);

  const amount = watch("amount");
  const selected = methods.find((m) => m.id === selectedMethod) ?? null;

  const onSelectMethod = (id: string) => {
    setSelectedMethod(id);
    setValue("methodId", id, { shouldValidate: true });
  };

  const onSubmit = async (data: DepositInput) => {
    setStatus("loading");
    setError(null);
    setResult(null);
    try {
      const tx = await mockWallet.deposit({
        amount: Number(data.amount),
        methodId: data.methodId,
      });
      setResult(tx);
      setStatus("success");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Deposit failed");
      setStatus("failed");
    }
  };

  const reset = () => {
    setStatus("idle");
    setError(null);
    setResult(null);
    setSelectedMethod(null);
    setValue("methodId", "");
    setValue("amount", "");
  };

  return (
    <WalletLayout>
      <div className="flex flex-col gap-6">
        <div className="flex items-center gap-2">
          <ArrowDownToLine className="size-5 text-primary" />
          <h2 className="text-lg font-semibold text-foreground">Deposit Funds</h2>
        </div>

        <AnimatePresence mode="wait">
          {status === "success" && result ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center text-center gap-4 py-8"
            >
              <CheckCircle2 className="size-16 text-success" />
              <div>
                <h3 className="text-xl font-semibold text-foreground">Deposit Successful</h3>
                <p className="text-foreground-muted mt-1">
                  {formatCurrency(result.amount, result.currency)} credited via {result.method}
                </p>
                <p className="text-xs text-foreground-subtle mt-2">Reference: {result.reference}</p>
              </div>
              <div className="flex gap-3 mt-2">
                <Button variant="primary" onClick={reset}>
                  <ArrowDownToLine className="size-4 mr-1.5" /> New Deposit
                </Button>
                <Link href="/wallet" className="contents">
                  <Button variant="secondary">Back to Wallet</Button>
                </Link>
              </div>
            </motion.div>
          ) : status === "failed" ? (
            <motion.div
              key="failed"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center text-center gap-4 py-8"
            >
              <XCircle className="size-16 text-error" />
              <div>
                <h3 className="text-xl font-semibold text-foreground">Deposit Failed</h3>
                <p className="text-foreground-muted mt-1">{error}</p>
              </div>
              <div className="flex gap-3 mt-2">
                <Button variant="primary" onClick={() => setStatus("idle")}>
                  Try Again
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
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-6"
            >
              <section className="flex flex-col gap-3">
                <h3 className="text-sm font-semibold text-foreground uppercase tracking-wide">
                  Choose Payment Method
                </h3>
                {methods.length === 0 ? (
                  <div className="flex items-center gap-3 text-foreground-muted py-4">
                    <Spinner /> Loading methods…
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {methods.map((m) => (
                      <PaymentMethodCard
                        key={m.id}
                        method={m}
                        selected={selectedMethod === m.id}
                        onSelect={onSelectMethod}
                      />
                    ))}
                  </div>
                )}
                {errors.methodId && (
                  <p className="text-xs text-error">{errors.methodId.message}</p>
                )}
              </section>

              <section className="flex flex-col gap-3">
                <h3 className="text-sm font-semibold text-foreground uppercase tracking-wide">
                  Enter Amount
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {["25", "50", "100", "250"].map((quick) => (
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
                    Amount ({selected?.currency ?? "USD"})
                  </label>
                  <TextInput
                    id="amount"
                    inputMode="decimal"
                    placeholder="0.00"
                    error={errors.amount?.message}
                    {...register("amount")}
                  />
                </div>
                <div className="space-y-1.5">
                  <label htmlFor="bonusCode" className="text-sm font-medium text-foreground">
                    Bonus Code <span className="text-foreground-subtle">(optional)</span>
                  </label>
                  <TextInput id="bonusCode" placeholder="e.g. WELCOME200" {...register("bonusCode")} />
                </div>
                {selected && (
                  <p className="text-xs text-foreground-muted">
                    Limits: {formatCurrency(selected.min, selected.currency)} –{" "}
                    {formatCurrency(selected.max, selected.currency)}
                    {selected.fee > 0 && ` · ${selected.fee}% fee`} · {selected.processingTime}
                  </p>
                )}
              </section>

              <div className="flex items-center gap-3">
                <Button type="submit" variant="primary" loading={status === "loading"} disabled={!selectedMethod}>
                  {status === "loading" ? "Processing…" : "Confirm Deposit"}
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
      </div>
    </WalletLayout>
  );
}
