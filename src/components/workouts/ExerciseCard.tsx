import {
  Trash2,
  ChevronUp,
  ChevronDown,
  GripVertical,
  Link as LinkIcon,
} from "lucide-react";
import { Card, Input, Textarea, Select } from "@/components/ui";
import type { Exercise } from "@/data/mock-workout";

const EXECUTION_TYPES = [
  { value: "Normal", label: "Normal" },
  { value: "Drop-set", label: "Drop-set" },
  { value: "Bi-set", label: "Bi-set" },
  { value: "Tri-set", label: "Tri-set" },
  { value: "Rest-pause", label: "Rest-pause" },
  { value: "Set 21", label: "Set 21" },
] as const;

const GROUP_COLORS: Record<number, string> = {
  1: "border-l-primary-500",
  2: "border-l-success-500",
  3: "border-l-warning-500",
  4: "border-l-info-500",
  5: "border-l-secondary-500",
};

const GROUP_BG: Record<number, string> = {
  1: "bg-primary-500/5",
  2: "bg-success-500/5",
  3: "bg-warning-500/5",
  4: "bg-info-500/5",
  5: "bg-secondary-500/5",
};

interface ExerciseCardProps {
  exercise: Exercise;
  index: number;
  total: number;
  onUpdate: (id: string, field: keyof Exercise, value: string | number) => void;
  onRemove: (id: string) => void;
  onMoveUp: (index: number) => void;
  onMoveDown: (index: number) => void;
}

export function ExerciseCard({
  exercise,
  index,
  total,
  onUpdate,
  onRemove,
  onMoveUp,
  onMoveDown,
}: ExerciseCardProps) {
  const needsGroup =
    exercise.executionType === "Bi-set" || exercise.executionType === "Tri-set";
  const groupColor =
    exercise.groupId && GROUP_COLORS[exercise.groupId]
      ? GROUP_COLORS[exercise.groupId]
      : "";
  const groupBg =
    exercise.groupId && GROUP_BG[exercise.groupId] ? GROUP_BG[exercise.groupId] : "";

  return (
    <Card
      className={`relative p-4 pt-5 transition-shadow border-l-4 ${groupColor || "border-l-transparent"} ${groupBg}`}
    >
      {exercise.groupId && (
        <div className="absolute -top-2.5 left-4 rounded-full bg-primary-500 px-2.5 py-0.5 text-[10px] font-semibold text-white shadow-sm">
          Grupo {exercise.groupId}
        </div>
      )}

      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-1.5 text-gray-500 dark:text-dark-300">
          <GripVertical className="h-4 w-4" />
          <span className="text-sm font-semibold">#{index + 1}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            className="btn btn-flat btn-xs text-gray-500 disabled:opacity-40"
            disabled={index === 0}
            onClick={() => onMoveUp(index)}
          >
            <ChevronUp className="h-4 w-4" />
          </button>
          <button
            type="button"
            className="btn btn-flat btn-xs text-gray-500 disabled:opacity-40"
            disabled={index === total - 1}
            onClick={() => onMoveDown(index)}
          >
            <ChevronDown className="h-4 w-4" />
          </button>
          <button
            type="button"
            className="btn btn-flat btn-xs text-error hover:text-error-dark"
            onClick={() => onRemove(exercise.id)}
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="grid gap-3 md:grid-cols-3">
        <div className="md:col-span-3">
          <Input
            label="Nome do exercício"
            placeholder="Ex: Supino reto com barra"
            value={exercise.name}
            onChange={(e) => onUpdate(exercise.id, "name", e.target.value)}
          />
        </div>

        <Input
          type="number"
          label="Séries"
          min={1}
          placeholder="4"
          value={exercise.sets || ""}
          onChange={(e) => onUpdate(exercise.id, "sets", Number(e.target.value))}
        />

        <Input
          label="Repetições"
          placeholder="12"
          value={exercise.reps}
          onChange={(e) => onUpdate(exercise.id, "reps", e.target.value)}
        />

        <Input
          type="number"
          label="Descanso (s)"
          min={0}
          placeholder="60"
          value={exercise.restSeconds || ""}
          onChange={(e) =>
            onUpdate(exercise.id, "restSeconds", Number(e.target.value))
          }
        />
      </div>

      <div className="mt-3 grid gap-3 md:grid-cols-2">
        <Select
          label="Tipo de execução"
          value={exercise.executionType}
          onChange={(e) => onUpdate(exercise.id, "executionType", e.target.value)}
          data={EXECUTION_TYPES.map((t) => ({
            value: t.value,
            label: t.label,
          }))}
        />

        {needsGroup && (
          <Select
            label="Grupo"
            value={String(exercise.groupId || 1)}
            onChange={(e) =>
              onUpdate(exercise.id, "groupId", Number(e.target.value))
            }
            data={[1, 2, 3, 4, 5].map((g) => ({
              value: String(g),
              label: `Grupo ${g}`,
            }))}
          />
        )}
      </div>

      <div className="mt-3 grid gap-3 md:grid-cols-2">
        <Input
          type="url"
          label={
            <span className="inline-flex items-center gap-1">
              <LinkIcon className="h-3 w-3" />
              Link de vídeo
            </span>
          }
          placeholder="https://youtube.com/..."
          value={exercise.videoUrl}
          onChange={(e) => onUpdate(exercise.id, "videoUrl", e.target.value)}
        />

        <Textarea
          label="Observações"
          placeholder="Atenção à execução, amplitude..."
          className="min-h-[60px]"
          value={exercise.observations}
          onChange={(e) =>
            onUpdate(exercise.id, "observations", e.target.value)
          }
        />
      </div>
    </Card>
  );
}

