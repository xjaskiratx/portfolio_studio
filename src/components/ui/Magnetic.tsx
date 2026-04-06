"use client";

import React, { useRef, useState, useEffect, ReactNode } from "react";

interface MagneticProps {
  children: ReactNode;
  strength?: number;
}

export default function Magnetic({ children, strength = 0.35 }: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const rectRef = useRef<DOMRect | null>(null);

  useEffect(() => {
    if (!ref.current) return;
    
    // Use IntersectionObserver to capture layout info asynchronously
    // entry.boundingClientRect is provided by the browser without a forced reflow scan.
    const observer = new IntersectionObserver((entries) => {
      if (entries[0]) {
        rectRef.current = entries[0].boundingClientRect;
      }
    }, { threshold: 0 });

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = rectRef.current;
    if (!rect) return;
    
    const { clientX, clientY } = e;
    const x = (clientX - (rect.left + rect.width / 2)) * strength;
    const y = (clientY - (rect.top + rect.height / 2)) * strength;
    setPosition({ x, y });
  };

  const handleMouseEnter = () => {
    // Rect is asynchronously updated via IntersectionObserver
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <div
      ref={ref}
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
        transition: 'transform 0.4s cubic-bezier(0.23, 1, 0.32, 1)'
      }}
      className="inline-block"
    >
      {children}
    </div>
  );
}
