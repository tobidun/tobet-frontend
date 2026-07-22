"use client";

// app/account/profile/security/page.tsx
// Security settings page.

import { Button } from "@/components/ui/button";
import { AccountLayout } from "@/features/account/components/account-layout";

export default function SecuritySettingsPage() {
  return (
    <AccountLayout>
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground mb-2">Login Sessions</h3>
          <p className="text-sm text-foreground-muted mb-4">
            Manage your active sessions across devices.
          </p>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-4 bg-background-elevated border border-border rounded-lg">
              <div>
                <p className="font-medium text-foreground">Chrome on macOS</p>
                <p className="text-sm text-foreground-muted">Current session • Last active now</p>
              </div>
              <span className="text-xs font-medium text-success bg-success/10 px-2 py-1 rounded-full">
                Active
              </span>
            </div>
            <div className="flex items-center justify-between p-4 bg-background-elevated border border-border rounded-lg">
              <div>
                <p className="font-medium text-foreground">Safari on iPhone</p>
                <p className="text-sm text-foreground-muted">Last active 2 hours ago</p>
              </div>
              <Button variant="ghost" size="sm">
                Revoke
              </Button>
            </div>
          </div>
        </div>
        <div className="pt-6 border-t border-border">
          <h3 className="text-lg font-semibold text-foreground mb-2">Danger Zone</h3>
          <p className="text-sm text-foreground-muted mb-4">
            Once you delete your account, there is no going back. Please be certain.
          </p>
          <Button variant="danger">Delete Account</Button>
        </div>
      </div>
    </AccountLayout>
  );
}
