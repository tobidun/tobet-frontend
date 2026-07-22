// app/bets/[id]/page.tsx
// Bet details: ticket number, odds, stake, potential win, status, cash out.

"use client";

import { useParams, useRouter } from "next/navigation";
import { BetsLayout, BetDetailsView } from "@/features/bets/components";
import { useBetStore } from "@/features/bets/store";
import { EmptyState } from "@/components/ui/feedback";

export default function BetDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  const bet = useBetStore((s) => s.bets.find((b) => b.id === id));

  return (
    <BetsLayout>
      {bet ? (
        <BetDetailsView bet={bet} onBack={() => router.push("/bets")} />
      ) : (
        <EmptyState
          title="Bet not found"
          description="This ticket may have expired or does not exist."
          action={{ label: "Back to My Bets", onClick: () => router.push("/bets") }}
        />
      )}
    </BetsLayout>
  );
}
