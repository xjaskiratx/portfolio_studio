"use client";

import { ReactLenis } from "lenis/react";
import { ReactNode } from "react";
import { useReveal } from "@/hooks/useReveal";
import { isSafari, isIOSSafari } from "@/lib/browser";

export function SmoothScroll({ children }: { children: ReactNode }) {
  useReveal();
  return (
    <ReactLenis
      root
      options={{
        lerp: isIOSSafari ? 0 : 0.05,
        duration: 1.5,
        easing: (t: number) => t === 1 ? 1 : 1 - Math.pow(2, -10 * t),
        smoothWheel: true,
        wheelMultiplier: 1.0,
        touchMultiplier: 0,
        syncTouch: false,
      }}
    >
      {children}
    </ReactLenis>
  );
}
