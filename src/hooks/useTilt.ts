"use client";

import { useMotionValue, useSpring, useTransform } from "framer-motion";

export function useTilt() {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 150 };
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [10, -10]), springConfig);
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-13, 13]), springConfig);
  const scale = useSpring(1, springConfig);

  const onMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const mouseX = (e.clientX - rect.left) / rect.width - 0.5;
    const mouseY = (e.clientY - rect.top) / rect.height - 0.5;
    x.set(mouseX);
    y.set(mouseY);
    scale.set(1.016);
  };

  const onMouseLeave = () => {
    x.set(0);
    y.set(0);
    scale.set(1);
  };

  return { rotateX, rotateY, scale, onMouseMove, onMouseLeave };
}
