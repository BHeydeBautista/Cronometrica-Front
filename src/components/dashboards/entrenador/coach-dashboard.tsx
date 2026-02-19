import StatCard from "@/components/dashboards/_shared/stat-card";
import SimpleTable from "@/components/dashboards/_shared/simple-table";

import {
  mockClub,
  mockCoaches,
  mockResults,
  mockSwimmers,
  swimmerNameById,
} from "@/data/mock";

export default function CoachDashboard() {
  const coach =
    mockCoaches.find((c) => c.clubId === mockClub.id && c.active) ?? mockCoaches[0];

  const swimmers = mockSwimmers
    .filter((s) => s.coachId === coach.id)
    .map((s) => ({
      name: s.name,
      category: s.category,
      active: s.active ? "Sí" : "No",
    }));

  const swimmerIds = new Set(
    mockSwimmers.filter((s) => s.coachId === coach.id).map((s) => s.id),
  );

  const registrations = mockResults
    .filter((r) => swimmerIds.has(r.swimmerId))
    .slice(0, 6)
    .map((r) => ({
    date: r.date,
    event: r.event,
    swimmer: swimmerNameById(r.swimmerId),
    time: r.time,
  }));

  return (
    <div>
      <div className="flex flex-col gap-1">
        <p className="text-sm text-foreground/70">Club: {mockClub.name}</p>
        <p className="text-sm text-foreground/70">Entrenador: {coach.name}</p>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        <StatCard label="Nadadores" value={String(swimmers.length)} hint="Plantel cargado" />
        <StatCard
          label="Pruebas cargadas"
          value={String(registrations.length)}
          hint="En la temporada"
        />
        <StatCard label="Pendientes" value="3" hint="Listas para registrar tiempo" />
      </div>

      <div className="mt-8">
        <h2 className="text-lg font-semibold tracking-tight">Plantel</h2>
        <p className="mt-1 text-sm text-foreground/70">
          Cargá y administrá los nadadores del club.
        </p>
        <div className="mt-4">
          <SimpleTable
            columns={[
              { key: "name", header: "Nadador" },
              { key: "category", header: "Categoría" },
              { key: "active", header: "Activo" },
            ]}
            rows={swimmers}
          />
        </div>
      </div>

      <div className="mt-10">
        <h2 className="text-lg font-semibold tracking-tight">Últimas pruebas registradas</h2>
        <p className="mt-1 text-sm text-foreground/70">
          Ejemplo de carga de tiempos por evento.
        </p>
        <div className="mt-4">
          <SimpleTable
            columns={[
              { key: "date", header: "Fecha" },
              { key: "event", header: "Evento" },
              { key: "swimmer", header: "Nadador" },
              { key: "time", header: "Tiempo" },
            ]}
            rows={registrations}
          />
        </div>
      </div>
    </div>
  );
}
