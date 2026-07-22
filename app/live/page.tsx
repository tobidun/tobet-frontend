// app/live/page.tsx
// Live betting page with live matches, scoreboard, events, and markets.

import type { Metadata } from "next";
import { LivePageClient } from "./_components/live-page-client";

export const metadata: Metadata = {
  title: "Live Betting",
  description: "Bet on live matches with real-time odds and scoreboards.",
  alternates: { canonical: "/live" },
};

export default function LivePage() {
  return <LivePageClient />;
}