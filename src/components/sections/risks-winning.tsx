"use client";

import { motion } from "framer-motion";
import { Shield, Trophy } from "lucide-react";
import { SectionHeader } from "@/components/ui/section-header";
import { FadeIn } from "@/components/ui/fade-in";
import { Card, CardContent } from "@/components/ui/card";
import { RISKS, COMPETITIVE_ADVANTAGES } from "@/lib/data/content";
import { cn } from "@/lib/utils";

const LIKELIHOOD_MAP = { low: 1, medium: 2, high: 3 };
const IMPACT_MAP = { low: 1, medium: 2, high: 3 };

function getRiskColor(likelihood: string, impact: string) {
  const score = LIKELIHOOD_MAP[likelihood as keyof typeof LIKELIHOOD_MAP] *
    IMPACT_MAP[impact as keyof typeof IMPACT_MAP];
  if (score >= 6) return "bg-red-500/20 border-red-500/30 text-red-400";
  if (score >= 4) return "bg-amber-500/15 border-amber-500/25 text-amber-400";
  return "bg-teal/10 border-teal/20 text-teal-light";
}

export function RisksWinningSection() {
  return (
    <section id="risks" className="section-padding relative">
      <div className="relative mx-auto max-w-7xl">
        <SectionHeader
          label="Risk & Competitive Edge"
          title="Risks, Enablers & Why This Will Win"
          subtitle="Every ambitious strategy carries risk. SCM mitigates through proven foundations, phased rollout, and structural advantages no pure-play competitor can match."
        />

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Risk heatmap */}
          <FadeIn>
            <Card className="h-full">
              <CardContent className="p-6 pt-6">
                <div className="flex items-center gap-2 mb-6">
                  <Shield className="h-4 w-4 text-teal-light" />
                  <h3 className="font-serif text-lg font-semibold text-sand">Risk Matrix</h3>
                </div>

                {/* Matrix grid */}
                <div className="mb-6">
                  <div className="grid grid-cols-4 gap-1 text-[10px] text-muted-foreground mb-1">
                    <div />
                    <div className="text-center">Low</div>
                    <div className="text-center">Med</div>
                    <div className="text-center">High</div>
                  </div>
                  {(["high", "medium", "low"] as const).map((likelihood) => (
                    <div key={likelihood} className="grid grid-cols-4 gap-1 mb-1">
                      <div className="text-[10px] text-muted-foreground flex items-center capitalize">
                        {likelihood}
                      </div>
                      {(["low", "medium", "high"] as const).map((impact) => {
                        const risksHere = RISKS.filter(
                          (r) => r.likelihood === likelihood && r.impact === impact
                        );
                        return (
                          <div
                            key={impact}
                            className={cn(
                              "h-14 rounded-lg border flex flex-wrap items-center justify-center gap-0.5 p-1",
                              risksHere.length > 0
                                ? getRiskColor(likelihood, impact)
                                : "bg-white/2 border-white/5"
                            )}
                          >
                            {risksHere.map((r) => (
                              <span
                                key={r.name}
                                className="text-[8px] font-medium text-center leading-tight px-0.5"
                                title={r.mitigation}
                              >
                                {r.name.split(" ")[0]}
                              </span>
                            ))}
                          </div>
                        );
                      })}
                    </div>
                  ))}
                  <p className="text-[10px] text-muted-foreground mt-2 text-center">
                    Likelihood → · Impact ↓
                  </p>
                </div>

                {/* Risk list with mitigations */}
                <div className="space-y-3">
                  {RISKS.map((risk, i) => (
                    <motion.div
                      key={risk.name}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.05 }}
                      className="flex items-start gap-3"
                    >
                      <div
                        className={cn(
                          "shrink-0 mt-0.5 h-2 w-2 rounded-full",
                          risk.likelihood === "high" && risk.impact === "high"
                            ? "bg-red-400"
                            : risk.likelihood === "high" || risk.impact === "high"
                            ? "bg-amber-400"
                            : "bg-teal-light"
                        )}
                      />
                      <div>
                        <p className="text-xs font-semibold text-sand">{risk.name}</p>
                        <p className="text-[11px] text-muted-foreground mt-0.5">
                          <span className="text-teal-light">Mitigation:</span> {risk.mitigation}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </FadeIn>

          {/* Why we win */}
          <FadeIn delay={0.15}>
            <Card className="h-full border-teal/20">
              <CardContent className="p-6 pt-6">
                <div className="flex items-center gap-2 mb-6">
                  <Trophy className="h-4 w-4 text-forest-light" />
                  <h3 className="font-serif text-lg font-semibold text-sand">
                    Why SCM Wins for Engma
                  </h3>
                </div>

                <div className="space-y-5 mb-8">
                  {COMPETITIVE_ADVANTAGES.map((adv, i) => (
                    <motion.div
                      key={adv.title}
                      initial={{ opacity: 0, x: 10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                      className="group"
                    >
                      <div className="flex items-start gap-3">
                        <span className="shrink-0 flex h-6 w-6 items-center justify-center rounded-full bg-teal/15 text-xs font-bold text-teal-light border border-teal/20">
                          {i + 1}
                        </span>
                        <div>
                          <p className="text-sm font-semibold text-sand group-hover:text-teal-light transition-colors">
                            {adv.title}
                          </p>
                          <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                            {adv.description}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Business case summary */}
                <div className="p-5 rounded-xl bg-teal/8 border border-teal/20">
                  <p className="text-xs font-semibold text-teal-light uppercase tracking-wider mb-2">
                    Business Case
                  </p>
                  <p className="text-sm text-sand/80 leading-relaxed">
                    By 2030, ESG-integrated HR services will command a{" "}
                    <span className="text-sand font-semibold">25–35% premium</span> over
                    commodity talent solutions. Engma, with SCM, captures this premium while
                    reducing client churn, attracting top green talent, and building an
                    irreplicable East-West ESG brand — turning symbiosis from philosophy into
                    <span className="text-teal-light font-semibold"> measurable competitive moat</span>.
                  </p>
                </div>
              </CardContent>
            </Card>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}