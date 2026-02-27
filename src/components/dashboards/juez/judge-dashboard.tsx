"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

import LaneTimer from "@/components/dashboards/juez/lane-timer";
import type { JudgeAssignment } from "@/types";
import { mockEvents, mockJudgeAssignments, swimmersByCategory } from "@/data/mock";
import { getRealtimeChannel, type RealtimeMessage } from "@/components/dashboards/juez/realtime";

const JUDGES_STORAGE_KEY = "cronometro.judgeAssignments.v1";

export default function JudgeDashboard() {
  const searchParams = useSearchParams();
  const laneFromUrl = searchParams.get("lane");
  const [judgeAssignments, setJudgeAssignments] = useState<JudgeAssignment[]>(mockJudgeAssignments);

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
        return;
      }
      const parsed = JSON.parse(raw) as JudgeAssignment[];
      if (Array.isArray(parsed) && parsed.length) {
        setJudgeAssignments(parsed);
      }
    } catch {
      // ignore
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

  const defaultEventName = "Evento #4 - 50m Libre";
  const displayEventName = eventName?.startsWith("Evento") ? eventName : defaultEventName;

  return (
    <LaneTimer
      laneLabel={lane}
      judgeName={assigned?.judge ?? "Daniel Alvarez"}
      eventName={displayEventName}
      swimmerName={swimmerName}
    />
  );
}
