"use client";

import { useEffect, useRef } from "react";

export function useReveal() {
  const observedElements = useRef<Set<Element>>(new Set());

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    const scanAndObserve = () => {
      const elements = document.querySelectorAll(".rv, .wipe, .swipe, .si");
      elements.forEach((el) => {
        if (!observedElements.current.has(el)) {
          observer.observe(el);
          observedElements.current.add(el);
        }
      });
    };

    let scanScheduled = false;
    const throttledScan = () => {
      if (scanScheduled) return;
      scanScheduled = true;
      requestAnimationFrame(() => {
        scanAndObserve();
        scanScheduled = false;
      });
    };

    // Initial scan
    scanAndObserve();

    // Watch for new elements being added to the DOM with throttled scans
    const mutationObserver = new MutationObserver(throttledScan);

    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => {
      observer.disconnect();
      mutationObserver.disconnect();
      observedElements.current.clear();
    };
  }, []);
}
