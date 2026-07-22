// components/ui/data-display/table.tsx
// Accessible table with header, body, row, and cell variants.

"use client";

import { forwardRef } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils/cn";

const tableVariants = cva("w-full caption-bottom text-sm", {
  variants: {
    variant: {
      default: "border border-border rounded-lg overflow-hidden",
      minimal: "border-none",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

const headerCellVariants = cva("px-4 py-3 font-semibold text-foreground", {
  variants: {
    textAlign: {
      left: "text-left",
      center: "text-center",
      right: "text-right",
    },
  },
  defaultVariants: {
    textAlign: "left",
  },
});

const cellVariants = cva("px-4 py-3 text-foreground-muted", {
  variants: {
    textAlign: {
      left: "text-left",
      center: "text-center",
      right: "text-right",
    },
  },
  defaultVariants: {
    textAlign: "left",
  },
});

interface TableProps extends React.HTMLAttributes<HTMLTableElement>, VariantProps<typeof tableVariants> {
  children: React.ReactNode;
}

const Table = forwardRef<HTMLTableElement, TableProps>(({ variant, className, children, ...props }, ref) => {
  return (
    <div className="w-full overflow-auto">
      <table ref={ref} className={cn(tableVariants({ variant }), className)} {...props}>
        {children}
      </table>
    </div>
  );
});

Table.displayName = "Table";

interface TableHeaderProps extends React.HTMLAttributes<HTMLTableSectionElement> {
  children: React.ReactNode;
}

const TableHeader = forwardRef<HTMLTableSectionElement, TableHeaderProps>(({ className, children, ...props }, ref) => {
  return (
    <thead ref={ref} className={cn("bg-background-elevated", className)} {...props}>
      {children}
    </thead>
  );
});

TableHeader.displayName = "TableHeader";

interface TableBodyProps extends React.HTMLAttributes<HTMLTableSectionElement> {
  children: React.ReactNode;
  empty?: React.ReactNode;
}

const TableBody = forwardRef<HTMLTableSectionElement, TableBodyProps>(({ className, children, empty, ...props }, ref) => {
  return (
    <tbody ref={ref} className={cn("divide-y divide-border", className)} {...props}>
      {children}
    </tbody>
  );
});

TableBody.displayName = "TableBody";

interface TableRowProps extends React.HTMLAttributes<HTMLTableRowElement> {
  children: React.ReactNode;
  selected?: boolean;
}

const TableRow = forwardRef<HTMLTableRowElement, TableRowProps>(({ selected, className, children, ...props }, ref) => {
  return (
    <tr
      ref={ref}
      className={cn(
        "transition-colors duration-150",
        selected ? "bg-primary-subtle" : "hover:bg-background-hover",
        className
      )}
      {...props}
    >
      {children}
    </tr>
  );
});

TableRow.displayName = "TableRow";

interface TableHeadProps extends Omit<React.ThHTMLAttributes<HTMLTableCellElement>, "align">, VariantProps<typeof headerCellVariants> {
  children: React.ReactNode;
}

const TableHead = forwardRef<HTMLTableCellElement, TableHeadProps>(({ textAlign, className, children, ...props }, ref) => {
  return (
    <th ref={ref} scope="col" className={cn(headerCellVariants({ textAlign }), className)} {...props}>
      {children}
    </th>
  );
});

TableHead.displayName = "TableHead";

interface TableCellProps extends Omit<React.TdHTMLAttributes<HTMLTableCellElement>, "align">, VariantProps<typeof cellVariants> {
  children: React.ReactNode;
}

const TableCell = forwardRef<HTMLTableCellElement, TableCellProps>(({ textAlign, className, children, ...props }, ref) => {
  return (
    <td ref={ref} className={cn(cellVariants({ textAlign }), className)} {...props}>
      {children}
    </td>
  );
});

TableCell.displayName = "TableCell";

export { Table, TableHeader, TableBody, TableRow, TableHead, TableCell, tableVariants, headerCellVariants, cellVariants };
export type { TableProps, TableHeaderProps, TableBodyProps, TableRowProps, TableHeadProps, TableCellProps };
