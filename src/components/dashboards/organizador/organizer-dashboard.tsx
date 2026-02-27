"use client";

import type { ReactNode } from "react";
import { useMemo, useState } from "react";

import { mockClub } from "@/data/mock";

import SimpleTable from "@/components/dashboards/_shared/simple-table";

type DashboardEventRow = {
  event: string;
  category: string;
  stroke: string;
  distance: string;
  heat: string;
  status: string;
  canStart: boolean;
};

type LaneState = "ready" | "missing" | "inactive" | "disabled";

type LaneIndicator = "ok" | "warn" | "error" | "gear";

type LaneCard = {
  lane: number;
  judgeLabel: string;
  state: LaneState;
  indicator?: LaneIndicator;
  footer: { label: string; variant: "primary" | "muted" | "success" };
};

function Icon({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex h-5 w-5 items-center justify-center text-sky-900">
      {children}
    </span>
  );
}

function StatusDot({ className }: { className: string }) {
  return <span className={`h-2.5 w-2.5 rounded-full ${className}`} />;
}

export default function OrganizerDashboard() {
  const [meetName, setMeetName] = useState("Interclubes Verano 2026");
  const [place, setPlace] = useState(mockClub.name);
  const [date, setDate] = useState("25 Abril 2026");
  const [pool, setPool] = useState<"25" | "50" | "30">("25");
  const [heat, setHeat] = useState("1");
  const [lanes, setLanes] = useState("6");

  const events = useMemo<DashboardEventRow[]>(
    () => [
      {
        event: "50 metros Libre",
        category: "Hombres",
        stroke: "Masculinos",
        distance: "50m",
        heat: "1",
        status: "No iniciado",
        canStart: false,
      },
      {
        event: "50 metros Libre",
        category: "Mujeres",
        stroke: "Femeninos",
        distance: "50m",
        heat: "1",
        status: "No iniciado",
        canStart: true,
      },
      {
        event: "100 metros Pecho",
        category: "Hombres",
        stroke: "Masculinos",
        distance: "100m",
        heat: "1",
        status: "No iniciado",
        canStart: false,
      },
      {
        event: "100 metros Pecho",
        category: "Mujeres",
        stroke: "Femeninos",
        distance: "100m",
        heat: "1",
        status: "No iniciado",
        canStart: false,
      },
    ],
    [],
  );

  const lanesCards = useMemo<LaneCard[]>(
    () => [
      {
        lane: 1,
        judgeLabel: "Diego Pérez",
        state: "ready",
        indicator: "error",
        footer: { label: "Listo", variant: "success" },
      },
      {
        lane: 2,
        judgeLabel: "María Gómez",
        state: "ready",
        indicator: "ok",
        footer: { label: "Listo", variant: "success" },
      },
      {
        lane: 3,
        judgeLabel: "Sin Asignar",
        state: "missing",
        indicator: "warn",
        footer: { label: "Asignar Juez", variant: "primary" },
      },
      {
        lane: 4,
        judgeLabel: "Pablo Torres",
        state: "ready",
        indicator: "ok",
        footer: { label: "Desactivado", variant: "muted" },
      },
      {
        lane: 5,
        judgeLabel: "Inactivo",
        state: "inactive",
        indicator: "gear",
        footer: { label: "Desactivado", variant: "muted" },
      },
      {
        lane: 6,
        judgeLabel: "Inactivo",
        state: "inactive",
        indicator: "gear",
        footer: { label: "Desactivado", variant: "muted" },
      },
    ],
    [],
  );

  return (
    <div
      className="relative left-1/2 w-screen -translate-x-1/2 bg-cover bg-top"
      style={{ backgroundImage: "url(/img/fondo1.png)" }}
    >
      <div className="relative">
        <div className="relative">
          <div className="absolute inset-0 bg-black/25" />

          <div className="relative mx-auto w-full max-w-6xl px-6 pt-4">
          <div className="mt-10 flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <h1 className="text-3xl font-semibold tracking-tight text-background sm:text-4xl">
                Panel del Organizador
              </h1>

              <div className="mt-4 flex flex-wrap items-center gap-3">
                <span className="inline-flex items-center gap-2 rounded-md bg-background/90 px-3 py-2 text-sm font-semibold text-sky-900">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="text-sky-800">
                    <path
                      d="M7 12h10M7 16h6M7 8h10"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                  {meetName}
                </span>

                <span className="inline-flex items-center gap-2 rounded-md bg-background/90 px-3 py-2 text-sm font-semibold text-sky-900">
                  <StatusDot className="bg-emerald-600" />
                  En Preparación
                </span>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button className="inline-flex h-10 items-center justify-center rounded-md bg-emerald-600 px-4 text-sm font-semibold text-white hover:bg-emerald-700">
                Iniciar Jornada
              </button>
              <button className="inline-flex h-10 items-center justify-center rounded-md bg-red-600 px-4 text-sm font-semibold text-white hover:bg-red-700">
                Finalizar Jornada
              </button>
            </div>
          </div>

          <div className="pointer-events-none relative mt-10 overflow-hidden leading-none">
            <svg
              viewBox="0 0 1440 110"
              preserveAspectRatio="none"
              className="block h-[78px] w-full"
              aria-hidden="true"
            >
              <path
                d="M0,64L60,69.3C120,75,240,85,360,80C480,75,600,53,720,42.7C840,32,960,32,1080,40C1200,48,1320,64,1380,72.3L1440,80L1440,110L1380,110C1320,110,1200,110,1080,110C960,110,840,110,720,110C600,110,480,110,360,110C240,110,120,110,60,110L0,110Z"
                fill="var(--background)"
                opacity="0.95"
              />
            </svg>
          </div>
        </div>

        </div>

        <div className="bg-background/85">
          <div className="mx-auto w-full max-w-6xl px-6 py-10 sm:py-12">
            {/* Configuración General */}
            <section className="overflow-hidden rounded-2xl border border-foreground/10 bg-background">
              <div className="flex items-center gap-3 bg-foreground/5 px-6 py-4">
                <Icon>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path
                      d="M12 15.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z"
                      stroke="currentColor"
                      strokeWidth="2"
                    />
                    <path
                      d="M19.4 15a7.9 7.9 0 0 0 .1-6l2-1.5-2-3.5-2.4 1a8 8 0 0 0-5.2-3l-.4-2.6H10l-.4 2.6a8 8 0 0 0-5.2 3l-2.4-1-2 3.5L2 9a7.9 7.9 0 0 0 .1 6L0 16.5l2 3.5 2.4-1a8 8 0 0 0 5.2 3l.4 2.6h4l.4-2.6a8 8 0 0 0 5.2-3l2.4 1 2-3.5L19.4 15Z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinejoin="round"
                    />
                  </svg>
                </Icon>
                <h2 className="text-lg font-semibold text-sky-900">Configuración General</h2>
              </div>

              <div className="px-6 py-6">
                <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                  <div className="text-sm font-semibold text-sky-900">{meetName}</div>

                  <div className="flex items-center gap-3">
                    <div className="flex h-9 items-center gap-2 rounded-md border border-foreground/10 bg-background px-3 text-sm text-sky-900">
                      <input
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="h-8 w-[140px] bg-transparent text-sm text-sky-900 outline-none placeholder:text-foreground/50"
                        aria-label="Fecha"
                      />
                      <span className="ml-1 inline-flex h-6 w-6 items-center justify-center rounded-md border border-foreground/10 bg-foreground/5">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="text-sky-900">
                          <path
                            d="M7 3v3M17 3v3M4 8h16M6 12h4M6 16h4"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                          />
                          <path
                            d="M5 5h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2Z"
                            stroke="currentColor"
                            strokeWidth="2"
                          />
                        </svg>
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 grid gap-4 lg:grid-cols-2">
                  <label className="grid gap-2">
                    <span className="text-xs font-medium text-foreground/60">Nombre</span>
                    <input
                      value={meetName}
                      onChange={(e) => setMeetName(e.target.value)}
                      className="h-9 rounded-md border border-foreground/10 bg-background px-3 text-sm"
                    />
                  </label>

                  <label className="grid gap-2">
                    <span className="text-xs font-medium text-foreground/60">Lugar</span>
                    <input
                      value={place}
                      onChange={(e) => setPlace(e.target.value)}
                      className="h-9 rounded-md border border-foreground/10 bg-background px-3 text-sm"
                    />
                  </label>
                </div>

                <div className="mt-6 grid gap-4 lg:grid-cols-[1.1fr_0.9fr_0.9fr_1.2fr]">
                  <div className="grid gap-2">
                    <span className="text-xs font-medium text-foreground/60">Piscina</span>
                    <div className="flex flex-wrap items-center gap-4 rounded-md border border-foreground/10 bg-background px-3 py-2 text-sm">
                      {([
                        { value: "25", label: "25m" },
                        { value: "50", label: "50m" },
                        { value: "30", label: "30m" },
                      ] as const).map((opt) => (
                        <label key={opt.value} className="inline-flex items-center gap-2">
                          <input
                            type="radio"
                            name="pool"
                            value={opt.value}
                            checked={pool === opt.value}
                            onChange={() => setPool(opt.value)}
                          />
                          <span>{opt.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <label className="grid gap-2">
                    <span className="text-xs font-medium text-foreground/60">Sereas</span>
                    <select
                      value={heat}
                      onChange={(e) => setHeat(e.target.value)}
                      className="h-9 rounded-md border border-foreground/10 bg-background px-3 text-sm"
                    >
                      <option value="1">Sec, 1</option>
                      <option value="2">Sec, 2</option>
                      <option value="3">Sec, 3</option>
                    </select>
                  </label>

                  <label className="grid gap-2">
                    <span className="text-xs font-medium text-foreground/60">Cantidad de Carriles</span>
                    <select
                      value={lanes}
                      onChange={(e) => setLanes(e.target.value)}
                      className="h-9 rounded-md border border-foreground/10 bg-background px-3 text-sm"
                    >
                      {["4", "5", "6", "7", "8"].map((n) => (
                        <option key={n} value={n}>
                          {n}
                        </option>
                      ))}
                    </select>
                  </label>

                  <div className="flex items-end justify-start lg:justify-end">
                    <button className="inline-flex h-10 items-center justify-center gap-2 rounded-md bg-sky-700 px-4 text-sm font-semibold text-white hover:bg-sky-800">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                        <path
                          d="M12 15.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z"
                          stroke="currentColor"
                          strokeWidth="2"
                        />
                        <path
                          d="M19.4 15a7.9 7.9 0 0 0 .1-6l2-1.5-2-3.5-2.4 1a8 8 0 0 0-5.2-3l-.4-2.6H10l-.4 2.6a8 8 0 0 0-5.2 3l-2.4-1-2 3.5L2 9a7.9 7.9 0 0 0 .1 6L0 16.5l2 3.5 2.4-1a8 8 0 0 0 5.2 3l.4 2.6h4l.4-2.6a8 8 0 0 0 5.2-3l2.4 1 2-3.5L19.4 15Z"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinejoin="round"
                        />
                      </svg>
                      Guardar Configuración
                    </button>
                  </div>
                </div>
              </div>
            </section>

            {/* Eventos */}
            <section className="mt-8 overflow-hidden rounded-2xl border border-foreground/10 bg-background">
              <div className="flex items-center justify-between gap-4 bg-foreground/5 px-6 py-4">
                <h2 className="text-lg font-semibold text-sky-900">Eventos</h2>
                <button className="inline-flex h-9 items-center justify-center gap-2 rounded-md border border-foreground/15 bg-background px-3 text-sm font-semibold text-sky-900 hover:bg-foreground/5">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                  Crear Evento
                </button>
              </div>

              <div className="px-6 py-6">
                <SimpleTable
                  columns={[
                    {
                      id: "event",
                      key: "event",
                      header: "Evento",
                      render: (_value, row) => (
                        <div className="min-w-[180px]">
                          <div className="font-semibold text-sky-900">{row.event}</div>
                          <div className="text-xs text-foreground/60">{row.category}</div>
                        </div>
                      ),
                    },
                    { id: "stroke", key: "stroke", header: "Estilo" },
                    { id: "distance", key: "distance", header: "Distancia" },
                    { id: "heat", key: "heat", header: "Serie" },
                    { id: "status", key: "status", header: "Estado" },
                    {
                      id: "row-actions",
                      key: "canStart",
                      header: "",
                      className: "text-right",
                      render: () => (
                        <div className="flex items-center justify-end gap-2">
                          <button className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-foreground/15 bg-background hover:bg-foreground/5" aria-label="Editar">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="text-sky-900">
                              <path
                                d="M3 17.25V21h3.75L19.81 7.94l-3.75-3.75L3 17.25Z"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinejoin="round"
                              />
                              <path
                                d="M14.06 4.19 19.81 9.94"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                              />
                            </svg>
                          </button>
                          <button className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-foreground/15 bg-background hover:bg-foreground/5" aria-label="Eliminar">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="text-sky-900">
                              <path
                                d="M3 6h18"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                              />
                              <path
                                d="M8 6V4h8v2"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinejoin="round"
                              />
                              <path
                                d="M19 6l-1 16H6L5 6"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </button>
                        </div>
                      ),
                    },
                    {
                      id: "start-action",
                      key: "status",
                      header: "",
                      className: "text-right",
                      render: (_value, row) => (
                        <button
                          className={
                            "inline-flex h-9 items-center justify-center rounded-md px-3 text-sm font-semibold " +
                            (row.canStart
                              ? "bg-emerald-600 text-white hover:bg-emerald-700"
                              : "border border-foreground/15 bg-foreground/5 text-foreground/50")
                          }
                          disabled={!row.canStart}
                        >
                          <span className="mr-2 inline-flex">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                              <path
                                d="M8 5v14l11-7-11-7Z"
                                fill="currentColor"
                              />
                            </svg>
                          </span>
                          Iniciar evento
                        </button>
                      ),
                    },
                  ]}
                  rows={events}
                />
              </div>
            </section>

            {/* Carriles */}
            <section className="mt-8 overflow-hidden rounded-2xl border border-foreground/10 bg-background">
              <div className="flex items-center justify-between gap-4 bg-foreground/5 px-6 py-4">
                <h2 className="text-lg font-semibold text-sky-900">Carriles</h2>
                <button className="inline-flex h-9 items-center justify-center gap-2 rounded-md border border-foreground/15 bg-background px-3 text-sm font-semibold text-sky-900 hover:bg-foreground/5">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path
                      d="M4 12h16"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                    <path
                      d="M12 4v16"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                  Gestionar Carriles
                </button>
              </div>

              <div className="px-6 py-6">
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  {lanesCards.slice(0, 4).map((laneCard) => (
                    <LaneTile key={laneCard.lane} card={laneCard} />
                  ))}
                </div>

                <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {lanesCards.slice(4).map((laneCard) => (
                    <LaneTile key={laneCard.lane} card={laneCard} />
                  ))}
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}

function LaneTile({ card }: { card: LaneCard }) {
  const header = `Carril ${card.lane}`;

  const indicator: LaneIndicator =
    card.indicator ?? (card.state === "missing" ? "warn" : card.state === "ready" ? "ok" : "gear");

  const icon =
    indicator === "ok" ? (
      <span className="inline-flex h-4 w-4 items-center justify-center text-emerald-600">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M20 6 9 17l-5-5"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
    ) : indicator === "error" ? (
      <span className="inline-flex h-4 w-4 items-center justify-center text-amber-500">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M18 6 6 18"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M6 6l12 12"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      </span>
    ) : indicator === "warn" ? (
      <span className="inline-flex h-4 w-4 items-center justify-center text-amber-500">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M12 9v4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <path d="M12 17h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <path
            d="M10.3 4.6 1.8 19.5A2 2 0 0 0 3.5 22h17a2 2 0 0 0 1.7-2.5L13.7 4.6a2 2 0 0 0-3.4 0Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinejoin="round"
          />
        </svg>
      </span>
    ) : (
      <span className="inline-flex h-4 w-4 items-center justify-center text-foreground/40">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M12 15.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z"
            stroke="currentColor"
            strokeWidth="2"
          />
          <path
            d="M19.4 15a7.9 7.9 0 0 0 .1-6l2-1.5-2-3.5-2.4 1a8 8 0 0 0-5.2-3l-.4-2.6H10l-.4 2.6a8 8 0 0 0-5.2 3l-2.4-1-2 3.5L2 9a7.9 7.9 0 0 0 .1 6L0 16.5l2 3.5 2.4-1a8 8 0 0 0 5.2 3l.4 2.6h4l.4-2.6a8 8 0 0 0 5.2-3l2.4 1 2-3.5L19.4 15Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinejoin="round"
          />
        </svg>
      </span>
    );

  const footerClass =
    card.footer.variant === "success"
      ? "bg-emerald-600 text-white hover:bg-emerald-700"
      : card.footer.variant === "primary"
        ? "border border-foreground/15 bg-background text-sky-800 hover:bg-foreground/5"
        : "border border-foreground/10 bg-foreground/5 text-foreground/50";

  return (
    <div className="overflow-hidden rounded-2xl border border-foreground/10 bg-background">
      <div className="px-5 py-4">
        <div className="text-base font-semibold text-sky-900">{header}</div>
        <div className="mt-2 flex items-center gap-2 text-sm text-foreground/75">
          {icon}
          <span>{card.judgeLabel}</span>
        </div>
      </div>
      <div className="border-t border-foreground/10 bg-background px-5 py-3">
        <button className={`inline-flex h-9 w-full items-center justify-center gap-2 rounded-md text-sm font-semibold ${footerClass}`}>
          {card.footer.variant === "success" ? (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M20 6 9 17l-5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          ) : card.footer.variant === "muted" ? (
            <span className="inline-flex h-4 w-4 items-center justify-center">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M12 5v14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0" />
                <circle cx="12" cy="12" r="6" stroke="currentColor" strokeWidth="2" opacity="0.6" />
              </svg>
            </span>
          ) : null}
          {card.footer.label}
        </button>
      </div>
    </div>
  );
}
