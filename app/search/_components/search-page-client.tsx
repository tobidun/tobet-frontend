// app/search/_components/search-page-client.tsx
// Client component for the search page.

"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { MainLayout } from "@/features/layout/components/layouts";
import { EmptyContent } from "@/features/layout/components/utilities";
import {
    Container,
    Stack,
    Grid,
    Text,
    Separator,
    Input,
} from "@/components/ui";
import { MatchCard } from "@/features/sportsbook/components";
import {
    mockMatches,
    mockSports,
    mockLeagues,
    mockTeams,
} from "@/features/sportsbook/mock-data";
import type { Sport, League } from "@/features/sportsbook/types";

export function SearchPageClient() {
    const [query, setQuery] = useState("");

    const normalizedQuery = query.toLowerCase().trim();

    const filteredMatches = normalizedQuery
        ? mockMatches.filter(
            (m) =>
                m.homeTeam.name.toLowerCase().includes(normalizedQuery) ||
                m.awayTeam.name.toLowerCase().includes(normalizedQuery) ||
                (m.homeTeam.shortName || "").toLowerCase().includes(normalizedQuery) ||
                (m.awayTeam.shortName || "").toLowerCase().includes(normalizedQuery)
        )
        : [];

    const filteredSports: Sport[] = normalizedQuery
        ? mockSports.filter((s) => s.name.toLowerCase().includes(normalizedQuery))
        : [];

    const filteredLeagues: League[] = normalizedQuery
        ? mockLeagues.filter(
            (l) =>
                l.name.toLowerCase().includes(normalizedQuery) ||
                l.country.toLowerCase().includes(normalizedQuery)
        )
        : [];

    const filteredTeams = normalizedQuery
        ? Object.values(mockTeams).filter((t) =>
            t.name.toLowerCase().includes(normalizedQuery)
        )
        : [];

    const hasResults =
        filteredMatches.length > 0 ||
        filteredSports.length > 0 ||
        filteredLeagues.length > 0 ||
        filteredTeams.length > 0;

    return (
        <MainLayout>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-5xl mx-auto"
            >
                <Container padding="lg">
                    <Stack spacing={8}>
                        <div>
                            <Text variant="h1" className="text-3xl font-bold mb-2">
                                Search
                            </Text>
                            <Text variant="bodySmall" textColor="muted">
                                Find matches, teams, leagues, and sports
                            </Text>
                        </div>

                        <Input
                            type="search"
                            placeholder="Search events, teams, leagues..."
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            className="w-full"
                            aria-label="Search"
                        />

                        {normalizedQuery && !hasResults && (
                            <EmptyContent
                                title="No results found"
                                description={`We couldn't find anything matching "${query}". Try a different search term.`}
                            />
                        )}

                        {hasResults && (
                            <Stack spacing={8}>
                                {filteredSports.length > 0 && (
                                    <section>
                                        <Text variant="h3" className="text-lg font-semibold mb-3">
                                            Sports
                                        </Text>
                                        <Grid cols={{ sm: 2, md: 4, lg: 6 }} gap={4}>
                                            {filteredSports.map((sport) => (
                                                <motion.div
                                                    key={sport.id}
                                                    whileHover={{ scale: 1.03 }}
                                                    className="p-4 rounded-lg bg-background-card border border-border text-center cursor-pointer"
                                                >
                                                    <div className="text-3xl mb-2">{sport.icon}</div>
                                                    <Text variant="bodySmall" className="font-medium">
                                                        {sport.name}
                                                    </Text>
                                                </motion.div>
                                            ))}
                                        </Grid>
                                    </section>
                                )}

                                {filteredLeagues.length > 0 && (
                                    <section>
                                        <Text variant="h3" className="text-lg font-semibold mb-3">
                                            Leagues
                                        </Text>
                                        <Grid cols={{ sm: 1, md: 2, lg: 3 }} gap={4}>
                                            {filteredLeagues.map((league) => (
                                                <motion.div
                                                    key={league.id}
                                                    whileHover={{ scale: 1.02 }}
                                                    className="p-4 rounded-lg bg-background-card border border-border"
                                                >
                                                    <div className="flex items-center gap-3">
                                                        <span className="text-2xl">{league.logo}</span>
                                                        <div>
                                                            <Text variant="body" className="font-medium">
                                                                {league.name}
                                                            </Text>
                                                            <Text variant="caption" textColor="muted">
                                                                {league.country}
                                                            </Text>
                                                        </div>
                                                    </div>
                                                </motion.div>
                                            ))}
                                        </Grid>
                                    </section>
                                )}

                                {filteredTeams.length > 0 && (
                                    <section>
                                        <Text variant="h3" className="text-lg font-semibold mb-3">
                                            Teams
                                        </Text>
                                        <Grid cols={{ sm: 1, md: 2, lg: 3 }} gap={4}>
                                            {filteredTeams.map((team) => (
                                                <motion.div
                                                    key={team.id}
                                                    whileHover={{ scale: 1.02 }}
                                                    className="p-4 rounded-lg bg-background-card border border-border"
                                                >
                                                    <Text variant="body" className="font-medium">
                                                        {team.name}
                                                    </Text>
                                                    <Text variant="caption" textColor="muted">
                                                        {team.shortName}
                                                    </Text>
                                                </motion.div>
                                            ))}
                                        </Grid>
                                    </section>
                                )}

                                {filteredMatches.length > 0 && (
                                    <section>
                                        <Text variant="h3" className="text-lg font-semibold mb-3">
                                            Matches
                                        </Text>
                                        <Stack spacing={4}>
                                            {filteredMatches.map((match, i) => (
                                                <motion.div
                                                    key={match.id}
                                                    initial={{ opacity: 0, y: 10 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    transition={{ delay: i * 0.05 }}
                                                >
                                                    <MatchCard match={match} />
                                                </motion.div>
                                            ))}
                                        </Stack>
                                    </section>
                                )}
                            </Stack>
                        )}
                    </Stack>
                </Container>
            </motion.div>
        </MainLayout>
    );
}