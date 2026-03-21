"use client";

import { useState, useEffect, useCallback } from "react";

const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$!%^&*";

export function ScrambleText({ text, trigger, duration = 1.25 }: { text: string; trigger?: boolean; duration?: number }) {
  const [display, setDisplay] = useState(text);
  
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
    if (!trigger) return;
    return scramble();
  }, [trigger, text, scramble]);

  useEffect(() => {
    setDisplay(text);
  }, [text]);

  return <span>{display}</span>;
}
