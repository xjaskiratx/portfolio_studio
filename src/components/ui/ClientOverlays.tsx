"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { Grain } from "@/components/ui/Grain";
import { Spotlight } from "@/components/ui/Spotlight";
import { Cursor } from "@/components/ui/Cursor";
import { TopStrip } from "@/components/ui/TopStrip";
import { PillNav } from "@/components/ui/PillNav";
import { PageBackground } from "@/components/ui/PageBackground";

// Non-critical overlays are loaded dynamically to reduce initial main-thread work
const ContactModal = dynamic(() => import("@/components/ui/ContactModal").then(mod => mod.ContactModal), { ssr: false });
const EasterEgg = dynamic(() => import("@/components/ui/EasterEgg").then(mod => mod.EasterEgg), { ssr: false });
const LisaAssistant = dynamic(() => import("@/components/ui/LisaAssistant").then(mod => mod.LisaAssistant), { ssr: false });

export function ClientOverlays() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const handleOpenModal = () => setIsModalOpen(true);
    window.addEventListener("open-contact-modal", handleOpenModal);
    window.addEventListener("open:contact-modal", handleOpenModal);
    return () => {
      window.removeEventListener("open-contact-modal", handleOpenModal);
      window.removeEventListener("open:contact-modal", handleOpenModal);
    };
  }, []);

  useEffect(() => {
    const sections = ["hero", "about", "services", "work", "process", "cta"];
    const sectionElements = sections.map(id => document.getElementById(id)).filter(Boolean) as HTMLElement[];

    const observerOptions = {
      root: null,
      rootMargin: "-20% 0% -70% 0%",
      threshold: [0, 0.1, 0.5, 1.0]
    };

    const handleIntersect = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const active = entry.target.id;
          const root = document.documentElement;
          
          if (active === "work") {
            root.style.setProperty("--accent-lime", "#c8ff00");
            root.style.setProperty("--accent-glow", "rgba(200, 255, 0, 0.08)");
            root.style.setProperty("--accent-line", "rgba(200, 255, 0, 0.12)");
          } else {
            root.style.setProperty("--accent-lime", "#c8ff00");
            root.style.setProperty("--accent-glow", "rgba(200, 255, 0, 0.06)");
            root.style.setProperty("--accent-line", "rgba(200, 255, 0, 0.1)");
          }
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, observerOptions);
    sectionElements.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <PageBackground />
      <Grain />
      <Spotlight />
      <Cursor />
      <TopStrip />
      <PillNav onHireMe={() => setIsModalOpen(true)} />
      <ContactModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      <EasterEgg />
      <LisaAssistant />
    </>
  );
}
