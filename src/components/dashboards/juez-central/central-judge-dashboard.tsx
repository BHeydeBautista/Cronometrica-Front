"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

import {
  broadcastRealtime,
  getRealtimeChannel,
  type RealtimeMessage,
} from "@/components/dashboards/juez/realtime";

type LaneState =
  | { kind: "waiting" }
  | { kind: "cut"; cutTime: string }
  | { kind: "disabled" };

function pad2(n: number) {
  return n.toString().padStart(2, "0");
}

function formatMs(ms: number) {
  const totalSeconds = Math.floor(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  const centis = Math.floor((ms % 1000) / 10);
  return `${pad2(minutes)}:${pad2(seconds)}.${pad2(centis)}`;
}

function normalizeLaneLabel(raw: string) {
  const match = raw.match(/\d+/);
  return match?.[0] ?? raw;
}

export default function CentralJudgeDashboard() {
  const [lastStart, setLastStart] = useState<number | null>(null);
  const [pausedAt, setPausedAt] = useState<number | null>(null);
  const [nowEpochMs, setNowEpochMs] = useState(() => Date.now());
  const [cutsByLane, setCutsByLane] = useState<Record<string, string>>({});

  const meetName = "Interclubes Verano 2026";
  const eventTitle = "Evento #4 - 50m Libre";
  const serieLabel = "2 / 5";
  const categoryLabel = "Juveniles";
  const poolLabel = "25m";

  const lanes = useMemo(
    () => ["1", "2", "3", "4", "5"] as const,
    [],
  );

  useEffect(() => {
    if (!lastStart || pausedAt) return;
    const id = window.setInterval(() => setNowEpochMs(Date.now()), 50);
    return () => window.clearInterval(id);
  }, [lastStart, pausedAt]);

  useEffect(() => {
    const channel = getRealtimeChannel();
    const handler = (event: MessageEvent) => {
      const msg = event.data as RealtimeMessage;
      if (msg?.type === "LANE_CUT") {
        const normalizedLane = normalizeLaneLabel(msg.lane);
        setCutsByLane((prev) => ({
          ...prev,
          [normalizedLane]: msg.cutTime,
        }));
      }
    };

    channel.addEventListener("message", handler);
    return () => {
      channel.removeEventListener("message", handler);
      channel.close();
    };
  }, []);

  const globalTime = lastStart
    ? formatMs(Math.max(0, (pausedAt ?? nowEpochMs) - lastStart))
    : "00:00.00";

  const laneStates = useMemo(() => {
    const stateByLane: Record<string, LaneState> = {};
    for (const lane of lanes) {
      if (lane === "5") {
        stateByLane[lane] = { kind: "disabled" };
        continue;
      }

      const cutTime = cutsByLane[lane];
      if (cutTime) {
        stateByLane[lane] = { kind: "cut", cutTime };
        continue;
      }
      stateByLane[lane] = { kind: "waiting" };
    }
    return stateByLane;
  }, [cutsByLane, lanes]);

  return (
    <div
      className="relative left-1/2 w-screen -translate-x-1/2 bg-cover bg-top"
      style={{ backgroundImage: "url(/img/fondo1.png)" }}
    >
      <div className="relative">
        <div className="absolute inset-0 bg-black/25" />

        <div className="relative mx-auto w-full max-w-3xl px-6 pt-4 pb-10">
          <div className="flex items-center justify-between text-background/90">
            <div className="flex items-center gap-3 text-sm font-medium">
              <Link href="/" className="inline-flex items-center gap-2 hover:text-background">
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-background/15 backdrop-blur">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path
                      d="M3 11 12 3l9 8"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M5 10v10h14V10"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                <span>Inicio</span>
              </Link>
            </div>

            <div className="flex items-center gap-2 text-sm font-medium">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-background/15 text-background backdrop-blur">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path
                    d="M12 12a4 4 0 1 0-4-4 4 4 0 0 0 4 4Z"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                  <path
                    d="M4 20a8 8 0 0 1 16 0"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
              <span>Macia</span>
            </div>
          </div>

          <div className="mt-10 flex items-start justify-between gap-4">
            <div>
              <h1 className="text-3xl font-semibold tracking-tight text-background sm:text-4xl">
                Panel del Juez Central
              </h1>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => {
                  setLastStart(null);
                  setPausedAt(null);
                  setCutsByLane({});
                  broadcastRealtime({ type: "RESET_ALL" });
                }}
                className="inline-flex h-10 items-center justify-center gap-2 rounded-md bg-amber-400 px-4 text-sm font-semibold text-sky-950 hover:bg-amber-300"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path
                    d="M21 12a9 9 0 1 1-3.1-6.8"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  <path
                    d="M21 3v6h-6"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                Reiniciar Evento
              </button>
              <Link
                href="/"
                className="inline-flex h-10 items-center justify-center gap-2 rounded-md bg-red-600 px-4 text-sm font-semibold text-white hover:bg-red-700"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path
                    d="M7 7h14v10H7"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M7 12H3"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
                Frente
              </Link>
            </div>
          </div>

          <div className="mt-6 rounded-lg bg-background/80 p-5 text-sky-950 backdrop-blur">
            <div className="-mx-5 -mt-5 mb-4 rounded-t-lg bg-sky-950/10 px-5 py-3">
              <h2 className="text-lg font-semibold">Evento Actual</h2>
            </div>

            <div className="space-y-3 text-[15px]">
              <div className="flex items-baseline gap-2">
                <span className="text-foreground/70">Jornada:</span>
                <span className="font-medium text-foreground/90">{meetName}</span>
              </div>
              <div className="font-semibold text-foreground/90">{eventTitle}</div>
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
                <div className="flex items-baseline gap-2">
                  <span className="text-foreground/70">Serie:</span>
                  <span className="font-semibold text-foreground/90">{serieLabel}</span>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-foreground/70">Categoría:</span>
                  <span className="font-semibold text-foreground/90">{categoryLabel}</span>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-foreground/70">Piscina:</span>
                  <span className="font-semibold text-foreground/90">{poolLabel}</span>
                </div>
              </div>
              <div className="flex items-center gap-2 text-foreground/80">
                <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-emerald-600 text-white">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path
                      d="M20 6 9 17l-5-5"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                <span>Listo para iniciar.</span>
              </div>
            </div>
          </div>

          <div className="mt-6 flex justify-center">
            <button
              type="button"
              onClick={() => {
                const startEpochMs = Date.now();
                setLastStart(startEpochMs);
                setPausedAt(null);
                broadcastRealtime({
                  type: "START_ALL",
                  startEpochMs,
                  eventId: "event-4",
                  eventName: eventTitle,
                  category: categoryLabel,
                });
              }}
              className="inline-flex h-14 w-[240px] items-center justify-center rounded-md bg-red-600 text-2xl font-semibold tracking-wide text-white shadow-sm hover:bg-red-700"
            >
              INICIAR
            </button>
          </div>

          <div className="mt-8 overflow-hidden rounded-lg bg-sky-950/60 text-background shadow-sm">
            <div className="px-6 py-7 text-center">
              <div className="text-6xl font-semibold tracking-tight sm:text-7xl">
                {globalTime}
              </div>
              <div className="mt-2 text-xs text-background/70">
                {lastStart ? `Inicio: ${new Date(lastStart).toLocaleTimeString()}` : "Esperando…"}
              </div>
              <div className="mt-4 flex justify-center">
                <div className="flex flex-wrap items-center justify-center gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      if (!lastStart || pausedAt) return;
                      const stopEpochMs = Date.now();
                      setPausedAt(stopEpochMs);
                      broadcastRealtime({ type: "STOP_ALL", stopEpochMs });
                    }}
                    className="inline-flex h-10 items-center justify-center gap-2 rounded-md bg-background/10 px-4 text-sm font-semibold text-background/85 hover:bg-background/15 disabled:opacity-50"
                    disabled={!lastStart || Boolean(pausedAt)}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <path
                        d="M7 6v12"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                      <path
                        d="M17 6v12"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                    </svg>
                    Parar
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setLastStart(null);
                      setPausedAt(null);
                      broadcastRealtime({ type: "RESET_ALL" });
                    }}
                    className="inline-flex h-10 items-center justify-center gap-2 rounded-md bg-background/10 px-4 text-sm font-semibold text-background/85 hover:bg-background/15"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <path
                        d="M21 12a9 9 0 1 1-3.1-6.8"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                      <path
                        d="M21 3v6h-6"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    Reset cronómetro
                  </button>
                </div>
              </div>
            </div>

            <div className="border-t border-background/10 px-5 py-4">
              <div className="space-y-3">
                {lanes.map((lane) => {
                  const state = laneStates[lane];

                  const rowClass =
                    state.kind === "cut"
                      ? "bg-emerald-600/45"
                      : "bg-sky-950/30";

                  return (
                    <div
                      key={lane}
                      className={`flex items-center justify-between rounded-md border border-background/10 px-4 py-3 ${rowClass}`}
                    >
                      <div className="flex items-baseline gap-4">
                        <div className="text-lg font-semibold">Carril {lane}</div>
                        {state.kind === "waiting" ? (
                          <div className="text-base font-semibold text-amber-300">Esperando</div>
                        ) : state.kind === "cut" ? (
                          <div className="text-base font-semibold text-background/90">
                            Tiempo registrado
                          </div>
                        ) : (
                          <div className="text-base font-semibold text-background/50">Esperando</div>
                        )}
                      </div>

                      <div className="flex items-center gap-3">
                        {state.kind === "cut" ? (
                          <div className="mr-2 text-xl font-semibold tabular-nums">
                            {state.cutTime}
                          </div>
                        ) : null}

                        {state.kind === "disabled" ? (
                          <div className="rounded-md bg-background/10 px-3 py-2 text-sm font-semibold text-background/60">
                            Desactivado
                          </div>
                        ) : state.kind === "cut" ? (
                          <div className="flex items-center gap-2">
                            <button
                              type="button"
                              className="inline-flex h-10 w-10 items-center justify-center rounded-md bg-emerald-700/70 text-white hover:bg-emerald-700"
                              aria-label={`Confirmar carril ${lane}`}
                            >
                              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                                <path
                                  d="M20 6 9 17l-5-5"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            </button>
                            <button
                              type="button"
                              className="inline-flex h-10 w-10 items-center justify-center rounded-md bg-emerald-700/70 text-white hover:bg-emerald-700"
                              aria-label={`Avanzar carril ${lane}`}
                            >
                              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                                <path
                                  d="M10 7l5 5-5 5"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            </button>
                          </div>
                        ) : (
                          <div className="flex items-center gap-2">
                            <button
                              type="button"
                              className="inline-flex h-10 w-10 items-center justify-center rounded-md bg-background/10 text-background/80 hover:bg-background/15"
                              aria-label={`Acción 1 carril ${lane}`}
                            >
                              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                                <path
                                  d="M7 3h10"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                />
                                <path
                                  d="M7 21h10"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                />
                                <path
                                  d="M7 3c0 4 4 4 4 9s-4 5-4 9"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                                <path
                                  d="M17 3c0 4-4 4-4 9s4 5 4 9"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            </button>
                            <button
                              type="button"
                              className="inline-flex h-10 w-10 items-center justify-center rounded-md bg-background/10 text-background/80 hover:bg-background/15"
                              aria-label={`Acción 2 carril ${lane}`}
                            >
                              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                                <path
                                  d="M21 12a9 9 0 1 1-3.1-6.8"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                />
                                <path
                                  d="M21 3v6h-6"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="mt-6 flex justify-center">
                <button
                  type="button"
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-md bg-background/10 px-6 text-base font-semibold text-background/80 hover:bg-background/15"
                >
                  <span className="inline-flex h-5 w-5 items-center justify-center text-amber-300">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <path
                        d="M12 9v4"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                      <path
                        d="M12 17h.01"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                      <path
                        d="M10.3 4.6 1.8 19.5A2 2 0 0 0 3.5 22h17a2 2 0 0 0 1.7-2.5L13.7 4.6a2 2 0 0 0-3.4 0Z"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                  Forzar Cierre
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
