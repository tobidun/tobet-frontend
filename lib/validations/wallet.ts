// lib/validations/wallet.ts
// Zod schemas for wallet forms.

import { z } from "zod";

export const depositSchema = z.object({
  amount: z
    .string()
    .min(1, "Amount is required")
    .refine((v) => !Number.isNaN(Number(v)) && Number(v) > 0, "Enter a valid amount"),
  methodId: z.string().min(1, "Select a payment method"),
  bonusCode: z.string().optional(),
});

export type DepositInput = z.infer<typeof depositSchema>;

export const withdrawalSchema = z.object({
  amount: z
    .string()
    .min(1, "Amount is required")
    .refine((v) => !Number.isNaN(Number(v)) && Number(v) > 0, "Enter a valid amount"),
  bankAccountId: z.string().min(1, "Select a bank account"),
});

export type WithdrawalInput = z.infer<typeof withdrawalSchema>;
