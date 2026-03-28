import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface MarqueeProps {
  items: string[];
  separator?: string;
  speed?: number; // duration in seconds
  direction?: "left" | "right";
  className?: string;
  variant?: "lime" | "dark";
}

import styles from "./Marquee.module.css";

export function Marquee({
  items,
  separator = "✦",
  speed = 12,
  direction = "left",
  className,
  variant = "lime",
}: MarqueeProps) {
  const content = [...items, ...items, ...items, ...items]; // Duplicate for seamless loop

  return (
    <div 
      data-cursor="ch"
      className={cn(
        styles.marqueeContainer,
        variant === "lime" ? "bg-lime text-bg" : "bg-bg2 text-white/80",
        className
      )}
    >
      <div
        className={cn(
          styles.marqueeTrack,
          direction === "left" ? styles.animateLeft : styles.animateRight
        )}
        style={{ 
          animationDuration: `${speed}s`,
        }}
      >
        {content.map((item, i) => (
          <div key={i} className="flex items-center">
            <span className={cn(
              "font-display font-bold uppercase tracking-widest px-[22px]",
              variant === "lime" ? "text-sm" : "text-[15px]"
            )}>
              {item}
            </span>
            <span className="opacity-30 font-black">{separator}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
