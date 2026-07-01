"use client";

import {
  AreaChart, Area, XAxis, YAxis, Tooltip,
  ResponsiveContainer, CartesianGrid, ReferenceLine,
} from "recharts";
import { useCommandCenter } from "@/context/command-center-context";
import { DashboardFrame } from "@/components/dashboard/dashboard-frame";
import { TrendingDown } from "lucide-react";

export function EmissionsChart() {
  const { simulation } = useCommandCenter();

  return (
    <DashboardFrame
      title="Emissions Trajectory"
      icon={TrendingDown}
      badge={`NZ ${simulation.netZeroYear}`}
      badgeColor="gold"
      className="h-full min-h-[380px]"
    >
      <div className="h-[260px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={simulation.emissionsTrajectory} margin={{ top: 8, right: 8, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="emProj" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#2dd4bf" stopOpacity={0.4} />
                <stop offset="100%" stopColor="#2dd4bf" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="emBase" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#7a8f8c" stopOpacity={0.15} />
                <stop offset="100%" stopColor="#7a8f8c" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid stroke="rgba(255,255,255,0.04)" vertical={false} />
            <XAxis dataKey="year" tick={{ fill: "#7a8f8c", fontSize: 10 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: "#7a8f8c", fontSize: 9 }} axisLine={false} tickLine={false} />
            <Tooltip
              contentStyle={{
                background: "rgba(8,13,12,0.95)",
                border: "1px solid rgba(45,212,191,0.2)",
                borderRadius: 12,
                fontSize: 11,
              }}
            />
            <ReferenceLine y={0} stroke="rgba(201,169,98,0.3)" strokeDasharray="4 4" />
            <Area type="monotone" dataKey="baseline" name="Baseline" stroke="#7a8f8c" fill="url(#emBase)" strokeWidth={1.5} strokeDasharray="5 5" />
            <Area type="monotone" dataKey="projected" name="SCM Path" stroke="#2dd4bf" fill="url(#emProj)" strokeWidth={2.5} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      <div className="flex justify-center gap-5 mt-3 text-[9px] uppercase tracking-wider text-muted-foreground">
        <span className="flex items-center gap-1.5"><span className="w-4 h-0.5 bg-muted-foreground/40 border-dashed" /> Baseline</span>
        <span className="flex items-center gap-1.5"><span className="w-4 h-0.5 bg-teal-light" /> SCM Projected</span>
      </div>
    </DashboardFrame>
  );
}