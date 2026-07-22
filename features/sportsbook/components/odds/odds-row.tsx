// features/sportsbook/components/odds/odds-row.tsx
// Horizontal row layout for odds.

"use client";

import { cn } from "@/lib/utils/cn";
import { OddsButton } from "./odds-button";
import type { Selection } from "@/features/sportsbook/types";

interface OddsRowProps {
  selections: Selection[];
  onOddsClick?: (selection: Selection) => void;
  className?: string;
}

const OddsRow = ({ selections, onOddsClick, className }: OddsRowProps) => {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      {selections.map((selection) => (
        <OddsButton
          key={selection.id}
          selection={selection}
          onClick={() => onOddsClick?.(selection)}
        />
      ))}
    </div>
  );
};

export { OddsRow };
export type { OddsRowProps };
