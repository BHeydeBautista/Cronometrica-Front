export default function Contact() {
  return (
    <section id="contacto" className="mt-10 sm:mt-12">
      <div className="rounded-2xl border border-foreground/10 bg-background p-6 sm:p-8">
        <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">
          Contacto
        </h2>
        <p className="mt-2 max-w-3xl text-sm leading-6 text-foreground/70 sm:text-base">
          Si querés implementarlo en producción, el siguiente paso es definir el
          alcance del MVP (roles, permisos, flujo de jornada y modelo de puntajes)
          y conectar persistencia y auditoría.
        </p>
      </div>
    </section>
  );
}
