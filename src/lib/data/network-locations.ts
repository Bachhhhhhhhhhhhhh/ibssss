export type NetworkRegion = "east" | "west" | "bridge";
export type NetworkTier = "hub" | "regional" | "field" | "partnership";
export type NetworkPillar = "E" | "S" | "G";

export interface NetworkNode {
  id: string;
  name: string;
  subtitle: string;
  lat: number;
  lng: number;
  region: NetworkRegion;
  tier: NetworkTier;
  pillar: NetworkPillar;
  pillars?: NetworkPillar[];
  initiatives: string[];
  connections: string[];
  metric: string;
  impact: number;
  description: string;
  reach?: {
    beneficiaries?: number;
    investmentRmb?: number;
    carbonTco2e?: number;
  };
}

export const NETWORK_REGIONS: Record<NetworkRegion, { label: string; color: string }> = {
  east: { label: "East Asia", color: "#0F766E" },
  west: { label: "Western Markets", color: "#2dd4bf" },
  bridge: { label: "East-West Bridge", color: "#c9a962" },
};

export const NETWORK_NODES: NetworkNode[] = [
  {
    id: "suzhou",
    name: "Suzhou",
    subtitle: "Huigui Symbiosis HQ",
    lat: 31.3, lng: 120.6,
    region: "east", tier: "hub", pillar: "E",
    pillars: ["E", "S"],
    initiatives: ["Huigui Building", "Firefly Program", "VRV + LED", "Rainwater 200m³"],
    connections: ["beijing", "singapore", "minqin", "qiandongnan"],
    metric: "15% energy ↓ · 20% water",
    impact: 95,
    description: "Flagship regenerative workspace proving symbiosis at scale — the operational blueprint SCM replicates globally.",
    reach: { beneficiaries: 4200, investmentRmb: 12000000, carbonTco2e: 2800 },
  },
  {
    id: "beijing",
    name: "Beijing",
    subtitle: "Corporate Governance HQ",
    lat: 39.9, lng: 116.4,
    region: "east", tier: "hub", pillar: "G",
    pillars: ["G", "S"],
    initiatives: ["SBTi Validated May 2025", "CSR 3.0", "ISO 30415", "Net-Zero 2050"],
    connections: ["suzhou", "london", "brussels", "singapore"],
    metric: "SBTi · Scope 1+2 −20%",
    impact: 92,
    description: "Governance nerve center — SBTi-validated targets, CSR 3.0 ecosystem, and human capital reporting architecture.",
    reach: { beneficiaries: 8500, carbonTco2e: 4200 },
  },
  {
    id: "minqin",
    name: "Minqin",
    subtitle: "Gansu Desert Restoration",
    lat: 38.6, lng: 103.1,
    region: "east", tier: "field", pillar: "E",
    initiatives: ["Tree Planting Phase 1", "Desert Carbon Sequestration", "Ecological Offset"],
    connections: ["suzhou", "beijing"],
    metric: "RMB 6K · Phase 1",
    impact: 72,
    description: "Ecological field operation in one of China's most fragile desert regions — tangible carbon and community symbiosis.",
    reach: { investmentRmb: 6000, carbonTco2e: 180 },
  },
  {
    id: "qiandongnan",
    name: "Qiandongnan",
    subtitle: "Rural Digital Upskilling",
    lat: 26.6, lng: 107.9,
    region: "east", tier: "field", pillar: "S",
    initiatives: ["Tech Education", "Rural Digital Skills", "Community Talent Pipeline"],
    connections: ["suzhou", "singapore"],
    metric: "3,200 workers trained",
    impact: 68,
    description: "Just Transition in action — bridging rural digital divide through structured talent development pathways.",
    reach: { beneficiaries: 3200 },
  },
  {
    id: "singapore",
    name: "Singapore",
    subtitle: "APAC Scaling Hub",
    lat: 1.35, lng: 103.8,
    region: "bridge", tier: "regional", pillar: "S",
    pillars: ["S", "G"],
    initiatives: ["Green Talent Academy", "APAC Client Hub", "Regulatory Bridge"],
    connections: ["suzhou", "beijing", "london", "dubai", "qiandongnan"],
    metric: "12 APAC offices target",
    impact: 82,
    description: "Primary APAC bridge node — scales Huigui model and green talent academy across Southeast Asian markets.",
    reach: { beneficiaries: 15000 },
  },
  {
    id: "london",
    name: "London",
    subtitle: "EU Regulatory Bridge",
    lat: 51.5, lng: -0.1,
    region: "bridge", tier: "regional", pillar: "G",
    initiatives: ["EU CSRD Alignment", "ISSB Reporting", "Client ESG Disclosure"],
    connections: ["beijing", "brussels", "singapore", "geneva"],
    metric: "CSRD-ready reporting",
    impact: 78,
    description: "Translates China's symbiosis operational proof into EU-legible governance narratives for Western clients.",
    reach: { beneficiaries: 2200 },
  },
  {
    id: "brussels",
    name: "Brussels",
    subtitle: "WEC Policy Node",
    lat: 50.8, lng: 4.4,
    region: "west", tier: "partnership", pillar: "G",
    initiatives: ["WEC Membership", "EU Policy Influence", "Standards Advocacy"],
    connections: ["london", "geneva"],
    metric: "WEC member",
    impact: 70,
    description: "Policy symbiosis — Engma influences global labor and sustainability standards through WEC membership.",
  },
  {
    id: "alexandria",
    name: "Alexandria",
    subtitle: "SHRM Global Standards",
    lat: 38.8, lng: -77.0,
    region: "west", tier: "partnership", pillar: "S",
    initiatives: ["SHRM Collaboration", "Global HR ESG Standards", "Talent Certification"],
    connections: ["geneva", "beijing"],
    metric: "SHRM partner",
    impact: 75,
    description: "Embeds ESG principles into global HR service delivery through SHRM standards integration.",
    reach: { beneficiaries: 12000 },
  },
  {
    id: "geneva",
    name: "Geneva",
    subtitle: "WEF · Just Transition",
    lat: 46.2, lng: 6.1,
    region: "west", tier: "partnership", pillar: "S",
    initiatives: ["Green Talent Gap Research", "Just Transition Framework", "WEF Dialogue"],
    connections: ["london", "brussels", "alexandria"],
    metric: "7M talent deficit",
    impact: 65,
    description: "Global thought leadership node — Engma's talent solutions directly address the WEF-projected green skills crisis.",
  },
  {
    id: "dubai",
    name: "Dubai",
    subtitle: "MENA Humanitarian Bridge",
    lat: 25.2, lng: 55.3,
    region: "bridge", tier: "field", pillar: "S",
    initiatives: ["Syria Humanitarian Support", "MENA Corridor", "Cross-border CSR"],
    connections: ["singapore", "london"],
    metric: "Care beyond borders",
    impact: 60,
    description: "East-West humanitarian symbiosis — extending Engma's care philosophy beyond commercial operations.",
    reach: { beneficiaries: 800 },
  },
];

export const NETWORK_STATS = {
  totalNodes: NETWORK_NODES.length,
  hubNodes: NETWORK_NODES.filter((n) => n.tier === "hub").length,
  bridgeCorridors: 4,
  totalBeneficiaries: NETWORK_NODES.reduce((s, n) => s + (n.reach?.beneficiaries ?? 0), 0),
  totalCarbon: NETWORK_NODES.reduce((s, n) => s + (n.reach?.carbonTco2e ?? 0), 0),
};