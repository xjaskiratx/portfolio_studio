// Only silence specific deprecation warnings related to THREE.Clock
// to avoid hiding real issues in custom Three.js code.
if (typeof window !== "undefined") {
  console.log("🛠️ THREE patch: Initializing console.warn interceptor...");
  const originalConsoleWarn = console.warn;
  console.warn = function (...args: unknown[]) {
    const msg = args[0] ? String(args[0]) : "";
    // Only silence specific deprecation warnings related to THREE.Clock
    // to avoid hiding real issues in custom Three.js code.
    if (
      msg.includes("THREE") &&
      msg.includes("Clock") &&
      msg.includes("deprecated")
    ) {
      // Intentionally silent
      return;
    }
    originalConsoleWarn.apply(console, args);
  };
}

// Note: Global redefinition of THREE.Clock was removed as it caused 
// "Cannot redefine property: Clock" errors in certain environments (Turbopack).
// The console.warn interceptor above sufficiently silences the deprecation warnings.

// Keep the warning silenced for this session if it's coming from libraries
// that captured THREE.Clock before this patch, but usually they'll use the patched version now.
// We'll restore it if needed, but keeping it silenced for Clock is safer.
