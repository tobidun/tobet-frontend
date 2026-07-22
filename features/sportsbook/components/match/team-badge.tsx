// features/sportsbook/components/match/team-badge.tsx
// Team badge combining logo and name.

"use client";

import { cn } from "@/lib/utils/cn";
import { TeamLogo } from "./team-logo";

interface TeamBadgeProps {
  name: string;
  shortName: string;
  logo?: string;
  color?: string;
  showLogo?: boolean;
  size?: "sm" | "md" | "lg";
  align?: "left" | "center" | "right";
  className?: string;
}

const TeamBadge = ({ name, shortName, logo, color, showLogo = true, size = "md", align = "left", className }: TeamBadgeProps) => {
  return (
    <div className={cn("flex items-center gap-2.5", align === "center" && "justify-center", align === "right" && "flex-row-reverse", className)}>
      {showLogo && <TeamLogo name={name} shortName={shortName} logo={logo} color={color} size={size} />}
      <div className="flex flex-col gap-0.5 min-w-0">
        <span className="text-sm font-semibold text-foreground truncate">{name}</span>
        <span className="text-xs text-foreground-muted">{shortName}</span>
      </div>
    </div>
  );
};

export { TeamBadge };
export type { TeamBadgeProps };
