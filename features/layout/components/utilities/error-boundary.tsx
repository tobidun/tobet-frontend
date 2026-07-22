// features/layout/components/utilities/error-boundary.tsx
// Error boundary for catching React errors.

"use client";

import { Component, type ReactNode } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils/cn";
import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
  className?: string;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundaryClass extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className={cn("flex flex-col items-center justify-center text-center py-16 px-4", this.props.className)}
        >
          <AlertTriangle className="size-16 text-error mb-4" />
          <h2 className="text-2xl font-bold text-foreground mb-2">Something went wrong</h2>
          <p className="text-sm text-foreground-muted max-w-md mb-6">
            We're sorry, but something unexpected happened. Please try refreshing the page.
          </p>
          <Button
            variant="primary"
            onClick={() => window.location.reload()}
          >
            Refresh Page
          </Button>
        </motion.div>
      );
    }

    return this.props.children;
  }
}

export const ErrorBoundary = ErrorBoundaryClass;
export type { ErrorBoundaryProps };
