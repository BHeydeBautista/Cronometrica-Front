import StatCard from "@/components/dashboards/_shared/stat-card";
import SimpleTable from "@/components/dashboards/_shared/simple-table";

import {
  clubTotalPoints,
  coachSwimmersCount,
  mockClub,
  mockCoaches,
  mockSwimmers,
  resultsForClub,
  swimmerNameById,
} from "@/data/mock";

export default function InstitutionDashboard() {
  const coaches = mockCoaches
    .filter((c) => c.clubId === mockClub.id)
    .map((c) => ({
    name: c.name,
    role: c.roleLabel,
    swimmers: String(coachSwimmersCount(c.id)),
    active: c.active ? "Sí" : "No",
  }));

  const swimmersCount = mockSwimmers.filter((s) => s.clubId === mockClub.id).length;

  const latestPoints = resultsForClub(mockClub.id).slice(0, 6).map((r) => ({
    event: r.event,
    swimmer: swimmerNameById(r.swimmerId),
    time: r.time,
    points: String(r.points),
  }));

  return (
    <div>
      <div className="flex flex-col gap-1">
        <p className="text-sm text-foreground/70">{mockClub.city}</p>
        <p className="text-sm text-foreground/70">
          Estado de institución:{" "}
          <span className="text-foreground">{mockClub.status}</span>
        </p>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        <StatCard
          label="Entrenadores"
          value={String(coaches.length)}
          hint="Altas y bajas desde el panel"
        />
        <StatCard
          label="Nadadores"
          value={String(swimmersCount)}
          hint="Cargados por entrenadores"
        />
        <StatCard
          label="Puntos del club"
          value={String(clubTotalPoints(mockClub.id))}
          hint="Suma de puntos por atleta"
        />
      </div>

      <div className="mt-8">
        <h2 className="text-lg font-semibold tracking-tight">Entrenadores</h2>
        <p className="mt-1 text-sm text-foreground/70">
          Gestión de entrenadores y su plantel (borrador).
        </p>
        <div className="mt-4">
          <SimpleTable
            columns={[
              { key: "name", header: "Nombre" },
              { key: "role", header: "Rol" },
              { key: "swimmers", header: "Nadadores" },
              { key: "active", header: "Activo" },
            ]}
            rows={coaches}
          />
        </div>
      </div>

      <div className="mt-10">
        <h2 className="text-lg font-semibold tracking-tight">Últimos resultados cargados</h2>
        <p className="mt-1 text-sm text-foreground/70">
          Ejemplo de pruebas, tiempos y puntos por atleta.
        </p>
        <div className="mt-4">
          <SimpleTable
            columns={[
              { key: "event", header: "Evento" },
              { key: "swimmer", header: "Nadador" },
              { key: "time", header: "Tiempo" },
              { key: "points", header: "Puntos" },
            ]}
            rows={latestPoints}
          />
        </div>
      </div>
    </div>
  );
}
