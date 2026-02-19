function FlowCard({
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

export default function HowItWorks() {
  return (
    <section id="como-funciona" className="mt-14 sm:mt-16">
      <div className="rounded-2xl border border-foreground/10 bg-background p-6 sm:p-8">
        <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">
          Cómo funciona
        </h2>
        <p className="mt-2 max-w-3xl text-sm leading-6 text-foreground/70 sm:text-base">
          Un flujo simple para que clubes, entrenadores y nadadores carguen sus
          pruebas y el sistema calcule puntos por atleta y el total del club.
        </p>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <FlowCard
            title="1) Club (Institución)"
            description="El club se registra como institución. Luego de la verificación, puede administrar su plantel."
          />
          <FlowCard
            title="2) Entrenadores"
            description="El club carga uno o varios entrenadores de natación. Un entrenador también puede ser nadador del mismo club."
          />
          <FlowCard
            title="3) Nadadores"
            description="Cada entrenador carga los datos de sus nadadores: identidad, categoría, y cualquier información necesaria para competir."
          />
          <FlowCard
            title="4) Pruebas, tiempos y puntos"
            description="Se registran las pruebas realizadas y el tiempo de cada evento. El puntaje se calcula por atleta y se suma al total del club."
          />
        </div>
      </div>
    </section>
  );
}
