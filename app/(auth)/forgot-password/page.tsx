"use client";

// app/(auth)/forgot-password/page.tsx
// Forgot password page.

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Alert } from "@/components/ui/feedback";
import { AuthLayout } from "@/features/auth/components/auth-layout";
import { forgotPasswordSchema, type ForgotPasswordInput } from "@/lib/validations/auth";
import { mockAuth } from "@/features/auth/mock-auth";

export default function ForgotPasswordPage() {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordInput>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (data: ForgotPasswordInput) => {
    setIsLoading(true);
    setError(null);
    setSuccess(null);
    try {
      await mockAuth.forgotPassword(data.email);
      setSuccess("If an account exists with this email, you will receive a password reset link.");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to send reset link");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout title="Forgot password" subtitle="Enter your email to reset your password">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {error && (
          <Alert variant="error" title="Error">
            {error}
          </Alert>
        )}
        {success && (
          <Alert variant="success" title="Check your email">
            {success}
          </Alert>
        )}
        <div className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-foreground">Email</label>
            <Input
              type="email"
              placeholder="you@example.com"
              error={errors.email?.message}
              {...register("email")}
            />
          </div>
        </div>
        <Button type="submit" className="w-full" loading={isLoading}>
          Send Reset Link
        </Button>
        <p className="text-center text-sm text-foreground-muted">
          Remember your password?{" "}
          <Link href="/login" className="text-primary hover:text-primary-hover font-medium">
            Sign in
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
}
