"use client";

import { useRef } from "react";
import { useInView } from "framer-motion";
import { ScrambleText } from "./ScrambleText";

interface ScrambleInViewProps {
  text: string;
  className?: string;
  duration?: number;
}

export function ScrambleInView({ text, className, duration }: ScrambleInViewProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <span ref={ref} className={className}>
      <ScrambleText text={text} trigger={isInView} duration={duration} />
    </span>
  );
}
