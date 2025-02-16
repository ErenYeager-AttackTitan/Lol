import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Card } from "@/components/ui/card";

interface VideoPlayerProps {
  iframeUrl: string;
}

export function VideoPlayer({ iframeUrl }: VideoPlayerProps) {
  return (
    <Card className="overflow-hidden">
      <AspectRatio ratio={16/9}>
        <iframe
          src={iframeUrl}
          className="w-full h-full border-0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen; payment"
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer"
        />
      </AspectRatio>
    </Card>
  );
}