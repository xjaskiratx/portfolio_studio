import React, { useRef, useState, useEffect } from "react";

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
  const [tilt, setTilt] = useState({ x: 0, y: 0, s: 1 });
  const [mPos, setMPos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const rectRef = useRef<DOMRectReadOnly | null>(null);

  useEffect(() => {
    if (!cardRef.current) return;
    const observer = new IntersectionObserver((entries) => {
      if (entries[0]) {
        rectRef.current = entries[0].boundingClientRect;
      }
    }, { threshold: 0 });

    observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, []);

  const onMouseEnter = () => {
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
  };

  return (
    <div
      ref={cardRef}
      onMouseEnter={onMouseEnter}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={{ 
        transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale(${tilt.s})`,
        transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), background-color 0.5s ease',
        transitionDelay: isHovered ? '0s' : `${index * 0.1}s`
      }}
      className="group relative bg-bg/95 lg:bg-bg/80 lg:backdrop-blur-sm p-8 md:p-10 lg:p-11 overflow-hidden cursor-none transition-all duration-500 hover:bg-bg/40 z-20 rv"
    >
      {/* Glow */}
      <div 
        className="absolute w-[320px] h-[320px] rounded-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity z-0"
        style={{
          left: mPos.x,
          top: mPos.y,
          background: "radial-gradient(circle, rgba(200,255,0,0.08), transparent 70%)",
          transform: "translate(-50%, -50%)",
          transition: 'opacity 0.5s ease'
        }}
      />

      {!isLast && (
        <div className="absolute top-1/2 -right-[2px] w-[4px] h-[60%] -translate-y-1/2 bg-gradient-to-b from-transparent via-lime/20 to-transparent hidden lg:block z-0" />
      )}
      
      <div className="absolute top-[-20px] left-[-20px] font-mono text-[160px] text-lime/[0.10] font-black select-none pointer-events-none group-hover:text-lime/[0.15] transition-colors duration-700">{step.num}</div>
      
      <div className="relative z-10 pt-[100px] md:pt-[120px]">
        <h3 className="font-display font-black text-[26px] md:text-[32px] uppercase mb-4 group-hover:text-lime transition-colors duration-500">
          {step.title}
        </h3>
        <ul className="space-y-3">
          {step.desc.map((item, i) => (
            <li key={i} className="flex items-start gap-3 group/li">
              <span className="mt-2 w-1.5 h-1.5 rounded-full bg-lime/40 group-hover:bg-lime transition-colors" />
              <span className="text-[14px] font-mono tracking-wider text-dim group-hover:text-white/80 transition-colors">
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
