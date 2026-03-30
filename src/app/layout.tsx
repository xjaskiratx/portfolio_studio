import type { Metadata } from "next";
import "./globals.css";
import "./animations.css";
import localFont from "next/font/local";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { ThreePatchInitializer } from "@/components/ThreePatchInitializer";
import { Preloader } from "@/components/ui/Preloader";
import { ScrollProgress } from "@/components/ui/ScrollProgress";

const bigShoulders = localFont({
  src: "../../public/fonts/BigShoulders-VariableFont_opsz,wght.ttf",
  variable: "--font-big-shoulders",
  weight: "100 900",
  display: "swap",
});

const spaceGrotesk = localFont({
  src: "../../public/fonts/SpaceGrotesk-VariableFont_wght.ttf",
  variable: "--font-space-grotesk",
  weight: "100 900",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://jsx-studios.vercel.app"),
  title: "JSX W&D — Web Designer & Graphic Designer in Ludhiana, India",
  description: "Full-spectrum creative studio. Web design, development, brand identity, and graphic design. Based in Ludhiana, Punjab. I build what agencies charge 10× for.",
  keywords: ["web designer ludhiana", "graphic designer punjab", "full stack developer india", "brand identity designer", "website redesign india", "freelance web developer ludhiana"],
  authors: [{ name: "Jaskirat Singh" }],
  openGraph: {
    title: "JSX W&D — Digital Forge Studio",
    description: "Web design, development, graphic design, brand identity. Ludhiana, India.",
    url: "https://jsx-studios.vercel.app",
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
  icons: {
    icon: "/favicon.webp",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${bigShoulders.variable} ${spaceGrotesk.variable} antialiased`}
      suppressHydrationWarning
    >
      <head>
        <meta httpEquiv="Content-Security-Policy" content="font-src 'self' data: blob:;" />
        <style dangerouslySetInnerHTML={{ __html: `html,body{background:#05050a;color:#ede9df;}` }} />
      </head>
      <body className="bg-bg text-txt font-body selection:bg-lime/30 selection:text-lime">
        <ThreePatchInitializer />
        <Preloader />
        <ScrollProgress />
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
