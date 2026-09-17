"use client";

import { useSite } from "@/lib/providers";
import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/Hero";
import { ExperienceTimeline } from "@/components/ExperienceTimeline";
import { Projects } from "@/components/Projects";
import { HowIThink } from "@/components/HowIThink";
import { SkillClusters } from "@/components/SkillClusters";
import { About } from "@/components/About";
import { ContactCTA } from "@/components/ContactCTA";
import { Footer } from "@/components/Footer";
import { CursorSpotlight } from "@/components/CursorSpotlight";
import { RecruiterView } from "@/components/RecruiterView";
import { ScrollProgress } from "@/components/ScrollProgress";

export default function Home() {
  const { viewMode } = useSite();

  return (
    <>
      <ScrollProgress />
      <CursorSpotlight />
      <Navigation />
      <main id="main">
        {viewMode === "recruiter" ? (
          <RecruiterView />
        ) : (
          <>
            <Hero />
            <ExperienceTimeline />
            <Projects />
            <HowIThink />
            <SkillClusters />
            <About />
          </>
        )}
        <ContactCTA />
      </main>
      <Footer />
    </>
  );
}
