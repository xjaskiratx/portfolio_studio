"use client";

import { useState, useEffect, useRef } from "react";
import { useLenis } from "lenis/react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import Magnetic from "./Magnetic";
import btnS from "./Buttons.module.css";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const navItems = [
  { id: "hero", label: "JSX W&D" },
  { id: "services", label: "Services" },
  { id: "work", label: "Work" },
  { id: "about", label: "About" },
  { id: "process", label: "Forge" },
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
    const sections = ["hero", "services", "work", "about", "process", "cta"];
    
    // Defer observation to ensure dynamic components are in the DOM
    const timer = setTimeout(() => {
      const sectionElements = sections.map(id => document.getElementById(id)).filter(Boolean) as HTMLElement[];

      const observerOptions = {
        root: null,
        rootMargin: "-40% 0% -40% 0%",
        threshold: [0, 0.1]
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

      (window as any)._navObserver = observer;
    }, 800);

    return () => {
      clearTimeout(timer);
      if ((window as any)._navObserver) {
        (window as any)._navObserver.disconnect();
      }
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
      className="fixed bottom-4 md:bottom-6 left-1/2 -translate-x-1/2 z-[800] transition-opacity duration-400 ease-out w-fit min-w-[220px] max-w-[90vw] md:w-auto"
    >
      <div className="relative">
        <div
          className="pill-track relative flex items-center bg-[rgba(13,13,21,0.86)] backdrop-blur-[28px] border border-white/10 shadow-[0_12px_44px_rgba(0,0,0,0.5)] transition-all duration-500 rounded-full p-1 md:p-1.5 gap-0"
        >
          {/* Mobile Layout: Dynamic Section Label + Hire Me */}
          <div className="flex md:hidden items-center w-full justify-between px-2 h-[42px]">
            <div className="flex items-center gap-2 px-3">
              <div className="w-1.5 h-1.5 rounded-full bg-lime animate-pulse" />
              <span className="font-mono text-[10px] tracking-[0.16em] uppercase text-white font-bold">
                {navItems.find(i => i.id === activeTab)?.label}
              </span>
            </div>
            
            <div className="flex items-center h-full">
              <div className="w-px h-4 bg-white/10 mx-1" />
              <button
                onClick={(e) => { e.stopPropagation(); onHireMe(); }}
                className="font-mono text-[10px] tracking-[0.12em] uppercase text-lime px-3 h-full flex items-center justify-center transition-all active:scale-95 whitespace-nowrap"
              >
                Hire Me →
              </button>
            </div>
          </div>

          {/* Desktop Layout: All Nav Items */}
          <div className="hidden md:flex flex-row items-center h-full w-full justify-start">
            {navItems.map((item, idx) => (
              <div key={item.id} className="flex items-center h-full">
                <Magnetic strength={0.22}>
                  <button
                    onClick={(e) => { e.stopPropagation(); scrollTo(item.id); }}
                    aria-label={`Scroll to ${item.label} section`}
                    className={cn(
                      btnS.pItem,
                      "font-mono text-[11.5px] tracking-[0.12em] uppercase transition-all duration-300 cursor-none select-none px-4 flex items-center justify-center rounded-full h-[38px] leading-none",
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
                className={`${btnS.pCta} font-mono text-[11.5px] tracking-[0.12em] uppercase text-lime border border-lime/25 px-5 h-[38px] flex items-center justify-center rounded-full transition-all duration-300 ease-out hover:bg-lime/10 hover:border-lime/60 hover:shadow-[0_0_25px_rgba(200,255,0,0.1)] cursor-none leading-none whitespace-nowrap`}
              >
                Hire&nbsp;Me →
              </button>
            </Magnetic>
          </div>
        </div>
      </div>
    </nav>
  );
}
