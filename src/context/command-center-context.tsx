"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
  type ReactNode,
} from "react";
import {
  DEFAULT_SLIDERS,
  PRESET_SCENARIOS,
  runSimulation,
  generateLiveMetrics,
  type StrategySliders,
  type SimulationOutput,
} from "@/lib/engine/simulator";
import { TERMINAL_SEED, TERMINAL_POOL, type TerminalEvent } from "@/lib/data/terminal-events";
import { NAV_ITEMS } from "@/lib/data/content";

type ScenarioKey = "baseline" | "scm" | "aggressive" | "custom";

interface CommandCenterState {
  sliders: StrategySliders;
  setSlider: (key: keyof StrategySliders, value: number) => void;
  applyScenario: (key: ScenarioKey) => void;
  activeScenario: ScenarioKey;
  simulation: SimulationOutput;
  liveMetrics: ReturnType<typeof generateLiveMetrics>;
  terminalEvents: TerminalEvent[];
  presentationMode: boolean;
  setPresentationMode: (v: boolean) => void;
  commandPaletteOpen: boolean;
  setCommandPaletteOpen: (v: boolean) => void;
  hudVisible: boolean;
  setHudVisible: (v: boolean) => void;
  activePanel: string;
  setActivePanel: (v: string) => void;
  compareMode: boolean;
  setCompareMode: (v: boolean) => void;
  scenarioSims: Record<"baseline" | "scm" | "aggressive", SimulationOutput>;
  presentationSlide: number;
  setPresentationSlide: (v: number) => void;
  presentationSections: { id: string; label: string }[];
}

const CommandCenterContext = createContext<CommandCenterState | null>(null);

export function CommandCenterProvider({ children }: { children: ReactNode }) {
  const [sliders, setSliders] = useState<StrategySliders>(DEFAULT_SLIDERS);
  const [activeScenario, setActiveScenario] = useState<ScenarioKey>("custom");
  const [tick, setTick] = useState(0);
  const [terminalEvents, setTerminalEvents] = useState<TerminalEvent[]>(TERMINAL_SEED);
  const [presentationMode, setPresentationMode] = useState(false);
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);
  const [hudVisible, setHudVisible] = useState(true);
  const [activePanel, setActivePanel] = useState("overview");
  const [compareMode, setCompareMode] = useState(false);
  const [presentationSlide, setPresentationSlide] = useState(0);

  const presentationSections: { id: string; label: string }[] = [
    { id: "hero", label: "Hero" },
    ...NAV_ITEMS.map((item) => ({ id: item.id, label: item.label })),
  ];

  const simulation = useMemo(() => runSimulation(sliders), [sliders]);
  const liveMetrics = useMemo(() => generateLiveMetrics(sliders, tick), [sliders, tick]);

  const scenarioSims = useMemo(
    () => ({
      baseline: runSimulation(PRESET_SCENARIOS.baseline.sliders),
      scm: runSimulation(PRESET_SCENARIOS.scm.sliders),
      aggressive: runSimulation(PRESET_SCENARIOS.aggressive.sliders),
    }),
    []
  );

  const setSlider = useCallback((key: keyof StrategySliders, value: number) => {
    setSliders((prev) => ({ ...prev, [key]: value }));
    setActiveScenario("custom");
  }, []);

  const applyScenario = useCallback((key: ScenarioKey) => {
    if (key === "custom") return;
    setSliders(PRESET_SCENARIOS[key].sliders);
    setActiveScenario(key);
  }, []);

  // Live tick
  useEffect(() => {
    const interval = setInterval(() => setTick((t) => t + 1), 2000);
    return () => clearInterval(interval);
  }, []);

  // Terminal feed
  useEffect(() => {
    const interval = setInterval(() => {
      const pool = TERMINAL_POOL[Math.floor(Math.random() * TERMINAL_POOL.length)];
      const now = new Date();
      const ts = now.toTimeString().slice(0, 8);
      setTerminalEvents((prev) => [
        { ...pool, id: `${Date.now()}`, timestamp: ts },
        ...prev.slice(0, 49),
      ]);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  // Keyboard shortcuts
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setCommandPaletteOpen((o) => !o);
      }
      if (e.key === "Escape") {
        setCommandPaletteOpen(false);
        if (presentationMode) setPresentationMode(false);
      }
      if (presentationMode) {
        if (e.key === "ArrowRight" || e.key === " ") {
          e.preventDefault();
          setPresentationSlide((s) => Math.min(s + 1, presentationSections.length - 1));
        }
        if (e.key === "ArrowLeft") {
          e.preventDefault();
          setPresentationSlide((s) => Math.max(s - 1, 0));
        }
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [presentationMode, presentationSections.length]);

  return (
    <CommandCenterContext.Provider
      value={{
        sliders,
        setSlider,
        applyScenario,
        activeScenario,
        simulation,
        liveMetrics,
        terminalEvents,
        presentationMode,
        setPresentationMode,
        commandPaletteOpen,
        setCommandPaletteOpen,
        hudVisible,
        setHudVisible,
        activePanel,
        setActivePanel,
        compareMode,
        setCompareMode,
        scenarioSims,
        presentationSlide,
        setPresentationSlide,
        presentationSections,
      }}
    >
      {children}
    </CommandCenterContext.Provider>
  );
}

export function useCommandCenter() {
  const ctx = useContext(CommandCenterContext);
  if (!ctx) throw new Error("useCommandCenter must be used within CommandCenterProvider");
  return ctx;
}