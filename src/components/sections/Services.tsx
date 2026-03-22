"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";

const services = [
  {
    num: "01",
    title: "Web Design & Dev",
    desc: "End-to-end digital products. Wireframe to deployed app — no handoff losses, one vision throughout.",
    tags: ["React", "Next.js", "Figma", "Webflow"],
    icon: (
      <svg viewBox="0 0 54 54" fill="none">
        <rect x="1" y="1" width="52" height="52" rx="3" stroke="currentColor" strokeWidth="1" className="opacity-20" />
        <rect x="7" y="7" width="40" height="7" rx="1.5" fill="currentColor" className="opacity-18" />
        <rect x="7" y="20" width="26" height="5" rx="1" fill="currentColor" className="opacity-9" />
        <rect x="7" y="30" width="40" height="16" rx="2" fill="currentColor" className="opacity-6" stroke="currentColor" strokeWidth="1" />
        <motion.circle 
          cx="46" cy="46" r="6" 
          stroke="currentColor" strokeWidth="1" fill="currentColor" className="opacity-12"
          animate={{ rotate: 360 }}
          transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
        />
      </svg>
    )
  },
  {
    num: "02",
    title: "Graphic Design",
    desc: "Posters, editorial layouts, social assets, print collateral — visuals that stop people mid-scroll.",
    tags: ["Illustrator", "Photoshop", "InDesign"],
    icon: (
      <svg viewBox="0 0 54 54" fill="none">
        <circle cx="27" cy="27" r="25" stroke="currentColor" strokeWidth="1" className="opacity-20" />
        <circle cx="27" cy="27" r="15" stroke="currentColor" strokeWidth="1" strokeDasharray="5 3" className="opacity-15" />
        <polygon points="27,12 36,28 18,28" fill="currentColor" className="opacity-14" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
        <circle cx="27" cy="27" r="4" fill="currentColor" className="text-lime" />
      </svg>
    )
  },
  {
    num: "03",
    title: "Brand Identity",
    desc: "Logo systems, type hierarchies, colour palettes, brand guidelines — the full visual language of your business.",
    tags: ["Logo", "Guidelines", "Strategy"],
    icon: (
      <svg viewBox="0 0 54 54" fill="none">
        <rect x="4" y="16" width="46" height="34" rx="2" stroke="currentColor" strokeWidth="1" fill="currentColor" className="opacity-3" />
        <rect x="4" y="4" width="46" height="11" rx="2" fill="currentColor" className="opacity-14" />
        <rect x="14" y="26" width="26" height="16" rx="1" fill="currentColor" className="opacity-8" stroke="currentColor" strokeWidth="1" />
        <line x1="7" y1="26" x2="11" y2="26" stroke="currentColor" strokeWidth="1.5" className="opacity-40" />
        <line x1="43" y1="26" x2="47" y2="26" stroke="currentColor" strokeWidth="1.5" className="opacity-40" />
      </svg>
    )
  }
];

const miniServices = [
  "UI / UX Design",
  "Print & Collateral",
  "Redesigns & Audits"
];

function ServiceCard({ service }: { service: typeof services[0] }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [10, -10]), { damping: 25, stiffness: 150 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-13, 13]), { damping: 25, stiffness: 150 });
  const scale = useSpring(1, { damping: 25, stiffness: 150 });
  const rectRef = useRef<DOMRect | null>(null);

  const onMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    rectRef.current = e.currentTarget.getBoundingClientRect();
    scale.set(1.02);
  };

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = rectRef.current;
    if (!rect) return;
    
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    x.set(px);
    y.set(py);
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  const onMouseLeave = () => {
    x.set(0);
    y.set(0);
    scale.set(1);
    rectRef.current = null;
  };

  return (
    <motion.div
      style={{ rotateX, rotateY, scale, perspective: 1000 }}
      onMouseEnter={onMouseEnter}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className="group relative bg-bg p-12 md:p-[58px_48px] overflow-hidden cursor-none transition-all duration-500 hover:bg-[#090912] rv sp border border-white/[0.03]"
    >
      {/* Glow */}
      <motion.div 
        className="absolute w-[320px] h-[320px] rounded-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity z-0"
        style={{
          left: mouseX,
          top: mouseY,
          background: "radial-gradient(circle, rgba(200,255,0,0.1), transparent 70%)",
          translateX: "-50%",
          translateY: "-50%",
        }}
      />
      
      {/* Bottom Bar */}
      <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-lime scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />

      <div className="relative z-10">
        <div className="font-mono text-[10.5px] tracking-[0.2em] text-lime mb-7 uppercase">— {service.num}</div>
        <div className="w-[60px] h-[60px] mb-8 text-lime transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3">{service.icon}</div>
        <h3 className="font-display font-black text-[32px] uppercase leading-none mb-4 group-hover:text-lime transition-all max-[479px]:text-3xl">
          {service.title}
        </h3>
        <p className="text-[14.5px] font-light text-dim leading-relaxed mb-8 group-hover:text-white transition-colors">
          {service.desc}
        </p>
        <div className="flex flex-wrap gap-2">
          {service.tags.map(tag => (
            <span key={tag} className="font-mono text-[9px] tracking-[0.14em] uppercase text-lime/55 border border-lime/20 px-3 py-1.5 transition-all group-hover:bg-lime/10 group-hover:text-lime group-hover:border-lime/40">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

import { useInView } from "framer-motion";
import { ScrambleOutline } from "@/components/ui/ScrambleOutline";

export function Services() {
  const ref = useRef(null);
  useInView(ref, { once: true, margin: "-10%" });

  return (
    <section id="services" className="sec relative bg-bg2 overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[radial-gradient(circle,rgba(200,255,0,0.03),transparent_70%)] pointer-events-none" />
      <div className="absolute left-[-200px] bottom-[-200px] font-display font-black text-[380px] text-transparent [-webkit-text-stroke:1px_rgba(200,255,0,0.02)] leading-none select-none pointer-events-none uppercase">Forge</div>

      <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-end gap-12 mb-20 px-4" ref={ref}>
        <div className="rv">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-px bg-lime/40" />
            <span className="font-mono text-[10px] tracking-[0.24em] uppercase text-lime">Core Capabilities</span>
          </div>
          <h2 className="sec-title">The <ScrambleOutline text="Digital" className="[-webkit-text-stroke:2px_rgba(237,233,223,0.35)] text-transparent" /> Forge</h2>
        </div>
        <p className="rv text-[15px] font-light text-dim max-w-[420px] leading-relaxed group">
          One expert, zero handoff losses. I handle everything from initial strategy to final deployment, ensuring <span className="grad-text">pixel-perfect execution</span> at every stage.
        </p>
      </div>

      <div className="relative z-20 grid grid-cols-1 md:grid-cols-3 gap-[4px] bg-white/[0.04] border-y border-white/[0.04]">
        {services.map((service) => (
          <ServiceCard key={service.num} service={service} />
        ))}
      </div>

      <div className="relative z-20 grid grid-cols-1 md:grid-cols-3 gap-[4px] mt-[4px] bg-white/[0.04] border-b border-white/[0.04]">
        {miniServices.map((name, i) => (
          <motion.div
            key={name}
            className="rv si group/mini bg-bg p-[34px_48px] flex items-center gap-5 cursor-none transition-all duration-500 hover:bg-[#0e0e16]"
            style={{ transitionDelay: `${0.1 * i}s` }}
          >
            <div className="w-[10px] h-[10px] bg-lime shrink-0 [clip-path:polygon(50%_0,100%_50%,50%_100%,0_50%)] group-hover/mini:rotate-[45deg] group-hover/mini:scale-150 transition-all duration-500" />
            <span className="font-display font-black text-[22px] uppercase group-hover/mini:text-lime transition-colors tracking-tighter">
              {name}
            </span>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
