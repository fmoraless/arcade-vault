"use client";

import HomeHero from "@/home/components/HomeHero";
import FeatureGrid from "@/home/components/FeatureGrid";
import MiniRail from "@/home/components/MiniRail";
import HomeStats from "@/home/components/HomeStats";
import ActivityLive from "@/home/components/ActivityLive";
import PricingSection from "@/home/components/PricingSection";
import FinalCta from "@/home/components/FinalCta";
import { useReveal } from "@/home/components/useReveal";

export default function HomePage() {
  useReveal();

  return (
    <main className="home fade-in">
      <HomeHero />
      <FeatureGrid />
      <MiniRail />
      <HomeStats />
      <ActivityLive />
      <PricingSection />
      <FinalCta />
    </main>
  );
}