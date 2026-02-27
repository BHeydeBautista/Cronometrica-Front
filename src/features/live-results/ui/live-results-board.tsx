"use client";

import { useEffect, useMemo, useReducer, useState } from "react";

import { liveResultsReducer, initialLiveResultsState } from "../state/live-results-reducer";
import { createBroadcastChannelTransport } from "../transport/live-results-transport";
import { formatStopwatchMs, normalizeLane, parseCutTimeToMs } from "../lib/time";

export default function LiveResultsBoard() {
  const [nowMs, setNowMs] = useState(() => Date.now());
  const [state, dispatch] = useReducer(liveResultsReducer, initialLiveResultsState);

  useEffect(() => {
    const id = window.setInterval(() => setNowMs(Date.now()), 200);
    return () => window.clearInterval(id);
  }, []);

  useEffect(() => {
    const transport = createBroadcastChannelTransport();
    return transport.subscribe((msg) => dispatch({ type: "REALTIME", msg }));
  }, []);

  const orderedEvents = useMemo(() => {
    return state.eventOrder.filter((k) => state.events[k]);
  }, [state.eventOrder, state.events]);

  const currentEvent = state.currentEventName ? state.events[state.currentEventName] ?? null : null;

  const statusLabel =
    currentEvent?.status === "running"
      ? "En curso"
      : currentEvent?.status === "stopped"
        ? "Detenido"
        : "Esperando";

  const elapsed = useMemo(() => {
    if (!currentEvent?.startedAt || currentEvent.status !== "running") return null;
    return Math.max(0, nowMs - currentEvent.startedAt);
  }, [currentEvent?.startedAt, currentEvent?.status, nowMs]);

  const clockLabel = elapsed === null ? "—" : formatStopwatchMs(elapsed);

  const headerMeet = currentEvent?.meetName ? `Jornada: ${currentEvent.meetName}` : null;
  const headerCategory = currentEvent?.category ? `Categoría: ${currentEvent.category}` : null;
  const headerSerie = currentEvent?.serieLabel ? `Serie: ${currentEvent.serieLabel}` : null;
  const headerPool = currentEvent?.poolLabel ? `Piscina: ${currentEvent.poolLabel}` : null;

  const currentRows = useMemo(() => {
    const laneEntries = Object.values(currentEvent?.lanes ?? {});

    const enriched = laneEntries
      .map((r) => ({
        ...r,
        laneNumber: Number(normalizeLane(r.lane)) || 0,
        cutMs: parseCutTimeToMs(r.cutTime),
      }))
      .sort((a, b) => {
        const aHas = a.cutMs !== null;
        const bHas = b.cutMs !== null;
        if (aHas && bHas) return (a.cutMs ?? 0) - (b.cutMs ?? 0);
        if (aHas) return -1;
        if (bHas) return 1;
        return a.laneNumber - b.laneNumber;
      });

    return enriched.map((r, idx) => ({
      rank: r.cutMs !== null ? String(idx + 1) : "—",
      lane: normalizeLane(r.lane),
      swimmer: r.swimmer,
      time: r.cutTime,
      flag: r.falseStart ? "FALSO INICIO" : "",
    }));
  }, [currentEvent?.lanes]);

  const pastEvents = useMemo(() => {
    const keys = orderedEvents.filter((k) => k !== state.currentEventName);
    return keys
      .map((k) => state.events[k])
      .filter(Boolean)
      .slice()
      .reverse();
  }, [orderedEvents, state.events, state.currentEventName]);

  const title = currentEvent?.eventName ?? "Resultados en vivo";

  return (
    <div
      className="relative left-1/2 min-h-[100svh] w-screen -translate-x-1/2 bg-cover bg-top"
      style={{ backgroundImage: "url(/img/fondo1.png)" }}
    >
      <div className="absolute inset-0 bg-black/30" />

      <div className="relative mx-auto w-full max-w-6xl px-6 pt-10 pb-16">
        <div className="rounded-2xl bg-background/85 p-6 text-sky-950 shadow-sm backdrop-blur sm:p-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div className="min-w-0">
              <p className="text-xs font-semibold tracking-wide text-foreground/60">
                Pantalla — Resultados en Vivo
              </p>
              <h1 className="mt-2 truncate text-3xl font-semibold tracking-tight sm:text-4xl">
                {title}
              </h1>

              <div className="mt-3 flex flex-wrap items-center gap-2 text-sm text-foreground/70">
                <span className="inline-flex items-center rounded-md border border-foreground/10 bg-background px-3 py-1.5 font-semibold text-foreground/80">
                  Estado: {statusLabel}
                </span>
                <span className="inline-flex items-center rounded-md border border-foreground/10 bg-background px-3 py-1.5 font-semibold text-foreground/80">
                  Cronómetro: {clockLabel}
                </span>
                {headerMeet ? (
                  <span className="inline-flex items-center rounded-md border border-foreground/10 bg-background px-3 py-1.5 font-semibold text-foreground/80">
                    {headerMeet}
                  </span>
                ) : null}
                {headerCategory ? (
                  <span className="inline-flex items-center rounded-md border border-foreground/10 bg-background px-3 py-1.5 font-semibold text-foreground/80">
                    {headerCategory}
                  </span>
                ) : null}
                {headerSerie ? (
                  <span className="inline-flex items-center rounded-md border border-foreground/10 bg-background px-3 py-1.5 font-semibold text-foreground/80">
                    {headerSerie}
                  </span>
                ) : null}
                {headerPool ? (
                  <span className="inline-flex items-center rounded-md border border-foreground/10 bg-background px-3 py-1.5 font-semibold text-foreground/80">
                    {headerPool}
                  </span>
                ) : null}
              </div>
            </div>

            <div className="text-sm text-foreground/70">
              <div className="font-semibold text-foreground/80">Indicaciones</div>
              <div className="mt-1 leading-6">
                Abrí esta pantalla en una TV. Desde “Juez” / “Juez central” se irán
                cargando los cortes en vivo.
              </div>
            </div>
          </div>

          <div className="mt-8 overflow-hidden rounded-xl border border-foreground/10 bg-background">
            <div className="grid grid-cols-[88px_120px_1fr_160px_180px] gap-3 border-b border-foreground/10 bg-foreground/5 px-5 py-3 text-xs font-semibold text-foreground/70">
              <div>Puesto</div>
              <div>Carril</div>
              <div>Nadador</div>
              <div className="text-right">Tiempo</div>
              <div className="text-right">Observación</div>
            </div>

            <div className="divide-y divide-foreground/10">
              {currentRows.length ? (
                currentRows.map((row) => (
                  <div
                    key={`${row.lane}-${row.swimmer}`}
                    className="grid grid-cols-[88px_120px_1fr_160px_180px] items-center gap-3 px-5 py-4 text-base"
                  >
                    <div className="text-xl font-semibold tracking-tight">{row.rank}</div>
                    <div className="font-semibold text-foreground/85">Carril {row.lane}</div>
                    <div className="min-w-0 truncate font-medium">{row.swimmer}</div>
                    <div className="text-right text-xl font-semibold tabular-nums">{row.time}</div>
                    <div className="text-right text-sm font-semibold text-amber-700">
                      {row.flag}
                    </div>
                  </div>
                ))
              ) : (
                <div className="px-5 py-10 text-center text-sm text-foreground/70">
                  Aún no hay tiempos registrados.
                </div>
              )}
            </div>
          </div>

          {pastEvents.length ? (
            <div className="mt-10">
              <h2 className="text-lg font-semibold tracking-tight">Eventos anteriores</h2>
              <div className="mt-4 grid gap-4">
                {pastEvents.map((ev) => {
                  const lanes = Object.values(ev.lanes);
                  const hasAny = lanes.some((l) => l.cutTime && l.cutTime !== "—");

                  const compact = lanes
                    .map((l) => ({
                      lane: normalizeLane(l.lane),
                      swimmer: l.swimmer,
                      time: l.cutTime,
                      ms: parseCutTimeToMs(l.cutTime) ?? Number.POSITIVE_INFINITY,
                    }))
                    .sort((a, b) => a.ms - b.ms)
                    .slice(0, 6);

                  return (
                    <div
                      key={ev.eventName}
                      className="overflow-hidden rounded-xl border border-foreground/10 bg-background"
                    >
                      <div className="flex items-center justify-between gap-4 border-b border-foreground/10 bg-foreground/5 px-5 py-3">
                        <div className="min-w-0">
                          <div className="truncate text-sm font-semibold text-foreground">
                            {ev.eventName}
                          </div>
                          <div className="mt-1 text-xs text-foreground/60">
                            Actualizado hace {Math.max(0, Math.floor((nowMs - ev.lastUpdateMs) / 1000))}s
                          </div>
                        </div>
                        <div className="shrink-0 text-xs font-semibold text-foreground/60">
                          {ev.status === "running"
                            ? "En curso"
                            : ev.status === "stopped"
                              ? "Detenido"
                              : "Finalizado"}
                        </div>
                      </div>

                      <div className="px-5 py-4">
                        {hasAny ? (
                          <div className="grid gap-2">
                            {compact.map((row) => (
                              <div
                                key={`${ev.eventName}-${row.lane}-${row.swimmer}`}
                                className="flex items-center justify-between gap-3 text-sm"
                              >
                                <div className="min-w-0 truncate">
                                  <span className="font-semibold">Carril {row.lane}:</span>{" "}
                                  <span className="text-foreground/80">{row.swimmer}</span>
                                </div>
                                <div className="shrink-0 font-semibold tabular-nums text-foreground">
                                  {row.time}
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="text-sm text-foreground/60">
                            Sin registros.
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
