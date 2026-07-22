// features/sportsbook/components/promotions/featured-promotion.tsx
// Featured promotion with larger layout and highlighted styling.

"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils/cn";
import { Button } from "@/components/ui/button";
import { Surface } from "@/components/ui/surface";
import type { Promotion } from "@/features/sportsbook/types";

interface FeaturedPromotionProps {
  promotion: Promotion;
  onCtaClick?: () => void;
  className?: string;
}

const FeaturedPromotion = ({ promotion, onCtaClick, className }: FeaturedPromotionProps) => {
  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ duration: 0.3 }}
    >
      <Surface variant="elevated" padding="lg" rounded="xl" shadow="xl" className={cn("relative overflow-hidden", className)}>
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full -mr-10 -mt-10" />
        <div className="relative z-10 flex flex-col gap-4">
          {promotion.badge && (
            <span className="inline-flex w-fit px-3 py-1 rounded-full bg-accent text-xs font-bold text-foreground-inverse">
              {promotion.badge}
            </span>
          )}
          <h3 className="text-2xl font-bold text-foreground">{promotion.title}</h3>
          <p className="text-sm text-foreground-muted max-w-lg">{promotion.description}</p>
          <div className="mt-2">
            <Button variant="primary" size="lg" onClick={onCtaClick}>
              {promotion.ctaText}
            </Button>
          </div>
        </div>
      </Surface>
    </motion.div>
  );
};

export { FeaturedPromotion };
export type { FeaturedPromotionProps };
