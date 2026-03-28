"use client";

import { useEffect, useState, useRef } from "react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
import { isSafari } from "@/lib/browser";

export function Cursor() {
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [isSafariBrowser, setIsSafariBrowser] = useState(false);
  
  useEffect(() => {
    setIsTouchDevice(window.matchMedia("(pointer: coarse)").matches);
    setIsSafariBrowser(isSafari);
  }, []);
  const [cursorState, setCursorState] = useState<"" | "ch" | "cv" | "cta" | "cdrag">("");
  
  const mousePos = useRef({ x: 0, y: 0 });
  const springPos = useRef({ x: 0, y: 0 });
  
  const cdotRef = useRef<HTMLDivElement>(null);
  const cringRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);

  // Trail Dot Pool state
  const containerRef = useRef<HTMLDivElement>(null);
  const dotsRef = useRef<Array<{ el: HTMLDivElement; x: number; y: number; active: boolean; age: number }>>([]);
  const rafRef = useRef<number | null>(null);

  // 1. Cursor Smoothing (Spring Logic)
  useEffect(() => {
    if (isTouchDevice) return;

    const updateSpring = () => {
      // Lerp for the outer ring "spring" effect
      const dx = mousePos.current.x - springPos.current.x;
      const dy = mousePos.current.y - springPos.current.y;
      
      springPos.current.x += dx * 0.08;
      springPos.current.y += dy * 0.08;
      
      // Direct DOM updates to bypass React re-renders and state lag
      if (cdotRef.current) {
        cdotRef.current.style.transform = `translate3d(${mousePos.current.x}px, ${mousePos.current.y}px, 0) translate(-50%, -50%)`;
      }
      
      const ringTransform = `translate3d(${springPos.current.x}px, ${springPos.current.y}px, 0) translate(-50%, -50%)`;
      if (cringRef.current) {
        cringRef.current.style.transform = ringTransform;
      }
      if (labelRef.current) {
        labelRef.current.style.transform = ringTransform;
      }

      rafRef.current = requestAnimationFrame(updateSpring);
    };

    rafRef.current = requestAnimationFrame(updateSpring);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [isTouchDevice]);

  // 2. Trail Dot — Dot Pool Logic
  useEffect(() => {
    if (isTouchDevice || isSafariBrowser) return;

    const poolSize = 16;
    const container = containerRef.current;
    if (!container) return;

    container.innerHTML = "";
    dotsRef.current = [];

    for (let i = 0; i < poolSize; i++) {
      const el = document.createElement("div");
      el.className = "trail-dot";
      container.appendChild(el);
      dotsRef.current.push({ el, x: 0, y: 0, active: false, age: 0 });
    }

    let lastTime = 0;
    let spawnTimer = 0;
    const spawnRate = 30;

    const updateTrail = (time: number) => {
      const dt = time - lastTime;
      lastTime = time;
      spawnTimer += dt;

      if (spawnTimer >= spawnRate) {
        spawnTimer = 0;
        let spawned = 0;
        const maxSpawn = 2;

        for (let i = 0; i < dotsRef.current.length && spawned < maxSpawn; i++) {
          const d = dotsRef.current[i];
          if (!d.active) {
            d.active = true;
            d.age = 0;
            d.x = mousePos.current.x;
            d.y = mousePos.current.y;
            d.el.style.opacity = "1";
            d.el.style.transform = `translate3d(${d.x}px, ${d.y}px, 0) scale(1)`;
            spawned++;
          }
        }
      }

      dotsRef.current.forEach((d) => {
        if (!d.active) return;
        d.age += 0.02;
        if (d.age >= 1) {
          d.active = false;
          d.el.style.opacity = "0";
          return;
        }
        const s = 1 - d.age;
        d.el.style.opacity = s.toString();
        d.el.style.transform = `translate3d(${d.x}px, ${d.y}px, 0) scale(${s})`;
      });
    };

    // Note: Trail is updated in the same RAF loop if desired, but we'll separate for clarity if needed.
    // Actually, we can hook it into the main loop or have its own.
    const trailLoop = (time: number) => {
        updateTrail(time);
        requestAnimationFrame(trailLoop);
    };
    const trailRaf = requestAnimationFrame(trailLoop);

    return () => {
      cancelAnimationFrame(trailRaf);
      if (container) container.innerHTML = "";
      dotsRef.current = [];
    };
  }, [isTouchDevice, isSafariBrowser]);

  useEffect(() => {
    if (isTouchDevice) return;

    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const hoverParent = target.closest("[data-cursor]") as HTMLElement;
      
      if (hoverParent) {
        setCursorState(hoverParent.dataset.cursor as "" | "ch" | "cv" | "cta" | "cdrag");
      } else if (
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.closest("a") ||
        target.closest("button") ||
        target.closest("[data-tilt]") ||
        target.classList.contains("p-item") ||
        target.classList.contains("vw-row")
      ) {
        setCursorState("ch");
      } else {
        setCursorState("");
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, [isTouchDevice]);

  const labels = {
    cv: "View Project",
    cta: "Hire Me",
    cdrag: "Drag",
    ch: "",
    "": ""
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (isSafariBrowser) {
        document.documentElement.classList.add('is-safari');
      } else {
        document.documentElement.classList.remove('is-safari');
      }
    }
  }, [isSafariBrowser]);

  if (isTouchDevice) return null;

  return (
    <>
      {/* Dot Pool Container */}
      <div ref={containerRef} id="trail-container" className="cursor-chrome fixed inset-0 pointer-events-none z-[9990]" />

      {/* Center Dot */}
      <div
        id="cdot"
        ref={cdotRef}
        className="cursor-chrome fixed top-0 left-0 w-2 h-2 rounded-full pointer-events-none z-[200001] bg-lime"
        style={{
          mixBlendMode: "difference",
          opacity: cursorState === "cv" ? 0.5 : 1,
          willChange: "transform"
        }}
      />
      {/* Outer Ring */}
      <div
        id="cring"
        ref={cringRef}
        className="cursor-chrome fixed top-0 left-0 border border-lime/35 pointer-events-none z-[200000] transition-[border-color,background-color] duration-300 ease-out"
        style={{
          width: '42px',
          height: '42px',
          borderRadius: cursorState === "cta" ? "4px" : "50%",
          borderColor: cursorState ? "rgba(200, 255, 0, 0.65)" : "rgba(200, 255, 0, 0.35)",
          backgroundColor: cursorState === "cv" ? "rgba(200, 255, 0, 0.06)" : "rgba(0, 0, 0, 0)",
          willChange: "transform"
        }}
      />
      
      {/* Context Label */}
      <div
        ref={labelRef}
        className={cn(
          "cursor-chrome fixed top-0 left-0 pointer-events-none z-[200000] font-mono text-[8.5px] tracking-[0.12em] uppercase text-lime whitespace-nowrap text-center font-bold transition-opacity duration-300",
          labels[cursorState] ? "opacity-100" : "opacity-0"
        )}
      >
        {labels[cursorState]}
      </div>
    </>
  );
}
