"use client";

import { useCommandCenter } from "@/context/command-center-context";
import { PRESET_SCENARIOS } from "@/lib/engine/simulator";
import { GitCompareArrows } from "lucide-react";
import { cn } from "@/lib/utils";

export function ScenarioComparator() {
  const { scenarioSims, compareMode, setCompareMode, applyScenario, activeScenario } = useCommandCenter();

  const scenarios = [
    { key: "baseline" as const, ...PRESET_SCENARIOS.baseline, sim: scenarioSims.baseline },
    { key: "scm" as const, ...PRESET_SCENARIOS.scm, sim: scenarioSims.scm },
    { key: "aggressive" as const, ...PRESET_SCENARIOS.aggressive, sim: scenarioSims.aggressive },
  ];

  return (
    <div className="command-panel">
      <div className="command-panel-header">
        <GitCompareArrows className="h-3.5 w-3.5 text-teal-light" />
        <span>Scenario Comparator</span>
        <button
          onClick={() => setCompareMode(!compareMode)}
          className={cn(
            "ml-auto text-[8px] uppercase tracking-wider px-2 py-0.5 rounded border transition-all",
            compareMode ? "border-teal/30 text-teal-light bg-teal/10" : "border-white/8 text-muted-foreground"
          )}
        >
          {compareMode ? "Comparing" : "Compare"}
        </button>
      </div>

      <div className="command-panel-body">
        <div className="grid md:grid-cols-3 gap-3">
          {scenarios.map((s) => (
            <button
              key={s.key}
              onClick={() => applyScenario(s.key)}
              className={cn(
                "text-left p-4 rounded-xl border transition-all",
                activeScenario === s.key
                  ? "border-teal/30 bg-teal/8"
                  : "border-white/6 bg-white/[0.02] hover:border-white/12"
              )}
            >
              <p className="text-[9px] font-bold uppercase tracking-wider text-gold mb-1">{s.label}</p>
              <p className="text-2xl font-bold text-sand tabular-nums mb-2">{s.sim.symbiosisIndex}</p>
              <div className="space-y-1">
                {[
                  { l: "Business", v: s.sim.businessValue },
                  { l: "Social", v: s.sim.socialValue },
                  { l: "Eco", v: s.sim.ecologicalValue },
                  { l: "NZ Year", v: s.sim.netZeroYear },
                ].map((m) => (
                  <div key={m.l} className="flex justify-between text-[9px]">
                    <span className="text-muted-foreground">{m.l}</span>
                    <span className="text-sand/80 font-medium tabular-nums">{m.v}</span>
                  </div>
                ))}
              </div>
              {compareMode && s.key !== "baseline" && (
                <div className="mt-2 pt-2 border-t border-white/5">
                  <p className="text-[8px] text-teal-light font-bold">
                    Δ Index: +{Math.round((s.sim.symbiosisIndex - scenarioSims.baseline.symbiosisIndex) * 10) / 10}
                  </p>
                </div>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}