import type { RealtimeMessage } from "@/components/dashboards/juez/realtime";

import type { EventLiveState, LiveResultsState, LaneLiveResult } from "../domain/live-results";
import { formatEventKey, normalizeLane } from "../lib/time";

export type LiveResultsAction =
  | { type: "NOW"; nowMs: number }
  | { type: "REALTIME"; msg: RealtimeMessage };

export const initialLiveResultsState: LiveResultsState = {
  currentEventName: null,
  events: {},
  eventOrder: [],
};

function ensureEvent(state: LiveResultsState, eventName: string) {
  const key = formatEventKey(eventName);

  if (!state.events[key]) {
    state.events[key] = {
      eventName: key,
      status: "idle",
      lanes: {},
      lastUpdateMs: Date.now(),
    };
  }

  if (!state.eventOrder.includes(key)) {
    state.eventOrder.push(key);
  }

  return key;
}

function upsertLane(existing: EventLiveState, laneKey: string, lane: LaneLiveResult) {
  existing.lanes[laneKey] = lane;
  existing.lastUpdateMs = Date.now();
}

export function liveResultsReducer(state: LiveResultsState, action: LiveResultsAction) {
  if (action.type !== "REALTIME") return state;

  const msg = action.msg;
  const next: LiveResultsState = {
    currentEventName: state.currentEventName,
    events: { ...state.events },
    eventOrder: [...state.eventOrder],
  };

  if (msg?.type === "START_ALL") {
    const key = ensureEvent(next, msg.eventName);
    next.currentEventName = key;

    const existing = next.events[key];
    next.events[key] = {
      eventName: key,
      status: "running",
      startedAt: msg.startEpochMs,
      category: msg.category,
      meetName: msg.meetName,
      poolLabel: msg.poolLabel,
      serieLabel: msg.serieLabel,
      lanes: existing?.lanes ?? {},
      lastUpdateMs: Date.now(),
    };

    return next;
  }

  if (msg?.type === "STOP_ALL") {
    const key = next.currentEventName;
    if (!key || !next.events[key]) return next;

    next.events[key] = {
      ...next.events[key],
      status: "stopped",
      lastUpdateMs: Date.now(),
    };
    return next;
  }

  if (msg?.type === "RESET_ALL") {
    const key = next.currentEventName;
    if (key && next.events[key]) {
      next.events[key] = {
        ...next.events[key],
        status: "idle",
        startedAt: undefined,
        lastUpdateMs: Date.now(),
      };
    }
    next.currentEventName = null;
    return next;
  }

  if (msg?.type === "LANE_FALSE_START") {
    const key = ensureEvent(next, msg.eventName);
    const laneKey = normalizeLane(msg.lane);
    const existing = next.events[key];

    const priorLane = existing.lanes[laneKey];
    upsertLane(existing, laneKey, {
      lane: laneKey,
      swimmer: msg.swimmer,
      cutTime: priorLane?.cutTime ?? "—",
      cutEpochMs: priorLane?.cutEpochMs ?? msg.epochMs,
      falseStart: true,
    });

    return next;
  }

  if (msg?.type === "LANE_CUT") {
    const key = ensureEvent(next, msg.eventName);
    const laneKey = normalizeLane(msg.lane);
    const existing = next.events[key];

    upsertLane(existing, laneKey, {
      lane: laneKey,
      swimmer: msg.swimmer,
      cutTime: msg.cutTime,
      cutEpochMs: msg.cutEpochMs,
      falseStart: false,
    });

    return next;
  }

  return next;
}
