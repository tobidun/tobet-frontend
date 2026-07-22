// app/sports/page.tsx
// Sports listing page with sidebar, filters, and matches.

import type { Metadata } from "next";
import { SportsPageClient } from "./_components/sports-page-client";
import {
  mockSports,
  mockMatches,
} from "@/features/sportsbook/mock-data";
import {
  mockLeagues,
  mockRecentMatches,
} from "@/features/layout/mock-data";

export const metadata: Metadata = {
  title: "Sports",
  description: "Browse all sports, leagues, and upcoming matches.",
  alternates: { canonical: "/sports" },
};

export default function SportsPage() {
  return (
    <SportsPageClient
      sports={mockSports}
      matches={mockMatches}
      leagues={mockLeagues}
      recentMatches={mockRecentMatches}
    />
  );
}
