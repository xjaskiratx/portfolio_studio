import { ReactNode, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ScrambleInView } from "@/components/ui/ScrambleInView";
import typS from "@/styles/Typography.module.css";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

import { ScrambleOutline } from "@/components/ui/ScrambleOutline";

const philosophy = [
  { label: "Solid Process", value: "Clear strategy with a planned execution is the process pipeline for high-quality, fast & accurate results." },
  { label: "Architectural Integrity", value: "Code that is as clean as the UI. High-performance architecture meets premium aesthetics for long-term scalability and pixel-perfect results." },
  { label: "Direct Access", value: "Work directly with the builder with no project managers to bypass." }
];

export function About() {
  const [expandedIndices, setExpandedIndices] = useState<number[]>([]);

  const toggleExpand = (index: number) => {
    setExpandedIndices(prev => 
      prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]
    );
  };

  return (
    <section id="about" className="sec relative bg-bg overflow-hidden scroll-mt-20">
      {/* Background Decor */}
      <div className="absolute left-[-20px] top-[10%] font-display font-black text-[120px] md:text-[380px] text-transparent [-webkit-text-stroke:1px_rgba(200,255,0,0.015)] leading-none tracking-tighter pointer-events-none select-none uppercase">
        Mind
      </div>

      <div className="max-w-[1400px] mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-12 lg:gap-20 items-stretch">
        <div className="relative rv flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-px bg-lime/40 hidden md:block" />
              <span className="font-mono text-[14px] tracking-[0.24em] uppercase text-lime font-bold">The Solo Studio Forge</span>
            </div>

            <h2 className={cn(typS.secTitle, "mb-12 max-[767px]:!text-[48px] max-[767px]:!leading-[1.1]")}>
              <span className="inline-block whitespace-nowrap">Solo <ScrambleOutline text="Power," className="[-webkit-text-stroke:2px_rgba(237,233,223,0.35)] text-transparent" /></span><br />
              <span className="inline-block whitespace-nowrap">Agency <span className="text-lime"><ScrambleInView text="Results." /></span></span>
            </h2>

            <div className="space-y-10 max-w-[640px] mb-2">
              <p className="text-[18px] font-light text-dim leading-[1.7] si">
                JSX Studios is a <span className="grad-text">premier digital studio</span> where <span className="grad-text">design</span> and <span className="grad-text">development</span> meet each other into a high-performance process. We build digital experiences that make your brand impossible to ignore.
              </p>
              <p className="text-[18px] font-light text-dim leading-[1.7] si" style={{ transitionDelay: '0.1s' }}>
                Our approach combines <span className="grad-text">modern aesthetics</span> and full-stack precision with <span className="grad-text">modern technology</span> — guaranteed to deliver the <span className="grad-text">best experiences</span>. We deliver work that isn’t just "good"—it’s "<span className="grad-text">REMEMBERED</span>."
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4 rv si" style={{ transitionDelay: '0.2s' }}>
          {philosophy.map((item, i) => {
            const isExpanded = expandedIndices.includes(i);
            
            return (
              <div 
                key={i} 
                className={cn(
                  "group rounded-none border border-white/7 bg-white/[0.02] px-6 py-5 transition-all duration-500 overflow-hidden",
                  "hover:border-lime/20 hover:bg-white/[0.035]",
                  isExpanded && "border-lime/30 bg-white/[0.05]"
                )}
              >
                <button 
                  onClick={() => toggleExpand(i)}
                  className="w-full flex items-center justify-between gap-4 text-left group/btn md:cursor-default md:pointer-events-none"
                >
                  <div className={cn(
                    "font-display font-black text-[22px] md:text-[24px] tracking-[0.14em] uppercase transition-all duration-300 origin-left",
                    (isExpanded || (typeof window !== 'undefined' && window.innerWidth >= 768)) ? "text-lime scale-[1.02]" : "text-white/90 group-hover:text-white"
                  )}>
                    {item.label}
                  </div>
                  
                  {/* Expand/Collapse Icon (Mobile Only) */}
                  <div className="relative w-5 h-5 flex items-center justify-center md:hidden">
                    <div className={cn(
                      "absolute w-full h-0.5 transition-colors duration-300",
                      isExpanded ? "bg-lime" : "bg-white/40 group-hover:bg-white/60"
                    )} />
                    <div className={cn(
                      "absolute w-0.5 h-full transition-all duration-300 origin-center",
                      isExpanded ? "bg-lime scale-y-0" : "bg-white/40 group-hover:bg-white/60"
                    )} />
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {(isExpanded || (typeof window !== 'undefined' && window.innerWidth >= 768)) && (
                    <motion.div
                      key="content"
                      initial={typeof window !== 'undefined' && window.innerWidth < 768 ? { height: 0, opacity: 0 } : false}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: "easeInOut" }}
                      className="overflow-hidden md:block"
                    >
                      <p className="text-[16px] font-light text-white/72 leading-relaxed pt-4 md:pt-4 group-hover:text-white/84 transition-colors">
                        {item.value}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Desktop Fallback (if window is not yet available/SSR) */}
                <noscript>
                  <p className="text-[16px] font-light text-white/72 leading-relaxed pt-4">
                    {item.value}
                  </p>
                </noscript>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
