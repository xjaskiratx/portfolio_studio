"use client";

import { useLenis } from "lenis/react";
import { useRef, useEffect } from "react";
import { isMobile } from "@/lib/browser";

export function ScrollProgress() {
  const lineRef = useRef<HTMLDivElement>(null);

  const rafId = useRef<number>(0);

  // 1. Lenis sync for Desktop/Smooth scroll
  useLenis(({ scroll, limit }) => {
    if (isMobile || !lineRef.current) return;

    if (rafId.current) cancelAnimationFrame(rafId.current);
    rafId.current = requestAnimationFrame(() => {
      if (!lineRef.current) return;
      const progress = limit > 0 ? scroll / limit : 0;
      lineRef.current.style.setProperty("--scroll-p", progress.toString());
    });
  });

  // 2. Native sync for Mobile (zero-latency)
  useEffect(() => {
    if (!isMobile) return;

    let totalScrollable = 0;
    
    // Use ResizeObserver to avoid forced reflows
    const observer = new ResizeObserver(() => {
      totalScrollable = document.documentElement.scrollHeight - window.innerHeight;
    });

    const handleScroll = () => {
      if (!lineRef.current || totalScrollable <= 0) return;

      if (rafId.current) cancelAnimationFrame(rafId.current);
      rafId.current = requestAnimationFrame(() => {
        if (!lineRef.current) return;
        const progress = Math.min(Math.max(window.scrollY / totalScrollable, 0), 1);
        lineRef.current.style.setProperty("--scroll-p", progress.toString());
      });
    };

    // Only start observing after a delay to clear the critical path
    const timer = setTimeout(() => {
      observer.observe(document.documentElement);
      window.addEventListener("scroll", handleScroll, { passive: true });
    }, 1000);

    return () => {
      clearTimeout(timer);
      observer.disconnect();
      window.removeEventListener("scroll", handleScroll);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, []);

  return (
    <div
      ref={lineRef}
      className="fixed top-0 left-0 right-0 h-[2px] bg-lime z-[900] origin-left shadow-[0_0_8px_rgba(200,255,0,0.6)] hidden md:block"
      style={{
        transform: "scaleX(var(--scroll-p, 0))",
        willChange: "transform"
      }}
    />
  );
}
