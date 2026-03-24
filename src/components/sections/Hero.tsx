"use client";

import { m, useScroll, useTransform, useMotionValue, useSpring as useFramerSpring } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import dynamic from "next/dynamic";
const HeroBackground = dynamic(() => import("./HeroBackground").then(mod => mod.HeroBackground), { ssr: false });
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

import { ScrambleOutline } from "@/components/ui/ScrambleOutline";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const stats = [
  { label: "Direct Collaboration", value: "1:1" },
  { label: "Digital Artifacts", value: "60+" },
  { label: "Avg. Ship Time", value: "< 21D" },
  { label: "Client Retention", value: "92%" },
];

import { isSafari } from "@/lib/browser";

export function Hero() {
  const { scrollYProgress } = useScroll();
  const [mounted, setMounted] = useState(false);
  const [fontsReady, setFontsReady] = useState(false);
  const [showScene, setShowScene] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true); // eslint-disable-line react-hooks/set-state-in-effect

    if (isSafari && typeof document !== 'undefined') {
      document.fonts.ready.then(() => setFontsReady(true));
    } else {
      setFontsReady(true);
    }

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setShowScene(true);
        // Optional: disconnect after first trigger if we want it to stay loaded
        // observer.disconnect();
      } else {
        setShowScene(false);
      }
    }, { rootMargin: '200px' });

    if (heroRef.current) {
      observer.observe(heroRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Smooth out the scroll progress to prevent jittery font-weight transitions
  const smoothProgress = useFramerSpring(scrollYProgress, { damping: 35, stiffness: 200 });

  // Weights go 900 -> 100 as you scroll past hero
  const fontWeight = useTransform(smoothProgress, [0, 0.2], [900, 100]);
  const letterSpacing = useTransform(smoothProgress, [0, 0.2], ["-0.02em", "0.04em"]);

  // Rule of hooks: always call useTransform at the top level
  const fontVariationSettings = useTransform(fontWeight, (w) => `'wght' ${w}`);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 150 };

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    mouseX.set((clientX / innerWidth - 0.5) * 40);
    mouseY.set((clientY / innerHeight - 0.5) * 40);
  };

  const splitText = (text: string, delay: number = 0) => {
    return text.split("").map((char, i) => (
      <span
        key={i}
        className="char in"
        style={{ transitionDelay: `${delay + i * 0.03}s` }}
      >
        {char === " " ? "\u00A0" : char}
      </span>
    ));
  };

  return (
    <section
      id="hero"
      ref={heroRef}
      className={cn(
        "relative min-h-[100svh] flex flex-col justify-end px-16 pb-20 overflow-hidden max-[1279px]:px-[44px] max-[1023px]:px-[36px] max-[767px]:px-[24px] max-[479px]:px-[20px] max-[479px]:pb-16 transition-opacity duration-1000",
        !mounted ? "opacity-0" : "opacity-100"
      )}
      onMouseMove={handleMouseMove}
    >
      {showScene && <HeroBackground />}

      {/* Grid Overlay */}
      <div className="absolute inset-0 pointer-events-none z-[1] opacity-[0.03] bg-[linear-gradient(90deg,rgba(200,255,0,0.5)_1px,transparent_1px),linear-gradient(rgba(200,255,0,0.5)_1px,transparent_1px)] bg-[size:100px_100px]" />

      {/* HUD Scanline */}
      <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
        <div className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-lime/40 to-transparent animate-scan" style={{ top: '-10%' }} />
      </div>

      {/* Hudson Corners */}
      <div className="hero-hud fixed inset-0 pointer-events-none z-50 p-6 md:p-10 opacity-20">
        <div className="absolute top-0 left-0 w-24 h-24 border-t border-l border-white/20" />
        <div className="absolute top-0 right-0 w-24 h-24 border-t border-r border-white/20" />
        <div className="absolute bottom-0 left-0 w-24 h-24 border-b border-l border-white/20" />
        <div className="absolute bottom-0 right-0 w-24 h-24 border-b border-r border-white/20" />
      </div>

      <div className="relative z-20 flex flex-col max-w-[1400px] mx-auto w-full">
        <m.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center gap-3 mb-8"
        >
          <div className="w-10 h-px bg-lime/40" />
          <span className="font-mono text-[10px] tracking-[0.24em] uppercase text-lime">
            JSX W&D · DIGITAL FORGE · SOLO STUDIO · IN
          </span>
        </m.div>

        <m.h1
          className="hero-hl uppercase mb-fib-55 select-none"
          style={{
            fontVariationSettings: fontsReady ? fontVariationSettings : "'wght' 900",
            letterSpacing,
            willChange: "font-variation-settings, letter-spacing"
          }}
        >
          <div className="overflow-hidden py-2">
            <span className="block">{splitText("Design.", 0.2)}</span>
          </div>
          <div className="overflow-hidden py-2">
            <span className="block text-white/10 max-[767px]:[-webkit-text-stroke:1px_rgba(237,233,223,0.15)]">
              <ScrambleOutline
                text="Develop."
                className="[-webkit-text-stroke:2px_rgba(237,233,223,0.35)] text-transparent"
              />
              <span className="font-body italic font-extralight text-[clamp(var(--fib-55),6vw,var(--fib-89))] normal-case text-lime/25 align-middle ml-fib-13 max-[767px]:hidden">Build.</span>
            </span>
          </div>
          <div className="overflow-hidden py-2">
            <span className="block text-lime">{splitText("Define.", 0.6)}</span>
          </div>
        </m.h1>

        <m.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.1, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col md:flex-row justify-between items-start md:items-end gap-12"
        >
          <div className="max-w-[420px]">
            <p className="text-[18px] font-light text-dim leading-[1.4] mb-8 max-[479px]:text-[15px]">
              Crafting premium digital experiences through 1:1 collaboration. I build what agencies charge 10x for — <span className="grad-text">unmatched quality</span> with <span className="grad-text">zero handoff loss</span>.
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <button
                className="btn-p bg-lime text-bg font-display font-black text-base tracking-[0.14em] uppercase px-9 h-[58px] flex items-center justify-center hover:bg-white transition-all cursor-none"
                onClick={() => document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' })}
                aria-label="View selected design and development projects"
              >
                View My Work
              </button>
              <button
                className="btn-o font-mono font-bold text-[13.5px] tracking-[0.16em] uppercase text-white border border-white/20 px-8 h-[58px] flex items-center justify-center hover:text-lime hover:border-lime/40 hover:bg-white/5 transition-all cursor-none"
                onClick={() => window.dispatchEvent(new CustomEvent("open-contact-modal"))}
                aria-label="Start a conversation about your project"
              >
                Let&apos;s Talk →
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 lg:flex gap-10 lg:gap-14 pt-8 md:pt-0 border-t border-white/5 md:border-none w-full md:w-auto">
            {stats.map((stat, i) => (
              <div key={i} className="flex flex-col gap-1">
                <span className="font-display font-black text-[58px] text-lime leading-none max-[479px]:text-[48px]">{stat.value}</span>
                <span className="font-mono text-[11px] tracking-[0.18em] uppercase text-muted whitespace-nowrap">{stat.label}</span>
              </div>
            ))}
          </div>
        </m.div>
      </div>

      {/* Decorative vertical line */}
      <div className="absolute left-1/2 bottom-0 w-px h-24 bg-gradient-to-b from-lime/40 to-transparent z-10 hidden md:block" />
    </section>
  );
}
