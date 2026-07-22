// app/results/page.tsx
// Results page with completed matches and statistics.

import type { Metadata } from "next";
import { ResultsPageClient } from "./_components/results-page-client";

export const metadata: Metadata = {
  title: "Results",
  description: "View completed match results and statistics.",
  alternates: { canonical: "/results" },
};

export default function ResultsPage() {
  return <ResultsPageClient />;
}