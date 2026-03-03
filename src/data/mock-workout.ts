export interface Exercise {
  id: string;
  name: string;
  sets: number;
  reps: string;
  restSeconds: number;
  executionType: string;
  groupId: number | null;
  videoUrl: string;
  observations: string;
}

export interface Workout {
  name: string;
  division: string;
  startDate: Date | undefined;
  active: boolean;
  studentId: string;
  exercises: Exercise[];
}

export const DIVISION_TYPES = [
  { value: "A", label: "A" },
  { value: "B", label: "B" },
  { value: "C", label: "C" },
  { value: "D", label: "D" },
  { value: "ABC", label: "ABC" },
  { value: "ABCD", label: "ABCD" },
  { value: "Full Body", label: "Full Body" },
] as const;

export const createEmptyExercise = (): Exercise => ({
  id: crypto.randomUUID(),
  name: "",
  sets: 4,
  reps: "12",
  restSeconds: 60,
  executionType: "Normal",
  groupId: null,
  videoUrl: "",
  observations: "",
});

export const mockExercises: Exercise[] = [
  {
    id: "ex1",
    name: "Supino reto com barra",
    sets: 4,
    reps: "10-12",
    restSeconds: 90,
    executionType: "Normal",
    groupId: null,
    videoUrl: "",
    observations: "Manter escápulas retraídas",
  },
  {
    id: "ex2",
    name: "Crucifixo inclinado",
    sets: 3,
    reps: "12",
    restSeconds: 60,
    executionType: "Bi-set",
    groupId: 1,
    videoUrl: "",
    observations: "",
  },
  {
    id: "ex3",
    name: "Peck deck",
    sets: 3,
    reps: "12",
    restSeconds: 60,
    executionType: "Bi-set",
    groupId: 1,
    videoUrl: "",
    observations: "Bi-set com crucifixo",
  },
];

