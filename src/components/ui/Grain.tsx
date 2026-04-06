"use client";

import { useEffect, useRef } from "react";
import { isMobile } from "@/lib/browser";
import styles from "./Grain.module.css";

export function Grain() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // On mobile — use SVG filter instead of canvas (zero CPU, perfectly smooth)
    if (isMobile) {
      canvas.style.display = 'none';
      return;
    }

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let W = window.innerWidth;
    let H = window.innerHeight;
    canvas.width = W;
    canvas.height = H;

    function draw() {
        const id = ctx!.createImageData(W, H);
        const d = id.data;
        for (let i = 0; i < d.length; i += 4) {
          const v = (Math.random() * 255) | 0;
          d[i] = d[i + 1] = d[i + 2] = v;
          d[i + 3] = 255;
        }
        ctx!.putImageData(id, 0, 0);
    }

    const handleResize = () => {
      W = window.innerWidth;
      H = window.innerHeight;
      canvas.width = W;
      canvas.height = H;
      draw();
    };

    window.addEventListener("resize", handleResize);
    draw();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <canvas
        ref={canvasRef}
        id="grain"
        className="fixed inset-0 z-[9000] pointer-events-none opacity-[0.03] mix-blend-overlay"
      />
      {/* iOS Fallback */}
      <svg style={{ display: 'none' }}>
        <filter id="noise">
          <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="4" stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
        </filter>
      </svg>
      <div className={styles.grainFilter} />
    </>
  );
}
