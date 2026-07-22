// services/event-service.ts
// Event-related service layer (feature-agnostic).

import { apiRequest } from "@/lib/api/client";
import type { ApiResponse, PaginatedResponse } from "@/types/api";
import type { Event } from "@/types/sports";

export const eventService = {
  list: async (params: { sportId?: string; leagueId?: string; page?: number }) => {
    const res = await apiRequest<ApiResponse<PaginatedResponse<Event>>>(
      "/events",
      { body: params }
    );
    return res.data;
  },
  getById: async (id: string) => {
    const res = await apiRequest<ApiResponse<Event>>(`/events/${id}`);
    return res.data;
  },
  search: async (query: string) => {
    const res = await apiRequest<ApiResponse<Event[]>>("/events/search", {
      body: { q: query },
    });
    return res.data;
  },
};
