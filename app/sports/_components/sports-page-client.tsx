"use client";

// app/sports/_components/sports-page-client.tsx
// Client wrapper for the sports listing page.

import { motion } from "framer-motion";
import { MainLayout } from "@/features/layout/components/layouts";
import {
  Sidebar,
  SportsCategories,
  LeagueNav,
  FavoritesSection,
  RecentMatches,
} from "@/features/layout/components/sidebar";
import { EmptyContent } from "@/features/layout/components/utilities";
import {
  Surface,
  Grid,
  Stack,
  Text,
  Separator,
} from "@/components/ui";
import { MatchCard } from "@/features/sportsbook/components/match";
import { SportCategory } from "@/features/sportsbook/components/sports-navigation";
import type { Sport, Match } from "@/features/sportsbook/types";
import type { League, RecentMatch } from "@/features/layout/types";
import { useState } from "react";

interface SportsPageClientProps {
  sports: Sport[];
  matches: Match[];
  leagues: League[];
  recentMatches: RecentMatch[];
}

const SportsPageClient = ({
  sports,
  matches,
  leagues,
  recentMatches,
}: SportsPageClientProps) => {
  const [selectedSport, setSelectedSport] = useState<string | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const filteredMatches: Match[] = selectedSport
    ? matches.filter((m) => {
      const sport = sports.find((s) => s.id === m.sportId);
      return sport?.slug === selectedSport || sport?.id === selectedSport;
    })
    : matches;

  const selectedSportObj: Sport | undefined = selectedSport
    ? sports.find((s) => s.slug === selectedSport || s.id === selectedSport)
    : undefined;

  const allItems = sports.map((s) => ({
    id: s.id,
    label: s.name,
    href: `/sports/${s.slug}`,
    isActive: selectedSport === s.slug || selectedSport === s.id,
  }));

  return (
    <MainLayout
      sidebarOpen={sidebarOpen}
      onSidebarToggle={() => setSidebarOpen(!sidebarOpen)}
    >
      <div className="flex flex-col lg:flex-row gap-6">
        <Sidebar open={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)}>
          <SportsCategories
            categories={[
              {
                id: "all",
                name: "All Sports",
                icon: "🏆",
                items: allItems,
              },
            ]}
            activeSportId={selectedSport || undefined}
            collapsed={!sidebarOpen}
          />
          <Separator className="my-4" />
          <LeagueNav leagues={leagues} collapsed={!sidebarOpen} />
          <Separator className="my-4" />
          <FavoritesSection leagues={leagues} collapsed={!sidebarOpen} />
          <Separator className="my-4" />
          <RecentMatches
            matches={recentMatches}
            collapsed={!sidebarOpen}
          />
        </Sidebar>

        <div className="flex-1 min-w-0">
          <Stack spacing={6}>
            <div className="flex items-center justify-between">
              <div>
                <Text variant="h2" className="text-2xl font-bold">
                  {selectedSportObj?.name || "All Sports"}
                </Text>
                <Text variant="bodySmall" textColor="muted">
                  {filteredMatches.length} matches available
                </Text>
              </div>
            </div>

            <Surface variant="default" padding="md" rounded="lg">
              <SportCategory
                title="Popular Sports"
                sports={sports}
                activeSportId={selectedSport || undefined}
                onSportSelect={(sport) => {
                  setSelectedSport((prev) =>
                    prev === sport.slug ? null : sport.slug
                  );
                }}
              />
            </Surface>

            <Separator />

            <Stack spacing={8}>
              {filteredMatches.length === 0 ? (
                <EmptyContent
                  title="No matches found"
                  description="Try selecting a different sport or check back later for upcoming matches."
                  actionLabel="Clear Filters"
                  onAction={() => setSelectedSport(null)}
                />
              ) : (
                <Grid cols={{ sm: 1, md: 2, lg: 3 }} gap={6}>
                  {filteredMatches.map((match, i) => (
                    <motion.div
                      key={match.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.05 }}
                    >
                      <MatchCard match={match} />
                    </motion.div>
                  ))}
                </Grid>
              )}
            </Stack>
          </Stack>
        </div>
      </div>
    </MainLayout>
  );
};

export { SportsPageClient };
export type { SportsPageClientProps };
