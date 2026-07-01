"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Command, Play, LayoutDashboard } from "lucide-react";
import { NAV_ITEMS } from "@/lib/data/content";
import { cn, scrollToSection } from "@/lib/utils";
import { useCommandCenter } from "@/context/command-center-context";

export function Navbar() {
  const { setCommandPaletteOpen, setPresentationMode } = useCommandCenter();
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60);
      for (const id of [...NAV_ITEMS.map((i) => i.id)].reverse()) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= 140) {
          setActiveSection(id);
          break;
        }
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNav = (id: string) => {
    scrollToSection(id);
    setMobileOpen(false);
  };

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
        className={cn(
          "fixed top-0 left-0 right-0 z-40 transition-all duration-500",
          scrolled
            ? "bg-background/70 backdrop-blur-2xl border-b border-white/[0.06] shadow-2xl shadow-black/40"
            : "bg-transparent"
        )}
      >
        <div
          className={cn(
            "mx-auto flex max-w-7xl items-center justify-between px-6 lg:px-8 transition-all duration-500",
            scrolled ? "h-14" : "h-18 py-4"
          )}
        >
          <button onClick={() => scrollToSection("hero")} className="flex items-center gap-3 group">
            <div className="relative flex h-9 w-9 items-center justify-center">
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-teal/30 to-forest/20 group-hover:from-teal/50 transition-all duration-300" />
              <div className="absolute inset-0 rounded-full border border-teal/30 group-hover:border-teal-light/50 transition-colors" />
              <span className="relative text-[10px] font-black text-teal-light tracking-tighter">SC</span>
            </div>
            <div className="hidden sm:block text-left">
              <p className="text-sm font-semibold text-sand leading-none tracking-tight">
                Symbiotic Catalyst
              </p>
              <p className="text-[9px] text-gold/70 mt-0.5 tracking-[0.15em] uppercase">
                Engma · 2030
              </p>
            </div>
          </button>

          <nav className="hidden lg:flex items-center gap-0.5 p-1 rounded-full bg-white/[0.03] border border-white/[0.06] backdrop-blur-sm">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNav(item.id)}
                className={cn(
                  "relative px-4 py-1.5 rounded-full text-[11px] font-semibold tracking-wide transition-all duration-300",
                  activeSection === item.id
                    ? "text-sand"
                    : "text-muted-foreground hover:text-sand/80"
                )}
              >
                {activeSection === item.id && (
                  <motion.div
                    layoutId="nav-pill"
                    className="absolute inset-0 bg-teal/20 border border-teal/25 rounded-full"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative">{item.label}</span>
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <button
              onClick={() => scrollToSection("command")}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-teal/10 border border-teal/20 text-[10px] font-bold uppercase tracking-wider text-teal-light hover:bg-teal/20 transition-all"
            >
              <LayoutDashboard className="h-3 w-3" />
              CMD
            </button>
            <button
              onClick={() => setCommandPaletteOpen(true)}
              className="hidden md:flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-white/8 text-muted-foreground hover:text-sand hover:border-white/15 transition-all"
              aria-label="Command palette"
            >
              <Command className="h-3.5 w-3.5" />
              <kbd className="text-[8px]">⌘K</kbd>
            </button>
            <button
              onClick={() => setPresentationMode(true)}
              className="hidden md:flex p-2 rounded-lg text-muted-foreground hover:text-sand hover:bg-white/8 transition-all"
              aria-label="Presentation mode"
            >
              <Play className="h-3.5 w-3.5" />
            </button>
            <button
              className="lg:hidden p-2.5 rounded-xl text-sand hover:bg-white/8 border border-transparent hover:border-white/10 transition-all"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Side progress — desktop */}
      <div className="fixed right-5 top-1/2 -translate-y-1/2 z-30 hidden xl:flex flex-col items-end gap-3">
        {NAV_ITEMS.map((item, i) => (
          <button
            key={item.id}
            onClick={() => handleNav(item.id)}
            className="group flex items-center gap-3"
            aria-label={item.label}
          >
            <span
              className={cn(
                "text-[9px] font-bold uppercase tracking-[0.15em] transition-all duration-300",
                activeSection === item.id
                  ? "opacity-100 text-teal-light"
                  : "opacity-0 group-hover:opacity-60 text-muted-foreground"
              )}
            >
              {item.label}
            </span>
            <div className="relative flex items-center justify-center w-3 h-3">
              <div
                className={cn(
                  "rounded-full transition-all duration-500",
                  activeSection === item.id
                    ? "w-3 h-3 bg-teal-light shadow-lg shadow-teal/40"
                    : "w-1.5 h-1.5 bg-white/20 group-hover:bg-white/40 group-hover:w-2 group-hover:h-2"
                )}
              />
            </div>
          </button>
        ))}
        <div className="w-px h-8 bg-gradient-to-b from-teal/30 to-transparent mt-1" />
        <span className="text-[8px] text-muted-foreground/40 tracking-widest uppercase" style={{ writingMode: "vertical-rl" }}>
          2030
        </span>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -20, filter: "blur(8px)" }}
            className="fixed inset-x-4 top-[4.5rem] z-30 premium-card p-2 lg:hidden"
          >
            <nav className="flex flex-col">
              {NAV_ITEMS.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNav(item.id)}
                  className={cn(
                    "px-5 py-3.5 rounded-xl text-sm font-medium text-left transition-all",
                    activeSection === item.id
                      ? "bg-teal/15 text-teal-light"
                      : "text-muted-foreground hover:bg-white/5 hover:text-sand"
                  )}
                >
                  {item.label}
                </button>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}