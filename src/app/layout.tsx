import type { Metadata } from "next";
import "./globals.css";
import { ThreePatchInitializer } from "@/components/ThreePatchInitializer";

export const metadata: Metadata = {
  metadataBase: new URL("https://jsx-wd.com"),
  title: "JSX W&D — Web Designer & Graphic Designer in Ludhiana, India",
  description: "Full-spectrum creative studio. Web design, development, brand identity, and graphic design. Based in Ludhiana, Punjab. I build what agencies charge 10× for.",
  keywords: ["web designer ludhiana", "graphic designer punjab", "full stack developer india", "brand identity designer", "website redesign india", "freelance web developer ludhiana"],
  authors: [{ name: "Jaskirat Singh" }],
  openGraph: {
    title: "JSX W&D — Digital Forge Studio",
    description: "Web design, development, graphic design, brand identity. Ludhiana, India.",
    url: "https://jsx-wd.com",
    siteName: "JSX W&D",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630 }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "JSX W&D — Digital Forge Studio",
    description: "Web design, development, graphic design, brand identity. Ludhiana, India.",
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
