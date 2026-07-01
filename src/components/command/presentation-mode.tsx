"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCommandCenter } from "@/context/command-center-context";
import { scrollToSection } from "@/lib/utils";
import { X, ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";

export function PresentationMode() {
  const {
    presentationMode,
    setPresentationMode,
    presentationSlide,
    setPresentationSlide,
    presentationSections,
    simulation,
  } = useCommandCenter();

  useEffect(() => {
    if (presentationMode) {
      const section = presentationSections[presentationSlide];
      if (section) scrollToSection(section.id);
    }
  }, [presentationMode, presentationSlide, presentationSections]);

  return (
    <AnimatePresence>
      {presentationMode && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[90] pointer-events-none"
        >
          {/* Top bar */}
          <div className="absolute top-0 inset-x-0 pointer-events-auto">
            <div className="flex items-center justify-between px-6 py-3 bg-background/90 backdrop-blur-2xl border-b border-white/8">
              <div className="flex items-center gap-3">
                <Maximize2 className="h-4 w-4 text-teal-light" />
                <span className="text-xs font-bold uppercase tracking-[0.15em] text-teal-light">
                  Presentation Mode
                </span>
                <span className="text-[10px] text-muted-foreground">
                  Symbiosis Index: <span className="text-sand font-bold">{simulation.symbiosisIndex}</span>
                </span>
              </div>

              <div className="flex items-center gap-2">
                {presentationSections.map((s, i) => (
                  <button
                    key={s.id}
                    onClick={() => setPresentationSlide(i)}
                    className={`h-1.5 rounded-full transition-all ${
                      i === presentationSlide ? "w-6 bg-teal-light" : "w-1.5 bg-white/20 hover:bg-white/40"
                    }`}
                    aria-label={s.label}
                  />
                ))}
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setPresentationSlide(Math.max(0, presentationSlide - 1))}
                  className="p-1.5 rounded-lg hover:bg-white/8 text-muted-foreground hover:text-sand"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <span className="text-[10px] text-muted-foreground tabular-nums w-16 text-center">
                  {presentationSlide + 1} / {presentationSections.length}
                </span>
                <button
                  onClick={() => setPresentationSlide(Math.min(presentationSections.length - 1, presentationSlide + 1))}
                  className="p-1.5 rounded-lg hover:bg-white/8 text-muted-foreground hover:text-sand"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setPresentationMode(false)}
                  className="p-1.5 rounded-lg hover:bg-white/8 text-muted-foreground hover:text-sand ml-2"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Bottom hint */}
          <div className="absolute bottom-4 inset-x-0 flex justify-center pointer-events-none">
            <span className="text-[9px] text-muted-foreground/30 uppercase tracking-[0.2em]">
              ← → Navigate · Space Next · ESC Exit
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}