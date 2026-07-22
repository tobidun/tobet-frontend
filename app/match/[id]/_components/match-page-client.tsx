// app/match/[id]/_components/match-page-client.tsx
// Client component for the match details page.

"use client";

import { motion } from "framer-motion";
import { useParams } from "next/navigation";
import { MainLayout } from "@/features/layout/components/layouts";
import {
    Surface,
    Stack,
    Grid,
    Text,
    Separator,
    Button,
    Tabs,
    TabsList,
    TabsTrigger,
    TabsContent,
} from "@/components/ui";
import {
    MatchHeader,
    TeamBadge,
    LiveScoreboard,
    Scoreboard,
    MatchStatistics,
    Timeline,
    MarketGroup,
} from "@/features/sportsbook/components";
import { createMockMatch } from "@/features/sportsbook/mock-data";
import type { Match } from "@/features/sportsbook/types";
import { useBetStore } from "@/features/bets/store";

export function MatchPageClient() {
    const params = useParams();
    const matchId = params.id as string;

    const match: Match = createMockMatch({
        id: matchId,
        status: "live",
        liveMinute: 67,
        score: { home: 2, away: 1 },
        isLive: true,
    });

    const addSelection = useBetStore((s) => s.addSelection);

    const handleOddsClick = (marketId: string, selectionId: string) => {
        const market = match.markets?.find((m) => m.id === marketId);
        const selection = market?.selections.find((s) => s.id === selectionId);
        if (!selection || !market) return;
        addSelection({
            id: `${matchId}-${selectionId}`,
            matchId,
            marketId,
            selectionId,
            match,
            market,
            selection,
        });
    };
    return (
        <MainLayout>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-7xl mx-auto"
            >
                <Stack spacing={8}>
                    <MatchHeader match={match} />

                    <Surface variant="default" padding="lg" rounded="xl">
                        <div className="flex flex-col gap-6">
                            <div className="flex items-center justify-between gap-4">
                                <TeamBadge
                                    name={match.homeTeam.name}
                                    shortName={match.homeTeam.shortName}
                                    logo={match.homeTeam.logo}
                                    color={match.homeTeam.color}
                                    size="lg"
                                />
                                <div className="flex flex-col items-center gap-2">
                                    {match.isLive ? (
                                        <LiveScoreboard match={match} />
                                    ) : (
                                        <Scoreboard match={match} />
                                    )}
                                </div>
                                <TeamBadge
                                    name={match.awayTeam.name}
                                    shortName={match.awayTeam.shortName}
                                    logo={match.awayTeam.logo}
                                    color={match.awayTeam.color}
                                    size="lg"
                                    align="right"
                                />
                            </div>
                        </div>
                    </Surface>

                    <Grid cols={{ lg: 3 }} gap={6}>
                        <div className="lg:col-span-2 flex flex-col gap-6">
                            <Surface variant="default" padding="lg" rounded="xl">
                                <Tabs defaultValue="markets">
                                    <TabsList>
                                        <TabsTrigger value="markets">Markets</TabsTrigger>
                                        <TabsTrigger value="stats">Statistics</TabsTrigger>
                                        <TabsTrigger value="timeline">Timeline</TabsTrigger>
                                    </TabsList>
                                    <TabsContent value="markets">
                                        <Stack spacing={8} className="mt-4">
                                            {match.markets?.map((market) => (
                                                <MarketGroup
                                                    key={market.id}
                                                    market={market}
                                                    onOddsClick={(_, selectionId) =>
                                                        handleOddsClick(market.id, selectionId)
                                                    }
                                                />
                                            ))}
                                        </Stack>
                                    </TabsContent>
                                    <TabsContent value="stats">
                                        <MatchStatistics
                                            stats={[
                                                { label: "Possession", homeValue: 58, awayValue: 42, unit: "%" },
                                                { label: "Shots", homeValue: 12, awayValue: 8 },
                                                { label: "Corners", homeValue: 5, awayValue: 3 },
                                                { label: "Fouls", homeValue: 10, awayValue: 14 },
                                            ]}
                                        />
                                    </TabsContent>
                                    <TabsContent value="timeline">
                                        <Timeline
                                            events={[
                                                {
                                                    id: "1",
                                                    minute: 23,
                                                    type: "goal",
                                                    team: "home",
                                                    player: "Player 1",
                                                    assistPlayer: "Player 2",
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
                                                {
                                                    id: "4",
                                                    minute: 67,
                                                    type: "goal",
                                                    team: "home",
                                                    player: "Player 1",
                                                },
                                            ]}
                                        />
                                    </TabsContent>
                                </Tabs>
                            </Surface>

                            <Surface variant="default" padding="lg" rounded="xl">
                                <Stack spacing={4}>
                                    <div className="flex items-center justify-between">
                                        <Text variant="h3" className="text-lg font-semibold">
                                            Related Matches
                                        </Text>
                                        <Button variant="ghost" size="sm">
                                            View All
                                        </Button>
                                    </div>
                                    <Separator />
                                    <Text variant="bodySmall" textColor="muted">
                                        Other matches in the same competition appear here.
                                    </Text>
                                </Stack>
                            </Surface>
                        </div>

                        <div className="lg:col-span-1">
                            <div className="lg:sticky lg:top-20">
                                <Surface variant="default" padding="lg" rounded="xl" className="text-sm text-foreground-muted">
                                    Tap any odds to add it to your bet slip.
                                </Surface>
                            </div>
                        </div>
                    </Grid>
                </Stack>
            </motion.div>
        </MainLayout>
    );
}