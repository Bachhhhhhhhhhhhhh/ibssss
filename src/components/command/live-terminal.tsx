"use client";

import { useEffect, useRef } from "react";
import { useCommandCenter } from "@/context/command-center-context";
import { DashboardFrame } from "@/components/dashboard/dashboard-frame";
import { Terminal } from "lucide-react";
import { cn } from "@/lib/utils";

const LEVEL_STYLES = {
  info: { text: "text-teal-light", bg: "bg-teal/10", border: "border-teal/20" },
  success: { text: "text-forest-light", bg: "bg-forest/10", border: "border-forest/20" },
  warn: { text: "text-gold", bg: "bg-gold/10", border: "border-gold/20" },
  system: { text: "text-sand/50", bg: "bg-white/5", border: "border-white/10" },
};

export function LiveTerminal() {
  const { terminalEvents } = useCommandCenter();
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = 0;
  }, [terminalEvents]);

  return (
    <DashboardFrame
      title="ESG Intelligence Terminal"
      icon={Terminal}
      badge="Live Stream"
      badgeColor="live"
      className="h-full"
      noPadding
    >
      <div
        ref={scrollRef}
        className="font-mono text-[10px] leading-relaxed overflow-y-auto max-h-[320px] lg:max-h-[400px] px-4 py-3 dash-grid-bg"
      >
        <div className="text-[8px] text-muted-foreground/40 mb-3 flex items-center gap-2">
          <span className="text-teal-light/60">scm@engma</span>
          <span>:</span>
          <span className="text-gold/50">~/symbiosis/intel</span>
          <span className="text-forest-light">$ tail -f esg.stream</span>
        </div>
        {terminalEvents.map((ev, i) => {
          const style = LEVEL_STYLES[ev.level];
          return (
            <div
              key={ev.id}
              className={cn(
                "dash-terminal-line flex gap-2.5 py-1.5 mb-0.5 rounded-r-lg",
                i === 0 && "dash-terminal-line-new"
              )}
            >
              <span className="text-muted-foreground/40 shrink-0 w-14 tabular-nums">{ev.timestamp}</span>
              <span className={cn("shrink-0 uppercase w-11 text-[9px] font-bold px-1.5 py-0.5 rounded border", style.text, style.bg, style.border)}>
                {ev.level.slice(0, 4)}
              </span>
              <span className="text-gold/50 shrink-0 w-[72px] truncate font-semibold">[{ev.source}]</span>
              <span className="text-sand/75 flex-1">{ev.message}</span>
            </div>
          );
        })}
      </div>
    </DashboardFrame>
  );
}