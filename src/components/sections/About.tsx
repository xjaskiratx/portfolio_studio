import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const philosophy = [
  { label: "Efficiency", value: "Zero handoff loss. I design with the code in mind and code with the design in heart." },
  { label: "Quality", value: "Every pixel serves a purpose. High-performance, low-latency, premium aesthetics." },
  { label: "Partnership", value: "You work directly with me. No account managers, no layers — just results." }
];

import { useInView } from "framer-motion";
import { ScrambleText } from "@/components/ui/ScrambleText";
import { ForgeVisualization } from "@/components/ui/ForgeVisualization";
import { ScrambleOutline } from "@/components/ui/ScrambleOutline";

export function About() {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-10%" });
  
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(imageRef.current, {
        y: -80,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.2,
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="about" ref={containerRef} className="sec relative bg-bg overflow-hidden scroll-mt-20">
      {/* Background Decor */}
      <div className="absolute left-[-20px] top-[10%] font-display font-black text-[380px] text-transparent [-webkit-text-stroke:1px_rgba(200,255,0,0.015)] leading-none tracking-tighter pointer-events-none select-none uppercase">
        Mind
      </div>

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-[1.3fr_1fr] gap-20 items-start">
        <div className="relative rv">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-px bg-lime/40" />
            <span className="font-mono text-[10px] tracking-[0.24em] uppercase text-lime">The Solo Studio Forge</span>
          </div>
          
          <h2 className="sec-title mb-12">
            Solo <ScrambleOutline text="Power," className="[-webkit-text-stroke:2px_rgba(237,233,223,0.35)] text-transparent" /><br/>
            Agency <span className="text-lime"><ScrambleText text="Results." trigger={isInView} /></span>
          </h2>
          
          <div className="space-y-10 max-w-[600px] mb-20">
            <p className="text-[18px] font-light text-dim leading-relaxed si">
              I’m <span className="text-white font-medium">Jaskirat Singh</span>, a <span className="grad-text">full-spectrum digital creator</span>. I build <span className="grad-text">high-performance products</span> that transcend generic templates. I don&apos;t just &quot;design&quot; — I <span className="grad-text">engineer experiences</span> that make your brand impossible to ignore.
            </p>
            <p className="text-[18px] font-light text-dim leading-relaxed si" style={{ transitionDelay: '0.1s' }}>
             I don&apos;t just build websites; I forge <span className="grad-text">digital identities</span> that demand attention. My approach combines the raw power of <span className="grad-text">technical precision</span> with the refined touch of <span className="grad-text">high-end design</span>. Whether it&apos;s a high-performance web app or a boutique brand identity, I deliver work that isn&apos;t just &quot;good&quot;&mdash;it&apos;s &quot;unforgettable.&quot;
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 pt-16 border-t border-white/6 rv si" style={{ transitionDelay: '0.2s' }}>
            {philosophy.map((item, i) => (
              <div key={i} className="group rounded-[24px] border border-white/7 bg-white/[0.02] px-7 py-8 md:min-h-[220px] transition-all duration-500 hover:border-lime/20 hover:bg-white/[0.035] hover:shadow-[0_24px_70px_rgba(0,0,0,0.32)]">
                <div className="font-display font-black text-[22px] md:text-[24px] tracking-[0.14em] uppercase text-lime mb-4 group-hover:scale-[1.03] transition-transform origin-left">{item.label}</div>
                <p className="text-[17px] font-light text-white/72 leading-relaxed group-hover:text-white/84 transition-colors">
                  {item.value}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="relative aspect-[4/5] md:aspect-square lg:aspect-[4/5.2] bg-[#0c0c14] overflow-hidden group rv si border border-white/5" style={{ transitionDelay: '0.3s' }}>
          <div ref={imageRef} className="absolute inset-0 z-0">
             <ForgeVisualization />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-bg via-transparent to-bg/40 opacity-80 pointer-events-none" />
          
          {/* HUD Corner Accents */}
          <div className="absolute top-10 left-10 w-16 h-16 border-t-[2px] border-l-[2px] border-white/20 group-hover:border-lime/40 transition-colors duration-500" />
          <div className="absolute bottom-10 right-10 w-16 h-16 border-b-[2px] border-r-[2px] border-white/20 group-hover:border-lime/40 transition-colors duration-500" />
          
          <div className="absolute bottom-12 left-12 right-12 flex justify-between items-end">
             <div className="font-mono text-[10px] tracking-[0.4em] uppercase text-white/40 rotate-180 [writing-mode:vertical-lr] select-none">J.SINGH — DIGITAL FORGE — 2025</div>
             <div className="bg-lime p-8 text-bg shadow-2xl translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-700 delay-200">
                <div className="font-display font-black text-[11px] tracking-[0.2em] uppercase mb-2">STATUS: ACTIVE</div>
                <div className="font-mono text-[9px] tracking-widest uppercase font-bold flex items-center gap-2">
                  <span className="w-2 h-2 bg-bg rounded-full animate-pulse" />
                  Open for Collaborations
                </div>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
}
