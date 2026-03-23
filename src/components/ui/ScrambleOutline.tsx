"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useInView } from "framer-motion";

const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$!%^&*ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$!%^&*";

interface ScrambleOutlineProps {
  text: string;
  className?: string;
  duration?: number;
}

export function ScrambleOutline({ text, className = "", duration = 0.4 }: ScrambleOutlineProps) {
  const [display, setDisplay] = useState(text);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  const scramble = useCallback(() => {
    let iteration = -4;
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

      // Ultra-fast settle
      iteration += (text.length / (duration * 360)) * 4.5;
    }, 16);

    return () => clearInterval(interval);
  }, [text, duration]);

  const lastTriggered = useRef(0);
  const triggerScramble = useCallback(() => {
    const now = Date.now();
    if (now - lastTriggered.current < 600) return;
    lastTriggered.current = now;
    scramble();
  }, [scramble]);

  useEffect(() => {
    if (isInView) {
      triggerScramble();
    }
  }, [isInView, triggerScramble]);

  return (
    <span
      ref={ref}
      data-sc="outline"
      className={`relative inline-block whitespace-nowrap ${className}`}
      onMouseEnter={triggerScramble}
      onMouseOver={triggerScramble}
    >
      <span className="invisible" aria-hidden="true">{text}</span>
      <span className="absolute inset-0 tracking-normal text-left">
        {display}
      </span>
    </span>
  );
}
