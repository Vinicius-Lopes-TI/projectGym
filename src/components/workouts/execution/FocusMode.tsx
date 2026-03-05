import { XMarkIcon } from "@heroicons/react/24/outline";

import { Button, Badge } from "@/components/ui";
import type { WorkoutExercise } from "@/data/mock-workout-execution";

interface FocusModeProps {
  exercise: WorkoutExercise;
  onClose: () => void;
}

const getEmbedUrl = (url: string) => {
  if (!url) return "";
  if (url.includes("youtube.com/embed")) return url;

  const match = url.match(/(?:youtu\.be\/|youtube\.com\/watch\?v=)([\w-]+)/);

  if (match) return `https://www.youtube.com/embed/${match[1]}`;

  return url;
};

export function FocusMode({ exercise, onClose }: FocusModeProps) {
  const embedUrl = getEmbedUrl(exercise.videoUrl);

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-gray-950/95 text-white">
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-2">
          <h2 className="text-sm font-semibold">{exercise.name}</h2>
          {(exercise.executionType === "Bi-set" ||
            exercise.executionType === "Tri-set") && (
            <Badge variant="soft" color="secondary" className="text-xs">
              {exercise.executionType}
            </Badge>
          )}
        </div>
        <Button
          variant="flat"
          color="neutral"
          isIcon
          className="text-white hover:bg-white/10"
          onClick={onClose}
        >
          <XMarkIcon className="h-5 w-5" />
        </Button>
      </div>

      <div className="flex flex-1 items-center justify-center px-3 pb-6">
        <div className="w-full max-w-4xl">
          <div className="aspect-video">
            {embedUrl ? (
              <iframe
                src={`${embedUrl}?autoplay=1&rel=0`}
                title={exercise.name}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="h-full w-full rounded-lg"
              />
            ) : (
              <div className="flex h-full items-center justify-center rounded-lg bg-gray-800 text-gray-400">
                Sem vídeo
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center gap-6 px-4 pb-4 text-sm text-gray-200">
        <span>{exercise.sets} séries</span>
        <span>{exercise.reps} reps</span>
        <span>{exercise.restSeconds}s descanso</span>
      </div>
    </div>
  );
}

