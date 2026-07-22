// app/live/_components/live-page-client.tsx
// Client component for the live betting page.

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
    Tabs,
    TabsList,
    TabsTrigger,
    TabsContent,
} from "@/components/ui";
import {
    LiveMatchCard,
    MatchStatistics,
    Timeline,
    MarketGroup,
} from "@/features/sportsbook/components";
import { mockMatches, mockMarkets } from "@/features/sportsbook/mock-data";
import type { Match } from "@/features/sportsbook/types";
import { useState } from "react";
import { useBetStore } from "@/features/bets/store";

export function LivePageClient() {
    const liveMatches = mockMatches.filter((m) => m.isLive);
    const [selectedMatch, setSelectedMatch] = useState<Match | null>(
        mockMatches[0] ?? null
    );
    const addSelection = useBetStore((s) => s.addSelection);

    const handleOddsClick = (marketId: string, selectionId: string) => {
        const market = selectedMatch?.markets?.find((m) => m.id === marketId);
        const selection = market?.selections.find((s) => s.id === selectionId);
        if (!selection || !market || !selectedMatch) return;
        addSelection({
            id: `${selectedMatch.id}-${selectionId}`,
            matchId: selectedMatch.id,
            marketId,
            selectionId,
            match: selectedMatch,
            market,
            selection,
        });
    };

    return (
        <MainLayout>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
            >
                <Container size="xl" padding="lg">
                    <Stack spacing={8}>
                        <div className="flex items-center justify-between">
                            <div>
                                <Text variant="h1" className="text-3xl font-bold">
                                    Live Betting
                                </Text>
                                <Text variant="bodySmall" textColor="muted">
                                    {liveMatches.length} live matches available
                                </Text>
                            </div>
                        </div>

                        {liveMatches.length === 0 ? (
                            <EmptyContent
                                title="No live matches"
                                description="There are no live matches at the moment. Check back later or browse upcoming events."
                                actionLabel="Browse Sports"
                                onAction={() => { }}
                            />
                        ) : (
                            <Grid cols={{ lg: 3 }} gap={6}>
                                <div className="lg:col-span-2 flex flex-col gap-6">
                                    <Stack spacing={6}>
                                        {liveMatches.map((match, i) => (
                                            <motion.div
                                                key={match.id}
                                                initial={{ opacity: 0, x: -20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: i * 0.1 }}
                                            >
                                                <LiveMatchCard
                                                    match={match}
                                                    onOddsClick={(matchedMatch, selectionId) => {
                                                        setSelectedMatch(matchedMatch);
                                                        handleOddsClick(
                                                            matchedMatch.markets?.[0]?.id ?? "",
                                                            selectionId
                                                        );
                                                    }}
                                                />
                                            </motion.div>
                                        ))}
                                    </Stack>

                                    {selectedMatch && (
                                        <Surface variant="default" padding="lg" rounded="xl">
                                            <Tabs defaultValue="markets">
                                                <TabsList>
                                                    <TabsTrigger value="markets">Markets</TabsTrigger>
                                                    <TabsTrigger value="events">Events</TabsTrigger>
                                                    <TabsTrigger value="stats">Stats</TabsTrigger>
                                                </TabsList>
                                                <TabsContent value="markets">
                                                    <Stack spacing={8} className="mt-4">
                                                        {(selectedMatch.markets ?? mockMarkets).map(
                                                            (market) => (
                                                                <MarketGroup
                                                                    key={market.id}
                                                                    market={market}
                                                                    onOddsClick={(_, selectionId) =>
                                                                        handleOddsClick(market.id, selectionId)
                                                                    }
                                                                />
                                                            )
                                                        )}
                                                    </Stack>
                                                </TabsContent>
                                                <TabsContent value="events">
                                                    <Timeline
                                                        events={[
                                                            {
                                                                id: "1",
                                                                minute: 23,
                                                                type: "goal",
                                                                team: "home",
                                                                player: "Player 1",
                                                            },
                                                            {
                                                                id: "2",
                                                                minute: 45,
                                                                type: "yellow_card",
                                                                team: "away",
                                                                player: "Player 3",
                                                            },
                                                            {
                                                                id: "3",
                                                                minute: 56,
                                                                type: "goal",
                                                                team: "away",
                                                                player: "Player 4",
                                                            },
                                                        ]}
                                                    />
                                                </TabsContent>
                                                <TabsContent value="stats">
                                                    <MatchStatistics
                                                        stats={[
                                                            { label: "Possession", homeValue: 55, awayValue: 45, unit: "%" },
                                                            { label: "Shots", homeValue: 10, awayValue: 7 },
                                                            { label: "Corners", homeValue: 4, awayValue: 2 },
                                                        ]}
                                                    />
                                                </TabsContent>
                                            </Tabs>
                                        </Surface>
                                    )}
                                </div>

                                <div className="lg:col-span-1">
                                    <div className="lg:sticky lg:top-20">
                                        <Surface variant="default" padding="lg" rounded="xl" className="text-sm text-foreground-muted">
                                            Tap any odds to add it to your bet slip.
                                        </Surface>
                                    </div>
                                </div>
                            </Grid>
                        )}
                    </Stack>
                </Container>
            </motion.div>
        </MainLayout>
    );
}