"use client";

import typS from "@/styles/Typography.module.css";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { ScrambleOutline } from "@/components/ui/ScrambleOutline";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const industries = [
  "SaaS & Enterprise",
  "Web3 / Digital Assets",
  "Luxury E-commerce",
  "High-End Personal Brands",
  "Modern Real Estate"
];

export function Industries() {
  return (
    <section id="industries" className="sec relative bg-transparent md:bg-bg overflow-hidden scroll-mt-20">
      {/* Background Decor */}
      <div className="absolute left-[-20px] top-[10%] font-display font-black text-[120px] md:text-[380px] text-transparent [-webkit-text-stroke:1px_rgba(200,255,0,0.015)] leading-none tracking-tighter pointer-events-none select-none uppercase">
        Focus
      </div>

      <div className="max-w-[1400px] mx-auto relative z-20">
        <div className="flex flex-col items-center md:items-start gap-12 mb-16">
          <div className="rv">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-px bg-lime/40" />
              <span className="font-mono text-[14px] tracking-[0.24em] uppercase text-lime">Core Niches</span>
            </div>
            <h2 className={cn(typS.secTitle, "uppercase")}>Target <ScrambleOutline text="Industries" className="[-webkit-text-stroke:2px_rgba(237,233,223,0.35)] text-transparent" /></h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {industries.map((item, i) => (
            <div
              key={i}
              className="group relative flex items-center justify-between px-8 py-8 border border-white/5 bg-white/[0.015] hover:border-lime/30 transition-all duration-500 overflow-hidden cursor-none hover:bg-white/[0.03] backdrop-blur-sm rv"
              style={{ transitionDelay: `${i * 0.1}s` } as React.CSSProperties}
            >
              <div className="flex items-center gap-8 relative z-10">
                <span className="font-mono text-[16px] text-lime/40 group-hover:text-lime transition-colors">
                  {(i + 1).toString().padStart(2, '0')}
                </span>
                <span className="font-display font-black text-[22px] md:text-[28px] lg:text-[34px] tracking-tight uppercase text-white/80 group-hover:text-white transition-all duration-500 group-hover:translate-x-2">
                  {item}
                </span>
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-lime/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            </div>
          ))}

          {/* "And Many More" Card */}
          <div className="group relative flex items-center justify-between px-8 py-8 border border-white/5 bg-white/[0.015] hover:border-lime/30 transition-all duration-500 overflow-hidden cursor-none hover:bg-white/[0.03] backdrop-blur-sm rv">
            <div className="flex items-center gap-8 relative z-10">
              <span className="font-display font-black text-[22px] md:text-[28px] lg:text-[34px] tracking-tight uppercase text-white/50 group-hover:text-white transition-all duration-500 group-hover:translate-x-2">
                ...And Many <ScrambleOutline text="More" className="[-webkit-text-stroke:1px_rgba(237,233,223,0.35)] text-transparent" />
              </span>
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-lime/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
          </div>
        </div>
      </div>
    </section>
  );
}
