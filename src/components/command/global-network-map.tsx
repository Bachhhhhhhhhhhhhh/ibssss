"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { NETWORK_NODES } from "@/lib/data/network-locations";
import { Globe, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";

const REGION_COLORS = { east: "#0F766E", west: "#2dd4bf", bridge: "#c9a962" };
const PILLAR_COLORS = { E: "#0F766E", S: "#166534", G: "#2dd4bf" };

function latLngToXY(lat: number, lng: number, w = 500, h = 260) {
  const x = ((lng + 180) / 360) * w;
  const y = ((90 - lat) / 180) * h;
  return { x, y };
}

export function GlobalNetworkMap() {
  const [active, setActive] = useState<string | null>("suzhou");
  const node = NETWORK_NODES.find((n) => n.id === active);

  return (
    <div className="command-panel h-full flex flex-col">
      <div className="command-panel-header">
        <Globe className="h-3.5 w-3.5 text-teal-light" />
        <span>Global Symbiosis Network</span>
        <span className="ml-auto text-[8px] text-muted-foreground">{NETWORK_NODES.length} nodes active</span>
      </div>

      <div className="command-panel-body flex-1 flex flex-col gap-3">
        <div className="relative rounded-xl overflow-hidden border border-white/5 bg-[#080d0c]">
          <svg viewBox="0 0 500 260" className="w-full h-auto">
            {/* Grid */}
            {Array.from({ length: 9 }).map((_, i) => (
              <line key={`h${i}`} x1="0" y1={i * 32.5} x2="500" y2={i * 32.5} stroke="rgba(255,255,255,0.03)" />
            ))}
            {Array.from({ length: 11 }).map((_, i) => (
              <line key={`v${i}`} x1={i * 50} y1="0" x2={i * 50} y2="260" stroke="rgba(255,255,255,0.03)" />
            ))}

            {/* Connections from Suzhou hub */}
            {NETWORK_NODES.filter((n) => n.id !== "suzhou").map((n) => {
              const hub = latLngToXY(31.3, 120.6);
              const pos = latLngToXY(n.lat, n.lng);
              return (
                <line
                  key={`line-${n.id}`}
                  x1={hub.x} y1={hub.y} x2={pos.x} y2={pos.y}
                  stroke={REGION_COLORS[n.region]}
                  strokeOpacity={active === n.id || active === "suzhou" ? 0.3 : 0.08}
                  strokeWidth={active === n.id ? 1.5 : 0.8}
                  strokeDasharray="3 4"
                />
              );
            })}

            {/* Nodes */}
            {NETWORK_NODES.map((n) => {
              const pos = latLngToXY(n.lat, n.lng);
              const isActive = active === n.id;
              return (
                <g
                  key={n.id}
                  className="cursor-pointer"
                  onClick={() => setActive(n.id)}
                  onMouseEnter={() => setActive(n.id)}
                >
                  {isActive && (
                    <circle cx={pos.x} cy={pos.y} r="12" fill={`${REGION_COLORS[n.region]}20`} />
                  )}
                  <circle
                    cx={pos.x} cy={pos.y} r={isActive ? 5 : 3.5}
                    fill={PILLAR_COLORS[n.pillar]}
                    stroke={REGION_COLORS[n.region]}
                    strokeWidth={isActive ? 2 : 1}
                  />
                  {isActive && (
                    <text x={pos.x} y={pos.y - 10} textAnchor="middle" fill="rgba(245,240,230,0.7)" fontSize="7">
                      {n.name.split(" · ")[0]}
                    </text>
                  )}
                </g>
              );
            })}
          </svg>

          {/* Scan line */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-teal-light/30 to-transparent animate-[scan-line_4s_linear_infinite]" />
          </div>
        </div>

        {/* Legend */}
        <div className="flex gap-3 text-[8px] uppercase tracking-wider">
          {Object.entries(REGION_COLORS).map(([k, c]) => (
            <span key={k} className="flex items-center gap-1 text-muted-foreground">
              <span className="h-1.5 w-1.5 rounded-full" style={{ background: c }} />{k}
            </span>
          ))}
        </div>

        {/* Active node detail */}
        <AnimatePresence mode="wait">
          {node && (
            <motion.div
              key={node.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.06]"
            >
              <div className="flex items-center gap-2 mb-2">
                <MapPin className="h-3 w-3" style={{ color: REGION_COLORS[node.region] }} />
                <span className="text-xs font-semibold text-sand">{node.name}</span>
                <span
                  className="ml-auto text-[8px] font-bold px-1.5 py-0.5 rounded"
                  style={{ background: `${PILLAR_COLORS[node.pillar]}20`, color: PILLAR_COLORS[node.pillar] }}
                >
                  {node.pillar}
                </span>
              </div>
              <p className="text-[10px] text-teal-light font-medium mb-1">{node.metric}</p>
              <div className="flex flex-wrap gap-1">
                {node.initiatives.map((init) => (
                  <span key={init} className="text-[8px] px-2 py-0.5 rounded-full bg-white/[0.04] text-muted-foreground">
                    {init}
                  </span>
                ))}
              </div>
              <div className="mt-2 flex items-center gap-2">
                <div className="flex-1 h-1 rounded-full bg-white/5 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-teal to-teal-light"
                    style={{ width: `${node.impact}%` }}
                  />
                </div>
                <span className="text-[9px] text-muted-foreground tabular-nums">{node.impact}%</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}