"use client";

import { motion } from "framer-motion";
import { useCommandCenter } from "@/context/command-center-context";
import { Activity, Zap } from "lucide-react";

export function SymbiosisIndex() {
  const { liveMetrics, simulation } = useCommandCenter();
  const score = liveMetrics.symbiosisIndex;
  const size = 200;
  const stroke = 10;
  const r = (size - stroke) / 2;
  const cx = size / 2;
  const circumference = 2 * Math.PI * r;
  const offset = circumference - (score / 100) * circumference;

  return (
    <div className="relative flex flex-col items-center w-full py-2">
      {/* Outer decorative rings */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[220px] h-[220px] rounded-full border border-teal/5 animate-rotate-slow" />
        <div className="absolute w-[240px] h-[240px] rounded-full border border-dashed border-gold/8 animate-rotate-slow" style={{ animationDirection: "reverse", animationDuration: "90s" }} />
      </div>

      <div className="relative dash-gauge-ring" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="-rotate-90">
          <defs>
            <linearGradient id="gaugeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0F766E" />
              <stop offset="40%" stopColor="#2dd4bf" />
              <stop offset="70%" stopColor="#4ade80" />
              <stop offset="100%" stopColor="#c9a962" />
            </linearGradient>
            <filter id="gaugeGlow">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
          </defs>
          {/* Track segments */}
          {Array.from({ length: 60 }).map((_, i) => {
            const angle = (i / 60) * 360;
            const rad = (angle * Math.PI) / 180;
            const x1 = cx + (r - 4) * Math.cos(rad);
            const y1 = cx + (r - 4) * Math.sin(rad);
            const x2 = cx + (r + 4) * Math.cos(rad);
            const y2 = cx + (r + 4) * Math.sin(rad);
            const active = (i / 60) * 100 <= score;
            return (
              <line
                key={i}
                x1={x1} y1={y1} x2={x2} y2={y2}
                stroke={active ? "rgba(45,212,191,0.25)" : "rgba(255,255,255,0.03)"}
                strokeWidth="1"
              />
            );
          })}
          <circle cx={cx} cy={cx} r={r} fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth={stroke} />
          <motion.circle
            cx={cx} cy={cx} r={r} fill="none"
            stroke="url(#gaugeGrad)" strokeWidth={stroke} strokeLinecap="round"
            strokeDasharray={circumference}
            filter="url(#gaugeGlow)"
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: offset }}
            transition={{ duration: 1.5, ease: [0.23, 1, 0.32, 1] }}
          />
        </svg>

        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <motion.span
            key={score}
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-5xl font-bold text-sand tabular-nums tracking-tighter"
            style={{ textShadow: "0 0 40px rgba(45,212,191,0.3)" }}
          >
            {score}
          </motion.span>
          <span className="text-[9px] font-bold text-teal-light uppercase tracking-[0.25em] mt-1">Symbiosis</span>
          <div className="flex items-center gap-1.5 mt-2 px-2.5 py-1 rounded-full bg-forest/10 border border-forest/20">
            <Activity className="h-2.5 w-2.5 text-forest-light animate-pulse" />
            <span className="text-[8px] font-bold text-forest-light uppercase tracking-wider">Live</span>
          </div>
        </div>
      </div>

      {/* Tri-value pills */}
      <div className="grid grid-cols-3 gap-2 mt-6 w-full max-w-[280px]">
        {[
          { label: "Business", value: simulation.businessValue, color: "#c9a962", icon: Zap },
          { label: "Social", value: simulation.socialValue, color: "#4ade80", icon: Activity },
          { label: "Ecological", value: simulation.ecologicalValue, color: "#2dd4bf", icon: Activity },
        ].map((m) => (
          <div
            key={m.label}
            className="text-center py-2.5 px-1 rounded-xl border border-white/[0.05] bg-white/[0.02]"
            style={{ boxShadow: `inset 0 1px 0 ${m.color}15` }}
          >
            <p className="text-xl font-bold tabular-nums" style={{ color: m.color }}>{m.value}</p>
            <p className="text-[7px] text-muted-foreground uppercase tracking-wider mt-0.5">{m.label}</p>
            <div className="mt-1.5 mx-auto h-0.5 w-8 rounded-full" style={{ background: `linear-gradient(90deg, ${m.color}, transparent)` }} />
          </div>
        ))}
      </div>
    </div>
  );
}