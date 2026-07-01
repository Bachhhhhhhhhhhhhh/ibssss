"use client";

import { motion } from "framer-motion";
import { Sparkline } from "@/components/dashboard/sparkline";
import { cn } from "@/lib/utils";
import { TrendingUp, TrendingDown } from "lucide-react";

interface MetricTileProps {
  label: string;
  value: string | number;
  unit?: string;
  delta?: string;
  trend?: "up" | "down" | "neutral";
  color?: string;
  sparkSeed?: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function MetricTile({
  label,
  value,
  unit,
  delta,
  trend = "up",
  color = "#2dd4bf",
  sparkSeed,
  size = "md",
  className,
}: MetricTileProps) {
  const TrendIcon = trend === "down" ? TrendingDown : TrendingUp;

  return (
    <motion.div
      layout
      className={cn("dash-metric-tile", size === "lg" && "dash-metric-tile-lg", className)}
      whileHover={{ y: -2 }}
      transition={{ duration: 0.2 }}
    >
      <div className="flex items-start justify-between gap-2 mb-2">
        <span className="dash-metric-label">{label}</span>
        {sparkSeed && (
          <Sparkline seed={sparkSeed} color={color} trend={trend} width={72} height={24} />
        )}
      </div>
      <div className="flex items-end gap-1.5">
        <span
          className={cn(
            "font-bold tabular-nums tracking-tight text-sand",
            size === "lg" ? "text-3xl" : size === "md" ? "text-2xl" : "text-lg"
          )}
          style={{ textShadow: `0 0 30px ${color}30` }}
        >
          {value}
        </span>
        {unit && <span className="text-[10px] text-muted-foreground mb-1">{unit}</span>}
      </div>
      {delta && (
        <div className={cn(
          "flex items-center gap-1 mt-1.5 text-[10px] font-semibold",
          trend === "up" ? "text-forest-light" : trend === "down" ? "text-gold" : "text-muted-foreground"
        )}>
          <TrendIcon className="h-3 w-3" />
          {delta}
        </div>
      )}
      <div className="dash-metric-accent" style={{ background: `linear-gradient(90deg, ${color}, transparent)` }} />
    </motion.div>
  );
}