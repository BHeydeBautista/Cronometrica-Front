export type LaneLiveResult = {
  lane: string;
  swimmer: string;
  cutTime: string;
  cutEpochMs: number;
  falseStart?: boolean;
};

export type EventLiveState = {
  eventName: string;
  category?: string;
  meetName?: string;
  poolLabel?: string;
  serieLabel?: string;
  startedAt?: number;
  status: "idle" | "running" | "stopped";
  lanes: Record<string, LaneLiveResult>;
  lastUpdateMs: number;
};

export type LiveResultsState = {
  currentEventName: string | null;
  events: Record<string, EventLiveState>;
  eventOrder: string[];
};
