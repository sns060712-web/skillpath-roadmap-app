import React from "react";

interface AdSenseBannerProps {
  slot?: string;
  className?: string;
  size?: "banner" | "rectangle" | "halfpage";
}

export function AdSenseBanner({ slot = "default", className = "", size = "banner" }: AdSenseBannerProps) {
  const heights: Record<string, string> = {
    banner: "h-24",
    rectangle: "h-64",
    halfpage: "h-[600px]",
  };

  return (
    <div
      id={`adsense-${slot}`}
      data-ad-slot={slot}
      className={`w-full ${heights[size]} flex items-center justify-center rounded-xl border border-dashed border-border bg-slate-100 dark:bg-slate-800 text-xs text-muted-foreground uppercase tracking-widest font-medium select-none print:hidden ${className}`}
      aria-label="Advertisement"
    >
      <span className="opacity-50">Advertisement</span>
    </div>
  );
}
