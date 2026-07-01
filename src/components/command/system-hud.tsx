"use client";

import { useCommandCenter } from "@/context/command-center-context";
import { useMounted } from "@/hooks/use-mounted";
import { formatNum } from "@/lib/utils";
import { Activity, Cpu, Wifi, Eye, EyeOff } from "lucide-react";
import { cn } from "@/lib/utils";

export function SystemHUD() {
  const mounted = useMounted();
  const { liveMetrics, simulation, hudVisible, setHudVisible, activeScenario } = useCommandCenter();

  if (!hudVisible) {
    return (
      <button
        onClick={() => setHudVisible(true)}
        className="fixed bottom-4 left-4 z-40 p-2 rounded-xl bg-background/80 border border-white/10 backdrop-blur-xl text-muted-foreground hover:text-teal-light transition-colors"
        aria-label="Show HUD"
      >
        <Eye className="h-4 w-4" />
      </button>
    );
  }

  return (
    <div className="fixed bottom-4 left-4 z-40 hidden md:block">
      <div className="command-hud flex items-center gap-4 px-4 py-2.5">
        <div className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-forest-light animate-pulse" />
          <span className="text-[8px] font-bold uppercase tracking-wider text-forest-light">Online</span>
        </div>

        <div className="h-4 w-px bg-white/10" />

        <div className="flex items-center gap-1.5">
          <Activity className="h-3 w-3 text-teal-light" />
          <span className="text-[10px] text-muted-foreground">Index</span>
          <span className="text-xs font-bold text-sand tabular-nums">
            {mounted ? liveMetrics.symbiosisIndex : "—"}
          </span>
        </div>

        <div className="flex items-center gap-1.5">
          <Cpu className="h-3 w-3 text-gold" />
          <span className="text-[10px] text-muted-foreground">CO₂</span>
          <span className="text-xs font-bold text-sand tabular-nums">
            {mounted ? `${formatNum(liveMetrics.co2Avoided)}t` : "—"}
          </span>
        </div>

        <div className="flex items-center gap-1.5">
          <Wifi className="h-3 w-3 text-teal-light" />
          <span className="text-[10px] text-muted-foreground">Talent</span>
          <span className="text-xs font-bold text-sand tabular-nums">
            {mounted ? liveMetrics.talentActive : "—"}
          </span>
        </div>

        <div className="h-4 w-px bg-white/10" />

        <span className={cn(
          "text-[8px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full",
          activeScenario === "custom" ? "bg-white/5 text-muted-foreground" : "bg-teal/10 text-teal-light"
        )}>
          {activeScenario === "custom" ? "Custom" : activeScenario}
        </span>

        <span className="text-[8px] text-muted-foreground/50">NZ {simulation.netZeroYear}</span>

        <button
          onClick={() => setHudVisible(false)}
          className="ml-1 text-muted-foreground/40 hover:text-muted-foreground transition-colors"
          aria-label="Hide HUD"
        >
          <EyeOff className="h-3 w-3" />
        </button>
      </div>
    </div>
  );
}