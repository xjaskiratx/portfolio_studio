"use client";

import type { ReactNode } from "react";

export interface ForgeStep {
  num: string;
  title: string;
  desc: string[];
}

interface ProcessCardProps {
  step: ForgeStep;
  index: number;
  isLast: boolean;
}

export function ProcessCard({ step, index, isLast }: ProcessCardProps) {
  return (
    <div
      className="group relative bg-bg/95 lg:bg-bg/80 lg:backdrop-blur-sm p-8 md:p-10 lg:p-11 overflow-hidden cursor-none transition-all duration-500 hover:bg-bg/40 z-20 rv"
      style={{ transitionDelay: `${index * 0.15}s` } as any}
    >
      {!isLast && (
        <div className="absolute top-1/2 -right-[2px] w-[4px] h-[60%] -translate-y-1/2 bg-gradient-to-b from-transparent via-lime/20 to-transparent hidden lg:block z-0" />
      )}
      <div className="absolute top-[-20px] left-[-20px] font-mono text-[160px] text-white/[0.06] font-black select-none pointer-events-none group-hover:text-lime/[0.12] transition-colors duration-700">{step.num}</div>

      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-[36px] h-[36px] relative flex items-center justify-center">
            <div className="absolute inset-0 border-[2px] border-lime/30 group-hover:border-lime group-hover:rotate-[45deg] transition-all duration-500" />
            <div className="w-[10px] h-[10px] bg-lime group-hover:scale-150 transition-transform duration-500" />
          </div>
          <div className="h-px flex-1 bg-white/[0.05] group-hover:bg-lime/20 transition-colors duration-500" />
        </div>

        <h3 className="font-display font-black text-[26px] md:text-[28px] uppercase mb-4 group-hover:text-lime transition-colors duration-500">
          {step.title}
        </h3>
        <ul className="space-y-3">
          {step.desc.map((item, i) => (
            <li key={i} className="flex items-start gap-3 group/li">
              <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-lime/40 group-hover:bg-lime transition-colors" />
              <span className="text-[14.5px] font-light text-dim leading-relaxed group-hover:text-white/80 transition-colors">
                {item}
              </span>
            </li>
          ))}
        </ul>
      </div>
      <div className="absolute bottom-0 left-0 w-full h-[3px] bg-lime scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left" />
    </div>
  );
}
