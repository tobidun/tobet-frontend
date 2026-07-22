// services/odds-service.ts
// Odds-related service layer (feature-agnostic).

import { apiRequest } from "@/lib/api/client";
import type { ApiResponse } from "@/types/api";

export const oddsService = {
  getEventOdds: async (eventId: string) => {
    const res = await apiRequest<ApiResponse<any[]>>(
      `/events/${eventId}/odds`
    );
    return res.data;
  },
  getLiveOdds: async () => {
    const res = await apiRequest<ApiResponse<any[]>>("/events/live/odds");
    return res.data;
  },
};
