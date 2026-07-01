export interface TerminalEvent {
  id: string;
  timestamp: string;
  level: "info" | "success" | "warn" | "system";
  source: string;
  message: string;
}

export const TERMINAL_SEED: TerminalEvent[] = [
  { id: "1", timestamp: "09:41:02", level: "system", source: "SCM-CORE", message: "Symbiotic Catalyst Model engine initialized" },
  { id: "2", timestamp: "09:41:03", level: "success", source: "SBTi", message: "Validated targets loaded — Scope 1+2 −20%, Scope 3 −30% by 2030" },
  { id: "3", timestamp: "09:41:05", level: "info", source: "HUIGUI", message: "Building telemetry: 15% energy ↓ · 20% water savings (2025 baseline)" },
  { id: "4", timestamp: "09:41:07", level: "success", source: "BIODIVERSITY", message: "Firefly indicator active — 2,000 adults + 500 larvae (Suzhou)" },
  { id: "5", timestamp: "09:41:09", level: "info", source: "TALENT", message: "Green Talent Academy pipeline: 2,400 placements/year (baseline)" },
  { id: "6", timestamp: "09:41:11", level: "warn", source: "MARKET", message: "WEF alert: 7M green talent deficit projected by 2030" },
  { id: "7", timestamp: "09:41:13", level: "info", source: "EAST-WEST", message: "Bridge capability index: EU CSRD + CN ESG alignment module ready" },
  { id: "8", timestamp: "09:41:15", level: "success", source: "CSR-3.0", message: "Philanthropy ecosystem linked to 3 client pilot programs" },
  { id: "9", timestamp: "09:41:17", level: "info", source: "MINQIN", message: "Ecological offset: RMB 6,000 Phase 1 tree-planting (Gansu)" },
  { id: "10", timestamp: "09:41:19", level: "system", source: "PLATFORM", message: "EIS Intelligent Cloud symbiosis dashboard — MVP status: STANDBY" },
];

export const TERMINAL_POOL: Omit<TerminalEvent, "id" | "timestamp">[] = [
  { level: "info", source: "HUIGUI", message: "VRV optimization cycle complete — 0.3% efficiency gain" },
  { level: "success", source: "TALENT", message: "ISO 30415 human capital report generated for Q1" },
  { level: "info", source: "SHRM", message: "Global labor standards sync — 14 frameworks mapped" },
  { level: "warn", source: "REGULATORY", message: "EU CSRD disclosure window opens — 47 client accounts flagged" },
  { level: "success", source: "LOOP-E", message: "Regenerative workspace certification: 3 pilot offices qualified" },
  { level: "info", source: "LOOP-S", message: "Disability-inclusive placement rate: +2.1% this quarter" },
  { level: "success", source: "LOOP-G", message: "Supplier SBTi adoption: 28% → target 80% by 2030" },
  { level: "system", source: "SCM-CORE", message: "Symbiotic index recalculated — all loops reinforcing" },
  { level: "info", source: "QIANDONGNAN", message: "Rural digital upskilling: 320 workers enrolled this week" },
  { level: "success", source: "WEC", message: "Policy signal received — green jobs taxonomy update aligned" },
  { level: "info", source: "PLATFORM", message: "AI green-talent matching: 89 high-confidence placements" },
  { level: "warn", source: "MARKET", message: "LinkedIn: green job postings +38% YoY — supply gap widening" },
];