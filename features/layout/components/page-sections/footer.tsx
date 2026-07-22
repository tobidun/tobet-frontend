// features/layout/components/page-sections/footer.tsx
// Application footer with links and info.

"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils/cn";
import Link from "next/link";

interface FooterProps {
  className?: string;
}

const Footer = ({ className }: FooterProps) => {
  const currentYear = new Date().getFullYear();

  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className={cn("bg-background-card border-t border-border mt-auto", className)}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <div className="size-8 rounded-lg bg-primary text-foreground-inverse flex items-center justify-center">
                <span className="text-sm font-bold">P</span>
              </div>
              <span className="text-lg font-bold text-foreground">PREMIUM</span>
            </div>
            <p className="text-sm text-foreground-muted">
              The world's most trusted sportsbook platform. Bet responsibly.
            </p>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-4">Sports</h3>
            <ul className="flex flex-col gap-2">
              {["Football", "Basketball", "Tennis", "Hockey", "Baseball"].map((sport) => (
                <li key={sport}>
                  <Link href={`/sports/${sport.toLowerCase()}`} className="text-sm text-foreground-muted hover:text-foreground transition-colors">
                    {sport}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-4">Company</h3>
            <ul className="flex flex-col gap-2">
              {["About Us", "Careers", "Press", "Partners", "Affiliates"].map((item) => (
                <li key={item}>
                  <Link href={`/${item.toLowerCase().replace(' ', '-')}`} className="text-sm text-foreground-muted hover:text-foreground transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-4">Support</h3>
            <ul className="flex flex-col gap-2">
              {["Help Center", "Contact Us", "Responsible Gambling", "Terms of Service", "Privacy Policy"].map((item) => (
                <li key={item}>
                  <Link href={`/${item.toLowerCase().replace(' ', '-')}`} className="text-sm text-foreground-muted hover:text-foreground transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-foreground-muted">
            © {currentYear} Premium Sportsbook. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <span className="text-xs text-foreground-subtle">18+ only. Please gamble responsibly.</span>
          </div>
        </div>
      </div>
    </motion.footer>
  );
};

export { Footer };
export type { FooterProps };
