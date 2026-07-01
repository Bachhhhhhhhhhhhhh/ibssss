export type RiskLevel = "low" | "medium" | "high";
export type RiskCategory = "regulatory" | "market" | "operational" | "reputational" | "technology";

export interface RiskItem {
  id: string;
  name: string;
  category: RiskCategory;
  likelihood: RiskLevel;
  impact: RiskLevel;
  score: number;
  description: string;
  mitigation: string;
  mitigationSteps: string[];
  residualRisk: RiskLevel;
  owner: string;
}

export interface StrategicEnabler {
  id: string;
  title: string;
  subtitle: string;
  icon: "bridge" | "talent" | "governance" | "digital" | "partnership";
  strength: number;
  description: string;
  proofPoints: string[];
  reinforces: string[];
}

export interface CompetitiveMoat {
  id: string;
  title: string;
  engmaScore: number;
  industryAvg: number;
  description: string;
  evidence: string;
}

export interface WinPillar {
  label: string;
  weight: number;
  score: number;
  color: string;
}

export const RISK_ITEMS: RiskItem[] = [
  {
    id: "reg-frag",
    name: "Regulatory Fragmentation",
    category: "regulatory",
    likelihood: "high", impact: "medium", score: 12,
    description: "Diverging ESG disclosure requirements across EU CSRD, China mandates, and ISSB create compliance complexity for global HR-ESG integration.",
    mitigation: "Unified Symbiosis Reporting Architecture spanning all jurisdictions",
    mitigationSteps: ["ISSB-aligned base report", "EU CSRD module overlay", "China ESG disclosure mapping", "Single data lake via Digital Platform"],
    residualRisk: "low",
    owner: "Governance Loop",
  },
  {
    id: "talent-comp",
    name: "Green Talent Competition",
    category: "market",
    likelihood: "high", impact: "high", score: 18,
    description: "Big 4 consultancies and tech firms aggressively entering green talent markets, threatening Engma's first-mover positioning.",
    mitigation: "Green Talent Academy + Client Certification Lock-in",
    mitigationSteps: ["50K worker upskilling target", "Regenerative Workspace Certification", "Client-exclusive talent pipelines", "SHRM standards integration"],
    residualRisk: "medium",
    owner: "Just Transition Loop",
  },
  {
    id: "greenwash",
    name: "Greenwashing Perception",
    category: "reputational",
    likelihood: "medium", impact: "high", score: 12,
    description: "ESG skepticism in Western markets may undermine credibility of China-origin sustainability claims without rigorous verification.",
    mitigation: "SBTi Validation + Biodiversity Indicators + Third-Party Audit",
    mitigationSteps: ["SBTi-validated targets (May 2025)", "Firefly ecological indicators", "ISO 30415 reporting", "Annual third-party assurance"],
    residualRisk: "low",
    owner: "Trust & Alignment Loop",
  },
  {
    id: "ew-friction",
    name: "East-West Cultural Friction",
    category: "operational",
    likelihood: "medium", impact: "medium", score: 9,
    description: "Translating symbiosis philosophy across cultural contexts risks misalignment between Chinese operational practices and Western governance expectations.",
    mitigation: "Bilingual Governance Index + Local Partnership Architecture",
    mitigationSteps: ["East-West Bridge Capability team", "Bilingual ESG reports", "Local partnership nodes in London, Singapore", "CSR 3.0 co-creation model"],
    residualRisk: "low",
    owner: "East-West Enabler",
  },
  {
    id: "tech-risk",
    name: "Technology Platform Risk",
    category: "technology",
    likelihood: "low", impact: "medium", score: 6,
    description: "Digital Symbiosis Platform development may face delays, integration challenges, or scalability issues across global operations.",
    mitigation: "Phased MVP on EIS Cloud + Incremental Rollout",
    mitigationSteps: ["EIS Intelligent Cloud foundation", "Huigui live metrics MVP", "Pilot with 3 offices", "API-first architecture"],
    residualRisk: "low",
    owner: "Digital Enabler",
  },
  {
    id: "supplier",
    name: "Supplier Non-Compliance",
    category: "operational",
    likelihood: "medium", impact: "high", score: 12,
    description: "Scope 3 emissions depend on supplier SBTi adoption — non-compliant suppliers threaten net-zero pathway credibility.",
    mitigation: "SBTi Supplier Cascade with Tiered Engagement",
    mitigationSteps: ["80% SBTi target by 2030", "Tiered supplier engagement program", "Alternative sourcing protocols", "Supplier symbiosis scorecard"],
    residualRisk: "medium",
    owner: "Governance Loop",
  },
];

export const STRATEGIC_ENABLERS: StrategicEnabler[] = [
  {
    id: "ew-bridge",
    title: "East-West Bridge Capability",
    subtitle: "IBSS Core Differentiator",
    icon: "bridge",
    strength: 92,
    description: "Bidirectional translation between China's operational symbiosis excellence and Western ESG governance frameworks — the defining competitive moat no pure-play HR firm can replicate.",
    proofPoints: ["Syria humanitarian reach", "EU CSRD + ISSB bilingual reporting", "London-Singapore-Beijing corridor", "Minqin to global narrative"],
    reinforces: ["Trust & Alignment Loop", "Partnership Architecture", "Regulatory risk mitigation"],
  },
  {
    id: "talent-catalyst",
    title: "Talent-as-Catalyst Positioning",
    subtitle: "SCM Core Engine",
    icon: "talent",
    strength: 88,
    description: "Engma's HR delivery embeds ESG into every client engagement — impact is inseparable from service, not a bolt-on CSR program.",
    proofPoints: ["ISO 30415 framework", "Green Talent Academy", "50K placement target", "EIS Intelligent Cloud"],
    reinforces: ["Just Transition Loop", "Green talent competition defense", "ESG revenue premium"],
  },
  {
    id: "proven-foundation",
    title: "Proven China Foundation",
    subtitle: "Credibility Anchor",
    icon: "governance",
    strength: 95,
    description: "Huigui, SBTi validation, CSR 3.0, and firefly biodiversity programs provide verified proof points that anchor global credibility.",
    proofPoints: ["Huigui 15%/20% metrics", "SBTi May 2025", "CSR 3.0 ecosystem", "Firefly reintroduction"],
    reinforces: ["Regenerative Workspace Loop", "Greenwashing defense", "Scenario baseline advantage"],
  },
  {
    id: "digital-platform",
    title: "Digital Symbiosis Platform",
    subtitle: "Scalability Engine",
    icon: "digital",
    strength: 78,
    description: "Unified infrastructure making symbiosis measurable, client-facing, and globally scalable through real-time ESG intelligence.",
    proofPoints: ["EIS Cloud expansion", "Symbiosis Index dashboard", "AI talent matching", "Client impact portals"],
    reinforces: ["All three loops", "Technology risk mitigation", "Data-driven governance"],
  },
  {
    id: "partnership-net",
    title: "Partnership Architecture",
    subtitle: "Amplification Network",
    icon: "partnership",
    strength: 82,
    description: "Structured alliance with SBTi, WEC, SHRM, and community partners multiplies impact beyond direct operations.",
    proofPoints: ["SBTi commitment", "WEC membership", "SHRM standards", "Minqin + Qiandongnan partners"],
    reinforces: ["Governance Loop", "Global network scaling", "Policy influence"],
  },
];

export const COMPETITIVE_MOATS: CompetitiveMoat[] = [
  { id: "talent", title: "Talent-Native ESG Integration", engmaScore: 92, industryAvg: 45, description: "ESG embedded in core HR delivery", evidence: "ISO 30415 + client-facing certification" },
  { id: "china", title: "Verified China ESG Track Record", engmaScore: 95, industryAvg: 38, description: "Proven operational symbiosis at scale", evidence: "Huigui + SBTi + CSR 3.0" },
  { id: "bridge", title: "East-West Bridge Positioning", engmaScore: 88, industryAvg: 22, description: "Bidirectional ESG translation capability", evidence: "London + Singapore + Beijing corridor" },
  { id: "philosophy", title: "Coherent Symbiosis Philosophy", engmaScore: 90, industryAvg: 35, description: "Unified worldview, not bolt-on ESG", evidence: "SCM proprietary framework" },
  { id: "data", title: "Measurable Impact Infrastructure", engmaScore: 78, industryAvg: 41, description: "Real-time symbiosis intelligence", evidence: "Digital Platform + Command Center" },
];

export const WIN_PILLARS: WinPillar[] = [
  { label: "Strategic Fit", weight: 25, score: 94, color: "#2dd4bf" },
  { label: "Proof Points", weight: 25, score: 96, color: "#0F766E" },
  { label: "Scalability", weight: 20, score: 82, color: "#c9a962" },
  { label: "Differentiation", weight: 20, score: 91, color: "#4ade80" },
  { label: "Feasibility", weight: 10, score: 85, color: "#8b9a9e" },
];

export function getOverallWinScore() {
  return Math.round(WIN_PILLARS.reduce((s, p) => s + (p.score * p.weight) / 100, 0) * 10) / 10;
}