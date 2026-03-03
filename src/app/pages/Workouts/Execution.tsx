import {
  useState,
  useCallback,
  useEffect,
  useMemo,
} from "react";
import { useNavigate } from "react-router";
import {
  ArrowLeftIcon,
  PlayIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/outline";

import { Page } from "@/components/shared/Page";
import { Button, Card, Badge, Progress } from "@/components/ui";
import {
  mockWorkoutSession,
  type SetLog,
  type ExerciseLog,
} from "@/data/mock-workout-execution";
import { VideoPlayer } from "@/components/workouts/execution/VideoPlayer";
import { FocusMode } from "@/components/workouts/execution/FocusMode";
import { SetLogger } from "@/components/workouts/execution/SetLogger";
import { RestTimer } from "@/components/workouts/execution/RestTimer";
import { ExerciseSidebar } from "@/components/workouts/execution/ExerciseSidebar";
import { WorkoutComplete } from "@/components/workouts/execution/WorkoutComplete";

export default function WorkoutExecutionPage() {
  const navigate = useNavigate();
  const { exercises, workoutName, date } = mockWorkoutSession;

  const [started, setStarted] = useState(false);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [focusMode, setFocusMode] = useState(false);
  const [showRest, setShowRest] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);

  const [logs, setLogs] = useState<ExerciseLog[]>(() =>
    exercises.map((ex) => ({
      exerciseId: ex.id,
      sets: Array.from({ length: ex.sets }, (_, i): SetLog => ({
        setNumber: i + 1,
        weight: null,
        completed: false,
      })),
    })),
  );

  const currentExercise = exercises[currentIdx];
  const currentLog = logs[currentIdx];

  useEffect(() => {
    if (!started || completed) return;
    const interval = setInterval(
      () => setElapsedSeconds((s) => s + 1),
      1000,
    );
    return () => clearInterval(interval);
  }, [started, completed]);

  const formatTime = (s: number) =>
    `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(
      2,
      "0",
    )}`;

  const completedIds = useMemo(() => {
    const ids = new Set<string>();
    logs.forEach((log) => {
      if (log.sets.every((s) => s.completed)) {
        ids.add(log.exerciseId);
      }
    });
    return ids;
  }, [logs]);

  const progressPercent = (completedIds.size / exercises.length) * 100;

  const handleUpdateWeight = useCallback(
    (setNumber: number, weight: number) => {
      setLogs((prev) =>
        prev.map((log, i) =>
          i !== currentIdx
            ? log
            : {
                ...log,
                sets: log.sets.map((s) =>
                  s.setNumber === setNumber ? { ...s, weight } : s,
                ),
              },
        ),
      );
    },
    [currentIdx],
  );

  const handleToggleComplete = useCallback(
    (setNumber: number) => {
      setLogs((prev) =>
        prev.map((log, i) => {
          if (i !== currentIdx) return log;
          const newSets = log.sets.map((s) =>
            s.setNumber === setNumber
              ? { ...s, completed: !s.completed }
              : s,
          );
          return { ...log, sets: newSets };
        }),
      );

      const currentSet = currentLog.sets.find(
        (s) => s.setNumber === setNumber,
      );
      if (currentSet && !currentSet.completed) {
        setShowRest(true);
      }
    },
    [currentIdx, currentLog],
  );

  const handleNav = useCallback(
    (dir: -1 | 1) => {
      const next = currentIdx + dir;
      if (next < 0 || next >= exercises.length) return;
      setCurrentIdx(next);
      setShowRest(false);
    },
    [currentIdx, exercises.length],
  );

  const handleFinish = () => {
    const result = {
      workout: workoutName,
      date,
      totalTime: formatTime(elapsedSeconds),
      logs,
    };
    // eslint-disable-next-line no-console
    console.log("Workout finished:", result);
    navigate("/students");
  };

  useEffect(() => {
    if (started && completedIds.size === exercises.length) {
      setCompleted(true);
    }
  }, [started, completedIds.size, exercises.length]);

  if (completed) {
    return (
      <Page title="Execução de treino">
        <WorkoutComplete
          totalTime={formatTime(elapsedSeconds)}
          totalExercises={exercises.length}
          onFinish={handleFinish}
        />
      </Page>
    );
  }

  return (
    <Page title="Execução de treino">
      <div className="min-h-100vh bg-gray-50 dark:bg-dark-800">
        {focusMode && currentExercise && (
          <FocusMode
            exercise={currentExercise}
            onClose={() => setFocusMode(false)}
          />
        )}

        <header className="border-b border-gray-200 bg-white/95 backdrop-blur dark:border-dark-600 dark:bg-dark-700/95">
          <div className="mx-auto flex max-w-5xl items-center gap-3 px-4 py-3 sm:px-6 lg:px-8">
            <Button
              variant="flat"
              color="neutral"
              isIcon
              onClick={() => navigate("/students")}
            >
              <ArrowLeftIcon className="h-5 w-5" />
            </Button>
            <div className="min-w-0 flex-1">
              <h1 className="truncate text-sm font-semibold text-gray-800 dark:text-dark-50">
                {workoutName}
              </h1>
              <p className="text-xs text-gray-400 dark:text-dark-300">
                {date}
              </p>
            </div>
            {started && (
              <span className="rounded-md bg-primary-500/10 px-2 py-1 text-xs font-semibold tabular-nums text-primary-600 dark:text-primary-400">
                {formatTime(elapsedSeconds)}
              </span>
            )}
          </div>
          {started && (
            <Progress
              value={progressPercent}
              color="primary"
              className="h-1 rounded-none"
            />
          )}
        </header>

        <main className="mx-auto max-w-5xl px-4 py-4 sm:px-6 lg:px-8">
          {!started && (
            <div className="mb-6 flex flex-col items-center gap-3 rounded-lg border border-dashed border-gray-300 bg-white px-6 py-8 text-center dark:border-dark-600 dark:bg-dark-700">
              <p className="text-sm text-gray-500 dark:text-dark-300">
                Pronto para iniciar o treino?
              </p>
              <Button
                color="primary"
                variant="filled"
                className="inline-flex items-center gap-2 px-8"
                onClick={() => {
                  setStarted(true);
                }}
              >
                <PlayIcon className="h-5 w-5" />
                Iniciar treino
              </Button>
            </div>
          )}

          <ExerciseSidebar
            exercises={exercises}
            currentIndex={currentIdx}
            completedIds={completedIds}
            onSelect={(i) => {
              setCurrentIdx(i);
              setShowRest(false);
            }}
          />

          <div className="mt-4 space-y-4">
            <VideoPlayer
              videoUrl={currentExercise.videoUrl}
              exerciseName={currentExercise.name}
              onFocusMode={() => setFocusMode(true)}
            />

            <Card className="p-4">
              <div className="flex items-start justify-between gap-2">
                <h2 className="text-base font-semibold text-gray-900 dark:text-dark-50">
                  {currentExercise.name}
                </h2>
                {(currentExercise.executionType === "Bi-set" ||
                  currentExercise.executionType === "Tri-set") && (
                  <Badge variant="soft" color="secondary" className="text-xs">
                    {currentExercise.executionType}
                  </Badge>
                )}
              </div>

              <div className="mt-2 flex flex-wrap gap-3 text-xs text-gray-500 dark:text-dark-300">
                <span>
                  <span className="font-semibold text-gray-800 dark:text-dark-50">
                    {currentExercise.sets}
                  </span>{" "}
                  séries
                </span>
                <span>
                  <span className="font-semibold text-gray-800 dark:text-dark-50">
                    {currentExercise.reps}
                  </span>{" "}
                  reps
                </span>
                <span>
                  <span className="font-semibold text-gray-800 dark:text-dark-50">
                    {currentExercise.restSeconds}s
                  </span>{" "}
                  descanso
                </span>
                {currentExercise.executionType !== "Normal" && (
                  <Badge
                    variant="outlined"
                    color="neutral"
                    className="text-[11px]"
                  >
                    {currentExercise.executionType}
                  </Badge>
                )}
              </div>

              {currentExercise.observations && (
                <p className="mt-3 rounded-md bg-gray-50 p-2 text-xs text-gray-500 dark:bg-dark-700 dark:text-dark-300">
                  {currentExercise.observations}
                </p>
              )}
            </Card>

            <SetLogger
              sets={currentLog.sets}
              disabled={!started}
              onUpdateWeight={handleUpdateWeight}
              onToggleComplete={handleToggleComplete}
            />

            {showRest && started && (
              <RestTimer
                seconds={currentExercise.restSeconds}
                onComplete={() => setShowRest(false)}
              />
            )}

            <div className="mt-4 flex gap-3 pb-6">
              <Button
                variant="outlined"
                color="neutral"
                className="flex-1 inline-flex items-center justify-center gap-1"
                disabled={currentIdx === 0}
                onClick={() => handleNav(-1)}
              >
                <ChevronLeftIcon className="h-4 w-4" />
                Anterior
              </Button>
              <Button
                color="primary"
                variant="filled"
                className="flex-1 inline-flex items-center justify-center gap-1"
                disabled={currentIdx === exercises.length - 1}
                onClick={() => handleNav(1)}
              >
                Próximo
                <ChevronRightIcon className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </main>
      </div>
    </Page>
  );
}

