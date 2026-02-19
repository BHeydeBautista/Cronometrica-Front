export type VerificationStatus = "Pendiente" | "Verificado" | "Rechazado";

export type PublishStatus = "Borrador" | "Publicado";

export type CategoryLabel = string;

export type Club = {
  id: string;
  name: string;
  city: string;
  status: VerificationStatus;
};

export type Coach = {
  id: string;
  clubId: string;
  name: string;
  roleLabel: "Entrenador" | "Entrenadora";
  active: boolean;
};

export type Swimmer = {
  id: string;
  clubId: string;
  coachId: string;
  name: string;
  category: CategoryLabel;
  active: boolean;
};

export type Result = {
  id: string;
  date: string; // dd/mm/yyyy (mock)
  event: string;
  swimmerId: string;
  time: string; // m:ss,cc (mock)
  points: number;
};

export type CompetitionEvent = {
  id: string;
  date: string; // dd/mm/yyyy (mock)
  name: string;
  templateId?: string;
  category?: CategoryLabel;
  lanesEnabled: number;
  status: PublishStatus;
};

export type EventTemplate = {
  id: string;
  label: string; // e.g. "400 CC Libre"
};

export type JudgeAssignment = {
  id: string;
  lane: string;
  judge: string;
  device: string;
};

export type DashboardLink = {
  href: string;
  title: string;
  description: string;
};
