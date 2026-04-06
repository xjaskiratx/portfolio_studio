"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function Preloader() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [isAnimating, setIsAnimating] = useState(true);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          timeoutId = setTimeout(() => {
            setIsAnimating(false);
            setTimeout(() => setLoading(false), 800);
          }, 500);
          return 100;
        }
        return prev + 2.5; // Slightly faster for a snappier feel
      });
    }, 35);

    return () => {
      clearInterval(timer);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, []);

  if (!loading) return null;

  return (
    <div
      className={cn(
        "fixed inset-0 z-[99999] bg-bg flex flex-col items-center justify-center pointer-events-none transition-all duration-800 ease-out",
        isAnimating ? "opacity-100 scale-100" : "opacity-0 scale-105"
      )}
    >
      <div className="flex flex-col items-center text-center">
        {/* Main Title: JSX Studios */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="font-display text-[clamp(2.5rem,8vw,5.5rem)] leading-none text-lime uppercase tracking-tighter"
        >
          JSX Studios
        </motion.div>

        {/* Sub-Title: SOLO STUDIO */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.35 }}
          transition={{ delay: 0.4, duration: 1 }}
          className="font-mono text-[clamp(0.65rem,1.5vw,0.85rem)] tracking-[0.6em] uppercase text-lime mt-4"
        >
          SOLO STUDIO
        </motion.div>
      </div>

      {/* Progress Bar Container */}
      <div className="absolute bottom-20 flex flex-col items-center w-full px-10">
        <div className="w-[min(320px,70vw)] h-[1px] bg-white/5 overflow-hidden">
          <motion.div 
            initial={{ width: "0%" }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.1, ease: "linear" }}
            className="h-full bg-lime"
          />
        </div>
        
        {/* Progress Counter (Subtle) */}
        <div className="font-mono text-[9px] text-lime/20 mt-3 tabular-nums tracking-widest">
          {Math.floor(progress)}%
        </div>
      </div>

      {/* Grain/Texture logic if needed can be added here, but keep it minimal */}
    </div>
  );
}
