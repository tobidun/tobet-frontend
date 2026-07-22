"use client";

// app/account/profile/page.tsx
// Profile overview page.

import { Button } from "@/components/ui/button";
import { AccountLayout } from "@/features/account/components/account-layout";

export default function ProfileOverviewPage() {
  const mockUser = {
    id: "user_1",
    email: "john.doe@example.com",
    firstName: "John",
    lastName: "Doe",
    currency: "USD",
    country: "US",
    isVerified: true,
  };

  return (
    <AccountLayout>
      <div className="space-y-6">
        <div className="flex items-center gap-6">
          <div className="flex items-center justify-center size-20 rounded-full bg-primary text-foreground-inverse text-2xl font-bold">
            {mockUser.firstName[0]}
            {mockUser.lastName[0]}
          </div>
          <div>
            <h2 className="text-2xl font-bold text-foreground">
              {mockUser.firstName} {mockUser.lastName}
            </h2>
            <p className="text-foreground-muted">{mockUser.email}</p>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-background-elevated border border-border rounded-lg p-4">
            <p className="text-sm text-foreground-muted">Account Status</p>
            <p className="text-lg font-semibold text-foreground">
              {mockUser.isVerified ? "Verified" : "Unverified"}
            </p>
          </div>
          <div className="bg-background-elevated border border-border rounded-lg p-4">
            <p className="text-sm text-foreground-muted">Country</p>
            <p className="text-lg font-semibold text-foreground">{mockUser.country}</p>
          </div>
          <div className="bg-background-elevated border border-border rounded-lg p-4">
            <p className="text-sm text-foreground-muted">Currency</p>
            <p className="text-lg font-semibold text-foreground">{mockUser.currency}</p>
          </div>
          <div className="bg-background-elevated border border-border rounded-lg p-4">
            <p className="text-sm text-foreground-muted">Member Since</p>
            <p className="text-lg font-semibold text-foreground">January 2024</p>
          </div>
        </div>
        <div className="flex gap-4">
          <Button variant="primary">Edit Profile</Button>
          <Button variant="secondary">Change Password</Button>
        </div>
      </div>
    </AccountLayout>
  );
}
