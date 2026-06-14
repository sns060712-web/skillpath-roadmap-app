import { useState } from "react";
import { pdf } from "@react-pdf/renderer";
import { Download, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { RoadmapPDF } from "./roadmap-pdf";
import type { RoadmapResult } from "@workspace/api-client-react/src/generated/api.schemas";

interface PdfDownloadButtonProps {
  roadmap: RoadmapResult;
  checkedTasks?: string[];
  size?: "default" | "sm" | "lg" | "icon";
  variant?: "default" | "outline" | "secondary" | "ghost";
  className?: string;
}

export function PdfDownloadButton({
  roadmap,
  checkedTasks = [],
  size = "default",
  variant = "outline",
  className,
}: PdfDownloadButtonProps) {
  const [isGenerating, setIsGenerating] = useState(false);

  const handleDownload = async () => {
    setIsGenerating(true);
    try {
      const blob = await pdf(
        <RoadmapPDF roadmap={roadmap} checkedTasks={checkedTasks} />
      ).toBlob();

      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `${roadmap.skillName.replace(/\s+/g, "-").toLowerCase()}-roadmap.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <Button
      onClick={handleDownload}
      disabled={isGenerating}
      size={size}
      variant={variant}
      className={className}
      data-testid="button-download-pdf"
    >
      {isGenerating ? (
        <>
          <Loader2 className="w-4 h-4 animate-spin" />
          Generating PDF...
        </>
      ) : (
        <>
          <Download className="w-4 h-4" />
          Download PDF
        </>
      )}
    </Button>
  );
}
