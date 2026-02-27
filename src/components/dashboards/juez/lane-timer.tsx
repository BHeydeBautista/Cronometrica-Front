"use client";

import { useEffect, useMemo, useState } from "react";

import Button from "@/components/dashboards/_shared/button";
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
  swimmerName: string;
  eventName: string;
};

export default function LaneTimer({
  laneLabel,
  swimmerName,
  eventName,
}: LaneTimerProps) {
  const [startEpochMs, setStartEpochMs] = useState<number | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  const [nowEpochMs, setNowEpochMs] = useState(() => Date.now());
  const [lastCut, setLastCut] = useState<string | null>(null);
  const [cutEpochMs, setCutEpochMs] = useState<number | null>(null);
  const [syncedEventName, setSyncedEventName] = useState<string | null>(null);

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

  return (
    <div className="rounded-2xl border border-foreground/10 p-6">
      <div className="flex flex-col gap-1">
        <p className="text-xs font-medium text-foreground/60">Carril asignado</p>
        <p className="text-lg font-semibold tracking-tight">{laneLabel}</p>
        <p className="mt-2 text-sm text-foreground/70">
          Evento: {syncedEventName ?? eventName}
        </p>
        <p className="text-sm text-foreground/70">Nadador: {swimmerName}</p>
      </div>

      <div className="mt-6 rounded-2xl border border-foreground/10 bg-foreground/5 p-6">
        <p className="text-xs font-medium text-foreground/60">Tiempo</p>
        <p className="mt-2 text-4xl font-semibold tracking-tight sm:text-5xl">
          {display}
        </p>
        {lastCut ? (
          <p className="mt-2 text-sm text-foreground/70">Último corte: {lastCut}</p>
        ) : (
          <p className="mt-2 text-sm text-foreground/70">Aún sin cortes</p>
        )}
      </div>

      <div className="mt-6 flex flex-wrap gap-2">
        <Button variant="outline" disabled>
          Inicio: juez central
        </Button>
        <Button
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
          disabled={!canCut}
          variant="brand"
        >
          Pausar y registrar
        </Button>
        <Button
          variant="outline"
          onClick={() => {
            setIsRunning(false);
            setStartEpochMs(null);
            setLastCut(null);
            setCutEpochMs(null);
            setSyncedEventName(null);
          }}
        >
          Reiniciar
        </Button>
      </div>
    </div>
  );
}
