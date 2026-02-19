import fs from "node:fs/promises";
import path from "node:path";

import Button from "@/components/dashboards/_shared/button";
import { parseHytekMeetResults, type HytekEntry } from "@/lib/results/hytek-parser";

export const metadata = {
  title: "Resultados — 3ra Jornada",
};

export default async function Resultados3raJornadaPage() {
  const pdfUrl = "/results/resultados-3ra-jornada-sede-talleres.pdf";

  async function load() {
    const filePath = path.join(
      process.cwd(),
      "src",
      "data",
      "results",
      "resultados-3ra-jornada-sede-talleres.txt",
    );
    const text = await fs.readFile(filePath, "utf8");
    return parseHytekMeetResults(text);
  }

  const data = await load();

  return (
    <div>
      <p className="text-xs font-medium text-foreground/60">Resultados</p>
      <h1 className="mt-2 text-2xl font-semibold tracking-tight">
        3ra jornada — Sede Talleres
      </h1>
      <p className="mt-2 text-sm leading-6 text-foreground/70">
        Reporte con formato de planilla, con el estilo de la plataforma.
      </p>

      <div className="mt-6 flex flex-wrap gap-2">
        <a href={pdfUrl} target="_blank" rel="noreferrer">
          <Button variant="outline">Ver original (PDF)</Button>
        </a>
      </div>

      <div className="mt-6">
      <div className="rounded-2xl border border-foreground/10 bg-foreground/5 p-6">
        <p className="text-xs font-medium text-foreground/60">Competencia</p>
        <p className="mt-2 text-sm leading-6 text-foreground/80">
          {data.header.meetLine ?? ""}
        </p>
        <p className="mt-1 text-sm leading-6 text-foreground/70">
          {data.header.sessionLine ?? ""}
        </p>
        {data.header.venueLine ? (
          <p className="mt-1 text-sm leading-6 text-foreground/70">Sede: {data.header.venueLine}</p>
        ) : null}
      </div>

      <div className="mt-8 space-y-6">
        {data.events.map((ev, idx) => (
          <section key={`${ev.eventNumber}-${idx}`} className="rounded-2xl border border-foreground/10 bg-background">
            <div className="flex flex-col gap-1 border-b border-foreground/10 bg-foreground/5 px-6 py-4">
              <p className="text-xs font-medium text-foreground/60">Evento {ev.eventNumber}</p>
              <h2 className="text-base font-semibold tracking-tight sm:text-lg">{ev.title}</h2>
            </div>

            <div className="p-6">
              <div className="overflow-x-auto rounded-xl border border-foreground/10">
                <table className="w-full text-left text-sm">
                  <thead className="bg-foreground/5">
                    <tr>
                      <th className="whitespace-nowrap px-4 py-3 font-medium">Puesto</th>
                      <th className="min-w-[220px] px-4 py-3 font-medium">Nombre</th>
                      <th className="whitespace-nowrap px-4 py-3 font-medium">Edad</th>
                      <th className="min-w-[220px] px-4 py-3 font-medium">Equipo</th>
                      <th className="whitespace-nowrap px-4 py-3 font-medium">Sembrado</th>
                      <th className="whitespace-nowrap px-4 py-3 font-medium">Final</th>
                      <th className="whitespace-nowrap px-4 py-3 font-medium">Puntos</th>
                    </tr>
                  </thead>

                  <tbody className="bg-background">
                    {ev.entries.length ? (
                      ev.entries.map((en) => (
                        <FragmentRow key={`${ev.eventNumber}-${en.place}-${en.name}`} entry={en} />
                      ))
                    ) : (
                      <tr className="border-t border-foreground/10">
                        <td className="px-4 py-4 text-foreground/70" colSpan={7}>
                          Sin datos para mostrar.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        ))}
      </div>
      </div>
    </div>
  );
}

function FragmentRow({ entry }: { entry: HytekEntry }) {
  return (
    <>
      <tr className="border-t border-foreground/10 transition-colors hover:bg-foreground/5">
        <td className="whitespace-nowrap px-4 py-3 text-foreground/80">{entry.place}</td>
        <td className="px-4 py-3 text-foreground/80">
          <p className="font-medium text-foreground">{entry.name}</p>
        </td>
        <td className="whitespace-nowrap px-4 py-3 text-foreground/80">{entry.age ?? "—"}</td>
        <td className="px-4 py-3 text-foreground/80">{entry.team ?? "—"}</td>
        <td className="whitespace-nowrap px-4 py-3 text-foreground/80">{entry.seedTime ?? "—"}</td>
        <td className="whitespace-nowrap px-4 py-3 font-medium text-brand">{entry.finalsTime ?? "—"}</td>
        <td className="whitespace-nowrap px-4 py-3 text-foreground/80">{entry.points ?? "—"}</td>
      </tr>

      {entry.splits?.length ? (
        <tr className="border-t border-foreground/10 bg-foreground/5/50">
          <td className="px-4 py-3 text-xs text-foreground/60" colSpan={7}>
            Parciales: <span className="text-foreground/70">{entry.splits.join("  ")}</span>
          </td>
        </tr>
      ) : null}
    </>
  );
}
