"use client";

import { useEffect, useState, useRef } from "react";
import dynamic from "next/dynamic";
import styles from "./Hero.module.css";
import btnS from "@/components/ui/Buttons.module.css";
const HeroBackground = dynamic(() => import("./HeroBackground").then(mod => mod.HeroBackground), { ssr: false });
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

import { ScrambleOutline } from "@/components/ui/ScrambleOutline";
import { useLenis } from "lenis/react";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const stats = [
  { label: "Direct Collaboration", value: "1:1" },
  { label: "Digital Artifacts", value: "20+" },
  { label: "Avg. Ship Time", value: "< 14D" },
  { label: "Client Retention", value: "92%" },
];

import { isSafari, isMobile } from "@/lib/browser";

export function Hero() {
  const [mounted, setMounted] = useState(false);
  const [fontsReady, setFontsReady] = useState(false);
  const [showScene, setShowScene] = useState(false);

  const heroRef = useRef<HTMLDivElement>(null);
  const defineRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const targetScrollRef = useRef<number>(0);
  const rafId = useRef<number>(0);

  // Mobile Smoothness Refs (Manual Lerp)
  const mobileTargetProgress = useRef<number>(0);
  const mobileCurrentProgress = useRef<number>(0);
  const mobileRafId = useRef<number>(0);

  useEffect(() => {
    setMounted(true); // eslint-disable-line react-hooks/set-state-in-effect
    if (isSafari && typeof document !== 'undefined') {
      document.fonts.ready.then(() => setFontsReady(true));
    } else {
      setFontsReady(true);
    }

    const observer = new IntersectionObserver((entries) => {
      setShowScene(entries[0].isIntersecting);
    }, { rootMargin: '200px' });

    const updateTarget = () => {
      if (!defineRef.current || !heroRef.current) return;
      const rectDefine = defineRef.current.getBoundingClientRect();
      const scrollY = window.scrollY;
      targetScrollRef.current = (scrollY + rectDefine.top) + rectDefine.height * 0.75;
    };

    const resizer = new ResizeObserver(() => {
      requestAnimationFrame(updateTarget);
    });

    // Stagger observation to avoid hydration-time reflows
    const timer = setTimeout(() => {
      if (heroRef.current) {
        resizer.observe(heroRef.current);
        observer.observe(heroRef.current);
      }
    }, 800);

    return () => {
      clearTimeout(timer);
      resizer.disconnect();
      observer.disconnect();
      window.removeEventListener('resize', updateTarget);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, []);

  const updateProgress = (scroll: number) => {
    if (targetScrollRef.current === 0 || !headlineRef.current) return;

    // Smooth the update with RAF
    if (rafId.current) cancelAnimationFrame(rafId.current);
    rafId.current = requestAnimationFrame(() => {
      if (!headlineRef.current) return;
      const p = Math.min(Math.max(scroll / targetScrollRef.current, 0), 1);
      headlineRef.current.style.setProperty("--hero-p", p.toString());
    });
  };

  // 1. Lenis sync for Desktop
  useLenis(({ scroll }) => {
    if (isMobile) return;
    updateProgress(scroll);
  });

  // 2. Mobile Smoothness Loop (Native Sync + Manual Lerp)
  useEffect(() => {
    if (!isMobile) return;

    const lerp = (start: number, end: number, factor: number) => start + (end - start) * factor;

    const updateMobileProgress = () => {
      if (!headlineRef.current) return;

      const prev = mobileCurrentProgress.current;
      // High-precision lerp for premium 'gummy' feel
      mobileCurrentProgress.current = lerp(prev, mobileTargetProgress.current, 0.08);

      // Apply interpolated progress
      headlineRef.current.style.setProperty("--hero-p", mobileCurrentProgress.current.toString());

      // Continue loop if still far from target
      if (Math.abs(mobileCurrentProgress.current - mobileTargetProgress.current) > 0.0001) {
        mobileRafId.current = requestAnimationFrame(updateMobileProgress);
      } else {
        mobileRafId.current = 0;
      }
    };

    const handleScroll = () => {
      if (targetScrollRef.current === 0) return;
      const scrollY = window.scrollY;
      mobileTargetProgress.current = Math.min(Math.max(scrollY / targetScrollRef.current, 0), 1);

      if (!mobileRafId.current) {
        mobileRafId.current = requestAnimationFrame(updateMobileProgress);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (mobileRafId.current) cancelAnimationFrame(mobileRafId.current);
    };
  }, []);

  const splitText = (text: string, delay: number = 0) => {
    return text.split("").map((char, i) => (
      <span key={i} className="char in" style={{ transitionDelay: `${delay + i * 0.03}s` }}>
        {char === " " ? "\u00A0" : char}
      </span>
    ));
  };

  return (
    <section
      id="hero"
      ref={heroRef}
      className={cn(
        "relative min-h-svh flex flex-col justify-end px-16 pb-20 overflow-hidden max-[1279px]:px-11 max-[1023px]:px-9 max-[767px]:px-6 max-[479px]:px-5 max-[479px]:pb-16 transition-opacity duration-1000",
        !mounted ? "opacity-0" : "opacity-100"
      )}
    >
      {showScene && <HeroBackground />}

      {/* Global "True Light" Graph Grid is now handled in globals.css */}

      <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
        <div className="absolute left-0 right-0 h-px bg-linear-to-r from-transparent via-lime/40 to-transparent animate-scan" style={{ top: '-10%' }} />
      </div>

      <div className="hero-hud fixed inset-0 pointer-events-none z-50 p-6 md:p-10 opacity-20">
        <div className="absolute top-0 left-0 w-24 h-24 border-t border-l border-white/20" />
        <div className="absolute top-0 right-0 w-24 h-24 border-t border-r border-white/20" />
        <div className="absolute bottom-0 left-0 w-24 h-24 border-b border-l border-white/20" />
        <div className="absolute bottom-0 right-0 w-24 h-24 border-b border-r border-white/20" />
      </div>

      <div className="relative z-20 flex flex-col max-w-350 mx-auto w-full">
        <div className={cn("flex flex-col md:flex-row items-center md:items-center gap-2 md:gap-3 mb-8 w-full rv", mounted && "in")}>
          <div className="w-10 h-px bg-lime/40 hidden md:block" />
          <span className="font-mono text-[14px] tracking-[0.24em] uppercase text-lime">
            JSX W&D · DIGITAL FORGE
          </span>
        </div>

        <h1
          ref={headlineRef}
          className={`${styles.heroHl} uppercase mb-fib-55 select-none`}
          style={{
            fontVariationSettings: fontsReady ? " 'wght' calc(900 - var(--hero-p, 0) * 800) " : " 'wght' 900 ",
            letterSpacing: " calc(-0.025em + var(--hero-p, 0) * 0.08em) ",
            willChange: "font-variation-settings, letter-spacing"
          } as React.CSSProperties}
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
            </span>
          </div>
          <div className="overflow-hidden py-2" ref={defineRef}>
            <span className="block text-lime">{splitText("Define.", 0.6)}</span>
          </div>
        </h1>

        <div className={cn("flex flex-col rv", mounted && "in")} style={{ transitionDelay: '1s' }}>
          {/* Paragraph + Metrics Row */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-start gap-10 md:gap-12 mb-10 md:mb-0">
            <div className="max-w-105 w-full">
              <p className="text-[18px] font-light text-dim leading-[1.4] max-[479px]:text-[15px] text-justify md:text-left [text-align-last:center] md:[text-align-last:left]">
                JSX Studios builds what agencies charge 10x for - with <span className="grad-text">unmatched quality</span> and <span className="grad-text">zero handoff loss</span>.
              </p>
            </div>

            <div className="grid grid-cols-2 lg:flex gap-10 lg:gap-14 pt-8 md:pt-0 border-t border-white/5 md:border-none w-full md:w-auto">
              {stats.map((stat, i) => (
                <div key={i} className="flex flex-col gap-0.5">
                  <span className="font-display font-black text-[58px] text-lime leading-none max-[479px]:text-[48px]">{stat.value}</span>
                  <span className="font-mono text-[14px] tracking-[0.18em] uppercase text-muted whitespace-nowrap">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

      <div className="absolute left-1/2 bottom-0 w-px h-24 bg-linear-to-b from-lime/40 to-transparent z-10 hidden md:block" />
    </section>
  );
}
