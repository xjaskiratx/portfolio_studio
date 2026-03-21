"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export function Preloader() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => setLoading(false), 500);
          return 100;
        }
        return prev + 2;
      });
    }, 30);

    return () => clearInterval(timer);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.04 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[99999] bg-bg flex flex-col items-center justify-center pointer-events-none"
        >
          <div className="relative w-[min(480px,80vw)]">
            {/* SVG Ghost Path */}
            <svg viewBox="0 0 480 80" className="w-full fill-none stroke-lime/10 stroke-[2]">
               <path d="M20,64 L20,16 L52,16 L52,38 L36,38 M80,16 L64,38 L80,64 M64,38 L56,64 M110,16 L95,64 M95,16 L125,64 M148,16 L148,64 M148,16 L172,16 C185,16 192,24 192,38 C192,52 185,64 172,64 L148,64 M220,64 L220,16 M220,16 L244,16 C257,16 264,26 264,38 C264,50 257,64 244,64 L220,64 M244,40 L264,64"/>
               <path d="M295,16 L310,56 L325,16 L340,56 L355,16 M375,40 L395,40 M385,16 L385,64 M385,16 C400,16 410,24 410,32 C410,40 400,44 385,44 M385,44 C400,44 412,52 412,58 C412,66 400,64 385,64"/>
            </svg>
            
            {/* Animated Path */}
            <motion.svg viewBox="0 0 480 80" className="absolute inset-0 w-full fill-none stroke-lime stroke-[2]">
               <motion.path 
                 initial={{ pathLength: 0 }}
                 animate={{ pathLength: 1 }}
                 transition={{ duration: 2.2, ease: "easeInOut", delay: 0.3 }}
                 d="M20,64 L20,16 L52,16 L52,38 L36,38 M80,16 L64,38 L80,64 M64,38 L56,64 M110,16 L95,64 M95,16 L125,64 M148,16 L148,64 M148,16 L172,16 C185,16 192,24 192,38 C192,52 185,64 172,64 L148,64 M220,64 L220,16 M220,16 L244,16 C257,16 264,26 264,38 C264,50 257,64 244,64 L220,64 M244,40 L264,64"
               />
               <motion.path 
                 initial={{ pathLength: 0 }}
                 animate={{ pathLength: 1 }}
                 transition={{ duration: 1.5, ease: "easeInOut", delay: 1.1 }}
                 d="M295,16 L310,56 L325,16 L340,56 L355,16 M375,40 L395,40 M385,16 L385,64 M385,16 C400,16 410,24 410,32 C410,40 400,44 385,44 M385,44 C400,44 412,52 412,58 C412,66 400,64 385,64"
               />
            </motion.svg>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            transition={{ delay: 2 }}
            className="font-mono text-[10px] tracking-[0.3em] uppercase text-lime mt-8"
          >
            Digital Forge Studio · Ludhiana, India
          </motion.div>

          {/* Progress Bar */}
          <div className="w-[min(280px,60vw)] h-[1px] bg-white/5 mt-5 overflow-hidden">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              className="h-full bg-lime"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
