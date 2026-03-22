import { ScrambleOutline } from "@/components/ui/ScrambleOutline";
import { ProcessCard } from "./ProcessCard";

const steps = [
  {
    num: "01",
    title: "Strategy / Concept",
    desc: "We define the goal. Who is the audience? What is the core problem? We map out the digital architecture before a single pixel is touched.",
    details: ["Brand Audit", "User Persona", "Project Blueprint"],
    tags: ["Research", "Flow", "Strategy"]
  },
  {
    num: "02",
    title: "The Forge / Build",
    desc: "This is where the magic happens. Parallel design and development. I forge the visuals and the engine simultaneously for perfect cohesion.",
    details: ["Design System", "Pixel-Perfect Dev", "Performance Ops"],
    tags: ["Next.js", "Three.js", "GSAP"]
  },
  {
    num: "03",
    title: "Ship / Launch",
    desc: "Rigorous stress testing followed by a seamless deployment. We monitor performance and ensure your product hits the ground running.",
    details: ["Final Audit", "Global CDN", "Success Metrics"],
    tags: ["Vercel", "SEO", "Support"]
  }
];

export function Process() {
  return (
    <section id="process" className="sec relative bg-bg2 overflow-hidden scroll-mt-20 group/sec">
      <div className="absolute right-[-40px] top-[20%] font-display font-black text-[350px] text-transparent [-webkit-text-stroke:1px_rgba(237,233,223,0.015)] leading-none tracking-tighter pointer-events-none select-none uppercase z-10">
        Engine
      </div>

      <div className="relative z-20 flex flex-col md:flex-row justify-between items-start md:items-end gap-12 mb-20">
        <div className="rv">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-px bg-lime/40" />
            <span className="font-mono text-[10px] tracking-[0.24em] uppercase text-lime">The Digital Forge System</span>
          </div>
          <h2 className="sec-title">The <ScrambleOutline text="Forge" className="[-webkit-text-stroke:2px_rgba(237,233,223,0.35)] text-transparent" /></h2>
        </div>
        <p className="rv text-[16px] font-light text-dim max-w-[440px] leading-relaxed si" style={{ transitionDelay: '0.1s' }}>
          A battle-tested workflow designed for speed, quality, and extreme precision. I take your vision from zero to a high-converting digital product.
        </p>
      </div>

      <div className="relative z-20 grid grid-cols-1 lg:grid-cols-3 gap-[4px] bg-white/[0.04] border border-white/[0.04]">
        {steps.map((step, i) => (
          <ProcessCard 
            key={step.num} 
            step={step} 
            index={i} 
            isLast={i === steps.length - 1} 
          />
        ))}
      </div>
    </section>
  );
}
