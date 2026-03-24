"use client";

import { LazyMotion } from "framer-motion";

const loadFeatures = () =>
  import("framer-motion").then((res) => res.domMax);

export function FramerProvider({ children }: { children: React.ReactNode }) {
  return (
    <LazyMotion features={loadFeatures} strict>
      {children}
    </LazyMotion>
  );
}
