export interface StudentRestriction {
  type: string;
  severity: "low" | "medium" | "high";
  description: string;
}

export interface StudentHealth {
  conditions: string[];
  habits: {
    smokes: boolean;
    drinks: boolean;
    hasFainted: boolean;
    sleepHours: number;
  };
  medications: string[];
  surgeries: string[];
}

export interface Student {
  id: string;
  name: string;
  age: number;
  experience: "Iniciante" | "Intermediário" | "Avançado";
  restrictions: StudentRestriction[];
  health: StudentHealth;
  observations: string;
  hasAlert: boolean;
  avatarInitials: string;
  lastUpdate: string;
}

export const RESTRICTION_TYPES = [
  "Joelho",
  "Ombro",
  "Coluna",
  "Hipertensão",
  "Cardíaco",
  "Diabetes",
  "Asma",
  "Hérnia",
] as const;

export const EXPERIENCE_LEVELS = ["Iniciante", "Intermediário", "Avançado"] as const;

export const mockStudents: Student[] = [
  {
    id: "1",
    name: "Carlos Eduardo Silva",
    age: 34,
    experience: "Intermediário",
    restrictions: [
      { type: "Joelho", severity: "high", description: "Lesão no ligamento cruzado anterior (LCA) — operado há 2 anos. Evitar impacto e torção." },
      { type: "Coluna", severity: "medium", description: "Hérnia de disco L4-L5. Evitar carga axial pesada." },
    ],
    health: {
      conditions: ["Hérnia de disco L4-L5", "Pós-operatório LCA joelho direito"],
      habits: { smokes: false, drinks: true, hasFainted: false, sleepHours: 7 },
      medications: ["Anti-inflamatório (uso esporádico)"],
      surgeries: ["Artroscopia joelho direito (2024)"],
    },
    observations: "Aluno dedicado mas precisa de atenção especial nas cargas de membros inferiores. Liberado pelo ortopedista para treino moderado.",
    hasAlert: false,
    avatarInitials: "CS",
    lastUpdate: "2026-02-20",
  },
  {
    id: "2",
    name: "Maria Fernanda Oliveira",
    age: 52,
    experience: "Iniciante",
    restrictions: [
      { type: "Cardíaco", severity: "high", description: "Arritmia cardíaca controlada com medicação. Monitorar FC constantemente." },
      { type: "Hipertensão", severity: "high", description: "Hipertensão estágio 2. Evitar exercícios isométricos prolongados." },
      { type: "Joelho", severity: "low", description: "Artrose leve no joelho esquerdo." },
    ],
    health: {
      conditions: ["Arritmia cardíaca", "Hipertensão estágio 2", "Artrose joelho esquerdo"],
      habits: { smokes: false, drinks: false, hasFainted: true, sleepHours: 6 },
      medications: ["Losartana 50mg", "Amiodarona 200mg", "AAS infantil"],
      surgeries: [],
    },
    observations: "Paciente encaminhada pelo cardiologista. Já teve episódio de desmaio durante atividade intensa. Treinar com FC máx de 130bpm.",
    hasAlert: true,
    avatarInitials: "MO",
    lastUpdate: "2026-02-25",
  },
  {
    id: "3",
    name: "João Pedro Santos",
    age: 22,
    experience: "Avançado",
    restrictions: [
      { type: "Ombro", severity: "medium", description: "Tendinite no supraespinhal direito. Evitar abdução acima de 90° com carga." },
    ],
    health: {
      conditions: ["Tendinite supraespinhal"],
      habits: { smokes: false, drinks: true, hasFainted: false, sleepHours: 8 },
      medications: [],
      surgeries: [],
    },
    observations: "Atleta de crossfit em transição para musculação. Forte, mas com lesão por overtraining no ombro.",
    hasAlert: false,
    avatarInitials: "JS",
    lastUpdate: "2026-02-22",
  },
  {
    id: "4",
    name: "Ana Beatriz Rocha",
    age: 45,
    experience: "Intermediário",
    restrictions: [
      { type: "Diabetes", severity: "medium", description: "Diabetes tipo 2 controlada. Manter lanche pré-treino obrigatório." },
      { type: "Coluna", severity: "low", description: "Lordose acentuada. Fortalecer core." },
    ],
    health: {
      conditions: ["Diabetes tipo 2", "Lordose acentuada"],
      habits: { smokes: false, drinks: false, hasFainted: false, sleepHours: 7 },
      medications: ["Metformina 850mg"],
      surgeries: [],
    },
    observations: "Aluna disciplinada, treina 4x/semana. Precisa de lanche antes do treino para evitar hipoglicemia.",
    hasAlert: false,
    avatarInitials: "AR",
    lastUpdate: "2026-02-18",
  },
  {
    id: "5",
    name: "Roberto Mendes Filho",
    age: 67,
    experience: "Iniciante",
    restrictions: [
      { type: "Cardíaco", severity: "high", description: "Infarto há 1 ano. Liberado para atividade leve pelo cardiologista." },
      { type: "Hipertensão", severity: "high", description: "Pressão alta controlada. Evitar Valsalva." },
      { type: "Joelho", severity: "medium", description: "Prótese no joelho direito. Sem impacto." },
      { type: "Asma", severity: "low", description: "Asma leve. Levar bombinha para o treino." },
    ],
    health: {
      conditions: ["Pós-infarto", "Hipertensão", "Prótese joelho direito", "Asma leve"],
      habits: { smokes: false, drinks: false, hasFainted: true, sleepHours: 6 },
      medications: ["Atenolol 50mg", "AAS 100mg", "Sinvastatina 20mg", "Losartana 50mg"],
      surgeries: ["Angioplastia (2025)", "Artroplastia joelho direito (2023)"],
    },
    observations: "ATENÇÃO MÁXIMA. Paciente de alto risco cardiovascular. Treino supervisionado obrigatório. FC máx: 110bpm. Evitar esforço intenso.",
    hasAlert: true,
    avatarInitials: "RM",
    lastUpdate: "2026-02-26",
  },
  {
    id: "6",
    name: "Juliana Costa Pereira",
    age: 28,
    experience: "Avançado",
    restrictions: [
      { type: "Hérnia", severity: "medium", description: "Hérnia inguinal operada há 6 meses. Evitar pressão intra-abdominal excessiva." },
    ],
    health: {
      conditions: ["Pós-operatório hérnia inguinal"],
      habits: { smokes: false, drinks: true, hasFainted: false, sleepHours: 8 },
      medications: [],
      surgeries: ["Herniorrafia inguinal (2025)"],
    },
    observations: "Atleta competitiva de powerlifting. Retornando aos treinos progressivamente após cirurgia.",
    hasAlert: false,
    avatarInitials: "JP",
    lastUpdate: "2026-02-24",
  },
];
