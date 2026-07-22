// components/ui/navigation/pagination.tsx
// Pagination with page numbers, prev/next, and ellipsis.

"use client";

import { forwardRef } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils/cn";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const paginationVariants = cva("flex items-center gap-1", {
  variants: {
    size: {
      sm: "text-xs",
      md: "text-sm",
      lg: "text-base",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

interface PaginationProps extends React.HTMLAttributes<HTMLElement>, VariantProps<typeof paginationVariants> {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  siblingCount?: number;
}

const Pagination = forwardRef<HTMLElement, PaginationProps>(
  ({ currentPage, totalPages, onPageChange, siblingCount = 1, size, className, ...props }, ref) => {
    const range = (start: number, end: number) => Array.from({ length: end - start + 1 }, (_, i) => start + i);

    const generatePages = () => {
      const totalNumbers = siblingCount * 2 + 3;
      const totalBlocks = totalNumbers + 2;

      if (totalPages <= totalBlocks) {
        return range(1, totalPages);
      }

      const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
      const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPages);
      const showLeftDots = leftSiblingIndex > 2;
      const showRightDots = rightSiblingIndex < totalPages - 1;

      if (!showLeftDots && showRightDots) {
        const leftRange = range(1, totalNumbers - 1);
        return [...leftRange, "...", totalPages];
      }

      if (showLeftDots && !showRightDots) {
        const rightRange = range(totalPages - (totalNumbers - 2), totalPages);
        return [1, "...", ...rightRange];
      }

      const middleRange = range(leftSiblingIndex, rightSiblingIndex);
      return [1, "...", ...middleRange, "...", totalPages];
    };

    const pages = generatePages();

    return (
      <nav ref={ref} aria-label="Pagination" className={cn(paginationVariants({ size }), className)} {...props}>
        <Button
          variant="ghost"
          size="xs"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          aria-label="Previous page"
          className="px-2"
        >
          <ChevronLeft className="size-4" />
        </Button>
        {pages.map((page, i) => (
          <Button
            key={i}
            variant={page === currentPage ? "primary" : "ghost"}
            size="xs"
            onClick={() => typeof page === "number" && onPageChange(page)}
            disabled={page === "..."}
            aria-current={page === currentPage ? "page" : undefined}
            aria-label={typeof page === "number" ? `Page ${page}` : undefined}
            className="min-w-8"
          >
            {page}
          </Button>
        ))}
        <Button
          variant="ghost"
          size="xs"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          aria-label="Next page"
          className="px-2"
        >
          <ChevronRight className="size-4" />
        </Button>
      </nav>
    );
  }
);

Pagination.displayName = "Pagination";

export { Pagination, paginationVariants };
export type { PaginationProps };
