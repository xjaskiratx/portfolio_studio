"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const KONAMI_CODE = [
  "ArrowUp", "ArrowUp", 
  "ArrowDown", "ArrowDown", 
  "ArrowLeft", "ArrowRight", 
  "ArrowLeft", "ArrowRight", 
  "b", "a"
];

export function EasterEgg() {
  const [sequence, setSequence] = useState<string[]>([]);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const newSequence = [...sequence, e.key].slice(-KONAMI_CODE.length);
      setSequence(newSequence);

      if (newSequence.join(",").toLowerCase() === KONAMI_CODE.join(",").toLowerCase()) {
        setShow(true);
        setSequence([]);
      }

      if (e.key === "Escape") {
        setShow(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [sequence]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100000] bg-lime flex flex-col items-center justify-center p-10 cursor-none overflow-hidden"
        >
          {/* Scanline Effect */}
          <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(0,0,0,0)_50%,rgba(0,0,0,0.05)_50%),linear-gradient(90deg,rgba(0,0,0,0.02),rgba(0,0,0,0))] bg-[size:100%_4px,4px_100%] z-10" />
          
          <motion.div
            initial={{ scale: 0.8, y: 40 }}
            animate={{ scale: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
            className="text-center relative z-20"
          >
            <div className="font-mono text-[11px] tracking-[0.4em] uppercase text-bg/40 mb-4 animate-pulse">
              System Breach Detected // 0x534543524554
            </div>
            <h2 className="font-display font-black text-[clamp(60px,12vw,180px)] text-bg leading-[0.82] uppercase mb-8">
              SECRET<br />UNLOCKED.
            </h2>
            <p className="font-mono text-xs tracking-widest uppercase text-bg/60 max-w-lg mx-auto mb-12 leading-loose">
              You&apos;ve entered the solo studio forge. High performance, zero compromises. Enjoy the vibe.
            </p>
            <button 
              onClick={() => setShow(false)}
              className="font-mono text-[11px] tracking-[0.2em] uppercase bg-bg text-lime px-10 py-5 hover:bg-white hover:text-bg transition-all transform hover:scale-105 active:scale-95 shadow-2xl"
              data-cursor="ch"
            >
              Terminate Session →
            </button>
          </motion.div>
          
          {/* HUD Decor */}
          <div className="absolute top-10 left-10 w-20 h-20 border-t-2 border-l-2 border-bg/20" />
          <div className="absolute top-10 right-10 w-20 h-20 border-t-2 border-r-2 border-bg/20" />
          <div className="absolute bottom-10 left-10 w-20 h-20 border-b-2 border-l-2 border-bg/20" />
          <div className="absolute bottom-10 right-10 w-20 h-20 border-b-2 border-r-2 border-bg/20" />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
