import { ClientOverlaysGate } from "@/components/ui/ClientOverlaysGate";
import { SmoothScroll } from "@/components/ui/SmoothScroll";
import { HomeClient } from "@/components/HomeClient";

export default function Home() {
  return (
    <SmoothScroll>
      <main className="relative min-h-screen">
        <ClientOverlaysGate />
        <HomeClient />

        {/* <footer className="bg-bg border-t border-border py-8 px-6 flex justify-center items-center">
          <div className="font-display font-black text-[19px] tracking-[0.08em]">JSX <span className="text-lime">W&D</span></div>
        </footer> */}
      </main>
    </SmoothScroll>
  );
}
