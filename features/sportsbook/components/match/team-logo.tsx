// features/sportsbook/components/match/team-logo.tsx
// Team logo with fallback to initials.

"use client";

import { cn } from "@/lib/utils/cn";

interface TeamLogoProps {
  name: string;
  shortName: string;
  logo?: string;
  color?: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const sizeClasses = {
  sm: "size-6 text-xs",
  md: "size-8 text-sm",
  lg: "size-10 text-base",
};

const TeamLogo = ({ name, shortName, logo, color, size = "md", className }: TeamLogoProps) => {
  const initials = shortName.slice(0, 2).toUpperCase();

  return (
    <div
      className={cn(
        "flex items-center justify-center rounded-full font-bold text-foreground-inverse shrink-0",
        sizeClasses[size],
        className
      )}
      style={{ backgroundColor: color || "#374151" }}
      title={name}
      aria-label={name}
    >
      {logo ? <img src={logo} alt={name} className="size-full object-cover rounded-full" /> : initials}
    </div>
  );
};

export { TeamLogo };
export type { TeamLogoProps };
