// services/bet-service.ts
// Bet-related service layer (feature-agnostic).

import { apiRequest } from "@/lib/api/client";
import type { ApiResponse, PaginatedResponse } from "@/types/api";
import type { PlacedBet } from "@/types/bets";

export const betService = {
  place: async (payload: { selections: any[]; stake: number; betType: string }) => {
    const res = await apiRequest<ApiResponse<PlacedBet>>("/bets", {
      method: "POST",
      body: payload,
    });
    return res.data;
  },
  history: async (params: { page?: number; status?: string }) => {
    const res = await apiRequest<ApiResponse<PaginatedResponse<PlacedBet>>>(
      "/bets/history",
      { body: params }
    );
    return res.data;
  },
  getById: async (id: string) => {
    const res = await apiRequest<ApiResponse<PlacedBet>>(`/bets/${id}`);
    return res.data;
  },
};
