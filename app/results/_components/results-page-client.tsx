// app/results/_components/results-page-client.tsx
// Client component for the results page.

"use client";

import { motion } from "framer-motion";
import { MainLayout } from "@/features/layout/components/layouts";
import { EmptyContent } from "@/features/layout/components/utilities";
import {
    Surface,
    Container,
    Stack,
    Grid,
    Text,
    Separator,
    Button,
} from "@/components/ui";
import { Scoreboard } from "@/features/sportsbook/components";
import { mockMatches, mockLeagues } from "@/features/sportsbook/mock-data";
import { useState } from "react";

export function ResultsPageClient() {
    const [filter, setFilter] = useState<string>("all");

    const finishedMatches = mockMatches.filter((m) => m.status === "finished");
    const filteredMatches =
        filter === "all"
            ? finishedMatches
            : finishedMatches.filter((m) => m.sportId === filter);

    const uniqueSports = Array.from(
        new Set(finishedMatches.map((m) => m.sportId))
    );

    const sportLabel = (sportId: string) =>
        mockLeagues.find((l) => l.sportId === sportId)?.name?.split(" ")[0] ??
        sportId;

    return (
        <MainLayout>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-7xl mx-auto"
            >
                <Container padding="lg">
                    <Stack spacing={8}>
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                            <div>
                                <Text variant="h1" className="text-3xl font-bold">
                                    Results
                                </Text>
                                <Text variant="bodySmall" textColor="muted">
                                    {finishedMatches.length} completed matches
                                </Text>
                            </div>
                            <div className="flex items-center gap-2 flex-wrap">
                                <Button
                                    variant={filter === "all" ? "primary" : "secondary"}
                                    size="sm"
                                    onClick={() => setFilter("all")}
                                >
                                    All
                                </Button>
                                {uniqueSports.map((sportId) => (
                                    <Button
                                        key={sportId}
                                        variant={filter === sportId ? "primary" : "secondary"}
                                        size="sm"
                                        onClick={() => setFilter(sportId)}
                                    >
                                        {sportLabel(sportId)}
                                    </Button>
                                ))}
                            </div>
                        </div>

                        <Separator />

                        {filteredMatches.length === 0 ? (
                            <EmptyContent
                                title="No results found"
                                description="There are no completed matches matching your filter."
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
                                        <Surface variant="default" padding="md" rounded="lg">
                                            <Stack spacing={2}>
                                                <div className="flex items-center justify-between">
                                                    <Text variant="caption" textColor="muted">
                                                        {new Date(match.startTime).toLocaleDateString()}
                                                    </Text>
                                                    <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-foreground-subtle/10 text-foreground-subtle">
                                                        FT
                                                    </span>
                                                </div>
                                                <Scoreboard match={match} />
                                                <Separator />
                                                <div className="flex items-center justify-between text-sm">
                                                    <Text variant="bodySmall" textColor="muted">
                                                        {mockLeagues.find((l) => l.id === match.leagueId)
                                                            ?.name || "League"}
                                                    </Text>
                                                </div>
                                            </Stack>
                                        </Surface>
                                    </motion.div>
                                ))}
                            </Grid>
                        )}
                    </Stack>
                </Container>
            </motion.div>
        </MainLayout>
    );
}