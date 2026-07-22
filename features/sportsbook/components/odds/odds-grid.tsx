// features/sportsbook/components/odds/odds-grid.tsx
// Grid layout for odds buttons.

"use client";

import { cn } from "@/lib/utils/cn";
import { OddsButton } from "./odds-button";
import type { Selection } from "@/features/sportsbook/types";

interface OddsGridProps {
  selections: Selection[];
  onOddsClick?: (selection: Selection) => void;
  className?: string;
}

const OddsGrid = ({ selections, onOddsClick, className }: OddsGridProps) => {
  return (
    <div className={cn("grid grid-cols-3 gap-2", className)}>
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

export { OddsGrid };
export type { OddsGridProps };
