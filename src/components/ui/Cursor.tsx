"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useSpring, useMotionValue, AnimatePresence } from "framer-motion";
import { isSafari } from "@/lib/browser";

export function Cursor() {
  const [isSafariBrowser, setIsSafariBrowser] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [cursorState, setCursorState] = useState<"" | "ch" | "cv" | "cta" | "cdrag">("");
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const mousePos = useRef({ x: 0, y: 0 });

  const springConfig = { damping: 25, stiffness: 250 };
  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);

  // Trail Dot Pool state
  const containerRef = useRef<HTMLDivElement>(null);
  const dotsRef = useRef<Array<{ el: HTMLDivElement; x: number; y: number; active: boolean; age: number }>>([]);
  const rafRef = useRef<number | null>(null);

  // 1. Cursor Trail — Dot Pool Logic (Hard Disabled on Safari for Performance)
  useEffect(() => {
    setIsSafariBrowser(isSafari);
    setIsTouchDevice(window.matchMedia("(pointer: coarse)").matches);

    if (isTouchDevice || isSafariBrowser) {
      if (containerRef.current) containerRef.current.innerHTML = "";
      dotsRef.current = [];
      return;
    }

    const poolSize = 16;
    const container = containerRef.current;
    if (!container) return;

    container.innerHTML = "";
    dotsRef.current = [];

    // Initialize Pool
    for (let i = 0; i < poolSize; i++) {
      const el = document.createElement("div");
      el.className = "trail-dot";
      container.appendChild(el);
      dotsRef.current.push({ el, x: 0, y: 0, active: false, age: 0 });
    }

    let lastTime = 0;
    let spawnTimer = 0;
    const spawnRate = 30; // ms

    const update = (time: number) => {
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
            d.x = mouseX.get();
            d.y = mouseY.get();
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

      rafRef.current = requestAnimationFrame(update);
    };

    rafRef.current = requestAnimationFrame(update);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      if (container) container.innerHTML = "";
      dotsRef.current = [];
    };
  }, [mouseX, mouseY, isTouchDevice, isSafariBrowser]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
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
  }, [mouseX, mouseY]);

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

  if (isSafariBrowser) return null;

  return (
    <>
      {/* Dot Pool Container */}
      <div ref={containerRef} id="trail-container" className="fixed inset-0 pointer-events-none z-[9990]" />

      {/* Center Dot */}
      <motion.div
        id="cdot"
        className="fixed top-0 left-0 w-2 h-2 rounded-full pointer-events-none z-[200001] bg-lime"
        style={{
          x: mouseX,
          y: mouseY,
          mixBlendMode: "difference",
          opacity: 1,
        }}
        animate={{
          scale: cursorState === "ch" ? 0.6 : cursorState === "cv" ? 0.5 : 1,
          opacity: cursorState === "cv" ? 0.5 : 1,
        }}
      />
      {/* Outer Ring */}
      <motion.div
        id="cring"
        className="fixed top-0 left-0 border border-lime/35 pointer-events-none z-[200000]"
        style={{
          x: springX,
          y: springY,
        }}
        animate={{
          width: cursorState === "ch" ? 62 : cursorState === "cv" ? 82 : cursorState === "cta" ? 90 : 42,
          height: cursorState === "ch" ? 62 : cursorState === "cv" ? 82 : cursorState === "cta" ? 90 : 42,
          borderRadius: cursorState === "cta" ? "4px" : "50%",
          borderColor: cursorState ? "rgba(200, 255, 0, 0.65)" : "rgba(200, 255, 0, 0.35)",
          backgroundColor: cursorState === "cv" ? "rgba(200, 255, 0, 0.06)" : "rgba(0, 0, 0, 0)",
        }}
        transition={{ type: "spring", damping: 30, stiffness: 200 }}
      />
      
      {/* Context Label */}
      <AnimatePresence>
        {labels[cursorState] && (
          <motion.div
            key={cursorState}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed top-0 left-0 pointer-events-none z-[200000] font-mono text-[8.5px] tracking-[0.12em] uppercase text-lime whitespace-nowrap text-center font-bold"
            style={{
              x: springX,
              y: springY,
              translateX: "-50%",
              translateY: "-50%",
            }}
          >
            {labels[cursorState]}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
