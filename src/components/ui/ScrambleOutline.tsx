"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useInView } from "framer-motion";

const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$!%^&*";

interface ScrambleOutlineProps {
  text: string;
  className?: string;
  duration?: number;
}

export function ScrambleOutline({ text, className = "", duration = 1.25 }: ScrambleOutlineProps) {
  const [display, setDisplay] = useState(text);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  const scramble = useCallback(() => {
    let iteration = 0;
    const interval = setInterval(() => {
      setDisplay(
        text
          .split("")
          .map((char, index) => {
            if (index < iteration) return text[index];
            if (char === " ") return " ";
            return GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
          })
          .join("")
      );

      if (iteration >= text.length) {
        clearInterval(interval);
      }

      iteration += (text.length / (duration * 30));
    }, 30);

    return () => clearInterval(interval);
  }, [text, duration]);

  useEffect(() => {
    if (isInView) {
      scramble();
    }
  }, [isInView, scramble]);

  return (
    <span 
      ref={ref}
      className={`inline-block whitespace-nowrap ${className}`}
      onMouseEnter={() => {
        scramble();
      }}
    >
      {display}
    </span>
  );
}
