// features/layout/components/desktop-nav/logo.tsx
// Application logo with home link.

"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils/cn";
import Image from "next/image";
import Link from "next/link";

interface LogoProps {
  href?: string;
  className?: string;
  showText?: boolean;
}

const Logo = ({ href = "/", className, showText = true }: LogoProps) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={cn("flex items-center", className)}
    >
      <Link href={href} className="flex items-center">
        <Image
          src="/logo.png"
          alt="ToBet – Bet Smart. Win More."
          width={showText ? 120 : 40}
          height={showText ? 40 : 40}
          className={cn(
            "object-contain drop-shadow-md",
            showText ? "h-10 w-auto" : "h-10 w-10"
          )}
          priority
        />
      </Link>
    </motion.div>
  );
};

export { Logo };
export type { LogoProps };
