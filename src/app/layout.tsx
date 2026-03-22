import type { Metadata } from "next";
import "./globals.css";
import { ThreePatchInitializer } from "@/components/ThreePatchInitializer";

export const metadata: Metadata = {
  title: "JSX W&D — Digital Forge | Full-Spectrum Design & Dev",
  description: "JSX W&D — Digital Forge (portfolio_studio): A premium solo studio specializing in top-tier Web Design, Brand Identity, and Full-Stack Development. Crafting high-performance digital excellence with technical precision and high-end design from Ludhiana, India.",
  keywords: ["Web Design", "Graphic Design", "Brand Identity", "Full-Stack Developer", "Next.js", "React", "Digital Forge", "Ludhiana", "portfolio_studio"],
  authors: [{ name: "Jaskirat Singh" }],
  openGraph: {
    title: "JSX W&D — Digital Forge",
    description: "Premium Digital Design & Development Studio.",
    url: "https://jsxwd.com",
    siteName: "JSX W&D",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "JSX W&D — Digital Forge",
    description: "Premium Digital Design & Development Studio.",
  },
};

import { Preloader } from "@/components/ui/Preloader";
import { ScrollProgress } from "@/components/ui/ScrollProgress";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className="antialiased"
    >
      <body className="bg-bg text-txt font-body selection:bg-lime/30 selection:text-lime">
        <ThreePatchInitializer />
        <Preloader />
        <ScrollProgress />
        {children}
      </body>
    </html>
  );
}
