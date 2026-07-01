"use client";

import { useCommandCenter } from "@/context/command-center-context";
import { PRESET_SCENARIOS, type StrategySliders } from "@/lib/engine/simulator";
import { Sliders, RotateCcw } from "lucide-react";
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
    <div className="command-panel h-full">
      <div className="command-panel-header">
        <Sliders className="h-3.5 w-3.5 text-teal-light" />
        <span>SCM Strategy Simulator</span>
        <button
          onClick={() => applyScenario("scm")}
          className="ml-auto text-[8px] uppercase tracking-wider text-muted-foreground hover:text-teal-light flex items-center gap-1"
        >
          <RotateCcw className="h-3 w-3" /> Reset SCM
        </button>
      </div>

      <div className="command-panel-body space-y-4">
        {/* Scenario presets */}
        <div className="flex gap-2 flex-wrap">
          {(Object.keys(PRESET_SCENARIOS) as Array<keyof typeof PRESET_SCENARIOS>).map((key) => (
            <button
              key={key}
              onClick={() => applyScenario(key)}
              className={cn(
                "text-[9px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-lg border transition-all",
                activeScenario === key
                  ? "bg-teal/15 border-teal/30 text-teal-light"
                  : "border-white/8 text-muted-foreground hover:border-white/15"
              )}
            >
              {PRESET_SCENARIOS[key].label}
            </button>
          ))}
        </div>

        {/* Sliders */}
        <div className="space-y-3">
          {SLIDER_CONFIG.map((cfg) => (
            <div key={cfg.key}>
              <div className="flex justify-between mb-1">
                <div className="flex items-center gap-2">
                  <span
                    className="text-[8px] font-bold px-1.5 py-0.5 rounded"
                    style={{ background: `${LOOP_COLORS[cfg.loop]}20`, color: LOOP_COLORS[cfg.loop] }}
                  >
                    {cfg.loop}
                  </span>
                  <span className="text-[10px] text-sand/80">{cfg.label}</span>
                </div>
                <span className="text-[10px] font-bold text-teal-light tabular-nums">{sliders[cfg.key]}%</span>
              </div>
              <input
                type="range"
                min={0}
                max={100}
                value={sliders[cfg.key]}
                onChange={(e) => setSlider(cfg.key, Number(e.target.value))}
                className="sim-slider w-full"
                style={{ "--thumb-color": LOOP_COLORS[cfg.loop] } as React.CSSProperties}
              />
            </div>
          ))}
        </div>

        {/* Output metrics */}
        <div className="grid grid-cols-2 gap-2 pt-3 border-t border-white/5">
          {[
            { label: "Green Talent", value: formatNum(simulation.greenTalentPlacements), unit: "/yr" },
            { label: "Energy ↓", value: `${simulation.energyReduction}%`, unit: "" },
            { label: "Water Saved", value: `${simulation.waterSavings}%`, unit: "" },
            { label: "ESG Revenue", value: `${simulation.esgRevenueShare}%`, unit: "" },
            { label: "Net-Zero", value: String(simulation.netZeroYear), unit: "" },
            { label: "Supplier SBTi", value: `${simulation.supplierSbti}%`, unit: "" },
          ].map((m) => (
            <motion.div
              key={m.label}
              layout
              className="p-2 rounded-lg bg-white/[0.03] border border-white/[0.05]"
            >
              <p className="text-[8px] text-muted-foreground uppercase">{m.label}</p>
              <p className="text-sm font-bold text-sand tabular-nums">
                {m.value}<span className="text-[9px] text-muted-foreground">{m.unit}</span>
              </p>
            </motion.div>
          ))}
        </div>

        {/* Recommendations */}
        <div className="pt-2">
          <p className="text-[8px] font-bold uppercase tracking-wider text-gold mb-2">AI Recommendations</p>
          <ul className="space-y-1">
            {simulation.recommendations.slice(0, 3).map((r) => (
              <li key={r} className="text-[9px] text-sand/60 flex items-start gap-1.5">
                <span className="text-teal-light mt-0.5">›</span>{r}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}