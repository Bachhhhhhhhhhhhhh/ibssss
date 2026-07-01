"use client";

import { useEffect, useRef } from "react";
import { useCommandCenter } from "@/context/command-center-context";
import { Terminal } from "lucide-react";
import { cn } from "@/lib/utils";

const LEVEL_STYLES = {
  info: "text-teal-light",
  success: "text-forest-light",
  warn: "text-gold",
  system: "text-sand/60",
};

export function LiveTerminal() {
  const { terminalEvents } = useCommandCenter();
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = 0;
  }, [terminalEvents]);

  return (
    <div className="command-panel h-full flex flex-col">
      <div className="command-panel-header">
        <Terminal className="h-3.5 w-3.5 text-teal-light" />
        <span>ESG Intelligence Terminal</span>
        <span className="ml-auto flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-forest-light animate-pulse" />
          <span className="text-[8px] text-forest-light uppercase">Streaming</span>
        </span>
      </div>
      <div ref={scrollRef} className="command-panel-body font-mono text-[10px] leading-relaxed overflow-y-auto flex-1 max-h-64 lg:max-h-none">
        {terminalEvents.map((ev, i) => (
          <div
            key={ev.id}
            className={cn(
              "flex gap-2 py-1 border-b border-white/[0.03] hover:bg-white/[0.02] px-1",
              i === 0 && "bg-teal/[0.04]"
            )}
          >
            <span className="text-muted-foreground/50 shrink-0">{ev.timestamp}</span>
            <span className={cn("shrink-0 uppercase w-12", LEVEL_STYLES[ev.level])}>
              {ev.level.slice(0, 4)}
            </span>
            <span className="text-gold/60 shrink-0 w-20 truncate">[{ev.source}]</span>
            <span className="text-sand/70">{ev.message}</span>
          </div>
        ))}
      </div>
    </div>
  );
}