"use client";

import { useEffect, useState } from "react";
import { motion, useSpring, useMotionValue, AnimatePresence } from "framer-motion";

export function Cursor() {
  const [cursorState, setCursorState] = useState<"" | "ch" | "cv" | "cta" | "cdrag">("");
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 250 };
  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
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

  return (
    <>
      {/* Center Dot */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 bg-lime rounded-full pointer-events-none z-[200001] mix-blend-difference"
        style={{
          x: mouseX,
          y: mouseY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          scale: cursorState === "ch" ? 0.6 : cursorState === "cv" ? 0.5 : 1,
          opacity: cursorState === "cv" ? 0.5 : 1,
        }}
      />
      {/* Outer Ring */}
      <motion.div
        className="fixed top-0 left-0 border border-lime/35 pointer-events-none z-[200000]"
        style={{
          x: springX,
          y: springY,
          translateX: "-50%",
          translateY: "-50%",
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
