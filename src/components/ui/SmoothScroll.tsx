"use client";

import { ReactLenis } from "lenis/react";
import { ReactNode } from "react";
import { useReveal } from "@/hooks/useReveal";

export function SmoothScroll({ children }: { children: ReactNode }) {
  useReveal();
  return (
    <ReactLenis
      root
      options={{
        lerp: 0.075,
        duration: 1.2,
        easing: (t: number) => t === 1 ? 1 : 1 - Math.pow(2, -10 * t),
        smoothWheel: true,
        wheelMultiplier: 1.0,
        touchMultiplier: 0,
      }}
    >
      {children}
    </ReactLenis>
  );
}
