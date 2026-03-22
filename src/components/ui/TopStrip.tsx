"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLenis } from "lenis/react";

export function TopStrip() {
  const [isVisible, setIsVisible] = useState(true);
  const [time, setTime] = useState("");

  useLenis((lenis) => {
    const shouldBeVisible = lenis.scroll < 80;
    if (isVisible !== shouldBeVisible) {
      setIsVisible(shouldBeVisible);
    }
  });

  useEffect(() => {
    const updateTime = () => {
      const t = new Date().toLocaleTimeString('en-US', {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      });
      setTime(`LUD ${t}`);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    
    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="fixed top-0 left-0 right-0 z-[400] px-10 py-[18px] flex justify-between pointer-events-none max-[479px]:hidden"
        >
          <span className="font-mono text-[9.5px] tracking-[0.22em] uppercase text-white/62 [text-shadow:0_0_18px_rgba(0,0,0,0.45)]">
            JSX.W&D / SOLO STUDIO / <span className="text-lime/78">{time}</span>
          </span>
          <span className="font-mono text-[9.5px] tracking-[0.22em] uppercase text-white/56 [text-shadow:0_0_18px_rgba(0,0,0,0.45)] flex items-center gap-1.5">
            OPEN FOR PROJECTS 
            <span className="inline-block w-[6px] h-[6px] bg-lime rounded-full shadow-[0_0_14px_rgba(200,255,0,0.55)] animate-[pulse_2s_ease-in-out_infinite]" />
          </span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
