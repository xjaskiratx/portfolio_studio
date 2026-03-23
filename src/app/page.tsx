import { ClientOverlaysGate } from "@/components/ui/ClientOverlaysGate";
import { SmoothScroll } from "@/components/ui/SmoothScroll";
import { Marquee } from "@/components/ui/Marquee";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Services } from "@/components/sections/Services";
import { Work } from "@/components/sections/Work";
import { Process } from "@/components/sections/Process";
import { CTASection } from "@/components/sections/CTASection";

export default function Home() {
  return (
    <SmoothScroll>
      <main className="relative min-h-screen">
        <ClientOverlaysGate />

        <Hero />
        <Marquee
          items={["Web Design", "Graphic Design", "Brand Identity", "UI / UX", "Development", "Print Design", "Redesigns"]}
          variant="lime"
          speed={18}
          aria-hidden="true"
        />
        <About />
        <Marquee
          items={["High Performance", "Pixel Perfect", "Zero Handoff Loss", "SEO Optimized", "Scaleable Architecture"]}
          variant="dark"
          direction="right"
          speed={18}
          separator="·"
          aria-hidden="true"
        />
        <Services />
        <Marquee
          items={["Got existing work?", "I'll make it what it should have been", "Redesigns are a specialty"]}
          variant="lime"
          speed={18}
          direction="right"
          aria-hidden="true"
        />
        <Work />
        <Marquee
          items={["I build what agencies charge 10x for", "One expert, zero handoff losses", "Web · Graphic · Brand · Print"]}
          variant="dark"
          speed={18}
          separator="·"
          aria-hidden="true"
        />
        <Process />
        <Marquee
          items={["Strategy", "Forge", "Ship", "Iterate", "Success"]}
          variant="lime"
          speed={18}
          direction="right"
          aria-hidden="true"
        />
        <CTASection />

        <footer className="bg-bg border-t border-border py-8 px-6 flex justify-center items-center">
          <div className="font-display font-black text-[19px] tracking-[0.08em]">JSX <span className="text-lime">W&D</span></div>
        </footer>
      </main>
    </SmoothScroll>
  );
}
