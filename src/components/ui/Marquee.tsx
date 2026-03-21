"use client";

import { motion } from "framer-motion";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface MarqueeProps {
  items: string[];
  separator?: string;
  speed?: number;
  direction?: "left" | "right";
  className?: string;
  variant?: "lime" | "dark";
}

export function Marquee({
  items,
  separator = "✦",
  speed = 20,
  direction = "left",
  className,
  variant = "lime",
}: MarqueeProps) {
  const content = [...items, ...items, ...items, ...items]; // Duplicate for seamless loop

  return (
    <div 
      data-cursor="ch"
      className={cn(
        "overflow-hidden whitespace-nowrap user-select-none py-3.5 flex items-center border-y border-border-subtle",
        variant === "lime" ? "bg-lime text-bg" : "bg-bg2 text-white/24",
        className
      )}
    >
      <motion.div
        animate={{
          x: direction === "left" ? ["0%", "-50%"] : ["-50%", "0%"],
        }}
        transition={{
          duration: speed,
          ease: "linear",
          repeat: Infinity,
        }}
        className="flex shrink-0 items-center"
      >
        {content.map((item, i) => (
          <div key={i} className="flex items-center">
            <span className={cn(
              "font-display font-bold uppercase tracking-widest px-[22px]",
              variant === "lime" ? "text-sm" : "font-mono text-[9.5px]"
            )}>
              {item}
            </span>
            <span className="opacity-30 font-black">{separator}</span>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
