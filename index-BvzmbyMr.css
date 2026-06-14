import React from "react";
import { motion } from "framer-motion";
import { useGetRoadmapStats } from "@workspace/api-client-react";
import { Loader2, TrendingUp, Target, CheckCircle2, Zap, Star } from "lucide-react";
import { StarRating } from "@/components/roadmap/star-rating";

export default function Stats() {
  const { data: stats, isLoading } = useGetRoadmapStats();

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-12 flex justify-center items-center min-h-[50vh]">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!stats) {
    return null;
  }

  const cards = [
    {
      title: "Total Roadmaps",
      value: stats.totalRoadmaps,
      icon: Target,
      desc: "Created on Pathfinder",
      color: "text-blue-500",
      bg: "bg-blue-500/10",
    },
    {
      title: "Completed",
      value: stats.completedRoadmaps,
      icon: CheckCircle2,
      desc: "Fully mastered skills",
      color: "text-green-500",
      bg: "bg-green-500/10",
    },
    {
      title: "In Progress",
      value: stats.inProgressRoadmaps,
      icon: TrendingUp,
      desc: "Active learning journeys",
      color: "text-amber-500",
      bg: "bg-amber-500/10",
    },
    {
      title: "Avg Completion",
      value: `${Math.round(stats.averageCompletion)}%`,
      icon: Zap,
      desc: "Across all roadmaps",
      color: "text-primary",
      bg: "bg-primary/10",
    },
  ];

  const hasRatings = stats.totalRatings > 0 && stats.averageRating !== null;

  return (
    <div className="container mx-auto px-4 md:px-8 py-12 max-w-5xl">
      <div className="mb-12">
        <h1 className="text-3xl font-extrabold tracking-tight mb-2">Global Statistics</h1>
        <p className="text-muted-foreground">See how our community of learners is growing.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {cards.map((card, idx) => (
          <motion.div
            key={card.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: idx * 0.1 }}
            className="bg-card border rounded-2xl p-6 shadow-sm flex flex-col"
          >
            <div className="flex items-center justify-between mb-4">
              <span className="font-semibold text-sm text-muted-foreground">{card.title}</span>
              <div className={`p-2 rounded-lg ${card.bg} ${card.color}`}>
                <card.icon className="w-5 h-5" />
              </div>
            </div>
            <div className="mt-auto">
              <div className="text-4xl font-extrabold mb-1">{card.value}</div>
              <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">{card.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {hasRatings && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.45 }}
          className="bg-card border rounded-2xl p-6 shadow-sm mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
        >
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Star className="w-5 h-5 text-amber-400 fill-amber-400" />
              <span className="font-semibold text-sm text-muted-foreground uppercase tracking-wider">Community Quality Score</span>
            </div>
            <p className="text-xs text-muted-foreground">Based on {stats.totalRatings} rating{stats.totalRatings !== 1 ? "s" : ""} from saved roadmaps</p>
          </div>
          <div className="flex flex-col items-start sm:items-end gap-1">
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-extrabold">{stats.averageRating?.toFixed(1)}</span>
              <span className="text-muted-foreground text-sm">/ 5</span>
            </div>
            <StarRating value={Math.round(stats.averageRating ?? 0)} readOnly size="sm" showLabel={false} />
          </div>
        </motion.div>
      )}

      {stats.mostPopularSkill && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.4 }}
          className="bg-gradient-to-br from-primary/10 to-transparent border border-primary/20 rounded-3xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8"
        >
          <div>
            <h2 className="text-sm font-bold text-primary uppercase tracking-widest mb-2">Community Favorite</h2>
            <p className="text-3xl md:text-5xl font-extrabold text-foreground">
              Most Popular Skill: <br/>
              <span className="text-primary">{stats.mostPopularSkill}</span>
            </p>
          </div>
          <div className="w-full md:w-auto">
            <div className="bg-background border rounded-2xl p-6 shadow-xl relative overflow-hidden text-center md:text-left min-w-[250px]">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-2xl -mr-10 -mt-10" />
              <div className="relative z-10">
                <p className="text-sm font-medium text-muted-foreground mb-1">Start learning</p>
                <p className="text-xl font-bold mb-4">{stats.mostPopularSkill} today</p>
                <a href="/" className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2 w-full">
                  Create Roadmap
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
