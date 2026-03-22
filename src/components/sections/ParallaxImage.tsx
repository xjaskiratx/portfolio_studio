"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { ForgeVisualization } from "@/components/ui/ForgeVisualization";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function ParallaxImage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

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
    <div ref={containerRef} className="relative aspect-[4/5] md:aspect-square lg:aspect-[4/5.2] bg-[#0c0c14] overflow-hidden group rv si border border-white/5" style={{ transitionDelay: '0.3s' }}>
      <div ref={imageRef} className="absolute inset-0 z-0">
         <ForgeVisualization />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-bg via-transparent to-bg/40 opacity-80 pointer-events-none" />
      
      {/* HUD Corner Accents */}
      <div className="absolute top-10 left-10 w-16 h-16 border-t-[2px] border-l-[2px] border-white/20 group-hover:border-lime/40 transition-colors duration-500" />
      <div className="absolute bottom-10 right-10 w-16 h-16 border-b-[2px] border-r-[2px] border-white/20 group-hover:border-lime/40 transition-colors duration-500" />
      
      <div className="absolute bottom-12 left-12 right-12 flex justify-between items-end">
         <div className="font-mono text-[10px] tracking-[0.4em] uppercase text-white/55 rotate-180 [writing-mode:vertical-lr] select-none">J.SINGH — DIGITAL FORGE — 2025</div>
         <div className="bg-lime p-8 text-bg shadow-2xl translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-700 delay-200">
            <div className="font-display font-black text-[11px] tracking-[0.2em] uppercase mb-2">STATUS: ACTIVE</div>
            <div className="font-mono text-[9px] tracking-widest uppercase font-bold flex items-center gap-2">
              <span className="w-2 h-2 bg-bg rounded-full animate-pulse" />
              Open for Collaborations
            </div>
         </div>
      </div>
    </div>
  );
}
