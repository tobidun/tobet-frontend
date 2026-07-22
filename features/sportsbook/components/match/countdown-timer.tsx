// features/sportsbook/components/match/countdown-timer.tsx
// Countdown timer to match start.

"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils/cn";

interface CountdownTimerProps {
  startTime: string;
  className?: string;
}

const CountdownTimer = ({ startTime, className }: CountdownTimerProps) => {
  const [timeLeft, setTimeLeft] = useState(() => {
    const diff = new Date(startTime).getTime() - Date.now();
    return Math.max(0, diff);
  });

  useEffect(() => {
    if (timeLeft <= 0) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => Math.max(0, prev - 1000));
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const hours = Math.floor(timeLeft / (1000 * 60 * 60));
  const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

  if (timeLeft <= 0) {
    return <span className={cn("text-xs text-foreground-muted", className)}>Starting soon</span>;
  }

  return (
    <motion.span
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={cn("text-xs font-mono text-foreground-muted", className)}
    >
      {hours > 0 && `${hours}h `}
      {minutes.toString().padStart(2, "0")}:{seconds.toString().padStart(2, "0")}
    </motion.span>
  );
};

export { CountdownTimer };
export type { CountdownTimerProps };
