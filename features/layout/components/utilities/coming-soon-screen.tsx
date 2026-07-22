// features/layout/components/utilities/coming-soon-screen.tsx
// Coming soon page for upcoming features.

"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils/cn";
import { Clock } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface ComingSoonScreenProps {
  title: string;
  description?: string;
  launchDate?: string;
  className?: string;
}

const ComingSoonScreen = ({ title, description, launchDate, className }: ComingSoonScreenProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn("min-h-screen flex items-center justify-center bg-background p-4", className)}
    >
      <div className="max-w-md w-full text-center">
        <motion.div
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="mb-6 flex justify-center"
        >
          <div className="size-20 rounded-2xl bg-primary/10 flex items-center justify-center">
            <Clock className="size-10 text-primary" />
          </div>
        </motion.div>
        <h1 className="text-3xl font-bold text-foreground mb-4">{title}</h1>
        {description && (
          <p className="text-lg text-foreground-muted mb-6">{description}</p>
        )}
        {launchDate && (
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary/10 text-primary text-sm font-medium mb-8">
            <Clock className="size-4" />
            Launching: {new Date(launchDate).toLocaleDateString()}
          </div>
        )}
        <div className="flex flex-col gap-3">
          <Input
            type="email"
            placeholder="Enter your email for updates"
            className="w-full"
          />
          <Button variant="primary" size="lg" className="w-full">
            Notify Me
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export { ComingSoonScreen };
export type { ComingSoonScreenProps };
