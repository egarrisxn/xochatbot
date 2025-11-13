import { useLayoutEffect, useRef, useMemo } from "react";
import type { UseAutosizeTextAreaProps } from "@/types";

export function useAutosizeTextArea({
  ref,
  maxHeight = Number.MAX_SAFE_INTEGER,
  borderWidth = 0,
  dependencies,
}: UseAutosizeTextAreaProps) {
  const originalHeight = useRef<number | null>(null);

  const depsKey = useMemo(() => {
    const deps = dependencies ?? [];
    try {
      return JSON.stringify(deps);
    } catch {
      return String(deps);
    }
  }, [dependencies]);

  useLayoutEffect(() => {
    if (!ref.current) return;

    const currentRef = ref.current;
    const borderAdjustment = borderWidth * 2;

    if (originalHeight.current === null) {
      originalHeight.current = currentRef.scrollHeight - borderAdjustment;
    }

    currentRef.style.removeProperty("height");
    const scrollHeight = currentRef.scrollHeight;

    // Make sure we don't go over maxHeight
    const clampedToMax = Math.min(scrollHeight, maxHeight);
    // Make sure we don't go less than the original height
    const clampedToMin = Math.max(clampedToMax, originalHeight.current);

    currentRef.style.height = `${clampedToMin + borderAdjustment}px`;
  }, [maxHeight, borderWidth, depsKey, ref]);
}
