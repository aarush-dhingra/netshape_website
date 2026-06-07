import dynamic from "next/dynamic";
import { Hero } from "@/components/sections/Hero";
import { WhatIsNetShape } from "@/components/sections/WhatIsNetShape";
import { FeaturesGrid } from "@/components/sections/FeaturesGrid";
import { QuickStart } from "@/components/sections/QuickStart";
import { Installation } from "@/components/sections/Installation";

const Footer = dynamic(
  () => import("@/components/sections/Footer").then((m) => ({ default: m.Footer })),
  { ssr: true },
);

export default function Home() {
  return (
    <>
      <Hero />
      <WhatIsNetShape />
      <FeaturesGrid />
      <QuickStart />
      <Installation />
      <Footer />
    </>
  );
}
