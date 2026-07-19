"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { ScrambleText } from "@/components/ui/ScrambleText";
import { ScrambleOutline } from "@/components/ui/ScrambleOutline";
import typS from "@/styles/Typography.module.css";
import Magnetic from "@/components/ui/Magnetic";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

import { useLenis } from "lenis/react";
import { useIsMounted } from "@/hooks/useIsMounted";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const projects = [
  {
    id: "drkarambir",
    title: "Dr. Karambir Gill",
    cat: "Medical Portfolio",
    desc: "High-performance medical portal and professional portfolio for a specialist pediatrician, featuring custom booking workflows and publication indexing.",
    year: "2026",
    type: "dev",
    size: "small",
    bg: "bg-drg",
    glow: "g-drg",
    image: "/images/drkarambir.webp",
    width: 1024,
    height: 1024,
    url: "https://vercel-demo-one-app.vercel.app"
  },
  {
    id: "thecakedrama",
    title: "The Cake Drama",
    cat: "Artisanal Bakery",
    desc: "Premium digital experience for a local bakery, blending sweet aesthetics with high-performance ordering.",
    year: "2026",
    type: "dev",
    size: "large",
    bg: "bg2",
    glow: "g2",
    image: "/images/thecakedrama.webp",
    width: 1200,
    height: 630,
    url: "https://thecakedrama.vercel.app"
  },
  {
    id: "cfc",
    title: "CFC Fasteners",
    cat: "Industrial E-Comm",
    desc: "High-performance digital forge for industrial fastener supply.",
    year: "2026",
    type: "dev",
    size: "large",
    bg: "bg4",
    glow: "g4",
    image: "/images/cfcfasteners.webp",
    width: 2880,
    height: 1640,
    url: "https://cfc-fasteners.vercel.app"
  },
  {
    id: "buh",
    title: "Between Us, Honestly",
    cat: "Social Platform",
    desc: "An online safe space for individuals to connect &\n feel heard amidst the chaos around them.",
    year: "2026",
    type: "design",
    size: "small",
    bg: "bg-buh",
    glow: "g-buh",
    image: "/images/buh.webp",
    width: 948,
    height: 948
  },
  {
    id: "saphire",
    title: "Saphire Astro",
    cat: "Astrology & Wellness",
    desc: "Modern astrology platform delivering celestial insights.",
    year: "2025",
    type: "dev",
    size: "tall",
    bg: "bg-special",
    glow: "g-special",
    image: "/images/saphireastro.webp",
    width: 2880,
    height: 1640,
    url: "https://saphireastro.in"
  },
  {
    id: "vye",
    title: "Vibe Your Event",
    cat: "Event Branding",
    desc: "Event experience design preserving core values and branding for high-energy social gatherings.",
    year: "2026",
    type: "design",
    size: "small",
    bg: "bg-vye",
    glow: "g-vye",
    image: "/images/vye.webp",
    width: 1100,
    height: 1000
  },
  {
    id: "pawmatch",
    title: "PawMatch",
    cat: "Social Club",
    desc: "Social club platform for connecting pets and people.",
    year: "2026",
    type: "dev",
    size: "large",
    bg: "bg5",
    glow: "g5",
    image: "/images/pawmatch.webp",
    width: 2880,
    height: 1640,
    url: "https://pawmatch-club.vercel.app"
  }
];

interface Project {
  id: string;
  title: string;
  cat: string;
  desc: string;
  year: string;
  type: string;
  size: string;
  bg: string;
  glow: string;
  image: string;
  width: number;
  height: number;
  url?: string;
}

const bgs: Record<string, string> = {
  bg1: "radial-gradient(ellipse at 30% 40%, #0e1b00, #060608 85%)",
  bg2: "radial-gradient(ellipse at 65% 30%, #1c0005, #060608 85%)",
  bg3: "radial-gradient(ellipse at 50% 50%, #00081e, #060608 85%)",
  bg4: "radial-gradient(ellipse at 40% 60%, #180c00, #060608 85%)",
  bg5: "radial-gradient(ellipse at 55% 15%, #0a0016, #060608 85%)",
  "bg-special": "radial-gradient(ellipse at 50% 30%, #130820, #060608 80%)",
  "bg-buh": "radial-gradient(ellipse at 50% 50%, #18120c, #050508 85%)",
  "bg-vye": "radial-gradient(ellipse at 50% 50%, #0d081f, #050508 85%)",
  "bg-drg": "radial-gradient(ellipse at 50% 50%, #1a0e24, #060608 85%)"
};

const glows: Record<string, string> = {
  g1: "radial-gradient(ellipse at 50% 100%, rgba(200,255,0,0.12), transparent 70%)",
  g2: "radial-gradient(ellipse at 50% 100%, rgba(255,45,45,0.12), transparent 70%)",
  g3: "radial-gradient(ellipse at 50% 100%, rgba(68,102,255,0.12), transparent 70%)",
  g4: "radial-gradient(ellipse at 50% 100%, rgba(255,176,32,0.12), transparent 70%)",
  g5: "radial-gradient(ellipse at 50% 100%, rgba(153,85,255,0.12), transparent 70%)",
  "g-special": "radial-gradient(ellipse at 50% 100%, rgba(200,80,255,0.11), transparent 70%)",
  "g-buh": "radial-gradient(ellipse at 50% 100%, rgba(245, 230, 200, 0.12), transparent 70%)",
  "g-vye": "radial-gradient(ellipse at 50% 100%, rgba(130, 100, 255, 0.12), transparent 70%)",
  "g-drg": "radial-gradient(ellipse at 50% 100%, rgba(180,110,240,0.12), transparent 70%)"
};

function ProjectCard({ project }: { project: Project }) {
  const [isHovered, setIsHovered] = useState(false);
  const lastHover = useRef(0);
  const activeBg = bgs[project.bg] || bgs.bg1;
  const activeGlow = glows[project.glow] || glows.g1;

  const handleHover = () => {
    const now = Date.now();
    if (now - lastHover.current < 600) return;
    lastHover.current = now;
    setIsHovered(true);
  };

  const CardContent = (
    <div
      onMouseEnter={handleHover}
      onMouseOver={handleHover}
      onMouseLeave={() => setIsHovered(false)}
      data-cursor="cv"
      data-sc="project"
      className="group relative w-full h-full overflow-hidden cursor-none"
    >
      <div
        className="absolute inset-0 transition-transform duration-1000 group-hover:scale-110"
        style={{ background: activeBg }}
      />
      {/* Background Glow */}
      <div
        className={cn(
          "absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000",
          activeGlow
        )}
      />

      <div className="absolute inset-0 flex items-center justify-center transition-all duration-1000 group-hover:scale-105">
        {project.image && (
          <Image
            src={project.image}
            alt={project.title}
            width={project.width}
            height={project.height}
            className={cn(
              "h-auto object-contain drop-shadow-[0_0_80px_rgba(0,0,0,0.6)] transition-all duration-700",
              project.size === "small" ? "w-[65%] md:w-[50%]" : "w-[90%] md:w-[75%]"
            )}
          />
        )}
      </div>

      <div className="absolute top-0 left-0 p-8 md:p-10 flex flex-col gap-1.5 opacity-100 md:opacity-0 md:translate-y-2 md:group-hover:translate-y-0 md:group-hover:opacity-100 transition-all duration-500 delay-100">
        <span className="font-mono text-[13px] tracking-[0.24em] uppercase text-lime font-bold whitespace-nowrap">
          {project.type === "dev" ? "Engineering" : "Identity"}
        </span>
        <span className="font-mono text-[13px] tracking-[0.24em] uppercase text-white/60 font-medium whitespace-nowrap">
          {project.cat}
        </span>
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-bg/98 via-transparent to-transparent flex flex-col justify-end p-8 md:p-10 lg:p-12">
        <h2 className="font-display font-black text-3xl md:text-[40px] uppercase leading-tight mb-3 group-hover:text-lime transition-colors duration-500">
          <ScrambleText text={project.title} trigger={isHovered} />
        </h2>

        {/* Project Description */}
        <p className="text-[14px] font-normal text-white/70 mb-5 max-w-[92%] md:max-w-[360px] lg:max-w-[420px] leading-relaxed opacity-100 md:opacity-0 md:translate-y-3 md:group-hover:translate-y-0 md:group-hover:opacity-100 transition-all duration-500 delay-150 line-clamp-2 whitespace-pre-line h-[3.5em] overflow-hidden">
          {project.desc}
        </p>

        <div className="font-mono text-[15px] tracking-[0.3em] font-bold text-white/40 group-hover:text-white/80 transition-colors uppercase">{project.year}</div>
      </div>

      {project.type !== "design" && (
        <div className="absolute top-8 right-8">
          <div className="w-11 h-11 bg-lime flex items-center justify-center font-bold text-bg opacity-100 md:opacity-0 md:translate-x-4 md:-translate-y-4 md:group-hover:opacity-100 md:group-hover:translate-x-0 md:group-hover:translate-y-0 transition-all duration-500 delay-75 shadow-lg">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="7" y1="17" x2="17" y2="7"></line><polyline points="7 7 17 7 17 17"></polyline></svg>
          </div>
        </div>
      )}
    </div>
  );

  if (project.url) {
    return (
      <a href={project.url} target="_blank" rel="noopener noreferrer" className="block w-full h-full">
        {CardContent}
      </a>
    );
  }

  return CardContent;
}

export function Work() {
  const mounted = useIsMounted();
  const [isMobile, setIsMobile] = useState(false);


  const [isExpanded, setIsExpanded] = useState(false);
  const lenis = useLenis();

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const gridRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const cardHeightRef = useRef<number>(600); // Decent default

  useEffect(() => {
    if (!gridRef.current) return;
    const observer = new ResizeObserver((entries) => {
      const firstCard = entries[0].target.firstElementChild as HTMLElement;
      if (firstCard) {
        cardHeightRef.current = firstCard.offsetHeight;
      }
    });
    observer.observe(gridRef.current);
    return () => observer.disconnect();
  }, []);

  // On mobile, show ALL projects in the carousel. On desktop, respect isExpanded.
  const displayProjects = isMobile ? projects : (isExpanded ? projects : projects.slice(0, 3));

  const handleExpand = () => {
    const newState = !isExpanded;
    setIsExpanded(newState);
    
    if (newState && lenis && gridRef.current) {
      setTimeout(() => {
        const grid = gridRef.current;
        if (!grid) return;

        // Use cached height to avoid layout thrashing
        const cardHeight = cardHeightRef.current;
          const gap = 32; // md:gap-8
          // To center the second row:
          // Scroll to: GridTop + Row1 + Gap + (Row2/2) - (Viewport/2)
          const targetOffset = (cardHeight + gap) + (cardHeight / 2) - (window.innerHeight / 2);

          lenis.scrollTo(grid, {
            offset: targetOffset,
            duration: 1.8,
            easing: (t) => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2 // Premium ease-in-out-cubic
          });
      }, 100);
    }
  };

  const handleScroll = () => {
    if (!gridRef.current) return;
    const scrollLeft = gridRef.current.scrollLeft;
    // Account for the card width ([85vw]) AND the gap (gap-6 = 24px)
    const cardWidth = window.innerWidth * 0.85;
    const gap = 24; 
    const index = Math.min(
      Math.round(scrollLeft / (cardWidth + gap)), 
      displayProjects.length - 1
    );
    if (index !== activeIndex) {
      setActiveIndex(index);
    }
  };

  if (!mounted) {
    return <section id="work" className="sec bg-bg min-h-[50vh]" />;
  }

  return (
    <section id="work" className="sec bg-transparent md:bg-bg relative overflow-hidden scroll-mt-20">
      <div className="max-w-[1400px] mx-auto relative z-20 mb-16">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-12">
          <div className="rv">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-px bg-lime/40" />
              <span className="font-mono text-[14px] tracking-[0.24em] uppercase text-lime">Project Index</span>
            </div>
            <h2 className={typS.secTitle}>Selected <ScrambleOutline text="Work" className="[-webkit-text-stroke:2px_rgba(237,233,223,0.35)] text-transparent" /></h2>
          </div>

          <motion.button
            layout
            onClick={handleExpand}
            className="group hidden md:flex items-center justify-center gap-4 bg-white/[0.05] border border-white/20 px-8 py-4 hover:bg-lime/10 hover:border-lime/40 transition-all duration-500 overflow-hidden min-w-[180px]"
          >
            <span className="font-mono text-[16px] tracking-[0.3em] font-bold uppercase text-white/90 group-hover:text-lime transition-colors">
              {isExpanded ? "Collapse" : "See More"}
            </span>
          </motion.button>
        </div>
      </div>

    <div className="max-w-[1400px] mx-auto relative z-20 w-full">
        {/* Responsive Container: Carousel on Mobile, Grid on Desktop */}
        <motion.div
          ref={gridRef}
          onScroll={handleScroll}
          layout
          className={cn(
            "flex overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-8 -mx-4 px-4 gap-6", // Mobile Carousel Styles
            "md:mx-0 md:px-0 md:pb-0 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-8 md:overflow-visible" // Desktop Grid Styles
          )}
        >
          <AnimatePresence initial={false}>
            {displayProjects.map((project, index) => (
              <motion.div
                key={project.id || index}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                className={cn(
                  "relative aspect-[3/4] overflow-hidden bg-white/[0.04] border border-white/[0.05] shrink-0 snap-center",
                  "w-[85vw] md:w-auto" // Mobile width vs Desktop auto
                )}
              >
                <ProjectCard project={project} />
              </motion.div>
            ))}

            {/* "And Many More" card - Always visible on Mobile, Visible on Desktop when expanded */}
            {(isExpanded || isMobile) && (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className={cn(
                  "relative aspect-[3/4] flex items-center justify-center border border-lime/20 bg-lime/[0.03] p-10 overflow-hidden shrink-0 snap-center",
                  "w-[85vw] md:w-auto" // Sync with project card widths
                )}
              >
                <div className="text-center group transition-all duration-700 hover:scale-105">
                  <h3 className="font-display font-black text-3xl md:text-[40px] uppercase leading-none text-lime opacity-80 tracking-tighter mb-4">
                    ...AND MANY <ScrambleOutline text="MORE" className="[-webkit-text-stroke:1.5px_#c8ff00] text-transparent" />
                  </h3>
                  <div className="w-12 h-px bg-lime/40 mx-auto" />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Mobile Indicator Dots */}
        {isMobile && (
          <div className="flex justify-center gap-2 mt-6 md:hidden">
            {displayProjects.map((_, i) => (
              <div
                key={i}
                className={cn(
                  "w-1.5 h-1.5 rounded-full transition-all duration-500",
                  i === activeIndex ? "bg-lime w-6" : "bg-white/20"
                )}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
