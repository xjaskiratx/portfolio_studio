import { ScrambleOutline } from "@/components/ui/ScrambleOutline";
import { ProcessCard, type ForgeStep } from "./ProcessCard";

const steps: ForgeStep[] = [
  {
    num: "01",
    title: "Strategy",
    desc: [
      "Define goals & structure",
      "User-centric research",
      "Direction before execution"
    ],
  },
  {
    num: "02",
    title: "Design & Build",
    desc: [
      "High-fidelity UI design",
      "Development & motion",
      "Zero handoff gaps"
    ],
  },
  {
    num: "03",
    title: "Launch & Iterate",
    desc: [
      "Deployment & Testing",
      "Real-world validation",
      "Continuous refinement"
    ],
  },
];

export function Process() {
  return (
    <section id="process" className="sec relative bg-bg overflow-hidden scroll-mt-20 group/sec">
      <div className="absolute right-[-40px] top-[20%] font-display font-black text-[110px] md:text-[350px] text-transparent [-webkit-text-stroke:1px_rgba(237,233,223,0.015)] leading-none tracking-tighter pointer-events-none select-none uppercase z-10">
        Engine
      </div>

      <div className="max-w-[1400px] mx-auto relative z-20 flex flex-col md:flex-row justify-between items-start md:items-end gap-10 mb-14 md:mb-16">
        <div className="rv">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-px bg-lime/40" />
            <span className="font-mono text-[10px] tracking-[0.24em] uppercase text-lime">the process</span>
          </div>
          <h2 className="sec-title uppercase">simple, <ScrambleOutline text="direct," className="[-webkit-text-stroke:2px_rgba(237,233,223,0.35)] text-transparent" /> effective</h2>
        </div>
        <p className="rv text-[18px] font-light text-dim max-w-[460px] leading-[1.4] group si" style={{ transitionDelay: "0.1s" }}>
          A direct, <span className="grad-text">3-step workflow</span> designed for speed and zero friction. No fluff—just <span className="grad-text">impact.</span>
        </p>
      </div>

      <div className="max-w-[1400px] mx-auto relative z-20 grid grid-cols-1 lg:grid-cols-3 gap-[4px] bg-white/[0.04] border border-white/[0.04] mb-6 md:mb-0">
        {steps.map((step, i) => (
          <ProcessCard key={step.num} step={step} index={i} isLast={i === steps.length - 1} />
        ))}
      </div>

      <div className="max-w-[1400px] mx-auto relative z-20 text-center">
        <p className="rv font-display font-black text-[22px] md:text-[28px] lg:text-[32px] uppercase text-white/90 tracking-tight si" style={{ transitionDelay: "0.4s" }}>
          No layers. No delays. <span className="text-lime">You work directly with the builder.</span>
        </p>
      </div>

      {/* SVG Connector for Safari Refinement */}
      <svg id="proc-connector"
        width="100%"
        height="4"
        viewBox="0 0 1200 4"
        preserveAspectRatio="none"
        style={{ position: 'absolute', bottom: 0, left: 0, right: 0, overflow: 'visible' }}>
        <path className="proc-conn-path" d="M0,2 L1200,2" stroke="var(--lime)" strokeWidth="2" fill="none" />
      </svg>
    </section>
  );
}
