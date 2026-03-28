"use client";

import { useEffect, useState } from "react";

export const PageBackground = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true); // eslint-disable-line react-hooks/set-state-in-effect
  }, []);

  if (!mounted) return null;

  return (
    <div id="page-bg" className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      {/* Master Background SVG — Unified coordinate system to prevent Safari desync */}
      <div className="absolute inset-0 flex items-center justify-center">
        <svg
          id="page-background-svg"
          className="w-full h-full overflow-visible"
          viewBox="0 0 1100 1100"
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            <pattern id="grid-20" width="20" height="20" patternUnits="userSpaceOnUse" x="550" y="550">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="var(--accent-lime)" strokeWidth="0.5" opacity="0.12" />
            </pattern>
          </defs>

          {/* 1. Global Blueprint Grid (Infinite pattern locked to constellation origin) */}
          <rect x="-1000" y="-1000" width="3100" height="3100" fill="url(#grid-20)" />

          {/* 2. Rotating Concentric Circles (Constellation) — Fibonacci Progression (x10) */}
          <g id="svg-circles-rotating" className="animate-[page-spin_120s_linear_infinite]" style={{ transformOrigin: '550px 550px' }}>
            <circle cx="550" cy="550" r="490" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="2 24" className="text-[var(--accent-lime)] opacity-[.40]" />
            <circle cx="550" cy="550" r="390" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="2 20" className="text-[var(--accent-lime)] opacity-[.35]" />
            <circle cx="550" cy="550" r="300" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="2 16" className="text-[var(--accent-lime)] opacity-[.30]" />
            <circle cx="550" cy="550" r="220" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="2 12" className="text-[var(--accent-lime)] opacity-[.25]" />
            <circle cx="550" cy="550" r="160" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="2 8" className="text-[var(--accent-lime)] opacity-[.20]" />
            <circle cx="550" cy="550" r="110" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="2 6" className="text-[var(--accent-lime)] opacity-[.16]" />
            <circle cx="550" cy="550" r="70" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="2 4" className="text-[var(--accent-lime)] opacity-[.12]" />
            <circle cx="550" cy="550" r="40" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="2 3" className="text-[var(--accent-lime)] opacity-[.09]" />
            <circle cx="550" cy="550" r="20" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="2 2" className="text-[var(--accent-lime)] opacity-[.06]" />
            <circle cx="550" cy="550" r="10" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="1 1" className="text-[var(--accent-lime)] opacity-[.04]" />
          </g>
        </svg>
      </div>

      {/* Noise dot grid overlay */}
      <div
        id="page-dot-grid"
        className="absolute inset-0 bg-[radial-gradient(circle,var(--accent-glow)_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:radial-gradient(ellipse_80%_60%_at_50%_50%,black_30%,transparent_100%)] max-[767px]:opacity-50"
      />

      {/* Vertical text stripes */}
      <div
        className="page-vtext absolute top-1/2 left-[18px] -translate-y-1/2 -rotate-90 origin-center font-mono text-[9px] tracking-[0.28em] uppercase text-[var(--accent-line)] opacity-20 whitespace-nowrap max-[767px]:hidden"
      >
        JSX W&D · DIGITAL FORGE · SOLO STUDIO · LUDHIANA · IN ·
      </div>
      <div
        className="page-vtext absolute top-1/2 right-[18px] -translate-y-1/2 rotate-90 origin-center font-mono text-[9px] tracking-[0.28em] uppercase text-[var(--accent-line)] opacity-20 whitespace-nowrap max-[767px]:hidden"
      >
        WEB DESIGN · GRAPHIC DESIGN · BRAND IDENTITY · DEVELOPMENT · PRINT ·
      </div>
    </div>
  );
};
