"use client";

import { motion } from "framer-motion";
import {
  LayoutDashboard, Terminal, Sliders, Globe, Radar,
  GitCompareArrows, TrendingDown, Zap,
} from "lucide-react";
import { SectionHeader } from "@/components/ui/section-header";
import { FadeIn } from "@/components/ui/fade-in";
import { SymbiosisIndex } from "@/components/command/symbiosis-index";
import { LiveTerminal } from "@/components/command/live-terminal";
import { StrategySimulator } from "@/components/command/strategy-simulator";
import { GlobalNetworkMap } from "@/components/command/global-network-map";
import { ESGRadar } from "@/components/command/esg-radar";
import { EmissionsChart } from "@/components/command/emissions-chart";
import { ScenarioComparator } from "@/components/command/scenario-comparator";
import { useCommandCenter } from "@/context/command-center-context";
import { useMounted } from "@/hooks/use-mounted";
import { cn, formatNum } from "@/lib/utils";

const PANELS = [
  { id: "overview", label: "Overview", icon: LayoutDashboard },
  { id: "simulator", label: "Simulator", icon: Sliders },
  { id: "terminal", label: "Terminal", icon: Terminal },
  { id: "network", label: "Network", icon: Globe },
  { id: "analytics", label: "Analytics", icon: Radar },
] as const;

export function CommandCenterSection() {
  const mounted = useMounted();
  const { activePanel, setActivePanel, liveMetrics } = useCommandCenter();

  return (
    <section id="command" className="section-padding relative overflow-hidden">
      {/* Matrix background effect */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(15,118,110,0.06)_0%,transparent_70%)]" />
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(45,212,191,0.3) 2px, rgba(45,212,191,0.3) 3px)",
      }} />

      <div className="relative mx-auto max-w-7xl">
        <SectionHeader
          label="Strategy Supercomputer"
          title="SCM Command Center"
          subtitle="Real-time ESG intelligence, strategy simulation, global network mapping, and scenario analysis — your mission control for symbiotic catalyst deployment."
        />

        {/* Status strip */}
        <FadeIn className="mb-8">
          <div className="command-status-strip flex flex-wrap items-center gap-x-6 gap-y-2 px-5 py-3">
            <div className="flex items-center gap-2">
              <Zap className="h-3.5 w-3.5 text-gold" />
              <span className="text-[9px] font-bold uppercase tracking-[0.15em] text-gold">System Active</span>
            </div>
            {[
              { label: "Symbiosis Index", value: mounted ? liveMetrics.symbiosisIndex : "—", unit: "" },
              { label: "CO₂ Avoided", value: mounted ? formatNum(liveMetrics.co2Avoided) : "—", unit: "t" },
              { label: "Water Recovered", value: mounted ? formatNum(liveMetrics.waterSaved) : "—", unit: "L" },
              { label: "Talent Active", value: mounted ? liveMetrics.talentActive : "—", unit: "" },
              { label: "Renewable", value: mounted ? liveMetrics.renewablePct : "—", unit: "%" },
              { label: "Supplier SBTi", value: mounted ? liveMetrics.supplierSbti : "—", unit: "%" },
            ].map((m) => (
              <div key={m.label} className="flex items-center gap-2">
                <span className="text-[8px] text-muted-foreground uppercase">{m.label}</span>
                <span className="text-xs font-bold text-sand tabular-nums">
                  {m.value}{m.unit && mounted && <span className="text-[9px] text-muted-foreground ml-0.5">{m.unit}</span>}
                </span>
              </div>
            ))}
            <span className="ml-auto text-[8px] text-muted-foreground/40 hidden md:block">
              Press <kbd className="px-1 py-0.5 rounded border border-white/10 text-[7px]">⌘K</kbd> for commands
            </span>
          </div>
        </FadeIn>

        {/* Panel tabs */}
        <FadeIn delay={0.05} className="mb-6">
          <div className="flex gap-1 p-1 rounded-xl bg-white/[0.02] border border-white/[0.05] overflow-x-auto">
            {PANELS.map((p) => {
              const Icon = p.icon;
              return (
                <button
                  key={p.id}
                  onClick={() => setActivePanel(p.id)}
                  className={cn(
                    "relative flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all",
                    activePanel === p.id ? "text-sand" : "text-muted-foreground hover:text-sand/70"
                  )}
                >
                  {activePanel === p.id && (
                    <motion.div
                      layoutId="panel-tab"
                      className="absolute inset-0 bg-teal/12 border border-teal/20 rounded-lg"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                  <Icon className="relative h-3.5 w-3.5" />
                  <span className="relative">{p.label}</span>
                </button>
              );
            })}
          </div>
        </FadeIn>

        {/* Panel content */}
        <div className="space-y-4">
          {(activePanel === "overview" || activePanel === "analytics") && (
            <div className="grid lg:grid-cols-12 gap-4">
              <FadeIn delay={0.1} className="lg:col-span-3">
                <div className="command-panel p-6 flex items-center justify-center min-h-[280px]">
                  <SymbiosisIndex />
                </div>
              </FadeIn>
              <FadeIn delay={0.15} className="lg:col-span-5">
                <ESGRadar />
              </FadeIn>
              <FadeIn delay={0.2} className="lg:col-span-4">
                <EmissionsChart />
              </FadeIn>
            </div>
          )}

          {(activePanel === "overview" || activePanel === "simulator") && (
            <FadeIn delay={0.1}>
              <StrategySimulator />
            </FadeIn>
          )}

          {(activePanel === "overview" || activePanel === "terminal") && (
            <FadeIn delay={0.15}>
              <LiveTerminal />
            </FadeIn>
          )}

          {(activePanel === "overview" || activePanel === "network") && (
            <FadeIn delay={0.2}>
              <GlobalNetworkMap />
            </FadeIn>
          )}

          {(activePanel === "overview" || activePanel === "analytics") && (
            <FadeIn delay={0.25}>
              <ScenarioComparator />
            </FadeIn>
          )}
        </div>

        {/* Quick actions */}
        <FadeIn delay={0.3} className="mt-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { icon: Sliders, label: "Run Simulation", panel: "simulator" },
              { icon: Terminal, label: "Live Feed", panel: "terminal" },
              { icon: Globe, label: "Network Map", panel: "network" },
              { icon: GitCompareArrows, label: "Compare Scenarios", panel: "analytics" },
            ].map((a) => (
              <button
                key={a.label}
                onClick={() => setActivePanel(a.panel)}
                className="command-quick-action flex items-center gap-3 p-4 group"
              >
                <a.icon className="h-4 w-4 text-teal-light group-hover:scale-110 transition-transform" />
                <span className="text-xs font-semibold text-sand/80 group-hover:text-sand">{a.label}</span>
                <TrendingDown className="h-3 w-3 ml-auto text-muted-foreground/30 -rotate-90 group-hover:text-teal-light transition-colors" />
              </button>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}