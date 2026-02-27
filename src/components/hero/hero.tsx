import Image from "next/image";

import HeroCtas from "@/components/hero/hero-ctas";

export default function Hero() {
  return (
    <section className="fade-in-up relative">
      <div
        className="relative left-1/2 w-screen -translate-x-1/2 bg-cover bg-center"
        style={{ backgroundImage: "url(/img/fondo1.png)" }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-foreground/70 via-foreground/35 to-background/10" />

        <div className="relative mx-auto w-full max-w-6xl px-6 py-12 sm:py-16">
          <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
            <div className="rounded-2xl bg-background/10 p-6 text-background backdrop-blur-md sm:p-8">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <span className="relative h-[96px] w-[96px] shrink-0 sm:h-[128px] sm:w-[128px]">
                  <Image
                    src="/img/logosystemium.png"
                    alt="Aquatiempo"
                    fill
                    className="object-contain"
                    priority
                  />
                </span>
                <span className="inline-flex max-w-xl items-center rounded-full bg-background/15 px-3 py-1 text-xs font-medium text-background/90 backdrop-blur">
                  Competencias de natación — organización y cronometraje
                </span>
              </div>

              <h1 className="mt-5 text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
                Cronometraje por carril, orden y trazabilidad.
                <br />
                Todo en una sola app.
              </h1>
              <p className="mt-4 max-w-2xl text-base leading-7 text-background/90">
                Una plataforma para jornadas completas: instituciones, entrenador representante,
                nadadores, eventos y resultados.
              </p>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-background/85">
                El juez central inicia y los jueces de carril registran tiempos en simultáneo.
              </p>

              <HeroCtas />
            </div>

            <div className="lg:justify-self-end">
              <Image
                src="/img/tablets.png"
                alt="Vista de cronómetro en tablet"
                width={620}
                height={420}
                className="h-auto w-full max-w-[520px]"
                priority
              />
            </div>
          </div>
        </div>

        <div className="pointer-events-none absolute bottom-0 left-0 right-0 overflow-hidden leading-none">
          <svg
            viewBox="0 0 1440 110"
            preserveAspectRatio="none"
            className="block h-[88px] w-full"
            aria-hidden="true"
          >
            <path
              d="M0,64L60,69.3C120,75,240,85,360,80C480,75,600,53,720,42.7C840,32,960,32,1080,40C1200,48,1320,64,1380,72.3L1440,80L1440,110L1380,110C1320,110,1200,110,1080,110C960,110,840,110,720,110C600,110,480,110,360,110C240,110,120,110,60,110L0,110Z"
              fill="var(--background)"
            />
          </svg>
        </div>
      </div>
    </section>
  );
}
