"use client";

import { useEffect, useMemo, useState } from "react";

import Button from "@/components/dashboards/_shared/button";
import SimpleTable from "@/components/dashboards/_shared/simple-table";
import {
  broadcastRealtime,
  getRealtimeChannel,
  type RealtimeMessage,
} from "@/components/dashboards/juez/realtime";
import { mockEvents } from "@/data/mock";

type LaneCutRow = {
  lane: string;
  swimmer: string;
  eventName: string;
  cutTime: string;
};

function pad2(n: number) {
  return n.toString().padStart(2, "0");
}

function formatMs(ms: number) {
  const totalSeconds = Math.floor(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  const centis = Math.floor((ms % 1000) / 10);
  return `${minutes}:${pad2(seconds)},${pad2(centis)}`;
}

export default function CentralJudgeDashboard() {
  const [selectedEventId, setSelectedEventId] = useState<string>(mockEvents[0]?.id ?? "");
  const selectedEvent = useMemo(
    () => mockEvents.find((e) => e.id === selectedEventId) ?? mockEvents[0],
    [selectedEventId],
  );
  const eventName = selectedEvent?.name ?? "Evento";
  const eventCategory = selectedEvent?.category;

  const [lastStart, setLastStart] = useState<number | null>(null);
  const [nowEpochMs, setNowEpochMs] = useState(() => Date.now());
  const [cutsByLane, setCutsByLane] = useState<Record<string, LaneCutRow>>({});

  useEffect(() => {
    if (!lastStart) return;
    const id = window.setInterval(() => setNowEpochMs(Date.now()), 50);
    return () => window.clearInterval(id);
  }, [lastStart]);

  useEffect(() => {
    const channel = getRealtimeChannel();
    const handler = (event: MessageEvent) => {
      const msg = event.data as RealtimeMessage;
      if (msg?.type === "LANE_CUT") {
        setCutsByLane((prev) => ({
          ...prev,
          [msg.lane]: {
            lane: msg.lane,
            swimmer: msg.swimmer,
            eventName: msg.eventName,
            cutTime: msg.cutTime,
          },
        }));
      }
    };

    channel.addEventListener("message", handler);
    return () => {
      channel.removeEventListener("message", handler);
      channel.close();
    };
  }, []);

  const rows = useMemo(() => Object.values(cutsByLane), [cutsByLane]);
  const globalTime = lastStart ? formatMs(Math.max(0, nowEpochMs - lastStart)) : "0:00,00";

  return (
    <div>
      <div className="rounded-2xl border border-foreground/10 bg-foreground/5 p-6">
        <p className="text-xs font-medium text-foreground/60">Control central</p>
        <h2 className="mt-2 text-lg font-semibold tracking-tight">
          Inicio global de cronómetros
        </h2>

        <div className="mt-4 rounded-2xl border border-foreground/10 bg-background p-5">
          <p className="text-xs font-medium text-foreground/60">Tiempo global</p>
          <p className="mt-2 text-4xl font-semibold tracking-tight sm:text-5xl">
            {globalTime}
          </p>
          <p className="mt-2 text-xs text-foreground/60">
            {lastStart
              ? `Iniciado a las ${new Date(lastStart).toLocaleTimeString()}`
              : "Esperando inicio…"}
          </p>
        </div>

        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          <label className="flex flex-col gap-1 text-sm">
            <span className="text-xs font-medium text-foreground/60">Evento</span>
            <select
              value={selectedEvent?.id ?? ""}
              onChange={(e) => setSelectedEventId(e.target.value)}
              className="h-9 rounded-lg border border-foreground/10 bg-background px-3 text-sm"
            >
              {mockEvents.map((e) => (
                <option key={e.id} value={e.id}>
                  {e.name}
                </option>
              ))}
            </select>
          </label>

          <div className="rounded-xl border border-foreground/10 bg-background p-3">
            <p className="text-xs font-medium text-foreground/60">Selección</p>
            <p className="mt-1 text-sm leading-6 text-foreground/70">
              Evento actual: <span className="text-foreground">{eventName}</span>
            </p>
            <p className="text-sm leading-6 text-foreground/70">
              Categoría: <span className="text-foreground">{eventCategory ?? "—"}</span>
            </p>
          </div>
        </div>
        <p className="mt-1 text-sm leading-6 text-foreground/70">
          Al iniciar, todos los jueces de carril comienzan al mismo tiempo.
        </p>

        <div className="mt-5 flex flex-wrap gap-2">
          <Button
            variant="brand"
            onClick={() => {
              const startEpochMs = Date.now();
              setLastStart(startEpochMs);
              broadcastRealtime({
                type: "START_ALL",
                startEpochMs,
                eventId: selectedEvent?.id ?? "event",
                eventName,
                category: selectedEvent?.category,
              });
            }}
          >
            Iniciar cronómetros
          </Button>
          <Button
            variant="outline"
            onClick={() => {
              setLastStart(null);
              setCutsByLane({});
              broadcastRealtime({ type: "RESET_ALL" });
            }}
          >
            Reset general
          </Button>
        </div>

        <p className="mt-3 text-xs text-foreground/60">
          {lastStart
            ? `Último inicio: ${new Date(lastStart).toLocaleTimeString()}`
            : "Aún no se inició la jornada"}
        </p>
      </div>

      <div className="mt-8">
        <h2 className="text-lg font-semibold tracking-tight">Cortes recibidos</h2>
        <p className="mt-1 text-sm text-foreground/70">
          Cuando un juez corta el tiempo en su carril, aparece acá (tiempo real).
        </p>

        <div className="mt-4">
          <SimpleTable
            columns={[
              { key: "lane", header: "Carril" },
              { key: "swimmer", header: "Nadador" },
              { key: "eventName", header: "Evento" },
              { key: "cutTime", header: "Tiempo" },
            ]}
            rows={rows.length ? rows : [{ lane: "—", swimmer: "—", eventName: "—", cutTime: "—" }]}
          />
        </div>
      </div>
    </div>
  );
}
