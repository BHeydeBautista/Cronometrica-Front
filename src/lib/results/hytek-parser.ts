export type HytekMeetHeader = {
  venueLine?: string;
  meetLine?: string;
  sessionLine?: string;
};

export type HytekEntry = {
  place: number;
  name: string;
  age?: number;
  team?: string;
  seedTime?: string;
  finalsTime?: string;
  points?: number;
  splits?: string[];
};

export type HytekEventBlock = {
  eventNumber: number;
  title: string;
  entries: HytekEntry[];
};

export type HytekMeetResults = {
  header: HytekMeetHeader;
  events: HytekEventBlock[];
};

const EVENT_RE = /^Evento\s+(\d+)\s+(.+)$/;
const ENTRY_START_RE = /^\s*(\d{1,3})\s+([A-Za-zÁÉÍÓÚÑÜáéíóúñü])/;
const TIME_RE = /\b\d+:\d{2},\d{2}\b/g;
const SPLIT_RE = /\b(?:\d+:\d{2},\d{2}|\d{1,2},\d{2})\b/g;

function normalizeLines(text: string) {
  return text
    .replace(/\r\n/g, "\n")
    .replace(/\r/g, "\n")
    .split("\n")
    .map((l) => l.replace(/\s+$/g, ""));
}

function parseHeader(lines: string[]): HytekMeetHeader {
  const nonEmpty = lines.filter((l) => l.trim().length > 0);
  const venueLine = nonEmpty[0];
  const meetLine = nonEmpty.find((l) => l.includes("COPA") || l.includes("CATP"));
  const sessionLine = nonEmpty.find((l) => l.toLowerCase().includes("resultados"));
  return { venueLine, meetLine, sessionLine };
}

function takeTimeTokens(s: string) {
  return Array.from(s.matchAll(TIME_RE)).map((m) => m[0]);
}

function takeSplitTokens(s: string) {
  return Array.from(s.matchAll(SPLIT_RE)).map((m) => m[0]);
}

function parseEntryChunk(chunkLines: string[]): HytekEntry | null {
  const first = chunkLines[0] ?? "";
  const placeMatch = first.match(/^\s*(\d{1,3})\s+/);
  if (!placeMatch) return null;
  const place = Number(placeMatch[1]);

  const rest = first.replace(/^\s*\d{1,3}\s+/, "").trim();
  const ageMatch = rest.match(/\s(\d{1,2})\s/);

  let name = rest;
  let age: number | undefined;
  let teamSeedTail = "";

  if (ageMatch?.index !== undefined) {
    name = rest.slice(0, ageMatch.index).trim();
    age = Number(ageMatch[1]);
    teamSeedTail = rest.slice(ageMatch.index + ageMatch[0].length).trim();
  }

  // Join continuation lines that look like they are still part of team/seed row.
  for (let i = 1; i < chunkLines.length; i++) {
    const line = chunkLines[i] ?? "";
    if (!line.trim()) continue;

    const isCompetitorStart = ENTRY_START_RE.test(line);
    if (isCompetitorStart) break;

    const hasColonTime = TIME_RE.test(line);
    TIME_RE.lastIndex = 0;

    const isMeta =
      line.includes("Tiempo de Finales") ||
      line.includes("Puntos") ||
      line.toLowerCase().includes("nombre") ||
      line.toLowerCase().includes("equipo");

    // If the line has times (likely splits) stop joining to team.
    if (hasColonTime || isMeta) break;

    // Otherwise it's usually a wrapped team + NT.
    teamSeedTail = `${teamSeedTail} ${line.trim()}`.trim();
  }

  const chunkText = chunkLines.join(" \n");

  const finalsFromLabel = chunkText.match(/Tiempo de Finales\s+J?(\d+:\d{2},\d{2})/);
  const pointsFromLabel = chunkText.match(/\bPuntos\s+(\d+)/);

  let points: number | undefined;
  if (pointsFromLabel) points = Number(pointsFromLabel[1]);

  // Splits: find a line with many time-like tokens.
  let splits: string[] | undefined;
  for (const line of chunkLines) {
    const tokens = takeSplitTokens(line);
    const colonTokens = takeTimeTokens(line);
    if (colonTokens.length >= 3 || tokens.length >= 5) {
      splits = tokens;
      break;
    }
  }

  // Summary times: collect small time groups (<= 2) excluding the splits line.
  const summaryTimes: string[] = [];
  for (const line of chunkLines) {
    if (line.includes("Tiempo de Finales")) continue;
    const times = takeTimeTokens(line);
    if (times.length > 0 && times.length <= 2) {
      summaryTimes.push(...times);
    }
  }

  let seedTime: string | undefined;
  let finalsTime: string | undefined;

  if (teamSeedTail.includes(" NT") || teamSeedTail.endsWith("NT")) {
    seedTime = "NT";
  }

  if (finalsFromLabel) {
    finalsTime = finalsFromLabel[1];
  } else if (summaryTimes.length >= 2) {
    seedTime = seedTime ?? summaryTimes[0];
    finalsTime = summaryTimes[1];
  } else if (summaryTimes.length === 1) {
    finalsTime = summaryTimes[0];
  }

  if (!finalsTime && splits?.length) {
    finalsTime = splits[splits.length - 1];
  }

  // Team: remove seed/finals/points from tail.
  let team: string | undefined = teamSeedTail
    .replace(/\bNT\b/g, "")
    .replace(TIME_RE, "")
    .replace(/\b\d+\b\s*$/g, "")
    .replace(/\s{2,}/g, " ")
    .trim();

  // If we couldn't isolate team, keep it undefined to avoid junk.
  if (!team || team.length < 2) team = undefined;

  return {
    place,
    name,
    age,
    team,
    seedTime,
    finalsTime,
    points,
    splits,
  };
}

function parseEventBlock(eventNumber: number, title: string, lines: string[]): HytekEventBlock {
  const startIdxs: number[] = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i] ?? "";
    if (ENTRY_START_RE.test(line)) {
      startIdxs.push(i);
    }
  }

  const entries: HytekEntry[] = [];
  for (let s = 0; s < startIdxs.length; s++) {
    const start = startIdxs[s];
    const end = s + 1 < startIdxs.length ? startIdxs[s + 1] : lines.length;
    const chunk = lines.slice(start, end).filter((l) => l.trim().length > 0);
    const entry = parseEntryChunk(chunk);
    if (entry) entries.push(entry);
  }

  return { eventNumber, title, entries };
}

export function parseHytekMeetResults(text: string): HytekMeetResults {
  const lines = normalizeLines(text);
  const header = parseHeader(lines);

  const events: HytekEventBlock[] = [];

  let i = 0;
  while (i < lines.length) {
    const line = lines[i] ?? "";
    const m = line.match(EVENT_RE);
    if (!m) {
      i++;
      continue;
    }

    const eventNumber = Number(m[1]);
    const title = m[2].trim();

    const blockLines: string[] = [];
    i++;
    while (i < lines.length) {
      const next = lines[i] ?? "";
      if (EVENT_RE.test(next)) break;
      blockLines.push(next);
      i++;
    }

    events.push(parseEventBlock(eventNumber, title, blockLines));
  }

  return { header, events };
}
