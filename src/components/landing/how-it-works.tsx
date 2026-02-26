import type { ReactNode } from "react";

function IconWrap({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-foreground/10 bg-background">
      {children}
    </div>
  );
}

function FlowCard({
  title,
  bullets,
  icon,
}: {
  title: string;
  bullets: string[];
  icon: ReactNode;
}) {
  return (
    <div className="rounded-xl border border-foreground/10 bg-background p-5">
      <div className="flex items-center gap-3">
        <IconWrap>{icon}</IconWrap>
        <h3 className="text-sm font-semibold" style={{ color: "#0b4d84" }}>
          {title}
        </h3>
      </div>
      <ul className="mt-4 space-y-2 text-sm text-foreground/75">
        {bullets.map((b) => (
          <li key={b} className="flex gap-2">
            <span className="mt-[3px]" style={{ color: "#2b6ea6" }}>
              ›
            </span>
            <span>{b}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function HowItWorks() {
  return (
    <section id="como-funciona" className="mt-12 sm:mt-14">
      <div className="rounded-2xl border border-foreground/10 bg-background p-6 sm:p-8">
        <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl" style={{ color: "#0b4d84" }}>
          ¿Cómo funciona?
        </h2>
        <p className="mt-2 text-sm leading-6 sm:text-base" style={{ color: "#2b6ea6" }}>
          Un flujo simple para organizar tu club y cronometrar por carril.
        </p>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <FlowCard
            title="Club (Institución)"
            bullets={["Registrá y administrá tu plantel."]}
            icon={
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true" style={{ color: "#0b4d84" }}>
                <path
                  d="M4 10.5L12 4l8 6.5V20a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-9.5Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinejoin="round"
                />
                <path
                  d="M9 21v-7h6v7"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinejoin="round"
                />
              </svg>
            }
          />

          <FlowCard
            title="Entrenador Representante"
            bullets={["Definí el coach responsable."]}
            icon={
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true" style={{ color: "#0b4d84" }}>
                <path
                  d="M12 12a4 4 0 1 0-4-4 4 4 0 0 0 4 4Z"
                  stroke="currentColor"
                  strokeWidth="2"
                />
                <path
                  d="M4 20a8 8 0 0 1 16 0"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            }
          />

          <FlowCard
            title="Nadadores"
            bullets={["Cargá y gestioná a los nadadores."]}
            icon={
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true" style={{ color: "#0b4d84" }}>
                <path
                  d="M3 16c3.5 0 4.5-2 7-2s3.5 2 7 2 4.5-2 7-2"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <path
                  d="M7 10c2.2 0 3.3-2 5-2s2.8 2 5 2"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <path
                  d="M14 7.5a2 2 0 1 0-2-2 2 2 0 0 0 2 2Z"
                  fill="currentColor"
                />
              </svg>
            }
          />

          <FlowCard
            title="Cronometraje y Resultados"
            bullets={["Cortá tiempos y consolidá marcas."]}
            icon={
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true" style={{ color: "#0b4d84" }}>
                <path
                  d="M10 2h4"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <path
                  d="M12 14V9"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <path
                  d="M12 22a8 8 0 1 0-8-8 8 8 0 0 0 8 8Z"
                  stroke="currentColor"
                  strokeWidth="2"
                />
              </svg>
            }
          />
        </div>
      </div>
    </section>
  );
}
