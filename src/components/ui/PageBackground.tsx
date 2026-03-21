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
      {/* Column guide lines — vertical architectural grid */}
      <div 
        id="page-col-lines" 
        className="absolute inset-0 bg-[linear-gradient(90deg,var(--accent-line)_1px,transparent_1px),linear-gradient(90deg,var(--accent-glow)_1px,transparent_1px)] bg-[size:25%_100%,8.333%_100%] bg-no-repeat md:bg-[size:25%_100%,8.333%_100%] sm:bg-[size:50%_100%,25%_100%] max-[479px]:hidden"
      />
      
      {/* Single horizontal rule */}
      <div 
        id="page-hrule" 
        className="absolute left-0 right-0 top-1/2 h-px bg-[linear-gradient(90deg,transparent_0%,var(--accent-glow)_15%,var(--accent-line)_40%,var(--accent-line)_60%,var(--accent-glow)_85%,transparent_100%)]"
      />
      
      {/* Central vertical line */}
      <div 
        id="page-vrule" 
        className="absolute top-0 bottom-0 left-1/2 w-px bg-[linear-gradient(180deg,transparent_0%,var(--accent-glow)_10%,var(--accent-line)_40%,var(--accent-line)_60%,var(--accent-glow)_90%,transparent_100%)]"
      />
      
      {/* Concentric ambient circles */}
      <svg 
        id="page-circles" 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[min(900px,100vw)] h-[min(900px,100vw)] max-[479px]:w-[min(500px,100vw)] max-[479px]:h-[min(500px,100vw)] animate-[page-spin_120s_linear_infinite]"
        viewBox="0 0 900 900" 
        preserveAspectRatio="xMidYMid meet"
      >
        <circle cx="450" cy="450" r="420" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="2 18" className="text-[var(--accent-lime)] opacity-[.35]" />
        <circle cx="450" cy="450" r="320" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="2 14" className="text-[var(--accent-lime)] opacity-[.28]" />
        <circle cx="450" cy="450" r="220" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="2 10" className="text-[var(--accent-lime)] opacity-[.22]" />
        <circle cx="450" cy="450" r="130" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="2 8" className="text-[var(--accent-lime)] opacity-[.18]" />
        <circle cx="450" cy="450" r="55" fill="none" stroke="currentColor" strokeWidth="1" className="text-[var(--accent-lime)] opacity-[.12]" />
      </svg>
      
      {/* Noise dot grid overlay */}
      <div 
        id="page-dot-grid" 
        className="absolute inset-0 bg-[radial-gradient(circle,var(--accent-glow)_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:radial-gradient(ellipse_80%_60%_at_50%_50%,black_30%,transparent_100%)] max-[767px]:opacity-50"
      />
      
      {/* Vertical text stripes */}
      <div 
        className="page-vtext absolute top-1/2 left-[18px] -translate-y-1/2 -rotate-90 origin-center font-mono text-[9px] tracking-[0.28em] uppercase text-[var(--accent-line)] whitespace-nowrap max-[767px]:hidden"
      >
        JSX W&D · DIGITAL FORGE · SOLO STUDIO · LUDHIANA · IN ·
      </div>
      <div 
        className="page-vtext absolute top-1/2 right-[18px] -translate-y-1/2 rotate-90 origin-center font-mono text-[9px] tracking-[0.28em] uppercase text-[var(--accent-line)] whitespace-nowrap max-[767px]:hidden"
      >
        WEB DESIGN · GRAPHIC DESIGN · BRAND IDENTITY · DEVELOPMENT · PRINT ·
      </div>
    </div>
  );
};
