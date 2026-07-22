// store/slices/bets.slice.ts
// Zustand slice for bet slip and betting state.
// NOTE: The primary betting store now lives in features/bets/store.ts (useBetStore).
// This slice is retained for compatibility with the root store composition and
// uses the canonical types from @/types/bets.

import { StateCreator } from 'zustand';
import type { SlipSelection, BetSlipState, PlacedBet, BetType } from '@/types/bets';

export interface BetsSlice {
  slip: BetSlipState;
  recentBets: PlacedBet[];
  isSubmitting: boolean;
  addSelection: (selection: SlipSelection) => void;
  removeSelection: (id: string) => void;
  clearSlip: () => void;
  setStake: (stake: number) => void;
  setBetType: (type: BetType) => void;
  setSubmitting: (submitting: boolean) => void;
  addRecentBet: (bet: PlacedBet) => void;
}

const initialSlip: BetSlipState = {
  selections: [],
  stake: 0,
  betType: 'single',
  totalOdds: 0,
  potentialWin: 0,
};

export const createBetsSlice: StateCreator<BetsSlice> = (set) => ({
  slip: initialSlip,
  recentBets: [],
  isSubmitting: false,
  addSelection: (selection) =>
    set((state) => ({
      slip: {
        ...state.slip,
        selections: state.slip.selections.some((s) => s.id === selection.id)
          ? state.slip.selections.filter((s) => s.id !== selection.id)
          : [...state.slip.selections, selection],
      },
    })),
  removeSelection: (id) =>
    set((state) => ({
      slip: {
        ...state.slip,
        selections: state.slip.selections.filter((s) => s.id !== id),
      },
    })),
  clearSlip: () => set({ slip: initialSlip }),
  setStake: (stake) =>
    set((state) => ({
      slip: { ...state.slip, stake },
    })),
  setBetType: (betType) =>
    set((state) => ({
      slip: { ...state.slip, betType },
    })),
  setSubmitting: (isSubmitting) => set({ isSubmitting }),
  addRecentBet: (bet) =>
    set((state) => ({
      recentBets: [bet, ...state.recentBets].slice(0, 50),
    })),
});
