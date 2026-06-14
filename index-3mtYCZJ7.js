import { useEffect } from "react";
import { useParams, Link } from "wouter";
import { useGetSharedRoadmap, getGetSharedRoadmapQueryKey } from "@workspace/api-client-react";
import { RoadmapDisplay } from "@/components/roadmap/roadmap-display";
import { Loader2, AlertCircle, Share2, Copy, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { SiX, SiWhatsapp } from "react-icons/si";
import type { RoadmapResult } from "@workspace/api-client-react/src/generated/api.schemas";

export default function Share() {
  const params = useParams();
  const token = params.token as string;
  const { toast } = useToast();

  const { data: sharedData, isLoading, error } = useGetSharedRoadmap(token, {
    query: {
      enabled: !!token,
      queryKey: getGetSharedRoadmapQueryKey(token),
    },
  });

  useEffect(() => {
    if (sharedData) {
      document.title = `${sharedData.skillName} Roadmap | Pathfinder`;
    }
  }, [sharedData]);

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-20 flex justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error || !sharedData) {
    return (
      <div className="container mx-auto px-4 py-20 max-w-xl text-center space-y-6">
        <AlertCircle className="w-12 h-12 text-destructive mx-auto mb-4" />
        <h1 className="text-2xl font-bold">Roadmap not found</h1>
        <p className="text-muted-foreground">This roadmap link is invalid or has expired.</p>
        <Button asChild>
          <Link href="/">Create your own roadmap</Link>
        </Button>
      </div>
    );
  }

  const roadmapResult = JSON.parse(sharedData.roadmapData) as RoadmapResult;
  const shareUrl = window.location.href;
  const shareText = `Check out my ${sharedData.skillName} learning roadmap!`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareUrl);
    toast({
      title: "Link copied!",
      description: "Share it with anyone.",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-primary/10 border-b border-primary/20 py-3 px-4 text-center">
        <p className="text-sm font-medium text-primary flex items-center justify-center gap-2">
          <Share2 className="w-4 h-4" />
          You're viewing a shared roadmap.{" "}
          <Link href="/" className="underline underline-offset-4 font-bold">
            Generate your own
          </Link>
        </p>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-5xl">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8 bg-card border p-4 rounded-xl shadow-sm">
          <span className="text-sm font-medium">Share this roadmap:</span>
          <div className="flex gap-2 flex-wrap justify-center">
            <Button
              variant="outline"
              size="sm"
              onClick={copyToClipboard}
              className="gap-2"
              data-testid="button-copy-link"
            >
              <Copy className="w-4 h-4" /> Copy Link
            </Button>
            <Button variant="outline" size="sm" asChild>
              <a
                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`}
                target="_blank"
                rel="noopener noreferrer"
                data-testid="button-share-twitter"
              >
                <SiX className="w-4 h-4" />
              </a>
            </Button>
            <Button variant="outline" size="sm" asChild>
              <a
                href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`}
                target="_blank"
                rel="noopener noreferrer"
                data-testid="button-share-linkedin"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            </Button>
            <Button variant="outline" size="sm" asChild>
              <a
                href={`https://api.whatsapp.com/send?text=${encodeURIComponent(shareText + " " + shareUrl)}`}
                target="_blank"
                rel="noopener noreferrer"
                data-testid="button-share-whatsapp"
              >
                <SiWhatsapp className="w-4 h-4" />
              </a>
            </Button>
          </div>
        </div>

        <RoadmapDisplay roadmap={roadmapResult} isReadOnly={true} />
      </div>
    </div>
  );
}
