"use client";

import { useState, useRef } from "react";
import { ScrambleText } from "@/components/ui/ScrambleText";
import { ScrambleOutline } from "@/components/ui/ScrambleOutline";

export function CTASection() {
  const [isHoveringCreate, setIsHoveringCreate] = useState(false);
  const lastHover = useRef(0);

  const handleHover = () => {
    const now = Date.now();
    if (now - lastHover.current < 600) return;
    lastHover.current = now;
    setIsHoveringCreate(true);
  };

  const openModal = () => {
    window.dispatchEvent(new CustomEvent("open-contact-modal"));
  };

  return (
    <section
      id="cta"
      className="sec relative min-h-[400px] md:min-h-[500px] text-center overflow-hidden bg-bg group/cta flex items-center justify-center border-t border-white/[0.03]"
    >
      <div className="relative z-10 rv pt-14 md:pt-24 pb-8 md:pb-12">
        <div className="sec-tag flex justify-center uppercase mb-8">Let&apos;s Work Together</div>
        <h2 className="cta-head font-display font-black uppercase mb-12">
          <ScrambleOutline text="Let's" className="[-webkit-text-stroke:2.5px_rgba(237,233,223,0.92)] text-transparent" /><br />
          <div
            className="inline-block relative group/cr"
            onMouseEnter={handleHover}
            onMouseOver={handleHover}
            onMouseLeave={() => setIsHoveringCreate(false)}
            data-sc="cta"
          >
            <span className="text-white group-hover/cr:text-lime transition-colors group-hover/cr:animate-glitch-ga">
              <ScrambleText text="CREATE" trigger={isHoveringCreate} />
            </span>
          </div><br />
          <ScrambleOutline text="something" className="[-webkit-text-stroke:2.5px_rgba(237,233,223,0.82)] text-transparent" />
        </h2>

        <div className="flex flex-wrap justify-center items-center gap-6 mb-16">
          <button
            onClick={openModal}
            className="btn-xl bg-lime text-bg font-display font-black text-2xl tracking-[0.14em] uppercase px-10 py-4 cursor-none hover:bg-white transition-colors"
            data-cta
          >
            <span>Start a Project</span>
          </button>
          <a
            href="https://calendly.com"
            target="_blank"
            rel="noreferrer"
            className="btn-xl bg-white text-bg font-display font-black text-2xl tracking-[0.14em] uppercase px-10 py-4 cursor-none hover:bg-lime transition-colors text-center max-[520px]:px-8 max-[520px]:text-base"
          >
            Skip the email — Book 15 mins →
          </a>
        </div>

        <div className="font-mono text-[11px] tracking-[0.12em] text-white/70 uppercase">
          © 2025 JSX W&D. Solo Studio. All Rights Reserved.
        </div>
      </div>
    </section>
  );
}
