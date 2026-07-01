"use client";

import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCommandCenter } from "@/context/command-center-context";
import { NAV_ITEMS } from "@/lib/data/content";
import { PRESET_SCENARIOS } from "@/lib/engine/simulator";
import { scrollToSection } from "@/lib/utils";
import {
  Search, Navigation, Play, Sliders, GitCompare, Eye, Terminal,
  LayoutDashboard, X,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Command {
  id: string;
  label: string;
  description: string;
  icon: React.ElementType;
  group: string;
  action: () => void;
}

export function CommandPalette() {
  const {
    commandPaletteOpen,
    setCommandPaletteOpen,
    setPresentationMode,
    applyScenario,
    setCompareMode,
    setHudVisible,
    setActivePanel,
  } = useCommandCenter();

  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(0);

  const commands: Command[] = useMemo(() => [
    ...NAV_ITEMS.map((item) => ({
      id: `nav-${item.id}`,
      label: `Go to ${item.label}`,
      description: `Navigate to ${item.label} section`,
      icon: Navigation,
      group: "Navigation",
      action: () => { scrollToSection(item.id); setCommandPaletteOpen(false); },
    })),
    {
      id: "nav-command",
      label: "Go to Command Center",
      description: "Open the SCM supercomputer dashboard",
      icon: LayoutDashboard,
      group: "Navigation",
      action: () => { scrollToSection("command"); setCommandPaletteOpen(false); },
    },
    {
      id: "present",
      label: "Start Presentation Mode",
      description: "Fullscreen pitch mode with keyboard navigation",
      icon: Play,
      group: "Actions",
      action: () => { setPresentationMode(true); setCommandPaletteOpen(false); },
    },
    {
      id: "scenario-scm",
      label: "Load SCM Scenario",
      description: PRESET_SCENARIOS.scm.description,
      icon: Sliders,
      group: "Simulator",
      action: () => { applyScenario("scm"); scrollToSection("command"); setCommandPaletteOpen(false); },
    },
    {
      id: "scenario-aggressive",
      label: "Load Global Leadership Scenario",
      description: PRESET_SCENARIOS.aggressive.description,
      icon: Sliders,
      group: "Simulator",
      action: () => { applyScenario("aggressive"); scrollToSection("command"); setCommandPaletteOpen(false); },
    },
    {
      id: "compare",
      label: "Toggle Scenario Comparison",
      description: "Compare Baseline vs SCM vs Aggressive",
      icon: GitCompare,
      group: "Simulator",
      action: () => { setCompareMode(true); scrollToSection("command"); setCommandPaletteOpen(false); },
    },
    {
      id: "panel-terminal",
      label: "Focus: Live Terminal",
      description: "ESG intelligence event stream",
      icon: Terminal,
      group: "Panels",
      action: () => { setActivePanel("terminal"); scrollToSection("command"); setCommandPaletteOpen(false); },
    },
    {
      id: "hud",
      label: "Toggle System HUD",
      description: "Show/hide floating metrics overlay",
      icon: Eye,
      group: "System",
      action: () => { setHudVisible(true); setCommandPaletteOpen(false); },
    },
  ], [setCommandPaletteOpen, setPresentationMode, applyScenario, setCompareMode, setHudVisible, setActivePanel]);

  const filtered = commands.filter(
    (c) =>
      c.label.toLowerCase().includes(query.toLowerCase()) ||
      c.description.toLowerCase().includes(query.toLowerCase()) ||
      c.group.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => { setSelected(0); }, [query]);
  useEffect(() => { if (!commandPaletteOpen) setQuery(""); }, [commandPaletteOpen]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") { e.preventDefault(); setSelected((s) => Math.min(s + 1, filtered.length - 1)); }
    if (e.key === "ArrowUp") { e.preventDefault(); setSelected((s) => Math.max(s - 1, 0)); }
    if (e.key === "Enter" && filtered[selected]) { filtered[selected].action(); }
  };

  const groups = [...new Set(filtered.map((c) => c.group))];

  return (
    <AnimatePresence>
      {commandPaletteOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh] px-4"
        >
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setCommandPaletteOpen(false)} />
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className="relative w-full max-w-lg command-panel overflow-hidden shadow-2xl shadow-teal/10"
          >
            <div className="flex items-center gap-3 px-4 py-3 border-b border-white/8">
              <Search className="h-4 w-4 text-muted-foreground" />
              <input
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type a command or search..."
                className="flex-1 bg-transparent text-sm text-sand placeholder:text-muted-foreground/50 outline-none"
              />
              <kbd className="text-[9px] text-muted-foreground/40 px-1.5 py-0.5 rounded border border-white/8">ESC</kbd>
              <button onClick={() => setCommandPaletteOpen(false)} className="text-muted-foreground hover:text-sand">
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="max-h-80 overflow-y-auto p-2">
              {groups.map((group) => (
                <div key={group}>
                  <p className="text-[8px] font-bold uppercase tracking-[0.2em] text-muted-foreground/50 px-3 py-2">{group}</p>
                  {filtered.filter((c) => c.group === group).map((cmd) => {
                    const globalIdx = filtered.indexOf(cmd);
                    const Icon = cmd.icon;
                    return (
                      <button
                        key={cmd.id}
                        onClick={cmd.action}
                        onMouseEnter={() => setSelected(globalIdx)}
                        className={cn(
                          "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-colors",
                          selected === globalIdx ? "bg-teal/12 text-sand" : "text-sand/70 hover:bg-white/[0.04]"
                        )}
                      >
                        <Icon className="h-4 w-4 shrink-0 text-teal-light" />
                        <div>
                          <p className="text-sm font-medium">{cmd.label}</p>
                          <p className="text-[10px] text-muted-foreground">{cmd.description}</p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              ))}
              {filtered.length === 0 && (
                <p className="text-center text-sm text-muted-foreground py-8">No commands found</p>
              )}
            </div>

            <div className="px-4 py-2 border-t border-white/5 flex items-center gap-4 text-[8px] text-muted-foreground/40">
              <span>↑↓ Navigate</span>
              <span>↵ Select</span>
              <span>⌘K Toggle</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}