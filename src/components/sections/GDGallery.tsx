"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { ScrambleText } from "@/components/ui/ScrambleText";


const gdItems = [
  {
    id: "apex",
    title: "Apex Summit",
    tag: "Poster Design",
    desc: "Event poster series — bold typography, geometric comp, screen-printed aesthetic.",
    art: (
      <svg width="80%" height="100%" viewBox="0 0 400 240" fill="none" preserveAspectRatio="xMidYMid meet">
        <rect width="400" height="240" fill="rgba(6,14,0,.95)"/>
        <polygon points="0,240 260,0 400,0 400,80 140,240" fill="rgba(200,255,0,.07)"/>
        <text x="14" y="200" fontFamily="serif" fontWeight="900" fontSize="180" fill="transparent" stroke="rgba(200,255,0,.12)" strokeWidth="1" letterSpacing="-20">A</text>
        <path d="M30,240 A200,200 0 0,1 230,60" stroke="rgba(200,255,0,0.12)" strokeWidth="1" fill="none"/>
        <rect x="18" y="18" width="180" height="26" rx="2" fill="rgba(200,255,0,.9)"/>
      </svg>
    ),
    bg: "radial-gradient(ellipse at 30% 50%,#0d1a00,#060608)"
  },
  {
    id: "nova",
    title: "Nova Brand",
    tag: "Brand System",
    desc: "Complete identity — logo, colours, type, guidelines, and print collateral.",
    art: (
      <svg width="80%" height="100%" viewBox="0 0 400 240" fill="none" preserveAspectRatio="xMidYMid meet">
        <rect width="400" height="240" fill="rgba(18,4,12,.95)"/>
        <line x1="200" y1="0" x2="200" y2="240" stroke="rgba(255,45,45,.1)" strokeWidth="2"/>
        <circle cx="100" cy="108" r="50" stroke="rgba(255,45,45,.2)" strokeWidth="1.5" fill="rgba(255,45,45,.04)"/>
        <path d="M84,108 L100,84 L116,108 L100,132 Z" fill="rgba(255,45,45,.25)" stroke="rgba(255,45,45,.6)" strokeWidth="1.5" strokeLinejoin="round"/>
        <circle cx="100" cy="108" r="8" fill="rgba(255,45,45,.9)"/>
      </svg>
    ),
    bg: "radial-gradient(ellipse at 60% 40%,#200010,#060608)"
  },
  {
    id: "axis",
    title: "Axis Report",
    tag: "Report Design",
    desc: "Annual report — data visualisation, infographics, editorial layout for print and digital.",
    art: (
      <svg width="80%" height="100%" viewBox="0 0 400 240" fill="none" preserveAspectRatio="xMidYMid meet">
        <rect width="400" height="240" fill="rgba(0,4,20,.97)"/>
        <rect x="0" y="0" width="400" height="54" fill="rgba(68,102,255,.12)"/>
        <rect x="18" y="68" width="364" height="98" rx="4" fill="rgba(68,102,255,.04)" stroke="rgba(68,102,255,.1)" strokeWidth="1"/>
        <rect x="116" y="76" width="22" height="82" rx="2" fill="rgba(200,255,0,.7)"/>
        <rect x="284" y="74" width="22" height="84" rx="2" fill="rgba(200,255,0,0.75)"/>
      </svg>
    ),
    bg: "radial-gradient(ellipse at 50% 60%,#000c20,#060608)"
  }
];

import Magnetic from "@/components/ui/Magnetic";

function GDCard({ item, index }: { item: typeof gdItems[0], index: number }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", damping: 30, stiffness: 200, delay: index * 0.1 }}
      viewport={{ once: true, margin: "-10%" }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      data-cursor="cv"
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
           {item.art}
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
           {item.art}
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

export function GDGallery() {
  return (
    <section id="gd" data-cursor="cdrag" className="relative sec-py px-4 md:px-[60px] bg-bg2 overflow-hidden">
      {/* Premium Background Strips */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.015]" 
           style={{ background: "repeating-linear-gradient(-45deg, transparent, transparent 60px, #c8ff00 61px, #c8ff00 62px)" }} 
      />

      <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-end gap-12 mb-20">
        <div className="rv">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-px bg-lime/40" />
            <span className="font-mono text-[10px] tracking-[0.24em] uppercase text-lime">Visual Narratives</span>
          </div>
          <h2 className="sec-title">Design <span className="[-webkit-text-stroke:2px_rgba(237,233,223,0.12)] text-transparent">Gallery</span></h2>
        </div>
        <p className="rv text-[16px] font-light text-dim max-w-[420px] leading-relaxed si" style={{ transitionDelay: '0.15s' }}>
          From conceptual posters to meticulous brand guidelines. I treat every graphic asset as a primary interface for your brand.
        </p>
      </div>

      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {gdItems.map((item, i) => (
          <GDCard key={item.id} item={item} index={i} />
        ))}
      </div>
    </section>
  );
}
