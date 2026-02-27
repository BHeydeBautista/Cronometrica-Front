"use client";

import { useEffect, useMemo, useState } from "react";

import { getRealtimeChannel } from "@/components/dashboards/juez/realtime";

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

function formatCutMs(ms: number) {
  const totalSeconds = Math.floor(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  const centis = Math.floor((ms % 1000) / 10);

  if (minutes <= 0) {
    return `${seconds}.${pad2(centis)}`;
  }
  return `${minutes}:${pad2(seconds)}.${pad2(centis)}`;
}

type LaneTimerProps = {
  laneLabel: string;
  judgeName: string;
  swimmerName: string;
  eventName: string;
};

export default function LaneTimer({
  laneLabel,
  judgeName,
  swimmerName,
  eventName,
}: LaneTimerProps) {
  const [startEpochMs, setStartEpochMs] = useState<number | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  const [nowEpochMs, setNowEpochMs] = useState(() => Date.now());
  const [lastCut, setLastCut] = useState<string | null>(null);
  const [cutEpochMs, setCutEpochMs] = useState<number | null>(null);
  const [syncedEventName, setSyncedEventName] = useState<string | null>(null);
  const [falseStart, setFalseStart] = useState(false);

  useEffect(() => {
    if (!isRunning) return;
    const id = window.setInterval(() => setNowEpochMs(Date.now()), 50);
    return () => window.clearInterval(id);
  }, [isRunning]);

  useEffect(() => {
    const channel = getRealtimeChannel();
    const handler = (event: MessageEvent) => {
      const msg = event.data as { type?: string };
      if (msg?.type === "START_ALL") {
        const startMsg = event.data as {
          type: "START_ALL";
          startEpochMs: number;
          eventId: string;
          eventName: string;
          category?: string;
        };
        setStartEpochMs(startMsg.startEpochMs);
        setSyncedEventName(startMsg.eventName);
        setCutEpochMs(null);
        setLastCut(null);
        setFalseStart(false);
        setIsRunning(true);
      }

      if (msg?.type === "STOP_ALL") {
        const stopMsg = event.data as { type: "STOP_ALL"; stopEpochMs: number };
        setIsRunning(false);
        setCutEpochMs(stopMsg.stopEpochMs);
      }

      if (msg?.type === "RESET_ALL") {
        setIsRunning(false);
        setStartEpochMs(null);
        setCutEpochMs(null);
        setLastCut(null);
        setSyncedEventName(null);
        setFalseStart(false);
      }
    };
    channel.addEventListener("message", handler);
    return () => {
      channel.removeEventListener("message", handler);
      channel.close();
    };
  }, []);

  const effectiveNow = cutEpochMs ?? nowEpochMs;
  const elapsedMs = startEpochMs ? Math.max(0, effectiveNow - startEpochMs) : 0;
  const display = useMemo(() => formatMs(elapsedMs), [elapsedMs]);

  const canCut = Boolean(startEpochMs) && isRunning;
  const canFalseStart = !startEpochMs && !falseStart;

  const laneNumber = useMemo(() => {
    const match = laneLabel.match(/\d+/);
    return match?.[0] ?? laneLabel;
  }, [laneLabel]);

  const statusLabel = isRunning ? "En Curso" : startEpochMs ? "Pausado" : "Esperando";

  return (
    <div
      className="relative left-1/2 min-h-[100svh] w-screen -translate-x-1/2 bg-cover bg-top"
      style={{ backgroundImage: "url(/img/fondo2.png)" }}
    >
      <div className="absolute inset-0 bg-black/25" />

      <div className="relative mx-auto flex w-full max-w-3xl items-start justify-center px-6 pt-24 pb-16">
        <div className="w-full overflow-hidden rounded-xl border border-background/10 bg-sky-950/55 text-background shadow-sm backdrop-blur">
          <div className="border-b border-background/10 px-6 py-4 text-center">
            <h1 className="text-3xl font-semibold tracking-tight">Panel del Juez de Carril</h1>
          </div>

          <div className="px-6 py-5">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="inline-flex h-10 items-center justify-center rounded-md bg-amber-400 px-4 text-base font-extrabold tracking-wide text-sky-950">
                  CARRIL {laneNumber}
                </div>
                <div className="text-3xl font-semibold tracking-tight">{judgeName}</div>
              </div>

              <div className="flex items-center gap-2">
                <div className="overflow-hidden rounded-sm border border-background/15">
                  <div className="h-2.5 w-9 bg-sky-400" />
                  <div className="relative h-2.5 w-9 bg-background/90">
                    <div className="absolute left-1/2 top-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber-300" />
                  </div>
                  <div className="h-2.5 w-9 bg-sky-400" />
                </div>
              </div>
            </div>

            <div className="mt-5 rounded-md border border-background/10 bg-background/5 px-4 py-3">
              <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-base">
                <div className="flex items-center gap-2 text-background/90">
                  <span className="inline-flex h-5 w-5 items-center justify-center text-background/85">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <path
                        d="M16 11c1.7 0 3-1.3 3-3s-1.3-3-3-3-3 1.3-3 3 1.3 3 3 3Z"
                        stroke="currentColor"
                        strokeWidth="2"
                      />
                      <path
                        d="M2 20a6 6 0 0 1 12 0"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                      <path
                        d="M10 20a6 6 0 0 1 12 0"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        opacity="0.6"
                      />
                    </svg>
                  </span>
                  <span>{syncedEventName ?? eventName}</span>
                </div>

                <div className="flex items-center gap-3">
                  <span className="inline-flex h-3 w-3 rounded-full bg-sky-300" />
                  <span className="font-semibold text-amber-300">
                    {falseStart ? "Falso inicio" : statusLabel}
                  </span>
                </div>
              </div>

              <div className="mt-2 text-base text-background/85">
                Nadador: <span className="font-semibold text-background/95">{swimmerName}</span>
              </div>
            </div>

            <div className="mt-10 text-center">
              <div className="text-7xl font-semibold tracking-tight sm:text-8xl">{display}</div>
            </div>

            <div className="mt-10 flex justify-center">
              <div className="flex w-full flex-col items-center gap-3">
                <button
                  type="button"
                  onClick={() => {
                    if (!startEpochMs) return;

                    const cutEpoch = Date.now();
                    const cut = formatCutMs(Math.max(0, cutEpoch - startEpochMs));

                    setLastCut(cut);
                    setCutEpochMs(cutEpoch);
                    setIsRunning(false);

                    const channel = getRealtimeChannel();
                    channel.postMessage({
                      type: "LANE_CUT",
                      lane: laneLabel,
                      swimmer: swimmerName,
                      eventName: syncedEventName ?? eventName,
                      cutTime: cut,
                      cutEpochMs: cutEpoch,
                    });
                    channel.close();
                  }}
                  disabled={!canCut || falseStart}
                  className="inline-flex h-16 w-[360px] items-center justify-center rounded-md bg-emerald-700/80 text-3xl font-semibold tracking-wide text-background shadow-sm hover:bg-emerald-700 disabled:opacity-50"
                >
                  REGISTRAR
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setFalseStart(true);
                    const channel = getRealtimeChannel();
                    channel.postMessage({
                      type: "LANE_FALSE_START",
                      lane: laneLabel,
                      swimmer: swimmerName,
                      eventName: syncedEventName ?? eventName,
                      epochMs: Date.now(),
                    });
                    channel.close();
                  }}
                  disabled={!canFalseStart}
                  className="inline-flex h-12 w-[360px] items-center justify-center rounded-md bg-red-600/80 text-xl font-semibold tracking-wide text-background hover:bg-red-600 disabled:opacity-50"
                >
                  FALSO INICIO
                </button>
              </div>
            </div>

            <div className="mt-10 rounded-md border border-background/10 bg-background/5 px-4 py-3 text-lg">
              <span className="text-background/85">Tiempo registrado:</span>{" "}
              <span className="font-semibold">{lastCut ?? "–"}</span>
            </div>

            <div className="mt-4">
              <button
                type="button"
                disabled
                className="inline-flex h-12 w-full items-center justify-center rounded-md bg-background/10 text-lg font-semibold text-background/40"
              >
                Corrección...
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
