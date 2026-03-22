"use client";

import { motion } from "framer-motion";

interface MiniServiceItemProps {
  name: string;
  index: number;
}

export function MiniServiceItem({ name, index }: MiniServiceItemProps) {
  return (
    <motion.div
      className="rv si group/mini bg-bg p-[34px_48px] flex items-center gap-5 cursor-none transition-all duration-500 hover:bg-[#0e0e16]"
      style={{ transitionDelay: `${0.1 * index}s` }}
    >
      <div className="w-[10px] h-[10px] bg-lime shrink-0 [clip-path:polygon(50%_0,100%_50%,50%_100%,0_50%)] group-hover/mini:rotate-[45deg] group-hover/mini:scale-150 transition-all duration-500" />
      <span className="font-display font-black text-[22px] uppercase group-hover/mini:text-lime transition-colors tracking-tighter">
        {name}
      </span>
    </motion.div>
  );
}
