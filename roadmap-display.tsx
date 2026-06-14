import React from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { motion } from "framer-motion";
import { BookOpen } from "lucide-react";
import type { RoadmapDay } from "@workspace/api-client-react/src/generated/api.schemas";

interface DayCardProps {
  day: RoadmapDay;
  checkedTasks: string[];
  onToggleTask?: (taskId: string, checked: boolean) => void;
  index: number;
  isReadOnly?: boolean;
}

export function DayCard({ day, checkedTasks, onToggleTask, index, isReadOnly = false }: DayCardProps) {
  const allChecked = day.tasks.every((_, taskIndex) => checkedTasks.includes(`day-${day.day}-task-${taskIndex}`));

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className={`relative rounded-xl border p-6 transition-all duration-300 ${allChecked ? "bg-muted/30 border-primary/20" : "bg-card"}`}
    >
      <div className="flex items-baseline justify-between mb-4">
        <h3 className="text-lg font-bold">
          <span className="text-primary mr-2">Day {day.day}:</span>
          {day.title}
        </h3>
        {allChecked && (
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="text-xs font-bold text-primary bg-primary/10 px-2 py-1 rounded-full uppercase tracking-wider"
          >
            Completed
          </motion.span>
        )}
      </div>

      <div className="space-y-3 mb-6">
        {day.tasks.map((task, taskIndex) => {
          const taskId = `day-${day.day}-task-${taskIndex}`;
          const isChecked = checkedTasks.includes(taskId);

          return (
            <div key={taskId} className="flex items-start gap-3 group">
              {!isReadOnly ? (
                <>
                  <Checkbox
                    id={taskId}
                    checked={isChecked}
                    onCheckedChange={(checked) => onToggleTask?.(taskId, checked as boolean)}
                    className="mt-1 transition-transform group-active:scale-95"
                    data-testid={`checkbox-${taskId}`}
                  />
                  <label
                    htmlFor={taskId}
                    className={`text-sm leading-relaxed cursor-pointer transition-colors ${
                      isChecked ? "text-muted-foreground line-through" : "text-foreground"
                    }`}
                  >
                    {task}
                  </label>
                </>
              ) : (
                <div className="text-sm leading-relaxed text-foreground flex items-start">
                  <span className="mr-2 text-primary/70">•</span>
                  {task}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {day.resources && day.resources.length > 0 && (
        <div className="pt-4 border-t border-border/50">
          <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 flex items-center gap-1.5">
            <BookOpen className="w-3 h-3" /> Recommended Resources
          </h4>
          <div className="flex flex-wrap gap-2">
            {day.resources.map((resource, i) => (
              <span key={i} className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-secondary text-secondary-foreground border border-secondary-border shadow-sm">
                {resource}
              </span>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
}
