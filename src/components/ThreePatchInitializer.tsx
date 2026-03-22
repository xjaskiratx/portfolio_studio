"use client";

import { useEffect } from "react";
import "@/lib/three-patch";

/**
 * Client Component that initializes the THREE.js patch.
 * This ensures the patch (side-effects like monkey-patching console.warn and THREE.Clock)
 * runs in the browser context as early as possible.
 */
export function ThreePatchInitializer() {
  useEffect(() => {
    // The patch itself runs on import, but we include this component 
    // to ensure it's part of the client-side bundle and execution graph.
  }, []);

  return null;
}
