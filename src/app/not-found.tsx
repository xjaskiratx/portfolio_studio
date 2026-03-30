"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ScrambleOutline } from "@/components/ui/ScrambleOutline";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-bg flex flex-col items-center justify-center p-6 text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-2xl w-full"
      >
        <div className="mb-8">
          <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-lime/60 block mb-4">
            Error 404 // Resource Missing
          </span>
          <h1 className="font-display font-black text-7xl md:text-9xl uppercase leading-none tracking-tighter mb-6">
            Lost in <br />
            <ScrambleOutline text="Space" className="text-transparent [-webkit-text-stroke:2px_var(--color-lime)]" />
          </h1>
          <p className="font-body text-dim max-w-md mx-auto mb-10 text-lg leading-relaxed">
            The coordinates you provided lead to a non-existent node in our digital grid. Let&apos;s get you back to the core.
          </p>
        </div>

        <Link href="/">
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center gap-3 bg-lime text-bg px-10 py-5 font-display font-black uppercase tracking-widest hover:bg-white transition-colors duration-300 shadow-[0_0_30px_rgba(200,255,0,0.2)]"
          >
            Return to Base
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </motion.div>
        </Link>
      </motion.div>

      {/* Background Grid Accent */}
      <div className="fixed inset-0 pointer-events-none opacity-20 z-[-1]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,var(--accent-line)_1px,transparent_1px)] bg-[length:40px_40px]" />
      </div>
    </main>
  );
}
