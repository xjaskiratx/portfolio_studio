"use client";

import dynamic from "next/dynamic";

/** Loads overlays on the client only — avoids SSR/hydration drift from Framer, cursor, etc. */
export const ClientOverlaysGate = dynamic(
  () => import("@/components/ui/ClientOverlays").then((m) => m.ClientOverlays),
  { ssr: false }
);
