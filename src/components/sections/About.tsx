import { ScrambleInView } from "@/components/ui/ScrambleInView";
import { ScrambleOutline } from "@/components/ui/ScrambleOutline";

const philosophy = [
  { label: "Direct Collaboration", value: "One point of contact, collaborate directly with me, absolute transparency, no people to bypass in the middle - everything handled by me." },
  { label: "Architectural Integrity", value: "Code that is as clean as the UI. High-performance architecture meets premium aesthetics for long-term scalability." },
  { label: "Rapid Execution", value: "No fluff, just fast and focused results with zero delays or overheads." }
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
              <span className="font-mono text-[10px] tracking-[0.24em] uppercase text-lime">The Solo Studio Forge</span>
            </div>

            <h2 className="sec-title mb-12 max-[767px]:!text-[48px] max-[767px]:!leading-[1.1]">
              <span className="inline-block whitespace-nowrap">Solo <ScrambleOutline text="Power," className="[-webkit-text-stroke:2px_rgba(237,233,223,0.35)] text-transparent" /></span><br />
              <span className="inline-block whitespace-nowrap">Agency <span className="text-lime"><ScrambleInView text="Results." /></span></span>
            </h2>

            <div className="space-y-10 max-w-[640px] mb-2">
              <p className="text-[18px] font-light text-dim leading-[1.7] si">
                I’m <span className="text-white font-medium">Jaskirat Singh</span>, a <span className="grad-text">designer and a full-stack developer.</span> This, is my solo studio where I build <span className="grad-text">high-performance products</span> that make your brand impossible to ignore.
              </p>
              <p className="text-[18px] font-light text-dim leading-[1.7] si" style={{ transitionDelay: '0.1s' }}>
                My approach combines <span className="grad-text">powerful designs </span> and <span className="grad-text">pixel-perfect precision </span> with <span className="grad-text">modern technology </span> which are guranteed to deliver the <span className="grad-text">best experiences </span>. Whether it&apos;s a high-performance web app or a boutique brand identity, I deliver work that isn&apos;t just &quot;good&quot;&mdash;it&apos;s &quot;<span className="grad-text">REMEMBERED</span>.&quot;
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4 rv si" style={{ transitionDelay: '0.2s' }}>
          {philosophy.map((item, i) => (
            <div key={i} className="group rounded-none border border-white/7 bg-white/[0.02] px-7 py-5 transition-all duration-500 hover:border-lime/20 hover:bg-white/[0.035] hover:shadow-[0_24px_70px_rgba(0,0,0,0.32)]">
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
