import { useEffect, useRef, useState, useCallback, useMemo } from "react";
import { AUTO_SCROLL_ACTIVATE } from "@/lib/constants";

export function useAutoScroll(dependencies: React.DependencyList) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const previousScrollTop = useRef<number | null>(null);
  const [shouldAutoScroll, setShouldAutoScroll] = useState(true);

  const scrollToBottom = useCallback(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, []);

  const handleScroll = useCallback(() => {
    if (containerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = containerRef.current;

      const isScrollingUp = previousScrollTop.current
        ? scrollTop < previousScrollTop.current
        : false;

      if (isScrollingUp) {
        setShouldAutoScroll(false);
      } else {
        const isScrolledToBottom =
          Math.abs(scrollHeight - scrollTop - clientHeight) <
          AUTO_SCROLL_ACTIVATE;
        setShouldAutoScroll(isScrolledToBottom);
      }

      previousScrollTop.current = scrollTop;
    }
  }, []);

  const handleTouchStart = useCallback(() => {
    setShouldAutoScroll(false);
  }, []);

  useEffect(() => {
    if (containerRef.current) {
      previousScrollTop.current = containerRef.current.scrollTop;
    }
  }, []);

  const depsKey = useMemo(() => {
    try {
      return JSON.stringify(dependencies);
    } catch {
      return String(dependencies);
    }
  }, [dependencies]);

  useEffect(() => {
    if (shouldAutoScroll) {
      scrollToBottom();
    }
    // include stable callbacks and local state so ESLint/react-hooks can verify deps
  }, [depsKey, shouldAutoScroll, scrollToBottom]);

  return {
    containerRef,
    scrollToBottom,
    handleScroll,
    shouldAutoScroll,
    handleTouchStart,
  };
}
