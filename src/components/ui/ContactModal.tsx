"use client";

import { useState, useEffect } from "react";
import { m, AnimatePresence } from "framer-motion";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const [step, setStep] = useState<number | 'done'>(1);
  const [selectedOpt, setSelectedOpt] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    project: ""
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      setStep(1);
      setSubmitError("");
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isOpen]);

  const handleSubmit = async () => {
    if (!selectedOpt || !formData.name || !formData.email || !formData.project) {
      setSubmitError("Please fill all fields.");
      return;
    }

    setIsSubmitting(true);
    setSubmitError("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          selectedOpt
        })
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Failed to send message");

      setStep('done');
    } catch (err: any) { // eslint-disable-line @typescript-eslint/no-explicit-any
      setSubmitError(err.message || "Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleNext = () => {
    if (step === 1) {
      if (!selectedOpt) {
        setSubmitError("Please select an option.");
        return;
      }
      setSubmitError("");
      setStep(2);
    } else if (step === 2) {
      if (!formData.name || !formData.email) {
        setSubmitError("Name and email are required.");
        return;
      }
      if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
        setSubmitError("Invalid email address.");
        return;
      }
      setSubmitError("");
      setStep(3);
    } else if (step === 3) {
      handleSubmit();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div 
          id="modal-bg" 
          className="fixed inset-0 z-[2000] bg-[rgba(5,5,10,0.9)] backdrop-blur-[20px] flex items-center justify-center p-4 md:p-8"
          onClick={(e) => e.target === e.currentTarget && onClose()}
        >
          <m.div
            initial={{ opacity: 0, scale: 0.96, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 30 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="modal relative bg-[rgba(13,13,21,0.97)] border border-white/10 backdrop-blur-[32px] w-full max-w-[540px] p-8 md:p-12 overflow-hidden"
          >
            <button 
              className="modal-close absolute top-5 right-5 bg-transparent border border-white/10 text-white/72 hover:border-white/25 hover:text-white font-mono text-[10px] tracking-[0.1em] px-3 py-1.5 transition-all cursor-none"
              onClick={onClose}
              disabled={isSubmitting}
            >
              ESC ✕
            </button>

            {step !== 'done' && (
              <div className="modal-progress flex gap-[5px] mb-7">
                {[1, 2, 3].map(i => (
                  <div 
                    key={i} 
                    className={cn(
                      "mp-dot w-[28px] h-[3px] transition-all duration-300",
                      (typeof step === 'number' && i <= step) ? "bg-lime" : "bg-white/10"
                    )} 
                  />
                ))}
              </div>
            )}

            <AnimatePresence mode="wait">
              {step === 1 && (
                <m.div
                  key="step1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="modal-step active"
                >
                  <div className="modal-tag font-mono text-[9.5px] tracking-[0.2em] uppercase text-lime mb-[10px]">Step 1 of 3</div>
                  <div className="modal-q font-display font-black text-4xl uppercase leading-[0.95] mb-7">What do you need?</div>
                  <div className="modal-opts grid grid-cols-2 gap-2 mb-6">
                    {["New Website", "Redesign", "Brand Identity", "Graphic Design"].map(opt => (
                      <button
                        key={opt}
                        className={cn(
                          "modal-opt bg-white/5 border border-white/10 p-4 font-display font-bold text-base uppercase text-left transition-all hover:bg-lime/10 hover:border-lime/30 hover:text-lime cursor-none",
                          selectedOpt === opt && "bg-lime/10 border-lime/30 text-lime"
                        )}
                        onClick={() => { setSelectedOpt(opt); setSubmitError(""); }}
                      >
                        {opt}
                      </button>
                    ))}
                    <button
                      className={cn(
                        "modal-opt col-span-2 bg-white/5 border border-white/10 p-4 font-display font-bold text-base uppercase text-left transition-all hover:bg-lime/10 hover:border-lime/30 hover:text-lime cursor-none",
                        selectedOpt === "Something Else" && "bg-lime/10 border-lime/30 text-lime"
                      )}
                      onClick={() => { setSelectedOpt("Something Else"); setSubmitError(""); }}
                    >
                      Something Else
                    </button>
                  </div>
                  {submitError && <div className="text-red-500 font-mono text-[10px] uppercase mb-4 tracking-wider">{submitError}</div>}
                  <button className="modal-next w-full md:w-auto bg-lime text-bg font-display font-bold text-[15px] tracking-[0.12em] uppercase px-9 py-[15px] mt-2 transition-all hover:bg-[#d4ff22] cursor-none" onClick={handleNext}>Next →</button>
                </m.div>
              )}

              {step === 2 && (
                <m.div
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="modal-step active"
                >
                  <div className="modal-tag font-mono text-[9.5px] tracking-[0.2em] uppercase text-lime mb-[10px]">Step 2 of 3</div>
                  <div className="modal-q font-display font-black text-4xl uppercase leading-[0.95] mb-7">Who are you?</div>
                  <input 
                    className="modal-inp w-full bg-white/5 border border-white/10 text-white font-body text-sm p-[14px_18px] mb-3 outline-none focus:border-lime/40 transition-all placeholder:text-white/45 cursor-text" 
                    type="text" 
                    placeholder="Your name"
                    value={formData.name}
                    onChange={e => { setFormData({...formData, name: e.target.value}); setSubmitError(""); }}
                  />
                  <input 
                    className="modal-inp w-full bg-white/5 border border-white/10 text-white font-body text-sm p-[14px_18px] mb-3 outline-none focus:border-lime/40 transition-all placeholder:text-white/45 cursor-text" 
                    type="email" 
                    placeholder="Your email address"
                    value={formData.email}
                    onChange={e => { setFormData({...formData, email: e.target.value}); setSubmitError(""); }}
                  />
                  {submitError && <div className="text-red-500 font-mono text-[10px] uppercase mb-4 tracking-wider">{submitError}</div>}
                  <button className="modal-next w-full md:w-auto bg-lime text-bg font-display font-bold text-[15px] tracking-[0.12em] uppercase px-9 py-[15px] mt-2 transition-all hover:bg-[#d4ff22] cursor-none" onClick={handleNext}>Next →</button>
                </m.div>
              )}

              {step === 3 && (
                <m.div
                  key="step3"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="modal-step active"
                >
                  <div className="modal-tag font-mono text-[9.5px] tracking-[0.2em] uppercase text-lime mb-[10px]">Step 3 of 3</div>
                  <div className="modal-q font-display font-black text-4xl uppercase leading-[0.95] mb-7">Tell me about the project</div>
                  <textarea 
                    className="modal-inp w-full bg-white/5 border border-white/10 text-white font-body text-sm p-[14px_18px] mb-3 outline-none focus:border-lime/40 transition-all placeholder:text-white/45 h-[100px] resize-none cursor-text" 
                    placeholder="What's the project? Timeline? Budget? Any references?"
                    value={formData.project}
                    onChange={e => { setFormData({...formData, project: e.target.value}); setSubmitError(""); }}
                  />
                  {submitError && <div className="text-red-500 font-mono text-[10px] uppercase mb-4 tracking-wider">{submitError}</div>}
                  <button 
                    className={cn(
                      "modal-next w-full md:w-auto font-display font-bold text-[15px] tracking-[0.12em] uppercase px-9 py-[15px] mt-2 transition-all cursor-none",
                      isSubmitting ? "bg-white/10 text-white/60 pointer-events-none" : "bg-lime text-bg hover:bg-[#d4ff22]"
                    )}
                    onClick={handleNext}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "SENDING..." : "Send It →"}
                  </button>
                </m.div>
              )}

              {step === 'done' && (
                <m.div
                  key="done"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="modal-success text-center py-5"
                >
                  <div className="ms-ico text-5xl mb-4">✦</div>
                  <div className="ms-title font-display font-black text-4xl uppercase text-lime mb-2.5">Got it.</div>
                  <p className="ms-sub text-sm text-dim leading-[1.8]">I&apos;ll be in touch within 24 hours.<br />Check your inbox for a confirmation.</p>
                  <button 
                    className="mt-8 font-mono text-[10px] tracking-widest uppercase text-dim border border-white/10 px-10 py-4 hover:border-lime hover:text-lime transition-all cursor-none"
                    onClick={onClose}
                  >
                    Back to Studio
                  </button>
                </m.div>
              )}
            </AnimatePresence>
          </m.div>
        </div>
      )}
    </AnimatePresence>
  );
}
