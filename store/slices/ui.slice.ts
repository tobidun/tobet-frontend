// store/slices/ui.slice.ts
// Zustand slice for UI state (theme, modals, sidebar).

import { StateCreator } from 'zustand';

export type Theme = 'light' | 'dark' | 'system';

export interface UISlice {
  theme: Theme;
  sidebarOpen: boolean;
  activeModal: string | null;
  setTheme: (theme: Theme) => void;
  toggleSidebar: () => void;
  setSidebarOpen: (open: boolean) => void;
  openModal: (name: string) => void;
  closeModal: () => void;
}

export const createUISlice: StateCreator<UISlice> = (set) => ({
  theme: 'system',
  sidebarOpen: false,
  activeModal: null,
  setTheme: (theme) => set({ theme }),
  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
  setSidebarOpen: (sidebarOpen) => set({ sidebarOpen }),
  openModal: (activeModal) => set({ activeModal }),
  closeModal: () => set({ activeModal: null }),
});
