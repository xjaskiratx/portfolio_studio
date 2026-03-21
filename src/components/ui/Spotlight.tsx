"use client";

import { useEffect, useState } from "react";

export function Spotlight() {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      setPosition({ x: clientX, y: clientY });
      document.documentElement.style.setProperty("--mx", `${clientX}px`);
      document.documentElement.style.setProperty("--my", `${clientY}px`);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div
      className="fixed inset-0 z-1 pointer-events-none"
      style={{
        background: `radial-gradient(480px circle at ${position.x}px ${position.y}px, rgba(200, 255, 0, 0.028) 0%, transparent 70%)`,
      }}
    />
  );
}
