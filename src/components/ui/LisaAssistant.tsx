"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Option {
  id: string;
  label: string;
}

const OPTIONS: Option[] = [
  { id: "web", label: "I need a new website" },
  { id: "brand", label: "I need brand work" },
  { id: "redesign", label: "I need a redesign" },
  { id: "cost", label: "How much does it cost?" },
  { id: "time", label: "How long does it take?" },
  { id: "just", label: "Just browsing" },
];

const REPLIES: Record<string, string> = {
  web: "New website. Smart move. I'll ask you three questions, build you something people actually remember, and charge you less than an agency would for a kickoff meeting. Want to start?",
  brand: "Brand work is half my life. Logo, type system, colour palette, full guidelines — I do the whole thing. Not just a logo PNG in a zip file. Ready?",
  redesign: "Redesigns are a speciality. Existing site that's almost right but not quite? I'll make it what it should have been.",
  cost: "Honest answer: it depends on scope. A landing page starts lower than you think. A full brand identity + website is priced well below agency rates.",
  time: "Fast. A focused landing page: 5–7 days. A full site: 2–4 weeks. Brand identity: 1–3 weeks. I'm solo, which means no handoff delays.",
  just: "Fair enough. Scroll around. If something catches your eye — and it will — the button's at the bottom.",
};

const HIGH_INTENT = ["web", "brand", "redesign"];

export function LisaAssistant() {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);
  const [isTyping, setIsTyping] = useState(false);
  const [reply, setReply] = useState<string | null>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  const handleOption = (id: string) => {
    if (isTyping) return;
    setSelected(id);
    setIsTyping(true);
    setReply(null);
    setTimeout(() => {
      setReply(REPLIES[id]);
      setIsTyping(false);
    }, 900);
  };

  const openModal = () => {
    window.dispatchEvent(new CustomEvent("open:contact-modal"));
  };

  const reset = () => {
    setSelected(null);
    setReply(null);
    setIsTyping(false);
  };

  // Close on click outside
  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  return (
    <div className="fixed bottom-6 right-6 z-[9999] flex flex-col items-end gap-3" ref={panelRef}>
      {/* Panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.95 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="w-[320px] bg-[rgba(13,13,21,0.95)] backdrop-blur-[28px] border border-white/[0.07] rounded-none overflow-hidden shadow-[0_32px_80px_rgba(0,0,0,0.7)]"
          >
            {/* Header */}
            <div className="px-5 py-4 border-b border-white/[0.06] flex items-center justify-between">
              <div>
                <div className="font-display font-black text-[15px] tracking-wide uppercase text-lime">LISA</div>
                <div className="font-mono text-[8.5px] tracking-[0.18em] uppercase text-muted mt-0.5">Studio Assistant · Online</div>
              </div>
              <div className="w-2 h-2 rounded-full bg-lime animate-pulse" />
            </div>

            {/* Body */}
            <div className="p-4">
              {!selected ? (
                <>
                  <p className="font-mono text-[11px] text-dim leading-relaxed mb-4">
                    Hey. What brings you here?
                  </p>
                  <div className="flex flex-col gap-1.5">
                    {OPTIONS.map((opt) => (
                      <button
                        key={opt.id}
                        onClick={() => handleOption(opt.id)}
                        className="text-left font-mono text-[10.5px] tracking-[0.05em] text-white/78 hover:text-txt border border-white/[0.06] hover:border-lime/30 hover:bg-lime/[0.04] px-3.5 py-2.5 transition-all duration-200 cursor-none"
                        data-cursor="ch"
                      >
                        → {opt.label}
                      </button>
                    ))}
                  </div>
                </>
              ) : (
                <div className="flex flex-col gap-3">
                  {/* User bubble */}
                  <div className="self-end font-mono text-[10.5px] text-lime border border-lime/20 bg-lime/[0.06] px-3 py-2 max-w-[85%]">
                    {OPTIONS.find(o => o.id === selected)?.label}
                  </div>

                  {/* Typing / Reply */}
                  {isTyping ? (
                    <div className="flex items-center gap-1 px-1">
                      {[0, 1, 2].map(i => (
                        <motion.div
                          key={i}
                          className="w-1.5 h-1.5 rounded-full bg-lime/50"
                          animate={{ opacity: [0.3, 1, 0.3] }}
                          transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.2 }}
                        />
                      ))}
                    </div>
                  ) : reply ? (
                    <div className="font-mono text-[10.5px] text-dim leading-relaxed border border-white/[0.06] bg-white/[0.02] px-3.5 py-3">
                      {reply}
                    </div>
                  ) : null}

                  {/* CTA for high-intent options */}
                  {!isTyping && reply && HIGH_INTENT.includes(selected) && (
                    <button
                      onClick={() => { openModal(); setOpen(false); }}
                      className="w-full font-mono text-[10px] tracking-[0.18em] uppercase bg-lime text-bg px-4 py-3 text-center hover:bg-white transition-colors cursor-none"
                      data-cursor="ch"
                    >
                      Start a Project →
                    </button>
                  )}

                  <button
                    onClick={reset}
                    className="self-start font-mono text-[9.5px] tracking-[0.1em] uppercase text-dim hover:text-txt transition-colors mt-1 cursor-none"
                    data-cursor="ch"
                  >
                    ← Back
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle Button */}
      <motion.button
        onClick={() => { setOpen(prev => !prev); if (open) reset(); }}
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.95 }}
        className="w-14 h-14 bg-lime text-bg flex items-center justify-center shadow-[0_8px_32px_rgba(200,255,0,0.3)] hover:shadow-[0_12px_48px_rgba(200,255,0,0.5)] transition-shadow cursor-none"
        data-cursor="ch"
        aria-label="Open LISA assistant"
      >
        <AnimatePresence mode="wait">
          {open ? (
            <motion.span key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} className="text-xl font-bold">×</motion.span>
          ) : (
            <motion.span key="open" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} className="text-xl">✦</motion.span>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
}
