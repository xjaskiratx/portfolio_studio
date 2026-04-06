"use client";

import typS from "@/styles/Typography.module.css";
import btnS from "@/components/ui/Buttons.module.css";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { ScrambleOutline } from "@/components/ui/ScrambleOutline";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const plans = [
  {
    name: "Basic Build",
    description: "Basic development and design",
    features: [
      "Upto 4 Pages",
      "Basic SEO and Performance Optimization",
      "Standard Transitions",
      "Upto 2 Revisions",
      "Free support for 45 days"
    ],
    cta: "Forge Base"
  },
  {
    name: "Eco Build",
    description: "Full-stack development and design",
    features: [
      "Everything in Base",
      "Core SEO and Performance Optimization",
      "Custom Animations and Transitions",
      "Database Setup",
      "Upto 3 Revisions",
      "Free support for 60 days"
    ],
    cta: "Forge Pro"
  },
  {
    name: "Pro Build",
    description: "Advanced web apps and interactive platforms.",
    features: [
      "Everything in Eco",
      "Advanced SEO and Performance Optimizations",
      "Custom CMS and RFQ Systems",
      "Third-Party API Integrations",
      "Database & Auth Systems",
      "Upto 5 Revisions",
      "Free support for 90 days"
    ],
    cta: "Forge App"
  }
];

export function Pricing() {
  return (
    <section id="pricing" className="sec relative bg-transparent md:bg-bg overflow-hidden scroll-mt-20">
      <div className="max-w-[1400px] mx-auto relative z-10">
        <div className="rv mb-16 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-3 mb-6">
            <div className="w-10 h-px bg-lime/40 hidden md:block" />
            <span className="font-mono text-[14px] tracking-[0.24em] uppercase text-lime text-center md:text-left">Price Planning Guide</span>
          </div>
          <h2 className={cn(typS.secTitle, "max-[767px]:!text-[46px] max-[767px]:!leading-[1.1]")}>
            Select Your <ScrambleOutline text="Build." className="[-webkit-text-stroke:2px_rgba(237,233,223,0.35)] text-transparent" />
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-12">
          {plans.map((plan, i) => (
            <div
              key={i}
              className={cn(
                "rv group p-8 lg:p-10 border border-white/7 bg-white/[0.015] hover:border-lime/30 hover:bg-lime/[0.01] transition-all duration-500 flex flex-col items-start min-h-[500px]"
              )}

              style={{ transitionDelay: `${i * 0.1}s` }}
            >
              <div className="mb-3 md:mb-8 text-left w-full">
                <h3 className="font-display font-black text-[28px] md:text-[32px] lg:text-[38px] tracking-[0.08em] uppercase text-white mb-1">{plan.name}</h3>
                <p className="font-light text-[14px] md:text-[15px] text-dim leading-relaxed h-auto md:h-[44px]">{plan.description}</p>
              </div>

              <div className="w-full h-px bg-white/15 mb-3 md:mb-8" />

              <ul className="space-y-4 mb-auto w-full">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-3">
                    <div className="w-1.5 h-1.5 bg-lime rotate-45 shrink-0" />
                    <span className="font-mono text-[13px] tracking-[0.14em] uppercase text-white/72">{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                className={cn(
                  btnS.btnO + " bg-lime/5 border-lime/20 text-lime hover:bg-lime/15 hover:border-lime/40",
                  "w-full h-14 mt-10 font-display font-black text-sm tracking-[0.18em] uppercase transition-all cursor-none"
                )}
                onClick={() => window.dispatchEvent(new CustomEvent("open-contact-modal"))}
              >
                Discuss {plan.name}
              </button>
            </div>
          ))}

        </div>

        {/* Custom Section */}
        <div className="rv w-full border-t border-white/7 pt-10" style={{ transitionDelay: '0.4s' }}>
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 px-4 md:px-10 py-6 border border-dashed border-white/10 group cursor-none"
            onClick={() => window.dispatchEvent(new CustomEvent("open-contact-modal"))}>
            <div className="flex flex-col md:flex-row items-center gap-4 text-center md:text-left">
              <span className="font-display font-black text-[22px] tracking-[0.12em] uppercase text-lime">Looking for a custom project?</span>
              <span className="font-mono text-[14px] tracking-[0.18em] uppercase text-muted">I handle complex and personalized enterprise solutions too.</span>
            </div>
            <span className="font-display font-black text-sm tracking-[0.24em] uppercase text-white group-hover:text-lime transition-colors">Let&apos;s Talk →</span>
          </div>
        </div>
      </div>
    </section>
  );
}
