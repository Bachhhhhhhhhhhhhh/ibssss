"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, Zap, Flag } from "lucide-react";
import { SectionHeader } from "@/components/ui/section-header";
import { FadeIn } from "@/components/ui/fade-in";
import { Button } from "@/components/ui/button";
import { Dialog } from "@/components/ui/dialog";
import { ROADMAP_PHASES } from "@/lib/data/content";
import { cn } from "@/lib/utils";

export function RoadmapSection() {
  const [activePhase, setActivePhase] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);

  const phase = ROADMAP_PHASES[activePhase];

  return (
    <section id="roadmap" className="section-padding relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_rgba(15,118,110,0.06)_0%,_transparent_60%)] pointer-events-none" />

      <div className="relative mx-auto max-w-7xl">
        <SectionHeader
          label="Implementation"
          title="2026–2030 Roadmap"
          subtitle="A phased, evidence-based path from internal integration to global ESG leadership — with quick wins at every stage to maintain momentum and stakeholder confidence."
        />

        {/* Timeline selector */}
        <FadeIn className="mb-12">
          <div className="relative">
            {/* Timeline track */}
            <div className="absolute top-1/2 left-0 right-0 h-px bg-white/10 -translate-y-1/2 hidden md:block" />
            <motion.div
              className="absolute top-1/2 left-0 h-px bg-teal -translate-y-1/2 hidden md:block"
              animate={{ width: `${(activePhase / (ROADMAP_PHASES.length - 1)) * 100}%` }}
              transition={{ duration: 0.5 }}
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 relative">
              {ROADMAP_PHASES.map((p, i) => (
                <button
                  key={p.id}
                  onClick={() => setActivePhase(i)}
                  className={cn(
                    "glass-card p-5 text-left transition-all duration-300",
                    activePhase === i
                      ? "border-teal/40 shadow-lg shadow-teal/10"
                      : "hover:border-white/20"
                  )}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <div
                      className={cn(
                        "h-3 w-3 rounded-full border-2 transition-colors",
                        activePhase === i
                          ? "bg-teal border-teal"
                          : "bg-transparent border-white/30"
                      )}
                    />
                    <span className="text-xs font-semibold text-teal-light">{p.period}</span>
                  </div>
                  <p className="font-serif text-lg font-semibold text-sand">{p.title}</p>
                  <p className="text-xs text-muted-foreground mt-1">{p.theme}</p>
                </button>
              ))}
            </div>
          </div>
        </FadeIn>

        {/* Phase detail */}
        <AnimatePresence mode="wait">
          <motion.div
            key={phase.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.35 }}
            className="grid md:grid-cols-3 gap-6"
          >
            {/* Key initiatives */}
            <div className="glass-card p-6">
              <div className="flex items-center gap-2 mb-4">
                <Calendar className="h-4 w-4 text-teal-light" />
                <h4 className="text-sm font-semibold text-sand">Key Initiatives</h4>
              </div>
              <ul className="space-y-3">
                {phase.initiatives.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-teal shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Quick wins */}
            <div className="glass-card p-6">
              <div className="flex items-center gap-2 mb-4">
                <Zap className="h-4 w-4 text-forest-light" />
                <h4 className="text-sm font-semibold text-sand">Quick Wins</h4>
              </div>
              <ul className="space-y-3">
                {phase.quickWins.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-forest-light shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Milestones */}
            <div className="glass-card p-6">
              <div className="flex items-center gap-2 mb-4">
                <Flag className="h-4 w-4 text-teal-light" />
                <h4 className="text-sm font-semibold text-sand">Milestones</h4>
              </div>
              <ul className="space-y-4">
                {phase.milestones.map((m) => (
                  <li key={m.label} className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">{m.label}</span>
                    <span className="text-xs font-semibold text-teal-light bg-teal/10 px-2 py-0.5 rounded-full">
                      {m.date}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </AnimatePresence>

        <FadeIn delay={0.2} className="mt-8 text-center">
          <Button variant="outline" onClick={() => setModalOpen(true)}>
            View All Phase Initiatives
          </Button>
        </FadeIn>
      </div>

      {/* Full roadmap modal */}
      <Dialog open={modalOpen} onClose={() => setModalOpen(false)} className="max-w-2xl">
        <h3 className="font-serif text-xl font-semibold text-sand mb-6 pr-8">
          Complete 2026–2030 Implementation Plan
        </h3>
        <div className="space-y-6 max-h-[60vh] overflow-y-auto pr-2">
          {ROADMAP_PHASES.map((p) => (
            <div key={p.id} className="border-b border-white/5 pb-5 last:border-0">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xs font-bold text-teal-light">{p.period}</span>
                <span className="text-sm font-semibold text-sand">{p.title}</span>
                <span className="text-xs text-muted-foreground">· {p.theme}</span>
              </div>
              <div className="grid sm:grid-cols-2 gap-3">
                {p.initiatives.map((item) => (
                  <p key={item} className="text-xs text-muted-foreground flex items-start gap-1.5">
                    <span className="text-teal-light mt-0.5">›</span>
                    {item}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Dialog>
    </section>
  );
}