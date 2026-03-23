"use client";

import { useEffect } from "react";

/**
 * Client Component that initializes the THREE.js patch.
 * This uses a dynamic import inside useEffect to ensure THREE.js 
 * is not part of the initial critical-path bundle, reducing main-thread blocking.
 */
export function ThreePatchInitializer() {
  useEffect(() => {
    // Load the patch dynamically after mount
    import("@/lib/three-patch").then(() => {
      console.log("🛠️ THREE patch: Dynamically initialized");
    }).catch(err => {
      console.error("❌ THREE patch: Failed to load", err);
    });
  }, []);

  return null;
}
