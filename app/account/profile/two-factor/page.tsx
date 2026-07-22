"use client";

// app/account/profile/two-factor/page.tsx
// Two-factor authentication settings page.

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/form";
import { Alert } from "@/components/ui/feedback";
import { AccountLayout } from "@/features/account/components/account-layout";
import { mockAuth } from "@/features/auth/mock-auth";

export default function TwoFactorPage() {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [enabled, setEnabled] = useState(false);

  const handleToggle = async () => {
    const newEnabled = !enabled;
    setIsLoading(true);
    setError(null);
    setSuccess(null);
    try {
      await mockAuth.toggle2FA(newEnabled);
      setEnabled(newEnabled);
      setSuccess(newEnabled ? "Two-factor authentication enabled" : "Two-factor authentication disabled");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update settings");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AccountLayout>
      <div className="space-y-6 max-w-lg">
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
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-foreground">Two-Factor Authentication</h3>
            <p className="text-sm text-foreground-muted mt-1">
              Add an extra layer of security to your account by requiring a verification code in addition to your password.
            </p>
          </div>
          <Switch checked={enabled} onChange={handleToggle} />
        </div>
        {enabled && (
          <div className="p-4 bg-background-elevated border border-border rounded-lg space-y-4">
            <h4 className="font-medium text-foreground">Authenticator App</h4>
            <p className="text-sm text-foreground-muted">
              Scan this QR code with your authenticator app to set up two-factor authentication.
            </p>
            <div className="flex items-center justify-center p-4 bg-white rounded-lg">
              <div className="size-32 bg-gray-200 rounded flex items-center justify-center text-gray-500">
                QR Code
              </div>
            </div>
            <Button variant="secondary" className="w-full" loading={isLoading}>
              View Backup Codes
            </Button>
          </div>
        )}
      </div>
    </AccountLayout>
  );
}
