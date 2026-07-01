"use client";

import { motion } from "framer-motion";
import { ArrowDown, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AnimatedCounter } from "@/components/ui/animated-counter";
import { Marquee } from "@/components/ui/marquee";
import { scrollToSection } from "@/lib/utils";
import { AuroraBackground } from "@/components/visuals/aurora-background";
import { ParticleField } from "@/components/visuals/particle-field";

const WORDS = ["Turning", "Talent", "into", "the", "Catalyst", "for", "Global", "Symbiosis"];

const HERO_METRICS = [
  { value: 15, suffix: "%", label: "Energy Reduction", sub: "Huigui 2025" },
  { value: 20, suffix: "%", label: "Water Savings", sub: "Huigui 2025" },
  { value: 2050, suffix: "", label: "Net-Zero Target", sub: "All Scopes" },
  { value: 2030, suffix: "", label: "SBTi Horizon", sub: "Validated May 2025" },
];

const MARQUEE_ITEMS = [
  "SBTi Validated",
  "Huigui Building",
  "CSR 3.0",
  "ISO 30415",
  "Firefly Reintroduction",
  "Minqin Tree Planting",
  "East-West Bridge",
  "WEC Member",
  "SHRM Partner",
  "Net-Zero 2050",
];

export function HeroSection() {
  return (
    <section id="hero" className="relative min-h-screen flex flex-col overflow-hidden">
      <AuroraBackground />
      <ParticleField />

      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background pointer-events-none" />

      {/* Main content */}
      <div className="relative z-10 flex-1 flex items-center">
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-8 py-32">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left — Copy */}
            <div className="lg:col-span-7">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="mb-8 inline-flex items-center gap-3"
              >
                <div className="h-px w-8 bg-gradient-to-r from-teal-light to-gold" />
                <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-teal-light">
                  Engma Group · IBSS 2026
                </span>
                <div className="h-px w-8 bg-gradient-to-l from-teal-light to-gold" />
              </motion.div>

              <h1 className="font-serif text-[clamp(2.5rem,6vw,5rem)] font-normal leading-[1.05] tracking-tight text-sand">
                {WORDS.map((word, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    transition={{ duration: 0.6, delay: 0.15 + i * 0.07, ease: [0.23, 1, 0.32, 1] }}
                    className={`inline-block mr-[0.3em] ${
                      word === "Catalyst" ? "gradient-text italic" : ""
                    } ${word === "Symbiosis" ? "gradient-text-gold" : ""}`}
                  >
                    {word}
                  </motion.span>
                ))}
              </h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="mt-7 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg"
              >
                The proprietary <span className="text-sand font-medium">Symbiotic Catalyst Model</span> positions
                Engma&apos;s talent solutions as the connective force linking environmental
                regeneration, social equity, and governance excellence — at global scale.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1 }}
                className="mt-10 flex flex-wrap items-center gap-4"
              >
                <Button size="lg" onClick={() => scrollToSection("framework")} className="group">
                  Explore the SCM Framework
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
                <Button variant="outline" size="lg" onClick={() => scrollToSection("imperative")}>
                  Why Now?
                </Button>
                <Button variant="gold" size="lg" onClick={() => scrollToSection("command")} className="hidden xl:flex">
                  Launch Command Center
                </Button>
              </motion.div>
            </div>

            {/* Right — Floating metrics bento */}
            <div className="lg:col-span-5 hidden lg:block">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="relative"
              >
                {/* Glow orb behind */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-64 h-64 rounded-full bg-teal/10 blur-3xl animate-pulse-glow" />
                </div>

                <div className="relative grid grid-cols-2 gap-3">
                  {HERO_METRICS.map((m, i) => (
                    <motion.div
                      key={m.label}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.7 + i * 0.12 }}
                      className={`premium-card p-5 metric-ring ${
                        i === 0 ? "col-span-2" : ""
                      }`}
                      style={{ animationDelay: `${i * 0.5}s` }}
                    >
                      <p className="text-3xl font-bold text-sand tabular-nums">
                        <AnimatedCounter value={m.value} suffix={m.suffix} duration={2.5} />
                      </p>
                      <p className="text-sm font-medium text-sand/80 mt-1">{m.label}</p>
                      <p className="text-[10px] text-muted-foreground mt-0.5 uppercase tracking-wider">{m.sub}</p>
                    </motion.div>
                  ))}
                </div>

                {/* Decorative ring */}
                <div className="absolute -inset-8 border border-teal/5 rounded-full animate-rotate-slow pointer-events-none" />
                <div className="absolute -inset-16 border border-dashed border-teal/5 rounded-full animate-rotate-slow pointer-events-none" style={{ animationDirection: "reverse", animationDuration: "90s" }} />
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom marquee + scroll */}
      <div className="relative z-10 pb-8">
        <Marquee items={MARQUEE_ITEMS} className="py-4 border-t border-white/5" />
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          onClick={() => scrollToSection("imperative")}
          className="mx-auto mt-4 flex flex-col items-center gap-2 text-muted-foreground hover:text-teal-light transition-colors"
          aria-label="Scroll down"
        >
          <span className="text-[9px] uppercase tracking-[0.3em]">Discover</span>
          <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity }}>
            <ArrowDown className="h-4 w-4" />
          </motion.div>
        </motion.button>
      </div>
    </section>
  );
}