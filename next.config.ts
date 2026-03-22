import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    optimizePackageImports: [
      "three",
      "@react-three/drei",
      "@react-three/fiber",
      "framer-motion",
      "gsap",
      "lenis"
    ],
  },
};

export default nextConfig;
