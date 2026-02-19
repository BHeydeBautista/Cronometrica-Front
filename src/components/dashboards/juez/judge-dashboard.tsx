"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";

import LaneTimer from "@/components/dashboards/juez/lane-timer";
import SimpleTable from "@/components/dashboards/_shared/simple-table";

import type { JudgeAssignment } from "@/types";
import { clubNameById, mockEvents, mockJudgeAssignments, swimmersByCategory } from "@/data/mock";
import { getRealtimeChannel, type RealtimeMessage } from "@/components/dashboards/juez/realtime";

const JUDGES_STORAGE_KEY = "cronometro.judgeAssignments.v1";

export default function JudgeDashboard() {
  const searchParams = useSearchParams();
  const laneFromUrl = searchParams.get("lane");
  const [judgeAssignments, setJudgeAssignments] = useState<JudgeAssignment[]>(mockJudgeAssignments);
  const [judgesLoaded, setJudgesLoaded] = useState(false);

  const lane = laneFromUrl ?? judgeAssignments[0]?.lane ?? "Carril 1";
  const [selectedEventId, setSelectedEventId] = useState<string>(mockEvents[0]?.id ?? "");
  const selectedEvent = useMemo(
    () => mockEvents.find((e) => e.id === selectedEventId) ?? mockEvents[0],
    [selectedEventId],
  );
  const eventName = selectedEvent?.name ?? "Evento";
  const category = selectedEvent?.category ?? "Mujeres 35-39";

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

  const assigned = useMemo(
    () => judgeAssignments.find((j) => j.lane === lane) ?? null,
    [judgeAssignments, lane],
  );

  useEffect(() => {
    const channel = getRealtimeChannel();
    const handler = (event: MessageEvent) => {
      const msg = event.data as RealtimeMessage;
      if (msg?.type === "START_ALL") {
        if (msg.eventId) {
          setSelectedEventId(msg.eventId);
          return;
        }

        const fallback = mockEvents.find((e) => e.name === msg.eventName);
        if (fallback) setSelectedEventId(fallback.id);
      }
    };

    channel.addEventListener("message", handler);
    return () => {
      channel.removeEventListener("message", handler);
      channel.close();
    };
  }, []);

  const swimmers = swimmersByCategory(category);
  const swimmerName = swimmers[0]?.name ?? "Nadador";

  const queue = swimmers.slice(0, 8).map((s, idx) => ({
    heat: `Serie ${idx + 1}`,
    lane,
    swimmer: s.name,
    club: clubNameById(s.clubId),
  }));

  return (
    <div>
      <div className="rounded-2xl border border-foreground/10 bg-foreground/5 p-4">
        <p className="text-xs font-medium text-foreground/60">Asignación</p>
        <p className="mt-1 text-sm text-foreground/70">
          Carril: <span className="text-foreground">{lane}</span>
        </p>
        <p className="text-sm text-foreground/70">
          Juez: <span className="text-foreground">{assigned?.judge ?? "—"}</span> · Dispositivo:{" "}
          <span className="text-foreground">{assigned?.device ?? "—"}</span>
        </p>
        <p className="mt-1 text-xs text-foreground/60">
          {judgesLoaded
            ? "La asignación se carga desde organización."
            : "Cargando asignación…"}
        </p>
      </div>

      <LaneTimer
        laneLabel={lane}
        eventName={eventName}
        swimmerName={swimmerName}
      />

      <div className="mt-8">
        <h2 className="text-lg font-semibold tracking-tight">Próximos en el carril</h2>
        <p className="mt-1 text-sm text-foreground/70">
          Cola de ejemplo para la jornada (borrador).
        </p>
        <div className="mt-4">
          <SimpleTable
            columns={[
              { key: "heat", header: "Serie" },
              { key: "lane", header: "Carril" },
              { key: "swimmer", header: "Nadador" },
              { key: "club", header: "Club" },
            ]}
            rows={queue}
          />
        </div>
      </div>
    </div>
  );
}
