"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Shield, Trophy, Zap, Link2, Users, Building2, Cpu, Handshake,
  AlertTriangle, CheckCircle2, Target, TrendingUp, ChevronRight,
  BarChart3, Layers,
} from "lucide-react";
import { SectionHeader } from "@/components/ui/section-header";
import { FadeIn } from "@/components/ui/fade-in";
import { DashboardFrame } from "@/components/dashboard/dashboard-frame";
import { MetricTile } from "@/components/dashboard/metric-tile";
import { ProgressRing } from "@/components/dashboard/progress-ring";
import {
  RISK_ITEMS, STRATEGIC_ENABLERS, COMPETITIVE_MOATS,
  WIN_PILLARS, getOverallWinScore,
  type RiskItem, type RiskCategory, type StrategicEnabler,
} from "@/lib/data/risk-enablers";
import { cn } from "@/lib/utils";

type TabId = "risks" | "enablers" | "moat" | "win";

const TABS: { id: TabId; label: string; icon: typeof Shield }[] = [
  { id: "risks", label: "Risk Intelligence", icon: Shield },
  { id: "enablers", label: "Strategic Enablers", icon: Zap },
  { id: "moat", label: "Competitive Moat", icon: BarChart3 },
  { id: "win", label: "Why We Win", icon: Trophy },
];

const LIKELIHOOD_ORDER = ["high", "medium", "low"] as const;
const IMPACT_ORDER = ["low", "medium", "high"] as const;

const CATEGORY_META: Record<RiskCategory, { label: string; color: string }> = {
  regulatory: { label: "Regulatory", color: "#c9a962" },
  market: { label: "Market", color: "#f87171" },
  operational: { label: "Operational", color: "#2dd4bf" },
  reputational: { label: "Reputational", color: "#a78bfa" },
  technology: { label: "Technology", color: "#60a5fa" },
};

const ENABLER_ICONS = {
  bridge: Link2,
  talent: Users,
  governance: Building2,
  digital: Cpu,
  partnership: Handshake,
} as const;

const RESIDUAL_COLORS = {
  low: "text-forest-light bg-forest/15 border-forest/25",
  medium: "text-gold bg-gold/10 border-gold/20",
  high: "text-red-400 bg-red-500/15 border-red-500/25",
};

function riskHeatColor(likelihood: string, impact: string) {
  const L = { low: 1, medium: 2, high: 3 }[likelihood as "low" | "medium" | "high"] ?? 1;
  const I = { low: 1, medium: 2, high: 3 }[impact as "low" | "medium" | "high"] ?? 1;
  const score = L * I;
  if (score >= 6) return { bg: "rgba(248,113,113,0.18)", border: "rgba(248,113,113,0.35)", text: "#f87171" };
  if (score >= 4) return { bg: "rgba(201,169,98,0.15)", border: "rgba(201,169,98,0.3)", text: "#c9a962" };
  return { bg: "rgba(15,118,110,0.12)", border: "rgba(45,212,191,0.25)", text: "#2dd4bf" };
}

export function RisksWinningSection() {
  const [activeTab, setActiveTab] = useState<TabId>("risks");
  const [selectedRiskId, setSelectedRiskId] = useState(RISK_ITEMS[0].id);
  const [categoryFilter, setCategoryFilter] = useState<RiskCategory | "all">("all");
  const [expandedEnabler, setExpandedEnabler] = useState<string | null>(STRATEGIC_ENABLERS[0].id);

  const selectedRisk = RISK_ITEMS.find((r) => r.id === selectedRiskId)!;
  const winScore = getOverallWinScore();

  const filteredRisks = useMemo(
    () => categoryFilter === "all" ? RISK_ITEMS : RISK_ITEMS.filter((r) => r.category === categoryFilter),
    [categoryFilter]
  );

  const riskStats = useMemo(() => ({
    total: RISK_ITEMS.length,
    critical: RISK_ITEMS.filter((r) => r.likelihood === "high" && r.impact === "high").length,
    mitigated: RISK_ITEMS.filter((r) => r.residualRisk === "low").length,
    avgResidual: Math.round(
      RISK_ITEMS.reduce((s, r) => s + ({ low: 1, medium: 2, high: 3 }[r.residualRisk]), 0) / RISK_ITEMS.length * 10
    ) / 10,
  }), []);

  const moatAdvantage = useMemo(() => {
    const gaps = COMPETITIVE_MOATS.map((m) => m.engmaScore - m.industryAvg);
    return Math.round(gaps.reduce((a, b) => a + b, 0) / gaps.length);
  }, []);

  return (
    <section id="risks" className="section-padding relative overflow-hidden">
      <div className="absolute inset-0 dash-grid-bg opacity-40" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_20%,rgba(201,169,98,0.06)_0%,transparent_50%)]" />

      <div className="relative mx-auto max-w-[1440px]">
        <SectionHeader
          label="Risk & Competitive Edge"
          title="Risks, Enablers & Why This Will Win"
          subtitle="A layered defense architecture — every risk mapped to mitigation pathways, every enabler reinforcing structural moats that pure-play competitors cannot replicate."
        />

        {/* Executive summary strip */}
        <FadeIn className="mb-6">
          <DashboardFrame title="Strategic Posture" icon={Target} badge={`Win Score ${winScore}`} badgeColor="gold" glow noPadding>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/[0.04]">
              <div className="bg-[#060a09] p-4">
                <MetricTile label="Tracked Risks" value={riskStats.total} delta={`${riskStats.critical} critical`} trend="neutral" color="#f87171" size="sm" />
              </div>
              <div className="bg-[#060a09] p-4">
                <MetricTile label="Mitigated to Low" value={riskStats.mitigated} delta={`${Math.round(riskStats.mitigated / riskStats.total * 100)}% coverage`} trend="up" color="#4ade80" size="sm" />
              </div>
              <div className="bg-[#060a09] p-4">
                <MetricTile label="Strategic Enablers" value={STRATEGIC_ENABLERS.length} delta="IBSS differentiators" trend="up" color="#2dd4bf" size="sm" />
              </div>
              <div className="bg-[#060a09] p-4">
                <MetricTile label="Moat Advantage" value={`+${moatAdvantage}`} unit="pts avg" delta="vs industry" trend="up" color="#c9a962" size="sm" />
              </div>
            </div>
          </DashboardFrame>
        </FadeIn>

        {/* Tab navigation */}
        <FadeIn delay={0.05} className="mb-5">
          <div className="flex gap-1.5 p-1.5 rounded-2xl bg-black/30 border border-white/[0.06] backdrop-blur-xl overflow-x-auto">
            {TABS.map((tab) => {
              const Icon = tab.icon;
              const active = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={cn(
                    "relative flex items-center gap-2.5 px-5 py-3 rounded-xl text-xs font-bold tracking-wide whitespace-nowrap transition-all",
                    active ? "text-sand" : "text-muted-foreground hover:text-sand/80"
                  )}
                >
                  {active && (
                    <motion.div
                      layoutId="risk-tab"
                      className="absolute inset-0 bg-gradient-to-b from-teal/15 to-teal/5 border border-teal/25 rounded-xl"
                      transition={{ type: "spring", stiffness: 400, damping: 32 }}
                    />
                  )}
                  <Icon className={cn("relative h-4 w-4", active && "text-teal-light")} />
                  <span className="relative">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </FadeIn>

        <AnimatePresence mode="wait">
          {activeTab === "risks" && (
            <motion.div key="risks" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}>
              <RiskIntelligencePanel
                selectedRisk={selectedRisk}
                selectedRiskId={selectedRiskId}
                onSelectRisk={setSelectedRiskId}
                categoryFilter={categoryFilter}
                onCategoryFilter={setCategoryFilter}
                filteredRisks={filteredRisks}
              />
            </motion.div>
          )}

          {activeTab === "enablers" && (
            <motion.div key="enablers" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}>
              <EnablersPanel expandedId={expandedEnabler} onExpand={setExpandedEnabler} />
            </motion.div>
          )}

          {activeTab === "moat" && (
            <motion.div key="moat" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}>
              <MoatPanel />
            </motion.div>
          )}

          {activeTab === "win" && (
            <motion.div key="win" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}>
              <WhyWeWinPanel winScore={winScore} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

/* ─── Risk Intelligence ─── */

function RiskIntelligencePanel({
  selectedRisk, selectedRiskId, onSelectRisk,
  categoryFilter, onCategoryFilter, filteredRisks,
}: {
  selectedRisk: RiskItem;
  selectedRiskId: string;
  onSelectRisk: (id: string) => void;
  categoryFilter: RiskCategory | "all";
  onCategoryFilter: (c: RiskCategory | "all") => void;
  filteredRisks: RiskItem[];
}) {
  return (
    <div className="grid lg:grid-cols-12 gap-4">
      <div className="lg:col-span-7">
        <DashboardFrame title="Risk Heat Matrix" icon={Shield} badge="6 Active" badgeColor="teal" glow noPadding>
          {/* Category filter */}
          <div className="flex flex-wrap gap-1.5 px-4 py-3 border-b border-white/[0.04]">
            <button
              onClick={() => onCategoryFilter("all")}
              className={cn(
                "text-[9px] font-bold uppercase px-2.5 py-1 rounded-lg border transition-all",
                categoryFilter === "all" ? "border-teal/30 bg-teal/10 text-teal-light" : "border-white/8 text-muted-foreground"
              )}
            >
              All
            </button>
            {(Object.keys(CATEGORY_META) as RiskCategory[]).map((cat) => (
              <button
                key={cat}
                onClick={() => onCategoryFilter(cat)}
                className={cn(
                  "text-[9px] font-bold uppercase px-2.5 py-1 rounded-lg border transition-all",
                  categoryFilter === cat ? "text-sand" : "border-white/8 text-muted-foreground"
                )}
                style={categoryFilter === cat ? {
                  background: `${CATEGORY_META[cat].color}15`,
                  borderColor: `${CATEGORY_META[cat].color}35`,
                  color: CATEGORY_META[cat].color,
                } : {}}
              >
                {CATEGORY_META[cat].label}
              </button>
            ))}
          </div>

          {/* Heatmap */}
          <div className="p-5">
            <div className="grid grid-cols-[72px_repeat(3,1fr)] gap-1.5 mb-1">
              <div />
              {IMPACT_ORDER.map((imp) => (
                <div key={imp} className="text-[9px] font-bold uppercase tracking-wider text-muted-foreground text-center">
                  {imp} Impact
                </div>
              ))}
            </div>
            {LIKELIHOOD_ORDER.map((lik) => (
              <div key={lik} className="grid grid-cols-[72px_repeat(3,1fr)] gap-1.5 mb-1.5">
                <div className="text-[9px] font-bold uppercase tracking-wider text-muted-foreground flex items-center capitalize">
                  {lik}
                </div>
                {IMPACT_ORDER.map((imp) => {
                  const cellRisks = filteredRisks.filter((r) => r.likelihood === lik && r.impact === imp);
                  const colors = riskHeatColor(lik, imp);
                  const hasSelected = cellRisks.some((r) => r.id === selectedRiskId);
                  return (
                    <button
                      key={imp}
                      onClick={() => cellRisks[0] && onSelectRisk(cellRisks[0].id)}
                      className={cn(
                        "min-h-[72px] rounded-xl border p-2 transition-all text-left",
                        cellRisks.length > 0 ? "hover:scale-[1.02]" : "opacity-40 cursor-default",
                        hasSelected && "ring-1 ring-teal-light/50"
                      )}
                      style={cellRisks.length > 0 ? { background: colors.bg, borderColor: colors.border } : { background: "rgba(255,255,255,0.02)", borderColor: "rgba(255,255,255,0.05)" }}
                    >
                      {cellRisks.map((r) => (
                        <div
                          key={r.id}
                          onClick={(e) => { e.stopPropagation(); onSelectRisk(r.id); }}
                          className={cn(
                            "text-[8px] font-semibold leading-tight px-1 py-0.5 rounded mb-0.5 block w-full text-left transition-colors",
                            selectedRiskId === r.id ? "bg-white/10" : "hover:bg-white/5"
                          )}
                          style={{ color: colors.text }}
                        >
                          {r.name}
                        </div>
                      ))}
                    </button>
                  );
                })}
              </div>
            ))}
            <p className="text-[9px] text-muted-foreground text-center mt-3">Likelihood ↓ · Impact →</p>
          </div>

          {/* Risk index list */}
          <div className="border-t border-white/[0.04] p-3 space-y-1 max-h-[200px] overflow-y-auto">
            {filteredRisks.map((r) => {
              const cat = CATEGORY_META[r.category];
              return (
                <button
                  key={r.id}
                  onClick={() => onSelectRisk(r.id)}
                  className={cn(
                    "w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-all text-left",
                    selectedRiskId === r.id ? "bg-teal/10 border border-teal/20" : "hover:bg-white/[0.03]"
                  )}
                >
                  <span className="h-2 w-2 rounded-full shrink-0" style={{ background: cat.color }} />
                  <span className="text-[10px] text-sand/80 flex-1 truncate">{r.name}</span>
                  <span className={cn("text-[8px] font-bold uppercase px-1.5 py-0.5 rounded border", RESIDUAL_COLORS[r.residualRisk])}>
                    {r.residualRisk}
                  </span>
                  <ChevronRight className="h-3 w-3 text-muted-foreground/40" />
                </button>
              );
            })}
          </div>
        </DashboardFrame>
      </div>

      {/* Detail panel */}
      <div className="lg:col-span-5">
        <DashboardFrame title="Mitigation Pathway" icon={AlertTriangle} badge={selectedRisk.owner} badgeColor="gold" glow className="h-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedRisk.id}
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -12 }}
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <span
                    className="text-[8px] font-bold uppercase px-2 py-0.5 rounded border mb-2 inline-block"
                    style={{ background: `${CATEGORY_META[selectedRisk.category].color}15`, borderColor: `${CATEGORY_META[selectedRisk.category].color}30`, color: CATEGORY_META[selectedRisk.category].color }}
                  >
                    {CATEGORY_META[selectedRisk.category].label}
                  </span>
                  <h3 className="font-serif text-xl text-sand">{selectedRisk.name}</h3>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-gold tabular-nums">{selectedRisk.score}</p>
                  <p className="text-[8px] text-muted-foreground uppercase">Risk Score</p>
                </div>
              </div>

              <p className="text-xs text-muted-foreground leading-relaxed mb-5">{selectedRisk.description}</p>

              <div className="p-4 rounded-xl bg-teal/8 border border-teal/20 mb-5">
                <p className="text-[9px] font-bold uppercase tracking-wider text-teal-light mb-1.5">Primary Mitigation</p>
                <p className="text-sm text-sand/90 font-medium">{selectedRisk.mitigation}</p>
              </div>

              <p className="text-[9px] font-bold uppercase tracking-wider text-muted-foreground mb-3 flex items-center gap-1.5">
                <Layers className="h-3 w-3" /> Mitigation Steps
              </p>
              <div className="space-y-2 mb-5">
                {selectedRisk.mitigationSteps.map((step, i) => (
                  <div key={step} className="flex items-start gap-3">
                    <span className="shrink-0 flex h-5 w-5 items-center justify-center rounded-full bg-teal/15 text-[9px] font-bold text-teal-light border border-teal/25">
                      {i + 1}
                    </span>
                    <p className="text-[11px] text-sand/75 leading-relaxed pt-0.5">{step}</p>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-white/[0.06]">
                <div>
                  <p className="text-[8px] text-muted-foreground uppercase mb-1">Residual Risk</p>
                  <span className={cn("text-xs font-bold uppercase px-2.5 py-1 rounded-lg border", RESIDUAL_COLORS[selectedRisk.residualRisk])}>
                    {selectedRisk.residualRisk}
                  </span>
                </div>
                <div className="flex items-center gap-4 text-[10px]">
                  <div className="text-center">
                    <p className="text-muted-foreground uppercase text-[8px]">Likelihood</p>
                    <p className="font-bold text-sand capitalize">{selectedRisk.likelihood}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-muted-foreground uppercase text-[8px]">Impact</p>
                    <p className="font-bold text-sand capitalize">{selectedRisk.impact}</p>
                  </div>
                  <CheckCircle2 className="h-5 w-5 text-forest-light/60" />
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </DashboardFrame>
      </div>
    </div>
  );
}

/* ─── Strategic Enablers ─── */

function EnablersPanel({ expandedId, onExpand }: { expandedId: string | null; onExpand: (id: string | null) => void }) {
  return (
    <div className="grid lg:grid-cols-12 gap-4">
      <div className="lg:col-span-8">
        <DashboardFrame title="Strategic Enabler Architecture" icon={Zap} badge="5 Pillars" badgeColor="live" glow>
          <div className="space-y-3">
            {STRATEGIC_ENABLERS.map((enabler, i) => (
              <EnablerCard
                key={enabler.id}
                enabler={enabler}
                index={i}
                expanded={expandedId === enabler.id}
                onToggle={() => onExpand(expandedId === enabler.id ? null : enabler.id)}
              />
            ))}
          </div>
        </DashboardFrame>
      </div>

      <div className="lg:col-span-4">
        <DashboardFrame title="Enabler Strength Index" icon={TrendingUp} glow className="h-full">
          <div className="space-y-5">
            {STRATEGIC_ENABLERS.map((e) => {
              const Icon = ENABLER_ICONS[e.icon];
              return (
                <div key={e.id} className="group">
                  <div className="flex items-center gap-2 mb-2">
                    <Icon className="h-3.5 w-3.5 text-teal-light/70" />
                    <span className="text-[10px] text-sand/80 font-medium flex-1 truncate">{e.title}</span>
                    <span className="text-xs font-bold text-teal-light tabular-nums">{e.strength}%</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-white/[0.04] overflow-hidden">
                    <motion.div
                      className="h-full rounded-full"
                      style={{ background: `linear-gradient(90deg, #0F766E, #2dd4bf)` }}
                      initial={{ width: 0 }}
                      whileInView={{ width: `${e.strength}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: 0.1 }}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-6 p-4 rounded-xl bg-gold/8 border border-gold/20">
            <p className="text-[9px] font-bold uppercase tracking-wider text-gold mb-2">Reinforcement Network</p>
            <p className="text-[11px] text-sand/70 leading-relaxed">
              Each enabler cross-reinforces SCM loops — East-West Bridge defends regulatory risk, Talent Catalyst counters market competition, Proven Foundation neutralizes greenwashing perception.
            </p>
          </div>
        </DashboardFrame>
      </div>
    </div>
  );
}

function EnablerCard({ enabler, index, expanded, onToggle }: {
  enabler: StrategicEnabler; index: number; expanded: boolean; onToggle: () => void;
}) {
  const Icon = ENABLER_ICONS[enabler.icon];
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.06 }}
      className={cn(
        "rounded-xl border transition-all cursor-pointer",
        expanded ? "border-teal/30 bg-teal/5" : "border-white/[0.06] hover:border-white/12 hover:bg-white/[0.02]"
      )}
      onClick={onToggle}
    >
      <div className="p-4 flex items-start gap-4">
        <div className="p-2.5 rounded-xl bg-teal/10 border border-teal/20 shrink-0">
          <Icon className="h-4 w-4 text-teal-light" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-0.5">
            <h4 className="text-sm font-semibold text-sand">{enabler.title}</h4>
            <span className="text-[8px] font-bold text-gold uppercase tracking-wider">{enabler.subtitle}</span>
          </div>
          <p className="text-[11px] text-muted-foreground leading-relaxed line-clamp-2">{enabler.description}</p>
        </div>
        <div className="text-right shrink-0">
          <p className="text-lg font-bold text-teal-light tabular-nums">{enabler.strength}</p>
          <p className="text-[7px] text-muted-foreground uppercase">Strength</p>
        </div>
      </div>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-4 pt-0 border-t border-white/[0.04] ml-14">
              <div className="grid md:grid-cols-2 gap-4 pt-3">
                <div>
                  <p className="text-[9px] font-bold uppercase tracking-wider text-muted-foreground mb-2">Proof Points</p>
                  <ul className="space-y-1.5">
                    {enabler.proofPoints.map((p) => (
                      <li key={p} className="flex items-start gap-2 text-[10px] text-sand/75">
                        <CheckCircle2 className="h-3 w-3 text-forest-light shrink-0 mt-0.5" />
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="text-[9px] font-bold uppercase tracking-wider text-muted-foreground mb-2">Reinforces</p>
                  <div className="flex flex-wrap gap-1.5">
                    {enabler.reinforces.map((r) => (
                      <span key={r} className="text-[9px] px-2 py-1 rounded-full bg-white/[0.04] border border-white/[0.06] text-sand/70">
                        {r}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* ─── Competitive Moat ─── */

function MoatPanel() {
  const avgEngma = Math.round(COMPETITIVE_MOATS.reduce((s, m) => s + m.engmaScore, 0) / COMPETITIVE_MOATS.length);
  const avgIndustry = Math.round(COMPETITIVE_MOATS.reduce((s, m) => s + m.industryAvg, 0) / COMPETITIVE_MOATS.length);

  return (
    <DashboardFrame title="Competitive Moat Analysis" icon={BarChart3} badge={`+${avgEngma - avgIndustry} pt lead`} badgeColor="gold" glow noPadding>
      <div className="grid lg:grid-cols-12 gap-0">
        <div className="lg:col-span-8 p-6 border-r border-white/[0.04]">
          <div className="flex items-end justify-center gap-8 mb-8">
            <ProgressRing value={avgEngma} size={100} color="#2dd4bf" label="Engma SCM" sublabel="avg" />
            <div className="text-2xl font-bold text-muted-foreground/30 pb-6">vs</div>
            <ProgressRing value={avgIndustry} size={100} color="#7a8f8c" label="Industry Avg" sublabel="avg" />
          </div>

          <div className="space-y-5">
            {COMPETITIVE_MOATS.map((moat, i) => (
              <motion.div
                key={moat.id}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-semibold text-sand">{moat.title}</span>
                  <span className="text-[10px] text-teal-light font-bold">+{moat.engmaScore - moat.industryAvg} gap</span>
                </div>
                <div className="relative h-6 rounded-lg bg-white/[0.03] overflow-hidden">
                  <motion.div
                    className="absolute inset-y-0 left-0 rounded-lg bg-white/[0.06]"
                    initial={{ width: 0 }}
                    whileInView={{ width: `${moat.industryAvg}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                  />
                  <motion.div
                    className="absolute inset-y-0 left-0 rounded-lg"
                    style={{ background: "linear-gradient(90deg, rgba(15,118,110,0.5), rgba(45,212,191,0.4))" }}
                    initial={{ width: 0 }}
                    whileInView={{ width: `${moat.engmaScore}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.15 }}
                  />
                  <div className="absolute inset-0 flex items-center justify-between px-3">
                    <span className="text-[9px] font-bold text-sand/60 tabular-nums">{moat.industryAvg}</span>
                    <span className="text-[9px] font-bold text-teal-light tabular-nums">{moat.engmaScore}</span>
                  </div>
                </div>
                <p className="text-[10px] text-muted-foreground mt-1">{moat.description} — <span className="text-sand/50">{moat.evidence}</span></p>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-4 p-6 flex flex-col">
          <h4 className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-4">Moat Dimensions</h4>
          <div className="space-y-4 flex-1">
            {COMPETITIVE_MOATS.map((m) => (
              <div key={m.id} className="flex items-center gap-3">
                <div className="flex-1">
                  <p className="text-[10px] text-sand/70 truncate">{m.title}</p>
                </div>
                <div className="w-16 h-1 rounded-full bg-white/[0.04] overflow-hidden">
                  <div className="h-full rounded-full bg-teal-light" style={{ width: `${m.engmaScore}%` }} />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 p-4 rounded-xl bg-teal/8 border border-teal/20">
            <p className="text-[9px] font-bold uppercase text-teal-light mb-2">Structural Advantage</p>
            <p className="text-[11px] text-sand/75 leading-relaxed">
              No pure-play HR firm combines verified China ESG operations, East-West bridge capability, and talent-native ESG integration. SCM converts this into an irreplicable competitive position.
            </p>
          </div>
        </div>
      </div>
    </DashboardFrame>
  );
}

/* ─── Why We Win ─── */

function WhyWeWinPanel({ winScore }: { winScore: number }) {
  return (
    <div className="grid lg:grid-cols-12 gap-4">
      <div className="lg:col-span-5">
        <DashboardFrame title="IBSS Win Score" icon={Trophy} badge="Competition Ready" badgeColor="gold" glow className="h-full">
          <div className="flex flex-col items-center py-4">
            <div className="relative mb-8">
              <ProgressRing value={winScore} size={148} stroke={7} color="#c9a962" label="IBSS Win Score" sublabel="/ 100" />
            </div>

            <div className="w-full space-y-3 mt-4">
              {WIN_PILLARS.map((p) => (
                <div key={p.label}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] text-sand/80">{p.label}</span>
                    <span className="text-[10px] font-bold tabular-nums" style={{ color: p.color }}>{p.score}</span>
                  </div>
                  <div className="h-2 rounded-full bg-white/[0.04] overflow-hidden">
                    <motion.div
                      className="h-full rounded-full"
                      style={{ background: p.color }}
                      initial={{ width: 0 }}
                      whileInView={{ width: `${p.score}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.7 }}
                    />
                  </div>
                  <p className="text-[8px] text-muted-foreground mt-0.5">{p.weight}% weight</p>
                </div>
              ))}
            </div>
          </div>
        </DashboardFrame>
      </div>

      <div className="lg:col-span-7">
        <DashboardFrame title="Why SCM Wins for Engma" icon={Target} glow className="h-full">
          <div className="space-y-5 mb-6">
            {[
              { n: 1, title: "Philosophy Becomes Infrastructure", desc: "SCM transforms symbiosis from corporate narrative into measurable operating system — every loop, enabler, and node produces auditable impact data." },
              { n: 2, title: "East-West Asymmetric Advantage", desc: "While Western consultancies advise on ESG, Engma operates it at scale in China and translates proof into global governance language — a capability gap no competitor closes by 2030." },
              { n: 3, title: "Talent-Native Revenue Premium", desc: "ESG-integrated HR services command 25–35% premium over commodity talent solutions. SCM embeds impact into every placement, certification, and client engagement." },
              { n: 4, title: "Compounding Network Effects", desc: "Each symbiosis node — Huigui, Minqin, Singapore, London — strengthens the others. Partnership architecture with SBTi, WEC, SHRM multiplies reach beyond direct operations." },
              { n: 5, title: "Risk-Adjusted Execution Path", desc: "Phased rollout on proven foundations de-risks ambition. Residual risk across all six tracked threats averages low-to-medium — strategy is bold but executable." },
            ].map((item, i) => (
              <motion.div
                key={item.n}
                initial={{ opacity: 0, x: 10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="flex items-start gap-3 group"
              >
                <span className="shrink-0 flex h-7 w-7 items-center justify-center rounded-full bg-gold/10 text-xs font-bold text-gold border border-gold/25">
                  {item.n}
                </span>
                <div>
                  <p className="text-sm font-semibold text-sand group-hover:text-teal-light transition-colors">{item.title}</p>
                  <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="p-5 rounded-xl bg-gradient-to-br from-teal/10 via-transparent to-gold/8 border border-teal/20">
            <p className="text-xs font-semibold text-teal-light uppercase tracking-wider mb-2">Business Case · 2030</p>
            <p className="text-sm text-sand/85 leading-relaxed">
              By 2030, Engma with SCM captures the ESG premium, reduces client churn through measurable impact, attracts top green talent via the Academy, and builds an{" "}
              <span className="text-gold font-semibold">irreplicable East-West ESG brand</span> — turning symbiosis from philosophy into a{" "}
              <span className="text-teal-light font-semibold">measurable competitive moat</span> that wins IBSS and beyond.
            </p>
          </div>
        </DashboardFrame>
      </div>
    </div>
  );
}