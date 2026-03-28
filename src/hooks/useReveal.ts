"use client";

import { useEffect, useRef } from "react";

export function useReveal() {
  const observedElements = useRef<Set<Element>>(new Set());

  useEffect(() => {
    // Dynamically load reveal styles to keep them out of critical path
    import("@/styles/Reveals.module.css");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            observer.unobserve(entry.target);
          }
        });
      },
      { 
        threshold: 0.02,
        rootMargin: "0px 0px -50px 0px" 
      }
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

    // Initial scan — defer to after first paint
    requestAnimationFrame(scanAndObserve);

    // Re-scan after a few intervals to catch elements that load late (e.g. Hero scene)
    const t1 = setTimeout(scanAndObserve, 100);
    const t2 = setTimeout(scanAndObserve, 500);
    const t3 = setTimeout(scanAndObserve, 2000);

    return () => {
      observer.disconnect();
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      observedElements.current.clear();
    };
  }, []);
}
