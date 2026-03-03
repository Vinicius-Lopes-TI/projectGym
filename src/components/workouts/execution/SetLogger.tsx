import { Input } from "@/components/ui/Form";
import { Badge } from "@/components/ui";
import type { SetLog } from "@/data/mock-workout-execution";

interface SetLoggerProps {
  sets: SetLog[];
  disabled: boolean;
  onUpdateWeight: (setNumber: number, weight: number) => void;
  onToggleComplete: (setNumber: number) => void;
}

export function SetLogger({
  sets,
  disabled,
  onUpdateWeight,
  onToggleComplete,
}: SetLoggerProps) {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-dark-300">
          Registro de carga
        </span>
        <Badge variant="soft" color="neutral" className="text-[11px]">
          Toque em “OK” para marcar a série concluída
        </Badge>
      </div>

      <div className="space-y-2">
        {sets.map((set) => (
          <button
            key={set.setNumber}
            type="button"
            onClick={() => !disabled && onToggleComplete(set.setNumber)}
            className={`flex w-full items-center gap-3 rounded-lg border px-3 py-2 text-left transition-colors ${
              set.completed
                ? "border-primary-500/40 bg-primary-500/5"
                : "border-gray-200 bg-white hover:bg-gray-50 dark:border-dark-500 dark:bg-dark-700 dark:hover:bg-dark-650"
            }`}
          >
            <span className="w-16 text-xs font-medium text-gray-500 dark:text-dark-300">
              Série {set.setNumber}
            </span>
            <div className="flex flex-1 items-center gap-2">
              <Input
                type="number"
                placeholder="kg"
                className="h-8 w-20 text-center"
                disabled={disabled || set.completed}
                value={set.weight ?? ""}
                onChange={(e) =>
                  onUpdateWeight(set.setNumber, parseFloat(e.target.value) || 0)
                }
              />
              <span className="text-xs text-gray-400 dark:text-dark-300">kg</span>
            </div>
            <span
              className={`text-xs font-semibold ${
                set.completed
                  ? "text-primary-600 dark:text-primary-400"
                  : "text-gray-400 dark:text-dark-300"
              }`}
            >
              OK
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

