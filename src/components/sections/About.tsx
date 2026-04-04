import { ScrambleInView } from "@/components/ui/ScrambleInView";
import typS from "@/styles/Typography.module.css";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

import { ScrambleOutline } from "@/components/ui/ScrambleOutline";

const philosophy = [
  { label: "High-Quality Process", value: "Clear strategy with planned execution resulting in high-quality results. Just a direct pipeline for fast and accurate results." },
  { label: "Architectural Integrity", value: "Code that is as clean as the UI. High-performance architecture meets premium aesthetics for long-term scalability and pixel-perfect results." },
  { label: "Direct Access", value: "Work directly with the builder with no project managers to bypass." }
];

export function About() {
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
          {philosophy.map((item, i) => (
            <div key={i} className="group rounded-none border border-white/7 bg-white/[0.02] px-5 py-3 transition-all duration-500 hover:border-lime/20 hover:bg-white/[0.035] hover:shadow-[0_24px_70px_rgba(0,0,0,0.32)]">
              <div className="font-display font-black text-[22px] md:text-[24px] tracking-[0.14em] uppercase text-lime mb-4 group-hover:scale-[1.03] transition-transform text-center md:text-left origin-center md:origin-left">{item.label}</div>
              <p className="text-[16px] font-light text-white/72 leading-relaxed group-hover:text-white/84 transition-colors">
                {item.value}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
