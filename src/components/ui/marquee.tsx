"use client";

import { cn } from "@/lib/utils";

interface MarqueeProps {
  items: string[];
  speed?: "slow" | "normal" | "fast";
  className?: string;
}

export function Marquee({ items, speed = "normal", className }: MarqueeProps) {
  const duration = speed === "slow" ? "40s" : speed === "fast" ? "18s" : "28s";
  const doubled = [...items, ...items];

  return (
    <div className={cn("relative overflow-hidden", className)}>
      <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-background to-transparent z-10" />
      <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-background to-transparent z-10" />
      <div
        className="flex gap-8 whitespace-nowrap"
        style={{ animation: `marquee ${duration} linear infinite` }}
      >
        {doubled.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="inline-flex items-center gap-3 text-xs font-medium tracking-widest uppercase text-muted-foreground/60"
          >
            <span className="h-1 w-1 rounded-full bg-teal-light/60" />
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}