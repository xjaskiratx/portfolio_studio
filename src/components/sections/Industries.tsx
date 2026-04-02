"use client";

import { ScrambleInView } from "@/components/ui/ScrambleInView";
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
    <section id="industries" className="sec relative bg-bg overflow-hidden scroll-mt-20">
      {/* Background Decor */}
      <div className="absolute left-[-20px] top-[10%] font-display font-black text-[120px] md:text-[380px] text-transparent [-webkit-text-stroke:1px_rgba(200,255,0,0.015)] leading-none tracking-tighter pointer-events-none select-none uppercase">
        Focus
      </div>

      <div className="max-w-[1400px] mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-[1.35fr_0.65fr] gap-12 lg:gap-20 items-start overflow-hidden">
          <div className="rv">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-px bg-lime/40 hidden md:block" />
              <span className="font-mono text-[10px] tracking-[0.24em] uppercase text-lime">Introduction & Expertise</span>
            </div>

            <h2 className={cn(typS.secTitle, "mb-10 !text-[46px] lg:!text-[68px] xl:!text-[92px] !leading-[1.1] whitespace-nowrap")}>
              Establishing <ScrambleOutline text="Authority" className="[-webkit-text-stroke:2px_rgba(237,233,223,0.35)] text-transparent" /><br />
              Across <span className="text-lime"><ScrambleInView text="Prime Niches." /></span>
            </h2>

            <div className="max-w-[600px] mb-8">
              <p className="text-[19px] font-light text-dim leading-[1.7]">
                <span className="text-white font-medium">JSX Studios</span> doesn't just build websites; we engineer <span className="grad-text">digital powerhouses</span>.
              </p>
              <br />
              <p className="text-[18px] font-light text-dim leading-[1.7]">
                By combining deep technical stacks with premium aesthetics, we help businesses in high-stakes industries solidify their market presence and outshine competitors with <span className="grad-text">zero compromise</span> on performance.
              </p>
            </div>
          </div>

          <div className="rv flex flex-col gap-3 pt-4 lg:pt-12 w-full lg:max-w-none" style={{ transitionDelay: '0.2s' }}>
            <span className="font-mono text-[9px] tracking-[0.3em] uppercase text-muted mb-4 block">Proven Experience In:</span>
            <div className="flex flex-wrap lg:flex-col gap-3 lg:gap-4 w-full">
              {industries.map((item, i) => (
                <div
                  key={i}
                  className="group relative px-6 py-3 border border-white/5 bg-white/[0.015] hover:border-lime/30 transition-all duration-500 overflow-hidden w-full"
                >
                  <div className="absolute inset-0 bg-lime/5 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-700 ease-out" />
                  <span className="relative z-10 font-display font-black text-[22px] md:text-[26px] tracking-[0.08em] uppercase text-white/80 group-hover:text-lime transition-colors whitespace-nowrap">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
