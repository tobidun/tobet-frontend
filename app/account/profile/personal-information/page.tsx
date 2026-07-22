"use client";

// app/account/profile/personal-information/page.tsx
// Personal information edit page.

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { TextInput } from "@/components/ui/input";
import { Alert } from "@/components/ui/feedback";
import { AccountLayout } from "@/features/account/components/account-layout";
import { personalInformationSchema, type PersonalInformationInput } from "@/lib/validations/account";
import { mockAuth } from "@/features/auth/mock-auth";

export default function PersonalInformationPage() {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm<PersonalInformationInput>({
    resolver: zodResolver(personalInformationSchema),
    defaultValues: {
      firstName: "John",
      lastName: "Doe",
      email: "john.doe@example.com",
      phone: "+1 (555) 123-4567",
      dateOfBirth: "1990-01-01",
      address: "123 Main St",
      city: "New York",
      country: "US",
      postalCode: "10001",
    },
  });

  const onSubmit = async (data: PersonalInformationInput) => {
    setIsLoading(true);
    setError(null);
    setSuccess(null);
    try {
      await mockAuth.updateProfile(data);
      setSuccess("Personal information updated successfully!");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Update failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AccountLayout>
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
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-foreground">First Name</label>
            <TextInput error={errors.firstName?.message} {...register("firstName")} />
          </div>
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-foreground">Last Name</label>
            <TextInput error={errors.lastName?.message} {...register("lastName")} />
          </div>
        </div>
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-foreground">Email</label>
          <TextInput type="email" error={errors.email?.message} {...register("email")} />
        </div>
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-foreground">Phone</label>
          <TextInput type="tel" error={errors.phone?.message} {...register("phone")} />
        </div>
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-foreground">Date of Birth</label>
          <TextInput type="date" error={errors.dateOfBirth?.message} {...register("dateOfBirth")} />
        </div>
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-foreground">Address</label>
          <TextInput error={errors.address?.message} {...register("address")} />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-foreground">City</label>
            <TextInput error={errors.city?.message} {...register("city")} />
          </div>
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-foreground">Postal Code</label>
            <TextInput error={errors.postalCode?.message} {...register("postalCode")} />
          </div>
        </div>
        <div className="flex justify-end">
          <Button type="submit" loading={isLoading} disabled={!isDirty}>
            Save Changes
          </Button>
        </div>
      </form>
    </AccountLayout>
  );
}
