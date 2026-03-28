"use client";

import { useRef, useMemo, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { 
  Group 
} from "three";

import { isIOSSafari, isMobile } from "@/lib/browser";

function Constellation() {
  return null;
}

export function HeroBackground() {
  const [contextKey, setContextKey] = useState(0);
  const [stopped, setStopped] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setStopped(!entry.isIntersecting);
      },
      { threshold: 0, rootMargin: '100px' }
    );

    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const handleContextLost = (e: Event) => {
      e.preventDefault();
      console.warn('WebGL context lost — Safari refinement');
    };

    const handleContextRestored = () => {
      console.log('WebGL context restored — re-initializing');
      setContextKey((p: number) => p + 1);
    };

    canvas.addEventListener('webglcontextlost', handleContextLost);
    canvas.addEventListener('webglcontextrestored', handleContextRestored);

    return () => {
      canvas.removeEventListener('webglcontextlost', handleContextLost);
      canvas.removeEventListener('webglcontextrestored', handleContextRestored);
    };
  }, [contextKey]);

  return (
    <div ref={containerRef} className="absolute inset-0 z-0">
      <Canvas 
        key={contextKey}
        camera={{ position: [0, 0, 15], fov: 60 }} 
        gl={{ 
          alpha: true, 
          antialias: !isIOSSafari,
          powerPreference: "high-performance"
        }}
        dpr={isIOSSafari ? 1 : [1, 2]}
        onCreated={({ gl }) => {
          const canvas = gl.domElement;
          canvasRef.current = canvas;
        }}
        onPointerMissed={() => {
          // Cleanup listeners if the component unmounts but R3F state is tricky
        }}
      >
        <Constellation />
      </Canvas>
    </div>
  );
}
