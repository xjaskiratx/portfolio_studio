"use client";

import type { ReactNode } from "react";
import { m } from "framer-motion";

export interface ForgeStep {
  num: string;
  title: string;
  desc: string;
}

interface ProcessCardProps {
  step: ForgeStep;
  index: number;
  isLast: boolean;
}

export function ProcessCard({ step, index, isLast }: ProcessCardProps) {
  return (
    <m.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
      viewport={{ once: true }}
      className="group relative bg-bg/80 backdrop-blur-sm p-8 md:p-10 lg:p-11 overflow-hidden cursor-none transition-all duration-500 hover:bg-bg/40 z-20"
    >
      {!isLast && (
        <div className="absolute top-1/2 -right-[2px] w-[4px] h-[60%] -translate-y-1/2 bg-gradient-to-b from-transparent via-lime/20 to-transparent hidden lg:block z-0" />
      )}
      <div className="absolute top-[-20px] left-[-20px] font-mono text-[160px] text-white/[0.02] font-black select-none pointer-events-none group-hover:text-lime/[0.04] transition-colors duration-700">{step.num}</div>

      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-[36px] h-[36px] relative flex items-center justify-center">
            <div className="absolute inset-0 border-[2px] border-lime/30 group-hover:border-lime group-hover:rotate-[45deg] transition-all duration-500" />
            <div className="w-[10px] h-[10px] bg-lime group-hover:scale-150 transition-transform duration-500" />
          </div>
          <div className="h-px flex-1 bg-white/[0.05] group-hover:bg-lime/20 transition-colors duration-500" />
        </div>

        <h3 className="font-display font-black text-[26px] md:text-[28px] uppercase mb-3 group-hover:text-lime transition-colors duration-500">
          {step.title}
        </h3>
        <p className="text-[14.5px] font-light text-dim leading-relaxed mb-4 group-hover:text-white/80 transition-colors">
          {step.desc}
        </p>
      </div>
      <div className="absolute bottom-0 left-0 w-full h-[3px] bg-lime scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left" />
    </m.div>
  );
}
