"use client";

import { motion } from "framer-motion";
import { TrendingUp, AlertTriangle, Globe, Zap } from "lucide-react";
import { SectionHeader } from "@/components/ui/section-header";
import { FadeIn } from "@/components/ui/fade-in";
import { AnimatedCounter } from "@/components/ui/animated-counter";
import { GAP_ANALYSIS, MARKET_DATA } from "@/lib/data/content";

const PROOF_METRICS = [
  { value: 15, suffix: "%", label: "Energy ↓", sub: "Huigui 2025", color: "#0F766E" },
  { value: 20, suffix: "%", label: "Water Saved", sub: "Huigui 2025", color: "#2dd4bf" },
  { value: 20, suffix: "%", label: "Scope 1+2 ↓", sub: "SBTi 2030", color: "#166534" },
  { value: 30, suffix: "%", label: "Scope 3 ↓", sub: "SBTi 2030", color: "#4ade80" },
];

export function StrategicImperativeSection() {
  return (
    <section id="imperative" className="section-padding relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(22,101,52,0.05)_0%,transparent_50%)]" />

      <div className="relative mx-auto max-w-7xl">
        <SectionHeader
          label="The Strategic Imperative"
          title="Strong Foundations. A Global Gap."
          subtitle="Engma has built one of China's most credible ESG track records — but scaling symbiosis globally requires an integrated model that positions talent as the strategic catalyst."
        />

        {/* Pyramid answer card */}
        <FadeIn className="mb-16">
          <div className="premium-card p-8 md:p-10 max-w-4xl mx-auto text-center">
            <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-gold mb-4">Pyramid Answer</p>
            <p className="font-serif text-xl md:text-2xl text-sand leading-relaxed text-balance">
              Engma must evolve from a China-centric ESG leader to a{" "}
              <span className="gradient-text italic">global symbiosis architect</span> — with talent
              solutions as the unifying engine.
            </p>
          </div>
        </FadeIn>

        {/* Bento grid */}
        <div className="bento-grid mb-12">
          {/* Gap analysis — large */}
          <FadeIn delay={0.1} className="col-span-12 lg:col-span-7">
            <div className="premium-card p-7 h-full">
              <div className="flex items-center gap-3 mb-7">
                <div className="p-2 rounded-xl bg-teal/10 border border-teal/20">
                  <AlertTriangle className="h-4 w-4 text-teal-light" />
                </div>
                <h3 className="font-serif text-xl text-sand">Capability Gap Analysis</h3>
              </div>
              <div className="space-y-5">
                {GAP_ANALYSIS.current.map((item, i) => {
                  const required = GAP_ANALYSIS.required[i];
                  const gap = required.value - item.value;
                  return (
                    <div key={item.label}>
                      <div className="flex justify-between mb-2">
                        <span className="text-xs font-semibold text-sand/80">{item.label}</span>
                        <span className="text-xs font-bold text-teal-light">+{gap}pts gap</span>
                      </div>
                      <div className="relative h-2.5 rounded-full bg-white/[0.04] overflow-hidden">
                        <motion.div
                          className="absolute inset-y-0 left-0 rounded-full"
                          style={{ background: `linear-gradient(90deg, #0F766E, #2dd4bf)` }}
                          initial={{ width: 0 }}
                          whileInView={{ width: `${item.value}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, delay: i * 0.1 }}
                        />
                        <motion.div
                          className="absolute inset-y-0 left-0 rounded-full border-r-2 border-gold/60"
                          initial={{ width: 0 }}
                          whileInView={{ width: `${required.value}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, delay: i * 0.1 + 0.3 }}
                        />
                      </div>
                      <p className="text-[10px] text-muted-foreground mt-1.5">{item.description}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </FadeIn>

          {/* Market data */}
          <FadeIn delay={0.2} className="col-span-12 lg:col-span-5">
            <div className="premium-card p-7 h-full flex flex-col">
              <div className="flex items-center gap-3 mb-7">
                <div className="p-2 rounded-xl bg-forest/10 border border-forest/20">
                  <TrendingUp className="h-4 w-4 text-forest-light" />
                </div>
                <h3 className="font-serif text-xl text-sand">2026 Market Signals</h3>
              </div>
              <div className="space-y-6 flex-1">
                {MARKET_DATA.map((item, i) => (
                  <motion.div
                    key={item.source}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.15 }}
                    className="flex items-start gap-4 group"
                  >
                    <div className="shrink-0 w-16 text-right">
                      <p className="text-2xl font-bold text-teal-light tabular-nums">{item.stat}</p>
                      <p className="text-[9px] text-muted-foreground uppercase tracking-wider">{item.source}</p>
                    </div>
                    <div className="w-px self-stretch bg-white/5" />
                    <p className="text-sm text-muted-foreground leading-relaxed pt-1">{item.label}</p>
                  </motion.div>
                ))}
              </div>
              <div className="mt-6 p-4 rounded-2xl bg-gradient-to-br from-forest/8 to-teal/5 border border-forest/15">
                <p className="text-xs text-sand/70 leading-relaxed">
                  <Globe className="inline h-3 w-3 mr-1.5 text-forest-light" />
                  EU CSRD + China ESG mandates + green talent deficit = HR firms embedding ESG into core delivery will capture disproportionate value through 2030.
                </p>
              </div>
            </div>
          </FadeIn>
        </div>

        {/* Proof metrics strip */}
        <FadeIn delay={0.3}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {PROOF_METRICS.map((m, i) => (
              <motion.div
                key={m.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="premium-card p-5 text-center metric-ring group"
              >
                <p className="text-3xl font-bold tabular-nums" style={{ color: m.color }}>
                  <AnimatedCounter value={m.value} suffix={m.suffix} duration={2} />
                </p>
                <p className="text-sm font-semibold text-sand mt-1">{m.label}</p>
                <p className="text-[9px] text-muted-foreground uppercase tracking-wider mt-0.5">{m.sub}</p>
              </motion.div>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}