import { useState, useRef, useCallback } from "react";
import { useNavigate, useParams } from "react-router";
import {
  ArrowLeftIcon,
  PlusIcon,
  XMarkIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/outline";

import { Page } from "@/components/shared/Page";
import { Button, Card } from "@/components/ui";
import { Input, Select, Switch, Textarea } from "@/components/ui/Form";
import { mockStudents } from "@/data/mock-students";
import {
  DIVISION_TYPES,
  createEmptyExercise,
  mockExercises,
  type Exercise,
} from "@/data/mock-workout";
import { ExerciseCard } from "@/components/workouts/ExerciseCard";

export default function NewWorkoutPage() {
  const { studentId: routeStudentId } = useParams();
  const navigate = useNavigate();

  const [studentId, setStudentId] = useState(routeStudentId || "");
  const [workoutName, setWorkoutName] = useState("");
  const [division, setDivision] = useState("A");
  const [startDate, setStartDate] = useState<string>(() =>
    new Date().toISOString().slice(0, 10),
  );
  const [active, setActive] = useState(true);
  const [notes, setNotes] = useState("");
  const [exercises, setExercises] = useState<Exercise[]>(mockExercises);

  const bottomRef = useRef<HTMLDivElement>(null);

  const handleAddExercise = useCallback(() => {
    const next = createEmptyExercise();
    setExercises((prev) => [...prev, next]);
    setTimeout(() => bottomRef.current?.scrollIntoView({ behavior: "smooth" }), 100);
  }, []);

  const handleRemoveExercise = useCallback((id: string) => {
    setExercises((prev) => prev.filter((e) => e.id !== id));
  }, []);

  const handleUpdateExercise = useCallback(
    (id: string, field: keyof Exercise, value: string | number) => {
      setExercises((prev) =>
        prev.map((e) => {
          if (e.id !== id) return e;
          const updated = { ...e, [field]: value };
          if (
            field === "executionType" &&
            value !== "Bi-set" &&
            value !== "Tri-set"
          ) {
            updated.groupId = null;
          }
          if (
            field === "executionType" &&
            (value === "Bi-set" || value === "Tri-set") &&
            !e.groupId
          ) {
            updated.groupId = 1;
          }
          return updated;
        }),
      );
    },
    [],
  );

  const handleMoveUp = useCallback((index: number) => {
    if (index === 0) return;
    setExercises((prev) => {
      const arr = [...prev];
      [arr[index - 1], arr[index]] = [arr[index], arr[index - 1]];
      return arr;
    });
  }, []);

  const handleMoveDown = useCallback((index: number) => {
    setExercises((prev) => {
      if (index >= prev.length - 1) return prev;
      const arr = [...prev];
      [arr[index + 1], arr[index]] = [arr[index], arr[index + 1]];
      return arr;
    });
  }, []);

  const handleSave = () => {
    const workout = {
      name: workoutName,
      division,
      startDate,
      active,
      studentId,
      notes,
      exercises,
    };
    // For now we just log; integration can be added later.
    // eslint-disable-next-line no-console
    console.log("Workout created:", workout);
    navigate("/students");
  };

  return (
    <Page title="Novo Treino">
      <div className="min-h-100vh">
        <header className="border-b border-gray-200 bg-white dark:border-dark-600 dark:bg-dark-700">
          <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-3">
              <Button
                variant="flat"
                color="neutral"
                isIcon
                onClick={() => navigate("/students")}
              >
                <ArrowLeftIcon className="h-5 w-5" />
              </Button>
              <div>
                <h1 className="text-lg font-semibold text-gray-800 dark:text-dark-50">
                  Cadastrar Treino
                </h1>
                <p className="text-xs text-gray-400 dark:text-dark-300">
                  Monte o plano de treino personalizado do aluno
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Select
                label="Aluno"
                value={studentId}
                onChange={(e) => setStudentId(e.target.value)}
                className="min-w-[160px]"
                data={[
                  { value: "", label: "Selecione" },
                  ...mockStudents.map((s) => ({
                    value: s.id,
                    label: s.name.split(" ").slice(0, 2).join(" "),
                  })),
                ]}
              />
            </div>
          </div>
        </header>

        <main className="mx-auto max-w-5xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="grid gap-6 lg:grid-cols-[minmax(0,2fr),minmax(0,1.1fr)]">
            <div className="space-y-4">
              <Card className="p-4 sm:p-5">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="md:col-span-2">
                    <Input
                      label="Nome do treino"
                      placeholder="Ex: Treino A – Peito e Tríceps"
                      value={workoutName}
                      onChange={(e) => setWorkoutName(e.target.value)}
                    />
                  </div>

                  <Select
                    label="Divisão"
                    value={division}
                    onChange={(e) => setDivision(e.target.value)}
                    data={DIVISION_TYPES.map((d) => ({
                      value: d.value,
                      label: d.label,
                    }))}
                  />

                  <Input
                    label="Data de início"
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                  />

                  <div className="md:col-span-2 flex items-center justify-between rounded-lg border border-gray-200 px-3 py-3 dark:border-dark-500">
                    <div>
                      <p className="text-sm font-medium text-gray-800 dark:text-dark-50">
                        Status do treino
                      </p>
                      <p className="text-xs text-gray-400 dark:text-dark-300">
                        {active ? "Treino ativo para o aluno" : "Treino inativo"}
                      </p>
                    </div>
                    <Switch
                      checked={active}
                      onChange={(e) => setActive(e.target.checked)}
                      color="success"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <Textarea
                      label="Observações gerais"
                      placeholder="Notas adicionais sobre o treino, frequência, cuidados, etc."
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      className="min-h-[80px]"
                    />
                  </div>
                </div>
              </Card>

              <div className="flex items-center justify-between">
                <h2 className="text-sm font-semibold text-gray-800 dark:text-dark-50">
                  Exercícios ({exercises.length})
                </h2>
                <Button
                  color="primary"
                  variant="soft"
                  onClick={handleAddExercise}
                  className="inline-flex items-center gap-1.5"
                >
                  <PlusIcon className="h-4 w-4" />
                  Adicionar exercício
                </Button>
              </div>

              <div className="space-y-4">
                {exercises.length === 0 && (
                  <Card className="border-dashed border-2 p-6 text-center text-sm text-gray-400 dark:text-dark-300">
                    Nenhum exercício adicionado ainda.
                  </Card>
                )}

                {exercises.map((exercise, idx) => (
                  <ExerciseCard
                    key={exercise.id}
                    exercise={exercise}
                    index={idx}
                    total={exercises.length}
                    onUpdate={handleUpdateExercise}
                    onRemove={handleRemoveExercise}
                    onMoveUp={handleMoveUp}
                    onMoveDown={handleMoveDown}
                  />
                ))}
                <div ref={bottomRef} />
              </div>
            </div>

            <div className="space-y-4">
              <Card className="p-4 sm:p-5">
                <h3 className="mb-3 text-sm font-semibold text-gray-800 dark:text-dark-50">
                  Resumo rápido
                </h3>
                <dl className="space-y-2 text-sm">
                  <div className="flex items-center justify-between">
                    <dt className="text-gray-400 dark:text-dark-300">Aluno</dt>
                    <dd className="font-medium text-gray-800 dark:text-dark-50">
                      {studentId
                        ? mockStudents.find((s) => s.id === studentId)?.name ??
                          "Selecionado"
                        : "Não selecionado"}
                    </dd>
                  </div>
                  <div className="flex items-center justify-between">
                    <dt className="text-gray-400 dark:text-dark-300">Divisão</dt>
                    <dd className="font-medium text-gray-800 dark:text-dark-50">
                      {division || "-"}
                    </dd>
                  </div>
                  <div className="flex items-center justify-between">
                    <dt className="text-gray-400 dark:text-dark-300">
                      Início previsto
                    </dt>
                    <dd className="font-medium text-gray-800 dark:text-dark-50">
                      {startDate || "-"}
                    </dd>
                  </div>
                  <div className="flex items-center justify-between">
                    <dt className="text-gray-400 dark:text-dark-300">Status</dt>
                    <dd className="font-medium text-gray-800 dark:text-dark-50">
                      {active ? "Ativo" : "Inativo"}
                    </dd>
                  </div>
                  <div className="flex items-center justify-between">
                    <dt className="text-gray-400 dark:text-dark-300">
                      Exercícios
                    </dt>
                    <dd className="font-medium text-gray-800 dark:text-dark-50">
                      {exercises.length}
                    </dd>
                  </div>
                </dl>
              </Card>

              <div className="flex gap-3">
                <Button
                  className="flex-1"
                  color="primary"
                  variant="filled"
                  onClick={handleSave}
                >
                  <CheckCircleIcon className="mr-2 h-4 w-4" />
                  Salvar treino
                </Button>
                <Button
                  className="flex-1"
                  color="neutral"
                  variant="outlined"
                  onClick={() => navigate("/students")}
                >
                  <XMarkIcon className="mr-2 h-4 w-4" />
                  Cancelar
                </Button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </Page>
  );
}

