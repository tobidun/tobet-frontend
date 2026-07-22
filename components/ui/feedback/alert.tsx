// components/ui/feedback/alert.tsx
// Alert component for notifications and status messages.

"use client";

import { forwardRef } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils/cn";
import { AlertCircle, CheckCircle2, Info, AlertTriangle, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { ButtonProps } from "@/components/ui/button";

const alertVariants = cva(
  "flex gap-3 rounded-lg border p-4 text-sm",
  {
    variants: {
      variant: {
        default: "bg-background-card border-border",
        info: "bg-info/5 border-info/20 text-info",
        success: "bg-success/5 border-success/20 text-success",
        warning: "bg-warning/5 border-warning/20 text-warning",
        error: "bg-error/5 border-error/20 text-error",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

const iconMap: Record<string, React.ElementType> = {
  default: Info,
  info: Info,
  success: CheckCircle2,
  warning: AlertTriangle,
  error: AlertCircle,
};

interface AlertProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof alertVariants> {
  title?: string;
  dismissible?: boolean;
  onDismiss?: () => void;
  action?: ButtonProps;
}

const Alert = forwardRef<HTMLDivElement, AlertProps>(
  ({ variant = "default", title, dismissible, onDismiss, action, className, children, ...props }, ref) => {
    const Icon = iconMap[variant || "default"];

    return (
      <div
        ref={ref}
        role="alert"
        className={cn(alertVariants({ variant }), className)}
        {...props}
      >
        <Icon className="size-5 shrink-0 mt-0.5" aria-hidden="true" />
        <div className="flex-1 min-w-0">
          {title && <h5 className="font-semibold mb-0.5">{title}</h5>}
          <div className={cn("text-sm opacity-90", !title && "mt-0.5")}>{children}</div>
          {action && (
            <div className="mt-3">
              <Button variant="ghost" size="sm" {...action}>
                {action.children}
              </Button>
            </div>
          )}
        </div>
        {dismissible && (
          <button
            type="button"
            onClick={onDismiss}
            aria-label="Dismiss"
            className="shrink-0 -mr-1 -mt-0.5 size-8 flex items-center justify-center rounded-md hover:bg-background-hover transition-colors text-foreground-muted hover:text-foreground"
          >
            <X className="size-4" />
          </button>
        )}
      </div>
    );
  }
);

Alert.displayName = "Alert";

export { Alert, alertVariants };
export type { AlertProps };
