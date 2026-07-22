// features/layout/components/page-sections/promotions-section.tsx
// Promotions section.

"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils/cn";
import { PromotionBanner, PromotionCard } from "@/features/sportsbook/components/promotions";
import type { Promotion } from "@/features/sportsbook/types";

interface PromotionsSectionProps {
  promotions: Promotion[];
  onCtaClick?: (promotion: Promotion) => void;
  className?: string;
}

const PromotionsSection = ({ promotions, onCtaClick, className }: PromotionsSectionProps) => {
  const [featured, ...rest] = promotions;

  return (
    <section className={cn("py-12 bg-background-elevated/50", className)}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-8"
        >
          <h2 className="text-2xl font-bold text-foreground">Promotions</h2>
          <p className="text-sm text-foreground-muted mt-1">Exclusive offers and bonuses</p>
        </motion.div>
        <div className="flex flex-col gap-6">
          {featured && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <PromotionBanner
                promotion={featured}
                onCtaClick={() => onCtaClick?.(featured)}
              />
            </motion.div>
          )}
          {rest.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {rest.map((promo, i) => (
                <motion.div
                  key={promo.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <PromotionCard
                    promotion={promo}
                    onCtaClick={() => onCtaClick?.(promo)}
                  />
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export { PromotionsSection };
export type { PromotionsSectionProps };
