// hooks/use-click-outside.ts
// Click-outside detection hook.

'use client';

import { useEffect, useRef } from 'react';

export function useClickOutside(
  callback: () => void,
  ...refs: React.RefObject<HTMLElement | null>[]
) {
  const savedCallback = useRef(callback);

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    const handler = (event: MouseEvent | TouchEvent) => {
      const target = event.target as Node;
      const clickedInside = refs.some((ref) => ref.current?.contains(target));
      if (!clickedInside) savedCallback.current();
    };

    document.addEventListener('mousedown', handler);
    document.addEventListener('touchstart', handler);
    return () => {
      document.removeEventListener('mousedown', handler);
      document.removeEventListener('touchstart', handler);
    };
  }, [refs]);
}
