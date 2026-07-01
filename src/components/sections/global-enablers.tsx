"use client";

import { motion } from "framer-motion";
import { Globe2, Cpu, Handshake, ArrowUpRight } from "lucide-react";
import { SectionHeader } from "@/components/ui/section-header";
import { FadeIn } from "@/components/ui/fade-in";
import { ENABLERS } from "@/lib/data/content";

const ICONS = { "east-west": Globe2, digital: Cpu, partnership: Handshake } as const;

export function GlobalEnablersSection() {
  return (
    <section id="enablers" className="section-padding relative">
      <div className="relative mx-auto max-w-7xl">
        <SectionHeader
          label="Global Scaling"
          title="Three Global Enablers"
          subtitle="Infrastructure that amplifies symbiotic loops globally — with East-West Bridge as Engma's defining competitive advantage."
        />

        <div className="bento-grid">
          {ENABLERS.map((enabler, i) => {
            const Icon = ICONS[enabler.id as keyof typeof ICONS];
            const isEW = enabler.id === "east-west";
            return (
              <FadeIn
                key={enabler.id}
                delay={i * 0.1}
                className={isEW ? "col-span-12 lg:col-span-7" : "col-span-12 lg:col-span-5"}
              >
                <motion.div
                  className={`premium-card p-8 h-full group ${isEW ? "border-gold/20" : ""}`}
                  whileHover={{ y: -3 }}
                  transition={{ duration: 0.3 }}
                >
                  {isEW && (
                    <div className="inline-flex items-center gap-2 text-[9px] font-bold uppercase tracking-[0.2em] text-gold bg-gold/10 border border-gold/20 px-3 py-1 rounded-full mb-5">
                      <Globe2 className="h-3 w-3" />
                      IBSS Core Advantage
                    </div>
                  )}

                  <div className="flex items-start justify-between mb-5">
                    <div className="p-3 rounded-2xl bg-white/[0.04] border border-white/[0.08] group-hover:border-teal/25 transition-colors">
                      <Icon className="h-5 w-5 text-teal-light" />
                    </div>
                    <ArrowUpRight className="h-4 w-4 text-muted-foreground/30 group-hover:text-teal-light transition-colors" />
                  </div>

                  <h3 className="font-serif text-2xl text-sand mb-2">{enabler.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-6">{enabler.description}</p>

                  <div className="space-y-2.5 pt-5 border-t border-white/[0.05]">
                    {enabler.examples.map((ex) => (
                      <div key={ex} className="flex items-start gap-2">
                        <span className="mt-2 h-1 w-1 rounded-full bg-teal-light shrink-0" />
                        <p className="text-xs text-sand/65 leading-relaxed">{ex}</p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </FadeIn>
            );
          })}

          {/* East-West highlight banner */}
          <FadeIn delay={0.35} className="col-span-12">
            <div className="premium-card p-8 md:p-10 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-teal/5 via-gold/5 to-forest/5" />
              <div className="absolute top-0 right-0 text-[12rem] font-serif text-white/[0.02] leading-none pointer-events-none select-none">
                東西
              </div>
              <div className="relative flex flex-col md:flex-row items-start md:items-center gap-8">
                <div className="shrink-0">
                  <p className="text-5xl font-serif text-gold/80">東西</p>
                  <p className="text-[10px] text-muted-foreground tracking-[0.3em] uppercase mt-1">East · West</p>
                </div>
                <div>
                  <h4 className="font-serif text-xl text-sand mb-3">The Bridge No Competitor Can Replicate</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed max-w-2xl">
                    Engma operates where East meets West — translating China&apos;s operational symbiosis
                    into Western ESG frameworks, and bringing global governance standards to APAC clients.
                    From Minqin to Syria, this bidirectional bridge is embedded in talent delivery, CSR 3.0,
                    and humanitarian reach.
                  </p>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}