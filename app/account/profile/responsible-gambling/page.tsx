"use client";

// app/account/profile/responsible-gambling/page.tsx
// Responsible gambling settings page.

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { TextInput } from "@/components/ui/input";
import { Switch } from "@/components/ui/form";
import { Alert } from "@/components/ui/feedback";
import { AccountLayout } from "@/features/account/components/account-layout";
import { responsibleGamblingSchema, type ResponsibleGamblingInput } from "@/lib/validations/account";
import { mockAuth } from "@/features/auth/mock-auth";

export default function ResponsibleGamblingPage() {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
    watch,
  } = useForm<ResponsibleGamblingInput>({
    resolver: zodResolver(responsibleGamblingSchema),
    defaultValues: {
      depositLimit: {
        enabled: false,
        amount: 1000,
        period: "weekly",
      },
      sessionLimit: {
        enabled: false,
        minutes: 60,
      },
      selfExclusion: {
        enabled: false,
        period: "1_week",
      },
      realityCheck: {
        enabled: true,
        interval: 60,
      },
    },
  });

  const depositLimitEnabled = watch("depositLimit.enabled");
  const sessionLimitEnabled = watch("sessionLimit.enabled");
  const selfExclusionEnabled = watch("selfExclusion.enabled");
  const realityCheckEnabled = watch("realityCheck.enabled");

  const onSubmit = async (data: ResponsibleGamblingInput) => {
    setIsLoading(true);
    setError(null);
    setSuccess(null);
    try {
      await mockAuth.updateResponsibleGambling(data);
      setSuccess("Responsible gambling settings updated successfully!");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update settings");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AccountLayout>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 max-w-2xl">
        {error && (
          <Alert variant="error" title="Error">
            {error}
          </Alert>
        )}
        {success && (
          <Alert variant="success" title="Success">
            {success}
          </Alert>
        )}
        <div className="space-y-6">
          <div className="p-4 bg-background-elevated border border-border rounded-lg">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-foreground">Deposit Limit</h3>
                <p className="text-sm text-foreground-muted">
                  Set a limit on how much you can deposit over a specific period.
                </p>
              </div>
              <Switch {...register("depositLimit.enabled")} />
            </div>
            {depositLimitEnabled && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-foreground">Limit Amount</label>
                  <TextInput type="number" error={errors.depositLimit?.amount?.message} {...register("depositLimit.amount")} />
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-foreground">Period</label>
                  <select
                    className="w-full h-10 px-3 rounded-lg border border-border bg-background text-foreground"
                    {...register("depositLimit.period")}
                  >
                    <option value="daily">Daily</option>
                    <option value="weekly">Weekly</option>
                    <option value="monthly">Monthly</option>
                  </select>
                </div>
              </div>
            )}
          </div>
          <div className="p-4 bg-background-elevated border border-border rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-foreground">Session Limit</h3>
                <p className="text-sm text-foreground-muted">
                  Set a time limit for your betting sessions.
                </p>
              </div>
              <Switch {...register("sessionLimit.enabled")} />
            </div>
            {sessionLimitEnabled && (
              <div className="mt-4 space-y-1.5">
                <label className="text-sm font-medium text-foreground">Session Duration (minutes)</label>
                <TextInput type="number" error={errors.sessionLimit?.minutes?.message} {...register("sessionLimit.minutes")} />
              </div>
            )}
          </div>
          <div className="p-4 bg-background-elevated border border-border rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-foreground">Reality Check</h3>
                <p className="text-sm text-foreground-muted">
                  Get reminders about how long you have been playing.
                </p>
              </div>
              <Switch {...register("realityCheck.enabled")} />
            </div>
            {realityCheckEnabled && (
              <div className="mt-4 space-y-1.5">
                <label className="text-sm font-medium text-foreground">Interval (minutes)</label>
                <TextInput type="number" error={errors.realityCheck?.interval?.message} {...register("realityCheck.interval")} />
              </div>
            )}
          </div>
          <div className="p-4 bg-error/5 border border-error/20 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-error">Self-Exclusion</h3>
                <p className="text-sm text-foreground-muted">
                  Temporarily or permanently exclude yourself from the platform.
                </p>
              </div>
              <Switch {...register("selfExclusion.enabled")} />
            </div>
            {selfExclusionEnabled && (
              <div className="mt-4 space-y-1.5">
                <label className="text-sm font-medium text-foreground">Exclusion Period</label>
                <select
                  className="w-full h-10 px-3 rounded-lg border border-border bg-background text-foreground"
                  {...register("selfExclusion.period")}
                >
                  <option value="1_week">1 Week</option>
                  <option value="1_month">1 Month</option>
                  <option value="3_months">3 Months</option>
                  <option value="6_months">6 Months</option>
                  <option value="permanent">Permanent</option>
                </select>
              </div>
            )}
          </div>
        </div>
        <div className="flex justify-end">
          <Button type="submit" loading={isLoading} disabled={!isDirty}>
            Save Settings
          </Button>
        </div>
      </form>
    </AccountLayout>
  );
}
