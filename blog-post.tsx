import { useState, useCallback } from "react";
import type { RoadmapResult } from "@workspace/api-client-react/src/generated/api.schemas";

const STORAGE_KEY = "pathfinder_recent_roadmaps";
const MAX_RECENT = 3;

export interface RecentRoadmap {
  id: string;
  skillName: string;
  duration: string;
  experienceLevel: string;
  overview: string;
  totalDays: number;
  viewedAt: number;
  roadmap: RoadmapResult;
}

function load(): RecentRoadmap[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as RecentRoadmap[]) : [];
  } catch {
    return [];
  }
}

function save(items: RecentRoadmap[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch {
    // storage quota exceeded — fail silently
  }
}

export function useRecentRoadmaps() {
  const [recent, setRecent] = useState<RecentRoadmap[]>(load);

  const addRecent = useCallback((roadmap: RoadmapResult) => {
    setRecent((prev) => {
      const entry: RecentRoadmap = {
        id: `${roadmap.skillName}-${Date.now()}`,
        skillName: roadmap.skillName,
        duration: roadmap.duration,
        experienceLevel: roadmap.experienceLevel,
        overview: roadmap.overview,
        totalDays: roadmap.totalDays,
        viewedAt: Date.now(),
        roadmap,
      };
      // Remove any existing entry for the same skill name (case-insensitive)
      const filtered = prev.filter(
        (r) => r.skillName.toLowerCase() !== roadmap.skillName.toLowerCase()
      );
      const updated = [entry, ...filtered].slice(0, MAX_RECENT);
      save(updated);
      return updated;
    });
  }, []);

  const clearRecent = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    setRecent([]);
  }, []);

  return { recent, addRecent, clearRecent };
}
