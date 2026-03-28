"use client";

import { useEffect, useCallback, useRef } from "react";

const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$!%^&*ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$!%^&*";

export function ScrambleText({ text, trigger, duration = 0.28 }: { text: string; trigger?: boolean; duration?: number }) {
  const displayRef = useRef<HTMLSpanElement>(null);
  const rafRef = useRef<number>(0);

  const scramble = useCallback(() => {
    if (!displayRef.current) return;
    
    let iteration = -4;
    const startTime = performance.now();
    const totalDuration = duration * 1000;

    let lastScrambleTime = 0;
    const animate = (now: number) => {
      if (!displayRef.current) return;
      
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / totalDuration, 1);
      const iteration = Math.floor(text.length * progress);

      // Optimized scramble loop: 24ms throttle for denser 'flicker' on mobile
      if (now - lastScrambleTime > 24 || progress === 1) {
        lastScrambleTime = now;
        
        const result = new Array(text.length);
        const glyphsLen = GLYPHS.length;
        
        for (let i = 0; i < text.length; i++) {
          if (i < iteration) {
            result[i] = text[i];
          } else if (text[i] === " ") {
            result[i] = " ";
          } else {
            // Faster random selection
            result[i] = GLYPHS[(Math.random() * glyphsLen) | 0];
          }
        }
        displayRef.current.textContent = result.join("");
      }

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(animate);
      } else {
        displayRef.current.textContent = text;
      }
    };

    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, [text, duration]);

  useEffect(() => {
    if (!trigger) {
      if (displayRef.current) displayRef.current.textContent = text;
      return;
    }
    return scramble();
  }, [trigger, text, scramble]);

  return (
    <span className="relative inline-block whitespace-nowrap">
      <span className="invisible" aria-hidden="true">
        {text}
      </span>
      <span ref={displayRef} className="absolute inset-0 tracking-normal text-left">
        {text}
      </span>
    </span>
  );
}
