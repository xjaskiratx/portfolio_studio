"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import React, { useRef } from "react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface Service {
  num: string;
  title: string;
  desc: string;
  tags: string[];
  icon: React.ReactNode;
}

export function ServiceCard({ service }: { service: Service }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [10, -10]), { damping: 25, stiffness: 150 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-13, 13]), { damping: 25, stiffness: 150 });
  const scale = useSpring(1, { damping: 25, stiffness: 150 });
  const rectRef = useRef<DOMRect | null>(null);

  const onMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    rectRef.current = e.currentTarget.getBoundingClientRect();
    scale.set(1.02);
  };

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = rectRef.current;
    if (!rect) return;
    
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    x.set(px);
    y.set(py);
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  const onMouseLeave = () => {
    x.set(0);
    y.set(0);
    scale.set(1);
    rectRef.current = null;
  };

  return (
    <motion.div
      style={{ rotateX, rotateY, scale, perspective: 1000 }}
      onMouseEnter={onMouseEnter}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className="group relative bg-bg p-12 md:p-[58px_48px] overflow-hidden cursor-none transition-all duration-500 hover:bg-[#090912] rv sp border border-white/[0.03]"
    >
      {/* Glow */}
      <motion.div 
        className="absolute w-[320px] h-[320px] rounded-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity z-0"
        style={{
          left: mouseX,
          top: mouseY,
          background: "radial-gradient(circle, rgba(200,255,0,0.1), transparent 70%)",
          translateX: "-50%",
          translateY: "-50%",
        }}
      />
      
      {/* Bottom Bar */}
      <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-lime scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />

      <div className="relative z-10">
        <div className="font-mono text-[10.5px] tracking-[0.2em] text-lime mb-7 uppercase">— {service.num}</div>
        <div className="w-[60px] h-[60px] mb-8 text-lime transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3">
          <React.Fragment key="service-icon">{service.icon}</React.Fragment>
        </div>
        <h3 className="font-display font-black text-[32px] uppercase leading-none mb-4 group-hover:text-lime transition-all max-[479px]:text-3xl">
          {service.title}
        </h3>
        <p className="text-[14.5px] font-light text-dim leading-relaxed mb-8 group-hover:text-white transition-colors">
          {service.desc}
        </p>
      </div>
    </motion.div>
  );
}
