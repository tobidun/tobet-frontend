// app/search/page.tsx
// Search page with input and results.

import type { Metadata } from "next";
import { SearchPageClient } from "./_components/search-page-client";

export const metadata: Metadata = {
  title: "Search",
  description: "Search for matches, teams, leagues, and sports.",
  robots: { index: false, follow: true },
};

export default function SearchPage() {
  return <SearchPageClient />;
}