"use client";

import { motion } from "framer-motion";
import { useCommandCenter } from "@/context/command-center-context";
import { Activity } from "lucide-react";

export function SymbiosisIndex() {
  const { liveMetrics, simulation } = useCommandCenter();

  const score = liveMetrics.symbiosisIndex;
  const circumference = 2 * Math.PI * 54;
  const offset = circumference - (score / 100) * circumference;

  return (
    <div className="relative flex flex-col items-center">
      <div className="relative w-36 h-36">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
          <circle cx="60" cy="60" r="54" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="6" />
          <motion.circle
            cx="60" cy="60" r="54" fill="none"
            stroke="url(#scoreGrad)" strokeWidth="6" strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: offset }}
            transition={{ duration: 1, ease: "easeOut" }}
          />
          <defs>
            <linearGradient id="scoreGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#0F766E" />
              <stop offset="50%" stopColor="#2dd4bf" />
              <stop offset="100%" stopColor="#c9a962" />
            </linearGradient>
          </defs>
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <motion.span
            key={score}
            initial={{ scale: 0.9, opacity: 0.5 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-3xl font-bold text-sand tabular-nums"
          >
            {score}
          </motion.span>
          <span className="text-[8px] text-muted-foreground uppercase tracking-[0.2em]">Index</span>
        </div>
        <div className="absolute -top-1 -right-1">
          <span className="flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-light opacity-40" />
            <span className="relative inline-flex rounded-full h-3 w-3 bg-teal-light" />
          </span>
        </div>
      </div>

      <div className="flex items-center gap-1.5 mt-3">
        <Activity className="h-3 w-3 text-teal-light animate-pulse" />
        <span className="text-[9px] font-bold uppercase tracking-[0.15em] text-teal-light">Live</span>
      </div>

      <div className="grid grid-cols-3 gap-3 mt-4 w-full text-center">
        {[
          { label: "Business", value: simulation.businessValue, color: "#c9a962" },
          { label: "Social", value: simulation.socialValue, color: "#4ade80" },
          { label: "Ecological", value: simulation.ecologicalValue, color: "#2dd4bf" },
        ].map((m) => (
          <div key={m.label}>
            <p className="text-lg font-bold tabular-nums" style={{ color: m.color }}>{m.value}</p>
            <p className="text-[8px] text-muted-foreground uppercase">{m.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}