"use client";

import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  Radar,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { useCommandCenter } from "@/context/command-center-context";
import { Radar as RadarIcon } from "lucide-react";

export function ESGRadar() {
  const { simulation } = useCommandCenter();

  const data = [
    { axis: "Environmental", value: simulation.radar.E },
    { axis: "Social", value: simulation.radar.S },
    { axis: "Governance", value: simulation.radar.G },
    { axis: "Catalyst", value: simulation.radar.Catalyst },
    { axis: "E-W Bridge", value: simulation.radar.Bridge },
  ];

  return (
    <div className="command-panel h-full flex flex-col">
      <div className="command-panel-header">
        <RadarIcon className="h-3.5 w-3.5 text-teal-light" />
        <span>SCM Capability Radar</span>
      </div>
      <div className="command-panel-body flex-1 min-h-[200px]">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart data={data} cx="50%" cy="50%" outerRadius="70%">
            <PolarGrid stroke="rgba(255,255,255,0.08)" />
            <PolarAngleAxis
              dataKey="axis"
              tick={{ fill: "#7a8f8c", fontSize: 9 }}
            />
            <Radar
              dataKey="value"
              stroke="#2dd4bf"
              fill="#0F766E"
              fillOpacity={0.25}
              strokeWidth={2}
            />
            <Tooltip
              contentStyle={{
                background: "rgba(12,20,18,0.9)",
                border: "1px solid rgba(15,118,110,0.3)",
                borderRadius: 8,
                fontSize: 11,
              }}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}