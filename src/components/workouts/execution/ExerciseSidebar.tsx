import { Check, Video } from "lucide-react";

import { cn } from "@/lib/utils";
import type { WorkoutExercise } from "@/data/mock-workout-execution";

interface ExerciseSidebarProps {
  exercises: WorkoutExercise[];
  currentIndex: number;
  completedIds: Set<string>;
  onSelect: (index: number) => void;
}

export function ExerciseSidebar({
  exercises,
  currentIndex,
  completedIds,
  onSelect,
}: ExerciseSidebarProps) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-1 pt-1">
      {exercises.map((ex, i) => {
        const isCurrent = i === currentIndex;
        const isDone = completedIds.has(ex.id);

        return (
          <button
            key={ex.id}
            type="button"
            onClick={() => onSelect(i)}
            className={cn(
              "flex min-w-[52px] flex-col items-center gap-1 rounded-lg border px-2 py-2 text-center text-xs transition-colors",
              isCurrent &&
                "border-primary-500 bg-primary-500/5 text-primary-700 dark:border-primary-400 dark:text-primary-300",
              isDone && !isCurrent && "border-primary-500/40 bg-primary-500/5",
              !isCurrent &&
                !isDone &&
                "border-gray-200 bg-white hover:bg-gray-50 dark:border-dark-500 dark:bg-dark-700 dark:hover:bg-dark-650",
            )}
          >
            <div className="relative flex h-7 w-7 items-center justify-center rounded-full bg-gray-100 text-[11px] font-semibold text-gray-500 dark:bg-dark-600 dark:text-dark-200">
              {isDone ? (
                <Check className="h-3.5 w-3.5 text-primary-600 dark:text-primary-400" />
              ) : (
                <span>{i + 1}</span>
              )}
            </div>
            {ex.videoUrl && (
              <Video className="h-3 w-3 text-gray-400 dark:text-dark-300" />
            )}
          </button>
        );
      })}
    </div>
  );
}

