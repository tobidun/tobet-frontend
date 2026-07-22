// features/layout/components/utilities/loading-screen.tsx
// Full-page loading screen with animation.

"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils/cn";
import { Trophy } from "lucide-react";

interface LoadingScreenProps {
  message?: string;
  className?: string;
}

const LoadingScreen = ({ message = "Loading...", className }: LoadingScreenProps) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={cn("fixed inset-0 z-modal flex flex-col items-center justify-center bg-background", className)}
    >
      <motion.div
        animate={{
          scale: [1, 1.1, 1],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="flex items-center justify-center size-20 rounded-2xl bg-primary text-foreground-inverse mb-6"
      >
        <Trophy className="size-10" />
      </motion.div>
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-lg font-medium text-foreground"
      >
        {message}
      </motion.p>
    </motion.div>
  );
};

export { LoadingScreen };
export type { LoadingScreenProps };
