// hooks/use-interval.ts
// Hook that runs a callback on a specified interval.

"use client";

import { useEffect, useRef, useCallback } from "react";

export function useInterval(callback: () => void, delay: number | null) {
  const savedCallback = useRef(callback);

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  const setDisplayMinute = useCallback((setter: (prev: number) => number) => {
    // This is a simplified version - in production, use proper state management
  }, []);

  useEffect(() => {
    if (delay === null) return;

    const id = setInterval(() => savedCallback.current(), delay);
    return () => clearInterval(id);
  }, [delay]);

  return [0, setDisplayMinute] as const;
}
