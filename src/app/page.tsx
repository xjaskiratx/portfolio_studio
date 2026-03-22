import { ClientOverlays } from "@/components/ui/ClientOverlays";
import { SmoothScroll } from "@/components/ui/SmoothScroll";
import { Marquee } from "@/components/ui/Marquee";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Services } from "@/components/sections/Services";
import { Work } from "@/components/sections/Work";
import { GDGallery } from "@/components/sections/GDGallery";
import { Process } from "@/components/sections/Process";
import { CTASection } from "@/components/sections/CTASection";

export default function Home() {
  return (
    <SmoothScroll>
      <main className="relative min-h-screen pb-32">
        <ClientOverlays />

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

        <CTASection />

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
