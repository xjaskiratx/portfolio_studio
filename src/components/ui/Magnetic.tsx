"use client";

import React, { useRef, useState, ReactNode } from "react";
import { motion } from "framer-motion";

interface MagneticProps {
  children: ReactNode;
  strength?: number;
}

export default function Magnetic({ children, strength = 0.35 }: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const rectRef = useRef<DOMRect | null>(null);

  const updateRect = () => {
    if (ref.current) {
      rectRef.current = ref.current.getBoundingClientRect();
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!rectRef.current) updateRect();
    const rect = rectRef.current;
    if (!rect) return;
    
    const { clientX, clientY } = e;
    const x = (clientX - (rect.left + rect.width / 2)) * strength;
    const y = (clientY - (rect.top + rect.height / 2)) * strength;
    setPosition({ x, y });
  };

  const handleMouseEnter = () => {
    updateRect();
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
    rectRef.current = null;
  };

  return (
    <motion.div
      ref={ref}
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
    >
      {children}
    </motion.div>
  );
}
