function RoleCard({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-xl border border-foreground/10 bg-foreground/5 p-5 transition-transform duration-200 hover:-translate-y-0.5">
      <h3 className="font-medium">{title}</h3>
      <p className="mt-1 text-sm leading-6 text-foreground/70">{description}</p>
    </div>
  );
}

export default function Organization() {
  return (
    <section id="organizacion" className="mt-10 sm:mt-12">
      <div className="rounded-2xl border border-foreground/10 bg-background p-6 sm:p-8">
        <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">
          Organización y cronometraje por carril
        </h2>
        <p className="mt-2 max-w-3xl text-sm leading-6 text-foreground/70 sm:text-base">
          Un rol de organizador crea eventos por jornada, define los carriles
          habilitados y habilita el cronometraje. Cada juez de carril ve qué
          carril evalúa, qué nadador compite y controla el tiempo.
        </p>

        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          <RoleCard
            title="Organizador"
            description="Configura fecha, eventos, cantidad de carriles y asignación de series."
          />
          <RoleCard
            title="Juez de carril"
            description="Dashboard con carril asignado, nadador actual, botón para cortar tiempo y controles de pausa."
          />
          <RoleCard
            title="Resultados"
            description="Registra marcas por evento y consolida puntos por atleta y por club."
          />
        </div>
      </div>
    </section>
  );
}
