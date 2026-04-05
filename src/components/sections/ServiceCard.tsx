"use client";

import React, { useRef, useState } from "react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface Service {
  num: string;
  title: string;
  features: string[];
  tags: string[];
}

export function ServiceCard({ service }: { service: Service }) {
  const [tilt, setTilt] = useState({ x: 0, y: 0, s: 1 });
  const [mPos, setMPos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const rectRef = useRef<DOMRect | null>(null);

  const onMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    rectRef.current = e.currentTarget.getBoundingClientRect();
    setTilt(prev => ({ ...prev, s: 1.02 }));
    setIsHovered(true);
  };

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = rectRef.current;
    if (!rect) return;

    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;

    setTilt({ x: py * -10, y: px * 13, s: 1.02 });
    setMPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const onMouseLeave = () => {
    setTilt({ x: 0, y: 0, s: 1 });
    setIsHovered(false);
    rectRef.current = null;
  };

  return (
    <div
      onMouseEnter={onMouseEnter}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={{
        transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale(${tilt.s})`,
        transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), background-color 0.5s ease'
      }}
      className="group relative bg-bg p-12 md:p-[58px_48px] overflow-hidden cursor-none hover:bg-[#090912] rv sp border border-white/[0.03]"
    >
      {/* Glow */}
      <div
        className="absolute w-[320px] h-[320px] rounded-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity z-0"
        style={{
          left: mPos.x,
          top: mPos.y,
          background: "radial-gradient(circle, rgba(200,255,0,0.1), transparent 70%)",
          transform: "translate(-50%, -50%)",
          transition: 'opacity 0.5s ease'
        }}
      />

      {/* Background Number */}
      <div className="absolute top-[-20px] left-[-20px] font-mono text-[160px] text-lime/10 font-black select-none pointer-events-none group-hover:text-lime/[0.15] transition-colors duration-700 z-0">{service.num}</div>

      {/* Bottom Bar */}
      <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-lime scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />

      <div className="relative z-10 h-full flex flex-col justify-between pt-[100px] md:pt-[120px]">
        <div>
          <h3 className="font-display font-black text-[26px] md:text-[32px] uppercase leading-none mb-8 group-hover:text-lime transition-all max-[479px]:text-[24px]">
            {service.title}
          </h3>
          <ul className="space-y-4 mb-8">
            {service.features.map((feature, i) => (
              <li key={i} className="flex items-center gap-3 font-mono text-[15px] md:text-[16px] tracking-wider text-dim group-hover:text-white/90 transition-colors">
                <span className="w-1.5 h-1.5 bg-lime/40 group-hover:bg-lime/80 rounded-full transition-colors flex-shrink-0" />
                {feature}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
