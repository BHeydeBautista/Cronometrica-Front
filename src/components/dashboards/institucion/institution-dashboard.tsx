import Image from "next/image";
import Link from "next/link";

import {
  clubTotalPoints,
  mockClub,
  mockClubs,
  mockCoaches,
  resultsForClub,
} from "@/data/mock";

function slugify(value: string) {
  return value
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function placeLabel(rank: number) {
  return `${rank}°`;
}

function MedalIcon({
  variant,
  className,
}: {
  variant: "gold" | "silver" | "bronze";
  className?: string;
}) {
  const fillClass =
    variant === "gold"
      ? "text-amber-500"
      : variant === "silver"
        ? "text-slate-400"
        : "text-orange-500";

  return (
    <span
      className={`inline-flex h-5 w-5 items-center justify-center ${fillClass} ${className ?? ""}`}
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
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
        <path
          d="M10 16h4"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    </span>
  );
}

export default function InstitutionDashboard() {
  const coach =
    mockCoaches.find((c) => c.clubId === mockClub.id && c.active) ?? mockCoaches[0];

  const clubPointsSorted = mockClubs
    .map((club) => ({
      id: club.id,
      name: club.name,
      points: clubTotalPoints(club.id),
    }))
    .sort((a, b) => b.points - a.points);

  const clubRank = Math.max(
    1,
    clubPointsSorted.findIndex((c) => c.id === mockClub.id) + 1,
  );

  const totalPoints = clubTotalPoints(mockClub.id);
  const latestDelta = resultsForClub(mockClub.id)
    .slice(-3)
    .reduce((sum, r) => sum + r.points, 0);

  const top3 = clubPointsSorted.slice(0, 3);
  const latestEvents = [
    { name: "Interclubes Verano", date: "25 Abr 2026", medals: "2", result: "2° Puesto" },
    { name: "Torneo Provincial", date: "10-11 Mar 2026", medals: "1", result: "1° Puesto" },
    { name: "Copa Primavera", date: "20 Feb 2026", medals: "3", result: "3° Puesto" },
  ] as const;

  const clubEmailDomain = slugify(mockClub.name || "club");
  const coachEmail = `${slugify(coach.name).replace(/-/g, ".")}@${clubEmailDomain}.com`;
  const coachPhone = "+54 9 343 555-0101";

  return (
    <div
      className="relative left-1/2 w-screen -translate-x-1/2 bg-cover bg-top"
      style={{ backgroundImage: "url(/img/fondo2.png)" }}
    >
      <div className="relative">
        <div className="absolute inset-0 bg-black/25" />

        <div className="relative mx-auto w-full max-w-6xl px-6 pt-5 pb-16">
          <div className="mt-12 text-center">
            <h1 className="text-3xl font-semibold tracking-tight text-background sm:text-5xl">
              Panel de la Institución —{" "}
              <span className="border-b-4 border-amber-400 pb-1">{mockClub.name}</span>
            </h1>
            <p className="mt-4 text-base text-background/80">
              {mockClub.city} · Estado: {mockClub.status}
            </p>
          </div>

          <div className="mt-12 grid gap-8 lg:grid-cols-3">
            {/* Puntaje del Club (resumen) */}
            <section className="overflow-hidden rounded-xl bg-background/80 text-sky-950 shadow-sm backdrop-blur">
              <div className="flex items-center gap-3 bg-sky-950/10 px-6 py-5">
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-background/70">
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
                    <path
                      d="M10 16h4"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>
                <h2 className="text-lg font-semibold">Puntaje del Club</h2>
              </div>

              <div className="p-6">
                <div className="flex items-end justify-between gap-4">
                  <div>
                    <div className="flex items-baseline gap-2">
                      <div className="text-5xl font-semibold tracking-tight">{totalPoints}</div>
                      <div className="text-xl font-semibold text-foreground/70">pts</div>
                    </div>
                    <div className="mt-2 inline-flex items-center rounded-md bg-sky-950/10 px-3 py-1 text-sm font-semibold text-sky-950">
                      +{latestDelta} pts
                    </div>
                  </div>

                  <div className="text-right text-sm text-foreground/70">
                    Puesto actual
                    <div className="mt-1 text-xl font-semibold text-foreground">{placeLabel(clubRank)}</div>
                  </div>
                </div>

                <div className="mt-6 overflow-hidden rounded-lg border border-foreground/10">
                  <div className="divide-y divide-foreground/10">
                    {top3.map((club, idx) => {
                      const rank = idx + 1;
                      const isCurrent = club.id === mockClub.id;
                      const medal = rank === 1 ? "gold" : rank === 2 ? "silver" : "bronze";
                      return (
                        <div
                          key={club.id}
                          className={
                            "flex items-center justify-between gap-4 px-5 py-3.5 text-sm " +
                            (isCurrent ? "bg-brand-soft" : "bg-background")
                          }
                        >
                          <div className="flex min-w-0 items-center gap-3">
                            <MedalIcon variant={medal} />
                            <div className="min-w-0 truncate">
                              <span className="font-semibold">{placeLabel(rank)}</span>{" "}
                              <span className={isCurrent ? "font-semibold" : "font-medium"}>
                                {club.name}
                              </span>
                            </div>
                          </div>
                          <div className={"shrink-0 font-semibold " + (isCurrent ? "text-foreground" : "text-foreground/80")}>
                            {club.points} pts
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </section>

            {/* Entrenador */}
            <section className="overflow-hidden rounded-xl bg-background/80 text-sky-950 shadow-sm backdrop-blur">
              <div className="flex items-center gap-3 bg-sky-950/10 px-6 py-5">
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-background/70">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="text-sky-900">
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
                <h2 className="text-lg font-semibold">Entrenador</h2>
              </div>

              <div className="p-6">
                <div className="flex items-start gap-4">
                  <Image
                    src="/img/systemium.jpeg"
                    alt="Entrenador"
                    width={56}
                    height={56}
                    className="h-14 w-14 rounded-full object-cover"
                    priority
                  />

                  <div className="min-w-0 flex-1">
                    <div className="truncate text-lg font-semibold">{coach.name}</div>

                    <div className="mt-2 space-y-2 text-sm text-foreground/80">
                      <div className="flex items-center gap-2">
                        <span className="inline-flex h-7 w-7 items-center justify-center rounded-md bg-sky-950/10">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="text-sky-900">
                            <path
                              d="M22 16.9v3a2 2 0 0 1-2.2 2 19.9 19.9 0 0 1-8.7-3.1A19.5 19.5 0 0 1 3.2 10.9 19.9 19.9 0 0 1 .1 2.2 2 2 0 0 1 2.1 0h3a2 2 0 0 1 2 1.7c.1.9.3 1.8.6 2.6a2 2 0 0 1-.4 2.1L6 7.8a16 16 0 0 0 10.2 10.2l1.4-1.3a2 2 0 0 1 2.1-.4c.8.3 1.7.5 2.6.6a2 2 0 0 1 1.7 2Z"
                              fill="currentColor"
                              opacity="0.85"
                            />
                          </svg>
                        </span>
                        <span className="truncate">{coachPhone}</span>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="inline-flex h-7 w-7 items-center justify-center rounded-md bg-sky-950/10">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="text-sky-900">
                            <path
                              d="M4 4h16v16H4V4Z"
                              stroke="currentColor"
                              strokeWidth="2"
                              opacity="0.9"
                            />
                            <path
                              d="m4 6 8 6 8-6"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </span>
                        <span className="truncate">{coachEmail}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex items-center gap-3">
                  <button
                    type="button"
                    className="inline-flex h-11 flex-1 items-center justify-center gap-2 rounded-md bg-sky-950/10 px-5 text-sm font-semibold text-sky-950 hover:bg-sky-950/15"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <path
                        d="M12 1v4"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                      <path
                        d="M3.2 6.2 6 9"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                      <path
                        d="M1 12h4"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                      <path
                        d="M3.2 17.8 6 15"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                      <path
                        d="M12 19v4"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                      <path
                        d="M20.8 17.8 18 15"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                      <path
                        d="M19 12h4"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                      <path
                        d="M20.8 6.2 18 9"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                      <path
                        d="M12 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z"
                        stroke="currentColor"
                        strokeWidth="2"
                      />
                    </svg>
                    Gestionar Entrenador
                  </button>

                  <button
                    type="button"
                    className="inline-flex h-11 w-11 items-center justify-center rounded-md border border-foreground/15 bg-background/70 text-sky-950 hover:bg-background"
                    aria-label="Editar entrenador"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <path
                        d="M12 20h9"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                      <path
                        d="M16.5 3.5a2.1 2.1 0 0 1 3 3L8 18l-4 1 1-4 11.5-11.5Z"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </section>

            {/* Últimos Eventos (lista) */}
            <section className="overflow-hidden rounded-xl bg-background/80 text-sky-950 shadow-sm backdrop-blur">
              <div className="flex items-center gap-3 bg-sky-950/10 px-6 py-5">
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-background/70">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="text-sky-900">
                    <path
                      d="M8 3v3"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                    <path
                      d="M16 3v3"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                    <path
                      d="M4 7h16"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                    <path
                      d="M6 5h12a2 2 0 0 1 2 2v13a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2Z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                <h2 className="text-lg font-semibold">Últimos Eventos</h2>
              </div>

              <div className="p-6">
                <div className="rounded-lg border border-foreground/10 bg-background">
                  <div className="grid grid-cols-[minmax(0,1fr)_110px] gap-3 bg-foreground/5 px-5 py-3.5 text-sm font-semibold">
                    <div>Evento</div>
                    <div className="text-right">Resultado</div>
                  </div>

                  <div className="divide-y divide-foreground/10">
                    {latestEvents.map((e, idx) => (
                      <div
                        key={e.name}
                        className="grid grid-cols-[minmax(0,1fr)_110px] items-start gap-3 px-5 py-4 text-sm"
                      >
                        <div className="flex min-w-0 items-center gap-3">
                          <Image
                            src="/img/systemium.jpeg"
                            alt="Evento"
                            width={28}
                            height={28}
                            className="h-7 w-7 rounded-full object-cover"
                          />
                          <div className="min-w-0">
                            <div className="truncate font-semibold">{e.name}</div>
                            <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-medium text-foreground/60">
                              <span>{e.date}</span>
                              <span className="inline-flex items-center gap-1.5">
                                <MedalIcon
                                  variant={idx === 1 ? "gold" : idx === 0 ? "silver" : "bronze"}
                                  className="h-4 w-4"
                                />
                                <span>{e.medals}</span>
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="text-right font-semibold text-foreground/80">{e.result}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-7 flex justify-end">
                  <Link
                    href="/resultados/3ra-jornada"
                    className="inline-flex items-center gap-2 text-sm font-semibold text-sky-950/80 hover:text-sky-950"
                  >
                    Ver Historial Completo
                    <span aria-hidden="true">›</span>
                  </Link>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
