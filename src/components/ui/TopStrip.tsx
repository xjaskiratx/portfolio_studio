"use client";

import { useEffect, useState, useRef } from "react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function TopStrip() {
  const [isVisible, setIsVisible] = useState(true);
  const sentinelRef = useRef<HTMLDivElement>(null);

  const [time, setTime] = useState<string>("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        timeZone: "Asia/Kolkata",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      };
      const timeString = new Intl.DateTimeFormat("en-US", options).format(now);
      setTime(`${timeString} IST`);
    };

    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

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

  return (
    <>
      <div ref={sentinelRef} className="absolute top-0 left-0 w-px h-[80px] pointer-events-none" />
      <div
        className={cn(
          "fixed top-0 left-0 right-0 z-[400] px-16 py-[18px] mt-4 md:mt-0.5 flex justify-between pointer-events-none transition-all duration-500 ease-out hidden md:flex",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-5 pointer-events-none"
        )}
      >
        <span
          className="font-mono text-[9.5px] tracking-[0.22em] uppercase text-white/72 [text-shadow:0_0_18px_rgba(0,0,0,0.45)] whitespace-nowrap"
          suppressHydrationWarning
        >
          SOLO STUDIO / CA/IN /{" "}
          <span className="text-lime/80 font-bold" suppressHydrationWarning>
            {time || "······"}
          </span>
        </span>
        <span className="font-mono text-[9.5px] tracking-[0.22em] uppercase text-white/68 [text-shadow:0_0_18px_rgba(0,0,0,0.45)] flex items-center gap-1.5 whitespace-nowrap hidden sm:flex">
          OPEN FOR PROJECTS
          <span className="inline-block w-[6px] h-[6px] bg-lime rounded-full shadow-[0_0_14px_rgba(200,255,0,0.55)] animate-[pulse_2s_ease-in-out_infinite]" />
        </span>
      </div>
    </>
  );
}
