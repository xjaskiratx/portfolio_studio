"use client";

import { motion } from "framer-motion";
import React, { useState, useRef } from "react";
import { ScrambleText } from "@/components/ui/ScrambleText";
import Magnetic from "@/components/ui/Magnetic";

interface GDItem {
  id: string;
  title: string;
  tag: string;
  desc: string;
  art: React.ReactNode;
  bg: string;
}

export function GDCard({ item, index }: { item: GDItem, index: number }) {
  const [isHovered, setIsHovered] = useState(false);
  const lastHover = useRef(0);

  const handleHover = () => {
    const now = Date.now();
    if (now - lastHover.current < 600) return;
    lastHover.current = now;
    setIsHovered(true);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", damping: 30, stiffness: 200, delay: index * 0.1 }}
      viewport={{ once: true, margin: "-10%" }}
      onHoverStart={handleHover}
      onMouseEnter={handleHover}
      onMouseOver={handleHover}
      onHoverEnd={() => setIsHovered(false)}
      data-cursor="cv"
      data-sc="gd-card"
      className="group bg-[#060608] border border-white/[0.04] relative overflow-hidden cursor-none transition-all duration-500 hover:border-lime/30 hover:shadow-[0_40px_100px_rgba(0,0,0,0.6)] rv si"
    >
      <div className="relative h-[280px] bg-bg overflow-hidden border-b border-white/[0.03]">
         {/* Technical Scan Animation */}
         <div className="absolute inset-0 pointer-events-none overflow-hidden z-20">
           <motion.div 
             initial={{ top: "-10%" }}
             animate={isHovered ? { top: "110%" } : { top: "-10%" }}
             transition={{ duration: 0.65, ease: "linear" }}
             className="absolute left-0 right-0 h-[2px] bg-lime/40 shadow-[0_0_15px_rgba(200,255,0,0.3)]"
           />
         </div>

         {/* Base Layer (Dimmed) */}
         <div 
           className="absolute inset-0 grayscale contrast-[1.1] opacity-40 transition-all duration-700 group-hover:opacity-20 group-hover:scale-105"
           style={{ background: item.bg }}
         />
         
         <div className="absolute inset-0 flex items-center justify-center pt-6 opacity-30 group-hover:opacity-10 transition-opacity duration-700">
           <React.Fragment key="art-base">{item.art}</React.Fragment>
         </div>

         {/* Reveal Layer (Color/Glow) */}
         <motion.div 
           className="absolute inset-0 z-10 flex items-center justify-center pt-6 overflow-hidden pointer-events-none"
           initial={{ clipPath: "inset(0 100% 0 0)" }}
           animate={{ clipPath: isHovered ? "inset(0 0% 0 0)" : "inset(0 100% 0 0)" }}
           transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
           style={{ background: item.bg }}
         >
           <div className="absolute inset-0 opacity-20 bg-gradient-to-tr from-lime/40 to-transparent" />
           <React.Fragment key="art-reveal">{item.art}</React.Fragment>
         </motion.div>

         {/* Scanline/HUD Accent */}
         <div className="absolute top-6 left-6 font-mono text-[8px] tracking-widest text-white/20 uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-200">
           SCANNING // CHRONICLE_0{index + 1}
         </div>
      </div>
      
      <div className="p-10 relative z-20">
        <div className="font-mono text-[10px] tracking-[0.24em] uppercase text-lime mb-3.5 opacity-60 group-hover:opacity-100 transition-opacity">— {item.tag}</div>
        <h3 className="font-display font-black text-[32px] uppercase leading-[0.9] mb-4 group-hover:text-lime transition-colors">
          <ScrambleText text={item.title} trigger={isHovered} />
        </h3>
        <p className="text-[14.5px] font-light text-dim leading-relaxed group-hover:text-white/80 transition-colors">
          {item.desc}
        </p>
        <Magnetic strength={0.3}>
          <div 
            className="flex items-center gap-3 mt-8 font-mono text-[11px] tracking-[0.16em] uppercase text-lime group-hover:gap-5 transition-all"
            aria-label={`Explore the ${item.title} chronicle`}
          >
            EXPLORE CHRONICLE <span className="text-xl">→</span>
          </div>
        </Magnetic>
      </div>
    </motion.div>
  );
}
