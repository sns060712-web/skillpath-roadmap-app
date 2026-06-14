import React from "react";
import { ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

export function AdPlaceholder({ title, description, badge, type = "course" }: { title: string; description: string; badge: string; type?: "course" | "book" | "adsense" }) {
  if (type === "adsense") {
    return <div id="adsense-roadmap-inline" className="hidden" aria-hidden="true" />;
  }

  return (
    <div className="w-full my-8 rounded-xl border bg-card text-card-foreground shadow-sm flex flex-col sm:flex-row overflow-hidden group cursor-pointer hover:border-primary/50 transition-all">
      <div className="sm:w-48 bg-muted aspect-video sm:aspect-square flex items-center justify-center p-6 shrink-0 relative">
        <span className="absolute top-2 left-2 text-[10px] uppercase font-bold tracking-wider bg-background px-2 py-1 rounded-sm shadow-sm z-10">{badge}</span>
        <div className="w-full h-full bg-border rounded animate-pulse opacity-50"></div>
      </div>
      <div className="p-6 flex flex-col justify-center flex-1">
        <h4 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors">{title}</h4>
        <p className="text-sm text-muted-foreground mb-4">{description}</p>
        <div className="mt-auto flex items-center gap-2">
          <Button variant="secondary" size="sm" className="w-fit text-xs font-semibold gap-1">
            View Resource <ExternalLink className="w-3 h-3" />
          </Button>
        </div>
      </div>
    </div>
  );
}
