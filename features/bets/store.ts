// features/bets/store.ts
// Zustand store for the bet slip and "My Bets" experience.

import { create } from "zustand";
import type { BetSelection } from "@/features/sportsbook/types";
import type {
  BetType,
  BetStatus,
  PlacedBet,
  CashOutOffer,
  SlipSelection,
  SettlementOutcome,
} from "@/types/bets";
import { mockPlacedBets } from "./mock-data";
import {
  calcTotalOdds,
  calcPotentialWin,
  formatTicketNumber,
} from "@/lib/bets/calculations";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

interface BetState {
  // Slip
  selections: SlipSelection[];
  stake: number;
  betType: BetType;
  isPlacing: boolean;

  // My Bets
  bets: PlacedBet[];
  isSettling: Record<string, boolean>;
  isCashingOut: Record<string, boolean>;

  // Slip actions
  addSelection: (selection: BetSelection) => void;
  removeSelection: (id: string) => void;
  clearSlip: () => void;
  setStake: (stake: number) => void;
  setBetType: (betType: BetType) => void;
  placeBet: () => Promise<PlacedBet | null>;

  // My Bets actions
  getBet: (id: string) => PlacedBet | undefined;
  settleBet: (id: string) => Promise<PlacedBet | null>;
  cashOutFull: (id: string) => Promise<PlacedBet | null>;
  cashOutPartial: (id: string, amount: number) => Promise<PlacedBet | null>;
}

const buildSlipBets = (selections: SlipSelection[], stake: number, betType: BetType): PlacedBet => {
  const totalOdds = calcTotalOdds(selections);
  const potential = calcPotentialWin(selections, stake);
  return {
    id: `bet_${Date.now()}`,
    ticketNumber: formatTicketNumber(),
    selections,
    betType,
    totalOdds,
    stake,
    potentialWin: potential,
    status: "open",
    placedAt: new Date().toISOString(),
    currency: "USD",
    selectionResults: selections.map((s) => ({
      selectionId: s.selectionId,
      outcome: "pending" as SettlementOutcome,
    })),
  };
};

export const useBetStore = create<BetState>((set, get) => ({
  selections: [],
  stake: 0,
  betType: "single",
  isPlacing: false,
  bets: mockPlacedBets,
  isSettling: {},
  isCashingOut: {},

  addSelection: (selection) =>
    set((state) => {
      // Toggle off if the same selection is already in the slip.
      if (state.selections.some((s) => s.id === selection.id)) {
        return {
          selections: state.selections.filter((s) => s.id !== selection.id),
        };
      }
      return { selections: [...state.selections, selection] };
    }),

  removeSelection: (id) =>
    set((state) => ({
      selections: state.selections.filter((s) => s.id !== id),
    })),

  clearSlip: () => set({ selections: [], stake: 0 }),

  setStake: (stake) => set({ stake: Math.max(0, stake) }),

  setBetType: (betType) => set({ betType }),

  placeBet: async () => {
    const { selections, stake, betType } = get();
    if (selections.length === 0 || stake <= 0) return null;
    set({ isPlacing: true });
    await delay(700);
    const bet = buildSlipBets(selections, stake, betType);
    // Open bets get a live cash out offer derived from confidence.
    const confidence = 0.45 + Math.random() * 0.25;
    const cashOut: CashOutOffer = {
      available: true,
      fullValue: Math.round((stake + (bet.potentialWin - stake) * confidence) * 100) / 100,
      minPartial: Math.max(1, Math.round(stake * 0.1)),
      maxPartial: Math.round((stake + (bet.potentialWin - stake) * confidence) * 100) / 100,
      settledAmount: 0,
      confidence,
    };
    const placed: PlacedBet = { ...bet, cashOut };
    set((state) => ({
      bets: [placed, ...state.bets],
      selections: [],
      stake: 0,
      betType: "single",
      isPlacing: false,
    }));
    return placed;
  },

  getBet: (id) => get().bets.find((b) => b.id === id),

  settleBet: async (id) => {
    if (get().isSettling[id]) return null;
    set((state) => ({ isSettling: { ...state.isSettling, [id]: true } }));
    await delay(800);
    let updated: PlacedBet | undefined;
    set((state) => ({
      bets: state.bets.map((b) => {
        if (b.id !== id) return b;
        // Mock settlement: decide each pending selection win/loss, then status.
        const results = (b.selectionResults ?? []).map((r) => ({
          ...r,
          outcome: (Math.random() > 0.5 ? "won" : "lost") as SettlementOutcome,
        }));
        const allWon = results.every((r) => r.outcome === "won");
        const anyDecided = results.some((r) => r.outcome !== "pending");
        const status: BetStatus = !anyDecided
          ? "open"
          : allWon
            ? "won"
            : "lost";
        const returned =
          status === "won" ? b.stake + b.potentialWin : status === "lost" ? 0 : b.stake;
        updated = {
          ...b,
          selectionResults: results,
          status,
          settledAt: new Date().toISOString(),
          returnedAmount: returned,
          cashOut: undefined,
        };
        return updated;
      }),
      isSettling: { ...state.isSettling, [id]: false },
    }));
    return updated ?? null;
  },

  cashOutFull: async (id) => {
    if (get().isCashingOut[id]) return null;
    set((state) => ({ isCashingOut: { ...state.isCashingOut, [id]: true } }));
    await delay(700);
    let updated: PlacedBet | undefined;
    set((state) => ({
      bets: state.bets.map((b) => {
        if (b.id !== id || !b.cashOut?.available) return b;
        const returned = b.cashOut.fullValue;
        updated = {
          ...b,
          status: "cashed_out",
          returnedAmount: (b.returnedAmount ?? 0) + returned,
          cashOut: undefined,
          settledAt: new Date().toISOString(),
        };
        return updated;
      }),
      isCashingOut: { ...state.isCashingOut, [id]: false },
    }));
    return updated ?? null;
  },

  cashOutPartial: async (id, amount) => {
    if (get().isCashingOut[id]) return null;
    set((state) => ({ isCashingOut: { ...state.isCashingOut, [id]: true } }));
    await delay(700);
    let updated: PlacedBet | undefined;
    set((state) => ({
      bets: state.bets.map((b) => {
        if (b.id !== id || !b.cashOut?.available) return b;
        const offer = b.cashOut;
        const partial = Math.min(amount, offer.maxPartial);
        const remaining = Math.max(0, offer.fullValue - partial);
        const newConfidence = Math.max(0, offer.confidence - 0.15);
        updated = {
          ...b,
          status: "partially_cashed_out",
          returnedAmount: (b.returnedAmount ?? 0) + partial,
          cashOut: remaining > 0.5
            ? {
                ...offer,
                fullValue: Math.round(remaining * 100) / 100,
                maxPartial: Math.round(remaining * 100) / 100,
                minPartial: Math.max(1, Math.round(remaining * 0.1)),
                settledAmount: (b.returnedAmount ?? 0) + partial,
                confidence: newConfidence,
              }
            : undefined,
        };
        return updated;
      }),
      isCashingOut: { ...state.isCashingOut, [id]: false },
    }));
    return updated ?? null;
  },
}));
