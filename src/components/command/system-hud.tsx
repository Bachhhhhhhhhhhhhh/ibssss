"use client";

import { useCommandCenter } from "@/context/command-center-context";
import { useMounted } from "@/hooks/use-mounted";
import { formatNum } from "@/lib/utils";
import { Activity, Eye, EyeOff } from "lucide-react";
import { cn } from "@/lib/utils";

export function SystemHUD() {
  const mounted = useMounted();
  const { liveMetrics, simulation, hudVisible, setHudVisible, activeScenario } = useCommandCenter();

  if (!hudVisible) {
    return (
      <button
        onClick={() => setHudVisible(true)}
        className="fixed bottom-5 left-5 z-40 p-2.5 rounded-2xl dash-frame hover:border-teal/30 text-muted-foreground hover:text-teal-light transition-all"
        aria-label="Show HUD"
      >
        <Eye className="h-4 w-4" />
      </button>
    );
  }

  const items = [
    { label: "IDX", value: mounted ? liveMetrics.symbiosisIndex : "—", color: "#2dd4bf" },
    { label: "CO₂", value: mounted ? formatNum(liveMetrics.co2Avoided) : "—", color: "#c9a962" },
    { label: "TAL", value: mounted ? liveMetrics.talentActive : "—", color: "#4ade80" },
  ];

  return (
    <div className="fixed bottom-5 left-5 z-40 hidden md:block">
      <div className="dash-frame px-4 py-2.5 flex items-center gap-4">
        <span className="flex h-2 w-2 relative">
          <span className="animate-ping absolute h-full w-full rounded-full bg-forest-light opacity-50" />
          <span className="relative h-2 w-2 rounded-full bg-forest-light" />
        </span>
        {items.map((item) => (
          <div key={item.label} className="flex items-center gap-1.5 font-mono">
            <span className="text-[8px] text-muted-foreground">{item.label}</span>
            <span className="text-xs font-bold tabular-nums text-sand" style={{ color: item.color }}>{item.value}</span>
          </div>
        ))}
        <span className={cn(
          "text-[7px] font-bold uppercase px-1.5 py-0.5 rounded",
          activeScenario !== "custom" ? "bg-teal/10 text-teal-light" : "text-muted-foreground"
        )}>
          {activeScenario}
        </span>
        <span className="text-[8px] text-muted-foreground/40">NZ{simulation.netZeroYear}</span>
        <Activity className="h-3 w-3 text-teal-light/50 animate-pulse" />
        <button onClick={() => setHudVisible(false)} className="text-muted-foreground/30 hover:text-muted-foreground ml-1">
          <EyeOff className="h-3 w-3" />
        </button>
      </div>
    </div>
  );
}