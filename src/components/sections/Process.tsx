"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ScrambleOutline } from "@/components/ui/ScrambleOutline";

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
  const ref = useRef(null);
  useInView(ref, { once: true, margin: "-10%" });

  return (
    <section id="process" className="sec relative bg-bg2 overflow-hidden scroll-mt-20 group/sec">

      <div className="absolute right-[-40px] top-[20%] font-display font-black text-[350px] text-transparent [-webkit-text-stroke:1px_rgba(237,233,223,0.015)] leading-none tracking-tighter pointer-events-none select-none uppercase z-10">
        Engine
      </div>

      <div className="relative z-20 flex flex-col md:flex-row justify-between items-start md:items-end gap-12 mb-20" ref={ref}>
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
          <motion.div
            key={step.num}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true }}
            className="group relative bg-bg/80 backdrop-blur-sm p-12 md:p-[64px_48px] overflow-hidden cursor-none transition-all duration-500 hover:bg-bg/40 z-20"
          >
            {/* Connection Line */}
            {i < steps.length - 1 && (
              <div className="absolute top-1/2 -right-[2px] w-[4px] h-[60%] -translate-y-1/2 bg-gradient-to-b from-transparent via-lime/20 to-transparent hidden lg:block z-0" />
            )}
            <div className="absolute top-[-20px] left-[-20px] font-mono text-[160px] text-white/[0.02] font-black select-none pointer-events-none group-hover:text-lime/[0.04] transition-colors duration-700">{step.num}</div>
            
            <div className="relative z-10">
               <div className="flex items-center gap-4 mb-10">
                  <div className="w-[44px] h-[44px] relative flex items-center justify-center">
                     <div className="absolute inset-0 border-[2px] border-lime/30 group-hover:border-lime group-hover:rotate-[45deg] transition-all duration-500" />
                     <div className="w-[12px] h-[12px] bg-lime group-hover:scale-150 transition-transform duration-500" />
                  </div>
                  <div className="h-px flex-1 bg-white/[0.05] group-hover:bg-lime/20 transition-colors duration-500" />
               </div>

               <h3 className="font-display font-black text-[30px] uppercase mb-4 group-hover:text-lime transition-colors duration-500">
                  {step.title}
               </h3>
               <p className="text-[15px] font-light text-dim leading-relaxed mb-6 group-hover:text-white/80 transition-colors">
                 {step.desc}
               </p>
               
               <ul className="mb-8 space-y-2.5 opacity-100 transition-opacity">
                 {step.details.map(detail => (
                   <li key={detail} className="flex items-center gap-2.5 font-mono text-[10.5px] uppercase tracking-[0.16em] text-white/58 group-hover:text-lime transition-colors">
                     <span className="w-1.5 h-1.5 bg-lime/75 rounded-full shadow-[0_0_10px_rgba(200,255,0,0.24)] group-hover:bg-lime transition-colors" />
                     {detail}
                   </li>
                 ))}
               </ul>

               <div className="flex flex-wrap gap-2 group-hover:gap-3 transition-all">
                  {step.tags.map(tag => (
                    <span key={tag} className="font-mono text-[9px] tracking-[0.14em] uppercase text-lime/68 border border-lime/24 px-3 py-1.5 transition-all group-hover:bg-lime/10 group-hover:text-lime group-hover:border-lime/30">
                      {tag}
                    </span>
                  ))}
               </div>
            </div>
            <div className="absolute bottom-0 left-0 w-full h-[3px] bg-lime scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left" />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
