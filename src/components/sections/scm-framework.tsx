"use client";

import { motion } from "framer-motion";
import { FadeIn } from "@/components/ui/fade-in";
import { SectionHeader } from "@/components/ui/section-header";
import { SCMDiagram } from "@/components/diagrams/scm-diagram";

export function SCMFrameworkSection() {
  return (
    <section id="framework" className="section-padding relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_50%,rgba(15,118,110,0.06)_0%,transparent_60%)]" />
      <div className="absolute top-0 inset-x-0 consulting-divider" />

      <div className="relative mx-auto max-w-7xl">
        <SectionHeader
          label="Proprietary Framework"
          title="The Symbiotic Catalyst Model"
          subtitle="Purpose-built strategic architecture — not a repackaged ESG checklist. Talent Solutions activate three reinforcing symbiotic loops, amplified by global scaling enablers."
        />

        <FadeIn delay={0.1}>
          <SCMDiagram />
        </FadeIn>

        <FadeIn delay={0.3} className="mt-16">
          <motion.div
            className="relative premium-card p-10 md:p-12 text-center overflow-hidden"
            whileInView={{ opacity: 1 }}
            initial={{ opacity: 0 }}
            viewport={{ once: true }}
          >
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent" />
            <p className="font-serif text-2xl md:text-3xl lg:text-4xl font-normal text-sand leading-snug text-balance max-w-3xl mx-auto">
              &ldquo;Talent is not a cost center in ESG — it is the{" "}
              <span className="gradient-text italic">catalyst</span> that makes E, S, and G{" "}
              <span className="gradient-text-gold">reinforce each other</span>.&rdquo;
            </p>
            <p className="mt-5 text-xs text-muted-foreground tracking-[0.2em] uppercase">
              Symbiotic Catalyst Model · Core Principle
            </p>
          </motion.div>
        </FadeIn>
      </div>
    </section>
  );
}