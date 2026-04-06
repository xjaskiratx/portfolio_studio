"use client";

import { useState, useRef } from "react";
import { ScrambleText } from "@/components/ui/ScrambleText";
import { ScrambleOutline } from "@/components/ui/ScrambleOutline";
import btnS from "@/components/ui/Buttons.module.css";

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
      className="sec relative min-h-[400px] md:min-h-[500px] text-center overflow-hidden bg-transparent group/cta flex items-center justify-center border-t border-white/[0.03]"
    >
      <div className="relative z-10 rv pt-14 md:pt-24 pb-8 md:pb-12">
        <div className="sec-tag flex justify-center uppercase mb-8">Let&apos;s Work Together</div>
        <h2 className="font-display font-black text-[60px] md:text-[140px] leading-[0.9] tracking-tighter uppercase text-center mb-16 relative z-10">
          <ScrambleOutline text="Let's" className="[-webkit-text-stroke:1.2px_rgba(237,233,223,0.92)] md:[-webkit-text-stroke:2.5px_rgba(237,233,223,0.92)] text-transparent" /><br />
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
          <ScrambleOutline text="something" className="[-webkit-text-stroke:1.2px_rgba(237,233,223,0.82)] md:[-webkit-text-stroke:2.5px_rgba(237,233,223,0.82)] text-transparent" />
        </h2>

        <div className="flex flex-col sm:flex-row justify-center items-center gap-6 mb-16">
          <button
            onClick={openModal}
            className={`${btnS.btnXl} bg-lime text-bg font-display font-black text-[22px] tracking-[0.14em] uppercase px-10 py-3 cursor-none hover:bg-white transition-colors`}
            data-cta
          >
            <span>Start a Project</span>
          </button>
          <a
            href="https://calendar.app.google/5WVaARNcZUdL4y9x7"
            target="_blank"
            rel="noreferrer"
            className={`${btnS.btnXl} bg-white text-bg font-display font-black text-[22px] tracking-[0.14em] uppercase px-12 py-3 cursor-none hover:bg-lime transition-colors text-center max-[520px]:px-8 max-[520px]:text-xl w-full max-w-[400px] sm:max-w-none sm:w-auto`}
          >
            Skip the email — <br className="sm:hidden" /> Book 15 mins →
          </a>
        </div>

        <div className="font-mono text-[14px] tracking-[0.12em] text-white/70 uppercase mt-8 mb-22">
          © 2026 JSX Studios. Solo Studio. <br className="sm:hidden" />All Rights Reserved.
        </div>
      </div>
    </section>
  );
}
