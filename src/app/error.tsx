"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service if needed
    console.error(error);
  }, [error]);

  return (
    <main className="min-h-screen bg-bg flex flex-col items-center justify-center p-6 text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="max-w-xl w-full border border-red/20 bg-red/[0.02] p-12 backdrop-blur-xl"
      >
        <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-red block mb-6">
          System Breach // Runtime Exception
        </span>
        <h2 className="font-display font-black text-5xl md:text-6xl uppercase leading-tight mb-6">
          Something <br /> went wrong
        </h2>
        <p className="font-body text-dim mb-10 text-base opacity-80 italic">
          &ldquo;{error.message || "An unexpected error occurred in the digital fabric."}&rdquo;
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => reset()}
            className="w-full sm:w-auto bg-red text-white px-8 py-4 font-display font-black uppercase tracking-widest hover:bg-white hover:text-red transition-all duration-300"
          >
            Attempt Recovery
          </button>
          <button 
            onClick={() => window.location.href = '/'}
            className="w-full sm:w-auto border border-white/10 text-white/60 px-8 py-4 font-display font-black uppercase tracking-widest hover:bg-white/5 hover:text-white transition-all duration-300"
          >
            Emergency Exit
          </button>
        </div>
      </motion.div>
    </main>
  );
}
