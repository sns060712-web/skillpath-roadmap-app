import { motion, AnimatePresence } from "framer-motion";
import { Clock, ChevronRight, Trash2, BookOpen, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { RecentRoadmap } from "@/hooks/use-recent-roadmaps";
import type { RoadmapResult } from "@workspace/api-client-react/src/generated/api.schemas";

const LEVEL_COLORS: Record<string, string> = {
  Beginner: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400",
  Intermediate: "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-400",
  Advanced: "bg-rose-100 text-rose-700 dark:bg-rose-900/40 dark:text-rose-400",
};

function timeAgo(ts: number): string {
  const diff = Date.now() - ts;
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "Just now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  return `${Math.floor(hrs / 24)}d ago`;
}

interface RecentRoadmapsProps {
  recent: RecentRoadmap[];
  onSelect: (roadmap: RoadmapResult) => void;
  onClear: () => void;
}

export function RecentRoadmaps({ recent, onSelect, onClear }: RecentRoadmapsProps) {
  if (recent.length === 0) return null;

  return (
    <AnimatePresence>
      <motion.section
        key="recent"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        className="w-full max-w-3xl mx-auto mb-10"
      >
        {/* Header row */}
        <div className="flex items-center justify-between mb-3 px-1">
          <div className="flex items-center gap-2 text-sm font-semibold text-muted-foreground uppercase tracking-wider">
            <Clock className="w-4 h-4" />
            Recently Generated
          </div>
          <button
            onClick={onClear}
            className="flex items-center gap-1 text-xs text-muted-foreground/60 hover:text-muted-foreground transition-colors"
            title="Clear history"
          >
            <Trash2 className="w-3 h-3" />
            Clear
          </button>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {recent.map((item, i) => (
            <motion.button
              key={item.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
              onClick={() => onSelect(item.roadmap)}
              className="group relative flex flex-col text-left bg-card border border-border rounded-2xl p-4 shadow-sm hover:shadow-md hover:border-primary/40 transition-all duration-200 overflow-hidden"
            >
              {/* Subtle gradient accent */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

              {/* Skill name + arrow */}
              <div className="flex items-start justify-between gap-2 mb-2">
                <div className="flex items-center gap-2 min-w-0">
                  <div className="shrink-0 p-1.5 bg-primary/10 rounded-lg">
                    <BookOpen className="w-3.5 h-3.5 text-primary" />
                  </div>
                  <span className="font-bold text-sm leading-tight truncate">
                    {item.skillName}
                  </span>
                </div>
                <ChevronRight className="w-4 h-4 text-muted-foreground/40 group-hover:text-primary shrink-0 mt-0.5 transition-colors" />
              </div>

              {/* Overview */}
              <p className="text-[11px] text-muted-foreground leading-relaxed line-clamp-2 mb-3">
                {item.overview}
              </p>

              {/* Meta row */}
              <div className="flex items-center gap-2 mt-auto flex-wrap">
                <span
                  className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide ${
                    LEVEL_COLORS[item.experienceLevel] ?? "bg-muted text-muted-foreground"
                  }`}
                >
                  {item.experienceLevel}
                </span>
                <span className="flex items-center gap-1 text-[10px] text-muted-foreground">
                  <Calendar className="w-3 h-3" />
                  {item.duration}
                </span>
                <span className="ml-auto text-[10px] text-muted-foreground/50">
                  {timeAgo(item.viewedAt)}
                </span>
              </div>
            </motion.button>
          ))}
        </div>
      </motion.section>
    </AnimatePresence>
  );
}
