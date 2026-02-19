"use client";

import { useEffect, useMemo, useState } from "react";

import Button from "@/components/dashboards/_shared/button";
import SimpleTable from "@/components/dashboards/_shared/simple-table";
import StatCard from "@/components/dashboards/_shared/stat-card";

import type { CompetitionEvent, JudgeAssignment, PublishStatus } from "@/types";
import {
  categoriesFromSwimmers,
  clubNameById,
  mockEventTemplates,
  mockEvents,
  mockJudgeAssignments,
  swimmersByCategory,
} from "@/data/mock";

const JUDGES_STORAGE_KEY = "cronometro.judgeAssignments.v1";

export default function OrganizerDashboard() {
  const [events, setEvents] = useState<CompetitionEvent[]>(mockEvents);
  const [selectedEventId, setSelectedEventId] = useState<string>(mockEvents[0]?.id ?? "");
  const [judgeAssignments, setJudgeAssignments] = useState<JudgeAssignment[]>(mockJudgeAssignments);
  const [judgesLoaded, setJudgesLoaded] = useState(false);

  const categories = useMemo(() => categoriesFromSwimmers(), []);
  const [date, setDate] = useState("13/09/2025");
  const [templateId, setTemplateId] = useState(mockEventTemplates[0]?.id ?? "");
  const [category, setCategory] = useState(categories[0] ?? "Mujeres 35-39");
  const [lanesEnabled, setLanesEnabled] = useState(6);
  const [status, setStatus] = useState<PublishStatus>("Borrador");

  const selectedEvent = useMemo(
    () => events.find((e) => e.id === selectedEventId) ?? events[0],
    [events, selectedEventId],
  );

  const judges = useMemo(
    () =>
      judgeAssignments.map((j) => ({
        lane: j.lane,
        judge: j.judge,
        device: j.device,
        link: (
          <a
            className="text-brand hover:underline"
            href={`/dashboard/juez?lane=${encodeURIComponent(j.lane)}`}
            target="_blank"
            rel="noreferrer"
          >
            Abrir juez
          </a>
        ),
      })),
    [judgeAssignments],
  );

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(JUDGES_STORAGE_KEY);
      if (!raw) {
        setJudgesLoaded(true);
        return;
      }
      const parsed = JSON.parse(raw) as JudgeAssignment[];
      if (Array.isArray(parsed) && parsed.length) {
        setJudgeAssignments(parsed);
      }
    } catch {
      // ignore
    } finally {
      setJudgesLoaded(true);
    }
  }, []);

  const participants = useMemo(() => {
    const cat = selectedEvent?.category ?? category;
    return swimmersByCategory(cat).map((s) => ({
      swimmer: s.name,
      club: clubNameById(s.clubId),
      category: s.category,
    }));
  }, [selectedEvent?.category, category]);

  const schedule = useMemo(() => {
    const cat = selectedEvent?.category ?? category;
    const lanes = selectedEvent?.lanesEnabled ?? lanesEnabled;
    const list = swimmersByCategory(cat);
    const heatCount = Math.max(1, Math.ceil(list.length / Math.max(1, lanes)));

    const heats = Array.from({ length: heatCount }, (_, heatIndex) => {
      const start = heatIndex * lanes;
      const slice = list.slice(start, start + lanes);
      const lanesRows = slice.map((s, idx) => ({
        heat: `Serie ${heatIndex + 1}`,
        lane: `Carril ${idx + 1}`,
        swimmer: s.name,
        club: clubNameById(s.clubId),
      }));
      return lanesRows;
    });

    return heats.flat();
  }, [selectedEvent?.category, selectedEvent?.lanesEnabled, category, lanesEnabled]);

  const eventsRows = useMemo(
    () =>
      events.map((e) => ({
        id: e.id,
        date: e.date,
        name: e.name,
        lanes: String(e.lanesEnabled),
        status: e.status,
      })),
    [events],
  );

  return (
    <div>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-foreground/70">Panel de organización</p>
          <p className="mt-1 text-sm leading-6 text-foreground/70">
            1) Crear evento del día → 2) Definir categoría y carriles → 3) Generar
            series/carriles con nadadores de varios clubes.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <a href="/resultados/3ra-jornada" target="_blank" rel="noreferrer">
            <Button variant="outline">Ver resultados</Button>
          </a>
          <Button variant="outline" disabled>
            Exportar PDF (próximamente)
          </Button>
        </div>
      </div>

      <div className="mt-2 grid gap-4 sm:grid-cols-3">
        <StatCard
          label="Eventos del día"
          value={String(events.length)}
          hint="Publicados y borradores"
        />
        <StatCard
          label="Carriles habilitados"
          value={String(selectedEvent?.lanesEnabled ?? lanesEnabled)}
          hint="Por evento (configurable)"
        />
        <StatCard
          label="Jueces asignados"
          value={String(judgeAssignments.length)}
          hint="Asignación por carril"
        />
      </div>

      <div className="mt-8">
        <h2 className="text-lg font-semibold tracking-tight">Crear evento del día</h2>
        <p className="mt-1 text-sm text-foreground/70">
          Configurá la jornada y generá la grilla de series/carriles.
        </p>

        <div className="mt-4 grid gap-4 rounded-2xl border border-foreground/10 bg-foreground/5 p-5 sm:grid-cols-2 lg:grid-cols-5">
          <label className="flex flex-col gap-1 text-sm">
            <span className="text-xs font-medium text-foreground/60">Fecha</span>
            <input
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="h-9 rounded-lg border border-foreground/10 bg-background px-3 text-sm"
              placeholder="dd/mm/yyyy"
            />
          </label>

          <label className="flex flex-col gap-1 text-sm">
            <span className="text-xs font-medium text-foreground/60">Prueba</span>
            <select
              value={templateId}
              onChange={(e) => setTemplateId(e.target.value)}
              className="h-9 rounded-lg border border-foreground/10 bg-background px-3 text-sm"
            >
              {mockEventTemplates.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.label}
                </option>
              ))}
            </select>
          </label>

          <label className="flex flex-col gap-1 text-sm">
            <span className="text-xs font-medium text-foreground/60">Categoría</span>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="h-9 rounded-lg border border-foreground/10 bg-background px-3 text-sm"
            >
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </label>

          <label className="flex flex-col gap-1 text-sm">
            <span className="text-xs font-medium text-foreground/60">Carriles</span>
            <input
              value={lanesEnabled}
              onChange={(e) => setLanesEnabled(Math.max(1, Number(e.target.value) || 1))}
              className="h-9 rounded-lg border border-foreground/10 bg-background px-3 text-sm"
              inputMode="numeric"
            />
          </label>

          <label className="flex flex-col gap-1 text-sm">
            <span className="text-xs font-medium text-foreground/60">Estado</span>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as PublishStatus)}
              className="h-9 rounded-lg border border-foreground/10 bg-background px-3 text-sm"
            >
              <option value="Borrador">Borrador</option>
              <option value="Publicado">Publicado</option>
            </select>
          </label>
        </div>

        <div className="mt-3 flex flex-wrap items-center gap-2">
          <Button
            variant="brand"
            onClick={() => {
              const template = mockEventTemplates.find((t) => t.id === templateId);
              const label = template?.label ?? "Prueba";
              const id = `event-${events.length + 1}`;
              const newEvent: CompetitionEvent = {
                id,
                date,
                name: `${label} — ${category}`,
                templateId,
                category,
                lanesEnabled,
                status,
              };
              setEvents((prev) => [newEvent, ...prev]);
              setSelectedEventId(id);
            }}
          >
            Crear evento
          </Button>
          <Button
            variant="outline"
            onClick={() => {
              setDate("13/09/2025");
              setTemplateId(mockEventTemplates[0]?.id ?? "");
              setCategory(categories[0] ?? "Mujeres 35-39");
              setLanesEnabled(6);
              setStatus("Borrador");
            }}
          >
            Limpiar
          </Button>
        </div>
      </div>

      <div className="mt-8">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-lg font-semibold tracking-tight">Eventos del día</h2>
            <p className="mt-1 text-sm text-foreground/70">
              Seleccioná un evento para ver participantes y asignación por carril.
            </p>
          </div>

          <label className="flex flex-col gap-1 text-sm">
            <span className="text-xs font-medium text-foreground/60">Evento seleccionado</span>
            <select
              value={selectedEvent?.id ?? ""}
              onChange={(e) => setSelectedEventId(e.target.value)}
              className="h-9 rounded-lg border border-foreground/10 bg-background px-3 text-sm"
            >
              {events.map((e) => (
                <option key={e.id} value={e.id}>
                  {e.name}
                </option>
              ))}
            </select>
          </label>
        </div>
        <div className="mt-4">
          <SimpleTable
            columns={[
              { key: "id", header: "ID", className: "text-foreground/60" },
              { key: "date", header: "Fecha" },
              { key: "name", header: "Evento" },
              { key: "lanes", header: "Carriles" },
              { key: "status", header: "Estado" },
            ]}
            rows={eventsRows}
          />
        </div>
      </div>

      <div className="mt-10">
        <h2 className="text-lg font-semibold tracking-tight">Participantes (por categoría)</h2>
        <p className="mt-1 text-sm text-foreground/70">
          Nadadores de varios clubes filtrados por la categoría del evento.
        </p>
        <div className="mt-4">
          <SimpleTable
            columns={[
              { key: "swimmer", header: "Nadador" },
              { key: "club", header: "Club" },
              { key: "category", header: "Categoría" },
            ]}
            rows={participants.length ? participants : [{ swimmer: "—", club: "—", category: "—" }]}
          />
        </div>
      </div>

      <div className="mt-10">
        <h2 className="text-lg font-semibold tracking-tight">Series y carriles</h2>
        <p className="mt-1 text-sm text-foreground/70">
          Generación automática en base a carriles habilitados.
        </p>
        <div className="mt-4">
          <SimpleTable
            columns={[
              { key: "heat", header: "Serie" },
              { key: "lane", header: "Carril" },
              { key: "swimmer", header: "Nadador" },
              { key: "club", header: "Club" },
            ]}
            rows={schedule.length ? schedule : [{ heat: "—", lane: "—", swimmer: "—", club: "—" }]}
          />
        </div>
      </div>

      <div className="mt-10">
        <h2 className="text-lg font-semibold tracking-tight">Asignación de jueces</h2>
        <p className="mt-1 text-sm text-foreground/70">
          Cargá los jueces por carril. Se recuerda en este dispositivo. Cada carril
          tiene un link directo.
        </p>

        <div className="mt-3 flex flex-wrap items-center gap-2">
          <Button
            variant="brand"
            onClick={() => {
              window.localStorage.setItem(JUDGES_STORAGE_KEY, JSON.stringify(judgeAssignments));
              setJudgesLoaded(true);
            }}
          >
            Guardar asignación
          </Button>
          <Button
            variant="outline"
            onClick={() => {
              window.localStorage.removeItem(JUDGES_STORAGE_KEY);
              setJudgeAssignments(mockJudgeAssignments);
              setJudgesLoaded(true);
            }}
          >
            Restaurar ejemplo
          </Button>
          <p className="text-xs text-foreground/60">
            {judgesLoaded ? "Listo" : "Cargando…"}
          </p>
        </div>

        <div className="mt-4">
          <SimpleTable
            columns={[
              { key: "lane", header: "Carril" },
              { key: "judge", header: "Juez" },
              { key: "device", header: "Dispositivo" },
              { key: "link", header: "Link" },
            ]}
            rows={judges.map((row) => {
              const idx = judgeAssignments.findIndex((j) => j.lane === row.lane);
              const current = judgeAssignments[idx];
              return {
                lane: row.lane,
                judge: (
                  <input
                    value={current?.judge ?? ""}
                    onChange={(e) => {
                      const value = e.target.value;
                      setJudgeAssignments((prev) =>
                        prev.map((j) => (j.lane === row.lane ? { ...j, judge: value } : j)),
                      );
                    }}
                    className="h-9 w-full rounded-lg border border-foreground/10 bg-background px-3 text-sm"
                    placeholder="Nombre del juez"
                  />
                ),
                device: (
                  <input
                    value={current?.device ?? ""}
                    onChange={(e) => {
                      const value = e.target.value;
                      setJudgeAssignments((prev) =>
                        prev.map((j) => (j.lane === row.lane ? { ...j, device: value } : j)),
                      );
                    }}
                    className="h-9 w-full rounded-lg border border-foreground/10 bg-background px-3 text-sm"
                    placeholder="Dispositivo"
                  />
                ),
                link: row.link,
              };
            })}
          />
        </div>
      </div>
    </div>
  );
}
