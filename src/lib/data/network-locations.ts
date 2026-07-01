export interface NetworkNode {
  id: string;
  name: string;
  lat: number;
  lng: number;
  region: "east" | "west" | "bridge";
  pillar: "E" | "S" | "G";
  initiatives: string[];
  metric: string;
  impact: number;
}

export const NETWORK_NODES: NetworkNode[] = [
  { id: "suzhou", name: "Suzhou · Huigui HQ", lat: 31.3, lng: 120.6, region: "east", pillar: "E", initiatives: ["Huigui Building", "Firefly Program", "VRV + LED"], metric: "15% energy ↓", impact: 95 },
  { id: "minqin", name: "Minqin · Gansu", lat: 38.6, lng: 103.1, region: "east", pillar: "E", initiatives: ["Tree Planting", "Desert Restoration"], metric: "RMB 6K Phase 1", impact: 72 },
  { id: "qiandongnan", name: "Qiandongnan", lat: 26.6, lng: 107.9, region: "east", pillar: "S", initiatives: ["Tech Education", "Rural Upskilling"], metric: "Digital skills", impact: 68 },
  { id: "beijing", name: "Beijing · HQ", lat: 39.9, lng: 116.4, region: "east", pillar: "G", initiatives: ["SBTi Targets", "CSR 3.0", "ISO 30415"], metric: "SBTi May 2025", impact: 92 },
  { id: "london", name: "London · EU Bridge", lat: 51.5, lng: -0.1, region: "bridge", pillar: "G", initiatives: ["CSRD Alignment", "ISSB Reporting"], metric: "EU compliance", impact: 78 },
  { id: "brussels", name: "Brussels · WEC", lat: 50.8, lng: 4.4, region: "west", pillar: "G", initiatives: ["WEC Membership", "Policy Influence"], metric: "WEC member", impact: 70 },
  { id: "alexandria", name: "Alexandria · SHRM", lat: 38.8, lng: -77.0, region: "west", pillar: "S", initiatives: ["SHRM Standards", "Global HR ESG"], metric: "SHRM partner", impact: 75 },
  { id: "geneva", name: "Geneva · WEF", lat: 46.2, lng: 6.1, region: "west", pillar: "S", initiatives: ["Green Talent Gap", "Just Transition"], metric: "7M deficit", impact: 65 },
  { id: "singapore", name: "Singapore · APAC Hub", lat: 1.35, lng: 103.8, region: "bridge", pillar: "S", initiatives: ["Green Academy", "Talent Pipeline"], metric: "APAC scale", impact: 82 },
  { id: "dubai", name: "Dubai · MENA Bridge", lat: 25.2, lng: 55.3, region: "bridge", pillar: "S", initiatives: ["Humanitarian Reach", "East-West Corridor"], metric: "Global bridge", impact: 60 },
];