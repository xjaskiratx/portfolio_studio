"use client";

import { motion } from "framer-motion";

interface Step {
  num: string;
  title: string;
  desc: string;
  details: string[];
  tags: string[];
}

interface ProcessCardProps {
  step: Step;
  index: number;
  isLast: boolean;
}

export function ProcessCard({ step, index, isLast }: ProcessCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
      viewport={{ once: true }}
      className="group relative bg-bg/80 backdrop-blur-sm p-12 md:p-[64px_48px] overflow-hidden cursor-none transition-all duration-500 hover:bg-bg/40 z-20"
    >
      {/* Connection Line */}
      {!isLast && (
        <div className="absolute top-1/2 -right-[2px] w-[4px] h-[60%] -translate-y-1/2 bg-gradient-to-b from-transparent via-lime/20 to-transparent hidden lg:block z-0" />
      )}
      <div className="absolute top-[-20px] left-[-20px] font-mono text-[160px] text-white/[0.02] font-black select-none pointer-events-none group-hover:text-lime/[0.04] transition-colors duration-700">{step.num}</div>
      
      <div className="relative z-10">
         <div className="flex items-center gap-4 mb-10">
            <div className="w-[44px] h-[44px] relative flex items-center justify-center">
               <div className="absolute inset-0 border-[2px] border-lime/30 group-hover:border-lime group-hover:rotate-[45deg] transition-all duration-500" />
               <div className="w-[12px] h-[12px] bg-lime group-hover:scale-150 transition-transform duration-500" />
            </div>
            <div className="h-px flex-1 bg-white/[0.05] group-hover:bg-lime/20 transition-colors duration-500" />
         </div>

         <h3 className="font-display font-black text-[30px] uppercase mb-4 group-hover:text-lime transition-colors duration-500">
            {step.title}
         </h3>
         <p className="text-[15px] font-light text-dim leading-relaxed mb-6 group-hover:text-white/80 transition-colors">
           {step.desc}
         </p>
         
         <ul className="mb-8 space-y-2.5 opacity-100 transition-opacity">
           {step.details.map(detail => (
             <li key={detail} className="flex items-center gap-2.5 font-mono text-[10.5px] uppercase tracking-[0.16em] text-white/58 group-hover:text-lime transition-colors">
               <span className="w-1.5 h-1.5 bg-lime/75 rounded-full shadow-[0_0_10px_rgba(200,255,0,0.24)] group-hover:bg-lime transition-colors" />
               {detail}
             </li>
           ))}
         </ul>

         <div className="flex flex-wrap gap-2 group-hover:gap-3 transition-all">
            {step.tags.map(tag => (
              <span key={tag} className="font-mono text-[9px] tracking-[0.14em] uppercase text-lime/68 border border-lime/24 px-3 py-1.5 transition-all group-hover:bg-lime/10 group-hover:text-lime group-hover:border-lime/30">
                {tag}
              </span>
            ))}
         </div>
      </div>
      <div className="absolute bottom-0 left-0 w-full h-[3px] bg-lime scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left" />
    </motion.div>
  );
}
