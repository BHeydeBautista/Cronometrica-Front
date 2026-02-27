import { getRealtimeChannel, type RealtimeMessage } from "@/components/dashboards/juez/realtime";

export type LiveResultsTransport = {
  subscribe: (handler: (msg: RealtimeMessage) => void) => () => void;
};

export function createBroadcastChannelTransport(): LiveResultsTransport {
  return {
    subscribe: (handler) => {
      const channel = getRealtimeChannel();
      const onMessage = (event: MessageEvent) => {
        handler(event.data as RealtimeMessage);
      };

      channel.addEventListener("message", onMessage);
      return () => {
        channel.removeEventListener("message", onMessage);
        channel.close();
      };
    },
  };
}
