import type {
  Club,
  Coach,
  CompetitionEvent,
  DashboardLink,
  EventTemplate,
  JudgeAssignment,
  Result,
  Swimmer,
} from "@/types";

export const mockClub: Club = {
  id: "club-1",
  name: "Asociación Ejemplo Club",
  status: "Verificado",
  city: "Paraná, Entre Ríos",
};

export const mockClubs: Club[] = [
  mockClub,
  {
    id: "club-2",
    name: "Talleres Natación",
    status: "Verificado",
    city: "Paraná, Entre Ríos",
  },
  {
    id: "club-3",
    name: "Náutico Paraná",
    status: "Pendiente",
    city: "Paraná, Entre Ríos",
  },
];

export const mockEventTemplates: EventTemplate[] = [
  { id: "tpl-400-free", label: "400 CC Libre" },
  { id: "tpl-200-free", label: "200 CC Libre" },
  { id: "tpl-100-free", label: "100 CC Libre" },
];

export const mockCoaches: Coach[] = [
  {
    id: "coach-1",
    clubId: mockClub.id,
    name: "María Pérez",
    roleLabel: "Entrenadora",
    active: true,
  },
  {
    id: "coach-2",
    clubId: mockClub.id,
    name: "Juan Gómez",
    roleLabel: "Entrenador",
    active: true,
  },
  {
    id: "coach-3",
    clubId: mockClub.id,
    name: "Lucía Díaz",
    roleLabel: "Entrenadora",
    active: false,
  },
  {
    id: "coach-4",
    clubId: "club-2",
    name: "Ceballos, Anahí",
    roleLabel: "Entrenadora",
    active: true,
  },
  {
    id: "coach-5",
    clubId: "club-3",
    name: "Retamar, Leiz",
    roleLabel: "Entrenador",
    active: true,
  },
];

export const mockSwimmers: Swimmer[] = [
  {
    id: "swimmer-1",
    clubId: mockClub.id,
    coachId: "coach-1",
    name: "Vogler, Paulina",
    category: "Mujeres 35-39",
    active: true,
  },
  {
    id: "swimmer-2",
    clubId: mockClub.id,
    coachId: "coach-1",
    name: "Rossi, María Carla",
    category: "Mujeres 40-44",
    active: true,
  },
  {
    id: "swimmer-3",
    clubId: mockClub.id,
    coachId: "coach-1",
    name: "Keller, Sofía María Gracia",
    category: "Mujeres 45-49",
    active: true,
  },
  {
    id: "swimmer-4",
    clubId: "club-2",
    coachId: "coach-4",
    name: "Brondo, Fiorella",
    category: "Mujeres 30-34",
    active: true,
  },
  {
    id: "swimmer-5",
    clubId: "club-2",
    coachId: "coach-4",
    name: "Gomez, Paula",
    category: "Mujeres 18-24",
    active: true,
  },
  {
    id: "swimmer-6",
    clubId: "club-2",
    coachId: "coach-4",
    name: "Burgos, Carolina",
    category: "Mujeres 25-29",
    active: true,
  },
  {
    id: "swimmer-7",
    clubId: "club-3",
    coachId: "coach-5",
    name: "Olivero, Aníbal",
    category: "Varones 30-34",
    active: true,
  },
  {
    id: "swimmer-8",
    clubId: "club-3",
    coachId: "coach-5",
    name: "Santamara, María Mercedes",
    category: "Mujeres 45-49",
    active: true,
  },
  {
    id: "swimmer-9",
    clubId: "club-3",
    coachId: "coach-5",
    name: "Mendieta, Josefa",
    category: "Mujeres 55-59",
    active: true,
  },
  {
    id: "swimmer-10",
    clubId: mockClub.id,
    coachId: "coach-2",
    name: "Mathieu, María",
    category: "Mujeres 70-74",
    active: true,
  },
];

export const mockResults: Result[] = [
  {
    id: "result-1",
    date: "13/09/2025",
    event: "400 CC Libre",
    swimmerId: "swimmer-1",
    time: "5:21,33",
    points: 9,
  },
  {
    id: "result-2",
    date: "13/09/2025",
    event: "400 CC Libre",
    swimmerId: "swimmer-2",
    time: "5:28,45",
    points: 9,
  },
  {
    id: "result-3",
    date: "13/09/2025",
    event: "400 CC Libre",
    swimmerId: "swimmer-3",
    time: "5:52,83",
    points: 9,
  },
  {
    id: "result-4",
    date: "13/09/2025",
    event: "400 CC Libre",
    swimmerId: "swimmer-4",
    time: "16:32,60",
    points: 6,
  },
  {
    id: "result-5",
    date: "13/09/2025",
    event: "400 CC Libre",
    swimmerId: "swimmer-8",
    time: "6:43,72",
    points: 9,
  },
];

export const mockEvents: CompetitionEvent[] = [
  {
    id: "event-1",
    date: "13/09/2025",
    name: "400 CC Libre — Mujeres 35-39",
    templateId: "tpl-400-free",
    category: "Mujeres 35-39",
    lanesEnabled: 6,
    status: "Publicado",
  },
  {
    id: "event-2",
    date: "13/09/2025",
    name: "400 CC Libre — Mujeres 40-44",
    templateId: "tpl-400-free",
    category: "Mujeres 40-44",
    lanesEnabled: 6,
    status: "Borrador",
  },
  {
    id: "event-3",
    date: "13/09/2025",
    name: "400 CC Libre — Mujeres 45-49",
    templateId: "tpl-400-free",
    category: "Mujeres 45-49",
    lanesEnabled: 6,
    status: "Publicado",
  },
];

export const mockJudgeAssignments: JudgeAssignment[] = [
  {
    id: "assign-1",
    lane: "Carril 1",
    judge: "Juez A",
    device: "Tablet 01",
  },
  {
    id: "assign-2",
    lane: "Carril 2",
    judge: "Juez B",
    device: "Tablet 02",
  },
  {
    id: "assign-3",
    lane: "Carril 3",
    judge: "Juez C",
    device: "Tablet 03",
  },
];

export const mockDashboards: DashboardLink[] = [
  {
    href: "/dashboard/institucion",
    title: "Institución",
    description: "Administra entrenadores, plantel y puntos del club.",
  },
  {
    href: "/dashboard/entrenador",
    title: "Entrenador",
    description: "Carga nadadores y registra pruebas y tiempos.",
  },
  {
    href: "/dashboard/juez-central",
    title: "Juez central",
    description: "Inicia los cronómetros globalmente y recibe cortes por carril.",
  },
  {
    href: "/dashboard/juez",
    title: "Juez (carril)",
    description: "Cronometra el carril con pausa y corte de tiempo.",
  },
  {
    href: "/dashboard/organizador",
    title: "Organizador",
    description: "Crea eventos por jornada, carriles y asignación de jueces.",
  },
];

export function swimmerNameById(swimmerId: string) {
  return mockSwimmers.find((s) => s.id === swimmerId)?.name ?? "(Sin nombre)";
}

export function clubNameById(clubId: string) {
  return mockClubs.find((c) => c.id === clubId)?.name ?? "(Club)";
}

export function swimmerById(swimmerId: string) {
  return mockSwimmers.find((s) => s.id === swimmerId) ?? null;
}

export function categoriesFromSwimmers() {
  return Array.from(new Set(mockSwimmers.map((s) => s.category))).sort();
}

export function swimmersByCategory(category: string) {
  return mockSwimmers.filter((s) => s.active && s.category === category);
}

export function coachSwimmersCount(coachId: string) {
  return mockSwimmers.filter((s) => s.coachId === coachId).length;
}

export function clubTotalPoints(clubId: string) {
  const swimmerIds = new Set(
    mockSwimmers.filter((s) => s.clubId === clubId).map((s) => s.id),
  );
  return mockResults
    .filter((r) => swimmerIds.has(r.swimmerId))
    .reduce((sum, r) => sum + r.points, 0);
}

export function resultsForClub(clubId: string) {
  const swimmerIds = new Set(
    mockSwimmers.filter((s) => s.clubId === clubId).map((s) => s.id),
  );
  return mockResults.filter((r) => swimmerIds.has(r.swimmerId));
}
