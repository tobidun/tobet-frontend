// features/sportsbook/components/promotions/promotion-card.tsx
// Card-style promotion display.

"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils/cn";
import { Button } from "@/components/ui/button";
import type { Promotion } from "@/features/sportsbook/types";

interface PromotionCardProps {
  promotion: Promotion;
  onCtaClick?: () => void;
  className?: string;
}

const PromotionCard = ({ promotion, onCtaClick, className }: PromotionCardProps) => {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
    >
      <div className={cn("flex flex-col gap-3 p-5 rounded-xl bg-background-card border border-border hover:border-primary/50 transition-colors", className)}>
        {promotion.badge && (
          <span className="inline-flex w-fit px-2 py-0.5 rounded-full bg-accent/10 text-xs font-bold text-accent">
            {promotion.badge}
          </span>
        )}
        <h3 className="text-base font-semibold text-foreground">{promotion.title}</h3>
        <p className="text-sm text-foreground-muted line-clamp-2">{promotion.description}</p>
        <div className="mt-auto pt-2">
          <Button variant="secondary" size="sm" onClick={onCtaClick} className="w-full">
            {promotion.ctaText}
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export { PromotionCard };
export type { PromotionCardProps };
