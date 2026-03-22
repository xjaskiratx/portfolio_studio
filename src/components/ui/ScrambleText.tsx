"use client";

import { useState, useEffect, useCallback } from "react";

const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$!%^&*ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$!%^&*";

export function ScrambleText({ text, trigger, duration = 0.28 }: { text: string; trigger?: boolean; duration?: number }) {
  const [display, setDisplay] = useState(text);

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
      iteration += (text.length / (duration * 62)) * 4.5;
    }, 16);

    return () => clearInterval(interval);
  }, [text, duration]);

  useEffect(() => {
    if (!trigger) return;
    return scramble();
  }, [trigger, text, scramble]);

  useEffect(() => {
    setDisplay(text);
  }, [text]);

  return (
    <span className="relative inline-block whitespace-nowrap">
      <span className="invisible" aria-hidden="true">
        {text}
      </span>
      <span className="absolute inset-0 tracking-normal text-left">
        {display}
      </span>
    </span>
  );
}
