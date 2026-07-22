"use client";

// app/account/profile/notifications/page.tsx
// Notifications settings page.

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/form";
import { Alert } from "@/components/ui/feedback";
import { AccountLayout } from "@/features/account/components/account-layout";
import { notificationsSchema, type NotificationsInput } from "@/lib/validations/account";
import { mockAuth } from "@/features/auth/mock-auth";

export default function NotificationsPage() {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { isDirty },
  } = useForm<NotificationsInput>({
    resolver: zodResolver(notificationsSchema),
    defaultValues: {
      emailNotifications: true,
      pushNotifications: true,
      smsNotifications: false,
      betConfirmation: true,
      promotions: true,
      results: true,
      responsibleGambling: true,
    },
  });

  const onSubmit = async (data: NotificationsInput) => {
    setIsLoading(true);
    setError(null);
    setSuccess(null);
    try {
      await mockAuth.updateNotifications(data);
      setSuccess("Notification preferences updated successfully!");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update preferences");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AccountLayout>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-w-lg">
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
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-foreground">Email Notifications</p>
              <p className="text-sm text-foreground-muted">
                Receive notifications via email
              </p>
            </div>
            <Switch {...register("emailNotifications")} />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-foreground">Push Notifications</p>
              <p className="text-sm text-foreground-muted">
                Receive push notifications in your browser
              </p>
            </div>
            <Switch {...register("pushNotifications")} />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-foreground">SMS Notifications</p>
              <p className="text-sm text-foreground-muted">
                Receive notifications via SMS
              </p>
            </div>
            <Switch {...register("smsNotifications")} />
          </div>
          <hr className="border-border" />
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-foreground">Bet Confirmations</p>
              <p className="text-sm text-foreground-muted">
                Get notified when your bet is placed
              </p>
            </div>
            <Switch {...register("betConfirmation")} />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-foreground">Promotions</p>
              <p className="text-sm text-foreground-muted">
                Receive offers and promotions
              </p>
            </div>
            <Switch {...register("promotions")} />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-foreground">Results</p>
              <p className="text-sm text-foreground-muted">
                Get notified about match results
              </p>
            </div>
            <Switch {...register("results")} />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-foreground">Responsible Gambling</p>
              <p className="text-sm text-foreground-muted">
                Receive reminders and updates about your gambling activity
              </p>
            </div>
            <Switch {...register("responsibleGambling")} />
          </div>
        </div>
        <div className="flex justify-end">
          <Button type="submit" loading={isLoading} disabled={!isDirty}>
            Save Preferences
          </Button>
        </div>
      </form>
    </AccountLayout>
  );
}
