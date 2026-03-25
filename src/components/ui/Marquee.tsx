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
        "overflow-hidden whitespace-nowrap user-select-none py-3 flex items-center border-y border-border-subtle group my-12 md:my-20",
        variant === "lime" ? "bg-lime text-bg" : "bg-bg2 text-white/80",
        className
      )}
    >
      <div
        className={cn(
          "flex shrink-0 items-center min-w-full",
          direction === "left" ? "animate-marquee-left" : "animate-marquee-right"
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
