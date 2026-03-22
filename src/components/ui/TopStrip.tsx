"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function TopStrip() {
  const [isVisible, setIsVisible] = useState(true);
  const [time, setTime] = useState("");
  const sentinelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0 }
    );

    if (sentinelRef.current) {
      observer.observe(sentinelRef.current);
    }

    return () => observer.disconnect();
  }, []);

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
    <>
      <div ref={sentinelRef} className="absolute top-0 left-0 w-px h-[80px] pointer-events-none" />
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="fixed top-0 left-0 right-0 z-[400] px-10 py-[18px] flex justify-between pointer-events-none max-[479px]:hidden"
          >
            <span
              className="font-mono text-[9.5px] tracking-[0.22em] uppercase text-white/72 [text-shadow:0_0_18px_rgba(0,0,0,0.45)]"
              suppressHydrationWarning
            >
              JSX.W&D / SOLO STUDIO /{" "}
              <span className="text-lime/78" suppressHydrationWarning>
                {time || "LUD ···"}
              </span>
            </span>
            <span className="font-mono text-[9.5px] tracking-[0.22em] uppercase text-white/68 [text-shadow:0_0_18px_rgba(0,0,0,0.45)] flex items-center gap-1.5">
              OPEN FOR PROJECTS
              <span className="inline-block w-[6px] h-[6px] bg-lime rounded-full shadow-[0_0_14px_rgba(200,255,0,0.55)] animate-[pulse_2s_ease-in-out_infinite]" />
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
