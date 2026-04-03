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
      <div className="relative z-10 pt-4">
        <h3 className="font-display font-black text-[26px] md:text-[32px] uppercase mb-4 group-hover:text-lime transition-colors duration-500">
          {step.title}
        </h3>
        <ul className="space-y-3">
          {step.desc.map((item, i) => (
            <li key={i} className="flex items-start gap-3 group/li">
              <span className="mt-2 w-1.5 h-1.5 rounded-full bg-lime/40 group-hover:bg-lime transition-colors" />
              <span className="text-[15px] md:text-[16px] font-mono tracking-wider text-dim group-hover:text-white/80 transition-colors">
                {item}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
