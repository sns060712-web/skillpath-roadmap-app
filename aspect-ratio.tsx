import { useState } from "react";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

const LABELS = ["Poor", "Fair", "Good", "Great", "Excellent"];

interface StarRatingProps {
  value: number | null;
  onChange?: (rating: number) => void;
  readOnly?: boolean;
  size?: "sm" | "md" | "lg";
  showLabel?: boolean;
  className?: string;
}

export function StarRating({
  value,
  onChange,
  readOnly = false,
  size = "md",
  showLabel = true,
  className,
}: StarRatingProps) {
  const [hovered, setHovered] = useState<number | null>(null);

  const starSizes = { sm: "w-4 h-4", md: "w-6 h-6", lg: "w-8 h-8" };
  const gapSizes = { sm: "gap-0.5", md: "gap-1", lg: "gap-1.5" };
  const starSize = starSizes[size];
  const gapSize = gapSizes[size];

  const active = hovered ?? value ?? 0;

  return (
    <div className={cn("flex flex-col items-start gap-1", className)}>
      <div
        className={cn("flex", gapSize)}
        onMouseLeave={() => !readOnly && setHovered(null)}
        role={readOnly ? "img" : "radiogroup"}
        aria-label={`Rating: ${value ?? 0} out of 5`}
      >
        {[1, 2, 3, 4, 5].map((star) => {
          const filled = star <= active;
          return (
            <button
              key={star}
              type="button"
              disabled={readOnly}
              onMouseEnter={() => !readOnly && setHovered(star)}
              onClick={() => !readOnly && onChange?.(star)}
              aria-label={`Rate ${star} star${star !== 1 ? "s" : ""}`}
              className={cn(
                "transition-all duration-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm",
                readOnly ? "cursor-default" : "cursor-pointer hover:scale-110"
              )}
            >
              <Star
                className={cn(
                  starSize,
                  "transition-colors duration-100",
                  filled
                    ? "fill-amber-400 text-amber-400"
                    : "fill-transparent text-muted-foreground/40"
                )}
              />
            </button>
          );
        })}
      </div>

      {showLabel && !readOnly && (
        <span className="text-xs text-muted-foreground h-4">
          {hovered
            ? LABELS[hovered - 1]
            : value
            ? `You rated: ${LABELS[value - 1]}`
            : "Tap to rate this roadmap"}
        </span>
      )}
    </div>
  );
}

interface RatingWidgetProps {
  roadmapId: number;
  initialRating: number | null;
  onRate: (rating: number) => void;
  isPending?: boolean;
}

export function RatingWidget({
  roadmapId: _roadmapId,
  initialRating,
  onRate,
  isPending = false,
}: RatingWidgetProps) {
  const [submitted, setSubmitted] = useState(false);
  const hasRated = initialRating !== null || submitted;

  const handleRate = (rating: number) => {
    if (isPending) return;
    onRate(rating);
    setSubmitted(true);
  };

  return (
    <div className="flex flex-col gap-2 p-4 bg-muted/30 border border-border/60 rounded-xl">
      <div className="flex items-center gap-2">
        <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
        <span className="text-sm font-semibold">
          {hasRated ? "Thanks for your rating!" : "Was this roadmap helpful?"}
        </span>
        {isPending && (
          <span className="text-xs text-muted-foreground animate-pulse ml-auto">Saving...</span>
        )}
      </div>
      <StarRating
        value={initialRating}
        onChange={handleRate}
        readOnly={hasRated && !isPending}
        size="md"
        showLabel={!hasRated}
      />
    </div>
  );
}
