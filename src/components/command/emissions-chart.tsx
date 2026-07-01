"use client";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { useCommandCenter } from "@/context/command-center-context";
import { TrendingDown } from "lucide-react";

export function EmissionsChart() {
  const { simulation } = useCommandCenter();

  return (
    <div className="command-panel h-full flex flex-col">
      <div className="command-panel-header">
        <TrendingDown className="h-3.5 w-3.5 text-teal-light" />
        <span>Emissions Trajectory</span>
        <span className="ml-auto text-[8px] text-gold">NZ {simulation.netZeroYear}</span>
      </div>
      <div className="command-panel-body flex-1 min-h-[160px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={simulation.emissionsTrajectory} margin={{ top: 5, right: 5, left: -25, bottom: 0 }}>
            <defs>
              <linearGradient id="projGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#2dd4bf" stopOpacity={0.3} />
                <stop offset="100%" stopColor="#2dd4bf" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid stroke="rgba(255,255,255,0.04)" />
            <XAxis dataKey="year" tick={{ fill: "#7a8f8c", fontSize: 9 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: "#7a8f8c", fontSize: 9 }} axisLine={false} tickLine={false} />
            <Tooltip
              contentStyle={{
                background: "rgba(12,20,18,0.9)",
                border: "1px solid rgba(15,118,110,0.3)",
                borderRadius: 8,
                fontSize: 10,
              }}
            />
            <Area type="monotone" dataKey="baseline" stroke="#7a8f8c" fill="none" strokeWidth={1} strokeDasharray="4 4" name="Baseline" />
            <Area type="monotone" dataKey="projected" stroke="#2dd4bf" fill="url(#projGrad)" strokeWidth={2} name="SCM Projected" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}