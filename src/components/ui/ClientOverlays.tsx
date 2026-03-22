"use client";

import { useState, useEffect } from "react";
import { Grain } from "@/components/ui/Grain";
import { Spotlight } from "@/components/ui/Spotlight";
import { Cursor } from "@/components/ui/Cursor";
import { TopStrip } from "@/components/ui/TopStrip";
import { PillNav } from "@/components/ui/PillNav";
import { ContactModal } from "@/components/ui/ContactModal";
import { EasterEgg } from "@/components/ui/EasterEgg";
import { PageBackground } from "@/components/ui/PageBackground";
import { useReveal } from "@/hooks/useReveal";

export function ClientOverlays() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Initialize reveal animations
  useReveal();

  useEffect(() => {
    const handleOpenModal = () => setIsModalOpen(true);
    window.addEventListener("open-contact-modal", handleOpenModal);
    return () => window.removeEventListener("open-contact-modal", handleOpenModal);
  }, []);

  useEffect(() => {
    const sections = ["hero", "about", "services", "work", "gd", "process", "cta"];
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
    </>
  );
}
