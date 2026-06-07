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

export const metadata: Metadata = {
  title: "NetShape — Simulate network conditions for desktop apps",
  description:
    "Run desktop apps through a local throttling proxy. Simulate 2G, 3G, satellite, congested networks — no admin, no OS rules. pip install netshape.",
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
      "Run desktop apps through a local throttling proxy. No admin, no OS rules. Cross-platform.",
    type: "website",
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
        <NavBar />
        <main className="flex-1">{children}</main>
      </body>
    </html>
  );
}
