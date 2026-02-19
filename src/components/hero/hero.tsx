import Image from "next/image";

import HeroCtas from "@/components/hero/hero-ctas";

export default function Hero() {
  return (
    <section className="rounded-3xl border border-foreground/10 bg-background p-8 sm:p-12">
      <div className="max-w-3xl">
        <div className="flex items-center gap-3">
          <Image
            src="/img/aec.jpeg"
            alt="Logo"
            width={36}
            height={36}
            className="rounded"
            priority
          />
          <p className="text-sm font-medium text-foreground/70">
            Competencias de natación — organización y cronometraje
          </p>
        </div>

        <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
          Gestioná clubes, nadadores y resultados.
          <br />
          Cronometrá cada carril en competencia.
        </h1>
        <p className="mt-4 text-sm leading-6 text-foreground/70 sm:text-base">
          Una plataforma pensada para jornadas completas: registro de
          instituciones, carga de entrenadores y nadadores, registro de pruebas,
          tiempos y puntajes que se consolidan automáticamente por club.
        </p>

        <HeroCtas />
      </div>
    </section>
  );
}
