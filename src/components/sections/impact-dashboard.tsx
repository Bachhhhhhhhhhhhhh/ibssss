"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { SectionHeader } from "@/components/ui/section-header";
import { FadeIn } from "@/components/ui/fade-in";
import { Card, CardContent } from "@/components/ui/card";
import { IMPACT_METRICS } from "@/lib/data/content";

function parseMetricValue(value: string): number {
  const cleaned = value.replace(/[^0-9.]/g, "");
  return parseFloat(cleaned) || 0;
}

function CustomTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: Array<{ value: number; payload: { type: string; value: number } }>;
  label?: string;
}) {
  if (!active || !payload?.length) return null;
  return (
    <div className="glass-card px-3 py-2 text-xs">
      <p className="font-semibold text-sand">{label}</p>
      <p className="text-teal-light">{payload[0].payload.type}: {payload[0].value}</p>
    </div>
  );
}

export function ImpactDashboardSection() {
  const chartData = IMPACT_METRICS.flatMap((category) =>
    category.metrics.map((m) => ({
      name: m.label.length > 18 ? m.label.slice(0, 16) + "…" : m.label,
      fullName: m.label,
      baseline: parseMetricValue(m.baseline),
      target: parseMetricValue(m.target),
      unit: m.unit,
      category: category.category,
      color: category.color,
    }))
  );

  return (
    <section id="impact" className="section-padding relative">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-teal/20 to-transparent" />

      <div className="relative mx-auto max-w-7xl">
        <SectionHeader
          label="Measurable Impact"
          title="Impact Dashboard"
          subtitle="Balanced value creation across business, social, and ecological dimensions — anchored to Engma's verified 2025 baseline and SBTi-validated 2030 targets."
        />

        {/* KPI cards by category */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {IMPACT_METRICS.map((category, ci) => (
            <FadeIn key={category.category} delay={ci * 0.1}>
              <Card className="h-full">
                <CardContent className="p-6 pt-6">
                  <div className="flex items-center gap-2 mb-5">
                    <div
                      className="h-2 w-2 rounded-full"
                      style={{ background: category.color }}
                    />
                    <h3 className="text-sm font-semibold text-sand">{category.category}</h3>
                  </div>
                  <div className="space-y-4">
                    {category.metrics.map((m) => (
                      <div key={m.label}>
                        <div className="flex justify-between items-baseline mb-1">
                          <p className="text-xs text-muted-foreground">{m.label}</p>
                          {m.unit && (
                            <p className="text-[10px] text-muted-foreground/60">{m.unit}</p>
                          )}
                        </div>
                        <div className="flex items-end gap-3">
                          <div>
                            <p className="text-[10px] text-muted-foreground">2025</p>
                            <p className="text-lg font-bold text-sand/60">{m.baseline}</p>
                          </div>
                          <div className="text-muted-foreground text-sm mb-1">→</div>
                          <div>
                            <p className="text-[10px] text-teal-light">2030</p>
                            <p
                              className="text-lg font-bold"
                              style={{ color: category.color }}
                            >
                              {m.target}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </FadeIn>
          ))}
        </div>

        {/* Chart */}
        <FadeIn delay={0.3}>
          <Card>
            <CardContent className="p-6 pt-6">
              <h3 className="text-sm font-semibold text-sand mb-6">
                2025 Baseline → 2030 Target Progress
              </h3>
              <div className="h-64 md:h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={chartData}
                    margin={{ top: 0, right: 0, left: -20, bottom: 40 }}
                    barGap={4}
                  >
                    <XAxis
                      dataKey="name"
                      tick={{ fill: "#8b9a9e", fontSize: 10 }}
                      axisLine={false}
                      tickLine={false}
                      angle={-30}
                      textAnchor="end"
                      interval={0}
                    />
                    <YAxis
                      tick={{ fill: "#8b9a9e", fontSize: 10 }}
                      axisLine={false}
                      tickLine={false}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar dataKey="baseline" name="2025 Baseline" radius={[4, 4, 0, 0]} opacity={0.5}>
                      {chartData.map((entry, i) => (
                        <Cell key={i} fill={entry.color} opacity={0.4} />
                      ))}
                    </Bar>
                    <Bar dataKey="target" name="2030 Target" radius={[4, 4, 0, 0]}>
                      {chartData.map((entry, i) => (
                        <Cell key={i} fill={entry.color} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="flex gap-6 justify-center mt-2 text-xs text-muted-foreground">
                <span className="flex items-center gap-2">
                  <span className="h-2 w-4 rounded-sm bg-teal/40 inline-block" /> 2025 Baseline
                </span>
                <span className="flex items-center gap-2">
                  <span className="h-2 w-4 rounded-sm bg-teal inline-block" /> 2030 Target
                </span>
              </div>
              <p className="text-center text-[10px] text-muted-foreground/60 mt-3">
                Ecological targets aligned with SBTi-validated commitments (May 2025). Social and business metrics represent strategic projections based on SCM adoption trajectory.
              </p>
            </CardContent>
          </Card>
        </FadeIn>
      </div>
    </section>
  );
}