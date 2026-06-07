import { Hero } from "@/components/sections/Hero";
import { WhatIsNetShape } from "@/components/sections/WhatIsNetShape";
import { FeaturesGrid } from "@/components/sections/FeaturesGrid";
import { ProfilesTable } from "@/components/sections/ProfilesTable";
import { QuickStart } from "@/components/sections/QuickStart";
import { CliReference } from "@/components/sections/CliReference";
import { DashboardPreview } from "@/components/sections/DashboardPreview";
import { Scenarios } from "@/components/sections/Scenarios";
import { ControlApi } from "@/components/sections/ControlApi";
import { Installation } from "@/components/sections/Installation";
import { Footer } from "@/components/sections/Footer";

export default function Home() {
  return (
    <>
      <Hero />
      <WhatIsNetShape />
      <FeaturesGrid />
      <ProfilesTable />
      <QuickStart />
      <CliReference />
      <DashboardPreview />
      <Scenarios />
      <ControlApi />
      <Installation />
      <Footer />
    </>
  );
}
