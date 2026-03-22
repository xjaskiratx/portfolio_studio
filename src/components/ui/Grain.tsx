"use client";

export function Grain() {
  return (
    <>
      <svg style={{ display: 'none' }}>
        <filter id="grain">
          <feTurbulence 
            type="fractalNoise" 
            baseFrequency="0.65" 
            numOctaves="3" 
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
      </svg>
      <div id="grain-filter" />
    </>
  );
}
