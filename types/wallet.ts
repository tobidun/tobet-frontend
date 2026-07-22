// types/wallet.ts
// Wallet, payments, and bonus domain types.

export interface WalletBalance {
  available: number;
  bonus: number;
  locked: number;
  pendingWithdrawals: number;
  currency: string;
}

export type PaymentMethodType =
  | "card"
  | "paypal"
  | "skrill"
  | "neteller"
  | "crypto"
  | "bank";

export interface PaymentMethod {
  id: string;
  type: PaymentMethodType;
  label: string;
  detail: string;
  icon: string;
  min: number;
  max: number;
  fee: number;
  processingTime: string;
  currency: string;
  isDefault?: boolean;
}

export interface BankAccount {
  id: string;
  accountName: string;
  bankName: string;
  last4: string;
  ibanLast4: string;
  country: string;
  isDefault?: boolean;
}

export type TransactionType =
  | "deposit"
  | "withdrawal"
  | "bet_placed"
  | "bet_won"
  | "bet_lost"
  | "bonus"
  | "refund";

export type TransactionStatus =
  | "pending"
  | "completed"
  | "failed"
  | "cancelled";

export interface WalletTransaction {
  id: string;
  type: TransactionType;
  amount: number;
  currency: string;
  status: TransactionStatus;
  timestamp: string;
  description: string;
  method?: string;
  reference?: string;
}

export type BonusStatus = "active" | "completed" | "expired" | "cancelled";

export interface Bonus {
  id: string;
  title: string;
  description: string;
  amount: number;
  currency: string;
  status: BonusStatus;
  wageringRequired: number;
  wageringCompleted: number;
  startDate: string;
  expiryDate: string;
  code?: string;
}
