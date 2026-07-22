// features/sportsbook/components/match/match-timer.tsx
// Live match timer showing current minute.

"use client";

import { useInterval } from "@/hooks/use-interval";
import { cn } from "@/lib/utils/cn";

interface MatchTimerProps {
  minute: number;
  isLive?: boolean;
  className?: string;
}

const MatchTimer = ({ minute, isLive, className }: MatchTimerProps) => {
  const [displayMinute, setDisplayMinute] = useInterval(
    () => {
      setDisplayMinute((prev) => (prev >= 90 ? prev : prev + 1));
    },
    isLive ? 60000 : null
  );

  return (
    <span className={cn("text-xs font-mono", isLive && "text-success", className)}>
      {displayMinute}'
    </span>
  );
};

export { MatchTimer };
export type { MatchTimerProps };
