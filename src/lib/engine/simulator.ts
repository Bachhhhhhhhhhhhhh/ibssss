export interface StrategySliders {
  greenTalentIntensity: number;
  regenerativeWorkspace: number;
  eastWestBridge: number;
  digitalPlatform: number;
  supplierEngagement: number;
  communityInvestment: number;
}

export interface SimulationOutput {
  symbiosisIndex: number;
  businessValue: number;
  socialValue: number;
  ecologicalValue: number;
  greenTalentPlacements: number;
  energyReduction: number;
  waterSavings: number;
  esgRevenueShare: number;
  netZeroYear: number;
  supplierSbti: number;
  recommendations: string[];
  emissionsTrajectory: { year: number; baseline: number; projected: number }[];
  radar: { E: number; S: number; G: number; Catalyst: number; Bridge: number };
}

export const DEFAULT_SLIDERS: StrategySliders = {
  greenTalentIntensity: 45,
  regenerativeWorkspace: 55,
  eastWestBridge: 40,
  digitalPlatform: 50,
  supplierEngagement: 35,
  communityInvestment: 30,
};

export const PRESET_SCENARIOS = {
  baseline: {
    label: "2025 Baseline",
    description: "Current Engma ESG posture without SCM integration",
    sliders: { greenTalentIntensity: 20, regenerativeWorkspace: 30, eastWestBridge: 25, digitalPlatform: 15, supplierEngagement: 20, communityInvestment: 15 } as StrategySliders,
  },
  scm: {
    label: "SCM Adoption",
    description: "Full Symbiotic Catalyst Model implementation",
    sliders: { greenTalentIntensity: 65, regenerativeWorkspace: 70, eastWestBridge: 75, digitalPlatform: 80, supplierEngagement: 60, communityInvestment: 55 } as StrategySliders,
  },
  aggressive: {
    label: "Global Leadership 2030",
    description: "Maximum investment — industry-defining position",
    sliders: { greenTalentIntensity: 90, regenerativeWorkspace: 85, eastWestBridge: 95, digitalPlatform: 95, supplierEngagement: 85, communityInvestment: 80 } as StrategySliders,
  },
};

function clamp(v: number, min = 0, max = 100) {
  return Math.min(max, Math.max(min, v));
}

function avg(...vals: number[]) {
  return vals.reduce((a, b) => a + b, 0) / vals.length;
}

export function runSimulation(sliders: StrategySliders): SimulationOutput {
  const s: StrategySliders = {
    greenTalentIntensity: clamp(sliders.greenTalentIntensity),
    regenerativeWorkspace: clamp(sliders.regenerativeWorkspace),
    eastWestBridge: clamp(sliders.eastWestBridge),
    digitalPlatform: clamp(sliders.digitalPlatform),
    supplierEngagement: clamp(sliders.supplierEngagement),
    communityInvestment: clamp(sliders.communityInvestment),
  };

  const catalyst = avg(s.greenTalentIntensity, s.digitalPlatform) * 0.4;
  const E = avg(s.regenerativeWorkspace, s.supplierEngagement) * 0.35 + catalyst * 0.15;
  const S = avg(s.greenTalentIntensity, s.communityInvestment) * 0.35 + catalyst * 0.1;
  const G = avg(s.supplierEngagement, s.eastWestBridge) * 0.3 + catalyst * 0.1;
  const bridge = s.eastWestBridge * 0.9 + s.digitalPlatform * 0.1;

  const symbiosisIndex = clamp(
    Math.round((0.28 * E + 0.28 * S + 0.24 * G + 0.12 * catalyst + 0.08 * bridge) * 10) / 10,
    35,
    99
  );

  const businessValue = clamp(40 + symbiosisIndex * 0.45 + s.digitalPlatform * 0.15, 40, 98);
  const socialValue = clamp(35 + S * 0.5 + s.communityInvestment * 0.2, 35, 97);
  const ecologicalValue = clamp(30 + E * 0.55 + s.regenerativeWorkspace * 0.15, 30, 96);

  const greenTalentPlacements = Math.round(2400 + s.greenTalentIntensity * 528);
  const energyReduction = Math.round((15 + s.regenerativeWorkspace * 0.17) * 10) / 10;
  const waterSavings = Math.round((20 + s.regenerativeWorkspace * 0.22) * 10) / 10;
  const esgRevenueShare = Math.round((12 + symbiosisIndex * 0.24) * 10) / 10;
  const supplierSbti = Math.round(s.supplierEngagement * 0.85);

  const investmentAvg = avg(s.regenerativeWorkspace, s.supplierEngagement, s.digitalPlatform);
  const netZeroYear = investmentAvg >= 85 ? 2043 : investmentAvg >= 65 ? 2046 : investmentAvg >= 45 ? 2048 : 2050;

  const recommendations: string[] = [];
  if (s.regenerativeWorkspace >= 50)
    recommendations.push("Roll out Huigui Symbiosis Hub to 12 APAC offices by 2028");
  if (s.greenTalentIntensity >= 50)
    recommendations.push("Launch Green Talent Academy — 50,000 worker upskilling target");
  if (s.eastWestBridge >= 55)
    recommendations.push("Deploy bilingual ESG reporting (ISSB + CSRD + CN standards)");
  if (s.digitalPlatform >= 55)
    recommendations.push("Scale EIS Intelligent Cloud to client-facing symbiosis dashboards");
  if (s.supplierEngagement >= 45)
    recommendations.push("Activate SBTi supplier cascade — target 80% adoption by 2030");
  if (s.communityInvestment >= 40)
    recommendations.push("Expand CSR 3.0 client integration across 3 anchor markets");
  if (recommendations.length === 0)
    recommendations.push("Increase baseline investments across all SCM loops to unlock symbiotic scaling");

  const reductionRate = (s.regenerativeWorkspace + s.supplierEngagement + s.digitalPlatform) / 300;
  const emissionsTrajectory = Array.from({ length: 7 }, (_, i) => {
    const year = 2024 + i;
    const baseline = Math.max(0, 100 - i * 2.5);
    const projected = Math.max(0, 100 * Math.pow(1 - reductionRate, i));
    return { year, baseline: Math.round(baseline * 10) / 10, projected: Math.round(projected * 10) / 10 };
  });

  return {
    symbiosisIndex,
    businessValue: Math.round(businessValue),
    socialValue: Math.round(socialValue),
    ecologicalValue: Math.round(ecologicalValue),
    greenTalentPlacements,
    energyReduction,
    waterSavings,
    esgRevenueShare,
    netZeroYear,
    supplierSbti,
    recommendations,
    emissionsTrajectory,
    radar: {
      E: Math.round(E),
      S: Math.round(S),
      G: Math.round(G),
      Catalyst: Math.round(catalyst),
      Bridge: Math.round(bridge),
    },
  };
}

export function generateLiveMetrics(sliders: StrategySliders, tick: number) {
  const sim = runSimulation(sliders);
  const noise = Math.sin(tick * 0.3) * 0.4 + Math.cos(tick * 0.17) * 0.3;
  return {
    symbiosisIndex: Math.round((sim.symbiosisIndex + noise) * 10) / 10,
    co2Avoided: Math.round(1200 + sim.ecologicalValue * 18 + tick * 2.3),
    waterSaved: Math.round(8400 + sim.waterSavings * 120 + tick * 15),
    talentActive: Math.round(sim.greenTalentPlacements / 365 + tick * 0.8),
    renewablePct: Math.round(35 + sim.ecologicalValue * 0.55),
    supplierSbti: sim.supplierSbti,
  };
}