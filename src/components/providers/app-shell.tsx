"use client";

import { CommandCenterProvider } from "@/context/command-center-context";
import { Navbar } from "@/components/layout/navbar";
import { ScrollProgress } from "@/components/ui/scroll-progress";
import { SpotlightCursor } from "@/components/ui/spotlight-cursor";
import { SectionDivider } from "@/components/ui/section-divider";
import { CommandPalette } from "@/components/command/command-palette";
import { SystemHUD } from "@/components/command/system-hud";
import { PresentationMode } from "@/components/command/presentation-mode";
import { HeroSection } from "@/components/sections/hero";
import { StrategicImperativeSection } from "@/components/sections/strategic-imperative";
import { SCMFrameworkSection } from "@/components/sections/scm-framework";
import { SymbioticLoopsSection } from "@/components/sections/symbiotic-loops";
import { GlobalEnablersSection } from "@/components/sections/global-enablers";
import { RoadmapSection } from "@/components/sections/roadmap";
import { ImpactDashboardSection } from "@/components/sections/impact-dashboard";
import { RisksWinningSection } from "@/components/sections/risks-winning";
import { CommandCenterSection } from "@/components/sections/command-center";
import { ClosingSection } from "@/components/sections/closing";

export function AppShell() {
  return (
    <CommandCenterProvider>
      <ScrollProgress />
      <SpotlightCursor />
      <CommandPalette />
      <SystemHUD />
      <PresentationMode />
      <Navbar />
      <main>
        <HeroSection />
        <SectionDivider />
        <StrategicImperativeSection />
        <SectionDivider />
        <SCMFrameworkSection />
        <SectionDivider />
        <SymbioticLoopsSection />
        <SectionDivider />
        <GlobalEnablersSection />
        <SectionDivider />
        <RoadmapSection />
        <SectionDivider />
        <ImpactDashboardSection />
        <SectionDivider />
        <RisksWinningSection />
        <SectionDivider />
        <CommandCenterSection />
        <ClosingSection />
      </main>
    </CommandCenterProvider>
  );
}