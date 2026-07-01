"use client";

import { motion } from "framer-motion";
import {
  AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer,
  CartesianGrid, ReferenceLine,
} from "recharts";
import { SectionHeader } from "@/components/ui/section-header";
import { FadeIn } from "@/components/ui/fade-in";
import { DashboardFrame } from "@/components/dashboard/dashboard-frame";
import { ProgressRing } from "@/components/dashboard/progress-ring";
import { MetricTile } from "@/components/dashboard/metric-tile";
import { IMPACT_METRICS } from "@/lib/data/content";
import { BarChart3, Leaf, Users, Briefcase } from "lucide-react";

const CATEGORY_META = {
  "Business Value": { icon: Briefcase, color: "#c9a962", gradient: ["#c9a962", "#e8d5a3"] },
  "Social Value": { icon: Users, color: "#4ade80", gradient: ["#166534", "#4ade80"] },
  "Ecological Value": { icon: Leaf, color: "#2dd4bf", gradient: ["#0F766E", "#2dd4bf"] },
};

function parseVal(v: string) {
  return parseFloat(v.replace(/[^0-9.]/g, "")) || 0;
}

export function ImpactDashboardSection() {
  const chartData = [
    { year: "2025", business: 12, social: 8, ecological: 15 },
    { year: "2027", business: 18, social: 22, ecological: 20 },
    { year: "2029", business: 28, social: 38, ecological: 26 },
    { year: "2030", business: 35, social: 45, ecological: 30 },
  ];

  return (
    <section id="impact" className="section-padding relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(22,101,52,0.06)_0%,transparent_50%)]" />
      <div className="absolute top-0 inset-x-0 consulting-divider" />

      <div className="relative mx-auto max-w-[1440px]">
        <SectionHeader
          label="Measurable Impact"
          title="Impact Dashboard"
          subtitle="Balanced value creation across business, social, and ecological dimensions — SBTi-validated 2030 trajectory."
        />

        {/* Summary KPIs */}
        <FadeIn className="mb-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {[
              { label: "ESG Revenue Share", value: "35%", delta: "from 12%", color: "#c9a962", seed: "esg-rev" },
              { label: "Green Talent", value: "50K", delta: "from 2.4K", color: "#4ade80", seed: "green-t" },
              { label: "Energy Reduction", value: "30%", delta: "from 15%", color: "#2dd4bf", seed: "energy" },
              { label: "Scope 1+2 ↓", value: "20%", delta: "SBTi 2030", color: "#0F766E", seed: "scope" },
            ].map((m, i) => (
              <motion.div key={m.label} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}>
                <MetricTile {...m} trend="up" size="lg" sparkSeed={m.seed} />
              </motion.div>
            ))}
          </div>
        </FadeIn>

        {/* Category cards with progress rings */}
        <div className="grid lg:grid-cols-3 gap-4 mb-6">
          {IMPACT_METRICS.map((cat, ci) => {
            const meta = CATEGORY_META[cat.category as keyof typeof CATEGORY_META];
            const Icon = meta.icon;
            return (
              <FadeIn key={cat.category} delay={ci * 0.1}>
                <DashboardFrame
                  title={cat.category}
                  icon={Icon}
                  className="h-full"
                  glow={ci === 0}
                >
                  <div className="space-y-5">
                    {cat.metrics.map((m) => {
                      const base = parseVal(m.baseline);
                      const tgt = parseVal(m.target);
                      const progress = tgt > base ? Math.min(((tgt - base) / Math.max(tgt, 1)) * 100 + base, 100) : tgt;
                      return (
                        <div key={m.label} className="flex items-center gap-4">
                          <ProgressRing
                            value={progress}
                            max={100}
                            size={72}
                            stroke={5}
                            color={meta.color}
                            sublabel="→2030"
                          />
                          <div className="flex-1 min-w-0">
                            <p className="text-xs font-semibold text-sand truncate">{m.label}</p>
                            <div className="flex items-baseline gap-2 mt-1">
                              <span className="text-sm text-muted-foreground line-through decoration-muted-foreground/30">{m.baseline}</span>
                              <span className="text-lg font-bold tabular-nums" style={{ color: meta.color }}>{m.target}</span>
                              {m.unit && <span className="text-[9px] text-muted-foreground">{m.unit}</span>}
                            </div>
                            <div className="mt-2 h-1 rounded-full bg-white/5 overflow-hidden">
                              <motion.div
                                className="h-full rounded-full"
                                style={{ background: `linear-gradient(90deg, ${meta.gradient[0]}, ${meta.gradient[1]})` }}
                                initial={{ width: 0 }}
                                whileInView={{ width: `${Math.min(progress, 100)}%` }}
                                viewport={{ once: true }}
                                transition={{ duration: 1, delay: ci * 0.1 }}
                              />
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </DashboardFrame>
              </FadeIn>
            );
          })}
        </div>

        {/* Trajectory chart */}
        <FadeIn delay={0.25}>
          <DashboardFrame title="Value Trajectory 2025 → 2030" icon={BarChart3} badge="Projected" className="min-h-[360px]">
            <div className="h-72 md:h-80">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -15, bottom: 0 }}>
                  <defs>
                    <linearGradient id="gBusiness" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#c9a962" stopOpacity={0.35} />
                      <stop offset="100%" stopColor="#c9a962" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="gSocial" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#4ade80" stopOpacity={0.35} />
                      <stop offset="100%" stopColor="#4ade80" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="gEco" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#2dd4bf" stopOpacity={0.35} />
                      <stop offset="100%" stopColor="#2dd4bf" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid stroke="rgba(255,255,255,0.04)" vertical={false} />
                  <XAxis dataKey="year" tick={{ fill: "#7a8f8c", fontSize: 11 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: "#7a8f8c", fontSize: 10 }} axisLine={false} tickLine={false} unit="%" />
                  <Tooltip
                    contentStyle={{
                      background: "rgba(8,13,12,0.95)",
                      border: "1px solid rgba(45,212,191,0.2)",
                      borderRadius: 12,
                      fontSize: 12,
                      backdropFilter: "blur(12px)",
                    }}
                  />
                  <ReferenceLine x="2030" stroke="rgba(201,169,98,0.3)" strokeDasharray="4 4" label={{ value: "2030 Target", fill: "#c9a962", fontSize: 10 }} />
                  <Area type="monotone" dataKey="business" name="Business" stroke="#c9a962" fill="url(#gBusiness)" strokeWidth={2} />
                  <Area type="monotone" dataKey="social" name="Social" stroke="#4ade80" fill="url(#gSocial)" strokeWidth={2} />
                  <Area type="monotone" dataKey="ecological" name="Ecological" stroke="#2dd4bf" fill="url(#gEco)" strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <div className="flex flex-wrap justify-center gap-6 mt-4 text-[10px] uppercase tracking-wider">
              {[
                { label: "Business", color: "#c9a962" },
                { label: "Social", color: "#4ade80" },
                { label: "Ecological", color: "#2dd4bf" },
              ].map((l) => (
                <span key={l.label} className="flex items-center gap-2 text-muted-foreground">
                  <span className="h-2 w-4 rounded-sm" style={{ background: l.color }} />
                  {l.label}
                </span>
              ))}
            </div>
            <p className="text-center text-[10px] text-muted-foreground/50 mt-4">
              Ecological targets: SBTi-validated May 2025 · Social & business: SCM adoption projections
            </p>
          </DashboardFrame>
        </FadeIn>
      </div>
    </section>
  );
}