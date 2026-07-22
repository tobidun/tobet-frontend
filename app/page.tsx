// app/page.tsx
// SUREBET247 Frontend Home Page

import type { Metadata } from "next";
import { HomePageClient } from "./page-client";

export const metadata: Metadata = {
  title: "SureBet247 - Sports Betting, Live Odds & Casino",
  description:
    "Experience top-tier live sports betting, competitive odds, casino games, Aviator, and instant payouts.",
  alternates: { canonical: "/" },
  openGraph: { title: "SureBet247 Sports Betting", url: "/" },
};

export default function HomePage() {
  return <HomePageClient />;
}
