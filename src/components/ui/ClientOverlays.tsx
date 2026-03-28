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
    const sections = ["hero", "services", "work", "about", "process", "cta"];
    
    // Use a timeout to ensure dynamic components are mounted in the DOM
    const timer = setTimeout(() => {
      const sectionElements = sections.map(id => document.getElementById(id)).filter(Boolean) as HTMLElement[];

      const observerOptions = {
        root: null,
        rootMargin: "-40% 0% -40% 0%",
        threshold: [0, 0.1]
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

      return () => {
        observer.disconnect();
      };
    }, 800);

    return () => {
      clearTimeout(timer);
    };
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
