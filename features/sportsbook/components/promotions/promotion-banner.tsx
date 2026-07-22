// features/sportsbook/components/promotions/promotion-banner.tsx
// Full-width promotion banner with CTA.

"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils/cn";
import { Button } from "@/components/ui/button";
import type { Promotion } from "@/features/sportsbook/types";

interface PromotionBannerProps {
  promotion: Promotion;
  onCtaClick?: () => void;
  className?: string;
}

const PromotionBanner = ({ promotion, onCtaClick, className }: PromotionBannerProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn("relative overflow-hidden rounded-xl bg-gradient-to-r from-primary/20 to-accent/20 border border-primary/30 p-6", className)}
    >
      <div className="relative z-10 flex flex-col gap-3">
        {promotion.badge && (
          <span className="inline-flex w-fit px-2 py-0.5 rounded-full bg-accent text-xs font-bold text-foreground-inverse">
            {promotion.badge}
          </span>
        )}
        <h3 className="text-xl font-bold text-foreground">{promotion.title}</h3>
        <p className="text-sm text-foreground-muted max-w-md">{promotion.description}</p>
        <div className="mt-2">
          <Button variant="primary" size="sm" onClick={onCtaClick}>
            {promotion.ctaText}
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export { PromotionBanner };
export type { PromotionBannerProps };
