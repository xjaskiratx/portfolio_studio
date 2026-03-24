"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ScrambleText } from "@/components/ui/ScrambleText";
import { ScrambleOutline } from "@/components/ui/ScrambleOutline";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

import {
  NovalyticsArt,
  EmberArt,
  SolarisArt,
  KovaArt,
  PulseArt,
  VegaArt
} from "./ProjectArts";

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
    art: <NovalyticsArt />
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
    art: <EmberArt />
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
    art: <SolarisArt />
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
    art: <KovaArt />
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
    art: <PulseArt />
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
    art: <VegaArt />
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

const PREVIEW_COUNT = 3;

function ProjectCard({ project }: { project: typeof projects[0] }) {
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
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
      onHoverStart={handleHover}
      onMouseEnter={handleHover}
      onMouseOver={handleHover}
      onHoverEnd={() => setIsHovered(false)}
      data-cursor="cv"
      data-sc="project"
      className="group relative w-full h-full overflow-hidden cursor-none"
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
        <React.Fragment key="project-art">{project.art}</React.Fragment>
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-bg/98 via-bg/20 to-transparent flex flex-col justify-end p-8 md:p-10">
        <div className="font-mono text-[9px] tracking-[0.22em] uppercase text-lime mb-2.5 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-100">— {project.cat}</div>
        <h3 className="font-display font-black text-2xl md:text-[32px] uppercase leading-none mb-1.5 group-hover:text-lime transition-colors duration-500">
          <ScrambleText text={project.title} trigger={isHovered} />
        </h3>
        <div className="font-mono text-[9px] tracking-widest text-white/50 group-hover:text-white/75 transition-colors uppercase">{project.year} {"//"} FULL CASE STUDY AVAILABLE</div>
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
  const [filter, setFilter] = useState<"all" | "dev" | "design">("all");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const displayProjects = React.useMemo(() => {
    if (filter === "all") {
      const dev = projects.filter(p => p.type === "dev").slice(0, 2);
      const design = projects.filter(p => p.type === "design").slice(0, 1);
      return [...dev, ...design];
    }
    return projects.filter(p => p.type === filter).slice(0, 3);
  }, [filter]);

  if (!mounted) {
    return <section id="work" className="sec bg-bg overflow-hidden min-h-[50vh]" />;
  }

  return (
    <section id="work" className="sec bg-bg overflow-hidden !px-0">
      <div className="w-full px-[var(--sec-px)]">
        <div className="max-w-[1400px] mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-12 mb-20">
            <div className="rv">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-px bg-lime/40" />
                <span className="font-mono text-[10px] tracking-[0.24em] uppercase text-lime">Proof of Concept</span>
              </div>
              <h2 className="sec-title">Selected <ScrambleOutline text="Work" className="[-webkit-text-stroke:2px_rgba(237,233,223,0.35)] text-transparent" /></h2>
            </div>

            <div className="flex flex-wrap items-center gap-4 rv si" style={{ transitionDelay: '0.2s' }}>
              {["dev", "design"].map(f => (
                <button
                  key={f}
                  onClick={() => setFilter(prev => prev === f ? "all" : f as "dev" | "design")}
                  aria-label={`Filter projects by ${f}`}
                  className={cn(
                    "transition-all cursor-none h-[54px] px-8 flex items-center justify-center font-display uppercase tracking-[0.14em]",
                    filter === f
                      ? "bg-lime text-bg font-black text-base hover:bg-white"
                      : "font-mono font-bold text-[13.5px] text-white border border-white/20 hover:text-lime hover:border-lime/40 hover:bg-white/5"
                  )}
                >
                  {f === "dev" ? "Development" : "Design"}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 w-full bg-white/[0.04] border-y border-white/[0.04] overflow-hidden">
        {[0, 1, 2].map((index) => (
          <div key={index} className="relative aspect-[4/5] md:aspect-auto md:h-[70vh] border-r border-white/[0.04] last:border-r-0 overflow-hidden">
            <AnimatePresence mode="wait">
              {displayProjects[index] ? (
                <ProjectCard key={displayProjects[index].id} project={displayProjects[index]} />
              ) : (
                <div key={`empty-${index}`} className="w-full h-full bg-bg/50" />
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </section>
  );
}
