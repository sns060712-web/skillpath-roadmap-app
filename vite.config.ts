import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Trash2, Calendar, Signal, ChevronRight, Loader2, ArrowLeft, Share2 } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";

import {
  useListSavedRoadmaps,
  useGetSavedRoadmap,
  useDeleteSavedRoadmap,
  useUpdateRoadmapProgress,
  useShareRoadmap,
  useRateRoadmap,
  getListSavedRoadmapsQueryKey,
} from "@workspace/api-client-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { RoadmapDisplay } from "@/components/roadmap/roadmap-display";
import { RatingWidget } from "@/components/roadmap/star-rating";
import type { RoadmapResult } from "@workspace/api-client-react/src/generated/api.schemas";

export default function Saved() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { data: roadmaps, isLoading } = useListSavedRoadmaps();
  const deleteRoadmap = useDeleteSavedRoadmap();

  const [selectedId, setSelectedId] = useState<number | null>(null);

  const { data: selectedRoadmap, isLoading: isRoadmapLoading } = useGetSavedRoadmap(
    selectedId as number,
    { query: { enabled: !!selectedId } }
  );

  const updateProgress = useUpdateRoadmapProgress();
  const shareRoadmap = useShareRoadmap();
  const rateRoadmap = useRateRoadmap();

  const handleShare = (e: React.MouseEvent, id: number) => {
    e.stopPropagation();
    shareRoadmap.mutate({ id }, {
      onSuccess: (res) => {
        const shareUrl = window.location.origin + "/share/" + res.shareToken;
        navigator.clipboard.writeText(shareUrl);
        toast({ title: "Link copied!", description: "Share it with anyone." });
      },
      onError: () => {
        toast({ title: "Error", description: "Failed to generate share link.", variant: "destructive" });
      }
    });
  };

  const handleDelete = (e: React.MouseEvent, id: number) => {
    e.stopPropagation();
    deleteRoadmap.mutate(
      { id },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: getListSavedRoadmapsQueryKey() });
          toast({
            title: "Deleted",
            description: "Roadmap has been deleted.",
          });
          if (selectedId === id) {
            setSelectedId(null);
          }
        },
        onError: () => {
          toast({
            title: "Error",
            description: "Failed to delete roadmap.",
            variant: "destructive",
          });
        },
      }
    );
  };

  const handleProgressUpdate = (checkedTasks: string[]) => {
    if (!selectedId) return;
    updateProgress.mutate(
      { id: selectedId, data: { checkedTasks } },
      {
        onSuccess: () => {
          // Progress saved implicitly without needing immediate refresh,
          // but we invalidate the list so the overview updates when going back.
          queryClient.invalidateQueries({ queryKey: getListSavedRoadmapsQueryKey() });
        }
      }
    );
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-12 flex justify-center items-center min-h-[50vh]">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  // If a roadmap is selected, show it
  if (selectedId) {
    return (
      <div className="container mx-auto px-4 md:px-8 py-8">
        <div className="flex justify-between items-center mb-6">
          <Button 
            variant="ghost" 
            onClick={() => setSelectedId(null)}
            className="-ml-4 gap-2 text-muted-foreground hover:text-foreground"
            data-testid="button-back"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Saved Roadmaps
          </Button>

          <Button 
            variant="outline"
            onClick={(e) => handleShare(e, selectedId!)}
            disabled={shareRoadmap.isPending}
            className="gap-2"
          >
            {shareRoadmap.isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Share2 className="w-4 h-4" />}
            Share Roadmap
          </Button>
        </div>

        {isRoadmapLoading || !selectedRoadmap ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <RoadmapDisplay 
              roadmap={JSON.parse(selectedRoadmap.roadmapData) as RoadmapResult}
              initialCheckedTasks={selectedRoadmap.checkedTasks}
              onProgressUpdate={handleProgressUpdate}
            />
            <div className="max-w-4xl mx-auto">
              <RatingWidget
                roadmapId={selectedId!}
                initialRating={selectedRoadmap.rating ?? null}
                isPending={rateRoadmap.isPending}
                onRate={(rating) => {
                  rateRoadmap.mutate(
                    { id: selectedId!, data: { rating } },
                    {
                      onSuccess: () => {
                        queryClient.invalidateQueries({ queryKey: getListSavedRoadmapsQueryKey() });
                        toast({ title: "Rating saved!", description: "Thanks for your feedback." });
                      },
                      onError: () => {
                        toast({ title: "Error", description: "Failed to save rating.", variant: "destructive" });
                      },
                    }
                  );
                }}
              />
            </div>
          </motion.div>
        )}
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 md:px-8 py-12 max-w-6xl">
      <div className="flex items-center justify-between mb-10">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight mb-2">Saved Roadmaps</h1>
          <p className="text-muted-foreground">Pick up where you left off.</p>
        </div>
      </div>

      {!roadmaps || roadmaps.length === 0 ? (
        <div className="bg-card border border-border/50 rounded-2xl p-12 text-center max-w-2xl mx-auto mt-12 shadow-sm">
          <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
            <Calendar className="w-8 h-8 text-muted-foreground" />
          </div>
          <h3 className="text-xl font-bold mb-2">No roadmaps saved yet</h3>
          <p className="text-muted-foreground mb-6">
            Generate your first roadmap and save it to track your progress.
          </p>
          <Button asChild data-testid="link-home">
            <a href="/">Create Roadmap</a>
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {roadmaps.map((roadmap, index) => {
              const roadmapData = JSON.parse(roadmap.roadmapData) as RoadmapResult;
              const totalTasks = roadmapData.days.reduce((acc, day) => acc + day.tasks.length, 0);
              const progress = totalTasks === 0 ? 0 : Math.round((roadmap.checkedTasks.length / totalTasks) * 100);

              return (
                <motion.div
                  key={roadmap.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.2, delay: index * 0.05 }}
                  onClick={() => setSelectedId(roadmap.id)}
                  className="bg-card border hover:border-primary/50 rounded-2xl p-6 cursor-pointer group transition-all shadow-sm hover:shadow-md relative"
                  data-testid={`card-roadmap-${roadmap.id}`}
                >
                  <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-muted-foreground hover:text-primary hover:bg-primary/10"
                      onClick={(e) => handleShare(e, roadmap.id)}
                      data-testid={`button-share-${roadmap.id}`}
                      disabled={shareRoadmap.isPending}
                    >
                      <Share2 className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                      onClick={(e) => handleDelete(e, roadmap.id)}
                      data-testid={`button-delete-${roadmap.id}`}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>

                  <div className="flex gap-2 mb-4 pr-10">
                    <span className="text-xs font-semibold bg-primary/10 text-primary px-2.5 py-0.5 rounded-full flex items-center gap-1 uppercase tracking-wider">
                      <Signal className="w-3 h-3" /> {roadmap.experienceLevel}
                    </span>
                    <span className="text-xs font-semibold bg-muted text-muted-foreground px-2.5 py-0.5 rounded-full flex items-center gap-1">
                      <Calendar className="w-3 h-3" /> {roadmap.duration}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">{roadmap.skillName}</h3>
                  <p className="text-sm text-muted-foreground line-clamp-2 mb-6 h-10">
                    {roadmap.overview}
                  </p>

                  <div className="space-y-2 mt-auto">
                    <div className="flex justify-between text-sm">
                      <span className="font-medium text-foreground">Progress</span>
                      <span className="text-primary font-bold">{progress}%</span>
                    </div>
                    <Progress value={progress} className="h-2" />
                  </div>

                  <div className="mt-6 pt-4 border-t flex items-center justify-between text-sm font-medium text-muted-foreground group-hover:text-primary transition-colors">
                    <span>Continue learning</span>
                    <ChevronRight className="w-4 h-4" />
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
