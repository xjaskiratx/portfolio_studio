import { ScrambleOutline } from "@/components/ui/ScrambleOutline";
import { ProcessCard, type ForgeStep } from "./ProcessCard";

const steps: ForgeStep[] = [
  {
    num: "01",
    title: "Strategy / Concept",
    desc: "Clarify goals, audience, and constraints before design or code.",
  },
  {
    num: "02",
    title: "The Forge / Build",
    desc: "Design and build together so UI, motion, and performance stay aligned.",
  },
  {
    num: "03",
    title: "Ship / Launch",
    desc: "Harden, deploy, measure—then iterate with real usage data.",
  },
];

export function Process() {
  return (
    <section id="process" className="sec relative bg-bg2 overflow-hidden scroll-mt-20 group/sec">
      <div className="absolute right-[-40px] top-[20%] font-display font-black text-[110px] md:text-[350px] text-transparent [-webkit-text-stroke:1px_rgba(237,233,223,0.015)] leading-none tracking-tighter pointer-events-none select-none uppercase z-10">
        Engine
      </div>

      <div className="max-w-[1400px] mx-auto relative z-20 flex flex-col md:flex-row justify-between items-start md:items-end gap-10 mb-14 md:mb-16">
        <div className="rv">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-px bg-lime/40" />
            <span className="font-mono text-[10px] tracking-[0.24em] uppercase text-lime">The Digital Forge System</span>
          </div>
          <h2 className="sec-title">The <ScrambleOutline text="Forge" className="[-webkit-text-stroke:2px_rgba(237,233,223,0.35)] text-transparent" /></h2>
        </div>
        <p className="rv text-[15px] font-light text-dim max-w-[400px] leading-relaxed si" style={{ transitionDelay: "0.1s" }}>
          A tight workflow from idea to launch—fewer handoffs, fewer surprises.
        </p>
      </div>

      <div className="max-w-[1400px] mx-auto relative z-20 grid grid-cols-1 lg:grid-cols-3 gap-[4px] bg-white/[0.04] border border-white/[0.04]">
        {steps.map((step, i) => (
          <ProcessCard key={step.num} step={step} index={i} isLast={i === steps.length - 1} />
        ))}
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
