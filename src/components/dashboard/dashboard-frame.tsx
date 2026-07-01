"use client";

import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

interface DashboardFrameProps {
  title: string;
  icon?: LucideIcon;
  badge?: string;
  badgeColor?: "teal" | "gold" | "green" | "live";
  action?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  noPadding?: boolean;
  glow?: boolean;
}

const BADGE_STYLES = {
  teal: "bg-teal/15 text-teal-light border-teal/25",
  gold: "bg-gold/10 text-gold border-gold/20",
  green: "bg-forest/15 text-forest-light border-forest/25",
  live: "bg-forest/10 text-forest-light border-forest/20",
};

export function DashboardFrame({
  title,
  icon: Icon,
  badge,
  badgeColor = "teal",
  action,
  children,
  className,
  noPadding,
  glow,
}: DashboardFrameProps) {
  return (
    <div className={cn("dash-frame group", glow && "dash-frame-glow", className)}>
      {/* Corner accents */}
      <span className="dash-corner dash-corner-tl" />
      <span className="dash-corner dash-corner-tr" />
      <span className="dash-corner dash-corner-bl" />
      <span className="dash-corner dash-corner-br" />

      <div className="dash-frame-header">
        <div className="flex items-center gap-2.5 min-w-0">
          {Icon && (
            <div className="dash-icon-wrap">
              <Icon className="h-3.5 w-3.5 text-teal-light" />
            </div>
          )}
          <span className="dash-frame-title truncate">{title}</span>
          {badge && (
            <span className={cn("dash-badge", BADGE_STYLES[badgeColor])}>
              {badgeColor === "live" && (
                <span className="h-1.5 w-1.5 rounded-full bg-forest-light animate-pulse" />
              )}
              {badge}
            </span>
          )}
        </div>
        {action && <div className="shrink-0">{action}</div>}
      </div>

      <div className={cn(!noPadding && "dash-frame-body")}>{children}</div>
    </div>
  );
}