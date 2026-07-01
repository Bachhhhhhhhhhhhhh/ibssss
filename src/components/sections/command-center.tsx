"use client";

import { motion } from "framer-motion";
import {
  LayoutDashboard, Terminal, Sliders, Globe, Radar,
  GitCompareArrows, Cpu, Zap,
} from "lucide-react";
import { SectionHeader } from "@/components/ui/section-header";
import { FadeIn } from "@/components/ui/fade-in";
import { DashboardFrame } from "@/components/dashboard/dashboard-frame";
import { MetricTile } from "@/components/dashboard/metric-tile";
import { SymbiosisIndex } from "@/components/command/symbiosis-index";
import { LiveTerminal } from "@/components/command/live-terminal";
import { StrategySimulator } from "@/components/command/strategy-simulator";
import { GlobalSymbiosisNetwork } from "@/components/network/global-symbiosis-network";
import { ESGRadar } from "@/components/command/esg-radar";
import { EmissionsChart } from "@/components/command/emissions-chart";
import { ScenarioComparator } from "@/components/command/scenario-comparator";
import { useCommandCenter } from "@/context/command-center-context";
import { useMounted } from "@/hooks/use-mounted";
import { cn, formatNum } from "@/lib/utils";

const PANELS = [
  { id: "overview", label: "Mission Control", icon: LayoutDashboard },
  { id: "simulator", label: "Simulator", icon: Sliders },
  { id: "terminal", label: "Intel Feed", icon: Terminal },
  { id: "network", label: "Global Net", icon: Globe },
  { id: "analytics", label: "Analytics", icon: Radar },
] as const;

export function CommandCenterSection() {
  const mounted = useMounted();
  const { activePanel, setActivePanel, liveMetrics, simulation } = useCommandCenter();

  const topMetrics = [
    { label: "Symbiosis Index", value: mounted ? liveMetrics.symbiosisIndex : "—", unit: "/100", delta: "+12.4 vs baseline", trend: "up" as const, color: "#2dd4bf", seed: "symbiosis" },
    { label: "CO₂ Avoided", value: mounted ? formatNum(liveMetrics.co2Avoided) : "—", unit: "tonnes", delta: "+18% YoY", trend: "up" as const, color: "#c9a962", seed: "co2" },
    { label: "Green Talent", value: mounted ? liveMetrics.talentActive : "—", unit: "active", delta: "Pipeline growing", trend: "up" as const, color: "#4ade80", seed: "talent" },
    { label: "Renewable Mix", value: mounted ? liveMetrics.renewablePct : "—", unit: "%", delta: "→ 100% by 2030", trend: "up" as const, color: "#0F766E", seed: "renewable" },
    { label: "Water Recovered", value: mounted ? formatNum(liveMetrics.waterSaved) : "—", unit: "litres", delta: "+20% Huigui", trend: "up" as const, color: "#2dd4bf", seed: "water" },
    { label: "Supplier SBTi", value: mounted ? liveMetrics.supplierSbti : "—", unit: "%", delta: "Target 80%", trend: "neutral" as const, color: "#c9a962", seed: "sbti" },
  ];

  return (
    <section id="command" className="section-padding relative overflow-hidden">
      <div className="absolute inset-0 dash-grid-bg opacity-60" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(15,118,110,0.12)_0%,transparent_55%)]" />
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-teal-light/30 to-transparent" />

      <div className="relative mx-auto max-w-[1440px]">
        <SectionHeader
          label="Strategy Supercomputer"
          title="SCM Command Center"
          subtitle="Mission control for symbiotic catalyst deployment — real-time intelligence, simulation, and global network orchestration."
        />

        {/* Hero metric strip */}
        <FadeIn className="mb-6">
          <DashboardFrame
            title="Live Telemetry"
            icon={Cpu}
            badge="Streaming"
            badgeColor="live"
            noPadding
            glow
          >
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-px bg-white/[0.04] p-px rounded-b-[19px] overflow-hidden">
              {topMetrics.map((m, i) => (
                <motion.div
                  key={m.label}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="bg-[#080d0c] p-4"
                >
                  <MetricTile
                    label={m.label}
                    value={m.value}
                    unit={m.unit}
                    delta={mounted ? m.delta : undefined}
                    trend={m.trend}
                    color={m.color}
                    sparkSeed={m.seed}
                    size="sm"
                  />
                </motion.div>
              ))}
            </div>
          </DashboardFrame>
        </FadeIn>

        {/* Panel navigation */}
        <FadeIn delay={0.05} className="mb-5">
          <div className="flex gap-1.5 p-1.5 rounded-2xl bg-black/30 border border-white/[0.06] backdrop-blur-xl overflow-x-auto">
            {PANELS.map((p) => {
              const Icon = p.icon;
              const active = activePanel === p.id;
              return (
                <button
                  key={p.id}
                  onClick={() => setActivePanel(p.id)}
                  className={cn(
                    "relative flex items-center gap-2.5 px-5 py-3 rounded-xl text-xs font-bold tracking-wide whitespace-nowrap transition-all",
                    active ? "text-sand" : "text-muted-foreground hover:text-sand/80"
                  )}
                >
                  {active && (
                    <motion.div
                      layoutId="dash-tab"
                      className="absolute inset-0 bg-gradient-to-b from-teal/15 to-teal/5 border border-teal/25 rounded-xl shadow-lg shadow-teal/5"
                      transition={{ type: "spring", stiffness: 400, damping: 32 }}
                    />
                  )}
                  <Icon className={cn("relative h-4 w-4", active && "text-teal-light")} />
                  <span className="relative">{p.label}</span>
                </button>
              );
            })}
            <div className="ml-auto hidden lg:flex items-center gap-2 px-4 text-[9px] text-muted-foreground/50">
              <Zap className="h-3 w-3 text-gold" />
              NZ {simulation.netZeroYear}
              <span className="mx-1">·</span>
              <kbd className="px-1.5 py-0.5 rounded border border-white/10 bg-white/[0.03]">⌘K</kbd>
            </div>
          </div>
        </FadeIn>

        {/* Main bento grid */}
        <div className="space-y-4">
          {(activePanel === "overview" || activePanel === "analytics") && (
            <div className="grid lg:grid-cols-12 gap-4">
              <FadeIn delay={0.08} className="lg:col-span-4">
                <DashboardFrame title="Symbiosis Index" icon={Radar} badge="Core KPI" glow className="h-full min-h-[380px]">
                  <SymbiosisIndex />
                </DashboardFrame>
              </FadeIn>
              <FadeIn delay={0.12} className="lg:col-span-5">
                <ESGRadar />
              </FadeIn>
              <FadeIn delay={0.16} className="lg:col-span-3">
                <EmissionsChart />
              </FadeIn>
            </div>
          )}

          <div className="grid lg:grid-cols-12 gap-4">
            {(activePanel === "overview" || activePanel === "simulator") && (
              <FadeIn delay={0.1} className="lg:col-span-7">
                <StrategySimulator />
              </FadeIn>
            )}
            {(activePanel === "overview" || activePanel === "terminal") && (
              <FadeIn delay={0.14} className={cn(
                activePanel === "terminal" ? "lg:col-span-12" : "lg:col-span-5"
              )}>
                <LiveTerminal />
              </FadeIn>
            )}
          </div>

          {(activePanel === "overview" || activePanel === "network") && (
            <FadeIn delay={0.18}>
              <GlobalSymbiosisNetwork />
            </FadeIn>
          )}

          {(activePanel === "overview" || activePanel === "analytics") && (
            <FadeIn delay={0.22}>
              <ScenarioComparator />
            </FadeIn>
          )}
        </div>
      </div>
    </section>
  );
}