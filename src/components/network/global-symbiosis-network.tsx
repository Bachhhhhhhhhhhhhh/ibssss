"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  NETWORK_NODES, NETWORK_REGIONS, NETWORK_STATS,
  type NetworkNode, type NetworkRegion, type NetworkPillar, type NetworkTier,
} from "@/lib/data/network-locations";
import { DashboardFrame } from "@/components/dashboard/dashboard-frame";
import { formatNum } from "@/lib/utils";
import { cn } from "@/lib/utils";
import {
  Globe, MapPin, Filter, Network, List, Layers,
  Users, Leaf, Building2, ChevronRight, Radio,
  Activity, ArrowLeftRight,
} from "lucide-react";

const PILLAR_COLORS: Record<NetworkPillar, string> = { E: "#0F766E", S: "#4ade80", G: "#2dd4bf" };
const TIER_LABELS: Record<NetworkTier, string> = { hub: "Hub", regional: "Regional", field: "Field", partnership: "Partnership" };

type ViewMode = "map" | "topology" | "list";

function project(lat: number, lng: number, w: number, h: number) {
  return { x: ((lng + 180) / 360) * w, y: ((90 - lat) / 180) * h };
}

/* Simplified continent silhouettes for visual context */
function WorldSilhouette({ w, h }: { w: number; h: number }) {
  const s = w / 560;
  return (
    <g opacity="0.06" fill="#2dd4bf">
      <ellipse cx={130 * s} cy={95 * s} rx={55 * s} ry={70 * s} />
      <ellipse cx={280 * s} cy={75 * s} rx={35 * s} ry={45 * s} />
      <ellipse cx={400 * s} cy={110 * s} rx={45 * s} ry={55 * s} />
      <ellipse cx={460 * s} cy={85 * s} rx={25 * s} ry={30 * s} />
      <ellipse cx={350 * s} cy={175 * s} rx={30 * s} ry={25 * s} />
    </g>
  );
}

export function GlobalSymbiosisNetwork() {
  const [activeId, setActiveId] = useState("suzhou");
  const [viewMode, setViewMode] = useState<ViewMode>("map");
  const [regionFilter, setRegionFilter] = useState<NetworkRegion | "all">("all");
  const [pillarFilter, setPillarFilter] = useState<NetworkPillar | "all">("all");
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const active = NETWORK_NODES.find((n) => n.id === activeId)!;
  const displayId = hoveredId ?? activeId;

  const filteredNodes = useMemo(() => NETWORK_NODES.filter((n) => {
    if (regionFilter !== "all" && n.region !== regionFilter) return false;
    if (pillarFilter !== "all" && n.pillar !== pillarFilter && !n.pillars?.includes(pillarFilter)) return false;
    return true;
  }), [regionFilter, pillarFilter]);

  const connections = useMemo(() => {
    const pairs = new Set<string>();
    const lines: { from: NetworkNode; to: NetworkNode; key: string }[] = [];
    filteredNodes.forEach((node) => {
      node.connections.forEach((cid) => {
        const target = NETWORK_NODES.find((n) => n.id === cid);
        if (!target || !filteredNodes.includes(target)) return;
        const key = [node.id, cid].sort().join("-");
        if (pairs.has(key)) return;
        pairs.add(key);
        lines.push({ from: node, to: target, key });
      });
    });
    return lines;
  }, [filteredNodes]);

  const highlightIds = useMemo(() => {
    const ids = new Set([displayId]);
    active.connections.forEach((c) => ids.add(c));
    NETWORK_NODES.filter((n) => n.connections.includes(displayId)).forEach((n) => ids.add(n.id));
    return ids;
  }, [displayId, active]);

  const W = 600;
  const H = 320;

  const networkHealth = useMemo(() => {
    const avgImpact = Math.round(filteredNodes.reduce((s, n) => s + n.impact, 0) / filteredNodes.length);
    const hubCoverage = filteredNodes.filter((n) => n.tier === "hub" || n.tier === "regional").length;
    const bridgeNodes = filteredNodes.filter((n) => n.region === "bridge").length;
    return { avgImpact, hubCoverage, bridgeNodes, synergy: Math.min(98, Math.round(avgImpact * 0.6 + bridgeNodes * 8 + hubCoverage * 3)) };
  }, [filteredNodes]);

  return (
    <DashboardFrame
      title="Global Symbiosis Network"
      icon={Globe}
      badge={`Synergy ${networkHealth.synergy}%`}
      badgeColor="live"
      glow
      noPadding
      action={
        <div className="flex gap-1">
          {(["map", "topology", "list"] as ViewMode[]).map((v) => {
            const Icon = v === "map" ? Globe : v === "topology" ? Network : List;
            return (
              <button
                key={v}
                onClick={() => setViewMode(v)}
                className={cn(
                  "p-1.5 rounded-lg transition-all",
                  viewMode === v ? "bg-teal/15 text-teal-light" : "text-muted-foreground hover:text-sand"
                )}
                title={v}
              >
                <Icon className="h-3.5 w-3.5" />
              </button>
            );
          })}
        </div>
      }
    >
      {/* Stats ribbon */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-px bg-white/[0.04] border-b border-white/[0.04]">
        {[
          { label: "Active Nodes", value: filteredNodes.length, icon: Globe },
          { label: "Hub Nodes", value: NETWORK_STATS.hubNodes, icon: Building2 },
          { label: "Bridge Nodes", value: networkHealth.bridgeNodes, icon: ArrowLeftRight },
          { label: "Beneficiaries", value: formatNum(NETWORK_STATS.totalBeneficiaries), icon: Users },
          { label: "Network Health", value: `${networkHealth.synergy}%`, icon: Activity },
        ].map((s) => (
          <div key={s.label} className="bg-[#060a09] px-4 py-3 flex items-center gap-3">
            <s.icon className="h-3.5 w-3.5 text-teal-light/60" />
            <div>
              <p className="text-sm font-bold text-sand tabular-nums">{s.value}</p>
              <p className="text-[8px] text-muted-foreground uppercase tracking-wider">{s.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3 px-4 py-3 border-b border-white/[0.04] bg-white/[0.01]">
        <Filter className="h-3.5 w-3.5 text-muted-foreground" />
        <div className="flex gap-1.5">
          {(["all", "east", "bridge", "west"] as const).map((r) => (
            <button
              key={r}
              onClick={() => setRegionFilter(r)}
              className={cn(
                "text-[9px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-lg border transition-all",
                regionFilter === r
                  ? "border-teal/30 bg-teal/10 text-teal-light"
                  : "border-white/8 text-muted-foreground hover:border-white/15"
              )}
            >
              {r === "all" ? "All Regions" : NETWORK_REGIONS[r].label}
            </button>
          ))}
        </div>
        <div className="h-4 w-px bg-white/10" />
        <div className="flex gap-1.5">
          {(["all", "E", "S", "G"] as const).map((p) => (
            <button
              key={p}
              onClick={() => setPillarFilter(p)}
              className={cn(
                "text-[9px] font-bold px-2 py-1 rounded-lg border transition-all",
                pillarFilter === p
                  ? "text-sand"
                  : "border-white/8 text-muted-foreground hover:border-white/15"
              )}
              style={pillarFilter === p && p !== "all" ? {
                background: `${PILLAR_COLORS[p]}18`,
                borderColor: `${PILLAR_COLORS[p]}40`,
                color: PILLAR_COLORS[p],
              } : {}}
            >
              {p === "all" ? "All ESG" : p}
            </button>
          ))}
        </div>
      </div>

      <div className="grid lg:grid-cols-12 gap-0 min-h-[420px]">
        {/* Main visualization */}
        <div className={cn("relative bg-[#040807]", viewMode === "list" ? "lg:col-span-5" : "lg:col-span-8")}>
          {viewMode === "map" && (
            <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto" preserveAspectRatio="xMidYMid meet">
              <defs>
                <radialGradient id="netGlow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="rgba(15,118,110,0.12)" />
                  <stop offset="100%" stopColor="transparent" />
                </radialGradient>
                <filter id="nodeBlur"><feGaussianBlur stdDeviation="3" /></filter>
              </defs>
              <rect width={W} height={H} fill="url(#netGlow)" />
              <WorldSilhouette w={W} h={H} />

              {/* Grid */}
              {Array.from({ length: 13 }).map((_, i) => (
                <line key={`gh${i}`} x1="0" y1={i * (H / 12)} x2={W} y2={i * (H / 12)} stroke="rgba(45,212,191,0.03)" />
              ))}

              {/* East-West bridge corridor arc */}
              <path
                d={`M ${project(31, 120, W, H).x} ${project(31, 120, W, H).y} Q ${W / 2} ${H * 0.15} ${project(51, -0.1, W, H).x} ${project(51, -0.1, W, H).y}`}
                fill="none" stroke="rgba(201,169,98,0.12)" strokeWidth="2" strokeDasharray="6 8"
              />
              <text x={W / 2} y={H * 0.1} textAnchor="middle" fill="rgba(201,169,98,0.35)" fontSize="8" letterSpacing="3">
                EAST — WEST BRIDGE CORRIDOR
              </text>

              {/* Connections */}
              {connections.map(({ from, to, key }) => {
                const p1 = project(from.lat, from.lng, W, H);
                const p2 = project(to.lat, to.lng, W, H);
                const lit = highlightIds.has(from.id) && highlightIds.has(to.id);
                const regionColor = NETWORK_REGIONS[from.region].color;
                return (
                  <g key={key}>
                    <line
                      x1={p1.x} y1={p1.y} x2={p2.x} y2={p2.y}
                      stroke={regionColor}
                      strokeOpacity={lit ? 0.5 : 0.08}
                      strokeWidth={lit ? 2 : 0.8}
                    />
                    {lit && displayId === from.id && (
                      <circle r="3" fill={regionColor}>
                        <animateMotion dur="2.5s" repeatCount="indefinite" path={`M${p1.x},${p1.y} L${p2.x},${p2.y}`} />
                      </circle>
                    )}
                  </g>
                );
              })}

              {/* Nodes */}
              {filteredNodes.map((node) => {
                const pos = project(node.lat, node.lng, W, H);
                const isActive = displayId === node.id;
                const isHub = node.tier === "hub";
                const regionColor = NETWORK_REGIONS[node.region].color;
                const pillarColor = PILLAR_COLORS[node.pillar];
                return (
                  <g
                    key={node.id}
                    className="cursor-pointer"
                    onClick={() => setActiveId(node.id)}
                    onMouseEnter={() => setHoveredId(node.id)}
                    onMouseLeave={() => setHoveredId(null)}
                  >
                    {isActive && (
                      <>
                        <circle cx={pos.x} cy={pos.y} r={isHub ? 22 : 16} fill={`${regionColor}12`} filter="url(#nodeBlur)" />
                        {isHub && (
                          <circle cx={pos.x} cy={pos.y} r={28} fill="none" stroke={regionColor} strokeOpacity="0.2" strokeWidth="1" strokeDasharray="3 5" className="animate-rotate-slow" style={{ transformOrigin: `${pos.x}px ${pos.y}px` }} />
                        )}
                      </>
                    )}
                    <circle
                      cx={pos.x} cy={pos.y}
                      r={isHub ? 8 : isActive ? 6.5 : 4.5}
                      fill={pillarColor}
                      stroke={regionColor}
                      strokeWidth={isActive ? 2.5 : 1.5}
                      opacity={highlightIds.has(node.id) || !displayId ? 1 : 0.35}
                    />
                    {(isActive || isHub) && (
                      <>
                        <text x={pos.x} y={pos.y - (isHub ? 16 : 13)} textAnchor="middle" fill="rgba(245,240,230,0.9)" fontSize="9" fontWeight="700">
                          {node.name}
                        </text>
                        <text x={pos.x} y={pos.y + (isHub ? 20 : 17)} textAnchor="middle" fill="rgba(122,143,140,0.8)" fontSize="7">
                          {node.subtitle}
                        </text>
                      </>
                    )}
                  </g>
                );
              })}
            </svg>
          )}

          {viewMode === "topology" && (
            <div className="p-6 h-full min-h-[380px] flex items-center justify-center">
              <svg viewBox="0 0 500 400" className="w-full max-w-lg h-auto">
                {/* Radial topology from Suzhou center */}
                {(() => {
                  const cx = 250; const cy = 200;
                  const hub = NETWORK_NODES.find((n) => n.id === "suzhou")!;
                  const others = filteredNodes.filter((n) => n.id !== "suzhou");
                  return (
                    <>
                      {others.map((node, i) => {
                        const angle = (i / others.length) * 2 * Math.PI - Math.PI / 2;
                        const r = node.tier === "hub" ? 80 : node.tier === "regional" ? 130 : 170;
                        const x = cx + r * Math.cos(angle);
                        const y = cy + r * Math.sin(angle);
                        const hubPos = { x: cx, y: cy };
                        const lit = highlightIds.has(node.id);
                        const color = NETWORK_REGIONS[node.region].color;
                        const isConnected = hub.connections.includes(node.id) || node.connections.includes("suzhou");
                        if (!isConnected && regionFilter === "all") return null;
                        return (
                          <g key={node.id}>
                            <line x1={hubPos.x} y1={hubPos.y} x2={x} y2={y} stroke={color} strokeOpacity={lit ? 0.4 : 0.1} strokeWidth={lit ? 1.5 : 0.8} strokeDasharray={node.region === "bridge" ? "none" : "4 4"} />
                            <g className="cursor-pointer" onClick={() => setActiveId(node.id)} onMouseEnter={() => setHoveredId(node.id)} onMouseLeave={() => setHoveredId(null)}>
                              <circle cx={x} cy={y} r={displayId === node.id ? 10 : 7} fill={PILLAR_COLORS[node.pillar]} stroke={color} strokeWidth="2" />
                              <text x={x} y={y - 14} textAnchor="middle" fill="rgba(245,240,230,0.8)" fontSize="8" fontWeight="600">{node.name}</text>
                            </g>
                          </g>
                        );
                      })}
                      <circle cx={cx} cy={cy} r="16" fill="#0F766E" stroke="#2dd4bf" strokeWidth="3" />
                      <text x={cx} y={cy + 4} textAnchor="middle" fill="#F5F0E6" fontSize="8" fontWeight="800">HUB</text>
                      <text x={cx} y={cy - 24} textAnchor="middle" fill="rgba(245,240,230,0.7)" fontSize="10" fontWeight="700">Suzhou</text>
                    </>
                  );
                })()}
              </svg>
            </div>
          )}

          {viewMode === "list" && (
            <div className="p-4 space-y-2 max-h-[420px] overflow-y-auto">
              {filteredNodes.map((node) => (
                <NodeListItem
                  key={node.id}
                  node={node}
                  active={activeId === node.id}
                  onSelect={() => setActiveId(node.id)}
                />
              ))}
            </div>
          )}

          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-teal-light/30 to-transparent animate-[scan-line_6s_linear_infinite]" />
          </div>
        </div>

        {/* Detail panel */}
        <div className="lg:col-span-4 border-l border-white/[0.04] flex flex-col">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeId}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="p-5 flex-1 flex flex-col"
            >
              <NodeDetailPanel node={active} onSelectConnection={setActiveId} />
            </motion.div>
          </AnimatePresence>

          {viewMode !== "list" && (
            <div className="border-t border-white/[0.04] p-3 max-h-[160px] overflow-y-auto space-y-1">
              {filteredNodes.filter((n) => n.id !== activeId).map((n) => (
                <button
                  key={n.id}
                  onClick={() => setActiveId(n.id)}
                  className="w-full flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-white/[0.04] text-left transition-colors group"
                >
                  <span className="h-2 w-2 rounded-full shrink-0" style={{ background: PILLAR_COLORS[n.pillar] }} />
                  <span className="text-[10px] text-sand/70 group-hover:text-sand truncate flex-1">{n.name}</span>
                  <span className="text-[8px] text-muted-foreground">{n.impact}%</span>
                  <ChevronRight className="h-3 w-3 text-muted-foreground/30 group-hover:text-teal-light" />
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </DashboardFrame>
  );
}

function NodeListItem({ node, active, onSelect }: { node: NetworkNode; active: boolean; onSelect: () => void }) {
  const regionColor = NETWORK_REGIONS[node.region].color;
  return (
    <button
      onClick={onSelect}
      className={cn(
        "w-full text-left p-3 rounded-xl border transition-all",
        active ? "border-teal/30 bg-teal/8" : "border-white/[0.06] hover:border-white/12 hover:bg-white/[0.02]"
      )}
    >
      <div className="flex items-center gap-2 mb-1">
        <span className="text-[8px] font-bold px-1.5 py-0.5 rounded" style={{ background: `${regionColor}18`, color: regionColor }}>
          {TIER_LABELS[node.tier]}
        </span>
        <span className="text-xs font-semibold text-sand">{node.name}</span>
        <span className="ml-auto text-[9px] font-bold text-teal-light">{node.impact}%</span>
      </div>
      <p className="text-[10px] text-muted-foreground">{node.subtitle}</p>
    </button>
  );
}

function NodeDetailPanel({ node, onSelectConnection }: { node: NetworkNode; onSelectConnection: (id: string) => void }) {
  const regionColor = NETWORK_REGIONS[node.region].color;
  const connected = node.connections.map((id) => NETWORK_NODES.find((n) => n.id === id)!).filter(Boolean);

  return (
    <>
      <div className="flex items-start gap-3 mb-4">
        <div className="p-2.5 rounded-xl border" style={{ background: `${regionColor}10`, borderColor: `${regionColor}25` }}>
          <MapPin className="h-4 w-4" style={{ color: regionColor }} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2 mb-1">
            <h3 className="font-serif text-lg text-sand">{node.name}</h3>
            <span className="text-[8px] font-bold uppercase px-2 py-0.5 rounded-full border" style={{ background: `${regionColor}15`, color: regionColor, borderColor: `${regionColor}30` }}>
              {NETWORK_REGIONS[node.region].label}
            </span>
          </div>
          <p className="text-xs text-gold/80">{node.subtitle}</p>
        </div>
        <div className="text-right shrink-0">
          <p className="text-2xl font-bold text-teal-light tabular-nums">{node.impact}</p>
          <p className="text-[8px] text-muted-foreground uppercase">Impact</p>
        </div>
      </div>

      <p className="text-xs text-muted-foreground leading-relaxed mb-4">{node.description}</p>

      <p className="text-sm font-bold mb-3" style={{ color: regionColor }}>{node.metric}</p>

      {/* Reach metrics */}
      {node.reach && (
        <div className="grid grid-cols-3 gap-2 mb-4">
          {node.reach.beneficiaries && (
            <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/[0.05] text-center">
              <p className="text-sm font-bold text-sand tabular-nums">{formatNum(node.reach.beneficiaries)}</p>
              <p className="text-[7px] text-muted-foreground uppercase mt-0.5">Beneficiaries</p>
            </div>
          )}
          {node.reach.carbonTco2e && (
            <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/[0.05] text-center">
              <p className="text-sm font-bold text-sand tabular-nums">{formatNum(node.reach.carbonTco2e)}t</p>
              <p className="text-[7px] text-muted-foreground uppercase mt-0.5">CO₂</p>
            </div>
          )}
          {node.reach.investmentRmb && (
            <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/[0.05] text-center">
              <p className="text-sm font-bold text-sand tabular-nums">{node.reach.investmentRmb >= 1000 ? formatNum(node.reach.investmentRmb) : node.reach.investmentRmb}</p>
              <p className="text-[7px] text-muted-foreground uppercase mt-0.5">RMB</p>
            </div>
          )}
        </div>
      )}

      {/* Initiatives */}
      <div className="mb-4">
        <p className="text-[9px] font-bold uppercase tracking-wider text-muted-foreground mb-2 flex items-center gap-1.5">
          <Layers className="h-3 w-3" /> Initiatives
        </p>
        <div className="flex flex-wrap gap-1.5">
          {node.initiatives.map((init) => (
            <span key={init} className="text-[9px] px-2.5 py-1 rounded-full bg-white/[0.04] border border-white/[0.06] text-sand/75">
              {init}
            </span>
          ))}
        </div>
      </div>

      {/* Connected nodes */}
      <div className="mt-auto pt-4 border-t border-white/[0.05]">
        <p className="text-[9px] font-bold uppercase tracking-wider text-muted-foreground mb-2 flex items-center gap-1.5">
          <Network className="h-3 w-3" /> Network Links ({connected.length})
        </p>
        <div className="flex flex-wrap gap-1.5">
          {connected.map((c) => (
            <button
              key={c.id}
              onClick={() => onSelectConnection(c.id)}
              className="text-[9px] px-2.5 py-1.5 rounded-lg border border-white/[0.08] hover:border-teal/30 hover:bg-teal/8 text-sand/70 hover:text-sand transition-all flex items-center gap-1.5"
            >
              <span className="h-1.5 w-1.5 rounded-full" style={{ background: NETWORK_REGIONS[c.region].color }} />
              {c.name}
            </button>
          ))}
        </div>
      </div>
    </>
  );
}