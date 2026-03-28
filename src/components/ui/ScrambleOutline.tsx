"use client";

import { useEffect, useCallback, useRef, useState } from "react";

const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$!%^&*ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$!%^&*";

interface ScrambleOutlineProps {
  text: string;
  className?: string;
  duration?: number;
}

export function ScrambleOutline({ text, className = "", duration = 0.4 }: ScrambleOutlineProps) {
  const displayRef = useRef<HTMLSpanElement>(null);
  const rafRef = useRef<number>(0);
  const containerRef = useRef<HTMLSpanElement>(null);
  const [isInView, setIsInView] = useState(false);

  const scramble = useCallback(() => {
    if (!displayRef.current) return;
    
    const startTime = performance.now();
    const totalDuration = duration * 1000;

    let lastScrambleTime = 0;
    const animate = (now: number) => {
      if (!displayRef.current) return;
      
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / totalDuration, 1);
      const iteration = Math.floor(text.length * progress);

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

  const lastTriggered = useRef(0);
  const triggerScramble = useCallback(() => {
    const now = Date.now();
    if (now - lastTriggered.current < 600) return;
    lastTriggered.current = now;
    scramble();
  }, [scramble]);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsInView(true);
        observer.disconnect();
      }
    }, { rootMargin: "-10%" });

    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (isInView) {
      triggerScramble();
    }
  }, [isInView, triggerScramble]);

  return (
    <span
      ref={containerRef}
      data-sc="outline"
      className={`relative inline-block whitespace-nowrap ${className}`}
      onMouseEnter={triggerScramble}
      onMouseOver={triggerScramble}
    >
      <span className="invisible" aria-hidden="true">{text}</span>
      <span ref={displayRef} className="absolute inset-0 tracking-normal text-left">
        {text}
      </span>
    </span>
  );
}
