"use client";

import { useMemo } from "react";

interface SparklineProps {
  seed?: string;
  color?: string;
  width?: number;
  height?: number;
  trend?: "up" | "down" | "neutral";
  className?: string;
}

function seededPoints(seed: string, n = 24): number[] {
  let h = 0;
  for (let i = 0; i < seed.length; i++) h = (h << 5) - h + seed.charCodeAt(i);
  const pts: number[] = [];
  for (let i = 0; i < n; i++) {
    h = (h * 16807 + 12345) % 2147483647;
    pts.push(0.2 + (h % 1000) / 1000 * 0.6);
  }
  return pts;
}

export function Sparkline({
  seed = "default",
  color = "#2dd4bf",
  width = 80,
  height = 28,
  trend = "up",
  className,
}: SparklineProps) {
  const { path, areaPath } = useMemo(() => {
    const pts = seededPoints(seed);
    const bias = trend === "up" ? 0.02 : trend === "down" ? -0.02 : 0;
    const adjusted = pts.map((p, i) => Math.min(0.95, Math.max(0.05, p + i * bias)));
    const step = width / (adjusted.length - 1);
    const line = adjusted
      .map((p, i) => `${i === 0 ? "M" : "L"}${i * step},${height - p * height}`)
      .join(" ");
    const area = `${line} L${width},${height} L0,${height} Z`;
    return { path: line, areaPath: area };
  }, [seed, width, height, trend]);

  return (
    <svg width={width} height={height} className={className} aria-hidden>
      <defs>
        <linearGradient id={`sg-${seed}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.35" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={areaPath} fill={`url(#sg-${seed})`} />
      <path d={path} fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}