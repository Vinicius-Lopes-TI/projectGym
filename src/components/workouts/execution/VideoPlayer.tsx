import { useState } from "react";
import {
  PlayIcon,
  ArrowsPointingOutIcon,
} from "@heroicons/react/24/outline";

import { Button, Card } from "@/components/ui";

interface VideoPlayerProps {
  videoUrl: string;
  exerciseName: string;
  onFocusMode: () => void;
}

const getEmbedUrl = (url: string) => {
  if (!url) return "";
  if (url.includes("youtube.com/embed")) return url;

  const match = url.match(/(?:youtu\.be\/|youtube\.com\/watch\?v=)([\w-]+)/);

  if (match) return `https://www.youtube.com/embed/${match[1]}`;

  return url;
};

export function VideoPlayer({ videoUrl, exerciseName, onFocusMode }: VideoPlayerProps) {
  const [playing, setPlaying] = useState(false);

  const embedUrl = getEmbedUrl(videoUrl);

  if (!videoUrl) {
    return (
      <Card className="overflow-hidden">
        <div className="relative aspect-video flex items-center justify-center bg-gray-100 text-gray-400 dark:bg-dark-700 dark:text-dark-300">
          <PlayIcon className="h-10 w-10 opacity-40" />
          <span className="ml-3 text-sm">Sem vídeo disponível</span>
        </div>
      </Card>
    );
  }

  return (
    <Card className="overflow-hidden relative">
      <div className="aspect-video relative">
        {!playing ? (
          <button
            type="button"
            onClick={() => setPlaying(true)}
            className="group relative flex h-full w-full items-center justify-center bg-gray-900/40"
            aria-label={`Reproduzir vídeo: ${exerciseName}`}
          >
            <img
              src={`https://img.youtube.com/vi/${embedUrl.split("/embed/")[1]}/hqdefault.jpg`}
              alt={exerciseName}
              className="absolute inset-0 h-full w-full object-cover opacity-70"
              onError={(e) => {
                e.currentTarget.style.display = "none";
              }}
            />
            <div className="relative z-10 flex h-16 w-16 items-center justify-center rounded-full bg-primary-500 text-white shadow-lg transition-transform group-hover:scale-110">
              <PlayIcon className="h-7 w-7" />
            </div>
          </button>
        ) : (
          <iframe
            src={`${embedUrl}?autoplay=1&rel=0`}
            title={exerciseName}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 h-full w-full"
          />
        )}
      </div>
      <Button
        variant="soft"
        color="neutral"
        className="absolute bottom-3 right-3 z-20 inline-flex items-center gap-1.5 bg-white/90 text-gray-700 shadow-sm backdrop-blur dark:bg-dark-600 dark:text-dark-50"
        onClick={onFocusMode}
      >
        <ArrowsPointingOutIcon className="h-3.5 w-3.5" />
        Modo foco
      </Button>
    </Card>
  );
}

