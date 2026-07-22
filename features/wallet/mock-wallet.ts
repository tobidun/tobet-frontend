// features/wallet/mock-wallet.ts
// Mock wallet service (frontend-only, no backend).

import { mockWalletBalance, mockTransactions, mockBonuses } from "./mock-data";
import type {
  WalletBalance,
  WalletTransaction,
  Bonus,
  PaymentMethod,
  BankAccount,
} from "@/types/wallet";
import { mockPaymentMethods } from "./mock-data";
import { mockBankAccounts } from "./mock-data";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const mockWallet = {
  getBalance: async (): Promise<WalletBalance> => {
    await delay(300);
    return mockWalletBalance;
  },

  getPaymentMethods: async (): Promise<PaymentMethod[]> => {
    await delay(200);
    return mockPaymentMethods;
  },

  getBankAccounts: async (): Promise<BankAccount[]> => {
    await delay(200);
    return mockBankAccounts;
  },

  getTransactions: async (): Promise<WalletTransaction[]> => {
    await delay(300);
    return mockTransactions;
  },

  getBonuses: async (): Promise<Bonus[]> => {
    await delay(300);
    return mockBonuses;
  },

  deposit: async (input: {
    amount: number;
    methodId: string;
  }): Promise<WalletTransaction> => {
    await delay(900);
    const method = mockPaymentMethods.find((m) => m.id === input.methodId);
    if (!method) {
      throw new Error("Selected payment method is unavailable");
    }
    if (input.amount < method.min) {
      throw new Error(`Minimum deposit is ${method.min}`);
    }
    if (input.amount > method.max) {
      throw new Error(`Maximum deposit is ${method.max}`);
    }
    return {
      id: `tx_${Date.now()}`,
      type: "deposit",
      amount: input.amount,
      currency: mockWalletBalance.currency,
      status: "completed",
      timestamp: new Date().toISOString(),
      description: `Deposit via ${method.label}`,
      method: method.label,
      reference: `DEP-${Math.floor(Math.random() * 900000 + 100000)}`,
    };
  },

  withdraw: async (input: {
    amount: number;
    bankAccountId: string;
  }): Promise<WalletTransaction> => {
    await delay(900);
    const account = mockBankAccounts.find((b) => b.id === input.bankAccountId);
    if (!account) {
      throw new Error("Selected bank account is unavailable");
    }
    if (input.amount > mockWalletBalance.available) {
      throw new Error("Insufficient available balance");
    }
    return {
      id: `tx_${Date.now()}`,
      type: "withdrawal",
      amount: input.amount,
      currency: mockWalletBalance.currency,
      status: "pending",
      timestamp: new Date().toISOString(),
      description: `Withdrawal to ${account.bankName}`,
      method: account.bankName,
      reference: `WD-${Math.floor(Math.random() * 900000 + 100000)}`,
    };
  },
};
