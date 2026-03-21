"use client";

import { useEffect } from "react";

export function useReveal() {
  useEffect(() => {
    const revEls = document.querySelectorAll(".rv, .wipe, .swipe, .si");
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            // Optional: unobserve if you only want it to reveal once
            // observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    revEls.forEach((el) => observer.observe(el));

    return () => {
      revEls.forEach((el) => observer.unobserve(el));
    };
  }, []);
}
