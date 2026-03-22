"use client";

import { useEffect, useRef } from "react";
import { useLenis } from "lenis/react";

const WORDS = [
  { text: "One", lime: false },
  { text: "person.", lime: false },
  { text: "Every", lime: false },
  { text: "skill.", lime: false },
  { text: "No", lime: true },
  { text: "agency", lime: true },
  { text: "markup.", lime: true },
  { text: "We", lime: false },
  { text: "build", lime: false },
  { text: "what", lime: false },
  { text: "agencies", lime: false },
  { text: "charge", lime: false },
  { text: "10×", lime: true },
  { text: "for.", lime: false },
];

export function WordBuilder() {
  const containerRef = useRef<HTMLDivElement>(null);
  const wordsRef = useRef<(HTMLSpanElement | null)[]>([]);

  useLenis(({ scroll }) => {
    const container = containerRef.current;
    if (!container) return;

    const rect = container.getBoundingClientRect();
    const containerTop = scroll + rect.top + window.scrollY - window.scrollY;
    const containerHeight = container.offsetHeight;
    const viewportHeight = window.innerHeight;

    // Progress: 0 when sticky inner enters view, 1 when scroll reaches end of tall container
    const scrollProgress = (scroll - (containerTop - viewportHeight)) / (containerHeight - viewportHeight);
    const progress = Math.min(Math.max(scrollProgress, 0), 1);

    wordsRef.current.forEach((span, i) => {
      if (!span) return;
      // Each word activates sequentially based on progress
      const wordProgress = (progress * WORDS.length - i) / 1;
      const opacity = Math.min(Math.max(wordProgress, 0), 1);
      span.style.opacity = String(0.15 + opacity * 0.85);
      span.style.color = opacity > 0.5 && WORDS[i].lime ? "var(--lime)" : "var(--txt)";
    });
  });

  return (
    <section
      ref={containerRef}
      className="relative"
      style={{ height: "500vh" }}
      id="word-builder"
      aria-label="Studio positioning statement"
    >
      <div className="sticky top-0 h-screen flex items-center justify-center px-fib-55 max-[1279px]:px-fib-34 max-[1023px]:px-fib-34 max-[767px]:px-fib-21 max-[479px]:px-fib-21">
        {/* Section label */}
        <div className="absolute top-10 left-fib-55 max-[767px]:left-fib-21 font-mono text-[9px] tracking-[0.2em] uppercase text-lime flex items-center gap-2.5">
          <span className="block w-5 h-px bg-lime" />
          Studio Positioning
        </div>

        <p className="font-display font-black text-[clamp(var(--fib-34),6.5vw,var(--fib-89))] uppercase leading-[0.88] tracking-[-0.01em] text-center max-w-[900px]">
          {WORDS.map((word, i) => (
            <span
              key={i}
              ref={(el) => { wordsRef.current[i] = el; }}
              className="inline-block mx-[0.15em] transition-none"
              style={{
                opacity: 0.15,
                color: "var(--txt)",
              }}
            >
              {word.text}
            </span>
          ))}
        </p>
      </div>
    </section>
  );
}
