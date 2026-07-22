"use client";

// app/(auth)/otp-verification/page.tsx
// OTP verification page for two-factor authentication.

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Alert } from "@/components/ui/feedback";
import { AuthLayout } from "@/features/auth/components/auth-layout";
import { otpVerificationSchema, type OTPVerificationInput } from "@/lib/validations/auth";
import { mockAuth } from "@/features/auth/mock-auth";

export default function OTPVerificationPage() {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [code, setCode] = useState("");

  const {
    handleSubmit,
    formState: { errors },
  } = useForm<OTPVerificationInput>({
    resolver: zodResolver(otpVerificationSchema),
    defaultValues: {
      code: "",
    },
  });

  const onSubmit = async (data: OTPVerificationInput) => {
    setIsLoading(true);
    setError(null);
    setSuccess(null);
    try {
      await mockAuth.verifyOTP(data.code);
      setSuccess("Two-factor authentication verified!");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Verification failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Two-Factor Authentication"
      subtitle="Enter the 6-digit code from your authenticator app"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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
            <label className="text-sm font-medium text-foreground">Authenticator Code</label>
            <div className="flex gap-2 justify-center">
              {Array.from({ length: 6 }).map((_, i) => (
                <input
                  key={i}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  className="w-10 h-12 text-center text-lg border border-border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                  value={code[i] || ""}
                  onChange={(e) => {
                    const newCode = code.slice(0, i) + e.target.value.slice(-1) + code.slice(i + 1);
                    setCode(newCode);
                    if (e.target.value && i < 5) {
                      ((e.target as HTMLInputElement).nextElementSibling as HTMLInputElement | null)?.focus();
                    }
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Backspace" && !code[i] && i > 0) {
                      ((e.target as HTMLInputElement).previousElementSibling as HTMLInputElement | null)?.focus();
                    }
                  }}
                />
              ))}
            </div>
            {errors.code && <p className="text-xs text-error text-center">{errors.code.message}</p>}
          </div>
        </div>
        <Button type="submit" className="w-full" loading={isLoading}>
          Verify
        </Button>
        <p className="text-center text-sm text-foreground-muted">
          Lost your device?{" "}
          <Link href="/account/profile/security" className="text-primary hover:text-primary-hover font-medium">
            Use backup code
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
}
