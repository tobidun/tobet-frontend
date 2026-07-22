"use client";

// app/(auth)/login/page.tsx
// Login page with email/password authentication.

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input, TextInput } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/form";
import { Alert } from "@/components/ui/feedback";
import { AuthLayout } from "@/features/auth/components/auth-layout";
import { loginSchema, type LoginInput } from "@/lib/validations/auth";
import { mockAuth } from "@/features/auth/mock-auth";

export default function LoginPage() {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      remember: false,
    },
  });

  const onSubmit = async (data: LoginInput) => {
    setIsLoading(true);
    setError(null);
    setSuccess(null);
    try {
      const session = await mockAuth.login(data);
      setSuccess("Login successful! Redirecting...");
      console.log("Login successful:", session);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout title="Welcome back" subtitle="Sign in to your account to continue">
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
            <label className="text-sm font-medium text-foreground">Email</label>
            <Input
              type="email"
              placeholder="you@example.com"
              error={errors.email?.message}
              {...register("email")}
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-foreground">Password</label>
            <TextInput
              placeholder="••••••••"
              error={errors.password?.message}
              {...register("password")}
            />
          </div>
          <div className="flex items-center justify-between">
            <Checkbox label="Remember me" {...register("remember")} />
            <Link href="/forgot-password" className="text-sm text-primary hover:text-primary-hover">
              Forgot password?
            </Link>
          </div>
        </div>
        <Button type="submit" className="w-full" loading={isLoading}>
          Sign In
        </Button>
        <p className="text-center text-sm text-foreground-muted">
          Don&apos;t have an account?{" "}
          <Link href="/register" className="text-primary hover:text-primary-hover font-medium">
            Sign up
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
}
