"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { NETWORK_NODES } from "@/lib/data/network-locations";
import { DashboardFrame } from "@/components/dashboard/dashboard-frame";
import { Globe, MapPin } from "lucide-react";

const REGION_COLORS = { east: "#0F766E", west: "#2dd4bf", bridge: "#c9a962" };
const PILLAR_COLORS = { E: "#0F766E", S: "#4ade80", G: "#2dd4bf" };

function toXY(lat: number, lng: number, w = 560, h = 280) {
  return { x: ((lng + 180) / 360) * w, y: ((90 - lat) / 180) * h };
}

export function GlobalNetworkMap() {
  const [active, setActive] = useState("suzhou");
  const node = NETWORK_NODES.find((n) => n.id === active)!;
  const hub = toXY(31.3, 120.6);

  return (
    <DashboardFrame
      title="Global Symbiosis Network"
      icon={Globe}
      badge={`${NETWORK_NODES.length} Nodes`}
      badgeColor="teal"
      noPadding
    >
      <div className="grid lg:grid-cols-5 gap-0">
        <div className="lg:col-span-3 relative bg-[#050a09] border-r border-white/[0.04] overflow-hidden">
          <svg viewBox="0 0 560 280" className="w-full h-auto">
            <defs>
              <radialGradient id="mapGlow">
                <stop offset="0%" stopColor="rgba(45,212,191,0.08)" />
                <stop offset="100%" stopColor="transparent" />
              </radialGradient>
              <filter id="nodeGlow">
                <feGaussianBlur stdDeviation="2" result="b" />
                <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
              </filter>
            </defs>
            <rect width="560" height="280" fill="url(#mapGlow)" />
            {Array.from({ length: 12 }).map((_, i) => (
              <line key={`h${i}`} x1="0" y1={i * 23.3} x2="560" y2={i * 23.3} stroke="rgba(45,212,191,0.04)" />
            ))}
            {Array.from({ length: 16 }).map((_, i) => (
              <line key={`v${i}`} x1={i * 35} y1="0" x2={i * 35} y2="280" stroke="rgba(45,212,191,0.04)" />
            ))}

            {NETWORK_NODES.filter((n) => n.id !== "suzhou").map((n) => {
              const pos = toXY(n.lat, n.lng);
              const isActive = active === n.id;
              return (
                <line
                  key={`l-${n.id}`}
                  x1={hub.x} y1={hub.y} x2={pos.x} y2={pos.y}
                  stroke={REGION_COLORS[n.region]}
                  strokeOpacity={isActive ? 0.45 : 0.1}
                  strokeWidth={isActive ? 1.5 : 0.8}
                  strokeDasharray={isActive ? "none" : "4 6"}
                />
              );
            })}

            {NETWORK_NODES.map((n) => {
              const pos = toXY(n.lat, n.lng);
              const isActive = active === n.id;
              const isHub = n.id === "suzhou";
              return (
                <g key={n.id} className="cursor-pointer" onClick={() => setActive(n.id)} onMouseEnter={() => setActive(n.id)}>
                  {isActive && (
                    <circle cx={pos.x} cy={pos.y} r={isHub ? 18 : 14} fill={`${REGION_COLORS[n.region]}15`} filter="url(#nodeGlow)" />
                  )}
                  <circle
                    cx={pos.x} cy={pos.y}
                    r={isHub ? 7 : isActive ? 6 : 4}
                    fill={PILLAR_COLORS[n.pillar]}
                    stroke={REGION_COLORS[n.region]}
                    strokeWidth={isActive ? 2.5 : 1.5}
                  />
                  {(isActive || isHub) && (
                    <text x={pos.x} y={pos.y - (isHub ? 14 : 12)} textAnchor="middle" fill="rgba(245,240,230,0.8)" fontSize="8" fontWeight="600">
                      {n.name.split(" · ")[0]}
                    </text>
                  )}
                </g>
              );
            })}
          </svg>
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-teal-light/40 to-transparent animate-[scan-line_5s_linear_infinite]" />
          </div>
        </div>

        <div className="lg:col-span-2 p-5">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -12 }}
              transition={{ duration: 0.25 }}
            >
              <div className="flex items-center gap-2 mb-3">
                <MapPin className="h-4 w-4" style={{ color: REGION_COLORS[node.region] }} />
                <span className="font-semibold text-sand">{node.name}</span>
                <span className="ml-auto text-[9px] font-bold px-2 py-0.5 rounded-full" style={{ background: `${PILLAR_COLORS[node.pillar]}18`, color: PILLAR_COLORS[node.pillar] }}>
                  {node.pillar}
                </span>
              </div>
              <p className="text-lg font-bold mb-1" style={{ color: REGION_COLORS[node.region] }}>{node.metric}</p>
              <p className="text-[10px] text-muted-foreground mb-4 uppercase tracking-wider">{node.region} region</p>

              <div className="flex flex-wrap gap-1.5 mb-4">
                {node.initiatives.map((init) => (
                  <span key={init} className="text-[9px] px-2.5 py-1 rounded-full bg-white/[0.04] border border-white/[0.06] text-sand/70">
                    {init}
                  </span>
                ))}
              </div>

              <div>
                <div className="flex justify-between text-[9px] text-muted-foreground mb-1">
                  <span>Impact Score</span>
                  <span className="font-bold text-teal-light">{node.impact}%</span>
                </div>
                <div className="h-2 rounded-full bg-white/5 overflow-hidden">
                  <motion.div
                    className="h-full rounded-full"
                    style={{ background: `linear-gradient(90deg, ${REGION_COLORS[node.region]}, ${PILLAR_COLORS[node.pillar]})` }}
                    initial={{ width: 0 }}
                    animate={{ width: `${node.impact}%` }}
                    transition={{ duration: 0.8 }}
                  />
                </div>
              </div>

              <div className="flex gap-3 mt-5 pt-4 border-t border-white/5">
                {Object.entries(REGION_COLORS).map(([k, c]) => (
                  <span key={k} className="flex items-center gap-1 text-[8px] text-muted-foreground uppercase">
                    <span className="h-1.5 w-1.5 rounded-full" style={{ background: c }} />{k}
                  </span>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </DashboardFrame>
  );
}