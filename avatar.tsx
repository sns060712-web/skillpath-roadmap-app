import React, { useState, useMemo } from "react";
import { Progress } from "@/components/ui/progress";
import { DayCard } from "./day-card";
import { AdPlaceholder } from "./ad-placeholder";
import { PdfDownloadButton } from "./pdf-download-button";
import { Button } from "@/components/ui/button";
import { Printer } from "lucide-react";
import type { RoadmapResult } from "@workspace/api-client-react/src/generated/api.schemas";
import { motion } from "framer-motion";

interface RoadmapDisplayProps {
  roadmap: RoadmapResult;
  initialCheckedTasks?: string[];
  onProgressUpdate?: (checkedTasks: string[]) => void;
  isReadOnly?: boolean;
}

export function RoadmapDisplay({ roadmap, initialCheckedTasks = [], onProgressUpdate, isReadOnly = false }: RoadmapDisplayProps) {
  const [checkedTasks, setCheckedTasks] = useState<string[]>(initialCheckedTasks);

  const totalTasks = useMemo(() => {
    return roadmap.days.reduce((acc, day) => acc + day.tasks.length, 0);
  }, [roadmap]);

  const progress = totalTasks === 0 ? 0 : Math.round((checkedTasks.length / totalTasks) * 100);

  const handleToggleTask = (taskId: string, checked: boolean) => {
    const next = checked
      ? [...checkedTasks, taskId]
      : checkedTasks.filter((id) => id !== taskId);
    setCheckedTasks(next);
    if (onProgressUpdate) {
      onProgressUpdate(next);
    }
  };

  const daysWithAds = useMemo(() => {
    const elements: React.ReactNode[] = [];
    const ads = [
      { type: "course" as const, title: "Master React & TypeScript", description: "Deep dive into building scalable frontend applications with modern tooling.", badge: "Recommended Course" },
      { type: "adsense" as const, title: "", description: "", badge: "" },
      { type: "book" as const, title: "Clean Architecture for JS", description: "Learn how to structure your JS applications for long-term maintainability.", badge: "Recommended Book" }
    ];

    let adIndex = 0;

    roadmap.days.forEach((day, index) => {
      elements.push(
        <DayCard
          key={`day-${day.day}`}
          day={day}
          checkedTasks={checkedTasks}
          onToggleTask={handleToggleTask}
          index={index}
          isReadOnly={isReadOnly}
        />
      );

      // Insert ad every ~7 days (weekly)
      if ((index + 1) % 7 === 0 && adIndex < ads.length) {
        const ad = ads[adIndex];
        elements.push(
          <AdPlaceholder
            key={`ad-${index}`}
            type={ad.type}
            title={ad.title}
            description={ad.description}
            badge={ad.badge}
          />
        );
        adIndex++;
      }
    });

    return elements;
  }, [roadmap, checkedTasks]);

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      {/* Header & Progress */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-card border rounded-2xl p-6 md:p-8 shadow-sm"
      >
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-8">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2 flex-wrap">
              <h2 className="text-3xl font-bold tracking-tight">{roadmap.skillName}</h2>
              <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wide">
                {roadmap.experienceLevel}
              </span>
            </div>
            <p className="text-muted-foreground max-w-2xl mb-4">{roadmap.overview}</p>
            <div className="flex items-center gap-2 flex-wrap">
              <PdfDownloadButton
                roadmap={roadmap}
                checkedTasks={checkedTasks}
                size="sm"
                variant="outline"
              />
              <Button
                size="sm"
                variant="outline"
                onClick={() => window.print()}
                data-testid="button-print-roadmap"
              >
                <Printer className="w-4 h-4" />
                Print Roadmap
              </Button>
            </div>
          </div>
          <div className="flex flex-col items-end shrink-0 bg-muted/50 p-4 rounded-xl border border-border/50">
            <span className="text-sm font-medium text-muted-foreground mb-1 uppercase tracking-wider">Duration</span>
            <span className="text-xl font-bold">{roadmap.duration}</span>
            <span className="text-xs text-muted-foreground mt-1">{roadmap.totalDays} Days Total</span>
          </div>
        </div>

        {!isReadOnly && (
          <div className="space-y-3">
            <div className="flex justify-between items-center text-sm font-medium">
              <span>Overall Progress</span>
              <span className="text-primary font-bold">{progress}%</span>
            </div>
            <Progress value={progress} className="h-3" />
            <p className="text-xs text-muted-foreground text-right">
              {checkedTasks.length} of {totalTasks} tasks completed
            </p>
          </div>
        )}
      </motion.div>

      {/* Days List */}
      <div className="space-y-6">
        {daysWithAds}
      </div>
    </div>
  );
}
