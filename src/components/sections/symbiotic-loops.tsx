"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Leaf, Users, Shield, ArrowRight, Sparkles } from "lucide-react";
import { SectionHeader } from "@/components/ui/section-header";
import { FadeIn } from "@/components/ui/fade-in";
import { LOOPS, LOOP_INITIATIVES, type LoopId } from "@/lib/data/content";
import { cn } from "@/lib/utils";

const LOOP_META: Record<LoopId, { icon: React.ElementType; gradient: string; accent: string; bg: string }> = {
  regenerative: { icon: Leaf, gradient: "from-teal/20 to-teal/5", accent: "#2dd4bf", bg: "bg-teal/10" },
  transition: { icon: Users, gradient: "from-forest/20 to-forest/5", accent: "#4ade80", bg: "bg-forest/10" },
  governance: { icon: Shield, gradient: "from-teal-light/20 to-teal-light/5", accent: "#2dd4bf", bg: "bg-teal-light/10" },
};

export function SymbioticLoopsSection() {
  const [active, setActive] = useState<LoopId>("regenerative");
  const meta = LOOP_META[active];
  const data = LOOPS.find((l) => l.id === active)!;
  const initiatives = LOOP_INITIATIVES[active];
  const Icon = meta.icon;

  return (
    <section id="loops" className="section-padding relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(15,118,110,0.04)_0%,transparent_50%)]" />
      <div className="relative mx-auto max-w-7xl">
        <SectionHeader
          label="Deep Dive"
          title="Three Symbiotic Loops"
          subtitle="Each loop reinforces the others — environmental regeneration enables social equity, which strengthens governance trust, which accelerates ecological investment."
        />

        {/* Tab selector */}
        <FadeIn className="mb-12">
          <div className="flex flex-col sm:flex-row gap-2 justify-center p-1.5 rounded-2xl bg-white/[0.02] border border-white/[0.05] max-w-2xl mx-auto">
            {LOOPS.map((loop) => {
              const m = LOOP_META[loop.id as LoopId];
              const LoopIcon = m.icon;
              const isActive = active === loop.id;
              return (
                <button
                  key={loop.id}
                  onClick={() => setActive(loop.id as LoopId)}
                  className={cn(
                    "relative flex-1 flex items-center justify-center gap-2.5 px-5 py-3.5 rounded-xl transition-all duration-300",
                    isActive ? "text-sand" : "text-muted-foreground hover:text-sand/70"
                  )}
                >
                  {isActive && (
                    <motion.div
                      layoutId="loop-tab"
                      className={cn("absolute inset-0 rounded-xl border", m.bg)}
                      style={{ borderColor: `${m.accent}30` }}
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                  <LoopIcon className="relative h-4 w-4" style={{ color: isActive ? m.accent : undefined }} />
                  <span className="relative text-sm font-semibold">
                    {loop.pillar === "E" ? "Environmental" : loop.pillar === "S" ? "Social" : "Governance"}
                  </span>
                </button>
              );
            })}
          </div>
        </FadeIn>

        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -24 }}
            transition={{ duration: 0.4 }}
            className="bento-grid"
          >
            {/* Overview card */}
            <div className="col-span-12 lg:col-span-5">
              <div className={cn("premium-card p-8 h-full bg-gradient-to-br", meta.gradient)}>
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 rounded-2xl border" style={{ background: `${meta.accent}15`, borderColor: `${meta.accent}25` }}>
                    <Icon className="h-5 w-5" style={{ color: meta.accent }} />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em]" style={{ color: meta.accent }}>
                      {data.subtitle}
                    </p>
                    <h3 className="font-serif text-2xl text-sand mt-0.5">{data.title}</h3>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed mb-8">{data.description}</p>
                <div className="space-y-3">
                  <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-teal-light">Proof Points</p>
                  {data.examples.map((ex, i) => (
                    <motion.div
                      key={ex}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.08 }}
                      className="flex items-start gap-2.5"
                    >
                      <Sparkles className="h-3 w-3 mt-1 shrink-0" style={{ color: meta.accent }} />
                      <p className="text-xs text-sand/70 leading-relaxed">{ex}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            {/* Initiatives */}
            <div className="col-span-12 lg:col-span-7 space-y-3">
              {initiatives.map((init, i) => (
                <motion.div
                  key={init.title}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="premium-card p-6 group"
                >
                  <div className="flex items-start gap-4">
                    <div
                      className="shrink-0 w-8 h-8 rounded-xl flex items-center justify-center text-xs font-black"
                      style={{ background: `${meta.accent}15`, color: meta.accent }}
                    >
                      {i + 1}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-sand text-base mb-1.5 group-hover:text-teal-light transition-colors">
                        {init.title}
                      </h4>
                      <p className="text-sm text-muted-foreground leading-relaxed">{init.description}</p>
                      <div className="mt-3 flex items-center gap-2 text-xs font-medium" style={{ color: meta.accent }}>
                        <ArrowRight className="h-3 w-3" />
                        {init.effect}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Reinforcement flow */}
        <FadeIn delay={0.2} className="mt-14">
          <div className="premium-card p-8 text-center">
            <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-muted-foreground mb-6">Reinforcement Logic</p>
            <div className="flex flex-wrap items-center justify-center gap-2">
              {[
                { label: "Regenerative", color: "#0F766E" },
                { label: "Just Transition", color: "#166534" },
                { label: "Trust & Alignment", color: "#2dd4bf" },
              ].map((item, i) => (
                <div key={item.label} className="flex items-center gap-2">
                  {i > 0 && <span className="text-gold/40 text-lg">⟳</span>}
                  <span
                    className="px-4 py-2 rounded-full text-xs font-bold tracking-wide"
                    style={{ background: `${item.color}12`, color: item.color, border: `1px solid ${item.color}30` }}
                  >
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
            <p className="mt-5 text-xs text-muted-foreground">Compounding symbiotic value — not trade-offs</p>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}