import { useState, useEffect } from "react";
import {
  ClockIcon,
  ForwardIcon,
} from "@heroicons/react/24/outline";

import { Button, Progress } from "@/components/ui";

interface RestTimerProps {
  seconds: number;
  onComplete: () => void;
}

export function RestTimer({ seconds, onComplete }: RestTimerProps) {
  const [remaining, setRemaining] = useState(seconds);

  useEffect(() => {
    if (remaining <= 0) {
      onComplete();
      return;
    }
    const interval = setInterval(() => setRemaining((r) => r - 1), 1000);
    return () => clearInterval(interval);
  }, [remaining, onComplete]);

  const progress = ((seconds - remaining) / seconds) * 100;

  return (
    <div className="rounded-xl border border-primary-500/30 bg-primary-500/5 p-4 text-center">
      <div className="mb-2 flex items-center justify-center gap-2 text-sm font-medium text-primary-600 dark:text-primary-400">
        <ClockIcon className="h-4 w-4" />
        Descanso
      </div>
      <p className="text-3xl font-semibold tabular-nums text-gray-900 dark:text-dark-50">
        {Math.floor(remaining / 60)}:
        {String(remaining % 60).padStart(2, "0")}
      </p>
      <div className="mt-3">
        <Progress value={progress} color="primary" />
      </div>
      <Button
        variant="flat"
        color="neutral"
        size="sm"
        className="mt-3 inline-flex items-center gap-1 text-xs text-gray-500 dark:text-dark-300"
        onClick={onComplete}
      >
        <ForwardIcon className="h-3.5 w-3.5" />
        Pular descanso
      </Button>
    </div>
  );
}

