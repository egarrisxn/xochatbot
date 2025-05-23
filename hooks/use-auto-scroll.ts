import { useEffect, useRef, useState } from "react";
import { AUTO_SCROLL_ACTIVATE } from "@/lib/constants";

export function useAutoScroll(dependencies: React.DependencyList) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const previousScrollTop = useRef<number | null>(null);
  const [shouldAutoScroll, setShouldAutoScroll] = useState(true);

  const scrollToBottom = () => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  };

  const handleScroll = () => {
    if (containerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = containerRef.current;

      const isScrollingUp = previousScrollTop.current
        ? scrollTop < previousScrollTop.current
        : false;

      if (isScrollingUp) {
        setShouldAutoScroll(false);
      } else {
        const isScrolledToBottom =
          Math.abs(scrollHeight - scrollTop - clientHeight) < AUTO_SCROLL_ACTIVATE;
        setShouldAutoScroll(isScrolledToBottom);
      }

      previousScrollTop.current = scrollTop;
    }
  };

  const handleTouchStart = () => {
    setShouldAutoScroll(false);
  };

  useEffect(() => {
    if (containerRef.current) {
      previousScrollTop.current = containerRef.current.scrollTop;
    }
  }, []);

  useEffect(() => {
    if (shouldAutoScroll) {
      scrollToBottom();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies);

  return {
    containerRef,
    scrollToBottom,
    handleScroll,
    shouldAutoScroll,
    handleTouchStart,
  };
}
