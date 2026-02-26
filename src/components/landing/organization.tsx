import Image from "next/image";

function RoleCard({
  title,
  description,
  imageSrc,
}: {
  title: string;
  description: string;
  imageSrc: string;
}) {
  return (
    <div className="overflow-hidden rounded-2xl border border-foreground/10 bg-background">
      <div className="relative">
        <Image
          src={imageSrc}
          alt={title}
          width={700}
          height={420}
          className="h-auto w-full"
        />
      </div>
      <div className="p-5">
        <ul className="space-y-2 text-sm text-foreground/75">
          <li className="flex gap-2">
            <span className="mt-[3px]" style={{ color: "#2b6ea6" }}>
              ›
            </span>
            <span>{description}</span>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default function Organization() {
  return (
    <section id="organizacion" className="mt-10 sm:mt-12">
      <div className="rounded-2xl border border-foreground/10 bg-background p-6 sm:p-8">
        <h2 className="text-center text-2xl font-semibold tracking-tight sm:text-3xl" style={{ color: "#0b4d84" }}>
          Organización y Cronometraje por Carril
        </h2>
        <p className="mx-auto mt-2 max-w-3xl text-center text-sm leading-6 sm:text-base" style={{ color: "#2b6ea6" }}>
          Prepará la jornada y sincronizá el inicio. Los jueces de carril registran los tiempos.
        </p>

        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          <RoleCard
            title="Organizador"
            description="Configura fecha, eventos y asignaciones."
            imageSrc="/img/organizador.png"
          />
          <RoleCard
            title="Juez de Carril"
            description="Cronómetro y registro por carril."
            imageSrc="/img/juezdecarril.png"
          />
          <RoleCard
            title="Resultados"
            description="Tiempos consolidados y rankings."
            imageSrc="/img/resultados.png"
          />
        </div>
      </div>

      <div
        className="relative left-1/2 mt-10 w-screen -translate-x-1/2 bg-cover bg-center"
        style={{ backgroundImage: "url(/img/fondo2.png)" }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-foreground/35 via-foreground/20 to-foreground/35" />

        <div className="relative mx-auto w-full max-w-6xl px-6 py-14 sm:py-16">
          <h3 className="text-center text-2xl font-semibold tracking-tight text-background sm:text-3xl">
            Todo en una sola app para tu club.
          </h3>

          <div className="mx-auto mt-8 max-w-5xl rounded-2xl border border-background/25 bg-background/90 p-4 backdrop-blur">
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-5">
              {[
                {
                  label: "Instituciones",
                  icon: (
                    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden="true" style={{ color: "#0b4d84" }}>
                      <path d="M4 10.5L12 4l8 6.5V20a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-9.5Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
                      <path d="M9 21v-7h6v7" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
                    </svg>
                  ),
                },
                {
                  label: "Entrenadores",
                  icon: (
                    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden="true" style={{ color: "#0b4d84" }}>
                      <path d="M12 12a4 4 0 1 0-4-4 4 4 0 0 0 4 4Z" stroke="currentColor" strokeWidth="2" />
                      <path d="M4 20a8 8 0 0 1 16 0" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                  ),
                },
                {
                  label: "Nadadores",
                  icon: (
                    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden="true" style={{ color: "#0b4d84" }}>
                      <path d="M3 16c3.5 0 4.5-2 7-2s3.5 2 7 2 4.5-2 7-2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                      <path d="M7 10c2.2 0 3.3-2 5-2s2.8 2 5 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                      <path d="M14 7.5a2 2 0 1 0-2-2 2 2 0 0 0 2 2Z" fill="currentColor" />
                    </svg>
                  ),
                },
                {
                  label: "Eventos & Tiempos",
                  icon: (
                    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden="true" style={{ color: "#0b4d84" }}>
                      <path d="M10 2h4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                      <path d="M12 14V9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                      <path d="M12 22a8 8 0 1 0-8-8 8 8 0 0 0 8 8Z" stroke="currentColor" strokeWidth="2" />
                    </svg>
                  ),
                },
              ].map((item) => (
                <div
                  key={item.label}
                  className="flex flex-col items-center justify-center gap-2 rounded-xl border border-foreground/10 bg-background px-3 py-4"
                >
                  {item.icon}
                  <p className="text-center text-xs font-semibold" style={{ color: "#0b4d84" }}>
                    {item.label}
                  </p>
                </div>
              ))}

              <div className="hidden sm:flex items-center justify-center rounded-xl border border-foreground/10 bg-background p-3">
                <Image
                  src="/img/tablets.png"
                  alt="Preview"
                  width={180}
                  height={120}
                  className="h-auto w-full max-w-[160px]"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
