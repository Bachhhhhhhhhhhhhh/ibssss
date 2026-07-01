"use client";

import { motion } from "framer-motion";

interface ProgressRingProps {
  value: number;
  max?: number;
  size?: number;
  stroke?: number;
  color?: string;
  label?: string;
  sublabel?: string;
  baseline?: string;
  target?: string;
}

export function ProgressRing({
  value,
  max = 100,
  size = 88,
  stroke = 6,
  color = "#2dd4bf",
  label,
  sublabel,
  baseline,
  target,
}: ProgressRingProps) {
  const r = (size - stroke) / 2;
  const circumference = 2 * Math.PI * r;
  const pct = Math.min(value / max, 1);
  const offset = circumference - pct * circumference;

  return (
    <div className="flex flex-col items-center">
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="-rotate-90">
          <circle
            cx={size / 2} cy={size / 2} r={r}
            fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth={stroke}
          />
          <motion.circle
            cx={size / 2} cy={size / 2} r={r}
            fill="none" stroke={color} strokeWidth={stroke} strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            whileInView={{ strokeDashoffset: offset }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            style={{ filter: `drop-shadow(0 0 6px ${color}60)` }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-lg font-bold text-sand tabular-nums">{Math.round(pct * 100)}%</span>
          {sublabel && <span className="text-[7px] text-muted-foreground uppercase tracking-wider">{sublabel}</span>}
        </div>
      </div>
      {label && <p className="text-[10px] text-sand/80 font-medium mt-2 text-center max-w-[100px]">{label}</p>}
      {(baseline || target) && (
        <div className="flex gap-3 mt-1 text-[9px]">
          {baseline && <span className="text-muted-foreground">{baseline}</span>}
          {target && <span style={{ color }}>{target}</span>}
        </div>
      )}
    </div>
  );
}