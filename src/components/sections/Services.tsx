import { ScrambleOutline } from "@/components/ui/ScrambleOutline";
import { ServiceCard } from "./ServiceCard";
// import { MiniServiceItem } from "./MiniServiceItem";

const services = [
  {
    num: "01",
    title: "Web Dev & Design",
    features: [
      "Wireframes and layouts",
      "Full-stack products",
      "Responsive systems",
      "Performance Optimization"
    ],
    tags: ["React", "Next.js", "Figma", "Webflow"],
    icon: (
      <svg viewBox="0 0 54 54" fill="none">
        <rect x="1" y="1" width="52" height="52" rx="3" stroke="currentColor" strokeWidth="1" className="opacity-20" />
        <rect x="7" y="7" width="40" height="7" rx="1.5" fill="currentColor" className="opacity-18" />
        <rect x="7" y="20" width="26" height="5" rx="1" fill="currentColor" className="opacity-9" />
        <rect x="7" y="30" width="40" height="16" rx="2" fill="currentColor" className="opacity-6" stroke="currentColor" strokeWidth="1" />
        <circle
          cx="46" cy="46" r="6"
          stroke="currentColor" strokeWidth="1" fill="currentColor" className="opacity-12"
        />
      </svg>
    )
  },
  {
    num: "02",
    title: "Visual Designs",
    features: [
      "Social media visuals",
      "Marketing visuals",
      "Campaign assets",
      "Editorial designs"
    ],
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
    title: "Brand Identity & Systems",
    features: [
      "Logo Systems",
      "Typography and color",
      "Visual direction",
      "Brand guidelines"
    ],
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

// const miniServices = [
//   "UI / UX Design",
//   "Print & Collateral",
//   "Redesigns & Audits"
// ];

export function Services() {
  return (
    <section id="services" className="sec relative bg-bg overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[radial-gradient(circle,rgba(200,255,0,0.03),transparent_70%)] pointer-events-none" />
      <div className="absolute left-[-200px] bottom-[-200px] font-display font-black text-[120px] md:text-[380px] text-transparent [-webkit-text-stroke:1px_rgba(200,255,0,0.02)] leading-none select-none pointer-events-none uppercase">Forge</div>

      <div className="max-w-[1400px] mx-auto relative z-10 flex flex-col md:flex-row justify-between items-start md:items-end gap-12 mb-20">
        <div className="rv">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-px bg-lime/40" />
            <span className="font-mono text-[10px] tracking-[0.24em] uppercase text-lime">What I Do</span>
          </div>
          <h2 className="sec-title">Built For <ScrambleOutline text="Real" className="[-webkit-text-stroke:2px_rgba(237,233,223,0.35)] text-transparent" /> World</h2>
        </div>
        <p className="rv text-[18px] font-light text-dim max-w-[460px] leading-[1.4] group">
          End-to-end execution, from <span className="grad-text">concept to deployment.</span> Fast, scalable and built for  <span className="grad-text">real-world performance.</span>
        </p>
      </div>

      <div className="max-w-[1400px] mx-auto relative z-20 grid grid-cols-1 md:grid-cols-3 gap-[4px] bg-white/[0.04] border-y border-white/[0.04]">
        {services.map((service) => (
          <ServiceCard key={service.num} service={service} />
        ))}
      </div>

      {/* <div className="max-w-[1400px] mx-auto relative z-20 grid grid-cols-1 md:grid-cols-3 gap-[4px] mt-[4px] bg-white/[0.04] border-b border-white/[0.04]">
        {miniServices.map((name, i) => (
          <MiniServiceItem key={name} name={name} index={i} />
        ))}
      </div> */}
    </section>
  );
}
