"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SCM_NODES, type LoopId, type EnablerId } from "@/lib/data/content";
import { cn } from "@/lib/utils";
import { X, ChevronRight } from "lucide-react";

type NodeId = LoopId | EnablerId | "catalyst";

const COLORS: Record<string, { main: string; glow: string; label: string }> = {
  E: { main: "#0F766E", glow: "rgba(15,118,110,0.4)", label: "Environmental" },
  S: { main: "#166534", glow: "rgba(22,101,52,0.4)", label: "Social" },
  G: { main: "#2dd4bf", glow: "rgba(45,212,191,0.4)", label: "Governance" },
  Catalyst: { main: "#F5F0E6", glow: "rgba(245,240,230,0.2)", label: "Core Catalyst" },
  Enabler: { main: "#c9a962", glow: "rgba(201,169,98,0.3)", label: "Global Enabler" },
};

function polar(angle: number, r: number, cx = 250, cy = 250) {
  const rad = ((angle - 90) * Math.PI) / 180;
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
}

const LOOPS = [
  { id: "regenerative" as const, angle: -90, pillar: "E" },
  { id: "transition" as const, angle: 30, pillar: "S" },
  { id: "governance" as const, angle: 150, pillar: "G" },
];

const ENABLERS = [
  { id: "east-west" as const, angle: 0 },
  { id: "digital" as const, angle: 120 },
  { id: "partnership" as const, angle: 240 },
];

const LOOP_R = 130;
const ENABLER_R = 200;
const CX = 250;
const CY = 250;

export function SCMDiagram() {
  const [active, setActive] = useState<NodeId>("catalyst");
  const [autoPlay, setAutoPlay] = useState(true);

  const allIds: NodeId[] = ["catalyst", "regenerative", "transition", "governance", "east-west", "digital", "partnership"];

  const cycle = useCallback(() => {
    setActive((prev) => {
      const idx = allIds.indexOf(prev);
      return allIds[(idx + 1) % allIds.length];
    });
  }, [allIds]);

  useEffect(() => {
    if (!autoPlay) return;
    const timer = setInterval(cycle, 4000);
    return () => clearInterval(timer);
  }, [autoPlay, cycle]);

  const data = SCM_NODES.find((n) => n.id === active)!;
  const color = COLORS[data.pillar];

  const loopPositions = LOOPS.map((l) => ({ ...l, ...polar(l.angle, LOOP_R, CX, CY) }));
  const enablerPositions = ENABLERS.map((e) => ({ ...e, ...polar(e.angle, ENABLER_R, CX, CY) }));

  return (
    <div className="w-full">
      <div className="grid lg:grid-cols-5 gap-8 items-start">
        {/* Diagram */}
        <div className="lg:col-span-3 relative">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(15,118,110,0.06)_0%,transparent_70%)] rounded-3xl" />

          <svg viewBox="0 0 500 500" className="w-full h-auto" aria-label="Symbiotic Catalyst Model">
            <defs>
              <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="4" result="blur" />
                <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
              </filter>
              <radialGradient id="centerGrad">
                <stop offset="0%" stopColor="rgba(15,118,110,0.3)" />
                <stop offset="100%" stopColor="rgba(15,118,110,0)" />
              </radialGradient>
              {LOOPS.map((l) => (
                <linearGradient key={`grad-${l.id}`} id={`grad-${l.id}`} x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor={COLORS[l.pillar].main} stopOpacity="0" />
                  <stop offset="50%" stopColor={COLORS[l.pillar].main} stopOpacity="0.8" />
                  <stop offset="100%" stopColor={COLORS[l.pillar].main} stopOpacity="0" />
                </linearGradient>
              ))}
            </defs>

            {/* Rotating outer ring */}
            <g className="animate-rotate-slow" style={{ transformOrigin: `${CX}px ${CY}px` }}>
              <circle cx={CX} cy={CY} r={ENABLER_R + 15} fill="none" stroke="rgba(201,169,98,0.08)" strokeWidth="1" strokeDasharray="8 12" />
            </g>

            {/* Inner loop ring */}
            <circle cx={CX} cy={CY} r={LOOP_R} fill="none" stroke="rgba(15,118,110,0.15)" strokeWidth="1.5" />
            <circle cx={CX} cy={CY} r={ENABLER_R} fill="none" stroke="rgba(201,169,98,0.1)" strokeWidth="1" strokeDasharray="4 8" />

            {/* Center glow */}
            <circle cx={CX} cy={CY} r={80} fill="url(#centerGrad)" />

            {/* Loop-to-loop reinforcement arcs */}
            {loopPositions.map((loop, i) => {
              const next = loopPositions[(i + 1) % loopPositions.length];
              return (
                <motion.path
                  key={`arc-${loop.id}`}
                  d={`M ${loop.x} ${loop.y} Q ${CX} ${CY - 30} ${next.x} ${next.y}`}
                  fill="none"
                  stroke={COLORS[loop.pillar].main}
                  strokeWidth="1"
                  strokeOpacity={active === loop.id || active === next.id ? 0.5 : 0.15}
                  strokeDasharray="4 6"
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.5, delay: i * 0.2 }}
                />
              );
            })}

            {/* Catalyst to loop lines */}
            {loopPositions.map((loop) => (
              <g key={`line-${loop.id}`}>
                <line
                  x1={CX} y1={CY} x2={loop.x} y2={loop.y}
                  stroke={COLORS[loop.pillar].main}
                  strokeWidth={active === loop.id || active === "catalyst" ? 2 : 1}
                  strokeOpacity={active === loop.id || active === "catalyst" ? 0.6 : 0.2}
                />
                {/* Flowing particle */}
                {(active === loop.id || active === "catalyst") && (
                  <circle r="3" fill={COLORS[loop.pillar].main}>
                    <animateMotion dur="2s" repeatCount="indefinite" path={`M${CX},${CY} L${loop.x},${loop.y}`} />
                  </circle>
                )}
              </g>
            ))}

            {/* Enabler lines */}
            {enablerPositions.map((e) => (
              <line
                key={`en-${e.id}`}
                x1={e.x} y1={e.y} x2={CX} y2={CY}
                stroke="rgba(201,169,98,0.3)"
                strokeWidth={active === e.id ? 1.5 : 0.8}
                strokeDasharray="3 5"
                strokeOpacity={active === e.id ? 0.8 : 0.25}
              />
            ))}

            {/* Loop nodes */}
            {loopPositions.map((loop, i) => {
              const nodeData = SCM_NODES.find((n) => n.id === loop.id)!;
              const c = COLORS[loop.pillar];
              const isActive = active === loop.id;
              return (
                <g
                  key={loop.id}
                  className="cursor-pointer"
                  onClick={() => { setActive(loop.id); setAutoPlay(false); }}
                  onMouseEnter={() => { setActive(loop.id); setAutoPlay(false); }}
                >
                  {isActive && (
                    <circle cx={loop.x} cy={loop.y} r={52} fill={c.glow} filter="url(#glow)" />
                  )}
                  <motion.circle
                    cx={loop.x} cy={loop.y} r={isActive ? 46 : 40}
                    fill={`${c.main}15`}
                    stroke={c.main}
                    strokeWidth={isActive ? 2.5 : 1.5}
                    initial={{ scale: 0 }} whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + i * 0.15, type: "spring" }}
                  />
                  <text x={loop.x} y={loop.y - 6} textAnchor="middle" fill={c.main} fontSize="16" fontWeight="800" className="pointer-events-none select-none">{loop.pillar}</text>
                  <text x={loop.x} y={loop.y + 10} textAnchor="middle" fill="rgba(245,240,230,0.6)" fontSize="8" className="pointer-events-none select-none">
                    {nodeData.title.split(" ").slice(0, 2).join(" ")}
                  </text>
                </g>
              );
            })}

            {/* Enabler nodes */}
            {enablerPositions.map((e, i) => {
              const nodeData = SCM_NODES.find((n) => n.id === e.id)!;
              const isActive = active === e.id;
              return (
                <g
                  key={e.id}
                  className="cursor-pointer"
                  onClick={() => { setActive(e.id); setAutoPlay(false); }}
                  onMouseEnter={() => { setActive(e.id); setAutoPlay(false); }}
                >
                  <motion.circle
                    cx={e.x} cy={e.y} r={isActive ? 34 : 28}
                    fill="rgba(201,169,98,0.08)"
                    stroke={isActive ? "#c9a962" : "rgba(201,169,98,0.4)"}
                    strokeWidth={isActive ? 2 : 1}
                    initial={{ scale: 0 }} whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.7 + i * 0.1 }}
                  />
                  <text x={e.x} y={e.y + 3} textAnchor="middle" fill="rgba(245,240,230,0.5)" fontSize="7" className="pointer-events-none select-none">
                    {nodeData.title.split(" ")[0]}
                  </text>
                </g>
              );
            })}

            {/* Center catalyst */}
            <g
              className="cursor-pointer"
              onClick={() => { setActive("catalyst"); setAutoPlay(false); }}
              onMouseEnter={() => { setActive("catalyst"); setAutoPlay(false); }}
            >
              {active === "catalyst" && (
                <circle cx={CX} cy={CY} r={65} fill="rgba(15,118,110,0.15)" filter="url(#glow)" />
              )}
              <motion.circle
                cx={CX} cy={CY} r={active === "catalyst" ? 58 : 52}
                fill="rgba(15,118,110,0.2)"
                stroke="#2dd4bf"
                strokeWidth="2"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 200 }}
              />
              <text x={CX} y={CY - 12} textAnchor="middle" fill="#F5F0E6" fontSize="11" fontWeight="700" className="pointer-events-none select-none">Talent</text>
              <text x={CX} y={CY + 2} textAnchor="middle" fill="#2dd4bf" fontSize="13" fontWeight="800" className="pointer-events-none select-none">Catalyst</text>
              <text x={CX} y={CY + 18} textAnchor="middle" fill="rgba(245,240,230,0.4)" fontSize="7" className="pointer-events-none select-none">ENGMA CORE</text>
            </g>

            {/* Ring labels */}
            <text x={CX} y={22} textAnchor="middle" fill="rgba(201,169,98,0.4)" fontSize="8" letterSpacing="3" fontWeight="600">GLOBAL ENABLERS</text>
            <text x={CX} y={488} textAnchor="middle" fill="rgba(15,118,110,0.35)" fontSize="8" letterSpacing="3" fontWeight="600">SYMBIOTIC LOOPS</text>
          </svg>
        </div>

        {/* Side panel — desktop */}
        <div className="lg:col-span-2">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, x: 20, filter: "blur(4px)" }}
              animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, x: -20, filter: "blur(4px)" }}
              transition={{ duration: 0.35 }}
              className="premium-card p-7 sticky top-28"
            >
              <div className="flex items-center justify-between mb-5">
                <span
                  className="text-[10px] font-bold uppercase tracking-[0.2em] px-3 py-1 rounded-full"
                  style={{ background: `${color.main}18`, color: color.main, border: `1px solid ${color.main}30` }}
                >
                  {color.label}
                </span>
                <button
                  onClick={() => setAutoPlay(!autoPlay)}
                  className={cn(
                    "text-[9px] uppercase tracking-wider px-2 py-1 rounded-full border transition-colors",
                    autoPlay ? "border-teal/30 text-teal-light bg-teal/10" : "border-white/10 text-muted-foreground"
                  )}
                >
                  {autoPlay ? "Auto" : "Manual"}
                </button>
              </div>

              <h3 className="font-serif text-2xl text-sand mb-1">{data.title}</h3>
              <p className="text-xs text-gold/70 mb-4">{data.subtitle}</p>
              <p className="text-sm text-muted-foreground leading-relaxed mb-6">{data.description}</p>

              <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-teal-light mb-3">
                Engma Proof Points
              </p>
              <ul className="space-y-2.5 mb-6">
                {data.examples.map((ex) => (
                  <li key={ex} className="flex items-start gap-2.5 text-sm text-sand/75">
                    <ChevronRight className="h-3.5 w-3.5 mt-0.5 shrink-0" style={{ color: color.main }} />
                    {ex}
                  </li>
                ))}
              </ul>

              {/* Node navigator */}
              <div className="flex flex-wrap gap-1.5 pt-4 border-t border-white/5">
                {allIds.map((id) => {
                  const n = SCM_NODES.find((nd) => nd.id === id)!;
                  const c = COLORS[n.pillar];
                  return (
                    <button
                      key={id}
                      onClick={() => { setActive(id); setAutoPlay(false); }}
                      className={cn(
                        "text-[9px] font-bold px-2 py-1 rounded-full transition-all",
                        active === id
                          ? "text-sand"
                          : "text-muted-foreground/50 hover:text-muted-foreground"
                      )}
                      style={active === id ? { background: `${c.main}20`, border: `1px solid ${c.main}40` } : {}}
                    >
                      {n.pillar === "Enabler" ? n.title.split(" ")[0] : n.pillar === "Catalyst" ? "Core" : n.pillar}
                    </button>
                  );
                })}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}