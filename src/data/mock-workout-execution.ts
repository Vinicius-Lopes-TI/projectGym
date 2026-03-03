export interface WorkoutExercise {
  id: string;
  name: string;
  sets: number;
  reps: string;
  restSeconds: number;
  executionType:
    | "Normal"
    | "Drop-set"
    | "Bi-set"
    | "Tri-set"
    | "Rest-pause"
    | "Set 21";
  groupId: number | null;
  videoUrl: string;
  observations: string;
}

export interface SetLog {
  setNumber: number;
  weight: number | null;
  completed: boolean;
}

export interface ExerciseLog {
  exerciseId: string;
  sets: SetLog[];
}

export interface WorkoutSession {
  workoutName: string;
  studentName: string;
  date: string;
  exercises: WorkoutExercise[];
}

export const mockWorkoutSession: WorkoutSession = {
  workoutName: "Treino A – Peito e Tríceps",
  studentName: "Carlos Eduardo Silva",
  date: new Date().toLocaleDateString("pt-BR"),
  exercises: [
    {
      id: "e1",
      name: "Supino reto com barra",
      sets: 4,
      reps: "10-12",
      restSeconds: 90,
      executionType: "Normal",
      groupId: null,
      videoUrl: "https://www.youtube.com/embed/rT7DgCr-3pg",
      observations: "Manter escápulas retraídas. Descer a barra até o peito.",
    },
    {
      id: "e2",
      name: "Supino inclinado com halteres",
      sets: 4,
      reps: "12",
      restSeconds: 60,
      executionType: "Normal",
      groupId: null,
      videoUrl: "https://www.youtube.com/embed/8iPEnn-ltC8",
      observations: "Ângulo de 30-45 graus.",
    },
    {
      id: "e3",
      name: "Crucifixo inclinado",
      sets: 3,
      reps: "12",
      restSeconds: 60,
      executionType: "Bi-set",
      groupId: 1,
      videoUrl: "https://www.youtube.com/embed/eozdVDA78K0",
      observations: "Bi-set com peck deck.",
    },
    {
      id: "e4",
      name: "Peck deck",
      sets: 3,
      reps: "12",
      restSeconds: 60,
      executionType: "Bi-set",
      groupId: 1,
      videoUrl: "https://www.youtube.com/embed/Iwe6AmxVf7o",
      observations: "Manter cotovelos levemente flexionados.",
    },
    {
      id: "e5",
      name: "Tríceps pulley corda",
      sets: 4,
      reps: "12-15",
      restSeconds: 45,
      executionType: "Drop-set",
      groupId: null,
      videoUrl: "https://www.youtube.com/embed/2-LAMcpzODU",
      observations:
        "Última série com drop-set. Abrir a corda na contração.",
    },
    {
      id: "e6",
      name: "Tríceps francês com halter",
      sets: 3,
      reps: "12",
      restSeconds: 60,
      executionType: "Normal",
      groupId: null,
      videoUrl: "https://www.youtube.com/embed/ir5PsbniVSc",
      observations: "Cuidar com a posição dos cotovelos.",
    },
  ],
};

