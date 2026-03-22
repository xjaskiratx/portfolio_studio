"use client";

import { useState } from "react";
import { PixelMask } from "@/components/ui/PixelMask";
import { ScrambleText } from "@/components/ui/ScrambleText";
import { ScrambleOutline } from "@/components/ui/ScrambleOutline";

export function CTASection() {
  const [isHoveringCreate, setIsHoveringCreate] = useState(false);

  const openModal = () => {
    window.dispatchEvent(new CustomEvent("open-contact-modal"));
  };

  return (
    <section
      id="cta"
      className="sec relative min-h-[760px] md:min-h-[880px] text-center overflow-hidden bg-bg2 group/cta flex items-center justify-center"
    >
      <PixelMask imagePath="/me-pop-bw.webp" radius={70} pixelSize={5} color="#99dc42ff" opacity={0.96}>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
          <div className="absolute w-[840px] h-[840px] border border-white/[0.035] rounded-full -translate-x-1/2 -translate-y-1/2 animate-[rpulse_10s_ease-in-out_infinite]" />
          <div className="absolute w-[590px] h-[590px] border border-white/[0.04] rounded-full -translate-x-1/2 -translate-y-1/2 animate-[rpulse_10s_ease-in-out_2s_infinite]" />
          <div className="absolute w-[370px] h-[370px] border border-white/[0.05] rounded-full -translate-x-1/2 -translate-y-1/2 animate-[rpulse_10s_ease-in-out_4s_infinite]" />
          <div className="absolute w-[170px] h-[170px] border border-white/[0.06] rounded-full -translate-x-1/2 -translate-y-1/2 animate-[rpulse_10s_ease-in-out_6s_infinite]" />
        </div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[600px] pointer-events-none bg-[radial-gradient(ellipse,rgba(255,255,255,0.055),transparent_65%)]" />

        <div className="relative z-10 rv py-fib-89 md:py-fib-144">
          <div className="sec-tag flex justify-center uppercase">Let&apos;s Work Together</div>
          <h2 className="cta-head font-display font-black uppercase mb-fib-34 [text-shadow:0_12px_40px_rgba(0,0,0,0.5)]">
            <ScrambleOutline text="Let's" className="[-webkit-text-stroke:2.5px_rgba(237,233,223,0.92)] text-transparent" /><br />
            <div
              className="inline-block relative group/cr"
              onMouseEnter={() => setIsHoveringCreate(true)}
              onMouseLeave={() => setIsHoveringCreate(false)}
            >
              <span className="text-white group-hover/cr:text-lime transition-colors group-hover/cr:animate-glitch-ga">
                <ScrambleText text="CREATE" trigger={isHoveringCreate} />
              </span>
            </div><br />
            <ScrambleOutline text="something" className="[-webkit-text-stroke:2.5px_rgba(237,233,223,0.82)] text-transparent" />
          </h2>

          <div className="flex flex-wrap justify-center items-center gap-fib-13">
            <button
              onClick={openModal}
              className="btn-xl bg-lime text-bg font-display font-black text-lg tracking-[0.14em] uppercase px-fib-55 py-fib-21 cursor-none hover:bg-white transition-colors"
              data-cta
            >
              <span>Start a Project</span>
            </button>
            <a
              href="https://calendly.com"
              target="_blank"
              rel="noreferrer"
              className="btn-xl bg-lime text-bg font-display font-black text-lg tracking-[0.14em] uppercase px-fib-55 py-fib-21 cursor-none hover:bg-white transition-colors text-center max-[520px]:px-fib-34 max-[520px]:text-base"
            >
              Skip the email — Book 15 mins →
            </a>
          </div>
        </div>
      </PixelMask>
    </section>
  );
}
