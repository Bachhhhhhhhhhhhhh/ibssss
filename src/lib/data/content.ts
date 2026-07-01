// Strategic content for Symbiotic Catalyst Model — sourced from Engma Group case materials

export const NAV_ITEMS = [
  { id: "imperative", label: "Imperative" },
  { id: "framework", label: "SCM Model" },
  { id: "loops", label: "Three Loops" },
  { id: "enablers", label: "Enablers" },
  { id: "roadmap", label: "Roadmap" },
  { id: "impact", label: "Impact" },
  { id: "risks", label: "Why We Win" },
  { id: "command", label: "Command Center" },
] as const;

export const GAP_ANALYSIS = {
  current: [
    { label: "China ESG Leadership", value: 85, description: "Huigui, SBTi, CSR 3.0 — proven at scale domestically" },
    { label: "Global Integration", value: 42, description: "Fragmented ESG narrative across international operations" },
    { label: "Talent-ESG Linkage", value: 38, description: "Core HR capability not yet positioned as ESG catalyst" },
    { label: "East-West Bridge", value: 55, description: "Strong cultural foundation, limited systematic translation" },
  ],
  required: [
    { label: "Unified Global Model", value: 90 },
    { label: "Talent-as-Catalyst Positioning", value: 88 },
    { label: "Regulatory Alignment (EU + CN)", value: 85 },
    { label: "Measurable Shared Value", value: 92 },
  ],
};

export const MARKET_DATA = [
  { source: "LinkedIn", stat: "38%", label: "YoY growth in green job postings (2024–2026)" },
  { source: "WEF", stat: "7M", label: "Global green talent deficit projected by 2030" },
  { source: "ManpowerGroup", stat: "76%", label: "Employers report critical skills gaps in sustainability roles" },
];

export type LoopId = "regenerative" | "transition" | "governance";
export type EnablerId = "east-west" | "digital" | "partnership";

export interface SCMNode {
  id: LoopId | EnablerId | "catalyst";
  title: string;
  subtitle: string;
  description: string;
  examples: string[];
  pillar: "E" | "S" | "G" | "Catalyst" | "Enabler";
  angle: number; // degrees for diagram positioning
  radius: number; // relative radius from center
}

export const SCM_NODES: SCMNode[] = [
  {
    id: "catalyst",
    title: "Talent Solutions",
    subtitle: "The Catalyst",
    description:
      "Engma's core talent business becomes the connective tissue that activates environmental, social, and governance outcomes simultaneously — not as separate CSR programs, but as integrated symbiotic value creation.",
    examples: [
      "ISO 30415 human capital reporting framework",
      "EIS Intelligent Cloud Platform & AI+ empowerment",
      "Full-chain talent supply: selection → deployment → development → retention",
    ],
    pillar: "Catalyst",
    angle: 0,
    radius: 0,
  },
  {
    id: "regenerative",
    title: "Regenerative Workspace Loop",
    subtitle: "Environmental Symbiosis",
    description:
      "Transforms physical and digital workspaces into regenerative ecosystems where talent operations directly drive ecological restoration and circular resource flows.",
    examples: [
      "Huigui Building: 15% energy reduction, 20% water savings (2025)",
      "VRV systems, LED lighting, 200m³ rainwater tank (~1,000 tonnes/year)",
      "Firefly reintroduction — 2,000 adults + 500 larvae (July 2025)",
      "Minqin tree-planting: RMB 6,000 Phase 1 in Gansu desert region",
    ],
    pillar: "E",
    angle: -90,
    radius: 1,
  },
  {
    id: "transition",
    title: "Just Transition Talent Loop",
    subtitle: "Social Symbiosis",
    description:
      "Positions Engma as the architect of equitable workforce transitions — ensuring no worker, community, or region is left behind as economies decarbonize and digitize.",
    examples: [
      "Green skills academies aligned with client decarbonization roadmaps",
      "Disability-inclusive employment pathways",
      "Qiandongnan technology education & rural digital upskilling",
      "CSR 3.0 philanthropy ecosystem integrating profit and purpose",
    ],
    pillar: "S",
    angle: 30,
    radius: 1,
  },
  {
    id: "governance",
    title: "Trust & Alignment Governance Loop",
    subtitle: "Governance Symbiosis",
    description:
      "Builds transparent, accountable governance structures that align stakeholder interests — from SBTi-validated targets to supplier engagement and global HR standards.",
    examples: [
      "SBTi validated May 2025: Scope 1+2 −20%, Scope 3 −30% by 2030",
      "Net-zero across all scopes by 2050; 100% renewable electricity by 2030",
      "SHRM collaboration for global labor market standards",
      "WEC membership & succession planning for leadership continuity",
    ],
    pillar: "G",
    angle: 150,
    radius: 1,
  },
  {
    id: "east-west",
    title: "East-West Bridge Capability",
    subtitle: "Global Enabler",
    description:
      "Leverages Engma's unique position bridging Chinese operational excellence with Western ESG frameworks — translating symbiosis philosophy into globally legible impact narratives.",
    examples: [
      "Syria humanitarian support — care beyond borders",
      "EU CSRD alignment for European client portfolios",
      "Bilingual ESG reporting bridging CN disclosure standards & ISSB",
    ],
    pillar: "Enabler",
    angle: 0,
    radius: 1.65,
  },
  {
    id: "digital",
    title: "Digital Symbiosis Platform",
    subtitle: "Global Enabler",
    description:
      "A unified digital infrastructure connecting talent data, ESG metrics, and client impact dashboards — making symbiosis measurable, scalable, and client-facing.",
    examples: [
      "EIS Intelligent Cloud Platform expansion",
      "Real-time symbiosis index for client workspaces",
      "AI-powered green talent matching & skills gap analytics",
    ],
    pillar: "Enabler",
    angle: 120,
    radius: 1.65,
  },
  {
    id: "partnership",
    title: "Partnership Architecture",
    subtitle: "Global Enabler",
    description:
      "Structured alliance network amplifying impact beyond Engma's direct operations — from SBTi and WEC to local community partners and global HR institutions.",
    examples: [
      "SBTi commitment & supplier engagement programs",
      "WEC membership for policy influence",
      "SHRM standards integration across client services",
      "Community partners: Minqin, Qiandongnan, Charity Health Run",
    ],
    pillar: "Enabler",
    angle: 240,
    radius: 1.65,
  },
];

export const LOOPS = SCM_NODES.filter(
  (n): n is SCMNode & { id: LoopId } =>
    n.id === "regenerative" || n.id === "transition" || n.id === "governance"
);

export const ENABLERS = SCM_NODES.filter(
  (n): n is SCMNode & { id: EnablerId } =>
    n.id === "east-west" || n.id === "digital" || n.id === "partnership"
);

export const LOOP_INITIATIVES = {
  regenerative: [
    {
      title: "Huigui Symbiosis Hub Rollout",
      description: "Replicate proven 15% energy / 20% water model across 12 APAC offices by 2028",
      effect: "Scales proven environmental symbiosis from flagship to network",
    },
    {
      title: "Regenerative Workspace Certification",
      description: "Client-facing certification program linking workspace design to biodiversity & circularity metrics",
      effect: "Creates new revenue stream while embedding E in talent delivery",
    },
    {
      title: "Ecological Indicator Program",
      description: "Expand firefly-style biodiversity indicators to all major Engma facilities",
      effect: "Makes ecological health visible, measurable, and culturally resonant",
    },
  ],
  transition: [
    {
      title: "Green Talent Academy",
      description: "Structured upskilling pathways for 50,000 workers in carbon-intensive sectors by 2030",
      effect: "Directly addresses global green talent deficit — Engma's core market opportunity",
    },
    {
      title: "Inclusive Transition Protocol",
      description: "Disability-inclusive and rural-community employment frameworks for every client transition plan",
      effect: "Ensures social symbiosis is non-negotiable in all workforce transformations",
    },
    {
      title: "CSR 3.0 Client Integration",
      description: "Embed philanthropy ecosystem model into client HR strategies as co-created social value",
      effect: "Transforms CSR from cost center to competitive differentiator",
    },
  ],
  governance: [
    {
      title: "SBTi Supplier Cascade",
      description: "Extend validated targets through supplier engagement — 80% SBTi adoption across key suppliers by 2030",
      effect: "Governance loop reinforces environmental loop through supply chain accountability",
    },
    {
      title: "Symbiosis Governance Index",
      description: "Client-facing governance scorecard integrating ISO 30415, SHRM standards, and local regulations",
      effect: "Makes trust measurable and comparable across East-West operations",
    },
    {
      title: "Transparent Impact Reporting",
      description: "Annual symbiosis report aligned with ISSB, EU CSRD, and China ESG disclosure requirements",
      effect: "Single reporting architecture serving all regulatory jurisdictions",
    },
  ],
};

export const ROADMAP_PHASES = [
  {
    id: "foundation",
    period: "2026–2027",
    title: "Foundation",
    theme: "Integrate & Prove",
    initiatives: [
      "Launch SCM internal alignment across China HQ and 3 pilot international offices",
      "Deploy Digital Symbiosis Platform MVP with Huigui live metrics",
      "Establish Green Talent Academy pilot with 2 anchor clients",
      "Publish first Symbiosis Governance Index baseline",
    ],
    quickWins: [
      "Huigui metrics dashboard for client showcase",
      "ISO 30415 reporting integration",
      "East-West ESG translation toolkit",
    ],
    milestones: [
      { label: "SCM adopted internally", date: "Q2 2026" },
      { label: "Platform MVP live", date: "Q4 2026" },
      { label: "3 pilot offices certified", date: "Q2 2027" },
    ],
  },
  {
    id: "scale",
    period: "2028–2029",
    title: "Scale",
    theme: "Expand & Connect",
    initiatives: [
      "Roll out Huigui Symbiosis Hub to 12 APAC offices",
      "Scale Green Talent Academy to 15,000 workers annually",
      "Launch client-facing Regenerative Workspace Certification",
      "Activate Partnership Architecture with 5 global HR institutions",
    ],
    quickWins: [
      "First certified client workspace",
      "SBTi supplier cascade — 40% adoption",
      "Bilingual symbiosis report published",
    ],
    milestones: [
      { label: "12 offices on regenerative model", date: "Q4 2028" },
      { label: "15K workers upskilled", date: "Q2 2029" },
      { label: "EU CSRD-compliant reporting", date: "Q4 2029" },
    ],
  },
  {
    id: "leadership",
    period: "2030",
    title: "Global Leadership",
    theme: "Lead & Influence",
    initiatives: [
      "Position Engma as the definitive HR-ESG symbiosis brand globally",
      "50,000 green talent placements across 20 countries",
      "80% supplier SBTi adoption achieved",
      "Symbiosis Catalyst Model licensed to 3 industry partners",
    ],
    quickWins: [
      "Industry thought leadership summit",
      "WEF partnership announcement",
      "Net-zero pathway 2030 checkpoint published",
    ],
    milestones: [
      { label: "Global leadership position", date: "Q2 2030" },
      { label: "50K green talent milestone", date: "Q3 2030" },
      { label: "2030 Symbiosis Report", date: "Q4 2030" },
    ],
  },
];

export const IMPACT_METRICS = [
  {
    category: "Business Value",
    color: "#0F766E",
    metrics: [
      { label: "ESG-Linked Revenue", baseline: "12%", target: "35%", unit: "of total revenue" },
      { label: "Client Retention (ESG accounts)", baseline: "78%", target: "92%", unit: "" },
      { label: "Green Talent Placements", baseline: "2,400", target: "50,000", unit: "annually" },
    ],
  },
  {
    category: "Social Value",
    color: "#166534",
    metrics: [
      { label: "Workers Upskilled", baseline: "3,200", target: "50,000", unit: "cumulative" },
      { label: "Inclusive Placements", baseline: "180", target: "5,000", unit: "disability-inclusive" },
      { label: "Community Investment", baseline: "RMB 6K", target: "RMB 2M", unit: "annual" },
    ],
  },
  {
    category: "Ecological Value",
    color: "#0F766E",
    metrics: [
      { label: "Energy Reduction", baseline: "15%", target: "30%", unit: "vs. 2023 baseline" },
      { label: "Water Savings", baseline: "20%", target: "40%", unit: "vs. 2023 baseline" },
      { label: "Scope 1+2 Emissions", baseline: "0%", target: "−20%", unit: "SBTi target 2030" },
      { label: "Renewable Electricity", baseline: "35%", target: "100%", unit: "by 2030" },
    ],
  },
];

export const RISKS = [
  { name: "Regulatory Fragmentation", likelihood: "high", impact: "medium", mitigation: "Unified reporting architecture (ISSB + CSRD + CN standards)" },
  { name: "Green Talent Competition", likelihood: "high", impact: "high", mitigation: "First-mover academy + client lock-in via certification" },
  { name: "Greenwashing Perception", likelihood: "medium", impact: "high", mitigation: "SBTi-validated targets + third-party audit + biodiversity indicators" },
  { name: "East-West Cultural Friction", likelihood: "medium", impact: "medium", mitigation: "Bilingual governance index + local partnership architecture" },
  { name: "Technology Platform Risk", likelihood: "low", impact: "medium", mitigation: "Phased MVP rollout leveraging existing EIS Cloud infrastructure" },
  { name: "Supplier Non-Compliance", likelihood: "medium", impact: "high", mitigation: "SBTi cascade with tiered engagement + alternative sourcing" },
];

export const COMPETITIVE_ADVANTAGES = [
  {
    title: "Talent-Native ESG",
    description: "Unlike pure-play consultancies, Engma embeds ESG through its core HR delivery — making impact inseparable from service.",
  },
  {
    title: "Proven China Foundation",
    description: "Huigui, SBTi, CSR 3.0 provide credible proof points that most global HR firms cannot match.",
  },
  {
    title: "East-West Bridge",
    description: "Unique positioning for IBSS theme — operational excellence from East, governance rigor from West.",
  },
  {
    title: "Symbiosis Philosophy",
    description: "Not bolt-on ESG — a coherent worldview where business, society, and planet reinforce each other.",
  },
];