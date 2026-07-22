// lib/validations/account.ts
// Zod schemas for account settings forms.

import { z } from "zod";

export const personalInformationSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  dateOfBirth: z.string().optional(),
  address: z.string().optional(),
  city: z.string().optional(),
  country: z.string().optional(),
  postalCode: z.string().optional(),
});

export const changePasswordSchema = z.object({
  currentPassword: z.string().min(1, "Current password is required"),
  newPassword: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one number"),
  confirmPassword: z.string().min(1, "Please confirm your password"),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

export const notificationsSchema = z.object({
  emailNotifications: z.boolean(),
  pushNotifications: z.boolean(),
  smsNotifications: z.boolean(),
  betConfirmation: z.boolean(),
  promotions: z.boolean(),
  results: z.boolean(),
  responsibleGambling: z.boolean(),
});

export const responsibleGamblingSchema = z.object({
  depositLimit: z.object({
    enabled: z.boolean(),
    amount: z.number().min(0).optional(),
    period: z.enum(["daily", "weekly", "monthly"]).optional(),
  }),
  sessionLimit: z.object({
    enabled: z.boolean(),
    minutes: z.number().min(0).optional(),
  }),
  selfExclusion: z.object({
    enabled: z.boolean(),
    period: z.enum(["1_week", "1_month", "3_months", "6_months", "permanent"]).optional(),
  }),
  realityCheck: z.object({
    enabled: z.boolean(),
    interval: z.number().min(1).optional(),
  }),
});

export type PersonalInformationInput = z.infer<typeof personalInformationSchema>;
export type ChangePasswordInput = z.infer<typeof changePasswordSchema>;
export type NotificationsInput = z.infer<typeof notificationsSchema>;
export type ResponsibleGamblingInput = z.infer<typeof responsibleGamblingSchema>;
