import { ScrambleInView } from "@/components/ui/ScrambleInView";
import { ScrambleOutline } from "@/components/ui/ScrambleOutline";

const philosophy = [
  { label: "Digital Synthesis", value: "Bridging the gap between high-end design and technical execution. No handoff loss, one cohesive vision from start to finish." },
  { label: "Architectural Integrity", value: "Code that is as clean as the UI. High-performance architecture meets premium aesthetics for long-term scalability." },
  { label: "Direct Partnership", value: "Collaborate directly with the creator. Zero overhead, absolute transparency, and rapid delivery of exceptional results." }
];

export function About() {
  return (
    <section id="about" className="sec relative bg-bg overflow-hidden scroll-mt-20">
      {/* Background Decor */}
      <div className="absolute left-[-20px] top-[10%] font-display font-black text-[380px] text-transparent [-webkit-text-stroke:1px_rgba(200,255,0,0.015)] leading-none tracking-tighter pointer-events-none select-none uppercase">
        Mind
      </div>

      <div className="max-w-[1400px] mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-12 lg:gap-20 items-start">
        <div className="relative rv">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-px bg-lime/40" />
            <span className="font-mono text-[10px] tracking-[0.24em] uppercase text-lime">The Solo Studio Forge</span>
          </div>

          <h2 className="sec-title mb-12">
            Solo <ScrambleOutline text="Power," className="[-webkit-text-stroke:2px_rgba(237,233,223,0.35)] text-transparent" /><br />
            Agency <span className="text-lime"><ScrambleInView text="Results." /></span>
          </h2>

          <div className="space-y-10 max-w-[600px]">
            <p className="text-[18px] font-light text-dim leading-relaxed si">
              I’m <span className="text-white font-medium">Jaskirat Singh</span>, a <span className="grad-text">full-spectrum digital creator</span>. I build <span className="grad-text">high-performance products</span> that transcend generic templates. I don&apos;t just &quot;design&quot; — I <span className="grad-text">engineer experiences</span> that make your brand impossible to ignore.
            </p>
            <p className="text-[18px] font-light text-dim leading-relaxed si" style={{ transitionDelay: '0.1s' }}>
              I don&apos;t just build websites; I forge <span className="grad-text">digital identities</span> that demand attention. My approach combines the raw power of <span className="grad-text">technical precision</span> with the refined touch of <span className="grad-text">high-end design</span>. Whether it&apos;s a high-performance web app or a boutique brand identity, I deliver work that isn&apos;t just &quot;good&quot;&mdash;it&apos;s &quot;<span className="grad-text">REMEMBERED</span>.&quot;
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-4 rv si" style={{ transitionDelay: '0.2s' }}>
          {philosophy.map((item, i) => (
            <div key={i} className="group rounded-none border border-white/7 bg-white/[0.02] px-7 py-8 transition-all duration-500 hover:border-lime/20 hover:bg-white/[0.035] hover:shadow-[0_24px_70px_rgba(0,0,0,0.32)]">
              <div className="font-display font-black text-[22px] md:text-[24px] tracking-[0.14em] uppercase text-lime mb-4 group-hover:scale-[1.03] transition-transform origin-left">{item.label}</div>
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
