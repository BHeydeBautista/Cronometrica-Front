"use client";

export type RealtimeMessage =
  | {
      type: "START_ALL";
      startEpochMs: number;
      eventId: string;
      eventName: string;
      category?: string;
    }
  | {
      type: "STOP_ALL";
      stopEpochMs: number;
    }
  | {
      type: "RESET_ALL";
    }
  | {
      type: "LANE_CUT";
      lane: string;
      swimmer: string;
      eventName: string;
      cutTime: string;
      cutEpochMs: number;
    };

const CHANNEL_NAME = "cronometro-realtime";

export function getRealtimeChannel() {
  return new BroadcastChannel(CHANNEL_NAME);
}

export function broadcastRealtime(message: RealtimeMessage) {
  const channel = getRealtimeChannel();
  channel.postMessage(message);
  channel.close();
}
