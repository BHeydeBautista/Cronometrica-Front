export function normalizeLane(raw: string) {
  const match = raw.match(/\d+/);
  return match?.[0] ?? raw;
}

export function formatEventKey(eventName: string) {
  return eventName.trim() || "(Sin evento)";
}

export function parseCutTimeToMs(value: string) {
  const raw = value.trim();
  if (!raw) return null;
  const normalized = raw.replace(",", ".");

  if (normalized.includes(":")) {
    const [m, rest] = normalized.split(":");
    const minutes = Number(m);
    const seconds = Number(rest);
    if (!Number.isFinite(minutes) || !Number.isFinite(seconds)) return null;
    return Math.round((minutes * 60 + seconds) * 1000);
  }

  const seconds = Number(normalized);
  if (!Number.isFinite(seconds)) return null;
  return Math.round(seconds * 1000);
}

export function formatStopwatchMs(ms: number) {
  const totalSeconds = Math.floor(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  const centis = Math.floor((ms % 1000) / 10);
  const pad2 = (n: number) => n.toString().padStart(2, "0");
  return `${pad2(minutes)}:${pad2(seconds)}.${pad2(centis)}`;
}
