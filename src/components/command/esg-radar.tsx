"use client";

import {
  RadarChart, PolarGrid, PolarAngleAxis, Radar,
  ResponsiveContainer, Tooltip,
} from "recharts";
import { useCommandCenter } from "@/context/command-center-context";
import { DashboardFrame } from "@/components/dashboard/dashboard-frame";
import { Radar as RadarIcon } from "lucide-react";

export function ESGRadar() {
  const { simulation } = useCommandCenter();

  const data = [
    { axis: "Environmental", value: simulation.radar.E, fullMark: 100 },
    { axis: "Social", value: simulation.radar.S, fullMark: 100 },
    { axis: "Governance", value: simulation.radar.G, fullMark: 100 },
    { axis: "Catalyst", value: simulation.radar.Catalyst, fullMark: 100 },
    { axis: "E-W Bridge", value: simulation.radar.Bridge, fullMark: 100 },
  ];

  return (
    <DashboardFrame title="SCM Capability Radar" icon={RadarIcon} badge="5-Axis" className="h-full min-h-[380px]">
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart data={data} cx="50%" cy="50%" outerRadius="72%">
            <PolarGrid stroke="rgba(45,212,191,0.1)" gridType="polygon" />
            <PolarAngleAxis dataKey="axis" tick={{ fill: "#7a8f8c", fontSize: 10, fontWeight: 600 }} />
            <Radar
              dataKey="value"
              stroke="#2dd4bf"
              fill="#0F766E"
              fillOpacity={0.2}
              strokeWidth={2.5}
              dot={{ fill: "#2dd4bf", strokeWidth: 0, r: 4 }}
            />
            <Tooltip
              contentStyle={{
                background: "rgba(8,13,12,0.95)",
                border: "1px solid rgba(45,212,191,0.25)",
                borderRadius: 12,
                fontSize: 12,
                backdropFilter: "blur(16px)",
              }}
              formatter={(v) => [`${v}`, "Score"]}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>
      <div className="flex justify-center gap-4 mt-2">
        {data.map((d) => (
          <div key={d.axis} className="text-center">
            <p className="text-sm font-bold text-teal-light tabular-nums">{d.value}</p>
            <p className="text-[7px] text-muted-foreground uppercase">{d.axis.split(" ")[0]}</p>
          </div>
        ))}
      </div>
    </DashboardFrame>
  );
}