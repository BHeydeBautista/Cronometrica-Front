import Image from "next/image";
import Link from "next/link";

import { mockClub, mockCoaches, mockResults, mockSwimmers } from "@/data/mock";

function firstName(fullName: string) {
  const trimmed = fullName.trim();
  if (!trimmed) return "";
  const normalized = trimmed.split(",").map((part) => part.trim());
  if (normalized.length >= 2 && normalized[1]) {
    return normalized[1].split(" ")[0] ?? normalized[1];
  }
  return trimmed.split(" ")[0] ?? trimmed;
}

function initials(name: string) {
  const tokens = name
    .replace(/,/g, " ")
    .split(/\s+/)
    .map((t) => t.trim())
    .filter(Boolean);

  const head = tokens[0]?.[0] ?? "";
  const tail = tokens.length > 1 ? tokens[tokens.length - 1]?.[0] ?? "" : "";
  return (head + tail).toUpperCase();
}

function parseTimeToSeconds(value: string) {
  const raw = value.trim();
  if (!raw) return null;

  const normalized = raw.replace(",", ".");

  if (normalized.includes(":")) {
    const [m, s] = normalized.split(":");
    const minutes = Number(m);
    const seconds = Number(s);
    if (!Number.isFinite(minutes) || !Number.isFinite(seconds)) return null;
    return minutes * 60 + seconds;
  }

  const seconds = Number(normalized);
  if (!Number.isFinite(seconds)) return null;
  return seconds;
}

function bestTimeForSwimmer(swimmerId: string) {
  const times = mockResults
    .filter((r) => r.swimmerId === swimmerId)
    .map((r) => ({ raw: r.time, seconds: parseTimeToSeconds(r.time) }))
    .filter((t): t is { raw: string; seconds: number } => t.seconds !== null);

  if (!times.length) return null;
  return times.sort((a, b) => a.seconds - b.seconds)[0]?.raw ?? null;
}

export default function CoachDashboard() {
  const coach =
    mockCoaches.find((c) => c.clubId === mockClub.id && c.active) ?? mockCoaches[0];

  const coachSwimmers = mockSwimmers
    .filter((s) => s.coachId === coach.id)
    .sort((a, b) => a.name.localeCompare(b.name, "es"));

  const swimmersPreview = coachSwimmers.slice(0, 4);

  const swimmerIds = new Set(coachSwimmers.map((s) => s.id));
  const resultsCount = mockResults.filter((r) => swimmerIds.has(r.swimmerId)).length;

  const upcomingEvents = [
    {
      athlete: "Torneo Apertura",
      club: "Club Atlético Central",
      date: "15-16 junio 2025",
      event: "50m Libre",
      result: "2° Puesto",
    },
    {
      athlete: "Interclubes Primavera",
      club: "Club Del Faro",
      date: "15-16 junio 2025",
      event: "100m Pecho",
      result: "1° 12,43 s",
    },
    {
      athlete: "Sofía Medina",
      club: "Club Del Faro",
      date: "15-16 junio 2025",
      event: "200m Combinado",
      result: "2° 08,17 s",
    },
  ] as const;

  const reminders = [
    {
      icon: "trophy",
      text: "nuevo récord — ¡50m Libre en 24,56s!",
      swimmer: coachSwimmers[0]?.name ?? "Nadador",
    },
    {
      icon: "warning",
      text: "Semana que viene: repaso de tácticas de relevo",
      swimmer: null,
    },
  ] as const;

  const coachFirstName = firstName(coach?.name ?? "");

  return (
    <div
      className="relative left-1/2 w-screen -translate-x-1/2 bg-cover bg-top"
      style={{ backgroundImage: "url(/img/fondo2.png)" }}
    >
      <div className="relative">
        <div className="absolute inset-0 bg-black/25" />

        <div className="relative mx-auto w-full max-w-6xl px-6 pt-4 pb-14">
          <div className="mt-10">
            <h1 className="text-3xl font-semibold tracking-tight text-background sm:text-4xl">
              Panel del Entrenador
            </h1>
          </div>

          <section className="mt-8 overflow-hidden rounded-xl bg-background/80 text-sky-950 shadow-sm backdrop-blur">
            <div className="flex items-center gap-3 bg-sky-950/10 px-6 py-5">
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-background/70">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  aria-hidden="true"
                  className="text-sky-900"
                >
                  <path
                    d="M20 21a8 8 0 0 0-16 0"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  <path
                    d="M12 11a4 4 0 1 0-4-4 4 4 0 0 0 4 4Z"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                </svg>
              </span>
              <h2 className="text-lg font-semibold">Resumen</h2>
            </div>

            <div className="flex flex-col gap-6 p-6 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-xl font-semibold tracking-tight text-foreground">
                  Bienvenido {coachFirstName || coach?.name || ""}.
                </p>
                <p className="mt-2 max-w-xl text-sm leading-6 text-foreground/70">
                  Aquí tienes un resumen rápido de tus nadadores, sus resultados y mejores marcas.
                </p>
                <p className="mt-2 text-sm text-foreground/60">Club: {mockClub.name}</p>
              </div>

              <Image
                src="/img/logosystemium.png"
                alt="Foto de perfil"
                width={64}
                height={64}
                className="h-16 w-16 rounded-full object-cover"
              />
            </div>
          </section>

          <div className="mt-8 grid gap-8 lg:grid-cols-2">
            <section className="overflow-hidden rounded-xl bg-background/80 text-sky-950 shadow-sm backdrop-blur">
              <div className="flex items-center gap-3 bg-sky-950/10 px-6 py-5">
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-background/70">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    aria-hidden="true"
                    className="text-amber-600"
                  >
                    <path
                      d="M8 3h8l-1 7a3 3 0 0 1-6 0L8 3Z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M12 12v4"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                    <path
                      d="M9 20h6"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>
                <h2 className="text-lg font-semibold">Resumen</h2>
              </div>

              <div className="p-6">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="rounded-xl border border-foreground/10 bg-background/70 p-5">
                    <div className="flex items-center gap-3">
                      <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-sky-950/10 text-sky-900">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                          <path
                            d="M16 11c1.7 0 3-1.3 3-3s-1.3-3-3-3-3 1.3-3 3 1.3 3 3 3Z"
                            stroke="currentColor"
                            strokeWidth="2"
                          />
                          <path
                            d="M6 11c1.7 0 3-1.3 3-3S7.7 5 6 5 3 6.3 3 8s1.3 3 3 3Z"
                            stroke="currentColor"
                            strokeWidth="2"
                            opacity="0.8"
                          />
                          <path
                            d="M16 14a6 6 0 0 1 6 6"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                          />
                          <path
                            d="M2 20a6 6 0 0 1 10-4"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            opacity="0.8"
                          />
                        </svg>
                      </span>
                      <div>
                        <div className="text-3xl font-semibold tracking-tight">
                          {coachSwimmers.length}
                        </div>
                        <div className="text-sm font-medium text-foreground/80">
                          Nadadores
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-xl border border-foreground/10 bg-background/70 p-5">
                    <div className="flex items-center gap-3">
                      <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-sky-950/10 text-amber-600">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                          <path
                            d="M12 2 9 7l-5 .7 3.6 3.5-.9 5L12 13.8l4.3 2.4-.9-5L19 7.7 14 7l-2-5Z"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </span>
                      <div>
                        <div className="text-3xl font-semibold tracking-tight">
                          {resultsCount}
                        </div>
                        <div className="text-sm font-medium text-foreground/80">
                          Resultados
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <Link
                  href="/resultados/3ra-jornada"
                  className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-lg border border-foreground/10 bg-background/70 px-4 py-3 text-sm font-semibold text-sky-900 hover:bg-background"
                >
                  Ver Historial Completo
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path
                      d="M9 18 15 12 9 6"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </Link>
              </div>
            </section>

            <section className="overflow-hidden rounded-xl bg-background/80 text-sky-950 shadow-sm backdrop-blur">
              <div className="flex items-center gap-3 bg-sky-950/10 px-6 py-5">
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-background/70">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    aria-hidden="true"
                    className="text-sky-900"
                  >
                    <path
                      d="M16 11c1.7 0 3-1.3 3-3s-1.3-3-3-3-3 1.3-3 3 1.3 3 3 3Z"
                      stroke="currentColor"
                      strokeWidth="2"
                    />
                    <path
                      d="M8 13c1.7 0 3-1.3 3-3S9.7 7 8 7 5 8.3 5 10s1.3 3 3 3Z"
                      stroke="currentColor"
                      strokeWidth="2"
                      opacity="0.85"
                    />
                    <path
                      d="M2 21a7 7 0 0 1 12-4"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      opacity="0.85"
                    />
                    <path
                      d="M16 14a6 6 0 0 1 6 6"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>
                <h2 className="text-lg font-semibold">Mis Nadadores</h2>
              </div>

              <div className="p-6">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                  <div className="relative flex-1">
                    <input
                      aria-label="Buscar nadador"
                      placeholder="Buscar nadador..."
                      className="h-10 w-full rounded-md border border-foreground/15 bg-background/80 px-3 text-sm text-foreground placeholder:text-foreground/50"
                    />
                  </div>
                  <button
                    type="button"
                    className="inline-flex h-10 items-center justify-center gap-2 rounded-md bg-brand px-4 text-sm font-semibold text-brand-foreground hover:opacity-95"
                  >
                    <span aria-hidden="true">+</span>
                    Añadir Nadador
                  </button>
                </div>

                <div className="mt-5 overflow-x-auto rounded-lg border border-foreground/10 bg-background/70">
                  <div className="min-w-[520px]">
                  <div className="grid grid-cols-[1fr_160px_110px] gap-3 border-b border-foreground/10 px-4 py-3 text-xs font-semibold text-foreground/70">
                    <div>Nadador</div>
                    <div className="text-center">Categoría</div>
                    <div className="text-right">Mejor Marca</div>
                  </div>

                  <div className="divide-y divide-foreground/10">
                    {swimmersPreview.map((swimmer) => {
                      const best = bestTimeForSwimmer(swimmer.id);
                      return (
                        <div
                          key={swimmer.id}
                          className="grid grid-cols-[1fr_160px_110px] items-center gap-3 px-4 py-3 text-sm"
                        >
                          <div className="flex min-w-0 items-center gap-3">
                            <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-sky-950/10 text-xs font-semibold text-sky-900">
                              {initials(swimmer.name)}
                            </span>
                            <span className="truncate font-medium text-foreground">
                              {swimmer.name}
                            </span>
                          </div>
                          <div className="text-center text-foreground/80">{swimmer.category}</div>
                          <div className="text-right font-semibold text-foreground">
                            {best ?? "-"}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  </div>
                </div>

                <button
                  type="button"
                  disabled
                  className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-lg border border-foreground/10 bg-background/70 px-4 py-3 text-sm font-semibold text-sky-900 opacity-80"
                >
                  Ver Todos los Nadadores (próximamente)
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path
                      d="M9 18 15 12 9 6"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>
            </section>
          </div>

          <section className="mt-8 overflow-hidden rounded-xl bg-background/80 text-sky-950 shadow-sm backdrop-blur">
            <div className="flex items-center gap-3 bg-sky-950/10 px-6 py-5">
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-background/70">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  aria-hidden="true"
                  className="text-sky-900"
                >
                  <path
                    d="M8 7V3m8 4V3"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  <path
                    d="M4 9h16"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  <path
                    d="M5 6h14a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              <h2 className="text-lg font-semibold">Próximos Eventos</h2>
            </div>

            <div className="p-6">
              <div className="overflow-x-auto rounded-lg border border-foreground/10 bg-background/70">
                <div className="min-w-[680px]">
                <div className="grid grid-cols-[1.2fr_0.9fr_0.9fr_0.8fr] gap-3 border-b border-foreground/10 px-4 py-3 text-xs font-semibold text-foreground/70">
                  <div>Evento</div>
                  <div>Fecha</div>
                  <div>Prueba</div>
                  <div className="text-right">Resultado</div>
                </div>

                <div className="divide-y divide-foreground/10">
                  {upcomingEvents.map((row) => (
                    <div
                      key={`${row.athlete}-${row.event}`}
                      className="grid grid-cols-[1.2fr_0.9fr_0.9fr_0.8fr] items-center gap-3 px-4 py-3 text-sm"
                    >
                      <div className="flex min-w-0 items-center gap-3">
                        <Image
                          src="/img/logosystemium.png"
                          alt="Avatar"
                          width={32}
                          height={32}
                          className="h-8 w-8 rounded-full object-cover"
                        />
                        <div className="min-w-0">
                          <div className="truncate font-semibold text-foreground">{row.athlete}</div>
                          <div className="truncate text-xs text-foreground/60">{row.club}</div>
                        </div>
                      </div>

                      <div>
                        <span className="inline-flex items-center rounded-md border border-foreground/10 bg-background px-3 py-1.5 text-xs font-semibold text-foreground/80">
                          {row.date}
                        </span>
                      </div>

                      <div className="font-medium text-foreground/85">{row.event}</div>
                      <div className="text-right font-semibold text-foreground">{row.result}</div>
                    </div>
                  ))}
                </div>
                </div>
              </div>

              <button
                type="button"
                disabled
                className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-lg border border-foreground/10 bg-background/70 px-4 py-3 text-sm font-semibold text-sky-900 opacity-80"
              >
                Ver Todos los Eventos (próximamente)
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path
                    d="M9 18 15 12 9 6"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
          </section>

          <section className="mt-8 overflow-hidden rounded-xl bg-background/80 text-sky-950 shadow-sm backdrop-blur">
            <div className="flex items-center justify-between gap-3 bg-sky-950/10 px-6 py-5">
              <div className="flex items-center gap-3">
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-background/70">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="text-sky-900">
                    <path
                      d="M21 15a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4Z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                <h2 className="text-lg font-semibold">Noticias y Recordatorios</h2>
              </div>

              <button
                type="button"
                disabled
                className="inline-flex h-9 items-center justify-center rounded-md border border-foreground/10 bg-background/70 px-4 text-sm font-semibold text-sky-900 opacity-80"
              >
                Ver Todas
              </button>
            </div>

            <div className="p-6">
              <div className="overflow-hidden rounded-lg border border-foreground/10 bg-background/70">
                <div className="divide-y divide-foreground/10">
                  {reminders.map((item, idx) => {
                    const IconEl =
                      item.icon === "trophy" ? (
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="text-amber-600">
                          <path
                            d="M8 3h8l-1 7a3 3 0 0 1-6 0L8 3Z"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M6 5H4a2 2 0 0 0 2 6"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                          />
                          <path
                            d="M18 5h2a2 2 0 0 1-2 6"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                          />
                          <path
                            d="M12 12v4"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                          />
                          <path
                            d="M9 20h6"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                          />
                        </svg>
                      ) : (
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="text-amber-500">
                          <path
                            d="M12 9v4"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                          />
                          <path
                            d="M12 17h.01"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                          />
                          <path
                            d="M10.3 4.6a2 2 0 0 1 3.4 0l8 13.8A2 2 0 0 1 20 21H4a2 2 0 0 1-1.7-2.6l8-13.8Z"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinejoin="round"
                          />
                        </svg>
                      );

                    return (
                      <div
                        key={`${item.icon}-${idx}`}
                        className="flex items-center justify-between gap-4 px-4 py-3 text-sm"
                      >
                        <div className="flex min-w-0 items-center gap-3">
                          <span className="inline-flex h-9 w-9 items-center justify-center rounded-md bg-sky-950/10">
                            {IconEl}
                          </span>
                          <div className="min-w-0 text-foreground/85">
                            {item.swimmer ? (
                              <>
                                <span className="font-semibold text-foreground">{item.swimmer}</span>{" "}
                                {item.text}
                              </>
                            ) : (
                              <span>{item.text}</span>
                            )}
                          </div>
                        </div>

                        <button
                          type="button"
                          disabled
                          className="shrink-0 inline-flex h-9 items-center justify-center rounded-md px-3 text-sm font-semibold text-sky-900 opacity-80"
                          aria-label="Ver detalle"
                        >
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                            <path
                              d="M9 18 15 12 9 6"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
