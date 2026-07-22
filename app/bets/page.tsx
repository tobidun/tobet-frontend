// app/bets/page.tsx
// My Bets: open, settled, won, lost, cancelled with filters and search.

"use client";

import { useMemo } from "react";
import { useRouter } from "next/navigation";
import { BetsLayout, MyBetsList } from "@/features/bets/components";
import { useBetStore } from "@/features/bets/store";
import { StatCard } from "@/components/ui/data-display";

export default function MyBetsPage() {
  const router = useRouter();
  const bets = useBetStore((s) => s.bets);

  const counts = useMemo(() => {
    const open = bets.filter(
      (b) => b.status === "open" || b.status === "partially_cashed_out"
    ).length;
    const settled = bets.filter((b) =>
      ["won", "lost", "void", "cancelled", "cashed_out"].includes(b.status)
    ).length;
    const won = bets.filter((b) => b.status === "won").length;
    const lost = bets.filter((b) => b.status === "lost").length;
    const cancelled = bets.filter(
      (b) => b.status === "cancelled" || b.status === "void"
    ).length;
    return { open, settled, won, lost, cancelled };
  }, [bets]);

  return (
    <BetsLayout>
      <div className="flex flex-col gap-6">
        <h2 className="text-lg font-semibold text-foreground">My Bets</h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          <StatCard label="Open" value={counts.open} />
          <StatCard label="Settled" value={counts.settled} />
          <StatCard label="Won" value={counts.won} />
          <StatCard label="Lost" value={counts.lost} />
          <StatCard label="Cancelled" value={counts.cancelled} />
        </div>

        <MyBetsList bets={bets} onOpen={(id) => router.push(`/bets/${id}`)} />
      </div>
    </BetsLayout>
  );
}
