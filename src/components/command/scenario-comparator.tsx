"use client";

import { useCommandCenter } from "@/context/command-center-context";
import { PRESET_SCENARIOS } from "@/lib/engine/simulator";
import { DashboardFrame } from "@/components/dashboard/dashboard-frame";
import { GitCompareArrows, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

const SCENARIO_COLORS = {
  baseline: "#7a8f8c",
  scm: "#2dd4bf",
  aggressive: "#c9a962",
};

export function ScenarioComparator() {
  const { scenarioSims, compareMode, setCompareMode, applyScenario, activeScenario } = useCommandCenter();

  const scenarios = [
    { key: "baseline" as const, ...PRESET_SCENARIOS.baseline, sim: scenarioSims.baseline },
    { key: "scm" as const, ...PRESET_SCENARIOS.scm, sim: scenarioSims.scm },
    { key: "aggressive" as const, ...PRESET_SCENARIOS.aggressive, sim: scenarioSims.aggressive },
  ];

  return (
    <DashboardFrame
      title="Scenario Comparator"
      icon={GitCompareArrows}
      badge={compareMode ? "Delta Mode" : "3 Scenarios"}
      action={
        <button
          onClick={() => setCompareMode(!compareMode)}
          className={cn(
            "text-[9px] uppercase tracking-wider px-2.5 py-1 rounded-lg border transition-all",
            compareMode ? "border-teal/30 text-teal-light bg-teal/10" : "border-white/8 text-muted-foreground hover:text-sand"
          )}
        >
          {compareMode ? "Δ On" : "Show Δ"}
        </button>
      }
    >
      <div className="grid md:grid-cols-3 gap-4">
        {scenarios.map((s, i) => {
          const color = SCENARIO_COLORS[s.key];
          const isActive = activeScenario === s.key;
          const delta = s.sim.symbiosisIndex - scenarioSims.baseline.symbiosisIndex;

          return (
            <motion.button
              key={s.key}
              onClick={() => applyScenario(s.key)}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={cn("dash-scenario-card text-left w-full", isActive && "dash-scenario-card-active")}
              style={{ "--scenario-color": color } as React.CSSProperties}
            >
              <p className="text-[9px] font-bold uppercase tracking-[0.15em] mb-1" style={{ color }}>{s.label}</p>
              <p className="text-4xl font-bold text-sand tabular-nums tracking-tight">{s.sim.symbiosisIndex}</p>
              <p className="text-[10px] text-muted-foreground mt-1 mb-4 line-clamp-2">{s.description}</p>

              <div className="space-y-2">
                {[
                  { l: "Business", v: s.sim.businessValue },
                  { l: "Social", v: s.sim.socialValue },
                  { l: "Ecological", v: s.sim.ecologicalValue },
                ].map((m) => (
                  <div key={m.l} className="flex items-center gap-2">
                    <span className="text-[9px] text-muted-foreground w-16">{m.l}</span>
                    <div className="flex-1 h-1.5 rounded-full bg-white/5 overflow-hidden">
                      <div className="h-full rounded-full transition-all" style={{ width: `${m.v}%`, background: color }} />
                    </div>
                    <span className="text-[10px] font-bold tabular-nums w-6 text-right" style={{ color }}>{m.v}</span>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-between mt-4 pt-3 border-t border-white/5">
                <span className="text-[9px] text-muted-foreground">Net-Zero {s.sim.netZeroYear}</span>
                {compareMode && s.key !== "baseline" && (
                  <span className="flex items-center gap-1 text-[10px] font-bold text-forest-light">
                    <ArrowUpRight className="h-3 w-3" />+{Math.round(delta * 10) / 10}
                  </span>
                )}
              </div>
            </motion.button>
          );
        })}
      </div>
    </DashboardFrame>
  );
}