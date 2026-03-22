import { TECH_STACK_MARQUEE_ICONS } from "@/components/ui/techIcons";

export function TechStackMarquee() {
  const cells = [...TECH_STACK_MARQUEE_ICONS, ...TECH_STACK_MARQUEE_ICONS, ...TECH_STACK_MARQUEE_ICONS, ...TECH_STACK_MARQUEE_ICONS];
  return (
    <div
      data-cursor="ch"
      className="overflow-hidden whitespace-nowrap user-select-none py-4 flex items-center border-y border-border-subtle group bg-bg2"
      aria-hidden
    >
      <div
        className="flex shrink-0 items-center min-w-full animate-marquee-right"
        style={{ animationDuration: "38s" }}
      >
        {cells.map((Icon, i) => (
          <div key={i} className="flex items-center px-6 md:px-8">
            <Icon />
            <span className="ml-6 md:ml-8 text-white/15 font-black select-none">·</span>
          </div>
        ))}
      </div>
    </div>
  );
}
