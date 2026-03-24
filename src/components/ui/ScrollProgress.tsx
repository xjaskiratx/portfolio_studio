"use client";

import { m, useScroll, useSpring } from "framer-motion";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <m.div
      style={{ scaleX }}
      className="fixed top-0 left-0 right-0 h-[2px] bg-lime z-[900] origin-left shadow-[0_0_8px_rgba(200,255,0,0.6)]"
    />
  );
}
