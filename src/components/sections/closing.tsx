"use client";

import { motion } from "framer-motion";
import { ArrowUp, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { scrollToSection } from "@/lib/utils";
import { AuroraBackground } from "@/components/visuals/aurora-background";
import { ParticleField } from "@/components/visuals/particle-field";

export function ClosingSection() {
  return (
    <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden section-padding">
      <AuroraBackground />
      <ParticleField />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-transparent" />

      <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
        >
          <div className="section-label mb-8 mx-auto">2030 Vision</div>

          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-normal text-sand leading-[1.08] text-balance mb-8">
            Turn Talent into the{" "}
            <span className="shimmer-text italic">Engine</span> of{" "}
            <span className="gradient-text-gold">Global Symbiosis</span>
          </h2>

          <p className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto mb-4 text-balance">
            By adopting the Symbiotic Catalyst Model, Engma turns its core talent business
            into the engine of global symbiosis — delivering measurable shared value for
            business, society, and the planet.
          </p>

          <p className="text-sm text-muted-foreground/60 max-w-lg mx-auto mb-12">
            Huigui · SBTi · CSR 3.0 · 2026–2030
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" onClick={() => scrollToSection("framework")} className="group">
              Revisit the Framework
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button variant="ghost" size="lg" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="gap-2">
              <ArrowUp className="h-4 w-4" />
              Back to Top
            </Button>
          </div>
        </motion.div>

        <motion.footer
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-24 pt-8 border-t border-white/[0.05]"
        >
          <p className="text-xs text-muted-foreground/40 tracking-wide">
            Symbiotic Catalyst 2030 · Strategic Proposal for Engma Group
          </p>
          <p className="text-[10px] text-muted-foreground/25 mt-1.5 tracking-[0.15em] uppercase">
            2026 IBSS Bridging East and West · Business Case Competition
          </p>
        </motion.footer>
      </div>
    </section>
  );
}