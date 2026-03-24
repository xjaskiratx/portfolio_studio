"use client";

import { useState, useEffect, useRef } from "react";
import { m, AnimatePresence } from "framer-motion";
import { useLenis } from "lenis/react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import Magnetic from "./Magnetic";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const navItems = [
  { id: "hero", label: "JSX W&D" },
  { id: "about", label: "About" },
  { id: "services", label: "Services" },
  { id: "work", label: "Work" },
  { id: "cta", label: "Talk" },
];

interface PillNavProps {
  onHireMe: () => void;
}

export function PillNav({ onHireMe }: PillNavProps) {
  const [activeTab, setActiveTab] = useState("hero");
  const [isExpanded, setIsExpanded] = useState(false);
  const [expandTimeout, setExpandTimeout] = useState<NodeJS.Timeout | null>(null);

  const navRef = useRef<HTMLElement>(null);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const lastScrollY = useRef(0);

  const handleMouseEnter = () => {
    // No-op
  };

  const handleMouseLeave = () => {
    // No-op
  };

  useLenis((lenis) => {
    const scrollY = lenis.scroll;
    const diff = Math.abs(scrollY - lastScrollY.current);
    lastScrollY.current = scrollY;

    if (diff > 8 && navRef.current) {
      if (!navRef.current.classList.contains("dimmed")) {
        navRef.current.classList.add("dimmed");
      }
      
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
      scrollTimeoutRef.current = setTimeout(() => {
        navRef.current?.classList.remove("dimmed");
      }, 600);
    }
  });

  useEffect(() => {
    const sections = ["hero", "about", "services", "work", "cta"];
    const sectionElements = sections.map(id => document.getElementById(id)).filter(Boolean) as HTMLElement[];

    const observerOptions = {
      root: null,
      rootMargin: "-20% 0% -70% 0%",
      threshold: [0, 0.1, 0.5, 1.0]
    };

    const handleIntersect = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveTab(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, observerOptions);
    sectionElements.forEach(el => observer.observe(el));

    return () => {
      observer.disconnect();
    };
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    setActiveTab(id);
    const top = el.getBoundingClientRect().top + window.scrollY - 80;
    window.scrollTo({ top, behavior: "smooth" });
  };

  return (
    <nav
      ref={navRef}
      id="pill-nav"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[800] transition-opacity duration-400 ease-out"
    >
      <div className="relative">
        <m.div
          className="pill-track relative flex items-center bg-[rgba(13,13,21,0.86)] backdrop-blur-[28px] border border-white/10 shadow-[0_12px_44px_rgba(0,0,0,0.5)] transition-all duration-500 rounded-full p-1.5 gap-0"
        >
          <div className="flex flex-row items-center h-full">
            {navItems.map((item, idx) => (
              <div key={item.id} className="flex items-center h-full">
                <Magnetic strength={0.22}>
                  <button
                    onClick={(e) => { e.stopPropagation(); scrollTo(item.id); }}
                    aria-label={`Scroll to ${item.label} section`}
                    className={cn(
                      "p-item font-mono text-[11.5px] tracking-[0.12em] uppercase transition-all duration-300 cursor-none select-none px-4 flex items-center justify-center rounded-full h-[38px] leading-none",
                      activeTab === item.id
                        ? "bg-lime text-bg font-bold shadow-[0_0_20px_rgba(200,255,0,0.2)]"
                        : "text-white/72 hover:text-white"
                    )}
                  >
                    {item.label}
                  </button>
                </Magnetic>
                {idx < navItems.length - 1 && (
                  <span className="p-sep text-white/5 px-[1px] text-[10px] select-none flex items-center">·</span>
                )}
              </div>
            ))}

            <div className="w-px h-6 bg-white/5 mx-2" />

            <Magnetic strength={0.4}>
              <button
                onClick={(e) => { e.stopPropagation(); onHireMe(); }}
                data-cursor="cta"
                aria-label="Open contact form to hire me"
                className="p-cta font-mono text-[11.5px] tracking-[0.12em] uppercase text-lime border border-lime/25 px-5 h-[38px] flex items-center justify-center rounded-full transition-all duration-300 ease-out hover:bg-lime/10 hover:border-lime/60 hover:shadow-[0_0_25px_rgba(200,255,0,0.1)] cursor-none leading-none"
              >
                Hire Me →
              </button>
            </Magnetic>
          </div>
        </m.div>
      </div>
    </nav>
  );
}
