"use client";

import { useEffect } from "react";

export function DeferredStyles() {
  useEffect(() => {
    // Dynamic imports for CSS files ensure they are loaded after the initial render-blocking cycle.
    // This improves Lighthouse performance scores specifically for Render-Blocking Resources.
    
    // Non-critical CSS layer 1: Standard animations
    import("./animations.css");
    
    // Non-critical CSS layer 2: Safari & Cross-browser fixes
    import("@/styles/safari-fixes.css");
  }, []);

  return null;
}
