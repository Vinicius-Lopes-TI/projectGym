import {
  SparklesIcon,
  ClockIcon,
  BoltIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/outline";

import { Button, Card } from "@/components/ui";

interface WorkoutCompleteProps {
  totalTime: string;
  totalExercises: number;
  onFinish: () => void;
}

export function WorkoutComplete({
  totalTime,
  totalExercises,
  onFinish,
}: WorkoutCompleteProps) {
  return (
    <div className="flex min-h-[60vh] items-center justify-center px-4">
      <Card className="w-full max-w-sm border border-gray-200 bg-white p-6 text-center shadow-lg dark:border-dark-600 dark:bg-dark-700">
        <div className="flex flex-col items-center gap-4">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary-500/10">
            <SparklesIcon className="h-10 w-10 text-primary-500" />
          </div>
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-dark-50">
              Treino finalizado!
            </h2>
            <p className="mt-1 text-sm text-gray-500 dark:text-dark-300">
              Parabéns, você completou todos os exercícios deste treino.
            </p>
          </div>

          <div className="mt-2 flex gap-6">
            <div className="flex flex-col items-center gap-1">
              <ClockIcon className="h-5 w-5 text-gray-400 dark:text-dark-300" />
              <span className="text-lg font-semibold text-gray-900 dark:text-dark-50">
                {totalTime}
              </span>
              <span className="text-xs text-gray-500 dark:text-dark-300">
                Tempo total
              </span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <BoltIcon className="h-5 w-5 text-gray-400 dark:text-dark-300" />
              <span className="text-lg font-semibold text-gray-900 dark:text-dark-50">
                {totalExercises}
              </span>
              <span className="text-xs text-gray-500 dark:text-dark-300">
                Exercícios
              </span>
            </div>
          </div>

          <Button
            color="primary"
            variant="filled"
            className="mt-4 w-full inline-flex items-center justify-center gap-2"
            onClick={onFinish}
          >
            <CheckCircleIcon className="h-5 w-5" />
            Concluir treino
          </Button>
        </div>
      </Card>
    </div>
  );
}

