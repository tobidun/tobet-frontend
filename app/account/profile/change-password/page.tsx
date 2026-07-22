"use client";

// app/account/profile/change-password/page.tsx
// Change password page.

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { TextInput } from "@/components/ui/input";
import { Alert } from "@/components/ui/feedback";
import { AccountLayout } from "@/features/account/components/account-layout";
import { changePasswordSchema, type ChangePasswordInput } from "@/lib/validations/account";
import { mockAuth } from "@/features/auth/mock-auth";

export default function ChangePasswordPage() {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
    reset,
  } = useForm<ChangePasswordInput>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: ChangePasswordInput) => {
    setIsLoading(true);
    setError(null);
    setSuccess(null);
    try {
      await mockAuth.changePassword(data.currentPassword, data.newPassword);
      setSuccess("Password changed successfully!");
      reset();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to change password");
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
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-foreground">Current Password</label>
            <TextInput type="password" error={errors.currentPassword?.message} {...register("currentPassword")} />
          </div>
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-foreground">New Password</label>
            <TextInput type="password" error={errors.newPassword?.message} {...register("newPassword")} />
          </div>
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-foreground">Confirm New Password</label>
            <TextInput type="password" error={errors.confirmPassword?.message} {...register("confirmPassword")} />
          </div>
        </div>
        <div className="flex justify-end">
          <Button type="submit" loading={isLoading} disabled={!isDirty}>
            Change Password
          </Button>
        </div>
      </form>
    </AccountLayout>
  );
}
