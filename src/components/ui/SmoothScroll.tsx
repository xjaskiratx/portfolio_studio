"use client";

import { ReactLenis } from "lenis/react";
import { ReactNode, useEffect, useState } from "react";
import { useReveal } from "@/hooks/useReveal";
import { isMobile } from "@/lib/browser";

export function SmoothScroll({ children }: { children: ReactNode }) {
  useReveal();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) return <>{children}</>;

  if (isMobile) {
    return <>{children}</>;
  }

  return (
    <ReactLenis
      root
      options={{
        lerp: 0.05,
        duration: 1.5,
        easing: (t: number) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        wheelMultiplier: 1.0,
        touchMultiplier: 1.5, // Heavy momentum for touch
        syncTouch: true,
      }}
    >
      {children}
    </ReactLenis>
  );
}
