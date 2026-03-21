"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ScrambleText } from "@/components/ui/ScrambleText";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const projects = [
  {
    id: "novalytics",
    title: "Novalytics",
    cat: "SaaS Dashboard",
    year: "2024",
    type: "dev",
    size: "large",
    bg: "bg1",
    glow: "g1",
    art: (
       <svg width="80%" viewBox="0 0 500 290" fill="none" className="opacity-90">
          <rect width="500" height="290" rx="7" fill="rgba(10,18,2,.95)"/>
          <rect width="500" height="32" rx="7" fill="rgba(200,255,0,.07)"/>
          <rect y="25" width="500" height="7" fill="rgba(200,255,0,.07)"/>
          <circle cx="20" cy="16" r="5" fill="#ff5f57" opacity=".75"/>
          <circle cx="36" cy="16" r="5" fill="#febc2e" opacity=".75"/>
          <circle cx="52" cy="16" r="5" fill="#28c840" opacity=".75"/>
          <path d="M128,238 L156,215 L184,224 L212,196 L240,210 L268,185 L296,200 L324,175 L352,190 L370,162" stroke="rgba(200,255,0,.8)" strokeWidth="2" fill="none" strokeLinejoin="round"/>
          <path d="M128,238 L156,215 L184,224 L212,196 L240,210 L268,185 L296,200 L324,175 L352,190 L370,162 L370,278 L128,278Z" fill="rgba(200,255,0,.06)"/>
          <circle cx="370" cy="162" r="5" fill="rgba(200,255,0,.9)"/>
       </svg>
    )
  },
  {
    id: "ember",
    title: "Ember Brand",
    cat: "Brand Identity",
    year: "2024",
    type: "design",
    size: "tall",
    bg: "bg2",
    glow: "g2",
    art: (
      <svg width="60%" viewBox="0 0 290 460" fill="none" className="opacity-90">
          <rect width="290" height="460" fill="rgba(20,2,8,.9)"/>
          <circle cx="145" cy="182" r="126" stroke="rgba(255,45,45,.07)" strokeWidth="1"/>
          <circle cx="145" cy="182" r="30" fill="rgba(255,45,45,.08)" stroke="rgba(255,45,45,.4)" strokeWidth="1.5"/>
          <polygon points="145,120 191,207 99,207" fill="rgba(255,45,45,.12)" stroke="rgba(255,45,45,.65)" strokeWidth="2" strokeLinejoin="round"/>
          <circle cx="145" cy="182" r="9" fill="rgba(255,45,45,.85)"/>
       </svg>
    )
  },
  {
    id: "solaris",
    title: "Solaris Mag",
    cat: "Editorial Design",
    year: "2023",
    type: "design",
    size: "large",
    bg: "bg3",
    glow: "g3",
    art: (
      <svg width="80%" viewBox="0 0 440 295" fill="none" className="opacity-90">
          <rect width="440" height="295" rx="4" fill="rgba(0,6,24,.92)"/>
          <rect x="18" y="60" width="160" height="195" rx="2" fill="rgba(68,102,255,.1)" stroke="rgba(68,102,255,.22)" strokeWidth="1"/>
          <rect x="210" y="18" width="212" height="20" rx="3" fill="rgba(68,102,255,.38)"/>
          <rect x="210" y="102" width="8" height="68" rx="2" fill="rgba(200,255,0,.6)"/>
       </svg>
    )
  },
  {
    id: "kova",
    title: "Kova Shop",
    cat: "E-Commerce",
    year: "2024",
    type: "dev",
    size: "small",
    bg: "bg4",
    glow: "g4",
    art: (
      <svg width="88%" viewBox="0 0 380 270" fill="none" className="opacity-90">
          <rect width="380" height="270" rx="6" fill="rgba(16,10,0,.95)"/>
          <rect x="12" y="74" width="110" height="148" rx="5" fill="rgba(255,185,35,.07)" stroke="rgba(255,185,35,.18)" strokeWidth="1"/>
          <circle cx="67" cy="119" r="22" stroke="rgba(255,185,35,.35)" strokeWidth="1.5" fill="rgba(255,185,35,.08)"/>
          <rect x="300" y="240" width="68" height="20" rx="3" fill="rgba(255,185,35,.45)" stroke="rgba(255,185,35,.7)" strokeWidth="1"/>
       </svg>
    )
  },
  {
    id: "pulse",
    title: "Pulse App",
    cat: "Mobile UI/UX",
    year: "2023",
    type: "dev",
    size: "small",
    bg: "bg5",
    glow: "g5",
    art: (
      <svg width="40%" viewBox="0 0 210 370" fill="none" className="opacity-90">
          <rect x="6" y="0" width="198" height="370" rx="28" stroke="rgba(140,100,255,.35)" strokeWidth="2" fill="rgba(140,100,255,.04)"/>
          <rect x="20" y="12" width="170" height="346" rx="20" fill="rgba(8,6,20,.92)"/>
          <circle cx="105" cy="352" r="9" fill="rgba(200,255,0,.55)"/>
       </svg>
    )
  },
  {
    id: "vega",
    title: "Vega Event",
    cat: "Poster Design",
    year: "2023",
    type: "design",
    size: "small",
    bg: "bg-special",
    glow: "g-special",
    art: (
       <svg width="52%" viewBox="0 0 260 360" fill="none" className="opacity-90">
          <rect width="260" height="360" fill="rgba(14,4,26,.98)"/>
          <circle cx="130" cy="145" r="48" stroke="rgba(200,80,255,.2)" strokeWidth="2"/>
          <circle cx="130" cy="145" r="20" fill="rgba(200,80,255,.1)" stroke="rgba(200,80,255,.55)" strokeWidth="2"/>
          <path d="M130,89 L133,105 L148,95 L137,109 L154,113 L138,117 L145,133 L131,123 L130,141 L129,123 L115,133 L122,117 L106,113 L123,109 L112,95 L127,105Z" fill="rgba(200,255,0,0.65)"/>
       </svg>
    )
  }
];

const bgs: Record<string, string> = {
  bg1: "radial-gradient(ellipse at 30% 40%, #0e1b00, #060608 85%)",
  bg2: "radial-gradient(ellipse at 65% 30%, #1c0005, #060608 85%)",
  bg3: "radial-gradient(ellipse at 50% 50%, #00081e, #060608 85%)",
  bg4: "radial-gradient(ellipse at 40% 60%, #180c00, #060608 85%)",
  bg5: "radial-gradient(ellipse at 55% 15%, #0a0016, #060608 85%)",
  "bg-special": "radial-gradient(ellipse at 50% 30%, #130820, #060608 80%)"
};

const glows: Record<string, string> = {
  g1: "radial-gradient(ellipse at 50% 100%, rgba(200,255,0,0.12), transparent 70%)",
  g2: "radial-gradient(ellipse at 50% 100%, rgba(255,45,45,0.12), transparent 70%)",
  g3: "radial-gradient(ellipse at 50% 100%, rgba(68,102,255,0.12), transparent 70%)",
  g4: "radial-gradient(ellipse at 50% 100%, rgba(255,176,32,0.12), transparent 70%)",
  g5: "radial-gradient(ellipse at 50% 100%, rgba(153,85,255,0.12), transparent 70%)",
  "g-special": "radial-gradient(ellipse at 50% 100%, rgba(200,80,255,0.11), transparent 70%)"
};

import Magnetic from "@/components/ui/Magnetic";

function ProjectCard({ project }: { project: typeof projects[0] }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      data-cursor="cv"
      className={cn(
        "group relative overflow-hidden cursor-none rv si sp",
        project.size === "large" ? "aspect-video md:aspect-[16/9]" : project.size === "tall" ? "aspect-[3/4.2] row-span-2" : "aspect-[4/3.2]"
      )}
    >
      <div 
        className="absolute inset-0 transition-transform duration-1000 group-hover:scale-110"
        style={{ background: bgs[project.bg] }}
      />
      <div 
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
        style={{ background: glows[project.glow] }}
      />

      {/* Technical Scan Animation */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-20">
        <motion.div 
          initial={{ top: "-10%" }}
          animate={isHovered ? { top: "110%" } : { top: "-10%" }}
          transition={{ duration: 0.65, ease: "linear" }}
          className="absolute left-0 right-0 h-[2px] bg-lime/50 shadow-[0_0_15px_rgba(200,255,0,0.4)]"
        />
      </div>
      
      <div className="absolute inset-0 flex items-center justify-center transition-all duration-700 group-hover:-translate-y-6 group-hover:scale-110">
        {project.art}
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-bg/98 via-bg/20 to-transparent flex flex-col justify-end p-8 md:p-10">
        <div className="font-mono text-[9px] tracking-[0.22em] uppercase text-lime mb-2.5 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-100">— {project.cat}</div>
        <h3 className="font-display font-black text-2xl md:text-[32px] uppercase leading-none mb-1.5 group-hover:text-lime transition-colors duration-500">
          <ScrambleText text={project.title} trigger={isHovered} />
        </h3>
        <div className="font-mono text-[9px] tracking-widest text-white/30 group-hover:text-white/60 transition-colors uppercase">{project.year} {"//"} FULL CASE STUDY AVAILABLE</div>
      </div>

      <div className="absolute top-8 right-8">
        <Magnetic strength={0.5}>
          <div className="w-11 h-11 bg-lime flex items-center justify-center font-bold text-bg opacity-0 translate-x-4 -translate-y-4 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-500 delay-75 shadow-lg">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="7" y1="17" x2="17" y2="7"></line><polyline points="7 7 17 7 17 17"></polyline></svg>
          </div>
        </Magnetic>
      </div>
    </motion.div>
  );
}

export function Work() {
  const [filter, setFilter] = useState("all");

  const filteredProjects = projects.filter(p => filter === "all" || p.type === filter);

  return (
    <section id="work" className="sec-py px-4 md:px-0 bg-bg overflow-hidden">
      <div className="max-w-[1400px] mx-auto mb-20">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-12">
          <div className="rv">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-px bg-lime/40" />
              <span className="font-mono text-[10px] tracking-[0.24em] uppercase text-lime">Proof of Concept</span>
            </div>
            <h2 className="sec-title">Selected <span className="[-webkit-text-stroke:2px_rgba(237,233,223,0.12)] text-transparent">Work</span></h2>
          </div>

          <div className="flex flex-wrap items-center gap-6 rv si" style={{ transitionDelay: '0.2s' }}>
            <div className="flex gap-1.5 bg-white/[0.03] backdrop-blur-md border border-white/[0.05] p-1.5">
              {["all", "dev", "design"].map(f => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  aria-label={`Filter projects by ${f}`}
                  className={cn(
                    "font-mono text-[10px] tracking-[0.16em] uppercase px-6 py-3 transition-all cursor-none",
                    filter === f ? "bg-lime text-bg font-black" : "text-muted hover:text-white"
                  )}
                >
                  {f}
                </button>
              ))}
            </div>
            <button 
              className="btn-o px-10 py-4.5 font-display font-black text-xs tracking-widest uppercase cursor-none hidden lg:block"
              aria-label="View all projects in the chronicle"
            >
              All Projects →
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1.6fr_1fr] gap-[4px] bg-white/[0.04] border-y border-white/[0.04]">
        <AnimatePresence mode="popLayout">
           {filteredProjects.slice(0, 2).map(p => (
             <ProjectCard key={p.id} project={p} />
           ))}
        </AnimatePresence>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[4px] mt-[4px] bg-white/[0.04] border-b border-white/[0.04]">
        <AnimatePresence mode="popLayout">
           {filteredProjects.slice(2).map(p => (
             <ProjectCard key={p.id} project={p} />
           ))}
        </AnimatePresence>
      </div>
      
      <div className="mt-20 flex justify-center rv">
            <button 
              className="btn-p bg-white text-bg px-14 py-6 font-display font-black text-sm tracking-widest uppercase hover:bg-lime transition-all cursor-none overflow-hidden group"
              aria-label="Load more project chronicles"
            >
              <span className="relative z-10">Load More Chronicles</span>
              <div className="absolute inset-0 bg-lime translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
            </button>
      </div>
    </section>
  );
}
