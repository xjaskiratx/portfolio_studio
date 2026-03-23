"use client";

import dynamic from "next/dynamic";
import { Marquee } from "@/components/ui/Marquee";

const Hero = dynamic(() => import("@/components/sections/Hero").then(mod => mod.Hero), { 
  ssr: false,
  loading: () => <div className="min-h-[100svh] bg-bg" />
});
const About = dynamic(() => import("@/components/sections/About").then(mod => mod.About), { ssr: false });
const Services = dynamic(() => import("@/components/sections/Services").then(mod => mod.Services), { ssr: false });
const Work = dynamic(() => import("@/components/sections/Work").then(mod => mod.Work), { ssr: false });
const CTASection = dynamic(() => import("@/components/sections/CTASection").then(mod => mod.CTASection), { ssr: false });

export function HomeClient() {
  return (
    <>
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
      <CTASection />
    </>
  );
}
