// app/match/[id]/page.tsx
// Match details page with scoreboard, timeline, statistics, markets, and bet slip.

import type { Metadata } from "next";
import { MatchPageClient } from "./_components/match-page-client";

export const metadata: Metadata = {
  title: "Match Details",
  description: "View match scoreboard, statistics, timeline, and live markets.",
};

export default function MatchDetailsPage() {
  return <MatchPageClient />;
}