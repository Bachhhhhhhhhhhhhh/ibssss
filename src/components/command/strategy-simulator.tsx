"use client";

import { useCommandCenter } from "@/context/command-center-context";
import { PRESET_SCENARIOS, type StrategySliders } from "@/lib/engine/simulator";
import { DashboardFrame } from "@/components/dashboard/dashboard-frame";
import { Sliders, RotateCcw, Sparkles } from "lucide-react";
import { cn, formatNum } from "@/lib/utils";
import { motion } from "framer-motion";

const SLIDER_CONFIG: { key: keyof StrategySliders; label: string; loop: string }[] = [
  { key: "greenTalentIntensity", label: "Green Talent Intensity", loop: "S" },
  { key: "regenerativeWorkspace", label: "Regenerative Workspace", loop: "E" },
  { key: "eastWestBridge", label: "East-West Bridge", loop: "Bridge" },
  { key: "digitalPlatform", label: "Digital Platform", loop: "Enabler" },
  { key: "supplierEngagement", label: "Supplier Engagement", loop: "G" },
  { key: "communityInvestment", label: "Community Investment", loop: "S" },
];

const LOOP_COLORS: Record<string, string> = {
  E: "#0F766E", S: "#166534", G: "#2dd4bf", Bridge: "#c9a962", Enabler: "#8b9a9e",
};

export function StrategySimulator() {
  const { sliders, setSlider, applyScenario, activeScenario, simulation } = useCommandCenter();

  return (
    <DashboardFrame
      title="SCM Strategy Simulator"
      icon={Sliders}
      badge={activeScenario === "custom" ? "Custom" : PRESET_SCENARIOS[activeScenario as keyof typeof PRESET_SCENARIOS]?.label ?? "SCM"}
      action={
        <button
          onClick={() => applyScenario("scm")}
          className="text-[9px] uppercase tracking-wider text-muted-foreground hover:text-teal-light flex items-center gap-1.5 px-2 py-1 rounded-lg hover:bg-white/5 transition-colors"
        >
          <RotateCcw className="h-3 w-3" /> Reset
        </button>
      }
      className="h-full"
    >
      <div className="grid md:grid-cols-2 gap-6">
        {/* Left: controls */}
        <div className="space-y-4">
          <div className="flex gap-2 flex-wrap">
            {(Object.keys(PRESET_SCENARIOS) as Array<keyof typeof PRESET_SCENARIOS>).map((key) => (
              <button
                key={key}
                onClick={() => applyScenario(key)}
                className={cn(
                  "text-[9px] font-bold uppercase tracking-wider px-3.5 py-2 rounded-xl border transition-all",
                  activeScenario === key
                    ? "bg-teal/15 border-teal/35 text-teal-light shadow-lg shadow-teal/10"
                    : "border-white/8 text-muted-foreground hover:border-white/15 hover:bg-white/[0.03]"
                )}
              >
                {PRESET_SCENARIOS[key].label}
              </button>
            ))}
          </div>

          <div className="space-y-4">
            {SLIDER_CONFIG.map((cfg) => {
              const color = LOOP_COLORS[cfg.loop];
              const val = sliders[cfg.key];
              return (
                <div key={cfg.key}>
                  <div className="flex justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-[8px] font-black px-2 py-0.5 rounded-md" style={{ background: `${color}18`, color, border: `1px solid ${color}30` }}>
                        {cfg.loop}
                      </span>
                      <span className="text-[11px] text-sand/85 font-medium">{cfg.label}</span>
                    </div>
                    <span className="text-sm font-bold tabular-nums" style={{ color }}>{val}%</span>
                  </div>
                  <div className="dash-slider-track">
                    <motion.div
                      className="dash-slider-fill"
                      style={{ width: `${val}%`, background: `linear-gradient(90deg, ${color}80, ${color})` }}
                      layout
                    />
                    <input
                      type="range" min={0} max={100} value={val}
                      onChange={(e) => setSlider(cfg.key, Number(e.target.value))}
                      aria-label={cfg.label}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: outputs */}
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-2">
            {[
              { label: "Symbiosis Index", value: simulation.symbiosisIndex, color: "#2dd4bf" },
              { label: "Green Talent", value: formatNum(simulation.greenTalentPlacements), color: "#4ade80" },
              { label: "Energy ↓", value: `${simulation.energyReduction}%`, color: "#0F766E" },
              { label: "Water Saved", value: `${simulation.waterSavings}%`, color: "#2dd4bf" },
              { label: "ESG Revenue", value: `${simulation.esgRevenueShare}%`, color: "#c9a962" },
              { label: "Net-Zero Year", value: simulation.netZeroYear, color: "#c9a962" },
            ].map((m) => (
              <motion.div
                key={m.label}
                layout
                className="p-3.5 rounded-xl border border-white/[0.06] bg-gradient-to-br from-white/[0.04] to-transparent"
                style={{ boxShadow: `inset 0 1px 0 ${m.color}10` }}
              >
                <p className="text-[8px] text-muted-foreground uppercase tracking-wider">{m.label}</p>
                <p className="text-xl font-bold text-sand tabular-nums mt-1" style={{ textShadow: `0 0 20px ${m.color}25` }}>
                  {m.value}
                </p>
              </motion.div>
            ))}
          </div>

          <div className="p-4 rounded-xl border border-gold/15 bg-gold/[0.04]">
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="h-3.5 w-3.5 text-gold" />
              <p className="text-[9px] font-bold uppercase tracking-[0.15em] text-gold">Strategic Recommendations</p>
            </div>
            <ul className="space-y-2">
              {simulation.recommendations.map((r, i) => (
                <li key={r} className="text-[10px] text-sand/70 flex items-start gap-2 leading-relaxed">
                  <span className="shrink-0 w-4 h-4 rounded-md bg-teal/10 border border-teal/20 flex items-center justify-center text-[8px] font-bold text-teal-light">{i + 1}</span>
                  {r}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </DashboardFrame>
  );
}