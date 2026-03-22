"use client";

import { useRef, useEffect } from "react";
import { useLenis } from "lenis/react";

interface PixelMaskProps {
  imagePath: string;
  radius?: number;
  pixelSize?: number;
  color?: string;
  opacity?: number;
  children?: React.ReactNode;
}

export function PixelMask({
  imagePath,
  radius = 1000,
  pixelSize = 100,
  color = "#ffffff",
  opacity = 0,
  children
}: PixelMaskProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const mouse = useRef({ x: -2000, y: -2000 });
  const targetMouse = useRef({ x: -2000, y: -2000 });
  const rectRef = useRef<DOMRect | null>(null);

  const updateRect = () => {
    if (containerRef.current) {
      rectRef.current = containerRef.current.getBoundingClientRect();
    }
  };

  useLenis(() => {
    updateRect();
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const resize = () => {
      if (!containerRef.current) return;
      canvas.width = containerRef.current.offsetWidth;
      canvas.height = containerRef.current.offsetHeight;
      updateRect();
    };

    window.addEventListener("resize", resize);
    resize();

    const handleGlobalMouseMove = (e: MouseEvent) => {
      const rect = rectRef.current;
      if (rect) {
        targetMouse.current = {
          x: e.clientX - rect.left,
          y: e.clientY - rect.top
        };
      }
    };
    window.addEventListener("mousemove", handleGlobalMouseMove, { passive: true });

    let frame: number;
    const radiusSq = radius * radius;

    const sprite = document.createElement("canvas");
    sprite.width = pixelSize;
    sprite.height = pixelSize;
    const sCtx = sprite.getContext("2d");
    if (sCtx) {
      sCtx.fillStyle = color;
      sCtx.fillRect(0, 0, pixelSize - 1, pixelSize - 1);
    }

    const draw = () => {
      mouse.current.x += (targetMouse.current.x - mouse.current.x) * 0.12;
      mouse.current.y += (targetMouse.current.y - mouse.current.y) * 0.12;

      if (containerRef.current) {
        containerRef.current.style.setProperty("--pmx", `${mouse.current.x}px`);
        containerRef.current.style.setProperty("--pmy", `${mouse.current.y}px`);
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const mX = mouse.current.x;
      const mY = mouse.current.y;

      for (let x = 0; x < canvas.width; x += pixelSize) {
        for (let y = 0; y < canvas.height; y += pixelSize) {
          const cX = x + pixelSize / 2;
          const cY = y + pixelSize / 2;
          const dX = cX - mX;
          const dY = cY - mY;
          const distSq = dX * dX + dY * dY;

          if (distSq > radiusSq) {
            ctx.drawImage(sprite, x, y);
          }
        }
      }

      frame = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleGlobalMouseMove);
      cancelAnimationFrame(frame);
    };
  }, [color, pixelSize, radius]);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full min-h-full overflow-hidden"
    >
      <div
        className="absolute inset-0 bg-cover bg-center grayscale contrast-[1.45] brightness-[0.52] saturate-0 z-0"
        style={{
          backgroundImage: `url(${imagePath})`,
          maskImage: `radial-gradient(circle ${radius}px at var(--pmx) var(--pmy), black 99%, transparent 100%)`,
          WebkitMaskImage: `radial-gradient(circle ${radius}px at var(--pmx) var(--pmy), black 99%, transparent 100%)`,
          maskRepeat: "no-repeat",
          WebkitMaskRepeat: "no-repeat"
        }}
      />

      <div className="relative z-40 w-full h-full">
        <div className="w-full h-full">
          {children}
        </div>
      </div>

      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full z-20 pointer-events-none transition-opacity duration-700"
        style={{ opacity }}
      />

      <div className="absolute inset-0 bg-gradient-to-b from-bg2 via-transparent to-bg2 pointer-events-none z-30" />
    </div>
  );
}
