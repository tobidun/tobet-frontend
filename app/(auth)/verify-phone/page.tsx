"use client";

// app/(auth)/verify-phone/page.tsx
// Phone verification page.

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Alert } from "@/components/ui/feedback";
import { AuthLayout } from "@/features/auth/components/auth-layout";
import { verifyPhoneSchema, type VerifyPhoneInput } from "@/lib/validations/auth";
import { mockAuth } from "@/features/auth/mock-auth";

export default function VerifyPhonePage() {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [code, setCode] = useState("");

  const {
    handleSubmit,
    formState: { errors },
  } = useForm<VerifyPhoneInput>({
    resolver: zodResolver(verifyPhoneSchema),
    defaultValues: {
      code: "",
    },
  });

  const onSubmit = async (data: VerifyPhoneInput) => {
    setIsLoading(true);
    setError(null);
    setSuccess(null);
    try {
      await mockAuth.verifyPhone(data.code);
      setSuccess("Phone number verified successfully!");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Verification failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Verify your phone"
      subtitle="Enter the 6-digit code sent to your phone number"
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
            <label className="text-sm font-medium text-foreground">Verification Code</label>
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
          Verify Phone
        </Button>
        <p className="text-center text-sm text-foreground-muted">
          Didn&apos;t receive the code?{" "}
          <button
            type="button"
            onClick={() => mockAuth.sendOTP()}
            className="text-primary hover:text-primary-hover font-medium"
          >
            Resend
          </button>
        </p>
      </form>
    </AuthLayout>
  );
}
