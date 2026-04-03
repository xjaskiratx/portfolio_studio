import { ScrambleOutline } from "@/components/ui/ScrambleOutline";
import typS from "@/styles/Typography.module.css";
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
    tags: ["React", "Next.js", "Figma", "Webflow"]
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
    tags: ["Illustrator", "Photoshop", "InDesign"]
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
    tags: ["Logo", "Guidelines", "Strategy"]
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
            <span className="font-mono text-[14px] tracking-[0.24em] uppercase text-lime">What I Do</span>
          </div>
          {/* Heading with focal scramble animation for 'Real' */}
          <h2 className={typS.secTitle}>Built For <ScrambleOutline text="Real" className="[-webkit-text-stroke:2px_rgba(237,233,223,0.35)] text-transparent" /> World</h2>
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
