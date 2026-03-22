"use client";

import { useState } from "react";
import dynamic from "next/dynamic";

const Services = dynamic(() => import("@/components/sections/Services").then(mod => mod.Services));
const Work = dynamic(() => import("@/components/sections/Work").then(mod => mod.Work), { ssr: false });
const GDGallery = dynamic(() => import("@/components/sections/GDGallery").then(mod => mod.GDGallery));
const About = dynamic(() => import("@/components/sections/About").then(mod => mod.About));
const Process = dynamic(() => import("@/components/sections/Process").then(mod => mod.Process));
const ContactModal = dynamic(() => import("@/components/ui/ContactModal").then(mod => mod.ContactModal));

import { Hero } from "@/components/sections/Hero";
import { Grain } from "@/components/ui/Grain";
import { Spotlight } from "@/components/ui/Spotlight";
import { Cursor } from "@/components/ui/Cursor";
import { SmoothScroll } from "@/components/ui/SmoothScroll";
import { TopStrip } from "@/components/ui/TopStrip";
import { PillNav } from "@/components/ui/PillNav";
import { Marquee } from "@/components/ui/Marquee";
import { EasterEgg } from "@/components/ui/EasterEgg";
import { PageBackground } from "@/components/ui/PageBackground";
import { PixelMask } from "@/components/ui/PixelMask";
import { ScrambleText } from "@/components/ui/ScrambleText";
import { ScrambleOutline } from "@/components/ui/ScrambleOutline";

import { useEffect } from "react";
import { useReveal } from "@/hooks/useReveal";

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isHoveringCreate, setIsHoveringCreate] = useState(false);
  useReveal();

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["hero", "about", "services", "work", "gd", "process", "cta"];
      let active = "hero";

      for (const id of sections) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= 300) {
          active = id;
        }
      }

      const root = document.documentElement;
      if (active === "gd") {
        root.style.setProperty("--accent-lime", "#4466ff");
        root.style.setProperty("--accent-glow", "rgba(68, 102, 255, 0.08)");
        root.style.setProperty("--accent-line", "rgba(68, 102, 255, 0.12)");
      } else if (active === "work") {
        root.style.setProperty("--accent-lime", "#c8ff00");
        root.style.setProperty("--accent-glow", "rgba(200, 255, 0, 0.08)");
        root.style.setProperty("--accent-line", "rgba(200, 255, 0, 0.12)");
      } else {
        root.style.setProperty("--accent-lime", "#c8ff00");
        root.style.setProperty("--accent-glow", "rgba(200, 255, 0, 0.06)");
        root.style.setProperty("--accent-line", "rgba(200, 255, 0, 0.1)");
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <SmoothScroll>
      <main className="relative min-h-screen pb-32">
        <PageBackground />
        <Grain />
        <Spotlight />
        <Cursor />
        <TopStrip />
        <PillNav onHireMe={() => setIsModalOpen(true)} />
        <ContactModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        <EasterEgg />

        <Hero />

        <Marquee
          items={["Web Design", "Graphic Design", "Brand Identity", "UI / UX", "Development", "Print Design", "Redesigns"]}
          variant="lime"
          speed={22}
          aria-hidden="true"
        />
        <Marquee
          items={["HTML5", "CSS3", "JavaScript", "TypeScript", "React", "Next.js", "Node.js", "Express", "MongoDB", "Supabase", "OAuth", "WordPress", "Tailwind CSS", "Framer Motion", "GSAP", "Three.js"]}
          variant="dark"
          direction="right"
          speed={30}
          separator="·"
          aria-hidden="true"
        />

        <About />
        <Services />
        <Work />

        <Marquee
          items={["Got existing work?", "I'll make it what it should have been", "Redesigns are a specialty"]}
          variant="lime"
          speed={18}
          direction="right"
          aria-hidden="true"
        />

        <GDGallery />
        <Process />

        <Marquee
          items={["I build what agencies charge 10x for", "One expert, zero handoff losses", "Web · Graphic · Brand · Print"]}
          variant="dark"
          speed={25}
          separator="·"
          aria-hidden="true"
        />

        {/* ══════════════════ CTA ══════════════════ */}
        <section
          id="cta"
          className="sec relative min-h-[760px] md:min-h-[880px] text-center overflow-hidden bg-bg2 group/cta flex items-center justify-center"
        >
          <PixelMask imagePath="/me-pop-bw.png" radius={70} pixelSize={5} color="#99dc42ff" opacity={0.96}>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
              <div className="absolute w-[840px] h-[840px] border border-white/[0.035] rounded-full -translate-x-1/2 -translate-y-1/2 animate-[rpulse_10s_ease-in-out_infinite]" />
              <div className="absolute w-[590px] h-[590px] border border-white/[0.04] rounded-full -translate-x-1/2 -translate-y-1/2 animate-[rpulse_10s_ease-in-out_2s_infinite]" />
              <div className="absolute w-[370px] h-[370px] border border-white/[0.05] rounded-full -translate-x-1/2 -translate-y-1/2 animate-[rpulse_10s_ease-in-out_4s_infinite]" />
              <div className="absolute w-[170px] h-[170px] border border-white/[0.06] rounded-full -translate-x-1/2 -translate-y-1/2 animate-[rpulse_10s_ease-in-out_6s_infinite]" />
            </div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[600px] pointer-events-none bg-[radial-gradient(ellipse,rgba(255,255,255,0.055),transparent_65%)]" />

            <div className="relative z-10 rv py-20 md:py-28">
              <div className="sec-tag justify-center mb-[18px]">Let&apos;s Work Together</div>
              <h2 className="font-display font-black text-[clamp(72px,11.5vw,156px)] leading-[0.86] uppercase mb-[26px] [text-shadow:0_12px_40px_rgba(0,0,0,0.5)]">
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

              <div className="flex flex-wrap justify-center items-center gap-[14px]">
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="btn-xl bg-lime text-bg font-display font-black text-lg tracking-[0.14em] uppercase px-[58px] py-[20px] cursor-none hover:bg-white transition-colors"
                  data-cta
                >
                  <span>Start a Project</span>
                </button>
                <a
                  href="https://calendly.com"
                  target="_blank"
                  rel="noreferrer"
                  className="btn-cal font-mono text-[11px] tracking-[0.1em] uppercase text-dim border border-border px-[28px] py-[19px] cursor-none hover:text-lime hover:border-lime/40 transition-colors"
                >
                  Skip the email — Book 15 mins →
                </a>
              </div>

              <a href="mailto:hello@jsxwd.com" className="block font-mono text-[11.5px] tracking-[0.14em] text-muted mt-[22px] cursor-none hover:text-lime transition-colors">
                hello@jsxwd.com
              </a>
            </div>
          </PixelMask>
        </section>

        <footer className="bg-bg border-t border-border py-[28px] px-[60px] max-[1279px]:px-[44px] max-[1023px]:px-[36px] max-[767px]:px-[24px] max-[479px]:px-[20px] flex justify-between items-center max-[767px]:flex-col max-[767px]:text-center max-[767px]:gap-4">
          <div className="font-display font-black text-[19px] tracking-[0.08em]">JSX <span className="text-lime">W&D</span></div>
          <div className="font-mono text-[9px] tracking-[0.07em] text-muted">© 2025 JSX W&D. SOLO STUDIO. ALL RIGHTS RESERVED.</div>
          <div className="flex gap-6 foot-links">
            {['Dribbble', 'Behance', 'Instagram', 'LinkedIn'].map(s => (
              <a key={s} href="#" className="font-mono text-[9.5px] tracking-[0.12em] uppercase text-muted hover:text-lime transition-colors cursor-none">{s}</a>
            ))}
          </div>
        </footer>
      </main>
    </SmoothScroll>
  );
}
