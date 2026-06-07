import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { NavBar } from "@/components/layout/NavBar";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: "NetShape — Simulate network conditions for any app",
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
  },
  description:
    "Run any app through a local throttling proxy. Simulate 2G, 3G, satellite, congested networks — no admin, no OS rules. pip install netshape.",
  metadataBase: new URL("https://netshape.vercel.app"),
  keywords: [
    "network throttling",
    "proxy",
    "developer tools",
    "network simulation",
    "latency",
    "bandwidth",
    "testing",
    "CLI",
  ],
  openGraph: {
    title: "NetShape — Network condition simulator for developers",
    description:
      "Run any app through a local throttling proxy. No admin, no OS rules. Cross-platform.",
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "NetShape — Network condition simulator for developers",
    description:
      "Run any app through a local throttling proxy. No admin, no OS rules.",
    images: ["/og-image.png"],
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
      className={`${inter.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-terminal-bg">
        <a
          href="#hero"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-terminal-surface focus:text-accent-green focus:rounded-lg focus:border focus:border-accent-green focus:font-mono focus:text-sm"
        >
          Skip to content
        </a>
        <NavBar />
        <main className="flex-1">{children}</main>
      </body>
    </html>
  );
}
