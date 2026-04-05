"use client";

import dynamic from "next/dynamic";
const Marquee = dynamic(() => import("@/components/ui/Marquee").then(mod => mod.Marquee), { ssr: false });

const Hero = dynamic(() => import("@/components/sections/Hero").then(mod => mod.Hero), { 
  ssr: false,
  loading: () => <div className="min-h-[100svh] bg-bg" />
});
const About = dynamic(() => import("@/components/sections/About").then(mod => mod.About), { ssr: false });
const Industries = dynamic(() => import("@/components/sections/Industries").then(mod => mod.Industries), { ssr: false });
const Services = dynamic(() => import("@/components/sections/Services").then(mod => mod.Services), { ssr: false });
const Work = dynamic(() => import("@/components/sections/Work").then(mod => mod.Work), { ssr: false });
const Process = dynamic(() => import("@/components/sections/Process").then(mod => mod.Process), { ssr: false });
const Pricing = dynamic(() => import("@/components/sections/Pricing").then(mod => mod.Pricing), { ssr: false });
const CTASection = dynamic(() => import("@/components/sections/CTASection").then(mod => mod.CTASection), { ssr: false });

export function HomeClient() {
  return (
    <>
      <Hero />
      <Marquee
        items={["Digital Forge", "High-Performance Solo Studio", "Built for Speed", "Real-World Impact", "Zero Fluff", "Direct execution"]}
        variant="dark"
        direction="right"
        speed={35}
        separator=" · "
        aria-hidden="true"
      />
      <About />
      <Marquee
        items={["Web Design", "Graphic Design", "Brand Identity", "UI / UX", "Development", "Print Design", "Redesigns"]}
        variant="lime"
        speed={30}
        aria-hidden="true"
      />
      <Industries />
      <Marquee
        items={["SaaS & Enterprise", "Fintech / Neo-Banking", "AI & Machine Learning", "Web3 / Digital Assets", "High-End E-commerce"]}
        variant="dark"
        direction="right"
        speed={35}
        separator="·"
        aria-hidden="true"
      />
      <Services />
      <Marquee
        items={["High Performance", "Pixel Perfect", "Zero Handoff Loss", "SEO Optimized", "Scaleable Architecture"]}
        variant="lime"
        speed={35}
        aria-hidden="true"
      />
      <Work />
      <Marquee
        items={["Got existing work?", "I'll make it what it should have been", "Redesigns are a specialty"]}
        variant="dark"
        direction="right"
        speed={35}
        separator="·"
        aria-hidden="true"
      />
      <Process />
      <Marquee
        items={["Zero Friction", "Direct Access", "3-Step Sync", "No Handoff Gaps", "Rapid Execution", "Clear Strategy"]}
        variant="lime"
        speed={40}
        aria-hidden="true"
      />
      <Pricing />
      <Marquee
        items={["Ready to Forge?", "Level Up Your Product", "Stop Settling for Less", "Direct Access to the Builder", "Build it Better", "Start Your Project →"]}
        variant="dark"
        direction="right"
        speed={40}
        separator=" · "
        aria-hidden="true"
      />
      <CTASection />
    </>
  );
}
